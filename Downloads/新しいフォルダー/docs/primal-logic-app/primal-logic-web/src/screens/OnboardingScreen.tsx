/**
 * Primal Logic - Onboarding Screen
 * 
 * 初回起動時のチュートリアル・機能説明
 */

import { useState } from 'react';
import './OnboardingScreen.css';

interface OnboardingStep {
  title: string;
  description: string;
  icon: string;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Primal Logicへようこそ',
    description: 'カーニボアダイエットを科学的に管理するアプリです。栄養素の摂取量を追跡し、最適な健康状態を目指しましょう。',
    icon: '🥩',
  },
  {
    title: '食品を追加',
    description: 'ホーム画面から「+ 食品を追加」ボタンをタップして、食べた食品を記録します。',
    icon: '📝',
  },
  {
    title: '栄養素を確認',
    description: '4ゾーンのゲージで栄養素の摂取状況を一目で確認できます。目標値を達成すると緑色になります。',
    icon: '📊',
  },
  {
    title: '使い方がわからない時は',
    description: 'ホーム画面右下のAI Speed Dialから「💬 AIチャット」を開いて、操作方法や機能について何でも質問してください。AIが詳しく説明します。',
    icon: '🤖',
  },
  {
    title: '設定をカスタマイズ',
    description: '設定画面から、文字サイズ、表示設定、通知設定などをカスタマイズできます。',
    icon: '⚙️',
  },
];

interface OnboardingScreenProps {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
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

  return (
    <div className="onboarding-screen-container">
      <div className="onboarding-screen-content">
        <div className="onboarding-screen-icon">{step.icon}</div>
        <h1 className="onboarding-screen-title">{step.title}</h1>
        <p className="onboarding-screen-description">{step.description}</p>
        
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

        <div className="onboarding-screen-buttons">
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
            {currentStep < onboardingSteps.length - 1 ? '次へ' : '始める'}
          </button>
        </div>
      </div>
    </div>
  );
}

