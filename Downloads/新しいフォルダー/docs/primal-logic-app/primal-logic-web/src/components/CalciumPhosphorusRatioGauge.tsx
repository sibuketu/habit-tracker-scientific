import React from 'react';

interface CPRatioProps {
  calcium: number;
  phosphorus: number;
  previewCalcium?: number;
  previewPhosphorus?: number;
}

export default function CalciumPhosphorusRatioGauge({ calcium, phosphorus }: CPRatioProps) {
  const ratio = phosphorus > 0 ? calcium / phosphorus : 0;

  return (
    <div className="cp-gauge-container">
      <h3>Ca : P Ratio</h3>
      <div className="gauge-value">{ratio.toFixed(2)}</div>
      <div style={{ fontSize: '12px', color: '#9ca3af' }}>Ideal: 1:1 - 1.3:1</div>
    </div>
  );
}
