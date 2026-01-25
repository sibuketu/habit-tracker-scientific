/**
 * CarnivoreOS - Home Screen (Web version)
 *
 * Display of nutrient gauges and basic navigation
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/i18n';
import MiniNutrientGauge from '../components/MiniNutrientGauge';
import OmegaRatioGauge from '../components/OmegaRatioGauge';
import CalciumPhosphorusRatioGauge from '../components/CalciumPhosphorusRatioGauge';
// Future feature: インスリン・グルカゴン比率など、詳細な代謝マーカーを調節して表示
// import InsulinGlucagonRatioGauge from '../components/InsulinGlucagonRatioGauge';
// ArgumentCard removed
import RecoveryProtocolScreen from './RecoveryProtocolScreen';
import ButcherSelect from '../components/butcher/ButcherSelect';
import PFRatioGauge from '../components/gauge/PFRatioGauge';
// SymptomChecker is removed - replaced with AI Prompt Chips in Magic Input
import { useNutrition, type PreviewData } from '../hooks/useNutrition';
import { useSettings } from '../hooks/useSettings';
// ArgumentCard logic removed
// ArgumentCard logic removed
import { getNutrientDisplaySettings, type NutrientKey } from '../utils/nutrientDisplaySettings';
import { getFeatureDisplaySettings } from '../utils/featureDisplaySettings';
import {
  NUTRIENT_TIERS,
  TIER1_CATEGORIES,
  isNutrientVisibleInMode,
} from '../utils/nutrientPriority';
import { ALL_NUTRIENT_DISPLAY_CONFIGS } from '../utils/nutrientDisplaySettings';
import { getAllFoodHistory } from '../utils/foodHistory';
import { getMyFoods, addMyFood, removeMyFood, type MyFoodItem } from '../utils/myFoodsStorage';
import { searchFoods, getFoodById } from '../data/foodsDatabase';
import { getTodayLog, getDailyLogs } from '../utils/storage';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { calculateStreak, type StreakData } from '../utils/streakCalculator';
import { calculateTransitionProgress } from '../data/transitionGuide';
import TransitionBanner from '../components/TransitionBanner';
import TransitionGuideModal from '../components/TransitionGuideModal';
import BarcodeScannerModal from '../components/BarcodeScannerModal';
import { getNutrientColor } from '../utils/gaugeUtils';
import type { AnimalType } from '../data/deepNutritionData';
import type { FoodItem, CalculatedMetrics } from '../types/index';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import PhotoAnalysisModal from '../components/PhotoAnalysisModal';
import FoodEditModal from '../components/dashboard/FoodEditModal';
import FastingTimer from '../components/FastingTimer';
import { getFavorites, type FavoriteItem } from '../utils/favoritesStorage';
// Notification management removed - now handled by NotificationDropdown component
import NotificationDropdown from '../components/NotificationDropdown';
import Toast, { type ToastType } from '../components/common/Toast';
import './HomeScreen.css';

interface HomeScreenProps {
  onOpenFatTabReady?: (callback: () => void) => void;
  onAddFoodReady?: (callback: (foodItem: FoodItem) => void) => void;
}

export default function HomeScreen({ onOpenFatTabReady, onAddFoodReady }: HomeScreenProps = {}) {
  const { t } = useTranslation();
  const { dailyLog, setRecoveryProtocol, addFood, userProfile } = useApp();
  const { previewData, setPreview, clearPreview } = useNutrition();
  const { showNutrientPreview, nutrientDisplayMode } = useSettings();
  const featureDisplaySettings = getFeatureDisplaySettings();

  // 詳細モードでは自動的にTier2を開放
  useEffect(() => {
    if (nutrientDisplayMode === 'detailed') {
      setShowTier2Nutrients(true);
    } else if (nutrientDisplayMode === 'simple') {
      setShowTier2Nutrients(false);
    }
  }, [nutrientDisplayMode]);

  // Get unit for nutrient
  const getNutrientUnit = useCallback((nutrientKey: string): string => {
    const config = ALL_NUTRIENT_DISPLAY_CONFIGS.find(c => c.key === nutrientKey);
    return config?.unit || 'mg';
  }, []);

  // Get Bio-Tuner adjustment
  const [fatAdjustment, setFatAdjustment] = useState<{ recommendedFatTotal: number; adjustmentPercentage: number; notification?: { message: string; priority: 'info' | 'warning' | 'important' } } | null>(null);


  // Get dynamic target values (from user profile) with Bio-Tuner adjustment
  const dynamicTargets = useMemo(() => {
    const baseTargets = getCarnivoreTargets(
      userProfile?.gender,
      userProfile?.age,
      userProfile?.activityLevel,
      userProfile?.isPregnant,
      userProfile?.isBreastfeeding,
      userProfile?.isPostMenopause,
      userProfile?.stressLevel,
      userProfile?.sleepHours,
      userProfile?.exerciseIntensity,
      userProfile?.exerciseFrequency,
      userProfile?.thyroidFunction,
      userProfile?.sunExposureFrequency,
      userProfile?.digestiveIssues,
      userProfile?.inflammationLevel,
      // Bio-Tuner: If adjustment exists, use recommended fat
      // Otherwise undefined to let getCarnivoreTargets calculate base
      fatAdjustment ? fatAdjustment.recommendedFatTotal : undefined
    );
    return baseTargets;
  }, [userProfile, fatAdjustment]);

  // Memoize processed daily log data
  const currentMetrics = useMemo(() => {
    return dailyLog?.calculatedMetrics || {
      totalCalories: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      pfRatio: 0,
      omegaRatio: 0,
      nutrients: {},
    };
  }, [dailyLog?.calculatedMetrics]);

  const [showScanner, setShowScanner] = useState(false);
  const [showPhotoAnalysis, setShowPhotoAnalysis] = useState(false);
  const [showTransitionGuide, setShowTransitionGuide] = useState(false);
  const [showTier2Nutrients, setShowTier2Nutrients] = useState(false); // To expand hidden nutrients
  const [streakData, setStreakData] = useState<StreakData>({ currentStreak: 0, longestStreak: 0, lastLogDate: null, history: [] });
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [showFoodEditModal, setShowFoodEditModal] = useState(false); // For editing logs
  const [editTargetIndex, setEditTargetIndex] = useState<number | null>(null); // Index of food to edit

  // Toast state
  const [toast, setToast] = useState<{ message: string; type: ToastType; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false,
  });

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    setToast({ message, type, isVisible: true });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, isVisible: false }));
  }, []);

  useEffect(() => {
    // Calculate streak
    const loadStreak = async () => {
      try {
        const logs = await getDailyLogs();
        const data = calculateStreak(Object.values(logs));
        setStreakData(data);
      } catch (error) {
        // Silent fail
      }
    };
    loadStreak();

    // Calculate transition progress
    if (dailyLog && dailyLog.date) { // Only if dailyLog is loaded
      const progressData = calculateTransitionProgress(undefined, userProfile?.carnivoreStartDate);
      setTransitionProgress(progressData ? progressData.progress : 100);
    }
  }, [dailyLog, userProfile]); // Dependency on dailyLog ensures refresh after save

  // Handle barcode scan result
  const handleBarcodeDetected = async (code: string) => {
    try {
      // 1. Search in local MyFoods first (fastest)
      // Note: MyFoods doesn't strictly have barcode field yet, assuming we might add it or search name
      // For now, let's search strict match if we store barcode.
      // Since current implementation relies on global data, let's look at mock DB

      const product = await searchFoods(code); // Re-use search with barcode query
      if (product && product.length > 0) {
        addFood(product[0]);
        setShowScanner(false);
        showToast(t('home.foodAdded'), 'success');
      } else {
        // Not found
        showToast(t('home.productNotFound'), 'error');
        setShowScanner(false);
      }
    } catch (error) {
      logError(error, { component: 'HomeScreen', action: 'handleBarcodeDetected' });
      showToast(t('common.error'), 'error');
      setShowScanner(false);
    }
  };

  const handleEditFood = (index: number) => {
    setEditTargetIndex(index);
    setShowFoodEditModal(true);
  };

  const handleSaveEdit = (updatedFood: FoodItem) => {
    if (editTargetIndex !== null) {
      const { updateFood } = useApp(); // Get function from context (need to expose it)
      // Since updateFood is not exposed in destructuring above, let's grab it here or assume it is available
      // Actually HomeScreenProps doesn't expose it, need to get from useApp()
      // Let's assume useApp returns updateFood. If not, we need to add it to Context.
      // (Added updateFood to AppContextType in AppContext.tsx)
      const { updateFood: contextUpdateFood } = useApp();
      contextUpdateFood(editTargetIndex, updatedFood);
      showToast(t('home.foodUpdated'), 'success');
    }
    setEditTargetIndex(null);
    setShowFoodEditModal(false);
  };

  const handleDeleteFood = (index: number) => {
    if (window.confirm(t('home.confirmDelete'))) {
      const { removeFood } = useApp();
      removeFood(index);
      showToast(t('home.foodDeleted'), 'success');
    }
  };

  return (
    <div className="home-screen-container">
      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Header / Top Bar */}
      <div className="home-header">
        <div className="home-title-area">
          <h1 className="home-title">CarnivOS</h1>
          <span className="home-date">{new Date().toLocaleDateString()}</span>
        </div>
        <div className="home-header-actions">
          <div className="streak-display">
            <span className="streak-icon">🔥</span>
            <span className="streak-count">{streakData.currentStreak}</span>
          </div>
          {/* Notification Bell */}
          <NotificationDropdown onNavigateToSettings={() => {
            // Navigation logic if needed
          }} />
        </div>
      </div>

      {/* Transition Progress Banner (if active) */}
      {transitionProgress < 100 && (
        <TransitionBanner
          progress={transitionProgress}
          onClick={() => setShowTransitionGuide(true)}
        />
      )}

      {/* Modals */}
      {showTransitionGuide && (
        <TransitionGuideModal onClose={() => setShowTransitionGuide(false)} />
      )}

      {showScanner && (
        <BarcodeScannerModal
          onDetected={handleBarcodeDetected}
          onClose={() => setShowScanner(false)}
        />
      )}

      {showPhotoAnalysis && (
        <PhotoAnalysisModal
          onClose={() => setShowPhotoAnalysis(false)}
          onAnalysisComplete={(foods) => {
            foods.forEach(f => addFood(f));
            showToast(t('home.photoAnalysisComplete'), 'success');
            setShowPhotoAnalysis(false);
          }}
        />
      )}

      {showFoodEditModal && dailyLog && editTargetIndex !== null && dailyLog.fuel[editTargetIndex] && (
        <FoodEditModal
          foodItem={dailyLog.fuel[editTargetIndex]}
          onSave={handleSaveEdit}
          onClose={() => {
            setShowFoodEditModal(false);
            setEditTargetIndex(null);
          }}
        />
      )}

      {/* Fasting Timer */}
      <div className="dashboard-section">
        <FastingTimer />
      </div>

      {/* Main Metrics Area */}
      <div className="metrics-grid">
        {/* P:F Ratio Main Gauge */}
        <div className="main-metric-card">
          <PFRatioGauge
            metrics={currentMetrics}
            previewMetrics={showNutrientPreview ? previewData : null}
            targetPFRatio={1.0} // Ideal Carnivore Ratio
          />
        </div>

        {/* Omega Ratio */}
        <div className="main-metric-card">
          <OmegaRatioGauge
            omega3={currentMetrics.nutrients.omega3 || 0}
            omega6={currentMetrics.nutrients.omega6 || 0}
            previewOmega3={showNutrientPreview && previewData ? previewData.nutrients.omega3 : 0}
            previewOmega6={showNutrientPreview && previewData ? previewData.nutrients.omega6 : 0}
          />
        </div>

        {/* Ca:P Ratio (if significant) */}
        <div className="main-metric-card">
          <CalciumPhosphorusRatioGauge
            calcium={currentMetrics.nutrients.calcium || 0}
            phosphorus={currentMetrics.nutrients.phosphorus || 0}
            previewCalcium={showNutrientPreview && previewData ? previewData.nutrients.calcium : 0}
            previewPhosphorus={showNutrientPreview && previewData ? previewData.nutrients.phosphorus : 0}
          />
        </div>
      </div>

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
                currentDailyTotal={currentMetrics.nutrients[key] || 0}
                previewAmount={showNutrientPreview && previewData ? previewData.nutrients[key] || 0 : 0}
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
                currentDailyTotal={currentMetrics.nutrients[key] || 0}
                previewAmount={showNutrientPreview && previewData ? previewData.nutrients[key] || 0 : 0}
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
                  currentDailyTotal={currentMetrics.nutrients[key] || 0}
                  previewAmount={showNutrientPreview && previewData ? previewData.nutrients[key] || 0 : 0}
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
                  currentDailyTotal={currentMetrics.nutrients[key] || 0}
                  previewAmount={showNutrientPreview && previewData ? previewData.nutrients[key] || 0 : 0}
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
          <button className="expand-nutrients-btn" onClick={() => setShowTier2Nutrients(true)}>
            {t('home.showMoreNutrients')}
          </button>
        )}
      </div>

      {/* Logged Foods List (Simplified) */}
      <div className="logged-foods-section">
        <h3>{t('home.todaysLog')}</h3>
        {dailyLog?.fuel.length === 0 ? (
          <p className="no-logs-msg">{t('home.noLogsYet')}</p>
        ) : (
          <div className="food-list">
            {dailyLog?.fuel.map((food, idx) => (
              <div key={idx} className="food-list-item" onClick={() => handleEditFood(idx)}>
                <div className="food-info">
                  <span className="food-name">{food.name} ({(food.weight || 100)}g)</span>
                  <span className="food-macros">P:{food.protein.toFixed(1)} F:{food.fat.toFixed(1)}</span>
                </div>
                <button className="delete-btn" onClick={(e) => { e.stopPropagation(); handleDeleteFood(idx); }}>×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recovery Protocol Link */}
      {dailyLog?.recoveryProtocol?.isActive && (
        <div className="recovery-banner" onClick={() => { /* Navigate */ }}>
          <span>🚑 {t('home.recoveryActive')}</span>
        </div>
      )}

      {/* Bio-Tuner Notification */}
      {fatAdjustment?.notification && (
        <div className={`bio-tuner-notification ${fatAdjustment.notification.priority}`}>
          <span>🧬 {fatAdjustment.notification.message}</span>
        </div>
      )}

      <div style={{ height: '80px' }}></div> {/* Spacer for floating buttons */}
    </div>
  );
}
