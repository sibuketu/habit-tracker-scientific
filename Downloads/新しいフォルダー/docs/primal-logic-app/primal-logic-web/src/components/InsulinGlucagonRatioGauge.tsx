/**
 * Insulin/Glucagon Ratio Gauge
 *
 * Display Insulin/Glucagon ratio
 * Carnivore important: Most critical indicator for weight loss (diet)
 * Lower ratio (glucagon dominant) promotes fat burning
 */

import './NutrientGauge.css';
import { useTranslation } from '../utils/i18n';
import { getStatusColor, type GaugeStatus } from '../utils/gaugeUtils';

interface InsulinGlucagonRatioGaugeProps {
  insulinStimulus: number; // 繧､繝ｳ繧ｹ繝ｪ繝ｳ蛻ｺ豼謖・焚
  glucagonStimulus: number; // 繧ｰ繝ｫ繧ｫ繧ｴ繝ｳ蛻ｺ豼謖・焚
  ratio: number; // 繧､繝ｳ繧ｹ繝ｪ繝ｳ/繧ｰ繝ｫ繧ｫ繧ｴ繝ｳ豈・
  status: GaugeStatus;
  onPress?: () => void;
}

export default function InsulinGlucagonRatioGauge({
  insulinStimulus,
  glucagonStimulus,
  ratio,
  status,
  onPress,
}: InsulinGlucagonRatioGaugeProps) {
  const { t } = useTranslation();

  const getStatusText = () => {
    if (status === 'optimal') return t('nutrient.insulinGlucagonRatio.optimal') || '笨・閼りが辯・┥繝｢繝ｼ繝・;
    if (status === 'good') return t('nutrient.insulinGlucagonRatio.good') || '笨・閼りが辯・┥菫・ｲ';
    if (status === 'warning') return t('nutrient.insulinGlucagonRatio.warning') || '笞・・豕ｨ諢上′蠢・ｦ・;
    return t('nutrient.insulinGlucagonRatio.danger') || '閥 閼りが闢・ｩ阪Δ繝ｼ繝・;
  };

  const statusColor = getStatusColor(status);
  const statusText = getStatusText();

  // 豈皮紫縺ｮ陦ｨ遉ｺ・育┌髯仙､ｧ縺ｮ蝣ｴ蜷医・迚ｹ蛻･縺ｪ陦ｨ遉ｺ・・
  const displayRatio =
    ratio === Infinity
      ? '竏・1'
      : ratio === 0
        ? '0:1'
        : `${ratio.toFixed(2)}:1`;

  // 繝代・繧ｻ繝ｳ繝・・繧ｸ險育ｮ暦ｼ郁ｦ冶ｦ夂噪縺ｪ繧ｲ繝ｼ繧ｸ逕ｨ・・
  const total = insulinStimulus + glucagonStimulus;
  const insulinPercent = total > 0 ? (insulinStimulus / total) * 100 : 0;
  const glucagonPercent = total > 0 ? (glucagonStimulus / total) * 100 : 0;

  return (
    <div
      className="nutrient-gauge-container"
      onClick={onPress}
      style={{
        cursor: onPress ? 'pointer' : 'default',
        padding: '1.5rem',
        backgroundColor: '#fef3c7',
        borderRadius: '12px',
        border: `3px solid ${statusColor}`,
        marginBottom: '1rem',
      }}
    >
      <div className="nutrient-gauge-header">
        <span
          className="nutrient-gauge-label"
          style={{ fontSize: '18px', fontWeight: '700', color: '#92400e' }}
        >
          櫨 {t('nutrient.insulinGlucagonRatio') || '繧､繝ｳ繧ｹ繝ｪ繝ｳ/繧ｰ繝ｫ繧ｫ繧ｴ繝ｳ豈・}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '0.5rem' }}>
          <span
            className="nutrient-gauge-value"
            style={{ fontSize: '20px', fontWeight: '700', color: statusColor }}
          >
            {displayRatio} (繧､繝ｳ繧ｹ繝ｪ繝ｳ:繧ｰ繝ｫ繧ｫ繧ｴ繝ｳ)
          </span>
        </div>
      </div>

      {/* Seesaw display */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '32px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginTop: '12px',
          border: '2px solid #e5e7eb',
        }}
      >
        {/* Glucagon (left, green) - 濶ｯ縺・婿 */}
        <div
          style={{
            width: `${glucagonPercent}%`,
            backgroundColor: status === 'optimal' || status === 'good' ? '#16a34a' : '#22c55e',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {glucagonPercent > 15 && '繧ｰ繝ｫ繧ｫ繧ｴ繝ｳ'}
        </div>
        {/* Insulin (right, red/orange) - 謔ｪ縺・婿 */}
        <div
          style={{
            width: `${insulinPercent}%`,
            backgroundColor: status === 'danger' ? '#dc2626' : status === 'warning' ? '#f59e0b' : '#fbbf24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          {insulinPercent > 15 && '繧､繝ｳ繧ｹ繝ｪ繝ｳ'}
        </div>
      </div>

      {/* Status text */}
      <div
        className="nutrient-gauge-status"
        style={{
          color: statusColor,
          marginTop: '12px',
          fontSize: '14px',
          fontWeight: '600',
        }}
      >
        {statusText}
      </div>

      {/* Description */}
      <div
        style={{
          marginTop: '8px',
          fontSize: '12px',
          color: '#6b7280',
          lineHeight: '1.5',
        }}
      >
        {t('nutrient.insulinGlucagonRatio.description') ||
          '繝繧､繧ｨ繝・ヨ縺ｫ縺翫＞縺ｦ譛繧る㍾隕√↑謖・ｨ吶ゆｽ弱＞豈皮紫・医げ繝ｫ繧ｫ繧ｴ繝ｳ蜆ｪ菴搾ｼ峨′閼りが辯・┥繧剃ｿ・ｲ縺励∪縺吶・}
      </div>
    </div>
  );
}

