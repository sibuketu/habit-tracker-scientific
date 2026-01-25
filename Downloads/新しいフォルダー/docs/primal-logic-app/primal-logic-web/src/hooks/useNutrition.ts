import { useState, useCallback } from 'react';
import type { FoodItem, CalculatedMetrics } from '../types/index';
import { calculateAllMetrics } from '../utils/nutrientCalculator';
import { useApp } from '../context/AppContext';

export interface PreviewData extends CalculatedMetrics {
  diff: {
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
  };
}

export function useNutrition() {
  const { dailyLog, userProfile } = useApp();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);

  const setPreview = useCallback((foodItem: FoodItem) => {
    if (!dailyLog || !userProfile) return;

    // Create a temporary list of fuel including the preview item
    const currentFuel = dailyLog.fuel || [];
    const previewFuel = [...currentFuel, foodItem];

    // Calculate metrics for the preview state
    const metrics = calculateAllMetrics(previewFuel, userProfile);

    // Calculate difference from current state
    const currentMetrics = dailyLog.calculatedMetrics || calculateAllMetrics(currentFuel, userProfile);

    setPreviewData({
      ...metrics,
      diff: {
        calories: metrics.totalCalories - currentMetrics.totalCalories,
        protein: metrics.totalProtein - currentMetrics.totalProtein,
        fat: metrics.totalFat - currentMetrics.totalFat,
        carbs: metrics.totalCarbs - currentMetrics.totalCarbs,
      }
    });
  }, [dailyLog, userProfile]);

  const clearPreview = useCallback(() => {
    setPreviewData(null);
  }, []);

  return {
    previewData,
    setPreview,
    clearPreview,
  };
}
