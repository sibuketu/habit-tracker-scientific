/**
 * Storage Nutrient Gauge - Storage Nutrient Gauge
 *
 * Displays nutrients that can be stored in the body, such as fat-soluble vitamins (A, D, K2, E)
 * and some minerals (calcium, phosphorus).
 * Unlike other nutrients that reset daily, stored nutrients decrease from accumulated levels.
 */

import { getStatusColor } from '../utils/gaugeUtils';

interface StorageNutrientGaugeProps {
  label: string;
  currentStorage: number; // Current storage amount (%)
  dailyIntake: number; // Today's intake
  dailyRequirement: number; // Daily requirement
  unit: string;
  color?: string;
  onPress?: () => void;
}

export default function StorageNutrientGauge({
  label,
  currentStorage,
  dailyIntake,
  dailyRequirement,
  unit,
  color = '#a855f7',
  onPress,
}: StorageNutrientGaugeProps) {
  // Calculate storage: previous day's storage - daily consumption + today's intake
  // Simplified version: current storage + today's intake (as percentage of daily requirement)
  const dailyIntakePercent = dailyRequirement > 0 ? (dailyIntake / dailyRequirement) * 100 : 0;
  const newStorage = Math.min(100, Math.max(0, currentStorage - 100 + dailyIntakePercent)); // 100% consumed per day, add intake portion

  // Determine storage status
  const getStorageStatus = (): 'optimal' | 'warning' | 'low' => {
    if (currentStorage >= 80) return 'optimal';
    if (currentStorage >= 50) return 'warning';
    return 'low';
  };

  const status = getStorageStatus();
  const statusColor = getStatusColor(status);

  return (
    <div
      onClick={onPress}
      style={{
        padding: 0,
        backgroundColor: 'transparent',
        borderRadius: '4px',
        border: 'none',
        cursor: onPress ? 'pointer' : 'default',
        marginBottom: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 0,
        }}
      >
        <span style={{ fontSize: '12px', color: '#6b7280', fontWeight: 500 }}>{label}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
            {currentStorage.toFixed(0)}%
          </span>
          {dailyIntake > 0 && (
            <span style={{ fontSize: '11px', color: '#3b82f6' }}>
              (+{dailyIntake.toFixed(1)}
              {unit})
            </span>
          )}
        </div>
      </div>

      {/* Battery display (solid color, line display) */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '10px',
          backgroundColor: '#e5e7eb',
          borderRadius: '9999px',
          overflow: 'hidden',
        }}
      >
        {/* Current storage amount (solid color) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            width: `${currentStorage}%`,
            height: '100%',
            backgroundColor: statusColor,
            borderRadius: '9999px',
            transition: 'width 0.3s ease',
          }}
        />
        {/* Today's intake (additional portion) */}
        {dailyIntake > 0 && (
          <div
            style={{
              position: 'absolute',
              left: `${currentStorage}%`,
              width: `${Math.min(100 - currentStorage, dailyIntakePercent)}%`,
              height: '100%',
              backgroundColor: '#3b82f6',
              borderRadius: '9999px',
              opacity: 0.7,
            }}
          />
        )}
      </div>

      {/* Description text */}
      <div style={{ fontSize: '10px', color: '#9ca3af', marginTop: 0 }}>
        {status === 'optimal' && 'âœESufficient storage'}
        {status === 'warning' && 'âš EEModerate storage'}
        {status === 'low' && 'ğŸ”´ Insufficient storage'}
      </div>
    </div>
  );
}

