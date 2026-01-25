/**
 * CarnivoreOS - Language Settings Screen
 *
 * 言語設定画面
 */

import { useState, useEffect } from 'react';
import { setLanguage, getLanguage, useTranslation, type Language } from '../utils/i18n';
import { logError, getUserFriendlyErrorMessage } from '../utils/errorHandler';
import './LanguageSettingsScreen.css';

interface LanguageSettingsScreenProps {
  onBack: () => void;
}

export default function LanguageSettingsScreen({ onBack }: LanguageSettingsScreenProps) {
  const { t } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState<Language>(getLanguage());

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: 'ja', name: 'Japanese', nativeName: '日本誁E },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'zh', name: 'Chinese', nativeName: '中斁E },
  ];

  const handleLanguageChange = (lang: Language) => {
    try {
      if (import.meta.env.DEV) {
        console.log('Language change requested:', lang);
      }
      // 言語を保孁E      setLanguage(lang);
      setCurrentLanguage(lang);
      // 言語変更イベントを発火して全画面を�Eレンダリング
      const event = new CustomEvent('languageChanged', { detail: lang });
      window.dispatchEvent(event);
      // 即座に反映させるため、少し遁E��してリローチE      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      logError(error, { action: 'handleLanguageChange', language: lang });
      const errorMessage = getUserFriendlyErrorMessage(error);
      alert(`${t('common.languageChangeFailed')}: ${errorMessage}`);
    }
  };

  return (
    <div className="language-settings-screen-container">
      <div className="language-settings-screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={onBack} aria-label={t('common.back')}>
            ↁE          </button>
          <h1 className="screen-header-title">{t('language.title')}</h1>
        </div>

        <div className="language-settings-screen-section">
          <p className="language-settings-screen-description">{t('language.description')}</p>

          <div className="language-settings-screen-list">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`language-settings-screen-item ${
                  currentLanguage === lang.code ? 'active' : ''
                }`}
                onClick={() => handleLanguageChange(lang.code)}
                aria-label={`${lang.nativeName}を選択`}
                aria-current={currentLanguage === lang.code ? 'true' : 'false'}
              >
                <div className="language-settings-screen-item-content">
                  <div className="language-settings-screen-item-name">{lang.nativeName}</div>
                  <div className="language-settings-screen-item-subtitle">{lang.name}</div>
                </div>
                {currentLanguage === lang.code && (
                  <span className="language-settings-screen-item-check">✁E/span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

