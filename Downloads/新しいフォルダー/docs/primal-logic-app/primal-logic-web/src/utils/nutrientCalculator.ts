/**
 * Nutrient Calculator
 */
import type { FoodItem, UserProfile, CalculatedMetrics } from '../types/index';

export function calculateAllMetrics(
  fuel: FoodItem[],
  userProfile?: UserProfile
): CalculatedMetrics {
  const result: CalculatedMetrics = {
    totalCalories: 0,
    totalProtein: 0,
    totalFat: 0,
    totalCarbs: 0,
    pfRatio: 0,
    omegaRatio: 0,
    nutrients: {
      omega3: 0,
      omega6: 0,
      calcium: 0,
      phosphorus: 0,
      magnesium: 0,
      potassium: 0,
      sodium: 0,
      zinc: 0,
      iron: 0,
      vitaminA: 0,
      vitaminD: 0,
      vitaminK2: 0,
      vitaminB12: 0,
      folate: 0,
      choline: 0,
      glycine: 0,
      methionine: 0,
    }
  };

  if (!fuel || fuel.length === 0) return result;

  fuel.forEach(item => {
    // Simple macro summing
    // const factor = (item.weight || item.portion || 100) / 100; 

    result.totalProtein += (item.protein || 0);
    result.totalFat += (item.fat || 0);
    result.totalCarbs += (item.carbs || 0);
    result.totalCalories += (item.calories || 0);

    // Add micronutrients if they exist
    // ...
  });

  // Calculate Ratios
  if (result.totalFat > 0 && result.totalProtein > 0) {
    result.pfRatio = result.totalProtein / result.totalFat;
  }

  return result;
}
