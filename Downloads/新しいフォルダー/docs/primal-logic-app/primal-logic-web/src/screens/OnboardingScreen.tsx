/**
 * Primal Logic - Onboarding Screen
 *
 * 初回起動時のチュートリアル・機能説明
 */

import { useState, useEffect } from 'react';
import { setLanguage, getLanguage, type Language } from '../utils/i18n';
import './OnboardingScreen.css';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
  isLanguageStep?: boolean; // 言語設定ステップかどうか
  isNotificationStep?: boolean; // 通知設定ステップかどうか
  isChoiceStep?: boolean; // 選択肢を表示するステップかどうか
  isAISpotlightStep?: boolean; // AIボタンをスポットライトするステップかどうか
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: '言語を選択',
    description: 'まず、アプリの表示言語を選択してください。後から変更することもできます。',
    icon: '🌐',
    isLanguageStep: true,
  },
  {
    title: '通知設定',
    description: '電解質アラート、脂質不足リマインダーなどの通知を受け取れます。',
    icon: '🔔',
    isNotificationStep: true,
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(getLanguage());
  const [aiButtonClicked, setAiButtonClicked] = useState(false);

  // 初期ステップを設定（AISpeedDialでスポットライト制御用）
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

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang);
    setLanguage(lang);
    // 言語変更イベントを発火
    const event = new CustomEvent('languageChanged', { detail: lang });
    window.dispatchEvent(event);
  };

  const handleNext = async () => {
    // 通知設定ステップの場合、通知許可をリクエスト
    if (step.isNotificationStep) {
      const { requestNotificationPermission } = await import('../utils/defrostReminder');
      await requestNotificationPermission();
    }
    
    if (currentStep < onboardingSteps.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      // ステップ変更を通知（AISpeedDialでスポットライト制御用）
      (window as any).__onboardingCurrentStep = nextStep;
      window.dispatchEvent(new CustomEvent('onboardingStepChanged'));
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      // ステップ変更を通知（AISpeedDialでスポットライト制御用）
      (window as any).__onboardingCurrentStep = prevStep;
      window.dispatchEvent(new CustomEvent('onboardingStepChanged'));
    }
  };

  const handleSkip = () => {
    handleComplete();
  };

  const handleComplete = () => {
    localStorage.setItem('primal_logic_onboarding_completed', 'true');
    onComplete();
  };

  const step = onboardingSteps[currentStep];

  // AIボタンクリックを検知（強制イベント）
  useEffect(() => {
    if (step.isAISpotlightStep && !aiButtonClicked) {
      const handleAIClick = () => {
        setAiButtonClicked(true);
      };
      window.addEventListener('onboardingAIClicked', handleAIClick);
      return () => {
        window.removeEventListener('onboardingAIClicked', handleAIClick);
      };
    }
  }, [step.isAISpotlightStep, aiButtonClicked]);

  return (
    <div className="onboarding-screen-container">
      <div className="onboarding-screen-content">
        <div className="onboarding-screen-icon">{step.icon}</div>
        <h1 className="onboarding-screen-title">{step.title}</h1>
        <p className="onboarding-screen-description">{step.description}</p>

        {/* 言語選択ステップの場合、言語選択UIを表示 */}
        {step.isLanguageStep && (
          <div className="onboarding-language-selector">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`onboarding-language-button ${
                  selectedLanguage === lang.code ? 'active' : ''
                }`}
                onClick={() => handleLanguageSelect(lang.code)}
              >
                <div className="onboarding-language-name">{lang.nativeName}</div>
                <div className="onboarding-language-subtitle">{lang.name}</div>
                {selectedLanguage === lang.code && (
                  <span className="onboarding-language-check">✓</span>
                )}
              </button>
            ))}
          </div>
        )}

        {/* AIスポットライトステップの場合、説明とガイドを表示 */}
        {step.isAISpotlightStep && (
          <div className="onboarding-ai-spotlight-guide">
            <div className="onboarding-ai-instruction">
              <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '1rem' }}>
                👆 右下のAIボタンをタップしてください
              </p>
              <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
                実際に操作することで、AI機能の使い方を学べます。
                <br />
                ボタンをタップするまで次に進めません。
              </p>
            </div>
          </div>
        )}

        {/* 選択肢ステップの場合、選択肢UIを表示（AIボタンクリック後） */}
        {step.isChoiceStep && aiButtonClicked && (
          <div className="onboarding-choice-selector">
            <button
              className="onboarding-choice-button onboarding-choice-button-spotlight"
              onClick={handleNext}
            >
              <div className="onboarding-choice-icon">📚</div>
              <div className="onboarding-choice-title">他の機能も見る</div>
              <div className="onboarding-choice-description">残りの機能説明を確認する</div>
            </button>
            <button
              className="onboarding-choice-button onboarding-choice-button-primary onboarding-choice-button-spotlight"
              onClick={handleComplete}
            >
              <div className="onboarding-choice-icon">🚀</div>
              <div className="onboarding-choice-title">アプリを体験する</div>
              <div className="onboarding-choice-description">今すぐアプリを使い始める</div>
            </button>
          </div>
        )}

        <div className="onboarding-screen-progress">
          {onboardingSteps.map((_, index) => (
            <div
              key={index}
              className={`onboarding-screen-progress-dot ${
                index === currentStep ? 'active' : index < currentStep ? 'completed' : ''
              }`}
            />
          ))}
        </div>

        {/* 選択肢ステップでは通常のボタンを非表示 */}
        {!step.isChoiceStep && (
          <div className="onboarding-screen-buttons">
            {currentStep > 0 && (
              <button
                className="onboarding-screen-button onboarding-screen-button-back"
                onClick={handleBack}
              >
                戻る
              </button>
            )}
            <button
              className="onboarding-screen-button onboarding-screen-button-secondary"
              onClick={handleSkip}
            >
              スキップ
            </button>
            <button
              className="onboarding-screen-button onboarding-screen-button-primary"
              onClick={handleNext}
            >
              {currentStep < onboardingSteps.length - 1 ? '次へ' : (step.isNotificationStep ? '通知を有効にする' : '始める')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
