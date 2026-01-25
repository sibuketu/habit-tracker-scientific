/**
 * CarnivoreOS - Carbohydrate Target Settings Screen
 *
 * 轤ｭ豌ｴ蛹也黄繧ｿ繝ｼ繧ｲ繝・ヨ險ｭ螳夂判髱｢
 */

import { useState, useEffect } from 'react';
import { useUserConfig } from '../hooks/useUserConfig';
import HelpTooltip from '../components/common/HelpTooltip';
import { useTranslation } from '../utils/i18n';
import './CarbTargetSettingsScreen.css';

interface CarbTargetSettingsScreenProps {
  onBack: () => void;
}

export default function CarbTargetSettingsScreen({ onBack }: CarbTargetSettingsScreenProps) {
  const { t } = useTranslation();
  const { config, updateConfig } = useUserConfig();
  const [targetCarbs, setTargetCarbs] = useState<number>(config.targetCarbs || 0);

  useEffect(() => {
    setTargetCarbs(config.targetCarbs || 0);
  }, [config]);

  const handleTargetCarbsChange = (value: number) => {
    const newValue = Math.max(0, Math.min(100, value));
    setTargetCarbs(newValue);
    updateConfig({ targetCarbs: newValue });
  };

  const presetValues = [0, 20, 50, 100];

  return (
    <div className="carb-target-settings-screen-container">
      <div className="carb-target-settings-screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={onBack} aria-label={t('common.backAriaLabel')}>
            竊・          </button>
          <h1 className="screen-header-title">轤ｭ豌ｴ蛹也黄繧ｿ繝ｼ繧ｲ繝・ヨ險ｭ螳・/h1>
        </div>

        <div className="carb-target-settings-screen-section">
          <h2 className="carb-target-settings-screen-section-title">
            1譌･縺ｮ轤ｭ豌ｴ蛹也黄逶ｮ讓吝､ (g)
            <HelpTooltip text="繧ｫ繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｧ縺ｯ騾壼ｸｸ0g繧堤岼讓吶→縺励∪縺吶′縲√こ繝医・繧｢繧・ｧｻ陦梧悄髢謎ｸｭ縺ｯ20-50g遞句ｺｦ繧定ｨｱ蜿ｯ縺吶ｋ縺薙→繧ゅ≠繧翫∪縺吶ょ宍譬ｼ縺ｪ繧ｫ繝ｼ繝九・繧｢縺ｮ蝣ｴ蜷医・0g縺ｫ險ｭ螳壹＠縺ｦ縺上□縺輔＞縲・ />
          </h2>
          <p className="carb-target-settings-screen-description">
            繧ｫ繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｧ縺ｯ騾壼ｸｸ0g繧堤岼讓吶→縺励∪縺吶ゅこ繝医・繧｢繧・ｧｻ陦梧悄髢謎ｸｭ縺ｯ20-50g遞句ｺｦ繧定ｨｱ蜿ｯ縺吶ｋ縺薙→繧ゅ≠繧翫∪縺吶・          </p>

          <div className="carb-target-settings-screen-input-group">
            <input
              type="number"
              min="0"
              max="100"
              step="1"
              value={targetCarbs}
              onChange={(e) => handleTargetCarbsChange(parseFloat(e.target.value) || 0)}
              className="carb-target-settings-screen-input"
              aria-label="1譌･縺ｮ轤ｭ豌ｴ蛹也黄逶ｮ讓吝､"
            />
            <span className="carb-target-settings-screen-input-unit">g</span>
          </div>

          <div className="carb-target-settings-screen-presets">
            <p className="carb-target-settings-screen-presets-label">繝励Μ繧ｻ繝・ヨ:</p>
            <div className="carb-target-settings-screen-preset-buttons">
              {presetValues.map((value) => (
                <button
                  key={value}
                  className={`carb-target-settings-screen-preset-button ${
                    targetCarbs === value ? 'active' : ''
                  }`}
                  onClick={() => handleTargetCarbsChange(value)}
                  aria-label={`${value}g繧帝∈謚杼}
                >
                  {value}g
                </button>
              ))}
            </div>
          </div>

          <div className="carb-target-settings-screen-info">
            {targetCarbs === 0 ? (
              <div className="carb-target-settings-screen-info-item">
                <span className="carb-target-settings-screen-info-icon">･ｩ</span>
                <span>蜴ｳ譬ｼ縺ｪ繧ｫ繝ｼ繝九・繧｢繝｢繝ｼ繝・ 轤ｭ豌ｴ蛹也黄縺ｯ0g繧堤岼讓吶→縺励∪縺吶・/span>
              </div>
            ) : targetCarbs <= 20 ? (
              <div className="carb-target-settings-screen-info-item">
                <span className="carb-target-settings-screen-info-icon">諺</span>
                <span>繧ｱ繝医・繧｢繝｢繝ｼ繝・ 蟆鷹㍼縺ｮ菴守く豌ｴ蛹也黄讀咲黄繧定ｨｱ蜿ｯ縺励∪縺吶・/span>
              </div>
            ) : (
              <div className="carb-target-settings-screen-info-item">
                <span className="carb-target-settings-screen-info-icon">売</span>
                <span>遘ｻ陦梧悄髢薙Δ繝ｼ繝・ 轤ｭ豌ｴ蛹也黄繧呈ｮｵ髫守噪縺ｫ貂帙ｉ縺励※縺・″縺ｾ縺吶・/span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

