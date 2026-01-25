/**
 * Nutrient Impact Factors & Sorting
 */

export type SortOrder = 'priority' | 'alphabetical' | 'amount';

export const IMPACT_FACTORS = {
  stress: {
    magnesium: 1.5, // Increased need
    vitaminC: 1.2,
  },
  exercise: {
    protein: 1.2,
    sodium: 1.5,
    water: 1.5,
  },
  pregnancy: {
    folate: 2.0,
    iron: 1.5,
    calcium: 1.2,
  },
  alcohol: {
    b_vitamins: 1.5,
    magnesium: 1.2,
    liver_support: 1.5,
  }
};

export function getImpactMultiplier(factor: keyof typeof IMPACT_FACTORS, nutrient: string): number {
  const factors = IMPACT_FACTORS[factor] as Record<string, number>;
  return factors?.[nutrient] || 1.0;
}

// Calculate factors based on user profile (placeholders for now)
export function calculateNutrientImpactFactors(userProfile: any) {
  // Simplification for recovery: return base factors or logic based on profile
  return {
    protein: 1.0,
    fat: 1.0,
    // Add logic here if needed
  };
}

export function getCategoryName(key: string): string {
  if (['protein', 'fat', 'carbs', 'calories'].includes(key)) return 'Macros';
  if (['sodium', 'potassium', 'magnesium', 'calcium'].includes(key)) return 'Electrolytes';
  if (['vitaminA', 'vitaminD', 'vitaminK2', 'vitaminB12'].includes(key)) return 'Vitamins';
  return 'Other';
}

export function applySortOrder(nutrients: any[], mode: 'simple' | 'detailed' | 'custom'): any[] {
  if (!nutrients) return [];

  return [...nutrients].sort((a, b) => {
    // Basic sort by importance (mock logic)
    const priority = ['protein', 'fat', 'magnesium', 'potassium', 'sodium'];
    const indexA = priority.indexOf(a.key);
    const indexB = priority.indexOf(b.key);

    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return 0;
  });
}
