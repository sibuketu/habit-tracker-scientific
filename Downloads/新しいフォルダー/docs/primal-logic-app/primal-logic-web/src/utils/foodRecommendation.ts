/**
 * Food Recommendation Utils
 * 
 * 栄養素の不足状況に基づいて推奨食品を判定するユーティリティ
 */

import type { DeepFoodItem } from '../data/deepNutritionData';
import type { CalculatedMetrics } from '../types/index';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import type { UserProfile } from '../types/index';

/**
 * 不足している栄養素を検出
 */
export interface MissingNutrient {
  key: string;
  current: number;
  target: number;
  percent: number;
  priority: 'high' | 'medium' | 'low';
}

/**
 * 不足栄養素を検出
 */
export function getMissingNutrients(
  metrics: CalculatedMetrics,
  targets: Record<string, number>
): MissingNutrient[] {
  const missing: MissingNutrient[] = [];
  const nutrients = metrics.nutrients || {};

  // 重要栄養素のリスト（優先度順）
  const importantNutrients = [
    { key: 'magnesium', priority: 'high' as const },
    { key: 'potassium', priority: 'high' as const },
    { key: 'sodium', priority: 'high' as const },
    { key: 'zinc', priority: 'medium' as const },
    { key: 'iron', priority: 'medium' as const },
    { key: 'omega3', priority: 'medium' as const },
    { key: 'vitaminA', priority: 'low' as const },
    { key: 'vitaminD', priority: 'low' as const },
    { key: 'choline', priority: 'low' as const },
  ];

  for (const { key, priority } of importantNutrients) {
    const current = nutrients[key] || 0;
    const target = targets[key] || 0;

    if (target > 0) {
      const percent = (current / target) * 100;

      // 不足判定（70%未満を不足とする）
      if (percent < 70) {
        missing.push({
          key,
          current,
          target,
          percent,
          priority,
        });
      }
    }
  }

  // 優先度順にソート（high > medium > low）
  return missing.sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });
}

/**
 * 食品が不足栄養素を多く含むかどうかを判定
 */
export function isRecommendedFood(
  food: DeepFoodItem,
  missingNutrients: MissingNutrient[],
  amount: number = 100 // 100gあたりで計算
): {
  isRecommended: boolean;
  reason: string | null;
  priority: 'high' | 'medium' | 'low' | null;
} {
  if (missingNutrients.length === 0) {
    return { isRecommended: false, reason: null, priority: null };
  }

  // 最も優先度の高い不足栄養素を取得
  const topMissing = missingNutrients[0];
  const nutrientKey = topMissing.key;

  // 食品の栄養素含有量を取得（100gあたり）
  let foodNutrientValue = 0;

  switch (nutrientKey) {
    case 'magnesium':
      foodNutrientValue = food.magnesium || 0;
      break;
    case 'potassium':
      foodNutrientValue = food.potassium || 0;
      break;
    case 'sodium':
      foodNutrientValue = food.sodium || 0;
      break;
    case 'zinc':
      foodNutrientValue = food.zinc || 0;
      break;
    case 'iron':
      foodNutrientValue = food.hemeIron || 0;
      break;
    case 'omega3':
      foodNutrientValue = (food.omega_3 || 0) * 1000; // g to mg
      break;
    case 'vitaminA':
      foodNutrientValue = (food.vitamin_a || 0) / 3.33; // IU to mcg (approx)
      break;
    case 'vitaminD':
      foodNutrientValue = (food.vitamin_d || 0) / 40; // IU to mcg (approx)
      break;
    case 'choline':
      foodNutrientValue = food.choline || 0;
      break;
    default:
      return { isRecommended: false, reason: null, priority: null };
  }

  // 指定量あたりの栄養素含有量を計算
  const nutrientPerAmount = (foodNutrientValue * amount) / 100;

  // 不足量の30%以上を補える食品を推奨とする
  const missingAmount = topMissing.target - topMissing.current;
  const threshold = missingAmount * 0.3;

  if (nutrientPerAmount >= threshold && threshold > 0) {
    const nutrientNames: Record<string, string> = {
      magnesium: 'マグネシウム',
      potassium: 'カリウム',
      sodium: 'ナトリウム',
      zinc: '亜鉛',
      iron: '鉄',
      omega3: 'オメガ3',
      vitaminA: 'ビタミンA',
      vitaminD: 'ビタミンD',
      choline: 'コリン',
    };

    return {
      isRecommended: true,
      reason: `${nutrientNames[nutrientKey]}が豊富`,
      priority: topMissing.priority,
    };
  }

  return { isRecommended: false, reason: null, priority: null };
}

/**
 * 食品リストを推奨度でソート
 */
export function sortFoodsByRecommendation(
  foods: DeepFoodItem[],
  missingNutrients: MissingNutrient[]
): DeepFoodItem[] {
  return [...foods].sort((a, b) => {
    const aRec = isRecommendedFood(a, missingNutrients);
    const bRec = isRecommendedFood(b, missingNutrients);

    // 推奨食品を優先
    if (aRec.isRecommended && !bRec.isRecommended) return -1;
    if (!aRec.isRecommended && bRec.isRecommended) return 1;

    // 両方推奨の場合、優先度でソート
    if (aRec.isRecommended && bRec.isRecommended) {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return (
        priorityOrder[(bRec.priority || 'low') as keyof typeof priorityOrder] -
        priorityOrder[(aRec.priority || 'low') as keyof typeof priorityOrder]
      );
    }

    return 0;
  });
}
