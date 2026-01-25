import React from 'react';
import type { CalculatedMetrics, PreviewData } from '../../types/index';
import { getNutrientColor } from '../../utils/gaugeUtils';

interface PFRatioGaugeProps {
  metrics: CalculatedMetrics;
  previewMetrics?: PreviewData | null;
  targetPFRatio?: number;
}

export default function PFRatioGauge({ metrics, previewMetrics, targetPFRatio = 1.0 }: PFRatioGaugeProps) {
  const currentPF = metrics.pfRatio || 0;
  const protein = metrics.totalProtein || 0;
  const fat = metrics.totalFat || 0;

  return (
    <div className="pf-gauge-container">
      <h3>Protein : Fat Ratio</h3>
      <div className="gauge-display">
        <div className="gauge-value">
          {currentPF.toFixed(2)}
        </div>
        <div className="gauge-label">
          Target: {targetPFRatio.toFixed(1)}
        </div>
      </div>
      <div className="macro-breakdown">
        <span style={{ color: getNutrientColor('protein') }}>P: {protein.toFixed(1)}g</span>
        <span style={{ color: getNutrientColor('fat') }}>F: {fat.toFixed(1)}g</span>
      </div>
    </div>
  );
}
