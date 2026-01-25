/**
 * CarnivoreOS - Transition Guide Data
 *
 * Phase 1: Transition period support - Data structure for symptoms and remedies
 */

export interface TransitionSymptom {
  id: string;
  name: string;
  description: string;
  remedies: {
    nutrient: 'sodium' | 'magnesium' | 'potassium' | 'fat' | 'water';
    adjustment: number; // Adjustment value (e.g., +2000mg)
    explanation: string; // Explanation text
  }[];
  recommendedFoods: string[]; // Recommended food list
}

export const TRANSITION_SYMPTOMS: TransitionSymptom[] = [
  {
    id: 'headache',
    name: 'Headache',
    description: 'Common symptom during transition period',
    remedies: [
      {
        nutrient: 'sodium',
        adjustment: 2000,
        explanation: 'Increasing sodium by +2000mg improves electrolyte balance',
      },
    ],
    recommendedFoods: ['Salt', 'Meat juice', 'Bone broth'],
  },
  {
    id: 'cramp',
    name: 'Muscle Cramps',
    description: 'Possible magnesium deficiency',
    remedies: [
      {
        nutrient: 'magnesium',
        adjustment: 200,
        explanation: 'Increasing magnesium by +200mg improves muscle cramps',
      },
    ],
    recommendedFoods: ['Magnesium supplement', 'Bone broth'],
  },
  {
    id: 'fatigue',
    name: 'Fatigue',
    description: 'Possible energy deficiency',
    remedies: [
      {
        nutrient: 'fat',
        adjustment: 50,
        explanation: 'Increasing fat improves energy supply',
      },
      {
        nutrient: 'sodium',
        adjustment: 1000,
        explanation: 'Increasing salt improves electrolyte balance',
      },
    ],
    recommendedFoods: ['Fatty cuts of meat (ribeye, belly)', 'Butter', 'Egg yolk'],
  },
  {
    id: 'constipation',
    name: 'Constipation',
    description: 'Possible magnesium and water deficiency',
    remedies: [
      {
        nutrient: 'magnesium',
        adjustment: 200,
        explanation: 'Increasing magnesium by +200mg improves bowel movements',
      },
      {
        nutrient: 'water',
        adjustment: 1,
        explanation: 'Increasing water by 1L improves bowel movements',
      },
    ],
    recommendedFoods: ['Magnesium supplement', 'Bone broth'],
  },
  {
    id: 'diarrhea',
    name: 'Diarrhea',
    description: 'Need to adjust fat intake',
    remedies: [
      {
        nutrient: 'fat',
        adjustment: -30,
        explanation: 'Reducing fat reduces burden on the digestive system',
      },
    ],
    recommendedFoods: ['Easily digestible meat (chicken breast, fish)', 'Eggs'],
  },
];

export interface TransitionProgress {
  daysInTransition: number; // Days in transition period (0-30)
  totalDays: number; // Total days in transition period (30)
  progress: number; // Progress rate (0-100)
  remainingDays: number; // Remaining days
}

/**
 * Calculate transition period progress
 */
export function calculateTransitionProgress(
  daysOnCarnivore?: number,
  carnivoreStartDate?: string
): TransitionProgress | null {
  let daysInTransition = 0;

  if (daysOnCarnivore !== undefined) {
    daysInTransition = daysOnCarnivore;
  } else if (carnivoreStartDate) {
    const startDate = new Date(carnivoreStartDate);
    const today = new Date();
    daysInTransition = Math.floor((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  } else {
    return null;
  }

  const totalDays = 30;
  const progress = Math.min((daysInTransition / totalDays) * 100, 100);
  const remainingDays = Math.max(totalDays - daysInTransition, 0);

  // Return only if within transition period (less than 30 days)
  if (daysInTransition >= totalDays) {
    return null;
  }

  return {
    daysInTransition,
    totalDays,
    progress,
    remainingDays,
  };
}

