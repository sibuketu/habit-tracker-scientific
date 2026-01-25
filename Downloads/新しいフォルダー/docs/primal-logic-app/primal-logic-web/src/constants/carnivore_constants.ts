/**
 * Carnivore Constants
 */

export const CARNIVORE_CONSTANTS = {
  DEFAULT_PROTEIN_TARGET: 120, // g
  DEFAULT_FAT_TARGET: 120, // g
  MIN_CALORIES: 1500,

  ADAPTATION_PHASES: {
    WITHDRAWAL: 'Withdrawal',
    KETO_FLU: 'Keto Flu',
    ADAPTATION: 'Fat Adaptation',
    OPTIMIZED: 'Optimized',
  },

  ALLOWED_FOOD_TYPES: [
    'beef',
    'lamb',
    'pork',
    'poultry',
    'fish',
    'seafood',
    'eggs',
    'dairy', // if tolerant
    'organ_meats'
  ]
};

export const VIOLATION_TYPES = {
  ALCOHOL: 'alcohol',
  SUGAR: 'sugar',
  SEED_OILS: 'seed_oils',
  VEGETABLES: 'vegetables',
  CHEAT_MEAL: 'cheat_meal',
  FASTING_FAILURE: 'fasting_failure'
};
