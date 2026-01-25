/**
 * Omega 3/6 Ratio Gauge
 *
 * Display Omega-3/6 ratio in seesaw format
 * Carnivore important: Most critical indicator for inflammation management
 */

import './NutrientGauge.css';
import { getStatusColor } from '../utils/gaugeUtils';

interface OmegaRatioGaugeProps {
  omega3: number; // g
  omega6: number; // g
  previewOmega3?: number; // g (preview)
  previewOmega6?: number; // g (preview)
  onPress?: () => void;
}

export default function OmegaRatioGauge({
  omega3,
  omega6,
  previewOmega3 = 0,
  previewOmega6 = 0,
  onPress,
}: OmegaRatioGaugeProps) {
  const totalOmega3 = omega3 + previewOmega3;
  const totalOmega6 = omega6 + previewOmega6;

  // Ratio calculation (6:3 = ?:1)
  const ratio = totalOmega3 > 0 ? totalOmega6 / totalOmega3 : totalOmega6 > 0 ? Infinity : 0;

  // Recommended ratio: 1:1 to 1:4 (Carnivore recommended)
  const optimalRatioMin = 1;
  const optimalRatioMax = 4;

  // Status determination
  const getStatus = (): 'optimal' | 'warning' | 'low' => {
    if (totalOmega3 === 0 && totalOmega6 === 0) return 'low';
    if (ratio === 0) return 'optimal'; // Omega-3 only (ideal)
    if (ratio >= optimalRatioMin && ratio <= optimalRatioMax) return 'optimal';
    if (ratio > optimalRatioMax) return 'warning'; // Omega-6 excess (inflammation risk)
    return 'low'; // Omega-3 excess (no problem, but for display)
  };

  const status = getStatus();

  // Percentage for seesaw display
  const total = totalOmega3 + totalOmega6;
  const omega3Percent = total > 0 ? (totalOmega3 / total) * 100 : 0;
  const omega6Percent = total > 0 ? (totalOmega6 / total) * 100 : 0;

  return (
    <div
      className="nutrient-gauge-container"
      onClick={onPress}
      style={{ cursor: onPress ? 'pointer' : 'default' }}
    >
      <div className="nutrient-gauge-header">
        <span className="nutrient-gauge-label">Omega-3/6 Ratio</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span className="nutrient-gauge-value">
            {totalOmega3 > 0 && totalOmega6 > 0 ? (
              <>
                {ratio.toFixed(2)}:1 (ﾎｩ6:ﾎｩ3)
                {(previewOmega3 > 0 || previewOmega6 > 0) && (
                  <span style={{ color: '#3b82f6', marginLeft: '8px', fontSize: '0.9em' }}>
                    ({totalOmega3.toFixed(2)}g / {totalOmega6.toFixed(2)}g)
                  </span>
                )}
              </>
            ) : (
              <>
                {totalOmega3.toFixed(2)}g / {totalOmega6.toFixed(2)}g
                {(previewOmega3 > 0 || previewOmega6 > 0) && (
                  <span style={{ color: '#3b82f6', marginLeft: '8px', fontSize: '0.9em' }}>
                    (+{previewOmega3.toFixed(2)}g / +{previewOmega6.toFixed(2)}g)
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
              title="Excess Omega-6 causes inflammation. It is recommended to increase grass-fed beef and seafood."
            >
              笞・・            </span>
          )}
        </div>
      </div>
      {/* Seesaw display */}
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '24px',
          borderRadius: '4px',
          overflow: 'hidden',
          marginTop: '8px',
        }}
      >
        {/* Omega-3 (left, green) */}
        <div
          style={{
            width: `${omega3Percent}%`,
            backgroundColor: '#34C759',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {omega3Percent > 10 && 'ﾎｩ3'}
        </div>
        {/* Omega-6 (right side, red) */}
        <div
          style={{
            width: `${omega6Percent}%`,
            backgroundColor: status === 'warning' ? '#FF3B30' : '#FF9500',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {omega6Percent > 10 && 'ﾎｩ6'}
        </div>
      </div>
      {status === 'optimal' && ratio > 0 && (
        <div className="nutrient-gauge-status" style={{ color: '#34C759' }}>
          笨・Within recommended ratio range (1:1 to 1:4)
        </div>
      )}
      {status === 'warning' && (
        <div className="nutrient-gauge-status" style={{ color: '#FF3B30' }}>
          笞・・Omega-6 excess (inflammation risk)
        </div>
      )}
    </div>
  );
}

