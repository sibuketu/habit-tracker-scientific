/**
 * Primal Logic - App Context (Web版)
 * 
 * グローバル状態管理（日次ログ、栄養素計算結果など）
 */

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { DailyLog, FoodItem, DailyStatus, RecoveryProtocol, UserProfile } from '../types';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { generateRecoveryProtocol, detectViolationType } from '../utils/recoveryAlgorithm';
import { generateRecoveryProtocolWithAI } from '../utils/openaiApi';
import { saveDailyLog, getTodayLog, getUserProfile, syncLocalStorageToSupabase as syncStorage } from '../utils/storage';
import { logError } from '../utils/errorHandler';

interface AppContextType {
  dailyLog: DailyLog | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  addFood: (food: FoodItem) => void;
  removeFood: (index: number) => void;
  updateFood: (index: number, food: FoodItem) => void;
  updateStatus: (status: DailyStatus) => void;
  updateDiary: (diary: string) => void;
  updateWeight: (weight: number | undefined, bodyFatPercentage?: number | undefined) => void;
  setRecoveryProtocol: (protocol: RecoveryProtocol) => void;
  clearDailyLog: () => void;
  loadTodayLog: () => Promise<void>;
  loadUserProfile: () => Promise<void>;
  setError: (error: string | null) => void;
  clearError: () => void;
  syncLocalStorageToSupabase: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [dailyLog, setDailyLog] = useState<DailyLog | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load user profile first
  const loadUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const profile = await getUserProfile();
      if (profile) {
        setUserProfile(profile);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'プロファイルの読み込みに失敗しました';
      setError(errorMessage);
      logError(err, { component: 'AppContext', action: 'loadUserProfile' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load today's log (will be recalculated when userProfile changes)
  const loadTodayLog = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const log = await getTodayLog();
      if (log) {
        // 古いデータ構造の場合、calculatedMetricsを再計算
        // これにより、新しいフィールド（effectiveProtein等）が追加される
        const recalculatedMetrics = calculateAllMetrics(log.fuel, userProfile);
        setDailyLog({
          ...log,
          calculatedMetrics: recalculatedMetrics,
        });
      } else {
        // ログがない場合でも、空のログを作成しない（PFRatioGaugeが0%を表示するのは正常）
        setDailyLog(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '日次ログの読み込みに失敗しました';
      setError(errorMessage);
      logError(err, { component: 'AppContext', action: 'loadTodayLog' });
    } finally {
      setIsLoading(false);
    }
  }, [userProfile]);

  // Sync localStorage to Supabase
  const syncLocalStorageToSupabase = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      await syncStorage();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'データの同期に失敗しました';
      setError(errorMessage);
      logError(err, { component: 'AppContext', action: 'syncLocalStorageToSupabase' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load user profile on mount
  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // Load today's log after user profile is loaded
  useEffect(() => {
    loadTodayLog();
  }, [loadTodayLog]);

  // Auto-save daily log when it changes
  useEffect(() => {
    if (dailyLog) {
      saveDailyLog(dailyLog)
        .then(() => {
          // 保存完了後にイベントを発火
          window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
        })
        .catch((error) => {
          logError(error, { component: 'AppContext', action: 'saveDailyLog' });
          // エラーでもイベントを発火（UI更新のため）
          window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
        });
    }
  }, [dailyLog]);

  // Recalculate metrics when userProfile changes (for existing logs)
  useEffect(() => {
    if (dailyLog && userProfile) {
      const recalculatedMetrics = calculateAllMetrics(dailyLog.fuel, userProfile);
      setDailyLog({
        ...dailyLog,
        calculatedMetrics: recalculatedMetrics,
      });
    }
  }, [userProfile]);

  // 食品追加後に今日のログを再読み込み（デバッグモードでも反映されるように）
  useEffect(() => {
    const handleFoodAdded = () => {
      // 少し遅延させてから再読み込み（保存が完了してから）
      setTimeout(() => {
        loadTodayLog();
      }, 100);
    };
    window.addEventListener('foodAdded', handleFoodAdded);
    return () => {
      window.removeEventListener('foodAdded', handleFoodAdded);
    };
  }, [loadTodayLog]);

  const addFood = useCallback((food: FoodItem) => {
    setDailyLog((prev) => {
      const today = new Date().toISOString().split('T')[0];
      
      if (!prev || prev.date !== today) {
        // Create new daily log for today
        const newLog: DailyLog = {
          date: today,
          status: {
            sleepScore: 80,
            sunMinutes: 30,
            activityLevel: 'moderate',
          },
          fuel: [food],
          calculatedMetrics: calculateAllMetrics([food], userProfile),
        };

        // Check for violations and generate recovery protocol if needed
        const violationType = detectViolationType(food.item);
        if (violationType) {
          // Try AI API first, fallback to static algorithm
          generateRecoveryProtocolWithAI({
            violationType,
            userProfile: userProfile ? {
              gender: userProfile.gender,
              goal: userProfile.goal,
              metabolicStatus: userProfile.metabolicStatus,
            } : undefined,
            foodItem: food.item,
          }).then((aiProtocol) => {
            if (aiProtocol) {
              setDailyLog((prev) => {
                if (!prev || prev.date !== newLog.date) return prev;
                return {
                  ...prev,
                  recoveryProtocol: {
                    violationType,
                    isActive: true,
                    fastingTargetHours: aiProtocol.protocol.fastingTargetHours,
                    activities: aiProtocol.protocol.activities,
                    dietRecommendations: aiProtocol.protocol.dietRecommendations,
                    supplements: aiProtocol.protocol.supplements,
                    warnings: aiProtocol.protocol.warnings,
                    protocolId: `ai_${violationType}_${Date.now()}`,
                  },
                };
              });
            } else {
              // Fallback to static algorithm
              setDailyLog((prev) => {
                if (!prev || prev.date !== newLog.date) return prev;
                return {
                  ...prev,
                  recoveryProtocol: generateRecoveryProtocol(violationType),
                };
              });
            }
          }).catch(() => {
            // On error, use static algorithm
            setDailyLog((prev) => {
              if (!prev || prev.date !== newLog.date) return prev;
              return {
                ...prev,
                recoveryProtocol: generateRecoveryProtocol(violationType),
              };
            });
          });
          
          // Set initial protocol (will be updated by AI if available)
          newLog.recoveryProtocol = generateRecoveryProtocol(violationType);
        }

        // 新規ログ作成時もイベントを発火（saveDailyLogのuseEffectで発火されるが、念のため）
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('foodAdded'));
        }, 0);
        
        return newLog;
      }

      // Add to existing log
      const updatedFuel = [...prev.fuel, food];
      const updatedMetrics = calculateAllMetrics(updatedFuel, userProfile);
      
      // 食品追加イベントを発火（他のコンポーネントに通知）
      // dailyLogUpdatedはsaveDailyLogのuseEffectで発火される
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('foodAdded'));
      }, 0);
      
      // デバッグ: 栄養素計算を確認（本番では削除可能）
      if (import.meta.env.DEV) {
        console.log('=== 栄養素計算デバッグ ===');
        console.log('追加した食品:', food);
        console.log('食品の栄養素:', food.nutrients);
        console.log('全食品リスト:', updatedFuel.map(f => ({ name: f.item, nutrients: f.nutrients })));
        console.log('計算結果:', updatedMetrics);
        console.log('前のメトリクス:', prev.calculatedMetrics);
        console.log('========================');
      }

      // Check for violations
      const violationType = detectViolationType(food.item);
      let recoveryProtocol = prev.recoveryProtocol;
      
      if (violationType) {
        // Try AI API first, fallback to static algorithm
        generateRecoveryProtocolWithAI({
          violationType,
          userProfile: userProfile ? {
            gender: userProfile.gender,
            goal: userProfile.goal,
            metabolicStatus: userProfile.metabolicStatus,
          } : undefined,
          foodItem: food.item,
        }).then((aiProtocol) => {
          if (aiProtocol) {
            setDailyLog((current) => {
              if (!current || current.date !== prev.date) return current;
              return {
                ...current,
                recoveryProtocol: {
                  violationType,
                  isActive: true,
                  fastingTargetHours: aiProtocol.protocol.fastingTargetHours,
                  activities: aiProtocol.protocol.activities,
                  dietRecommendations: aiProtocol.protocol.dietRecommendations,
                  supplements: aiProtocol.protocol.supplements,
                  warnings: aiProtocol.protocol.warnings,
                  protocolId: `ai_${violationType}_${Date.now()}`,
                },
              };
            });
          } else {
            // Fallback to static algorithm
            setDailyLog((current) => {
              if (!current || current.date !== prev.date) return current;
              return {
                ...current,
                recoveryProtocol: generateRecoveryProtocol(violationType),
              };
            });
          }
        }).catch(() => {
          // On error, use static algorithm
          setDailyLog((current) => {
            if (!current || current.date !== prev.date) return current;
            return {
              ...current,
              recoveryProtocol: generateRecoveryProtocol(violationType),
            };
          });
        });
        
        // Set initial protocol (will be updated by AI if available)
        recoveryProtocol = generateRecoveryProtocol(violationType);
      }

      return {
        ...prev,
        fuel: updatedFuel,
        calculatedMetrics: updatedMetrics,
        recoveryProtocol,
      };
    });
  }, [userProfile]);

  const updateStatus = useCallback((status: DailyStatus) => {
    setDailyLog((prev) => {
      if (!prev) {
        const today = new Date().toISOString().split('T')[0];
        return {
          date: today,
          status,
          fuel: [],
          calculatedMetrics: calculateAllMetrics([], userProfile),
        };
      }
      // Status更新時も再計算（userProfileが変わった可能性があるため）
      return {
        ...prev,
        status,
        calculatedMetrics: calculateAllMetrics(prev.fuel, userProfile),
      };
    });
  }, [userProfile]);

  const updateDiary = useCallback((diary: string) => {
    setDailyLog((prev) => {
      if (!prev) {
        const today = new Date().toISOString().split('T')[0];
        return {
          date: today,
          status: {
            sleepScore: 80,
            sunMinutes: 30,
            activityLevel: 'moderate',
          },
          fuel: [],
          calculatedMetrics: calculateAllMetrics([], userProfile),
          diary,
        };
      }
      return {
        ...prev,
        diary,
      };
    });
  }, [userProfile]);

  const updateWeight = useCallback((weight: number | undefined, bodyFatPercentage?: number | undefined) => {
    setDailyLog((prev) => {
      if (!prev) {
        const today = new Date().toISOString().split('T')[0];
        return {
          date: today,
          status: {
            sleepScore: 80,
            sunMinutes: 30,
            activityLevel: 'moderate',
          },
          fuel: [],
          calculatedMetrics: calculateAllMetrics([], userProfile),
          weight,
          bodyFatPercentage,
        };
      }
      return {
        ...prev,
        weight,
        bodyFatPercentage,
      };
    });
    // データ更新を通知
    window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
  }, [userProfile]);

  const setRecoveryProtocol = useCallback((protocol: RecoveryProtocol) => {
    setDailyLog((prev) => {
      if (!prev) {
        const today = new Date().toISOString().split('T')[0];
        return {
          date: today,
          status: {
            sleepScore: 80,
            sunMinutes: 30,
            activityLevel: 'moderate',
          },
          fuel: [],
          calculatedMetrics: calculateAllMetrics([], userProfile),
          recoveryProtocol: protocol,
        };
      }
      return {
        ...prev,
        recoveryProtocol: protocol,
      };
    });
  }, [userProfile]);

  const clearDailyLog = useCallback(() => {
    setDailyLog(null);
  }, []);

  const removeFood = useCallback((index: number) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const updatedFuel = prev.fuel.filter((_, i) => i !== index);
      const updatedMetrics = calculateAllMetrics(updatedFuel, userProfile);
      return {
        ...prev,
        fuel: updatedFuel,
        calculatedMetrics: updatedMetrics,
      };
    });
    // データ更新を通知
    window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
  }, [userProfile]);

  const updateFood = useCallback((index: number, updatedFood: FoodItem) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const updatedFuel = prev.fuel.map((food, i) => (i === index ? updatedFood : food));
      const updatedMetrics = calculateAllMetrics(updatedFuel, userProfile);
      return {
        ...prev,
        fuel: updatedFuel,
        calculatedMetrics: updatedMetrics,
      };
    });
    // データ更新を通知
    window.dispatchEvent(new CustomEvent('dailyLogUpdated'));
  }, [userProfile]);

  return (
    <AppContext.Provider
      value={{
        dailyLog,
        userProfile,
        isLoading,
        error,
        addFood,
        removeFood,
        updateFood,
        updateStatus,
        updateDiary,
        updateWeight,
        setRecoveryProtocol,
        clearDailyLog,
        loadTodayLog,
        loadUserProfile,
        setError,
        clearError,
        syncLocalStorageToSupabase,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

