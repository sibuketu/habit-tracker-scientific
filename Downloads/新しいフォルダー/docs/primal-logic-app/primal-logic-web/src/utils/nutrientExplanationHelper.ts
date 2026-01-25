/**
 * Nutrient Explanation Helper
 */

export const NUTRIENT_EXPLANATIONS: Record<string, string> = {
  protein: "Building block for muscle and enzymes. Critical for repair.",
  fat: "Primary energy source on Carnivore. Essential for hormones.",
  carbs: "Not essential. Used for explosive energy but not primary fuel.",
  omega3: "Anti-inflammatory fatty acid. Found in fish and brains.",
  omega6: "Pro-inflammatory in excess. Keep ratio with Omega-3 low.",
  magnesium: "Electrolyte. Crucial for muscle relaxation and sleep.",
  potassium: "Electrolyte. Balances sodium and fluid levels.",
  sodium: "Electrolyte. Essential for nerve function and hydration.",
};

export function getNutrientExplanation(key: string): string {
  return NUTRIENT_EXPLANATIONS[key.toLowerCase()] || "No explanation available.";
}
