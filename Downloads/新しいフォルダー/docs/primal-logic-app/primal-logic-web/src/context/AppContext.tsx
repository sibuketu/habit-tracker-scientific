/**
 * CarnivoreOS - App Context (Web)
 *
 * グローバル状態管理（日次ログ、ユーザー情報、計算結果など）
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from 'react';
import type {
  DailyLog,
  FoodItem,
  DailyStatus,
  RecoveryProtocol,
  UserProfile,
  CalculatedMetrics,
} from '../types/index';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { generateRecoveryProtocol, detectViolationType } from '../utils/recoveryAlgorithm';
import { generateRecoveryProtocolWithAI } from '../utils/openaiApi';
import {
  saveDailyLog,
  getTodayLog,
  getUserProfile,
  syncLocalStorageToSupabase as syncStorage,
} from '../utils/storage';
import { defaultUserProfile } from '../types/index';
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
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: 'Susam',
    gender: 'male',
    age: 30, // Estimated
    height: 170,
    weight: 70,
    activityLevel: 'moderate',
    dietType: 'lion',
    ...defaultUserProfile,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // userProfile変更時のcalculatedMetrics再計算ループ防止のため、prevUserProfileRefで監視
  const prevUserProfileRef = useRef<UserProfile | null>(null);

  useEffect(() => {
    // userProfile変更時のみ、既存dailyLogのcalculatedMetricsを再計算
    if (!userProfile || !dailyLog || !dailyLog.fuel || dailyLog.fuel.length === 0) {
      prevUserProfileRef.current = userProfile;
      return;
    }

    // userProfile変更時のみ再計算
    if (userProfile !== prevUserProfileRef.current) {
      const recalculatedMetrics = calculateAllMetrics(dailyLog.fuel, userProfile);
      const recalculatedMetricsStr = JSON.stringify(recalculatedMetrics);
      const currentMetricsStr = JSON.stringify(dailyLog.calculatedMetrics || {});

      // 実際に値が変わる場合のみ更新（ループ防止）
      if (recalculatedMetricsStr !== currentMetricsStr) {
        setDailyLog((prev) => {
          if (!prev || prev.date !== dailyLog.date) return prev;
          return {
            ...prev,
            calculatedMetrics: recalculatedMetrics,
          };
        });
      }
      prevUserProfileRef.current = userProfile;
    }
  }, [userProfile, dailyLog?.date]); // userProfileとdateのみ監視（fuelは監視しない - ループ防止）

  // Load user profile first
  const loadUserProfile = useCallback(async () => {
    try {
      setIsLoading(true);
      const profile = await getUserProfile();
      if (profile) {
        setUserProfile((prev) => ({ ...prev, ...profile }));
      }
    } catch (err: any) {
      logError(err, { component: 'AppContext', action: 'loadUserProfile' });
      // Don't set global error for profile load failure, just log it
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load daily log
  const loadTodayLog = useCallback(async () => {
    try {
      setIsLoading(true);
      const log = await getTodayLog();
      setDailyLog(log);
    } catch (err: any) {
      logError(err, { component: 'AppContext', action: 'loadTodayLog' });
      setError('Failed to load today\'s log');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync to Supabase
  const syncLocalStorageToSupabase = useCallback(async () => {
    try {
      await syncStorage();
    } catch (err: any) {
      logError(err, { component: 'AppContext', action: 'syncLocalStorageToSupabase' });
      // Silent fail
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadUserProfile().then(() => loadTodayLog());
  }, [loadUserProfile, loadTodayLog]);

  // Save daily log whenever it changes
  useEffect(() => {
    if (dailyLog) {
      saveDailyLog(dailyLog);
    }
  }, [dailyLog]);

  const addFood = useCallback((food: FoodItem) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const newFuel = [...prev.fuel, food];
      return {
        ...prev,
        fuel: newFuel,
        calculatedMetrics: calculateAllMetrics(newFuel, userProfile), // プロファイル考慮
      };
    });
  }, [userProfile]);

  const removeFood = useCallback((index: number) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const newFuel = [...prev.fuel];
      newFuel.splice(index, 1);
      return {
        ...prev,
        fuel: newFuel,
        calculatedMetrics: calculateAllMetrics(newFuel, userProfile), // プロファイル考慮
      };
    });
  }, [userProfile]);

  const updateFood = useCallback((index: number, food: FoodItem) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const newFuel = [...prev.fuel];
      newFuel[index] = food;
      return {
        ...prev,
        fuel: newFuel,
        calculatedMetrics: calculateAllMetrics(newFuel, userProfile), // プロファイル考慮
      };
    });
  }, [userProfile]);

  const updateStatus = useCallback((status: DailyStatus) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      const updatedLog = { ...prev, status };

      // Auto-detect violations based on status/food if needed
      // This is simplified; real violations detection usually happens on InputScreen logic or AI

      return updatedLog;
    });
  }, []);

  const updateDiary = useCallback((diary: string) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      return { ...prev, diary };
    });
  }, []);

  const updateWeight = useCallback((weight: number | undefined, bodyFatPercentage?: number | undefined) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      return { ...prev, weight, bodyFatPercentage };
    });
  }, []);

  const setRecoveryProtocol = useCallback((protocol: RecoveryProtocol) => {
    setDailyLog((prev) => {
      if (!prev) return null;
      return { ...prev, recoveryProtocol: protocol };
    });
  }, []);

  const clearDailyLog = useCallback(() => {
    loadTodayLog(); // Reload implies clearing if today's log is empty or reset
    // Actually, maybe we want to force reset
    setDailyLog(null); // Or reset to empty object structure
    loadTodayLog();
  }, [loadTodayLog]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

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
