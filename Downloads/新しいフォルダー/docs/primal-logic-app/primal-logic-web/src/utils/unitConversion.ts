/**
 * CarnivoreOS - Unit Conversion Utility
 *
 * Handles metric/imperial unit conversions for all nutrient displays
 * Single Source of Truth for unit conversion logic
 */

export type UnitSystem = 'metric' | 'imperial';

// Conversion constants
const GRAMS_PER_OUNCE = 28.3495;
const ML_PER_FLOZ = 29.5735;
const KG_PER_LB = 0.453592;
const CM_PER_INCH = 2.54;

export interface UnitConfig {
  metric: string;
  imperial: string;
  conversionFactor: number; // metric to imperial multiplier
  precision: number; // decimal places
}

// Unit configurations for different measurement types
export const UNIT_CONFIGS: Record<string, UnitConfig> = {
  // Mass (large)
  g: {
    metric: 'g',
    imperial: 'oz',
    conversionFactor: 1 / GRAMS_PER_OUNCE,
    precision: 1,
  },
  // Mass (small - milligrams)
  mg: {
    metric: 'mg',
    imperial: 'mg', // Keep mg for small amounts (more intuitive)
    conversionFactor: 1,
    precision: 0,
  },
  // Mass (micro - micrograms)
  μg: {
    metric: 'μg',
    imperial: 'μg', // Keep μg (mcg is also common)
    conversionFactor: 1,
    precision: 1,
  },
  mcg: {
    metric: 'μg',
    imperial: 'μg',
    conversionFactor: 1,
    precision: 1,
  },
  // Volume
  ml: {
    metric: 'ml',
    imperial: 'fl oz',
    conversionFactor: 1 / ML_PER_FLOZ,
    precision: 1,
  },
  L: {
    metric: 'L',
    imperial: 'fl oz',
    conversionFactor: 1000 / ML_PER_FLOZ,
    precision: 1,
  },
  // Weight (body)
  kg: {
    metric: 'kg',
    imperial: 'lb',
    conversionFactor: 1 / KG_PER_LB,
    precision: 1,
  },
  // Height
  cm: {
    metric: 'cm',
    imperial: 'in',
    conversionFactor: 1 / CM_PER_INCH,
    precision: 1,
  },
  // International Units (no conversion)
  IU: {
    metric: 'IU',
    imperial: 'IU',
    conversionFactor: 1,
    precision: 0,
  },
  // Ratios (no unit)
  '': {
    metric: '',
    imperial: '',
    conversionFactor: 1,
    precision: 2,
  },
};

/**
 * Convert a value from metric to the specified unit system
 */
export function convertValue(
  value: number,
  metricUnit: string,
  unitSystem: UnitSystem
): { value: number; unit: string } {
  const config = UNIT_CONFIGS[metricUnit] || UNIT_CONFIGS[''];

  if (unitSystem === 'metric' || !config) {
    return { value, unit: metricUnit };
  }

  const convertedValue = value * config.conversionFactor;
  return {
    value: Number(convertedValue.toFixed(config.precision)),
    unit: config.imperial,
  };
}

/**
 * Format a value with its unit for display
 */
export function formatValueWithUnit(
  value: number,
  metricUnit: string,
  unitSystem: UnitSystem,
  precision?: number
): string {
  const { value: convertedValue, unit } = convertValue(value, metricUnit, unitSystem);
  const config = UNIT_CONFIGS[metricUnit] || UNIT_CONFIGS[''];
  const decimalPlaces = precision ?? config.precision;

  const formattedValue = convertedValue.toFixed(decimalPlaces);
  return unit ? `${formattedValue}${unit}` : formattedValue;
}

/**
 * Get the display unit for a given metric unit and unit system
 */
export function getDisplayUnit(metricUnit: string, unitSystem: UnitSystem): string {
  const config = UNIT_CONFIGS[metricUnit];
  if (!config) return metricUnit;
  return unitSystem === 'metric' ? config.metric : config.imperial;
}

/**
 * Convert a target value from metric to the specified unit system
 * Used for displaying target values in gauges
 */
export function convertTarget(
  target: number,
  metricUnit: string,
  unitSystem: UnitSystem
): number {
  const { value } = convertValue(target, metricUnit, unitSystem);
  return value;
}

// Storage key for unit system preference
const UNIT_SYSTEM_STORAGE_KEY = 'primal_logic_unit_system';

/**
 * Get the current unit system preference from localStorage
 */
export function getUnitSystem(): UnitSystem {
  try {
    const saved = localStorage.getItem(UNIT_SYSTEM_STORAGE_KEY);
    if (saved === 'metric' || saved === 'imperial') {
      return saved;
    }
    // Default to metric
    return 'metric';
  } catch {
    return 'metric';
  }
}

/**
 * Save the unit system preference to localStorage
 */
export function saveUnitSystem(unitSystem: UnitSystem): void {
  try {
    localStorage.setItem(UNIT_SYSTEM_STORAGE_KEY, unitSystem);
    // Dispatch custom event for reactive updates
    window.dispatchEvent(new CustomEvent('unitSystemChanged', { detail: unitSystem }));
  } catch (error) {
    console.error('Failed to save unit system preference:', error);
  }
}

