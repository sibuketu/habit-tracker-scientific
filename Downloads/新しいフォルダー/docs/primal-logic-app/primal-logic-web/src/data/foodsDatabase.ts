/**
 * Foods Database
 * 
 * Mock database for food items.
 */
import type { FoodItem } from '../types/index';

export const FOOD_DATABASE: FoodItem[] = [
  {
    id: 'ribeye',
    name: 'Ribeye Steak',
    protein: 24,
    fat: 18,
    carbs: 0,
    calories: 270, // per 100g approx
    portion: 100,
    unit: 'g',
    tags: ['beef', 'ruminant', 'steak'],
  },
  {
    id: 'ground_beef',
    name: 'Ground Beef (80/20)',
    protein: 17,
    fat: 20,
    carbs: 0,
    calories: 254,
    portion: 100,
    unit: 'g',
    tags: ['beef', 'ruminant', 'mince'],
  },
  {
    id: 'egg',
    name: 'Egg (Large)',
    protein: 6,
    fat: 5,
    carbs: 0.6,
    calories: 72,
    portion: 1,
    unit: 'qty',
    tags: ['egg', 'poultry'],
  },
  {
    id: 'butter',
    name: 'Butter',
    protein: 0.8,
    fat: 81,
    carbs: 0.1,
    calories: 717,
    portion: 100,
    unit: 'g',
    tags: ['dairy', 'fat'],
  },
  {
    id: 'salmon',
    name: 'Salmon (Atlantic)',
    protein: 20,
    fat: 13,
    carbs: 0,
    calories: 208,
    portion: 100,
    unit: 'g',
    tags: ['fish', 'seafood'],
  },
  {
    id: 'liver_beef',
    name: 'Beef Liver',
    protein: 20,
    fat: 3.5,
    carbs: 3.9,
    calories: 135,
    portion: 100,
    unit: 'g',
    tags: ['beef', 'organ'],
  }
];

export const searchFoods = async (query: string): Promise<FoodItem[]> => {
  const q = query.toLowerCase();
  return FOOD_DATABASE.filter(f =>
    f.name.toLowerCase().includes(q) ||
    f.tags?.some(tag => tag.includes(q))
  );
};

export const getFoodById = async (id: string): Promise<FoodItem | undefined> => {
  return FOOD_DATABASE.find(f => f.id === id);
};
