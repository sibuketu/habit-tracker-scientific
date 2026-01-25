/**
 * My Foods Storage Utility
 */
export interface MyFoodItem {
  id: string;
  name: string;
  displayName: string;
  type: 'animal' | 'trash' | 'ruminant' | 'dairy';
  nutrients: any;
  createdAt: string;
  updatedAt: string;
}

const MY_FOODS_KEY = 'carnivos_my_foods';

export const getMyFoods = (): MyFoodItem[] => {
  try {
    const saved = localStorage.getItem(MY_FOODS_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addMyFood = (food: MyFoodItem) => {
  const current = getMyFoods();
  const updated = [...current, food];
  localStorage.setItem(MY_FOODS_KEY, JSON.stringify(updated));
};

export const updateCustomFood = (id: string, food: MyFoodItem) => {
  const current = getMyFoods();
  const updated = current.map(f => f.id === id ? food : f);
  localStorage.setItem(MY_FOODS_KEY, JSON.stringify(updated));
};

export const addCustomFood = addMyFood; // Alias

export const getCustomFoodById = (id: string): MyFoodItem | undefined => {
  return getMyFoods().find(f => f.id === id);
};

export const removeMyFood = (id: string) => {
  const current = getMyFoods();
  const updated = current.filter(f => f.id !== id);
  localStorage.setItem(MY_FOODS_KEY, JSON.stringify(updated));
};
