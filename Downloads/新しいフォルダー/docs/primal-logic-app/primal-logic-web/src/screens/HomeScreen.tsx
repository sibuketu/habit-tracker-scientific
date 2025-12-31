/**
 * Primal Logic - Home Screen (Web版)
 * 
 * 焚き火ビジュアル（野生レベル）を中心としたメイン画面
 */

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { useTranslation } from '../utils/i18n';
import MiniNutrientGauge from '../components/MiniNutrientGauge';
import OmegaRatioGauge from '../components/OmegaRatioGauge';
// ArgumentCard is removed
import RecoveryProtocolScreen from './RecoveryProtocolScreen';
import { useNutrition, type PreviewData } from '../hooks/useNutrition';
import { useSettings } from '../hooks/useSettings';
import { getFeatureDisplaySettings } from '../utils/featureDisplaySettings';
import { getAllFoodHistory } from '../utils/foodHistory';
import { getMyFoods, addMyFood, type MyFoodItem } from '../utils/myFoodsStorage';
import { getDailyLogs, getTodayLog } from '../utils/storage';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { calculateStreak, type StreakData } from '../utils/streakCalculator';
import { calculateTransitionProgress } from '../data/transitionGuide';
import { generateRecoveryProtocol } from '../utils/recoveryAlgorithm';
import TransitionBanner from '../components/TransitionBanner';
import TransitionGuideModal from '../components/TransitionGuideModal';
import BarcodeScannerModal from '../components/BarcodeScannerModal';
import type { AnimalType } from '../data/deepNutritionData';
import type { FoodItem, CalculatedMetrics } from '../types';
import { logError } from '../utils/errorHandler';
import PhotoAnalysisModal from '../components/PhotoAnalysisModal';
import PrimalBonfire from '../components/PrimalBonfire';
import './HomeScreen.css';

// Dynamic import for CustomFoodScreen to avoid potential circular deps or large bundle
import CustomFoodScreen from './CustomFoodScreen';

interface HomeScreenProps {
  onOpenFatTabReady?: (callback: () => void) => void;
  onAddFoodReady?: (callback: (foodItem: FoodItem) => void) => void;
}

export default function HomeScreen({ onOpenFatTabReady, onAddFoodReady }: HomeScreenProps = {}) {
  const { t } = useTranslation();
  const { dailyLog, setRecoveryProtocol, addFood, userProfile } = useApp();
  const { previewData, setPreview, clearPreview } = useNutrition();
  const { showNutrientPreview } = useSettings();
  const featureDisplaySettings = getFeatureDisplaySettings();

  // 動的目標値を取得
  const dynamicTargets = useMemo(() => {
    return getCarnivoreTargets(
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
      userProfile?.mentalHealthStatus,
      userProfile?.supplementMagnesium,
      userProfile?.supplementVitaminD,
      userProfile?.supplementIodine,
      userProfile?.alcoholFrequency,
      userProfile?.caffeineIntake,
      userProfile?.daysOnCarnivore,
      userProfile?.carnivoreStartDate,
      userProfile?.forceAdaptationMode,
      userProfile?.bodyComposition,
      userProfile?.weight,
      userProfile?.metabolicStressIndicators,
      userProfile?.customNutrientTargets ? Object.fromEntries(
        Object.entries(userProfile.customNutrientTargets).map(([key, value]) => [
          key,
          typeof value === 'number' ? { mode: 'manual' as const, value } : value
        ])
      ) : undefined
    );
  }, [userProfile]);

  const [showRecoveryProtocol, setShowRecoveryProtocol] = useState(false);
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const [showSecondaryMenu, setShowSecondaryMenu] = useState(false);
  const [showMyFoods, setShowMyFoods] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [showTransitionGuide, setShowTransitionGuide] = useState(false);
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);

  // AI Photo Analysis State
  const [showPhotoConfirmation, setShowPhotoConfirmation] = useState(false);
  const [photoAnalysisResult, setPhotoAnalysisResult] = useState<any>(null);
  const [isAnalyzingPhoto, setIsAnalyzingPhoto] = useState(false);

  // Custom Food State
  const [showCustomFood, setShowCustomFood] = useState(false);

  // Condition Stamps State
  const [conditionEnergy, setConditionEnergy] = useState<'high' | 'normal' | 'low' | null>(null);
  const [conditionGut, setConditionGut] = useState<'good' | 'normal' | 'bad' | null>(null);
  const [conditionMood, setConditionMood] = useState<'happy' | 'normal' | 'irritated' | null>(null);

  // Metrics State (Async handling)
  const [metrics, setMetrics] = useState<CalculatedMetrics>((() => {
    // Initial sync calculation if possible, or empty default
    return calculateAllMetrics([]);
  })());

  // Load Streak & Metrics
  useEffect(() => {
    const loadData = async () => {
      // Streak
      setStreakData(await calculateStreak());

      // Metrics
      const today = await getTodayLog();
      if (today) {
        // DailyLog has 'fuel', ensure it's an array
        const currentFoods = Array.isArray(today.fuel) ? today.fuel : [];

        // calculateAllMetrics expects 'foods' property per the error trace
        const dataToCalculate = showNutrientPreview && previewData
          ? { ...today, foods: [...currentFoods, previewData] }
          : { ...today, foods: currentFoods };

        setMetrics(calculateAllMetrics(dataToCalculate.foods as FoodItem[]));
      }
    };
    loadData();
  }, [dailyLog, previewData, showNutrientPreview, showMyFoods, showHistory]);

  // Primal Score Calculation (Bonfire Intensity)
  const primalScore = useMemo(() => {
    let score = 0;

    // Protein & Fat satisfaction (Max 60 points)
    const proteinRatio = Math.min(metrics.proteinTotal / dynamicTargets.protein, 1);
    const fatRatio = Math.min(metrics.fatTotal / dynamicTargets.fat, 1);
    score += (proteinRatio * 30) + (fatRatio * 30);

    // Violation penalty
    const violationCount = metrics.violationTypes?.length || 0;
    if (violationCount > 0) {
      score -= violationCount * 10;
    }

    // Condition bonus (Max 20 points)
    if (conditionEnergy === 'high') score += 5;
    if (conditionEnergy === 'low') score -= 5;
    if (conditionGut === 'good') score += 5;
    if (conditionGut === 'bad') score -= 5;
    if (conditionMood === 'happy') score += 5;
    if (conditionMood === 'irritated') score -= 5;

    // Streak bonus (Max 10 points)
    if (streakData?.currentStreak) {
      score += Math.min(streakData.currentStreak, 10);
    }

    // Base score so fire doesn't die completely easily
    return Math.max(score + 10, 5);
  }, [metrics, dynamicTargets, conditionEnergy, conditionGut, conditionMood, streakData]);

  // --- Handlers ---
  const handlePhotoUpload = async (file: File) => {
    try {
      if (!file) return;
      setIsAnalyzingPhoto(true);

      const { analyzeFoodImage } = await import('../services/aiService');
      const result = await analyzeFoodImage(file);

      setIsAnalyzingPhoto(false);
      setPhotoAnalysisResult({ ...result, imageFile: file });
      setShowPhotoConfirmation(true);

    } catch (error) {
      setIsAnalyzingPhoto(false);
      logError(error, { component: 'HomeScreen', action: 'handlePhotoUpload' });
      const { getUserFriendlyErrorMessage } = await import('../utils/errorHandler');
      alert(getUserFriendlyErrorMessage(error) || '写真の解析に失敗しました。');
    }
  };

  const handlePhotoAnalysisConfirm = (confirmedFood: any) => {
    if (Array.isArray(confirmedFood)) {
      confirmedFood.forEach(item => addFood(item));
    } else {
      addFood(confirmedFood);
    }
    setShowPhotoConfirmation(false);
    setPhotoAnalysisResult(null);
  };

  const fileInputRef = useRef<HTMLInputElement>(null);
  const triggerFileUpload = () => fileInputRef.current?.click();

  const isTransitioning = useMemo(() => {
    return calculateTransitionProgress(userProfile?.daysOnCarnivore, userProfile?.carnivoreStartDate) !== null;
  }, [userProfile?.daysOnCarnivore, userProfile?.carnivoreStartDate]);


  return (
    <div className="home-screen-container">
      <div className="home-screen-content">

        {/* Header & Streak */}
        <div style={{ width: '100%', maxWidth: '600px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <h1 className="home-screen-title">Primal Logic</h1>
            <div className="home-screen-subtitle">
              {streakData ? (
                <span style={{ color: '#F59E0B', fontWeight: 'bold' }}>
                  🔥 {streakData.currentStreak} Day Streak
                </span>
              ) : t('home.subtitle')}
            </div>
          </div>
          <button
            onClick={() => setShowSecondaryMenu(!showSecondaryMenu)}
            style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            ⚙️
          </button>
        </div>

        {/* 1. The Primal Bonfire Main Visual */}
        <div
          className="home-screen-section"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(to bottom, #2d1b0e, #1a1a1a)',
            padding: '20px',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            border: '1px solid #3E2723'
          }}
        >
          <PrimalBonfire score={primalScore} label={`Wildness: ${Math.round(primalScore)}`} />

          {/* Primal Condition Stamps */}
          <div style={{
            display: 'flex',
            gap: '15px',
            marginTop: '20px',
            padding: '10px',
            backgroundColor: 'rgba(255,255,255,0.1)',
            borderRadius: '15px',
            backdropFilter: 'blur(5px)'
          }}>
            <button
              onClick={() => setConditionEnergy(conditionEnergy === 'high' ? null : 'high')}
              style={{ fontSize: '1.8rem', opacity: conditionEnergy === 'high' ? 1 : 0.4, transition: 'all 0.2s', background: 'none', border: 'none', cursor: 'pointer', transform: conditionEnergy === 'high' ? 'scale(1.2)' : 'scale(1)' }}
              title="Energy High"
            >
              ⚡
            </button>
            <button
              onClick={() => setConditionGut(conditionGut === 'good' ? null : 'good')}
              style={{ fontSize: '1.8rem', opacity: conditionGut === 'good' ? 1 : 0.4, transition: 'all 0.2s', background: 'none', border: 'none', cursor: 'pointer', transform: conditionGut === 'good' ? 'scale(1.2)' : 'scale(1)' }}
              title="Gut Good"
            >
              🥩
            </button>
            <button
              onClick={() => setConditionMood(conditionMood === 'happy' ? null : 'happy')}
              style={{ fontSize: '1.8rem', opacity: conditionMood === 'happy' ? 1 : 0.4, transition: 'all 0.2s', background: 'none', border: 'none', cursor: 'pointer', transform: conditionMood === 'happy' ? 'scale(1.2)' : 'scale(1)' }}
              title="Mood Happy"
            >
              😊
            </button>
          </div>
          <div style={{ fontSize: '10px', color: '#aaa', marginTop: '8px' }}>
            {t('home.conditionCheck')}
          </div>
        </div>

        {/* Recovery Alert */}
        {(metrics.violationTypes?.length || 0) > 0 && (
          <div className="home-screen-recovery" onClick={() => setShowRecoveryProtocol(true)}>
            <div className="home-screen-recovery-title">⚠️ {t('home.recoveryRequired')}</div>
            <div className="home-screen-recovery-text">
              {t('home.violationDetected')}: {metrics.violationTypes?.length || 0}
            </div>
            <div className="home-screen-recovery-tap">{t('home.tapToRecover')}</div>
          </div>
        )}

        {/* 2. Main Action Grid */}
        <div className="home-screen-category-grid">
          {/* Photos */}
          <button
            className="home-screen-category-button"
            style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE' }}
            onClick={triggerFileUpload}
          >
            <span style={{ fontSize: '40px', marginBottom: '10px' }}>📸</span>
            <span style={{ fontWeight: 'bold', color: '#3730A3' }}>{t('home.analyzePhoto')}</span>
            <span style={{ fontSize: '12px', color: '#6366F1' }}>AI Analysis</span>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handlePhotoUpload(e.target.files[0]);
                e.target.value = '';
              }
            }}
          />

          {/* Manual Input */}
          <button
            className="home-screen-category-button"
            style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0' }}
            onClick={() => {
              window.dispatchEvent(new CustomEvent('navigate', { detail: 'input' }));
            }}
          >
            <span style={{ fontSize: '40px', marginBottom: '10px' }}>✏️</span>
            <span style={{ fontWeight: 'bold', color: '#065F46' }}>{t('home.logFood')}</span>
            <span style={{ fontSize: '12px', color: '#10B981' }}>Manual / Voice</span>
          </button>
        </div>


        {/* 3. Essential Gauges (Miniaturized) - Toggled */}
        <button
          onClick={() => setShowAllNutrients(!showAllNutrients)}
          style={{
            marginTop: '20px',
            background: 'transparent',
            border: '1px solid #ccc',
            padding: '8px 16px',
            borderRadius: '20px',
            fontSize: '14px',
            color: '#666',
            cursor: 'pointer'
          }}
        >
          {showAllNutrients ? t('home.hideDetails') : t('home.showDetails')}
        </button>

        {showAllNutrients && (
          <div style={{ width: '100%', maxWidth: '600px', marginTop: '15px' }}>
            <div className="home-screen-section">
              <h3 className="home-screen-section-title">{t('home.todaysNutrients')}</h3>
              <MiniNutrientGauge
                label={t('nutrients.protein')}
                currentDailyTotal={metrics.proteinTotal}
                target={dynamicTargets.protein}
                unit="g"
                color="#ef4444"
              />
              <MiniNutrientGauge
                label={t('nutrients.fat')}
                currentDailyTotal={metrics.fatTotal}
                target={dynamicTargets.fat}
                unit="g"
                color="#eab308"
              />
              {/* P:F Ratio removed in favor of simple gauges */}

              <MiniNutrientGauge
                label={t('nutrients.carbs')}
                currentDailyTotal={metrics.netCarbs}
                target={20}
                unit="g"
                color="#3b82f6"
                showLowIsOk={true}
              />
            </div>
            {/* Other Ratios */}
            <div className="home-screen-section">
              <OmegaRatioGauge
                omega6={metrics.omega6Total || 0}
                omega3={metrics.omega3Total || 0}
              />
            </div>
          </div>
        )}

        {/* Transition Guide Banner (Phase 1) */}
        {isTransitioning && (() => {
          const prog = calculateTransitionProgress(userProfile?.daysOnCarnivore, userProfile?.carnivoreStartDate);
          if (!prog) return null;
          return (
            <TransitionBanner
              daysInTransition={prog.daysInTransition}
              totalDays={30}
              onPress={() => setShowTransitionGuide(true)}
            />
          );
        })()}


        {/* Secondary Menu (Tools) */}
        {showSecondaryMenu && (
          <div className="home-screen-secondary-menu">
            <h3 className="home-screen-section-title">{t('home.tools')}</h3>
            <div className="home-screen-secondary-grid">
              <button className="home-screen-secondary-button" onClick={() => setShowCustomFood(true)}>
                <span>🍽️</span>
                <span>Custom Food</span>
              </button>
              <button className="home-screen-secondary-button" onClick={() => setShowMyFoods(true)}>
                <span>📂</span>
                <span>My Foods</span>
              </button>
              <button className="home-screen-secondary-button" onClick={() => setShowBarcodeScanner(true)}>
                <span>📱</span>
                <span>Barcode</span>
              </button>
              <button className="home-screen-secondary-button" onClick={() => setShowHistory(true)}>
                <span>📜</span>
                <span>History</span>
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Modals */}
      {showRecoveryProtocol && (
        <RecoveryProtocolScreen
          protocol={dailyLog?.recoveryProtocol || generateRecoveryProtocol('carbs' as any)}
          onClose={() => setShowRecoveryProtocol(false)}
          onSetProtocol={(p) => setRecoveryProtocol(p)}
        />
      )}

      {/* Loading Overlay */}
      {isAnalyzingPhoto && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2000,
          flexDirection: 'column',
          color: 'white'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'spin 1s infinite linear' }}>🦁</div>
          <div>Analyzing Food DNA...</div>
        </div>
      )}

      <PhotoAnalysisModal
        isOpen={showPhotoConfirmation}
        onClose={() => setShowPhotoConfirmation(false)}
        onConfirm={handlePhotoAnalysisConfirm}
        analysisResult={photoAnalysisResult}
        dynamicTargets={dynamicTargets as any} // dynamicTargets型互換のためas any（CarnivoreTarget詳細構造の差異回避）
      />

      {/* Custom Food Modal */}
      {showCustomFood && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1100 }}>
          <CustomFoodScreen onClose={() => setShowCustomFood(false)} />
        </div>
      )}

      {showTransitionGuide && (() => {
        const prog = calculateTransitionProgress(userProfile?.daysOnCarnivore, userProfile?.carnivoreStartDate);
        if (!prog) return null;
        return (
          <TransitionGuideModal
            onClose={() => setShowTransitionGuide(false)}
            progress={prog}
          />
        );
      })()}

      {showBarcodeScanner && (
        <BarcodeScannerModal
          isOpen={showBarcodeScanner}
          onClose={() => setShowBarcodeScanner(false)}
          onSuccess={(code) => {
            // Simulation: In a real app, fetch data from OpenFoodFacts or similar
            alert(t('home.violationDetected') + ': Scanned ' + code);
            addFood({
              item: `Scanned Item ${code}`,
              amount: 1,
              unit: 'piece',
              type: 'animal', // Default to animal to avoid violation warnings in demo
              nutrients: {
                protein: 10,
                fat: 10,
                carbs: 0
              }
            });
            setShowBarcodeScanner(false);
          }}
        />
      )}

    </div>
  );
}
