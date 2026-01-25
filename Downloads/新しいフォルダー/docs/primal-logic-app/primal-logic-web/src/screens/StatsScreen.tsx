/**
 * Stats Screen - Statistics and Chart Display Screen
 *
 * Display nutrient trend charts and weight trend charts
 */

import { useState, useEffect, useMemo } from 'react';
import { getDailyLogs } from '../utils/storage';
import { useApp } from '../context/AppContext';
import NutrientTrendChart from '../components/charts/NutrientTrendChart';
import WeightTrendChart from '../components/charts/WeightTrendChart';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import type { DailyLog } from '../types/index';
import './StatsScreen.css';
import KarmaCounter from '../components/KarmaCounter';
import { isFeatureEnabled } from '../utils/featureFlags';
import Achievements from '../components/Achievements';
import ShareModal from '../components/ShareModal';
import Toast, { type ToastType } from '../components/common/Toast';

export default function StatsScreen() {
  const { userProfile } = useApp();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [selectedNutrient, setSelectedNutrient] = useState<string>('proteinTotal');
  const [selectedPeriod, setSelectedPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [activeTab, setActiveTab] = useState<'nutrients' | 'weight' | 'summary'>('nutrients');
  const [summaryPeriod, setSummaryPeriod] = useState<'week' | 'month' | 'year'>('week');
  const [showShareModal, setShowShareModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ message: string; type: ToastType } | null>(null);

  // Get share count (from localStorage)
  const shareCount = useMemo(() => {
    try {
      const count = localStorage.getItem('primal_logic_share_count');
      return count ? parseInt(count, 10) : 0;
    } catch {
      return 0;
    }
  }, []);

  useEffect(() => {
    loadLogs();
  }, []);

  const loadLogs = async () => {
    const allLogs = await getDailyLogs();
    const sorted = allLogs.sort((a, b) => a.date.localeCompare(b.date));
    setLogs(sorted);
  };

  // Get dynamic target values (reflects all data)
  const targets = useMemo(() => {
    if (!userProfile) return null;
    return getCarnivoreTargets(
      userProfile.gender,
      userProfile.age,
      userProfile.activityLevel,
      userProfile.isPregnant,
      userProfile.isBreastfeeding,
      userProfile.isPostMenopause,
      userProfile.stressLevel,
      userProfile.sleepHours,
      userProfile.exerciseIntensity,
      userProfile.exerciseFrequency,
      userProfile.thyroidFunction,
      userProfile.sunExposureFrequency,
      userProfile.digestiveIssues,
      userProfile.inflammationLevel,
      userProfile.mentalHealthStatus,
      userProfile.supplementMagnesium,
      userProfile.supplementVitaminD,
      userProfile.supplementIodine,
      userProfile.alcoholFrequency,
      userProfile.caffeineIntake,
      userProfile.daysOnCarnivore,
      userProfile.carnivoreStartDate,
      userProfile.forceAdaptationMode,
      userProfile.bodyComposition,
      userProfile.weight,
      userProfile.metabolicStressIndicators,
      userProfile.customNutrientTargets
        ? Object.fromEntries(
            Object.entries(userProfile.customNutrientTargets).map(([key, value]) => [
              key,
              typeof value === 'number' ? { mode: 'manual' as const, value } : value,
            ])
          )
        : undefined
    );
  }, [userProfile]);

  // Nutrient options
  const nutrientOptions = [
    { key: 'proteinTotal', label: 'Protein', unit: 'g', target: targets?.protein },
    { key: 'fatTotal', label: 'Fat', unit: 'g', target: targets?.fat },
    { key: 'sodiumTotal', label: 'Sodium', unit: 'mg', target: targets?.sodium },
    { key: 'magnesiumTotal', label: 'Magnesium', unit: 'mg', target: targets?.magnesium },
    { key: 'effectiveIron', label: 'Iron', unit: 'mg', target: targets?.iron },
    { key: 'effectiveZinc', label: 'Zinc', unit: 'mg', target: targets?.zinc },
    { key: 'effectiveVitC', label: 'Vitamin C', unit: 'mg', target: undefined },
    { key: 'effectiveVitK', label: 'Vitamin K', unit: 'μg', target: undefined },
  ];

  // Generate dummy data (for demo)
  const dummyLogs: DailyLog[] = useMemo(() => {
    return Array.from({ length: 7 }).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dateStr = date.toISOString().split('T')[0];

      // Simulate ideal carnivore diet data
      return {
        id: `dummy-${i}`,
        date: dateStr,
        foods: ['Beef', 'Salt'],
        calculatedMetrics: {
          proteinTotal: 140 + Math.sin(i) * 20, // 120-160g
          fatTotal: 130 + Math.cos(i) * 15, // 115-145g
          carbsTotal: Math.random() * 3, // 0-3g (Strict)
          sodiumTotal: 4000 + Math.random() * 500,
          magnesiumTotal: 400 + Math.random() * 50,
          potassiumTotal: 3000 + Math.random() * 300,
          effectiveIron: 15 + Math.random() * 5,
          effectiveZinc: 20 + Math.random() * 5,
          effectiveVitC: 15 + Math.random() * 5,
          effectiveVitK: 50 + Math.random() * 20,
        },
        weight: userProfile?.weight ? userProfile.weight - i * 0.2 : 70 - i * 0.2, // Gradually losing weight
      } as unknown as DailyLog;
    });
  }, [userProfile]);

  // Determine demo mode
  const isDemoMode = logs.length === 0;
  const displayLogs = isDemoMode ? dummyLogs : logs;

  const selectedNutrientOption = nutrientOptions.find((opt) => opt.key === selectedNutrient);

  return (
    <div className="stats-screen-container">
      <div className="stats-screen-content">
        <h1 className="stats-screen-title">Statistics & Charts</h1>

        {/* Tab switching */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '1.5rem',
            borderBottom: '2px solid #27272a',
          }}
        >
          {(['nutrients', 'weight', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '0.75rem 1.5rem',
                backgroundColor: activeTab === tab ? '#b91c1c' : 'transparent',
                color: activeTab === tab ? 'white' : '#a1a1aa',
                border: 'none',
                borderBottom: activeTab === tab ? '2px solid #b91c1c' : '2px solid transparent',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : '600',
                transition: 'all 0.2s',
                fontSize: '14px',
              }}
            >
              {tab === 'nutrients' ? 'Nutrients' : tab === 'weight' ? 'Weight' : 'Summary'}
            </button>
          ))}
        </div>

        {/* Nutrient chart */}
        {activeTab === 'nutrients' && (
          <div className="stats-screen-nutrients-section">
            {/* Period selection */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1rem',
              }}
            >
              {(['daily', 'weekly', 'monthly'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: selectedPeriod === period ? '#dc2626' : '#27272a',
                    color: selectedPeriod === period ? 'white' : '#a1a1aa',
                    border: '1px solid',
                    borderColor: selectedPeriod === period ? '#dc2626' : '#3f3f46',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                  }}
                >
                  {period === 'daily' ? 'Daily' : period === 'weekly' ? 'Weekly' : 'Monthly'}
                </button>
              ))}
            </div>

            {/* Nutrient selection */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label
                style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  marginBottom: '0.5rem',
                  display: 'block',
                  color: '#e4e4e7',
                }}
              >
                Select Nutrient
              </label>
              <select
                value={selectedNutrient}
                onChange={(e) => setSelectedNutrient(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #27272a',
                  borderRadius: '8px',
                  fontSize: '14px',
                  backgroundColor: '#18181b',
                  color: '#e4e4e7',
                }}
              >
                {nutrientOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Chart display */}
            {selectedNutrientOption && (
              <div className="stats-screen-chart-container">
                <h2
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    marginBottom: '1rem',
                    color: '#ef4444',
                    textShadow: '0 0 5px rgba(239, 68, 68, 0.4)',
                  }}
                >
                  {selectedNutrientOption.label} Trend
                  {isDemoMode && (
                    <span
                      style={{
                        fontSize: '10px',
                        color: '#a1a1aa',
                        marginLeft: '0.5rem',
                        border: '1px solid #a1a1aa',
                        padding: '1px 4px',
                        borderRadius: '4px',
                      }}
                    >
                      SAMPLE
                    </span>
                  )}
                </h2>
                <NutrientTrendChart
                  logs={displayLogs}
                  nutrientKey={selectedNutrientOption.key}
                  nutrientLabel={selectedNutrientOption.label}
                  unit={selectedNutrientOption.unit}
                  targetValue={selectedNutrientOption.target}
                  period={selectedPeriod}
                />
              </div>
            )}
          </div>
        )}

        {/* Weight chart */}
        {activeTab === 'weight' && (
          <div className="stats-screen-weight-section">
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#ef4444',
                textShadow: '0 0 5px rgba(239, 68, 68, 0.4)',
              }}
            >
              Weight Trend
              {isDemoMode && (
                <span
                  style={{
                    fontSize: '10px',
                    color: '#a1a1aa',
                    marginLeft: '0.5rem',
                    border: '1px solid #a1a1aa',
                    padding: '1px 4px',
                    borderRadius: '4px',
                  }}
                >
                  SAMPLE
                </span>
              )}
            </h2>
            <WeightTrendChart logs={displayLogs} period={selectedPeriod} />
          </div>
        )}

        {/* Sleep and lifestyle analysis */}
        {activeTab === 'nutrients' && (
          <div
            style={{
              marginTop: '1.5rem',
              padding: '1.5rem',
              backgroundColor: '#18181b',
              borderRadius: '12px',
              border: '1px solid #27272a',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                marginBottom: '1rem',
                color: '#8b5cf6',
                textShadow: '0 0 5px rgba(139, 92, 246, 0.4)',
              }}
            >
              💤 Sleep and Lifestyle Analysis
            </h2>
            
            {/* Average sleep hours */}
            {(() => {
              const sleepHoursList = displayLogs
                .map((log) => log.status?.sleepHours)
                .filter((h): h is number => h !== undefined);
              const avgSleepHours =
                sleepHoursList.length > 0
                  ? sleepHoursList.reduce((sum, h) => sum + h, 0) / sleepHoursList.length
                  : null;

              if (!avgSleepHours) return null;

              return (
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#27272a',
                    borderRadius: '8px',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
                    平坁E��眠時間
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
                    {avgSleepHours.toFixed(1)} 時間
                  </div>
                </div>
              );
            })()}

            {/* Sleep Score Trend */}
            {(() => {
              const sleepScores = displayLogs
                .map((log) => ({ date: log.date, score: log.status?.sleepScore }))
                .filter((item): item is { date: string; score: number } => item.score !== undefined);

              if (sleepScores.length === 0) return null;

              const avgSleepScore =
                sleepScores.reduce((sum, item) => sum + item.score, 0) / sleepScores.length;

              return (
                <div
                  style={{
                    padding: '1rem',
                    backgroundColor: '#27272a',
                    borderRadius: '8px',
                  }}
                >
                  <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
                    平坁E��眠スコア
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
                    {avgSleepScore.toFixed(0)} / 100
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Summary tab */}
        {activeTab === 'summary' && (
          <div>
            {/* Period selection */}
            <div
              style={{
                display: 'flex',
                gap: '0.5rem',
                marginBottom: '1.5rem',
              }}
            >
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setSummaryPeriod(period)}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: summaryPeriod === period ? '#dc2626' : '#27272a',
                    color: summaryPeriod === period ? 'white' : '#a1a1aa',
                    border: '1px solid',
                    borderColor: summaryPeriod === period ? '#dc2626' : '#3f3f46',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontWeight: '500',
                    fontSize: '14px',
                    transition: 'all 0.2s',
                  }}
                >
                  {period === 'week' ? 'Week' : period === 'month' ? 'Month' : 'Year'}
                </button>
              ))}
            </div>

            {/* Period filtering */}
            {(() => {
              const filteredLogs = displayLogs.filter((log) => {
                const logDate = new Date(log.date);
                const now = new Date();
                const diffDays = Math.floor((now.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24));

                if (summaryPeriod === 'week') return diffDays <= 7;
                if (summaryPeriod === 'month') return diffDays <= 30;
                return diffDays <= 365;
              });

              // Calculate statistics
              const totalProtein = filteredLogs.reduce(
                (sum, log) => sum + (log.calculatedMetrics?.proteinTotal || 0),
                0
              );
              const totalFat = filteredLogs.reduce(
                (sum, log) => sum + (log.calculatedMetrics?.fatTotal || 0),
                0
              );
              const avgProtein = filteredLogs.length > 0 ? totalProtein / filteredLogs.length : 0;
              const avgFat = filteredLogs.length > 0 ? totalFat / filteredLogs.length : 0;

              const periodLabel =
                summaryPeriod === 'week' ? 'This Week' : summaryPeriod === 'month' ? 'This Month' : 'This Year';

              // Share functionality
              const handleShare = () => {
                setShowShareModal(true);
              };

              const handleShareSuccess = () => {
                // Count share count
                const newCount = shareCount + 1;
                localStorage.setItem('primal_logic_share_count', newCount.toString());
                
                // Fire event to notify Achievements component
                window.dispatchEvent(new CustomEvent('shareCountUpdated', { detail: newCount }));
                
                // Show toast notification
                setToastMessage({ message: 'Shared successfully!', type: 'success' });
              };

              const shareData = {
                title: `${periodLabel} Carnivore Record`,
                text: `${periodLabel} Carnivore Record\nDays Recorded: ${filteredLogs.length} days\nAvg Protein: ${avgProtein.toFixed(0)}g\nAvg Fat: ${avgFat.toFixed(0)}g\n\n#CarnivoreDiet #PrimalLogic`,
                url: window.location.href,
              };

              return (
                <>
                  {/* Share button (placed as icon in top right) */}
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      marginBottom: '1rem',
                    }}
                  >
                    <button
                      onClick={handleShare}
                      style={{
                        padding: '0.5rem',
                        backgroundColor: 'transparent',
                        color: '#a1a1aa',
                        border: '1px solid #27272a',
                        borderRadius: '6px',
                        fontSize: '18px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '40px',
                        height: '40px',
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#27272a';
                        e.currentTarget.style.color = '#ffffff';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = '#a1a1aa';
                      }}
                      title={`Share ${summaryPeriod === 'week' ? 'Weekly' : summaryPeriod === 'month' ? 'Monthly' : 'Yearly'} Record`}
                    >
                      📤
                    </button>
                  </div>

                  {/* Share Modal */}
                  <ShareModal
                    isOpen={showShareModal}
                    onClose={() => setShowShareModal(false)}
                    shareData={shareData}
                    onShareSuccess={handleShareSuccess}
                  />

                  {/* Toast notification */}
                  {toastMessage && (
                    <Toast
                      message={toastMessage.message}
                      type={toastMessage.type}
                      onClose={() => setToastMessage(null)}
                    />
                  )}

                  {/* Summary card */}
                  <div
                    style={{
                      backgroundColor: '#18181b',
                      padding: '1.5rem',
                      borderRadius: '12px',
                      border: '1px solid #27272a',
                      marginBottom: '1.5rem',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#f43f5e',
                        textShadow: '0 0 5px rgba(244, 63, 94, 0.4)',
                      }}
                    >
                      {periodLabel} Summary
                    </h2>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '1rem',
                      }}
                    >
                      <div
                        style={{
                          padding: '1rem',
                          backgroundColor: '#27272a',
                          borderRadius: '8px',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
                          Days Recorded
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
                          {filteredLogs.length} days
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '1rem',
                          backgroundColor: '#27272a',
                          borderRadius: '8px',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
                          Avg Protein
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
                          {avgProtein.toFixed(0)} g
                        </div>
                      </div>

                      <div
                        style={{
                          padding: '1rem',
                          backgroundColor: '#27272a',
                          borderRadius: '8px',
                        }}
                      >
                        <div style={{ fontSize: '12px', color: '#a1a1aa', marginBottom: '0.5rem' }}>
                          Avg Fat
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#e4e4e7' }}>
                          {avgFat.toFixed(0)} g
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio-Tuner records (bowel movement history) */}
                  <div
                    style={{
                      marginTop: '1.5rem',
                      padding: '1.5rem',
                      backgroundColor: '#18181b',
                      borderRadius: '12px',
                      border: '1px solid #27272a',
                    }}
                  >
                    <h2
                      style={{
                        fontSize: '18px',
                        fontWeight: 'bold',
                        marginBottom: '1rem',
                        color: '#f43f5e',
                        textShadow: '0 0 5px rgba(244, 63, 94, 0.4)',
                      }}
                    >
                      🧬 Bio-Tuner Record
                    </h2>
                    {(() => {
                      const bowelMovementLogs = filteredLogs
                        .filter((log) => log.status?.bowelMovement)
                        .map((log) => ({
                          date: log.date,
                          status: log.status.bowelMovement!.status,
                          bristolScale: log.status.bowelMovement!.bristolScale,
                          notes: log.status.bowelMovement!.notes,
                        }))
                        .reverse(); // Latest first

                      if (bowelMovementLogs.length === 0) {
                        return (
                          <div
                            style={{
                              textAlign: 'center',
                              padding: '2rem',
                              color: '#71717a',
                            }}
                          >
                            <div style={{ fontSize: '48px', marginBottom: '0.5rem' }}>🧬</div>
                            <div style={{ fontSize: '14px' }}>No Bio-Tuner records yet</div>
                            <div style={{ fontSize: '12px', marginTop: '0.5rem' }}>
                              Record your bowel movement status in Diary/Bio-Tuner
                            </div>
                          </div>
                        );
                      }

                      const statusLabels: Record<string, string> = {
                        normal: '正常',
                        constipated: '硬ぁE出なぁE,
                        loose: '緩ぁE,
                        watery: '水状',
                      };

                      const statusColors: Record<string, string> = {
                        normal: '#22c55e',
                        constipated: '#f59e0b',
                        loose: '#3b82f6',
                        watery: '#ef4444',
                      };

                      return (
                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '0.75rem',
                          }}
                        >
                          {bowelMovementLogs.slice(0, 10).map((record, index) => (
                            <div
                              key={index}
                              style={{
                                padding: '1rem',
                                backgroundColor: '#27272a',
                                borderRadius: '8px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#e4e4e7',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  {new Date(record.date).toLocaleDateString('ja-JP', {
                                    month: 'short',
                                    day: 'numeric',
                                  })}
                                </div>
                                <div
                                  style={{
                                    fontSize: '12px',
                                    color: '#a1a1aa',
                                  }}
                                >
                                  {record.notes || 'No notes'}
                                </div>
                              </div>
                              <div
                                style={{
                                  padding: '0.5rem 1rem',
                                  backgroundColor: statusColors[record.status] || '#71717a',
                                  color: 'white',
                                  borderRadius: '6px',
                                  fontSize: '12px',
                                  fontWeight: '600',
                                }}
                              >
                                {statusLabels[record.status] || record.status}
                              </div>
                            </div>
                          ))}
                          {bowelMovementLogs.length > 10 && (
                            <div
                              style={{
                                textAlign: 'center',
                                fontSize: '12px',
                                color: '#71717a',
                                padding: '0.5rem',
                              }}
                            >
                              + {bowelMovementLogs.length - 10} more records
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                </>
              );
            })()}
          </div>
        )}

        {/* 🥩 カルマカウンター */}
        {activeTab !== 'summary' && isFeatureEnabled('karmaCounter') && (
          <KarmaCounter logs={displayLogs} />
        )}

        {/* 🏆 実績シスチE�� */}
        {activeTab !== 'summary' && (() => {
          // フィードバチE��回数を取征E          let feedbackCount = 0;
          try {
            const count = localStorage.getItem('primal_logic_feedback_count');
            feedbackCount = count ? parseInt(count, 10) : 0;
          } catch {
            feedbackCount = 0;
          }
          // 採用されたフィードバチE��回数を取征E          let contributedFeedbackCount = 0;
          try {
            const count = localStorage.getItem('primal_logic_contributed_feedback_count');
            contributedFeedbackCount = count ? parseInt(count, 10) : 0;
          } catch {
            contributedFeedbackCount = 0;
          }
          return <Achievements logs={displayLogs} feedbackCount={feedbackCount} contributedFeedbackCount={contributedFeedbackCount} />;
        })()}
      </div>
    </div>
  );
}

