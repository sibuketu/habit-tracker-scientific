/**
 * Favorites Storage
 */
import type { FoodItem } from '../types/index';

export interface FavoriteItem extends FoodItem {
  isFavorite: boolean;
}

const FAV_KEY = 'carnivos_favorites';

export const getFavorites = (): FavoriteItem[] => {
  try {
    const saved = localStorage.getItem(FAV_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
};

export const addFavorite = (item: FoodItem) => {
  const current = getFavorites();
  if (current.some(f => f.id === item.id)) return;
  const updated = [...current, { ...item, isFavorite: true }];
  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
};

export const removeFavorite = (id: string) => {
  const current = getFavorites();
  const updated = current.filter(f => f.id !== id);
  localStorage.setItem(FAV_KEY, JSON.stringify(updated));
};
