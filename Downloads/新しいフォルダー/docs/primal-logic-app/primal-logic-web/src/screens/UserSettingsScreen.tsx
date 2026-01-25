/**
 * CarnivoreOS - User Settings Screen
 *
 * ユーザー設定画面: 基本惁E��、目標、代謝状態など
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import HelpTooltip from '../components/common/HelpTooltip';
import { useApp } from '../context/AppContext';
import { saveUserProfile } from '../utils/storage';
import { logError } from '../utils/errorHandler';
import { useTranslation } from '../utils/i18n';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { calculateNutrientImpact, getFieldImpactDescription } from '../utils/nutrientImpactHelper';
import { getAllNutrientExplanations } from '../utils/nutrientExplanationHelper';
import {
  ALL_NUTRIENT_DISPLAY_CONFIGS,
  getNutrientDisplaySettings,
  saveNutrientDisplaySettings,
  toggleNutrientVisibility,
  toggleCategoryVisibility,
  setAllNutrientsVisible,
  type NutrientKey,
} from '../utils/nutrientDisplaySettings';
import {
  ALL_FEATURE_DISPLAY_CONFIGS,
  getFeatureDisplaySettings,
  saveFeatureDisplaySettings,
  toggleFeatureVisibility as toggleFeatureVisibilityUtil,
  toggleCategoryVisibility as toggleFeatureCategoryVisibility,
  setAllFeaturesVisible,
  type FeatureKey,
} from '../utils/featureDisplaySettings';
import { USER_GOALS, METABOLIC_STATUS, DIET_MODES } from '../constants/carnivore_constants';
import type { UserProfile } from '../types/index';
import { calculateCaffeineFromCoffee } from '../utils/coffeeCaffeineCalculator';
import {
  calculateProfileCompletion,
  calculateCategoryCompletion,
  getCategoryName,
  getCategoryPriority,
  type FieldCategory,
} from '../utils/profileCompletion';
import './ProfileScreen.css';

type FieldPriority = 'required' | 'recommended' | 'optional';

interface ProfileField {
  key: string;
  label: string;
  priority: FieldPriority;
  description?: string;
}

const PROFILE_FIELDS: Record<string, ProfileField> = {
  gender: {
    key: 'gender',
    label: 'Gender',
    priority: 'required',
  },
  height: {
    key: 'height',
    label: 'Height',
    priority: 'recommended',
    description: 'cm',
  },
  weight: {
    key: 'weight',
    label: 'Weight',
    priority: 'recommended',
    description: 'kg',
  },
  goal: {
    key: 'goal',
    label: 'Goal',
    priority: 'required',
  },
  metabolicStatus: {
    key: 'metabolicStatus',
    label: 'Metabolic Status',
    priority: 'required',
  },
  mode: {
    key: 'mode',
    label: 'Diet Mode',
    priority: 'recommended',
  },
  dairyTolerance: {
    key: 'dairyTolerance',
    label: '乳糖耐性',
    priority: 'optional',
    description: 'Can you consume dairy products?',
  },
};

const getPriorityLabel = (priority: FieldPriority): string => {
  switch (priority) {
    case 'required':
      return 'Required';
    case 'recommended':
      return 'Recommended';
    case 'optional':
      return 'Optional';
  }
};

const getPriorityClass = (priority: FieldPriority): string => {
  switch (priority) {
    case 'required':
      return 'profile-screen-priority-required';
    case 'recommended':
      return 'profile-screen-priority-recommended';
    case 'optional':
      return 'profile-screen-priority-optional';
  }
};

export default function UserSettingsScreen() {
  const { t } = useTranslation();
  const { userProfile, loadUserProfile } = useApp();

  const [gender, setGender] = useState<UserProfile['gender']>(userProfile?.gender || 'male');
  const [height, setHeight] = useState<string>(userProfile?.height?.toString() || '');
  const [weight, setWeight] = useState<string>(userProfile?.weight?.toString() || '');
  const [goal, setGoal] = useState<UserProfile['goal']>(userProfile?.goal || USER_GOALS.HEALING);
  const [dairyTolerance, setDairyTolerance] = useState(userProfile?.dairyTolerance ?? false);
  const [metabolicStatus, setMetabolicStatus] = useState<UserProfile['metabolicStatus']>(
    userProfile?.metabolicStatus || METABOLIC_STATUS.TRANSITIONING
  );
  const [mode, setMode] = useState<UserProfile['mode']>(
    userProfile?.mode || DIET_MODES.STRICT_CARNIVORE
  );
  const [age, setAge] = useState<string>(userProfile?.age?.toString() || '');
  const [activityLevel, setActivityLevel] = useState<UserProfile['activityLevel']>(
    userProfile?.activityLevel || 'moderate'
  );
  const [isPregnant, setIsPregnant] = useState(userProfile?.isPregnant ?? false);
  const [isBreastfeeding, setIsBreastfeeding] = useState(userProfile?.isBreastfeeding ?? false);
  const [isPostMenopause, setIsPostMenopause] = useState(userProfile?.isPostMenopause ?? false);
  // Manage stress level as 0-10 numeric value (internally converted to string)
  const [stressLevelNumeric, setStressLevelNumeric] = useState<number>(() => {
    if (userProfile?.stressLevel === 'low') return 3;
    if (userProfile?.stressLevel === 'moderate') return 5;
    if (userProfile?.stressLevel === 'high') return 8;
    return 5; // Default: moderate
  });

  // Function to convert numeric value to string
  const getStressLevelString = (num: number): 'low' | 'moderate' | 'high' => {
    if (num <= 3) return 'low';
    if (num <= 7) return 'moderate';
    return 'high';
  };

  const stressLevel = getStressLevelString(stressLevelNumeric);

  // Additional nutrient variation factors (recommended)
  const [sleepHours, setSleepHours] = useState<string>(userProfile?.sleepHours?.toString() || '');
  const [exerciseIntensity, setExerciseIntensity] = useState<UserProfile['exerciseIntensity']>(
    userProfile?.exerciseIntensity || 'none'
  );
  const [exerciseFrequency, setExerciseFrequency] = useState<UserProfile['exerciseFrequency']>(
    userProfile?.exerciseFrequency || 'none'
  );
  const [thyroidFunction, setThyroidFunction] = useState<UserProfile['thyroidFunction']>(
    userProfile?.thyroidFunction || 'normal'
  );
  const [sunExposureFrequency, setSunExposureFrequency] = useState<
    UserProfile['sunExposureFrequency']
  >(userProfile?.sunExposureFrequency || 'occasional');

  // Additional nutrient variation factors (optional)
  const [nutrientDisplaySettings, setNutrientDisplaySettings] = useState<
    Record<NutrientKey, boolean>
  >(getNutrientDisplaySettings());
  const [featureDisplaySettings, setFeatureDisplaySettings] = useState<Record<FeatureKey, boolean>>(
    getFeatureDisplaySettings()
  );
  const [digestiveIssues, setDigestiveIssues] = useState(userProfile?.digestiveIssues ?? false);
  const [inflammationLevel, setInflammationLevel] = useState<UserProfile['inflammationLevel']>(
    userProfile?.inflammationLevel || 'low'
  );
  const [mentalHealthStatus, setMentalHealthStatus] = useState<UserProfile['mentalHealthStatus']>(
    userProfile?.mentalHealthStatus || 'good'
  );
  const [supplementMagnesium, setSupplementMagnesium] = useState(
    userProfile?.supplementMagnesium ?? false
  );
  const [supplementVitaminD, setSupplementVitaminD] = useState(
    userProfile?.supplementVitaminD ?? false
  );
  const [supplementIodine, setSupplementIodine] = useState(userProfile?.supplementIodine ?? false);
  const [alcoholFrequency, setAlcoholFrequency] = useState<UserProfile['alcoholFrequency']>(
    userProfile?.alcoholFrequency || 'none'
  );
  const [caffeineIntake, setCaffeineIntake] = useState<UserProfile['caffeineIntake']>(
    userProfile?.caffeineIntake || 'none'
  );

  // Phase 3: Body composition settings (LBM-based protein calculation)
  const [bodyComposition, setBodyComposition] = useState<UserProfile['bodyComposition']>(
    userProfile?.bodyComposition || 'average'
  );
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>(
    typeof userProfile?.bodyComposition === 'object' &&
      'bodyFatPercentage' in userProfile.bodyComposition
      ? userProfile.bodyComposition.bodyFatPercentage.toString()
      : ''
  );
  const [showBodyFatInput, setShowBodyFatInput] = useState(false);

  // Phase 4: Metabolic stress indicators
  const [metabolicStressIndicators, setMetabolicStressIndicators] = useState<string[]>(
    userProfile?.metabolicStressIndicators || []
  );
  const [coffeeInput, setCoffeeInput] = useState<string>(''); // Coffee input (e.g., "Starbucks Coffee Short", "2 cups of coffee")

  // Phase 5: Nutrient target customization
  const [customNutrientTargets, setCustomNutrientTargets] = useState<
    Record<string, { mode: 'auto' | 'manual'; value?: number }>
  >(
    userProfile?.customNutrientTargets
      ? Object.fromEntries(
          Object.entries(userProfile.customNutrientTargets).map(([key, value]) => [
            key,
            typeof value === 'number' ? { mode: 'manual' as const, value } : value,
          ])
        )
      : {}
  );

  // プレビュー用のstate
  const [showPreview, setShowPreview] = useState(false);

  // セクションの折りたたみ状態（忁E��頁E��はチE��ォルトで開く�E�E  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('profile_collapsed_sections');
    return saved
      ? JSON.parse(saved)
      : {
          basicInfo: false, // 忁E��E 開く
          goal: false, // 忁E��E 開く
          metabolicStatus: false, // 忁E��E 開く
          dietMode: false, // 推奨: 開く
          dairyTolerance: true, // 任愁E 閉じめE          stressLevel: false, // 推奨: 開く
          recommended: false, // 推奨: 開く
          optional: true, // 任愁E 閉じめE          femaleSpecific: true, // 任愁E 閉じめE        };
  });

  // セクションの表示ON/OFF状慁E  const [hiddenSections, setHiddenSections] = useState<Record<string, boolean>>(() => {
    const saved = localStorage.getItem('profile_hidden_sections');
    return saved ? JSON.parse(saved) : {};
  });

  const toggleSectionCollapse = (sectionKey: string) => {
    setCollapsedSections((prev) => {
      const newState = { ...prev, [sectionKey]: !prev[sectionKey] };
      localStorage.setItem('profile_collapsed_sections', JSON.stringify(newState));
      return newState;
    });
  };

  const toggleSectionVisibility = (sectionKey: string) => {
    setHiddenSections((prev) => {
      const newState = { ...prev, [sectionKey]: !prev[sectionKey] };
      localStorage.setItem('profile_hidden_sections', JSON.stringify(newState));
      return newState;
    });
  };

  // 自動保存用のdebounceタイマ�E
  const saveTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadUserProfile();
  }, [loadUserProfile]);

  // 自動保存関数�E�Eebounce付き、iOS設定アプリのパターン�E�E  const autoSave = useCallback(async () => {
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = setTimeout(async () => {
      const profile: UserProfile = {
        gender,
        height: height ? parseFloat(height) : undefined,
        weight: weight ? parseFloat(weight) : undefined,
        goal,
        dairyTolerance,
        metabolicStatus,
        mode,
        age: age ? parseInt(age, 10) : undefined,
        activityLevel,
        isPregnant: gender === 'female' ? isPregnant : undefined,
        isBreastfeeding: gender === 'female' ? isBreastfeeding : undefined,
        isPostMenopause: gender === 'female' ? isPostMenopause : undefined,
        stressLevel,
        sleepHours: sleepHours ? Number(sleepHours) : undefined,
        exerciseIntensity,
        exerciseFrequency,
        thyroidFunction,
        sunExposureFrequency,
        digestiveIssues,
        inflammationLevel,
        mentalHealthStatus,
        supplementMagnesium,
        supplementVitaminD,
        supplementIodine,
        alcoholFrequency,
        caffeineIntake,
        bodyComposition:
          showBodyFatInput && bodyFatPercentage
            ? { bodyFatPercentage: parseFloat(bodyFatPercentage) }
            : bodyComposition,
        metabolicStressIndicators:
          metabolicStressIndicators.length > 0 ? metabolicStressIndicators : undefined,
        customNutrientTargets:
          Object.keys(customNutrientTargets).length > 0
            ? Object.fromEntries(
                Object.entries(customNutrientTargets).map(([key, value]) => [
                  key,
                  value.mode === 'auto' ? { mode: 'auto' } : { mode: 'manual', value: value.value },
                ])
              )
            : undefined,
      };
      try {
        await saveUserProfile(profile);
      } catch (error) {
        logError(error, { component: 'UserSettingsScreen', action: 'autoSave' });
      }
    }, 1000); // 1秒後に保存
  }, [
    gender,
    height,
    weight,
    goal,
    dairyTolerance,
    metabolicStatus,
    mode,
    age,
    activityLevel,
    isPregnant,
    isBreastfeeding,
    isPostMenopause,
    stressLevel,
    sleepHours,
    exerciseIntensity,
    exerciseFrequency,
    thyroidFunction,
    sunExposureFrequency,
    digestiveIssues,
    inflammationLevel,
    mentalHealthStatus,
    supplementMagnesium,
    supplementVitaminD,
    supplementIodine,
    alcoholFrequency,
    caffeineIntake,
    showBodyFatInput,
    bodyFatPercentage,
    bodyComposition,
    metabolicStressIndicators,
    customNutrientTargets,
  ]);

  // 設定変更時に自動保存（�E期ロード時は除外！E  const isInitialLoad = useRef(true);
  useEffect(() => {
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    autoSave();
  }, [autoSave]);

  useEffect(() => {
    if (userProfile) {
      setGender(userProfile.gender || 'male');
      setHeight(userProfile.height?.toString() || '');
      setWeight(userProfile.weight?.toString() || '');
      setGoal(userProfile.goal || USER_GOALS.HEALING);
      setDairyTolerance(userProfile.dairyTolerance ?? false);
      setMetabolicStatus(userProfile.metabolicStatus || METABOLIC_STATUS.TRANSITIONING);
      setMode(userProfile.mode || DIET_MODES.STRICT_CARNIVORE);
      setAge(userProfile.age?.toString() || '');
      setActivityLevel(userProfile.activityLevel || 'moderate');
      setIsPregnant(userProfile.isPregnant ?? false);
      setIsBreastfeeding(userProfile.isBreastfeeding ?? false);
      setIsPostMenopause(userProfile.isPostMenopause ?? false);
      // ストレスレベルを数値に変換
      if (userProfile.stressLevel === 'low') setStressLevelNumeric(3);
      else if (userProfile.stressLevel === 'high') setStressLevelNumeric(8);
      else setStressLevelNumeric(5);
      setSleepHours(userProfile.sleepHours?.toString() || '');
      setExerciseIntensity(userProfile.exerciseIntensity || 'none');
      setExerciseFrequency(userProfile.exerciseFrequency || 'none');
      setThyroidFunction(userProfile.thyroidFunction || 'normal');
      setSunExposureFrequency(userProfile.sunExposureFrequency || 'occasional');
      setDigestiveIssues(userProfile.digestiveIssues ?? false);
      setInflammationLevel(userProfile.inflammationLevel || 'low');
      setMentalHealthStatus(userProfile.mentalHealthStatus || 'good');
      setSupplementMagnesium(userProfile.supplementMagnesium ?? false);
      setSupplementVitaminD(userProfile.supplementVitaminD ?? false);
      setSupplementIodine(userProfile.supplementIodine ?? false);
      setAlcoholFrequency(userProfile.alcoholFrequency || 'none');
      setCaffeineIntake(userProfile.caffeineIntake || 'none');
    }
  }, [userProfile]);

  // 吁E��定変更時に自動保存をトリガー
  useEffect(() => {
    if (userProfile) {
      autoSave();
    }
  }, [autoSave, userProfile]);

  // 旧handleSave�E�削除予定、互換性のため残す�E�E  const handleSave = async () => {
    const profile: UserProfile = {
      gender,
      height: height ? parseFloat(height) : undefined,
      weight: weight ? parseFloat(weight) : undefined,
      goal,
      dairyTolerance,
      metabolicStatus,
      mode,
      age: age ? parseInt(age, 10) : undefined,
      activityLevel,
      isPregnant: gender === 'female' ? isPregnant : undefined,
      isBreastfeeding: gender === 'female' ? isBreastfeeding : undefined,
      isPostMenopause: gender === 'female' ? isPostMenopause : undefined,
      stressLevel,
      sleepHours: sleepHours ? Number(sleepHours) : undefined,
      exerciseIntensity,
      exerciseFrequency,
      thyroidFunction,
      sunExposureFrequency,
      digestiveIssues,
      inflammationLevel,
      mentalHealthStatus,
      supplementMagnesium,
      supplementVitaminD,
      supplementIodine,
      alcoholFrequency,
      caffeineIntake,
      // Phase 3: 体絁E�E設宁E      bodyComposition:
        showBodyFatInput && bodyFatPercentage
          ? { bodyFatPercentage: parseFloat(bodyFatPercentage) }
          : bodyComposition,
      // Phase 4: 代謝ストレス持E��E      metabolicStressIndicators:
        metabolicStressIndicators.length > 0 ? metabolicStressIndicators : undefined,
      // Phase 5: 栁E��素目標値のカスタマイズ
      customNutrientTargets:
        Object.keys(customNutrientTargets).length > 0
          ? (Object.fromEntries(
              Object.entries(customNutrientTargets).map(([key, config]) => [
                key,
                config.mode === 'manual' && config.value !== undefined ? config.value : 0,
              ])
            ) as Record<string, number>)
          : undefined,
      ...userProfile,
    };

    await saveUserProfile(profile);
    await loadUserProfile();

    // プロファイル画面に戻めE    window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'profile' }));
  };

  const renderFieldLabel = (field: ProfileField) => (
    <div className="profile-screen-field-header">
      <span className="profile-screen-field-label">{field.label}</span>
      <span className={`profile-screen-priority-badge ${getPriorityClass(field.priority)}`}>
        {getPriorityLabel(field.priority)}
      </span>
    </div>
  );

  return (
    <div className="profile-screen-container">
      <div className="profile-screen-content">
        <div className="screen-header">
          <button
            onClick={() =>
              window.dispatchEvent(new CustomEvent('navigateToScreen', { detail: 'profile' }))
            }
            className="back-button"
          >
            ←          </button>
          <div className="screen-header-content">
            <h1 className="screen-header-title">User Settings</h1>
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#3b82f6' }}>
                {calculateProfileCompletion(userProfile)}%
              </span>
              <span style={{ fontSize: '10px', color: '#9ca3af', lineHeight: '1.2' }}>
                Optimized for this app
              </span>
            </div>
          </div>
        </div>

        {/* 基本惁E���E�忁E��！E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('basicInfo')}
          >
            <h2 className="profile-screen-section-title">Basic Information</h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.basicInfo ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.basicInfo && (
            <div className="profile-screen-section-content">
              {/* 性別�E�忁E��！E*/}
              <div className="profile-screen-input-group">
                {renderFieldLabel(PROFILE_FIELDS.gender)}
                <div className="profile-screen-button-row">
                  <button
                    className={`profile-screen-option-button ${gender === 'male' ? 'active' : ''}`}
                    onClick={() => setGender('male')}
                  >
                    Male
                  </button>
                  <button
                    className={`profile-screen-option-button ${gender === 'female' ? 'active' : ''}`}
                    onClick={() => setGender('female')}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* 身長�E�推奨�E�E*/}
              <div className="profile-screen-input-group">
                {renderFieldLabel(PROFILE_FIELDS.height)}
                <div className="profile-screen-number-input-row">
                  <input
                    type="number"
                    className="profile-screen-number-input"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="170"
                    min="0"
                    max="300"
                  />
                  <span className="profile-screen-unit">cm</span>
                </div>
              </div>

              {/* 体重�E�推奨�E�E*/}
              <div className="profile-screen-input-group">
                {renderFieldLabel(PROFILE_FIELDS.weight)}
                <div className="profile-screen-number-input-row">
                  <input
                    type="number"
                    className="profile-screen-number-input"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="70"
                    min="0"
                    max="500"
                    step="0.1"
                  />
                  <span className="profile-screen-unit">kg</span>
                </div>
              </div>

              {/* Phase 3: 体絁E�E設定！EBMベ�Eスのタンパク質計算！E*/}
              {weight && (
                <div className="profile-screen-input-group" style={{ marginTop: '1rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Body Composition (for LBM calculation)</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.75rem' }}>
                    Protein Target = LBM (Lean Body Mass) ÁE2.2g
                  </p>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${!showBodyFatInput && bodyComposition === 'muscular' ? 'active' : ''}`}
                      onClick={() => {
                        setBodyComposition('muscular');
                        setShowBodyFatInput(false);
                      }}
                    >
                      Muscular/Toned
                    </button>
                    <button
                      className={`profile-screen-option-button ${!showBodyFatInput && bodyComposition === 'average' ? 'active' : ''}`}
                      onClick={() => {
                        setBodyComposition('average');
                        setShowBodyFatInput(false);
                      }}
                    >
                      Average
                    </button>
                    <button
                      className={`profile-screen-option-button ${!showBodyFatInput && bodyComposition === 'high_fat' ? 'active' : ''}`}
                      onClick={() => {
                        setBodyComposition('high_fat');
                        setShowBodyFatInput(false);
                      }}
                    >
                      Higher Body Fat
                    </button>
                  </div>
                  <div style={{ marginTop: '0.75rem' }}>
                    <button
                      onClick={() => setShowBodyFatInput(!showBodyFatInput)}
                      className={`toggle-button ${showBodyFatInput ? 'active' : ''}`}
                    >
                      {showBodyFatInput ? 'Body Fat % Input Mode' : 'Enter Body Fat % Directly'}
                    </button>
                  </div>
                  {showBodyFatInput && (
                    <div style={{ marginTop: '0.75rem' }}>
                      <label
                        style={{
                          fontSize: '14px',
                          color: '#374151',
                          display: 'block',
                          marginBottom: '0.5rem',
                        }}
                      >
                        Body Fat % (%)
                      </label>
                      <div className="profile-screen-number-input-row">
                        <input
                          type="number"
                          className="profile-screen-number-input"
                          value={bodyFatPercentage}
                          onChange={(e) => setBodyFatPercentage(e.target.value)}
                          placeholder="20"
                          min="0"
                          max="50"
                          step="0.1"
                        />
                        <span className="profile-screen-unit">%</span>
                      </div>
                      {bodyFatPercentage && weight && (
                        <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.5rem' }}>
                          LBM係数: {((1 - parseFloat(bodyFatPercentage) / 100) * 100).toFixed(1)}%
                          <br />
                          LBM:{' '}
                          {(parseFloat(weight) * (1 - parseFloat(bodyFatPercentage) / 100)).toFixed(
                            1
                          )}
                          kg
                          <br />
                          Protein Target:{' '}
                          {(
                            parseFloat(weight) *
                            (1 - parseFloat(bodyFatPercentage) / 100) *
                            2.2
                          ).toFixed(1)}
                          g
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 年齢�E�推奨�E�E 栁E��素の忁E��E��に影響 */}
              <div className="profile-screen-input-group">
                <div className="profile-screen-field-header">
                  <span className="profile-screen-field-label">Age</span>
                  <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                    Recommended
                  </span>
                </div>
                <div className="profile-screen-number-input-row">
                  <input
                    type="number"
                    className="profile-screen-number-input"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="30"
                    min="0"
                    max="120"
                    step="1"
                  />
                  <span className="profile-screen-unit">years</span>
                </div>
              </div>

              {/* 活動量�E�推奨�E�E 栁E��素の忁E��E��に影響 */}
              <div className="profile-screen-input-group">
                <div className="profile-screen-field-header">
                  <span className="profile-screen-field-label">Activity Level</span>
                  <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                    Recommended
                  </span>
                </div>
                <div className="profile-screen-button-row">
                  <button
                    className={`profile-screen-option-button ${activityLevel === 'sedentary' ? 'active' : ''}`}
                    onClick={() => setActivityLevel('sedentary')}
                  >
                    低い�E�デスクワーク中忁E��E                  </button>
                  <button
                    className={`profile-screen-option-button ${activityLevel === 'moderate' ? 'active' : ''}`}
                    onClick={() => setActivityLevel('moderate')}
                  >
                    中程度�E�週3-4回�E運動�E�E                  </button>
                  <button
                    className={`profile-screen-option-button ${activityLevel === 'active' ? 'active' : ''}`}
                    onClick={() => setActivityLevel('active')}
                  >
                    高い�E�毎日運動�E�E                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 目標（忁E��！E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('goal')}
          >
            <h2 className="profile-screen-section-title">Goals</h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.goal ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.goal && (
            <div className="profile-screen-section-content">
              {renderFieldLabel(PROFILE_FIELDS.goal)}
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {goal === USER_GOALS.HEALING &&
                  'Aim to reduce inflammation, repair the gut, and improve chronic health issues.'}
                {goal === USER_GOALS.PERFORMANCE &&
                  'Prioritize improvements in strength, endurance, and cognitive function.'}
                {goal === USER_GOALS.WEIGHT_LOSS && 'Aim to optimize metabolism and reduce body fat.'}
                {goal === USER_GOALS.AUTOIMMUNE_HEALING &&
                  'Aim to alleviate autoimmune disease symptoms and recalibrate the immune system.'}
              </div>
              <div className="profile-screen-button-row">
                {Object.values(USER_GOALS).map((g) => (
                  <button
                    key={g}
                    className={`profile-screen-option-button ${goal === g ? 'active' : ''}`}
                    onClick={() => setGoal(g)}
                  >
                    {g === USER_GOALS.HEALING && 'Healing & Recovery'}
                    {g === USER_GOALS.PERFORMANCE && 'Performance Enhancement'}
                    {g === USER_GOALS.WEIGHT_LOSS && 'Weight Loss'}
                    {g === USER_GOALS.AUTOIMMUNE_HEALING && 'Autoimmune Healing'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 代謝状態（忁E��！E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('metabolicStatus')}
          >
            <h2 className="profile-screen-section-title">
              Metabolic Status
              <HelpTooltip text="Adapted: Fully adapted to ketosis. Stable in low-carb state.\nTransitioning: Transitioning to ketosis. Possible temporary discomfort during adaptation." />
            </h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.metabolicStatus ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.metabolicStatus && (
            <div className="profile-screen-section-content">
              {renderFieldLabel(PROFILE_FIELDS.metabolicStatus)}
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {metabolicStatus === METABOLIC_STATUS.ADAPTED &&
                  'Fully adapted to ketosis. Stable in low-carb state.'}
                {metabolicStatus === METABOLIC_STATUS.TRANSITIONING &&
                  'Transitioning to ketosis. Possible temporary discomfort during adaptation.'}
              </div>
              <div className="profile-screen-button-row">
                {Object.values(METABOLIC_STATUS).map((status) => (
                  <button
                    key={status}
                    className={`profile-screen-option-button ${metabolicStatus === status ? 'active' : ''}`}
                    onClick={() => setMetabolicStatus(status)}
                  >
                    {status === METABOLIC_STATUS.ADAPTED && 'Adapted'}
                    {status === METABOLIC_STATUS.TRANSITIONING && 'Transitioning'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ダイエチE��モード（推奨�E�E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('dietMode')}
          >
            <h2 className="profile-screen-section-title">
              Diet Mode
              <HelpTooltip text="Strict Carnivore: Animal foods only. No plant foods.\nKetovore: Primarily animal foods. Small amounts of low-carb plants (avocado, nuts, etc.) allowed.\nLion Diet: Beef and salt only. Most strict form." />
            </h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.dietMode ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.dietMode && (
            <div className="profile-screen-section-content">
              {renderFieldLabel(PROFILE_FIELDS.mode)}
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {mode === DIET_MODES.STRICT_CARNIVORE &&
                  'Animal foods only. No plant foods.'}
                {mode === DIET_MODES.KETOVORE &&
                  'Primarily animal foods. Small amounts of low-carb plants (avocado, nuts, etc.) allowed.'}
                {mode === DIET_MODES.LION_DIET && 'Beef and salt only. Most strict form.'}
              </div>
              <div className="profile-screen-button-row">
                {Object.values(DIET_MODES).map((m) => (
                  <button
                    key={m}
                    className={`profile-screen-option-button ${mode === m ? 'active' : ''}`}
                    onClick={() => setMode(m)}
                  >
                    {m === DIET_MODES.STRICT_CARNIVORE && 'Strict Carnivore'}
                    {m === DIET_MODES.KETOVORE && 'Ketovore'}
                    {m === DIET_MODES.LION_DIET && 'Lion Diet'}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 乳糖耐性�E�任意！E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('dairyTolerance')}
          >
            <h2 className="profile-screen-section-title">Lactose Tolerance</h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.dairyTolerance ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.dairyTolerance && (
            <div className="profile-screen-section-content">
              <div className="profile-screen-switch-row">
                {renderFieldLabel(PROFILE_FIELDS.dairyTolerance)}
                <label className="profile-screen-switch">
                  <input
                    type="checkbox"
                    checked={dairyTolerance}
                    onChange={(e) => setDairyTolerance(e.target.checked)}
                  />
                  <span className="profile-screen-switch-slider"></span>
                </label>
              </div>
            </div>
          )}
        </div>

        {/* 女性特有�E条件�E�栁E��素の忁E��E��に影響�E�E*/}
        {gender === 'female' && !hiddenSections.femaleSpecific && (
          <div className="profile-screen-section">
            <div
              className="profile-screen-section-header"
              onClick={() => toggleSectionCollapse('femaleSpecific')}
            >
              <h2 className="profile-screen-section-title">Female-Specific Conditions (No test required)</h2>
              <div className="profile-screen-section-toggle">
                <span
                  className="profile-screen-section-visibility-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility('femaleSpecific');
                  }}
                  title={t('settings.hideSection')}
                >
                  非表示
                </span>
                <span
                  className={`profile-screen-collapse-icon ${collapsedSections.femaleSpecific ? 'collapsed' : ''}`}
                >
                  ▼
                </span>
              </div>
            </div>
            {!collapsedSections.femaleSpecific && (
              <div className="profile-screen-section-content">
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  These conditions affect iron, protein, and magnesium requirements (self-reported)
                </p>

                <div className="profile-screen-switch-row">
                  <div className="profile-screen-switch-label-group">
                    <label className="profile-screen-switch-label">Pregnant</label>
                    <p className="profile-screen-switch-description">
                      Protein, iron, and magnesium requirements increase
                    </p>
                  </div>
                  <label className="profile-screen-switch">
                    <input
                      type="checkbox"
                      checked={isPregnant}
                      onChange={(e) => {
                        setIsPregnant(e.target.checked);
                        if (e.target.checked) {
                          setIsBreastfeeding(false); // 妊娠中と授乳中は同時に選択不可
                        }
                      }}
                    />
                    <span className="profile-screen-switch-slider"></span>
                  </label>
                </div>

                <div className="profile-screen-switch-row" style={{ marginTop: '1rem' }}>
                  <div className="profile-screen-switch-label-group">
                    <label className="profile-screen-switch-label">Breastfeeding</label>
                    <p className="profile-screen-switch-description">
                      Protein and magnesium requirements increase
                    </p>
                  </div>
                  <label className="profile-screen-switch">
                    <input
                      type="checkbox"
                      checked={isBreastfeeding}
                      onChange={(e) => {
                        setIsBreastfeeding(e.target.checked);
                        if (e.target.checked) {
                          setIsPregnant(false); // 妊娠中と授乳中は同時に選択不可
                        }
                      }}
                    />
                    <span className="profile-screen-switch-slider"></span>
                  </label>
                </div>

                <div className="profile-screen-switch-row" style={{ marginTop: '1rem' }}>
                  <div className="profile-screen-switch-label-group">
                    <label className="profile-screen-switch-label">Post-menopausal</label>
                    <p className="profile-screen-switch-description">
                      鉁E�Eの忁E��E��ぁEmgに減少します（月経がなぁE��めE��E                    </p>
                  </div>
                  <label className="profile-screen-switch">
                    <input
                      type="checkbox"
                      checked={isPostMenopause}
                      onChange={(e) => setIsPostMenopause(e.target.checked)}
                    />
                    <span className="profile-screen-switch-slider"></span>
                  </label>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ストレスレベル�E��Eグネシウムの忁E��E��に影響�E�E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('stressLevel')}
          >
            <h2 className="profile-screen-section-title">Stress Level</h2>
            <div className="profile-screen-section-toggle">
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.stressLevel ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.stressLevel && (
            <div className="profile-screen-section-content">
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                {getFieldImpactDescription('stressLevel', stressLevel)}
              </p>
              <div className="profile-screen-input-group">
                <label className="profile-screen-field-label">Stress Level (0-10)</label>
                <div className="profile-screen-number-input-row">
                  <input
                    type="number"
                    className="profile-screen-number-input"
                    value={stressLevelNumeric}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      if (!isNaN(value) && value >= 0 && value <= 10) {
                        setStressLevelNumeric(value);
                      }
                    }}
                    min="0"
                    max="10"
                    step="1"
                  />
                  <span className="profile-screen-unit">/10</span>
                </div>
                <p
                  className="profile-screen-field-description"
                  style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#666' }}
                >
                  {stressLevelNumeric <= 3 && 'Low Stress'}
                  {stressLevelNumeric > 3 && stressLevelNumeric <= 7 && 'Moderate Stress'}
                  {stressLevelNumeric > 7 && 'High Stress'}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* 推奨頁E��: 睡眠・運動・甲状腺・日光暴露 */}
        {!hiddenSections.recommended && (
          <div className="profile-screen-section">
            <div
              className="profile-screen-section-header"
              onClick={() => toggleSectionCollapse('recommended')}
            >
              <h2 className="profile-screen-section-title">Recommended Items (No test required)</h2>
              <div className="profile-screen-section-toggle">
                <span
                  className="profile-screen-section-visibility-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility('recommended');
                  }}
                  title={t('settings.hideSection')}
                >
                  非表示
                </span>
                <span
                  className={`profile-screen-collapse-icon ${collapsedSections.recommended ? 'collapsed' : ''}`}
                >
                  ▼
                </span>
              </div>
            </div>
            {!collapsedSections.recommended && (
              <div className="profile-screen-section-content">
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  これら�E頁E��は栁E��素の忁E��E��に大きく影響します（�E己申告で刁E��ります！E                </p>

                {/* 睡眠時間 */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Sleep Hours</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                    {getFieldImpactDescription('sleepHours', sleepHours) && (
                      <span className="profile-screen-field-description">
                        {getFieldImpactDescription('sleepHours', sleepHours)}
                      </span>
                    )}
                  </div>
                  <div className="profile-screen-number-input-row">
                    <input
                      type="number"
                      className="profile-screen-number-input"
                      value={sleepHours}
                      onChange={(e) => setSleepHours(e.target.value)}
                      placeholder="7"
                      min="0"
                      max="24"
                      step="0.5"
                    />
                    <span className="profile-screen-unit">hours/day</span>
                  </div>
                </div>

                {/* 運動強度 */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Exercise Intensity</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                    <span className="profile-screen-field-description">
                      {getFieldImpactDescription('exerciseIntensity', exerciseIntensity)}
                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${exerciseIntensity === 'none' ? 'active' : ''}`}
                      onClick={() => setExerciseIntensity('none')}
                    >
                      なぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseIntensity === 'light' ? 'active' : ''}`}
                      onClick={() => setExerciseIntensity('light')}
                    >
                      軽ぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseIntensity === 'moderate' ? 'active' : ''}`}
                      onClick={() => setExerciseIntensity('moderate')}
                    >
                      中程度
                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseIntensity === 'intense' ? 'active' : ''}`}
                      onClick={() => setExerciseIntensity('intense')}
                    >
                      激しい
                    </button>
                  </div>
                </div>

                {/* 運動頻度 */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Exercise Frequency</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                    <span className="profile-screen-field-description">Exercise sessions per week</span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${exerciseFrequency === 'none' ? 'active' : ''}`}
                      onClick={() => setExerciseFrequency('none')}
                    >
                      なぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseFrequency === '1-2' ? 'active' : ''}`}
                      onClick={() => setExerciseFrequency('1-2')}
                    >
                      週1-2囁E                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseFrequency === '3-4' ? 'active' : ''}`}
                      onClick={() => setExerciseFrequency('3-4')}
                    >
                      週3-4囁E                    </button>
                    <button
                      className={`profile-screen-option-button ${exerciseFrequency === '5+' ? 'active' : ''}`}
                      onClick={() => setExerciseFrequency('5+')}
                    >
                      週5回以丁E                    </button>
                  </div>
                </div>

                {/* 甲状腺機�E */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Thyroid Function</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                    {getFieldImpactDescription('thyroidFunction', thyroidFunction) && (
                      <span className="profile-screen-field-description">
                        {getFieldImpactDescription('thyroidFunction', thyroidFunction)}
                      </span>
                    )}
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${thyroidFunction === 'normal' ? 'active' : ''}`}
                      onClick={() => setThyroidFunction('normal')}
                    >
                      正常
                    </button>
                    <button
                      className={`profile-screen-option-button ${thyroidFunction === 'hypothyroid' ? 'active' : ''}`}
                      onClick={() => setThyroidFunction('hypothyroid')}
                    >
                      機�E低丁E                    </button>
                    <button
                      className={`profile-screen-option-button ${thyroidFunction === 'hyperthyroid' ? 'active' : ''}`}
                      onClick={() => setThyroidFunction('hyperthyroid')}
                    >
                      機�E亢進
                    </button>
                  </div>
                </div>

                {/* 日光暴露頻度 */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Sun Exposure Frequency</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-recommended">
                      Recommended
                    </span>
                    <span className="profile-screen-field-description">
                      {getFieldImpactDescription('sunExposureFrequency', sunExposureFrequency)}
                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${sunExposureFrequency === 'none' ? 'active' : ''}`}
                      onClick={() => setSunExposureFrequency('none')}
                    >
                      なぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${sunExposureFrequency === 'rare' ? 'active' : ''}`}
                      onClick={() => setSunExposureFrequency('rare')}
                    >
                      まめE                    </button>
                    <button
                      className={`profile-screen-option-button ${sunExposureFrequency === 'occasional' ? 'active' : ''}`}
                      onClick={() => setSunExposureFrequency('occasional')}
                    >
                      時、E                    </button>
                    <button
                      className={`profile-screen-option-button ${sunExposureFrequency === 'daily' ? 'active' : ''}`}
                      onClick={() => setSunExposureFrequency('daily')}
                    >
                      毎日
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 任意頁E��: 消化器系・炎症・メンタルヘルス・サプリメント�E生活習�E */}
        {!hiddenSections.optional && (
          <div className="profile-screen-section">
            <div
              className="profile-screen-section-header"
              onClick={() => toggleSectionCollapse('optional')}
            >
              <h2 className="profile-screen-section-title">Optional Items (No test required)</h2>
              <div className="profile-screen-section-toggle">
                <span
                  className="profile-screen-section-visibility-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSectionVisibility('optional');
                  }}
                  title={t('settings.hideSection')}
                >
                  非表示
                </span>
                <span
                  className={`profile-screen-collapse-icon ${collapsedSections.optional ? 'collapsed' : ''}`}
                >
                  ▼
                </span>
              </div>
            </div>
            {!collapsedSections.optional && (
              <div className="profile-screen-section-content">
                <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                  Optional settings for more detailed personalization (self-reported)
                </p>

                {/* 消化器系の問顁E*/}
                <div className="profile-screen-switch-row" style={{ marginBottom: '1rem' }}>
                  <div className="profile-screen-switch-label-group">
                    <label className="profile-screen-switch-label">Digestive Issues</label>
                    <p className="profile-screen-switch-description"></p>
                  </div>
                  <label className="profile-screen-switch">
                    <input
                      type="checkbox"
                      checked={digestiveIssues}
                      onChange={(e) => setDigestiveIssues(e.target.checked)}
                    />
                    <span className="profile-screen-switch-slider"></span>
                  </label>
                </div>

                {/* 炎症レベル */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Inflammation Level</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-optional">
                      任愁E                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${inflammationLevel === 'low' ? 'active' : ''}`}
                      onClick={() => setInflammationLevel('low')}
                    >
                      低い
                    </button>
                    <button
                      className={`profile-screen-option-button ${inflammationLevel === 'moderate' ? 'active' : ''}`}
                      onClick={() => setInflammationLevel('moderate')}
                    >
                      中程度
                    </button>
                    <button
                      className={`profile-screen-option-button ${inflammationLevel === 'high' ? 'active' : ''}`}
                      onClick={() => setInflammationLevel('high')}
                    >
                      高い
                    </button>
                  </div>
                </div>

                {/* メンタルヘルス状慁E*/}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Mental Health Status</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-optional">
                      任愁E                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${mentalHealthStatus === 'good' ? 'active' : ''}`}
                      onClick={() => setMentalHealthStatus('good')}
                    >
                      良好
                    </button>
                    <button
                      className={`profile-screen-option-button ${mentalHealthStatus === 'moderate' ? 'active' : ''}`}
                      onClick={() => setMentalHealthStatus('moderate')}
                    >
                      中程度
                    </button>
                    <button
                      className={`profile-screen-option-button ${mentalHealthStatus === 'poor' ? 'active' : ''}`}
                      onClick={() => setMentalHealthStatus('poor')}
                    >
                      不良
                    </button>
                  </div>
                </div>

                {/* サプリメント摂取状況E*/}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Supplement Intake</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-optional">
                      任愁E                    </span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div className="profile-screen-switch-row">
                      <div className="profile-screen-switch-label-group">
                        <label className="profile-screen-switch-label">Magnesium</label>
                      </div>
                      <label className="profile-screen-switch">
                        <input
                          type="checkbox"
                          checked={supplementMagnesium}
                          onChange={(e) => setSupplementMagnesium(e.target.checked)}
                        />
                        <span className="profile-screen-switch-slider"></span>
                      </label>
                    </div>
                    <div className="profile-screen-switch-row">
                      <div className="profile-screen-switch-label-group">
                        <label className="profile-screen-switch-label">Vitamin D</label>
                      </div>
                      <label className="profile-screen-switch">
                        <input
                          type="checkbox"
                          checked={supplementVitaminD}
                          onChange={(e) => setSupplementVitaminD(e.target.checked)}
                        />
                        <span className="profile-screen-switch-slider"></span>
                      </label>
                    </div>
                    <div className="profile-screen-switch-row">
                      <div className="profile-screen-switch-label-group">
                        <label className="profile-screen-switch-label">Iodine</label>
                      </div>
                      <label className="profile-screen-switch">
                        <input
                          type="checkbox"
                          checked={supplementIodine}
                          onChange={(e) => setSupplementIodine(e.target.checked)}
                        />
                        <span className="profile-screen-switch-slider"></span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* アルコール摂取頻度 */}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Alcohol Intake Frequency</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-optional">
                      任愁E                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${alcoholFrequency === 'none' ? 'active' : ''}`}
                      onClick={() => setAlcoholFrequency('none')}
                    >
                      なぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${alcoholFrequency === 'rare' ? 'active' : ''}`}
                      onClick={() => setAlcoholFrequency('rare')}
                    >
                      まめE                    </button>
                    <button
                      className={`profile-screen-option-button ${alcoholFrequency === 'weekly' ? 'active' : ''}`}
                      onClick={() => setAlcoholFrequency('weekly')}
                    >
                      週に数囁E                    </button>
                    <button
                      className={`profile-screen-option-button ${alcoholFrequency === 'daily' ? 'active' : ''}`}
                      onClick={() => setAlcoholFrequency('daily')}
                    >
                      毎日
                    </button>
                  </div>
                </div>

                {/* カフェイン摂取釁E*/}
                <div className="profile-screen-input-group" style={{ marginBottom: '1.5rem' }}>
                  <div className="profile-screen-field-header">
                    <span className="profile-screen-field-label">Caffeine Intake</span>
                    <span className="profile-screen-priority-badge profile-screen-priority-optional">
                      任愁E                    </span>
                  </div>
                  <div className="profile-screen-button-row">
                    <button
                      className={`profile-screen-option-button ${caffeineIntake === 'none' ? 'active' : ''}`}
                      onClick={() => setCaffeineIntake('none')}
                    >
                      なぁE                    </button>
                    <button
                      className={`profile-screen-option-button ${caffeineIntake === 'low' ? 'active' : ''}`}
                      onClick={() => setCaffeineIntake('low')}
                    >
                      低い
                    </button>
                    <button
                      className={`profile-screen-option-button ${caffeineIntake === 'moderate' ? 'active' : ''}`}
                      onClick={() => setCaffeineIntake('moderate')}
                    >
                      中程度
                    </button>
                    <button
                      className={`profile-screen-option-button ${caffeineIntake === 'high' ? 'active' : ''}`}
                      onClick={() => setCaffeineIntake('high')}
                    >
                      高い
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Phase 4: 代謝ストレス持E��E*/}
        <div className="profile-screen-section">
          <div
            className="profile-screen-section-header"
            onClick={() => toggleSectionCollapse('metabolicStress')}
          >
            <h2 className="profile-screen-section-title">Metabolic Stress Indicators (Phase 4)</h2>
            <div className="profile-screen-section-toggle">
              <span
                className="profile-screen-section-visibility-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSectionVisibility('metabolicStress');
                }}
                title="こ�Eセクションを非表示にする"
              >
                非表示
              </span>
              <span
                className={`profile-screen-collapse-icon ${collapsedSections.metabolicStress ? 'collapsed' : ''}`}
              >
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.metabolicStress && !hiddenSections.metabolicStress && (
            <div className="profile-screen-section-content">
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                該当する頁E��を選択すると、栁E��素目標値が�E動調整されまぁE              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  {
                    id: 'morning_fatigue',
                    label: '朝起きるのが辛い / 疲労感が抜けなぁE,
                    adjustment: 'ナトリウム +1500mg�E�副腎疲労疑い�E�E,
                  },
                  {
                    id: 'night_wake',
                    label: '睡眠中に目が覚めめE/ 悪夢を見る',
                    adjustment: 'マグネシウム +200mg、夕食�E脂質推奨�E�夜間低血糖疑ぁE��E,
                  },
                  {
                    id: 'postmeal_sleepy',
                    label: '食後に眠くなめE,
                    adjustment: 'インスリン抵抗性あり�E�フラグ保存！E,
                  },
                  {
                    id: 'coffee_high',
                    label: 'コーヒ�Eを毎日2杯以上飲む',
                    adjustment: 'ナトリウム +500mg�E�Ea排�E増！E,
                    inputType: 'coffee' as const,
                  },
                ].map((indicator) => {
                  const isCoffeeIndicator = indicator.id === 'coffee_high';
                  const isChecked = metabolicStressIndicators.includes(indicator.id);

                  return (
                    <div key={indicator.id} className="info-card">
                      <label
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.75rem',
                          cursor: 'pointer',
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setMetabolicStressIndicators([
                                ...metabolicStressIndicators,
                                indicator.id,
                              ]);
                            } else {
                              setMetabolicStressIndicators(
                                metabolicStressIndicators.filter((id) => id !== indicator.id)
                              );
                              if (isCoffeeIndicator) {
                                setCoffeeInput('');
                              }
                            }
                          }}
                          style={{ marginTop: '0.25rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>
                            {indicator.label}
                          </div>
                          <div
                            style={{
                              fontSize: '0.85rem',
                              color: '#666',
                              marginBottom: isCoffeeIndicator && isChecked ? '0.75rem' : '0',
                            }}
                          >
                            {indicator.adjustment}
                          </div>
                          {isCoffeeIndicator && isChecked && (
                            <div style={{ marginTop: '0.75rem' }}>
                              <label
                                style={{
                                  fontSize: '14px',
                                  color: '#374151',
                                  display: 'block',
                                  marginBottom: '0.5rem',
                                }}
                              >
                                コーヒ�E入力（侁E
                                スタバ�Eコーヒ�EShort、コーヒ�E2杯、コーヒ�E300ml�E�E                              </label>
                              <input
                                type="text"
                                value={coffeeInput}
                                onChange={(e) => setCoffeeInput(e.target.value)}
                                placeholder="侁E スタバ�Eコーヒ�EShort、コーヒ�E2杯、コーヒ�E300ml"
                                style={{
                                  width: '100%',
                                  padding: '0.5rem',
                                  border: '1px solid #e5e7eb',
                                  borderRadius: '4px',
                                  fontSize: '14px',
                                }}
                              />
                              {coffeeInput && (
                                <div
                                  style={{
                                    marginTop: '0.5rem',
                                    fontSize: '0.85rem',
                                    color: '#666',
                                  }}
                                >
                                  {(() => {
                                    try {
                                      const result = calculateCaffeineFromCoffee(coffeeInput);
                                      return `カフェイン釁E ${result.description}`;
                                    } catch {
                                      return `コーヒ�E入劁E ${coffeeInput}`;
                                    }
                                  })()}
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Phase 5: 栁E��素目標値のカスタマイズ�E��E移式！E*/}
        <div className="profile-screen-section">
          <div
            className="nav-item"
            role="button"
            tabIndex={0}
            aria-label="Navigate to Nutrient Target Customization screen"
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent('navigateToScreen', { detail: 'nutrientCustom' })
              );
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                window.dispatchEvent(
                  new CustomEvent('navigateToScreen', { detail: 'nutrientCustom' })
                );
              }
            }}
          >
            <div className="nav-item-content">
              <h2 className="nav-item-title">Nutrient Target Customization (Phase 5)</h2>
              <p className="nav-item-description">
                吁E��E��素の目標値を「推奨値�E�Euto�E�」か「手動�E力！Eanual�E�」かを選択できまぁE              </p>
            </div>
            <span className="nav-item-arrow">←</span>
          </div>
        </div>

        {/* 旧コード（コメントアウト！E*/}
        {/* <div className="profile-screen-section">
          <div className="profile-screen-section-header" onClick={() => toggleSectionCollapse('nutrientCustom')}>
            <h2 className="profile-screen-section-title">Nutrient Target Customization (Phase 5)</h2>
            <div className="profile-screen-section-toggle">
              <span 
                className="profile-screen-section-visibility-toggle"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSectionVisibility('nutrientCustom');
                }}
                title="こ�Eセクションを非表示にする"
              >
                非表示
              </span>
              <span className={`profile-screen-collapse-icon ${collapsedSections.nutrientCustom ? 'collapsed' : ''}`}>
                ▼
              </span>
            </div>
          </div>
          {!collapsedSections.nutrientCustom && !hiddenSections.nutrientCustom && (
            <div className="profile-screen-section-content">
              <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>
                吁E��E��素の目標値を「推奨値�E�Euto�E�」か「手動�E力！Eanual�E�」かを選択できまぁE              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['protein', 'fat', 'sodium', 'magnesium', 'potassium', 'zinc', 'iron', 'vitaminA', 'vitaminD', 'vitaminK2'].map((nutrient) => {
                  const current = customNutrientTargets[nutrient] || { mode: 'auto' };
                  const previewTargets = getCarnivoreTargets(
                    gender as 'male' | 'female', age ? parseFloat(age) : undefined, activityLevel, isPregnant, isBreastfeeding, isPostMenopause,
                    stressLevel, sleepHours ? Number(sleepHours) : undefined, exerciseIntensity, exerciseFrequency, thyroidFunction,
                    sunExposureFrequency, digestiveIssues, inflammationLevel, mentalHealthStatus,
                    supplementMagnesium, supplementVitaminD, supplementIodine, alcoholFrequency,
                    caffeineIntake, undefined, undefined, undefined, bodyComposition, weight ? parseFloat(weight) : undefined
                  );
                  const autoValue = (previewTargets as Record<string, number>)[nutrient] || 0;
                  
                  return (
                    <div key={nutrient} className="info-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <div>
                          <div style={{ fontWeight: '500' }}>
                            {nutrient === 'protein' ? 'タンパク質' :
                             nutrient === 'fat' ? '脂質' :
                             nutrient === 'sodium' ? 'ナトリウム' :
                             nutrient === 'magnesium' ? 'マグネシウム' :
                             nutrient === 'potassium' ? 'カリウム' :
                             nutrient === 'zinc' ? '亜鉛' :
                             nutrient === 'iron' ? '鉁E�E' :
                             nutrient === 'vitaminA' ? 'ビタミンA' :
                             nutrient === 'vitaminD' ? 'ビタミンD' :
                             nutrient === 'vitaminK2' ? 'ビタミンK2' : nutrient}
                          </div>
                          <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '0.25rem' }}>
                            Recommended値: {autoValue}{nutrient === 'protein' || nutrient === 'fat' ? 'g' : nutrient === 'sodium' || nutrient === 'magnesium' || nutrient === 'potassium' || nutrient === 'zinc' || nutrient === 'iron' ? 'mg' : nutrient === 'vitaminA' || nutrient === 'vitaminD' ? 'IU' : 'μg'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <button
                            onClick={() => {
                              const newTargets = { ...customNutrientTargets };
                              if (current.mode === 'auto') {
                                delete newTargets[nutrient];
                              } else {
                                newTargets[nutrient] = { mode: 'auto' };
                              }
                              setCustomNutrientTargets(newTargets);
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: current.mode === 'auto' ? '#3b82f6' : '#f3f4f6',
                              color: current.mode === 'auto' ? 'white' : '#374151',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '14px',
                            }}
                          >
                            Auto
                          </button>
                          <button
                            onClick={() => {
                              setCustomNutrientTargets({
                                ...customNutrientTargets,
                                [nutrient]: { mode: 'manual', value: autoValue },
                              });
                            }}
                            style={{
                              padding: '0.5rem 1rem',
                              backgroundColor: current.mode === 'manual' ? '#3b82f6' : '#f3f4f6',
                              color: current.mode === 'manual' ? 'white' : '#374151',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              fontSize: '14px',
                            }}
                          >
                            Manual
                          </button>
                        </div>
                      </div>
                      {current.mode === 'manual' && (
                        <div style={{ marginTop: '0.75rem' }}>
                          <label style={{ fontSize: '14px', color: '#374151', display: 'block', marginBottom: '0.25rem' }}>
                            手動目標値
                          </label>
                          <div className="profile-screen-number-input-row">
                            <input
                              type="number"
                              className="profile-screen-number-input"
                              value={current.value || ''}
                              onChange={(e) => {
                                const value = e.target.value ? parseFloat(e.target.value) : undefined;
                                setCustomNutrientTargets({
                                  ...customNutrientTargets,
                                  [nutrient]: { mode: 'manual', value },
                                });
                              }}
                              placeholder={autoValue.toString()}
                              min="0"
                              step={nutrient === 'protein' || nutrient === 'fat' ? '1' : '0.1'}
                            />
                            <span className="profile-screen-unit">
                              {nutrient === 'protein' || nutrient === 'fat' ? 'g' :
                               nutrient === 'sodium' || nutrient === 'magnesium' || nutrient === 'potassium' || nutrient === 'zinc' || nutrient === 'iron' ? 'mg' :
                               nutrient === 'vitaminA' || nutrient === 'vitaminD' ? 'IU' : 'μg'}
                            </span>
                          </div>
                        </div>
                      )}
                      {current.mode === 'manual' && (
                        <span style={{ fontSize: '12px', color: '#9ca3af', marginLeft: '0.5rem' }}>✏︁E/span>
                      )}
                    </div>
                  );
                })}
              </div>
              {Object.keys(customNutrientTargets).length > 0 && (
                <button
                  onClick={() => {
                    if (window.confirm('全てのカスタム目標値をリセチE��して、推奨値�E�Euto�E�に戻しますか�E�E)) {
                      setCustomNutrientTargets({});
                    }
                  }}
                  style={{
                    marginTop: '1rem',
                    padding: '0.75rem 1.5rem',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: '500',
                  }}
                >
                  全てリセチE���E�Eutoに戻す！E                </button>
              )}
            </div>
          )}
        </div>

        {/* プレビューボタン */}
        <div className="profile-screen-section">
          <button
            onClick={() => setShowPreview(!showPreview)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              fontWeight: '500',
              width: '100%',
            }}
          >
            {showPreview ? '📊 プレビューを閉じる' : '📊 栁E��素目標値のプレビュー'}
          </button>

          {showPreview && (
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
              }}
            >
              <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '0.75rem' }}>
                現在の設定による栁E��素目標値
              </h3>
              {(() => {
                const explanations = getAllNutrientExplanations({
                  gender,
                  age: age ? Number(age) : undefined,
                  activityLevel,
                  isPregnant,
                  isBreastfeeding,
                  isPostMenopause,
                  stressLevel,
                  sleepHours: sleepHours ? Number(sleepHours) : undefined,
                  exerciseIntensity,
                  exerciseFrequency,
                  thyroidFunction,
                  sunExposureFrequency,
                  supplementMagnesium,
                  supplementVitaminD,
                });

                return (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {explanations.map((explanation, index) => (
                      <div
                        key={index}
                        style={{
                          padding: '0.75rem',
                          backgroundColor: '#fff',
                          borderRadius: '6px',
                          border: '1px solid #e5e7eb',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.5rem',
                          }}
                        >
                          <span style={{ fontWeight: '600' }}>{explanation.nutrient}:</span>
                          <strong style={{ fontSize: '1.1rem' }}>
                            {explanation.value}
                            {explanation.unit}
                          </strong>
                        </div>
                        <div
                          style={{
                            fontSize: '14px',
                            color: '#666',
                            lineHeight: '1.6',
                            marginTop: '0.5rem',
                          }}
                        >
                          <p style={{ margin: '0 0 0.5rem 0' }}>{explanation.humanExplanation}</p>
                          {explanation.adjustments.length > 0 && (
                            <div
                              style={{
                                marginTop: '0.5rem',
                                paddingTop: '0.5rem',
                                borderTop: '1px solid #e5e7eb',
                              }}
                            >
                              <div
                                style={{ fontSize: '12px', color: '#888', marginBottom: '0.25rem' }}
                              >
                                調整冁E��:
                              </div>
                              {explanation.adjustments.map((adj, i) => (
                                <div
                                  key={i}
                                  style={{
                                    fontSize: '13px',
                                    marginLeft: '0.5rem',
                                    marginBottom: '0.25rem',
                                  }}
                                >
                                  • {adj.reason}: {adj.impact}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Phase 6: 栁E��素表示設宁E*/}
        <div className="profile-screen-section section-container">
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-text-primary)',
            }}
          >
            栁E��素表示設宁E          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '1rem',
            }}
          >
            吁E��E��素の表示/非表示を�Eり替えられます。デフォルト�E全部表示です、E          </p>

          {/* 全選抁E全解除 */}
          <div className="button-group" style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => {
                setAllNutrientsVisible(true);
                setNutrientDisplaySettings(getNutrientDisplaySettings());
              }}
              className="toggle-button active"
            >
              全て表示
            </button>
            <button
              onClick={() => {
                setAllNutrientsVisible(false);
                setNutrientDisplaySettings(getNutrientDisplaySettings());
              }}
              className="toggle-button"
            >
              全て非表示
            </button>
          </div>

          {/* カチE��リごとの表示 */}
          {(
            [
              'macro',
              'mineral',
              'fatSolubleVitamin',
              'waterSolubleVitamin',
              'other',
              'ratio',
              'antiNutrient',
              'avoid',
            ] as const
          ).map((category) => {
            const categoryConfigs = ALL_NUTRIENT_DISPLAY_CONFIGS.filter(
              (config) => config.category === category
            );
            if (categoryConfigs.length === 0) return null;

            const categoryLabels: Record<typeof category, string> = {
              macro: 'マクロ栁E��素',
              mineral: 'ミネラル',
              fatSolubleVitamin: '脂溶性ビタミン',
              waterSolubleVitamin: '水溶性ビタミン',
              other: 'そ�E仁E,
              ratio: '比率',
              antiNutrient: '抗栁E��素',
              avoid: '避けるべき食品',
            };

            const allVisible = categoryConfigs.every(
              (config) => nutrientDisplaySettings[config.key]
            );
            const allHidden = categoryConfigs.every(
              (config) => !nutrientDisplaySettings[config.key]
            );

            return (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>
                    {categoryLabels[category]}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        toggleCategoryVisibility(category, true);
                        setNutrientDisplaySettings(getNutrientDisplaySettings());
                      }}
                      disabled={allVisible}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: allVisible ? '#d1d5db' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: allVisible ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      全て表示
                    </button>
                    <button
                      onClick={() => {
                        toggleCategoryVisibility(category, false);
                        setNutrientDisplaySettings(getNutrientDisplaySettings());
                      }}
                      disabled={allHidden}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: allHidden ? '#d1d5db' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: allHidden ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      全て非表示
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '0.5rem',
                  }}
                >
                  {categoryConfigs.map((config) => {
                    const isVisible = nutrientDisplaySettings[config.key];
                    return (
                      <label
                        key={config.key}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: isVisible ? '#f0f9ff' : '#f9fafb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: `1px solid ${isVisible ? '#3b82f6' : '#e5e7eb'}`,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={nutrientDisplaySettings[config.key]}
                          onChange={() => {
                            toggleNutrientVisibility(config.key);
                            setNutrientDisplaySettings(getNutrientDisplaySettings());
                          }}
                          style={{ cursor: 'pointer' }}
                        />
                        <span
                          style={{
                            fontSize: '14px',
                            color: nutrientDisplaySettings[config.key] ? '#1e40af' : '#6b7280',
                          }}
                        >
                          {config.label} {config.unit && `(${config.unit})`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 機�E表示設定（あらゆる機�EのON/OFF�E�E*/}
        <div className="profile-screen-section section-container">
          <h2
            style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              marginBottom: '1rem',
              color: 'var(--color-text-primary)',
            }}
          >
            機�E表示設宁E          </h2>
          <p
            style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-secondary)',
              marginBottom: '1rem',
            }}
          >
            あらめE��機�Eの表示/非表示を�Eり替えられます。デフォルト�E全部表示です、E          </p>

          {/* 全選抁E全解除 */}
          <div className="button-group" style={{ marginBottom: '1.5rem' }}>
            <button
              onClick={() => {
                setAllFeaturesVisible(true);
                setFeatureDisplaySettings(getFeatureDisplaySettings());
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              全て表示
            </button>
            <button
              onClick={() => {
                setAllFeaturesVisible(false);
                setFeatureDisplaySettings(getFeatureDisplaySettings());
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500',
              }}
            >
              全て非表示
            </button>
          </div>

          {/* カチE��リごとの表示 */}
          {(['screenElement', 'analysis', 'notification', 'other'] as const).map((category) => {
            const categoryConfigs = ALL_FEATURE_DISPLAY_CONFIGS.filter(
              (config) => config.category === category
            );
            if (categoryConfigs.length === 0) return null;

            const categoryLabels: Record<typeof category, string> = {
              screenElement: '画面要素',
              analysis: '刁E��機�E',
              notification: '通知設宁E,
              other: 'そ�E仁E,
            };

            const allVisible = categoryConfigs.every(
              (config) => featureDisplaySettings[config.key]
            );
            const allHidden = categoryConfigs.every(
              (config) => !featureDisplaySettings[config.key]
            );

            return (
              <div key={category} style={{ marginBottom: '1.5rem' }}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '0.75rem',
                  }}
                >
                  <h3 style={{ fontSize: '1rem', fontWeight: '600' }}>
                    {categoryLabels[category]}
                  </h3>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      onClick={() => {
                        toggleFeatureCategoryVisibility(category, true);
                        setFeatureDisplaySettings(getFeatureDisplaySettings());
                      }}
                      disabled={allVisible}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: allVisible ? '#d1d5db' : '#3b82f6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: allVisible ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      全て表示
                    </button>
                    <button
                      onClick={() => {
                        toggleFeatureCategoryVisibility(category, false);
                        setFeatureDisplaySettings(getFeatureDisplaySettings());
                      }}
                      disabled={allHidden}
                      style={{
                        padding: '0.25rem 0.75rem',
                        backgroundColor: allHidden ? '#d1d5db' : '#6b7280',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: allHidden ? 'not-allowed' : 'pointer',
                        fontSize: '12px',
                      }}
                    >
                      全て非表示
                    </button>
                  </div>
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '0.5rem',
                  }}
                >
                  {categoryConfigs.map((config) => {
                    const isVisible = featureDisplaySettings[config.key];
                    return (
                      <label
                        key={config.key}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.5rem',
                          padding: '0.5rem',
                          backgroundColor: isVisible ? '#f0f9ff' : '#f9fafb',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          border: `1px solid ${isVisible ? '#3b82f6' : '#e5e7eb'}`,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={isVisible}
                          onChange={() => {
                            toggleFeatureVisibilityUtil(config.key);
                            setFeatureDisplaySettings(getFeatureDisplaySettings());
                          }}
                          style={{ cursor: 'pointer', marginTop: '0.25rem' }}
                        />
                        <div style={{ flex: 1 }}>
                          <span
                            style={{
                              fontSize: '14px',
                              color: isVisible ? '#1e40af' : '#6b7280',
                              fontWeight: '500',
                            }}
                          >
                            {config.label}
                          </span>
                          {config.description && (
                            <div
                              style={{ fontSize: '12px', color: '#9ca3af', marginTop: '0.25rem' }}
                            >
                              {config.description}
                            </div>
                          )}
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* 保存�Eタン�E�常時表示�E�E*/}
        <div
          style={{
            position: 'sticky',
            bottom: 0,
            backgroundColor: 'white',
            padding: '1rem',
            borderTop: '1px solid #e5e7eb',
            zIndex: 100,
            marginTop: '2rem',
          }}
        >
          <button
            onClick={handleSave}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#dc2626';
            }}
          >
            保存          </button>
        </div>
      </div>
    </div>
  );
}

