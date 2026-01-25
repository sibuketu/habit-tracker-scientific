/**
 * Food History History Utility
 */
import type { FoodItem } from '../types/index';
import { getDailyLogs } from './storage';

export async function getAllFoodHistory(): Promise<FoodItem[]> {
  try {
    const logs = await getDailyLogs();
    const allFoods: FoodItem[] = [];

    Object.values(logs).forEach(log => {
      if (log.fuel && Array.isArray(log.fuel)) {
        allFoods.push(...log.fuel);
      }
    });

    // Return unique items (simplified by name for now)
    // Real implementation might want to dedupe better or keep all for frequency analysis
    return allFoods;
  } catch (e) {
    console.error('Failed to get food history', e);
    return [];
  }
}
