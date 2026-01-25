/**
 * CarnivoreOS - User Profile Screen (Web)
 *
 * User settings: Profile edits, Language, Data Management
 */

import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { exportAllData, importAllData } from '../utils/storage';
import { useSettings } from '../hooks/useSettings';
import { useUserConfig } from '../hooks/useUserConfig';
import { setLanguage, getLanguage, useTranslation, type Language } from '../utils/i18n';
import { isSupabaseAvailable } from '../lib/supabaseClient';
import CustomFoodScreen from './CustomFoodScreen';
import './ProfileScreen.css';

export default function ProfileScreen() {
  const { t } = useTranslation();
  const { userProfile, loadUserProfile } = useApp();
  const { debugMode, toggleDebugMode } = useSettings();
  const { config, updateConfig } = useUserConfig();
  const [languageState, setLanguageState] = useState<Language>(
    (userProfile?.language as Language) || getLanguage()
  );
  const [showCustomFoodScreen, setShowCustomFoodScreen] = useState(false);

  // Handle language change
  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLanguageState(lang);
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: lang }));
    window.location.reload(); // Reload to apply changes globally
  };

  useEffect(() => {
    if (userProfile) {
      const savedLanguage = (userProfile.language as Language) || getLanguage();
      const currentLanguage = getLanguage();
      if (savedLanguage !== currentLanguage) {
        setLanguage(savedLanguage);
      }
      setLanguageState(savedLanguage);
    }
  }, [userProfile]);

  return (
    <div className="profile-screen-container">
      <div className="profile-screen-content">
        <h1 className="profile-screen-title">{t('settings.title') || 'Setting'}</h1>

        {/* Language Settings */}
        <div className="profile-screen-section">
          <h2>{t('language.title')}</h2>
          <div className="language-buttons">
            <button
              className={languageState === 'ja' ? 'selected' : ''}
              onClick={() => handleLanguageChange('ja')}
            >
              {t('common.japanese') || '日本語'}
            </button>
            <button
              className={languageState === 'en' ? 'selected' : ''}
              onClick={() => handleLanguageChange('en')}
            >
              {t('common.english') || 'English'}
            </button>
          </div>
        </div>

        {/* Data Management */}
        <div className="profile-screen-section">
          <h2>{t('settings.dataManagement')}</h2>
          <div className="data-buttons">
            <button onClick={exportAllData}>
              📤 {t('settings.exportData')}
            </button>
            <label className="import-button">
              📥 {t('settings.importData')}
              <input
                type="file"
                accept=".json"
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    importAllData(file).then(() => {
                      alert('Data imported successfully!');
                      window.location.reload();
                    });
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Custom Foods */}
        <div className="profile-screen-section">
          <h2>{t('settings.customFoods')}</h2>
          <button onClick={() => setShowCustomFoodScreen(true)}>
            {t('settings.manageCustomFoods')}
          </button>
        </div>

        {/* Debug Mode */}
        <div className="profile-screen-section">
          <h2>{t('settings.developerOptions')}</h2>
          <label className="toggle-label">
            <span>{t('settings.debugMode')}</span>
            <input
              type="checkbox"
              checked={debugMode}
              onChange={toggleDebugMode}
            />
          </label>
        </div>

      </div>

      {showCustomFoodScreen && (
        <div className="modal-overlay">
          <div className="modal-content full-screen">
            <CustomFoodScreen onClose={() => setShowCustomFoodScreen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
