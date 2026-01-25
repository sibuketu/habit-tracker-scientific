/**
 * CarnivoreOS - Salt Settings Screen
 *
 * 蝪ｩ繝溘Ν險ｭ螳夂判髱｢
 */

import { useState, useEffect } from 'react';
import { useUserConfig } from '../hooks/useUserConfig';
import HelpTooltip from '../components/common/HelpTooltip';
import { useTranslation } from '../utils/i18n';
import './SaltSettingsScreen.css';

interface SaltSettingsScreenProps {
  onBack: () => void;
}

export default function SaltSettingsScreen({ onBack }: SaltSettingsScreenProps) {
  const { t } = useTranslation();
  const { config, updateConfig } = useUserConfig();
  const [saltType, setSaltType] = useState<
    'table_salt' | 'sea_salt' | 'himalayan_salt' | 'celtic_salt'
  >(config.saltType || 'table_salt');
  const [saltUnitWeight, setSaltUnitWeight] = useState<number>(config.saltUnitWeight || 0.5);

  useEffect(() => {
    setSaltType(config.saltType || 'table_salt');
    setSaltUnitWeight(config.saltUnitWeight || 0.5);
  }, [config]);

  const handleSaltTypeChange = (
    type: 'table_salt' | 'sea_salt' | 'himalayan_salt' | 'celtic_salt'
  ) => {
    setSaltType(type);
    updateConfig({ saltType: type });
  };

  const handleUnitWeightChange = (value: number) => {
    const newValue = Math.max(0.1, Math.min(10, value));
    setSaltUnitWeight(newValue);
    updateConfig({ saltUnitWeight: newValue });
  };

  const saltTypes = [
    {
      code: 'table_salt' as const,
      name: '鬟溷酷蝪ｩ',
      description: '荳闊ｬ逧・↑邊ｾ陬ｽ蝪ｩ縲ゅリ繝医Μ繧ｦ繝蜷ｫ譛蛾㍼縺碁ｫ倥＞縲・,
    },
    {
      code: 'sea_salt' as const,
      name: '豬ｷ蝪ｩ',
      description: '豬ｷ豌ｴ縺九ｉ菴懊ｉ繧後◆蝪ｩ縲ゅΑ繝阪Λ繝ｫ縺瑚ｱ雁ｯ後・,
    },
    {
      code: 'himalayan_salt' as const,
      name: '繝偵・繝ｩ繝､蝪ｩ',
      description: '繝偵・繝ｩ繝､螻ｱ閼医・蟯ｩ蝪ｩ縲・4遞ｮ鬘槭・繝溘ロ繝ｩ繝ｫ繧貞性繧縲・,
    },
    {
      code: 'celtic_salt' as const,
      name: '繧ｱ繝ｫ繝亥｡ｩ',
      description: '繝輔Λ繝ｳ繧ｹ縺ｮ繧ｱ繝ｫ繝亥慍譁ｹ縺ｮ豬ｷ蝪ｩ縲ゅ・繧ｰ繝阪す繧ｦ繝縺瑚ｱ雁ｯ後・,
    },
  ];

  return (
    <div className="salt-settings-screen-container">
      <div className="salt-settings-screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={onBack} aria-label={t('common.backAriaLabel')}>
            竊・          </button>
          <h1 className="screen-header-title">蝪ｩ繝溘Ν險ｭ螳・/h1>
        </div>

        <div className="salt-settings-screen-section">
          <h2 className="salt-settings-screen-section-title">
            蝪ｩ縺ｮ遞ｮ鬘・            <HelpTooltip text="蝪ｩ縺ｮ遞ｮ鬘槭↓繧医▲縺ｦ繝翫ヨ繝ｪ繧ｦ繝蜷ｫ譛蛾㍼縺檎焚縺ｪ繧翫∪縺吶よｭ｣遒ｺ縺ｪ譬・､顔ｴ險育ｮ励・縺溘ａ縲∽ｽｿ逕ｨ縺励※縺・ｋ蝪ｩ縺ｮ遞ｮ鬘槭ｒ驕ｸ謚槭＠縺ｦ縺上□縺輔＞縲・ />
          </h2>
          <div className="salt-settings-screen-button-group">
            {saltTypes.map((type) => (
              <button
                key={type.code}
                className={`salt-settings-screen-button ${saltType === type.code ? 'active' : ''}`}
                onClick={() => handleSaltTypeChange(type.code)}
                aria-label={`${type.name}繧帝∈謚杼}
                aria-current={saltType === type.code ? 'true' : 'false'}
              >
                <div className="salt-settings-screen-button-name">{type.name}</div>
                <div className="salt-settings-screen-button-description">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="salt-settings-screen-section">
          <h2 className="salt-settings-screen-section-title">
            1蜑翫ｊ縺ゅ◆繧翫・驥・(g)
            <HelpTooltip text="蝪ｩ繝溘Ν繧・蝗槫屓縺励◆縺ｨ縺阪・蝪ｩ縺ｮ驥埼㍼・・・峨ｒ險ｭ螳壹＠縺ｾ縺吶ゅョ繝輔か繝ｫ繝医・0.5g縺ｧ縺吶・ />
          </h2>
          <div className="salt-settings-screen-input-group">
            <input
              type="number"
              min="0.1"
              max="10"
              step="0.1"
              value={saltUnitWeight}
              onChange={(e) => handleUnitWeightChange(parseFloat(e.target.value) || 0.5)}
              className="salt-settings-screen-input"
              aria-label="1蜑翫ｊ縺ゅ◆繧翫・蝪ｩ縺ｮ驥埼㍼"
            />
            <span className="salt-settings-screen-input-unit">g</span>
          </div>
          <p className="salt-settings-screen-hint">繝・ヵ繧ｩ繝ｫ繝・ 0.5g/蜑翫ｊ</p>
          <button
            className="salt-settings-screen-reset-button"
            onClick={() => handleUnitWeightChange(0.5)}
          >
            繝・ヵ繧ｩ繝ｫ繝医↓謌ｻ縺・          </button>
        </div>
      </div>
    </div>
  );
}

