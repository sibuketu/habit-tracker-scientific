/**
 * Glycine:Methionine Ratio Gauge
 *
 * 繧ｰ繝ｪ繧ｷ繝ｳ:繝｡繝√が繝九Φ豈皮紫繧定｡ｨ遉ｺ
 * 繧ｫ繝ｼ繝九・繧｢驥崎ｦ・ｼ夐聞蟇ｿ縺ｮ隕也せ・・ose to Tail逅・ｫ厄ｼ・ */

import './NutrientGauge.css';
import { getStatusColor } from '../utils/gaugeUtils';

interface GlycineMethionineRatioGaugeProps {
  glycine: number; // g
  methionine: number; // g
  previewGlycine?: number; // g・医・繝ｬ繝薙Η繝ｼ・・  previewMethionine?: number; // g・医・繝ｬ繝薙Η繝ｼ・・  onPress?: () => void;
}

export default function GlycineMethionineRatioGauge({
  glycine,
  methionine,
  previewGlycine = 0,
  previewMethionine = 0,
  onPress,
}: GlycineMethionineRatioGaugeProps) {
  const totalGlycine = glycine + previewGlycine;
  const totalMethionine = methionine + previewMethionine;

  // 豈皮紫險育ｮ暦ｼ・ly:Met = ?:1・・  const ratio =
    totalMethionine > 0 ? totalGlycine / totalMethionine : totalGlycine > 0 ? Infinity : 0;

  // 謗ｨ螂ｨ豈皮紫: 1:1莉･荳奇ｼ・r. Paul Saladino・・  const optimalRatioMin = 1.0;

  // 繧ｹ繝・・繧ｿ繧ｹ蛻､螳・  const getStatus = (): 'optimal' | 'warning' | 'low' => {
    if (totalGlycine === 0 && totalMethionine === 0) return 'low';
    if (ratio >= optimalRatioMin) return 'optimal';
    return 'warning'; // 繝｡繝√が繝九Φ驕主､夲ｼ育ｎ逞・ｄ閠∝喧縺ｮ繝ｪ繧ｹ繧ｯ・・  };

  const status = getStatus();

  // 繝懊・繝ｳ繝悶Ο繧ｹ謠先｡医Γ繝・そ繝ｼ繧ｸ
  const getBoneBrothMessage = () => {
    if (status === 'warning' && totalMethionine > 0) {
      const neededGlycine = totalMethionine - totalGlycine;
      if (neededGlycine > 0) {
        return `繝懊・繝ｳ繝悶Ο繧ｹ繧定ｿｽ蜉縺励※繧ｰ繝ｪ繧ｷ繝ｳ繧・{neededGlycine.toFixed(1)}g鞫ょ叙縺吶ｋ縺薙→繧呈耳螂ｨ縺励∪縺呻ｼ医さ繝ｩ繝ｼ繧ｲ繝ｳ縲∫坩縲・ｪｨ縲∬ｻ滄ｪｨ逕ｱ譚･・峨Ａ;
      }
    }
    return null;
  };

  const boneBrothMessage = getBoneBrothMessage();

  return (
    <div
      className="nutrient-gauge-container"
      onClick={onPress}
      style={{ cursor: onPress ? 'pointer' : 'default' }}
    >
      <div className="nutrient-gauge-header">
        <span className="nutrient-gauge-label">繧ｰ繝ｪ繧ｷ繝ｳ:繝｡繝√が繝九Φ豈・/span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="nutrient-gauge-value">
            {totalGlycine > 0 && totalMethionine > 0 ? (
              <>
                {ratio.toFixed(2)}:1 (Gly:Met)
                {(previewGlycine > 0 || previewMethionine > 0) && (
                  <span style={{ color: '#3b82f6', marginLeft: '8px', fontSize: '0.9em' }}>
                    ({glycine.toFixed(1)}g / {methionine.toFixed(1)}g)
                  </span>
                )}
              </>
            ) : (
              <>
                {totalGlycine.toFixed(1)}g / {totalMethionine.toFixed(1)}g
                {(previewGlycine > 0 || previewMethionine > 0) && (
                  <span style={{ color: '#3b82f6', marginLeft: '8px', fontSize: '0.9em' }}>
                    (+{previewGlycine.toFixed(1)}g / +{previewMethionine.toFixed(1)}g)
                  </span>
                )}
              </>
            )}
          </span>
          {status === 'warning' && (
            <span
              style={{
                fontSize: '12px',
                cursor: 'pointer',
                color: '#FF3B30',
              }}
              title="繝｡繝√が繝九Φ驕主､壹・轤守裸繧・∝喧縺ｫ縺､縺ｪ縺後ｋ蜿ｯ閭ｽ諤ｧ縺後≠繧翫∪縺吶ゅさ繝ｩ繝ｼ繧ｲ繝ｳ・医げ繝ｪ繧ｷ繝ｳ・峨ｒ霑ｽ蜉縺吶ｋ縺薙→繧呈耳螂ｨ縺励∪縺吶・
            >
              笞・・            </span>
          )}
        </div>
      </div>
      <div className="nutrient-gauge-bar-container" style={{ position: 'relative' }}>
        <div
          className="nutrient-gauge-bar"
          style={{
            width: `${Math.min((ratio / optimalRatioMin) * 100, 100)}%`,
            backgroundColor: getStatusColor(status),
            position: 'relative',
            zIndex: 2,
          }}
        />
      </div>
      {status === 'optimal' && ratio > 0 && (
        <div className="nutrient-gauge-status" style={{ color: '#34C759' }}>
          笨・謗ｨ螂ｨ豈皮紫遽・峇蜀・ｼ・:1莉･荳奇ｼ・        </div>
      )}
      {status === 'warning' && (
        <div className="nutrient-gauge-status" style={{ color: '#FF3B30' }}>
          笞・・繝｡繝√が繝九Φ驕主､夲ｼ医さ繝ｩ繝ｼ繧ｲ繝ｳ繧定ｿｽ蜉謗ｨ螂ｨ・・        </div>
      )}
      {boneBrothMessage && (
        <div
          className="nutrient-gauge-hint"
          style={{
            marginTop: '8px',
            padding: '8px',
            backgroundColor: '#FFF3CD',
            borderRadius: '4px',
            fontSize: '0.9em',
            color: '#856404',
          }}
        >
          庁 {boneBrothMessage}
        </div>
      )}
    </div>
  );
}

