/**
 * CarnivoreOS - Settings Screen
 *
 * App configurations
 */

import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { requestNotificationPermission } from '../utils/defrostReminder';
import { useTranslation } from '../utils/i18n';
import './SettingsScreen.css';

interface SettingsScreenProps {
  onShowOnboarding?: () => void;
}

export default function SettingsScreen({ onShowOnboarding }: SettingsScreenProps = {}) {
  const { t } = useTranslation();
  const {
    showNutrientPreview,
    toggleNutrientPreview,
    darkMode,
    toggleDarkMode,
    tipsEnabled,
    toggleTips,
    debugMode,
    toggleDebugMode,
    nutrientDisplayMode,
    setNutrientDisplayMode,
  } = useSettings();

  const [notificationPermission, setNotificationPermission] =
    useState<NotificationPermission>('default');

  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
    }
  }, []);

  const handleNotificationToggle = async () => {
    if (!('Notification' in window)) {
      alert('This browser does not support notifications.');
      return;
    }

    if (Notification.permission !== 'granted') {
      const permission = await requestNotificationPermission();
      setNotificationPermission(permission);
    }
  };

  return (
    <div className="settings-screen-container">
      <h1>{t('settings.title') || 'Settings'}</h1>

      <div className="settings-section">
        <h2>Appearance</h2>
        <label className="settings-row">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
        </label>
      </div>

      <div className="settings-section">
        <h2>Features</h2>
        <label className="settings-row">
          <span>Show Nutrient Preview</span>
          <input
            type="checkbox"
            checked={showNutrientPreview}
            onChange={toggleNutrientPreview}
          />
        </label>
        <label className="settings-row">
          <span>Show Tips</span>
          <input
            type="checkbox"
            checked={tipsEnabled}
            onChange={toggleTips}
          />
        </label>
      </div>

      <div className="settings-section">
        <h2>Notifications</h2>
        <div className="settings-row">
          <span>Push Notifications</span>
          <button onClick={handleNotificationToggle}>
            {notificationPermission === 'granted' ? 'Enabled ✅' : 'Enable 🔔'}
          </button>
        </div>
      </div>

      <div className="settings-section">
        <h2>Advanced</h2>
        <label className="settings-row">
          <span>Debug Mode</span>
          <input
            type="checkbox"
            checked={debugMode}
            onChange={toggleDebugMode}
          />
        </label>
        {onShowOnboarding && (
          <button onClick={onShowOnboarding} className="secondary-button">
            Restart Onboarding
          </button>
        )}
      </div>
    </div>
  );
}
