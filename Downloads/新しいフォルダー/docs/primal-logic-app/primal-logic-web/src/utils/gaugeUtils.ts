/**
 * Gauge Utils
 */

export type GaugeStatus = 'optimal' | 'warning' | 'low';

/**
 * Get color by status
 * @param status - Status type ('optimal' | 'warning' | 'low')
 * @returns Color string based on status
 */
export const getStatusColor = (status: GaugeStatus): string => {
  const colors: Record<GaugeStatus, string> = {
    optimal: '#10b981', // Green
    warning: '#f59e0b', // Orange
    low: '#ef4444', // Red
  };

  return colors[status] || '#94a3b8'; // Default Slate
};

export const getNutrientColor = (key: string): string => {
  const colors: Record<string, string> = {
    protein: '#ef4444', // Red
    fat: '#eab308', // Yellow/Gold
    carbs: '#3b82f6', // Blue
    calories: '#10b981', // Green
    omega3: '#06b6d4', // Cyan
    omega6: '#f97316', // Orange
    magnesium: '#8b5cf6', // Purple
    potassium: '#ec4899', // Pink
    sodium: '#6366f1', // Indigo
  };

  return colors[key] || '#94a3b8'; // Default Slate
};

/**
 * Get color by percentage based on nutrient type
 */
export const getColorByPercent = (
  percent: number,
  showLowIsOk: boolean = false,
  nutrientKey?: string
): string => {
  // Determine nutrient type for threshold selection
  const getNutrientType = (key?: string): 'excessSensitive' | 'excessOk' | 'electrolyte' | 'standard' => {
    if (!key) return 'standard';

    if (['vitaminA', 'vitaminD'].includes(key)) return 'excessSensitive';
    if (['protein', 'fat', 'calories'].includes(key)) return 'excessOk';
    if (['sodium', 'potassium', 'magnesium'].includes(key)) return 'electrolyte';

    return 'standard';
  };

  const type = getNutrientType(nutrientKey);

  const thresholds = {
    excessSensitive: { low: 70, warning: 100, optimal: 100 },
    excessOk: { low: 70, warning: 100, optimal: 200 },
    electrolyte: { low: 50, warning: 80, optimal: 150 },
    standard: { low: 70, warning: 100, optimal: 120 },
  };

  const threshold = thresholds[type];

  if (percent < threshold.low) return '#ef4444'; // Red
  if (percent < threshold.warning) return '#f59e0b'; // Orange
  if (percent <= threshold.optimal) return '#10b981'; // Green

  // Excess handling
  if (type === 'excessSensitive') return '#dc2626';
  if (type === 'excessOk') return '#10b981';
  return '#f59e0b';
};
