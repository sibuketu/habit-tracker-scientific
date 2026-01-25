
import React from 'react';
import './MiniNutrientGauge.css';

interface MiniNutrientGaugeProps {
  label: string;
  currentDailyTotal: number;
  previewAmount?: number;
  target: number;
  unit: string;
  color: string;
  nutrientKey: string;
}

const MiniNutrientGauge: React.FC<MiniNutrientGaugeProps> = ({
  label,
  currentDailyTotal,
  previewAmount = 0,
  target,
  unit,
  color,
  nutrientKey
}) => {
  // Prevent division by zero
  const safeTarget = target > 0 ? target : 1;

  const currentPercent = Math.min((currentDailyTotal / safeTarget) * 100, 100);
  const previewPercent = Math.min(((currentDailyTotal + previewAmount) / safeTarget) * 100, 100);

  // Calculate width for the preview segment (which sits on top or extends current)
  // Logic: Preview bar shows the *total* potential, current shows actual.
  // We can render current on top of preview, or use a separate segment.

  return (
    <div className="mini-nutrient-gauge">
      <div className="gauge-header">
        <span className="gauge-label">{label}</span>
        <span className="gauge-value">
          <span style={{ fontWeight: 600 }}>{currentDailyTotal.toFixed(1)}</span>
          {previewAmount > 0 && (
            <span style={{ color: color, opacity: 0.8 }}> + {previewAmount.toFixed(1)}</span>
          )}
          <span className="gauge-unit"> / {target.toFixed(0)} {unit}</span>
        </span>
      </div>

      <div className="gauge-track" style={{
        height: '8px',
        backgroundColor: '#e5e7eb',
        borderRadius: '4px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        {/* Preview Bar (background for the increase) */}
        {previewAmount > 0 && (
          <div
            className="gauge-fill-preview"
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: '100%',
              width: `${previewPercent}%`,
              backgroundColor: color,
              opacity: 0.3,
              transition: 'width 0.3s ease'
            }}
          />
        )}

        {/* Current Bar */}
        <div
          className="gauge-fill-current"
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            height: '100%',
            width: `${currentPercent}%`,
            backgroundColor: color,
            transition: 'width 0.3s ease'
          }}
        />
      </div>
    </div>
  );
};

export default MiniNutrientGauge;
