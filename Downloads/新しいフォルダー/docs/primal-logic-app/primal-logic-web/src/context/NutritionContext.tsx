/**
 * Nutrition Context - 栁E��素チE�Eタのグローバル状態管琁E *
 * Geminiの提案に基づき、React Context APIを使用して
 * ButcherSelectでの変更をHomeScreenに即時反映させめE */

import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { FoodItem } from '../types/index';
import type { PreviewData } from '../hooks/useNutrition';

interface NutritionContextType {
  // 選択中の食品リスト（�Eレビュー用�E�E  selectedFoods: FoodItem[];
  // 現在の栁E��素計算結果
  currentNutrients: PreviewData | null;
  // 食品を追加�E��Eレビュー用�E�E  addFood: (food: FoodItem) => void;
  // 食品を削除�E��Eレビュー用�E�E  removeFood: (index: number) => void;
  // プレビューチE�Eタを更新
  updatePreview: (preview: PreviewData | null) => void;
  // プレビューをクリア
  clearPreview: () => void;
}

const NutritionContext = createContext<NutritionContextType | undefined>(undefined);

export function NutritionProvider({ children }: { children: ReactNode }) {
  const [selectedFoods, setSelectedFoods] = useState<FoodItem[]>([]);
  const [currentNutrients, setCurrentNutrients] = useState<PreviewData | null>(null);

  const addFood = useCallback((food: FoodItem) => {
    setSelectedFoods((prev) => [...prev, food]);
  }, []);

  const removeFood = useCallback((index: number) => {
    setSelectedFoods((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updatePreview = useCallback((preview: PreviewData | null) => {
    setCurrentNutrients(preview);
  }, []);

  const clearPreview = useCallback(() => {
    setCurrentNutrients(null);
  }, []);

  return (
    <NutritionContext.Provider
      value={{
        selectedFoods,
        currentNutrients,
        addFood,
        removeFood,
        updatePreview,
        clearPreview,
      }}
    >
      {children}
    </NutritionContext.Provider>
  );
}

export function useNutritionContext() {
  const context = useContext(NutritionContext);
  if (!context) {
    throw new Error('useNutritionContext must be used within NutritionProvider');
  }
  return context;
}

