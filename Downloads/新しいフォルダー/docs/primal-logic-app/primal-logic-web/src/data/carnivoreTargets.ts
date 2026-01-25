/**
 * Carnivore Targets
 * 
 * Logic for calculating nutritional targets based on user profile.
 */

export interface CarnivoreTargets {
  protein: number;
  fat: number;
  calories: number;
  pfRatio: number;
}

export const CARNIVORE_NUTRIENT_TARGETS = {
  // Macros
  protein: { min: 1.2, max: 2.5, unit: 'g/kg' }, // g per kg of lean body mass
  fat: { min: 1.0, max: 2.0, unit: 'g/kg' },

  // Micros (Daily Recommended for Carnivore context - estimates)
  magnesium: { target: 400, unit: 'mg' },
  potassium: { target: 4700, unit: 'mg' }, // High need for meat eaters
  sodium: { target: 5000, unit: 'mg' }, // Salt to taste
  iodine: { target: 150, unit: 'mcg' },
  zinc: { target: 11, unit: 'mg' },
  iron: { target: 8, unit: 'mg' },
  vitaminD: { target: 600, unit: 'IU' },
  vitaminB12: { target: 2.4, unit: 'mcg' },
  omega3: { target: 1.6, unit: 'g' },
};

export function getCarnivoreTargets(
  gender?: string,
  age?: number,
  activityLevel?: string,
  ...args: any[]
): CarnivoreTargets {
  // Base calculation
  let protein = 120;
  let fat = 120;

  if (gender === 'male') {
    protein = 160;
    fat = 160;
  }

  if (activityLevel === 'high') {
    protein *= 1.2;
    fat *= 1.2;
  } else if (activityLevel === 'sedentary') {
    protein *= 0.9;
    fat *= 0.9;
  }

  return {
    protein: Math.round(protein),
    fat: Math.round(fat),
    calories: Math.round(protein * 4 + fat * 9),
    pfRatio: protein > 0 ? protein / fat : 1,
  };
}

/**
 * Get calculation formula text for a nutrient
 * @param nutrientKey - The nutrient key (e.g., 'protein', 'fat', 'sodium')
 * @param userProfile - User profile parameters (optional)
 * @returns Formula text string or null if not available
 */
export function getCalculationFormulaText(
  nutrientKey: string,
  gender?: string,
  age?: number,
  activityLevel?: string,
  ...args: any[]
): string | null {
  const targets = getCarnivoreTargets(gender, age, activityLevel, ...args);

  switch (nutrientKey) {
    case 'protein':
      return `Base: ${gender === 'male' ? '160g' : '120g'}
${activityLevel === 'high' ? '× 1.2 (High activity)' : activityLevel === 'sedentary' ? '× 0.9 (Sedentary)' : ''}
Final: ${targets.protein}g`;

    case 'fat':
      return `Base: ${gender === 'male' ? '160g' : '120g'}
${activityLevel === 'high' ? '× 1.2 (High activity)' : activityLevel === 'sedentary' ? '× 0.9 (Sedentary)' : ''}
Final: ${targets.fat}g`;

    case 'calories':
      return `Protein: ${targets.protein}g × 4 = ${targets.protein * 4} kcal
Fat: ${targets.fat}g × 9 = ${targets.fat * 9} kcal
Total: ${targets.calories} kcal`;

    case 'sodium':
      return `Target: 5000mg (Salt to taste)
Based on: CARNIVORE_NUTRIENT_TARGETS`;

    case 'potassium':
      return `Target: 4700mg
Based on: CARNIVORE_NUTRIENT_TARGETS (High need for meat eaters)`;

    case 'magnesium':
      return `Target: 400mg
Based on: CARNIVORE_NUTRIENT_TARGETS`;

    default:
      // For other nutrients, return a generic formula based on CARNIVORE_NUTRIENT_TARGETS
      const nutrientConfig = CARNIVORE_NUTRIENT_TARGETS[nutrientKey as keyof typeof CARNIVORE_NUTRIENT_TARGETS];
      if (nutrientConfig && 'target' in nutrientConfig) {
        return `Target: ${nutrientConfig.target}${nutrientConfig.unit}
Based on: CARNIVORE_NUTRIENT_TARGETS`;
      }
      return null;
  }
}
