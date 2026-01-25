/**
 * CarnivoreOS - History Screen (Web version)
 *
 * Display of daily logs with nutrient gauges
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/i18n';
import { useSettings } from '../hooks/useSettings';
import { getDailyLogs } from '../utils/storage';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { getNutrientColor } from '../utils/gaugeUtils';
import {
  NUTRIENT_TIERS,
  TIER1_CATEGORIES,
  isNutrientVisibleInMode,
} from '../utils/nutrientPriority';
import { ALL_NUTRIENT_DISPLAY_CONFIGS } from '../utils/nutrientDisplaySettings';
import MiniNutrientGauge from '../components/MiniNutrientGauge';
import type { DailyLog } from '../types/index';
import './HistoryScreen.css';

type PeriodFilter = 'today' | '7day' | '30day' | 'all' | 'starAll';
type HistoryTab = 'summary' | 'history' | 'photoGallery';

export default function HistoryScreen() {
  const { t } = useTranslation();
  const { userProfile } = useApp();
  const { nutrientDisplayMode } = useSettings();
  const [logs, setLogs] = useState<DailyLog[]>([]);
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set());
  const [showTier2Nutrients, setShowTier2Nutrients] = useState(false);
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('all');
  const [activeTab, setActiveTab] = useState<HistoryTab>('history');

  // Load logs
  useEffect(() => {
    const loadLogs = async () => {
      try {
        const allLogs = await getDailyLogs();
        const logsArray = Object.values(allLogs);
        // Sort by date (newest first)
        const sorted = logsArray.sort((a, b) => b.date.localeCompare(a.date));
        setLogs(sorted);
      } catch (error) {
        console.error('Failed to load logs:', error);
      }
    };
    loadLogs();
  }, []);

  // Get dynamic target values
  const dynamicTargets = useMemo(() => {
    if (!userProfile) return {};
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

  // Get unit for nutrient
  const getNutrientUnit = useCallback((nutrientKey: string): string => {
    const config = ALL_NUTRIENT_DISPLAY_CONFIGS.find(c => c.key === nutrientKey);
    return config?.unit || 'mg';
  }, []);

  // Toggle log expansion
  const toggleLog = useCallback((logId: string) => {
    setExpandedLogs(prev => {
      const next = new Set(prev);
      if (next.has(logId)) {
        next.delete(logId);
      } else {
        next.add(logId);
      }
      return next;
    });
  }, []);

  // Format date
  const formatDate = useCallback((dateStr: string): string => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    });
  }, []);

  // Auto-expand Tier2 in detailed mode
  useEffect(() => {
    if (nutrientDisplayMode === 'detailed') {
      setShowTier2Nutrients(true);
    } else if (nutrientDisplayMode === 'simple') {
      setShowTier2Nutrients(false);
    }
  }, [nutrientDisplayMode]);

  // Filter logs by period
  const filteredLogs = useMemo(() => {
    if (periodFilter === 'all' || periodFilter === 'starAll') {
      return logs;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const cutoffDate = new Date(today);

    if (periodFilter === 'today') {
      cutoffDate.setDate(today.getDate() - 1);
    } else if (periodFilter === '7day') {
      cutoffDate.setDate(today.getDate() - 7);
    } else if (periodFilter === '30day') {
      cutoffDate.setDate(today.getDate() - 30);
    }

    return logs.filter(log => {
      const logDate = new Date(log.date);
      logDate.setHours(0, 0, 0, 0);
      return logDate >= cutoffDate;
    });
  }, [logs, periodFilter]);

  return (
    <div className="history-screen-container">
      <div className="history-screen-content">
        <h1 className="history-screen-title">{t('history.title') || 'History'}</h1>

        {/* Period Filter Buttons */}
        <div className="history-period-filter">
          <button
            className={`history-period-btn ${periodFilter === 'today' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('today')}
          >
            Today
          </button>
          <button
            className={`history-period-btn ${periodFilter === '7day' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('7day')}
          >
            7 day
          </button>
          <button
            className={`history-period-btn ${periodFilter === '30day' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('30day')}
          >
            30 day
          </button>
          <button
            className={`history-period-btn ${periodFilter === 'all' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('all')}
          >
            All
          </button>
          <button
            className={`history-period-btn ${periodFilter === 'starAll' ? 'active' : ''}`}
            onClick={() => setPeriodFilter('starAll')}
          >
            ⭐ All
          </button>
        </div>

        {/* Tabs */}
        <div className="history-tabs">
          <button
            className={`history-tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            Summary
          </button>
          <button
            className={`history-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            className={`history-tab-btn ${activeTab === 'photoGallery' ? 'active' : ''}`}
            onClick={() => setActiveTab('photoGallery')}
          >
            Photo Gallery
          </button>
        </div>

        {logs.length === 0 ? (
          <div className="history-screen-empty">
            <p className="history-screen-empty-text">{t('history.noLogs') || 'No logs yet'}</p>
            <p className="history-screen-empty-subtext">
              {t('history.startLogging') || 'Start logging your meals to see history here.'}
            </p>
          </div>
        ) : (
          <div className="history-screen-logs">
            {activeTab === 'summary' && (
              <div className="history-summary-content">
                <p>Summary content will be displayed here.</p>
              </div>
            )}

            {activeTab === 'photoGallery' && (
              <div className="history-photo-gallery-content">
                <p>Photo Gallery content will be displayed here.</p>
              </div>
            )}

            {activeTab === 'history' && filteredLogs.map(log => {
              const isExpanded = expandedLogs.has(log.id);
              const metrics = log.calculatedMetrics || {
                totalCalories: 0,
                totalProtein: 0,
                totalFat: 0,
                totalCarbs: 0,
                pfRatio: 0,
                omegaRatio: 0,
                nutrients: {},
              };

              return (
                <div key={log.id} className="history-screen-log-wrapper">
                  <div
                    className={`history-screen-log-item ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => toggleLog(log.id)}
                  >
                    <div className="history-screen-log-header">
                      <div className="history-screen-log-date">{formatDate(log.date)}</div>
                      <div className="history-screen-log-summary">
                        <span className="history-screen-log-summary-text">
                          P: {metrics.totalProtein.toFixed(1)}g / F: {metrics.totalFat.toFixed(1)}g
                        </span>
                      </div>
                      <span className="history-screen-expand-icon">
                        {isExpanded ? '▼' : '▶'}
                      </span>
                    </div>

                    {isExpanded && (
                      <div className="history-screen-detail">
                        {/* Nutrients Breakdown */}
                        <div className="nutrients-section">
                          <h3>{t('home.nutrientBreakdown')}</h3>

                          {/* Group 1: Electrolytes (Tier 1) */}
                          <div className="nutrient-group nutrient-group-electrolytes">
                            <div className="nutrient-group-header">
                              <span className="nutrient-group-icon">⚡</span>
                              <h4 className="nutrient-group-title">
                                {t('home.electrolytes')}
                              </h4>
                            </div>
                            <div className="minigauge-grid">
                              {TIER1_CATEGORIES.electrolytes.map(key => (
                                <MiniNutrientGauge
                                  key={key}
                                  label={t(`nutrients.${key}`)}
                                  currentDailyTotal={metrics.nutrients[key] || 0}
                                  target={dynamicTargets[key as keyof typeof dynamicTargets] || 0}
                                  unit={getNutrientUnit(key)}
                                  color={getNutrientColor(key)}
                                  nutrientKey={key}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Group 2: Macros (Tier 1) */}
                          <div className="nutrient-group nutrient-group-macros">
                            <div className="nutrient-group-header">
                              <span className="nutrient-group-icon">🥩</span>
                              <h4 className="nutrient-group-title">
                                {t('home.macros')}
                              </h4>
                            </div>
                            <div className="minigauge-grid">
                              {TIER1_CATEGORIES.macros.map(key => (
                                <MiniNutrientGauge
                                  key={key}
                                  label={t(`nutrients.${key}`)}
                                  currentDailyTotal={metrics.nutrients[key] || 0}
                                  target={dynamicTargets[key as keyof typeof dynamicTargets] || 0}
                                  unit={getNutrientUnit(key)}
                                  color={getNutrientColor(key)}
                                  nutrientKey={key}
                                />
                              ))}
                            </div>
                          </div>

                          {/* Group 3: Other Nutrients (Tier 2 & Tier 3) */}
                          {(showTier2Nutrients || nutrientDisplayMode === 'detailed') && (
                            <div className="nutrient-group nutrient-group-others">
                              <div className="nutrient-group-header">
                                <span className="nutrient-group-icon">📊</span>
                                <h4 className="nutrient-group-title">
                                  {t('home.otherNutrients')}
                                </h4>
                              </div>
                              <div className="minigauge-grid">
                                {/* Tier 2 Nutrients */}
                                {NUTRIENT_TIERS.tier2.map(key => (
                                  <MiniNutrientGauge
                                    key={key}
                                    label={t(`nutrients.${key}`)}
                                    currentDailyTotal={metrics.nutrients[key] || 0}
                                    target={dynamicTargets[key as keyof typeof dynamicTargets] || 0}
                                    unit={getNutrientUnit(key)}
                                    color={getNutrientColor(key)}
                                    nutrientKey={key}
                                  />
                                ))}

                                {/* Tier 3 Nutrients (only in detailed mode) */}
                                {nutrientDisplayMode === 'detailed' && NUTRIENT_TIERS.tier3.map(key => (
                                  <MiniNutrientGauge
                                    key={key}
                                    label={t(`nutrients.${key}`)}
                                    currentDailyTotal={metrics.nutrients[key] || 0}
                                    target={dynamicTargets[key as keyof typeof dynamicTargets] || 0}
                                    unit={getNutrientUnit(key)}
                                    color={getNutrientColor(key)}
                                    nutrientKey={key}
                                  />
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Expand button for Standard mode */}
                          {!showTier2Nutrients && nutrientDisplayMode !== 'detailed' && (
                            <button
                              className="expand-nutrients-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowTier2Nutrients(true);
                              }}
                            >
                              {t('home.showMoreNutrients')}
                            </button>
                          )}
                        </div>

                        {/* Food List */}
                        {log.fuel && log.fuel.length > 0 && (
                          <div className="history-screen-food-list">
                            <h4>{t('history.foods') || 'Foods'}</h4>
                            {log.fuel.map((food, idx) => (
                              <div key={idx} className="history-screen-food-item">
                                {food.name} ({food.weight || 100}g)
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {activeTab === 'history' && filteredLogs.length === 0 && (
              <div className="history-screen-empty">
                <p className="history-screen-empty-text">No logs found for the selected period.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
