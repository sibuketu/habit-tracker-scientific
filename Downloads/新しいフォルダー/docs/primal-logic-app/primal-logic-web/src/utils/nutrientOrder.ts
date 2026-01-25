/**
 * CarnivoreOS - Nutrient Order Management
 *
 * Nutrient display order and sorting functionality
 */

import { logError } from './errorHandler';

export type NutrientKey =
  | 'vitaminC'
  | 'vitaminK'
  | 'iron'
  | 'sodium'
  | 'fiber'
  | 'zinc'
  | 'magnesium'
  | 'netCarbs'
  | 'protein'
  | 'fat'
  | 'vitaminA'
  | 'vitaminD'
  | 'vitaminK2'
  | 'choline'
  | 'potassium'
  | 'vitaminB12'
  | 'vitaminB7'
  | 'omegaRatio'
  | 'iodine'
  | 'calciumPhosphorusRatio'
  | 'glycineMethionineRatio';

export interface NutrientOrderConfig {
  key: NutrientKey;
  label: string;
  priority: number; // Lower number = higher priority
}

export const DEFAULT_NUTRIENT_ORDER: NutrientOrderConfig[] = [
  // Electrolytes (highest priority: 90% of health issues during carnivore introduction to maintenance are caused by these)
  { key: 'sodium', label: 'Sodium', priority: 1 },
  { key: 'potassium', label: 'Potassium', priority: 2 },
  { key: 'magnesium', label: 'Magnesium', priority: 3 },
  // Essential energy (fat:protein ratio to be added later)
  { key: 'fat', label: 'Fat', priority: 4 },
  { key: 'protein', label: 'Protein (Effective)', priority: 5 },
  // Carnivore quality (inflammation management)
  { key: 'omegaRatio', label: 'Omega-3/6 Ratio', priority: 6 },
  // Important minerals
  // Iodine is displayed only in ButcherSelect (removed from HomeScreen)
  { key: 'calciumPhosphorusRatio', label: 'Calcium:Phosphorus Ratio', priority: 7 },
  { key: 'glycineMethionineRatio', label: 'Glycine:Methionine Ratio', priority: 8 },
  // Special vitamins
  { key: 'vitaminA', label: 'Vitamin A', priority: 9 },
  { key: 'vitaminD', label: 'Vitamin D', priority: 10 },
  // Vitamin K2 is displayed only in ButcherSelect (removed from HomeScreen)
  { key: 'vitaminB12', label: 'Vitamin B12', priority: 11 },
  { key: 'vitaminB7', label: 'Vitamin B7 (Biotin)', priority: 12 },
  { key: 'choline', label: 'Choline', priority: 13 },
  { key: 'vitaminC', label: 'Vitamin C', priority: 14 },
  { key: 'vitaminK', label: 'Vitamin K (Effective)', priority: 15 },
  // Important minerals
  { key: 'iron', label: 'Iron (Effective)', priority: 16 },
  { key: 'zinc', label: 'Zinc (Effective)', priority: 17 },
  // Others
  { key: 'netCarbs', label: 'Net Carbs', priority: 20 },
  { key: 'fiber', label: 'Fiber', priority: 21 },
];

const STORAGE_KEY = 'primal-logic-nutrient-order';

/**
 * Get nutrient order from localStorage
 */
export function getNutrientOrder(): NutrientOrderConfig[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if new nutrients (glycineMethionineRatio, etc.) are included
      const hasNewNutrients = parsed.some(
        (item: NutrientOrderConfig) =>
          item.key === 'glycineMethionineRatio' || item.key === 'calciumPhosphorusRatio'
      );
      // Use default order if new nutrients are not included
      if (!hasNewNutrients) {
        if (import.meta.env.DEV) {
          console.log(
            '[nutrientOrder] Using default order because new nutrients are not included'
          );
        }
        return DEFAULT_NUTRIENT_ORDER;
      }
      return parsed;
    }
  } catch (error) {
    logError(error, { component: 'nutrientOrder', action: 'loadNutrientOrder' });
  }
  return DEFAULT_NUTRIENT_ORDER;
}

/**
 * Save nutrient order to localStorage
 */
export function saveNutrientOrder(order: NutrientOrderConfig[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    logError(error, { component: 'nutrientOrder', action: 'saveNutrientOrder' });
  }
}

/**
 * Move nutrient up in order
 */
export function moveNutrientUp(
  order: NutrientOrderConfig[],
  key: NutrientKey
): NutrientOrderConfig[] {
  const index = order.findIndex((item) => item.key === key);
  if (index <= 0) return order;

  const newOrder = [...order];
  [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
  return newOrder;
}

/**
 * Move nutrient down in order
 */
export function moveNutrientDown(
  order: NutrientOrderConfig[],
  key: NutrientKey
): NutrientOrderConfig[] {
  const index = order.findIndex((item) => item.key === key);
  if (index < 0 || index >= order.length - 1) return order;

  const newOrder = [...order];
  [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
  return newOrder;
}

