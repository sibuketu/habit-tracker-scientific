/**
 * ButcherSelect蟆ら畑縺ｮ譬・､顔ｴ荳ｦ縺ｳ鬆・ｮ｡逅・ *
 * Nutrients Breakdown繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ縺ｮ譬・､顔ｴ縺ｮ陦ｨ遉ｺ鬆・ｺ上→荳ｦ縺ｳ譖ｿ縺域ｩ溯・
 */

import { logError } from './errorHandler';

export type ButcherNutrientKey =
  | 'protein'
  | 'fat'
  | 'zinc'
  | 'magnesium'
  | 'iron'
  | 'potassium'
  | 'sodium'
  | 'vitaminA'
  | 'vitaminD'
  | 'vitaminK2'
  | 'vitaminB12'
  | 'vitaminB7'
  | 'choline'
  | 'iodine'
  | 'calcium'
  | 'phosphorus'
  | 'glycine'
  | 'methionine'
  | 'omegaRatio';

export interface ButcherNutrientOrderConfig {
  key: ButcherNutrientKey;
  label: string;
  priority: number;
}

export const DEFAULT_BUTCHER_NUTRIENT_ORDER: ButcherNutrientOrderConfig[] = [
  { key: 'protein', label: '繧ｿ繝ｳ繝代け雉ｪ', priority: 1 },
  { key: 'fat', label: '閼りｳｪ', priority: 2 },
  { key: 'zinc', label: '莠憺央', priority: 3 },
  { key: 'magnesium', label: '繝槭げ繝阪す繧ｦ繝', priority: 4 },
  { key: 'iron', label: '驩・・', priority: 5 },
  { key: 'potassium', label: '繧ｫ繝ｪ繧ｦ繝', priority: 6 },
  { key: 'sodium', label: '繝翫ヨ繝ｪ繧ｦ繝', priority: 7 },
  { key: 'vitaminA', label: '繝薙ち繝溘ΦA', priority: 8 },
  { key: 'vitaminD', label: '繝薙ち繝溘ΦD', priority: 9 },
  { key: 'vitaminK2', label: '繝薙ち繝溘ΦK2', priority: 10 },
  { key: 'vitaminB12', label: '繝薙ち繝溘ΦB12', priority: 11 },
  { key: 'vitaminB7', label: '繝薙ち繝溘ΦB7・医ン繧ｪ繝√Φ・・, priority: 12 },
  { key: 'choline', label: '繧ｳ繝ｪ繝ｳ', priority: 13 },
  { key: 'iodine', label: '繝ｨ繧ｦ邏', priority: 14 },
  { key: 'calcium', label: '繧ｫ繝ｫ繧ｷ繧ｦ繝', priority: 15 },
  { key: 'phosphorus', label: '繝ｪ繝ｳ', priority: 16 },
  { key: 'glycine', label: '繧ｰ繝ｪ繧ｷ繝ｳ', priority: 17 },
  { key: 'methionine', label: '繝｡繝√が繝九Φ', priority: 18 },
  { key: 'omegaRatio', label: '繧ｪ繝｡繧ｬ3/6豈皮紫', priority: 19 },
];

const STORAGE_KEY = 'primal-logic-butcher-nutrient-order';

export function getButcherNutrientOrder(): ButcherNutrientOrderConfig[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    logError(error, { component: 'butcherNutrientOrder', action: 'getButcherNutrientOrder' });
  }
  return DEFAULT_BUTCHER_NUTRIENT_ORDER;
}

export function saveButcherNutrientOrder(order: ButcherNutrientOrderConfig[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
  } catch (error) {
    logError(error, { component: 'butcherNutrientOrder', action: 'saveButcherNutrientOrder' });
  }
}

export function moveButcherNutrientUp(
  order: ButcherNutrientOrderConfig[],
  key: ButcherNutrientKey
): ButcherNutrientOrderConfig[] {
  const index = order.findIndex((item) => item.key === key);
  if (index <= 0) return order;

  const newOrder = [...order];
  [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
  return newOrder;
}

export function moveButcherNutrientDown(
  order: ButcherNutrientOrderConfig[],
  key: ButcherNutrientKey
): ButcherNutrientOrderConfig[] {
  const index = order.findIndex((item) => item.key === key);
  if (index < 0 || index >= order.length - 1) return order;

  const newOrder = [...order];
  [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
  return newOrder;
}

export type SortMode = 'default' | 'deficiency'; // 蜆ｪ蜈亥ｺｦ鬆・| 荳崎ｶｳ鬆・
export function sortNutrientsByMode(
  order: ButcherNutrientOrderConfig[],
  mode: SortMode,
  nutrientDataMap: Record<
    ButcherNutrientKey,
    { currentDailyTotal: number; previewAmount: number; target: number }
  >
): ButcherNutrientOrderConfig[] {
  if (mode === 'default') {
    // 蜆ｪ蜈亥ｺｦ鬆・ｼ・riority鬆・ｼ峨〒繧ｽ繝ｼ繝・    return [...order].sort((a, b) => a.priority - b.priority);
  } else if (mode === 'deficiency') {
    // 驕疲・邇・′菴弱＞鬆・ｼ井ｸ崎ｶｳ鬆・ｼ・    return [...order].sort((a, b) => {
      const dataA = nutrientDataMap[a.key];
      const dataB = nutrientDataMap[b.key];

      if (!dataA || !dataB) return 0;

      // target縺・莉･荳九・蝣ｴ蜷医・髯､螟厄ｼ域怙蠕後↓驟咲ｽｮ・・      if (dataA.target <= 0 && dataB.target <= 0) return 0;
      if (dataA.target <= 0) return 1; // A繧貞ｾ後ｍ縺ｫ
      if (dataB.target <= 0) return -1; // B繧貞ｾ後ｍ縺ｫ

      // 蜷郁ｨ亥､・・urrentDailyTotal + previewAmount・峨〒驕疲・邇・ｒ險育ｮ・      const totalA = dataA.currentDailyTotal + dataA.previewAmount;
      const totalB = dataB.currentDailyTotal + dataB.previewAmount;

      const ratioA = totalA / dataA.target;
      const ratioB = totalB / dataB.target;

      return ratioA - ratioB; // 蟆上＆縺・・ｼ井ｸ崎ｶｳ縺励※縺・ｋ鬆・ｼ・    });
  }

  return order;
}

