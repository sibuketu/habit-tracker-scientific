/**
 * Primal Logic - Nutrient Gauge Component (Web版)
 * 
 * 栄養素ゲージの表示（Anxiety-Free Gauges）
 * Phase 2: シンプルなバー表示、タップでArgument Cardを表示
 */

import './NutrientGauge.css';

interface NutrientGaugeProps {
  label: string;
  current: number;
  target: number;
  unit: string;
  status?: 'optimal' | 'low' | 'warning';
  nutrient?: string; // For Argument Card lookup (e.g., 'vitaminC', 'fiber', 'iron')
  onPress?: () => void;
}

export default function NutrientGauge({
  label,
  current,
  target,
  unit,
  status = 'optimal',
  nutrient,
  onPress,
}: NutrientGaugeProps) {
  const percentage = target > 0 ? Math.min((current / target) * 100, 100) : 0;
  const isSufficient = current >= target;

  const getStatusColor = () => {
    if (status === 'warning') return '#FF3B30';
    if (status === 'low') return '#FF9500';
    if (isSufficient) return '#34C759';
    return '#FF9500';
  };

  return (
    <div
      className="nutrient-gauge-container"
      onClick={onPress}
      style={{ cursor: onPress ? 'pointer' : 'default' }}
    >
      <div className="nutrient-gauge-header">
        <span className="nutrient-gauge-label">{label}</span>
        <span className="nutrient-gauge-value">
          {current.toFixed(1)} / {target.toFixed(1)} {unit}
        </span>
      </div>
      <div className="nutrient-gauge-bar-container">
        <div
          className="nutrient-gauge-bar"
          style={{
            width: `${percentage}%`,
            backgroundColor: getStatusColor(),
          }}
        />
      </div>
      {isSufficient && (
        <div className="nutrient-gauge-status">✅ Sufficient for YOUR metabolism</div>
      )}
    </div>
  );
}

