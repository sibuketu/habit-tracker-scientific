/**
 * CarnivoreOS - Onboarding Screen
 *
 * 初回ユーザー向けのオンボーディングフロー
 */

import { useState, useEffect } from 'react';
import { setLanguage, getLanguage, useTranslation, type Language } from '../utils/i18n';
import type { NutrientDisplayMode } from '../utils/nutrientPriority';
import { saveNutrientDisplayMode, getDefaultModeForPersona } from '../utils/nutrientPriority';
import AuthScreen from './AuthScreen';
import { isSupabaseAvailable } from '../lib/supabaseClient';
import './OnboardingScreen.css';

interface OnboardingStep {
  titleKey: string;
  descriptionKey: string;
  icon: string;
  isLanguageStep?: boolean;
  isNotificationStep?: boolean;
  isChoiceStep?: boolean;
  isAISpotlightStep?: boolean;
  isPersonaStep?: boolean;
  isAuthStep?: boolean;
}

const onboardingStepConfigs: OnboardingStep[] = [
  {
    titleKey: 'onboarding.step1.title',
    descriptionKey: 'onboarding.step1.description',
    icon: '👋',
    isLanguageStep: true,
  },
  {
    titleKey: 'onboarding.step2.title',
    descriptionKey: 'onboarding.step2.description',
    icon: '👤',
    isPersonaStep: true,
  },
  {
    titleKey: 'onboarding.step4.title',
    descriptionKey: 'onboarding.step4.description',
    icon: '🔐',
    isAuthStep: true,
  },
  {
    titleKey: 'onboarding.step3.title',
    descriptionKey: 'onboarding.step3.description',
    icon: '🔔',
    isNotificationStep: true,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const { t } = useTranslation();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getLanguage());
  const [aiButtonClicked, setAiButtonClicked] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<
    'carnivore_practitioner' | 'beginner' | 'data_focused' | null
  >(null);
  const [authCompleted, setAuthCompleted] = useState(false);
  // Force re-render on language change
  const [, forceUpdate] = useState(0);

  // Set initial step (for spotlight control in AISpeedDial)
  useEffect(() => {
    (window as any).__onboardingCurrentStep = currentStep;
    window.dispatchEvent(new CustomEvent('onboardingStepChanged'));
  }, [currentStep]);

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
  ];

  return (
    <div className="onboarding-overlay">
      <div className="onboarding-card">
        <div className="onboarding-icon">
          {onboardingStepConfigs[currentStep].icon}
        </div>
        <h2 className="onboarding-title">
          {t(onboardingStepConfigs[currentStep].titleKey)}
        </h2>
        <p className="onboarding-description">
          {t(onboardingStepConfigs[currentStep].descriptionKey)}
        </p>

        {/* Step 1: Language Selection */}
        {onboardingStepConfigs[currentStep].isLanguageStep && (
          <div className="language-selector">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-button ${selectedLanguage === lang.code ? 'selected' : ''
                  }`}
                onClick={() => {
                  setLanguage(lang.code);
                  setSelectedLanguage(lang.code);
                  forceUpdate((n) => n + 1);
                }}
              >
                {lang.nativeName}
              </button>
            ))}
          </div>
        )}

        {/* Step 2: Persona Selection */}
        {onboardingStepConfigs[currentStep].isPersonaStep && (
          <div className="persona-selector" style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', margin: '1rem 0' }}>
            <button
              className={`persona-button ${selectedPersona === 'carnivore_practitioner' ? 'selected' : ''}`}
              onClick={() => setSelectedPersona('carnivore_practitioner')}
              style={{
                padding: '1rem',
                border: selectedPersona === 'carnivore_practitioner' ? '2px solid #ef4444' : '1px solid #3f3f46',
                borderRadius: '12px',
                backgroundColor: selectedPersona === 'carnivore_practitioner' ? '#1f1f22' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#ef4444', marginBottom: '0.25rem' }}>🥩 {t('onboarding.persona.practitioner')}</div>
              <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{t('onboarding.persona.practitionerDesc')}</div>
            </button>
            <button
              className={`persona-button ${selectedPersona === 'beginner' ? 'selected' : ''}`}
              onClick={() => setSelectedPersona('beginner')}
              style={{
                padding: '1rem',
                border: selectedPersona === 'beginner' ? '2px solid #f59e0b' : '1px solid #3f3f46',
                borderRadius: '12px',
                backgroundColor: selectedPersona === 'beginner' ? '#1f1f22' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#f59e0b', marginBottom: '0.25rem' }}>🔰 {t('onboarding.persona.beginner')}</div>
              <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{t('onboarding.persona.beginnerDesc')}</div>
            </button>
            <button
              className={`persona-button ${selectedPersona === 'data_focused' ? 'selected' : ''}`}
              onClick={() => setSelectedPersona('data_focused')}
              style={{
                padding: '1rem',
                border: selectedPersona === 'data_focused' ? '2px solid #3b82f6' : '1px solid #3f3f46',
                borderRadius: '12px',
                backgroundColor: selectedPersona === 'data_focused' ? '#1f1f22' : 'transparent',
                textAlign: 'left',
                cursor: 'pointer',
              }}
            >
              <div style={{ fontWeight: 'bold', color: '#3b82f6', marginBottom: '0.25rem' }}>📊 {t('onboarding.persona.data')}</div>
              <div style={{ fontSize: '12px', color: '#a1a1aa' }}>{t('onboarding.persona.dataDesc')}</div>
            </button>
          </div>
        )}

        {/* Step 3: Auth Selection */}
        {onboardingStepConfigs[currentStep].isAuthStep && (
          <div style={{ margin: '1rem 0' }}>
            <AuthScreen
              onAuthSuccess={() => {
                setAuthCompleted(true);
                // Auth success automatically handled, button allows proceed
              }}
              isEmbedded={true}
            />
          </div>
        )}

        {/* Step 4: Notification (Prompt only) */}
        {onboardingStepConfigs[currentStep].isNotificationStep && (
          <div style={{ margin: '1rem 0', textAlign: 'center', color: '#a1a1aa', fontSize: '14px' }}>
            {t('onboarding.notification.hint')}
          </div>
        )}

        <button
          className="onboarding-next-button"
          onClick={() => {
            if (onboardingStepConfigs[currentStep].isPersonaStep && selectedPersona) {
              // Set default mode based on persona
              const defaultMode = getDefaultModeForPersona(selectedPersona);
              saveNutrientDisplayMode(defaultMode);
            }

            if (currentStep < onboardingStepConfigs.length - 1) {
              setCurrentStep(currentStep + 1);
            } else {
              onComplete();
            }
          }}
          disabled={
            (onboardingStepConfigs[currentStep].isPersonaStep && !selectedPersona) ||
            (onboardingStepConfigs[currentStep].isAuthStep && !authCompleted && isSupabaseAvailable()) // Only require auth if Supabase is configured
          }
          style={{
            opacity: (
              (onboardingStepConfigs[currentStep].isPersonaStep && !selectedPersona) ||
              (onboardingStepConfigs[currentStep].isAuthStep && !authCompleted && isSupabaseAvailable())
            ) ? 0.5 : 1
          }}
        >
          {currentStep === onboardingStepConfigs.length - 1
            ? t('onboarding.start')
            : t('onboarding.next')}
        </button>
      </div>
    </div>
  );
}
