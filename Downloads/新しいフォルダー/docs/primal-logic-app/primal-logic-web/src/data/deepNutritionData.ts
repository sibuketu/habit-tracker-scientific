/**
 * CarnivoreOS - Deep Nutrition Data (Seed Data)
 *
 * 繧ｫ繝ｼ繝九・繧｢縺ｫ縺ｨ縺｣縺ｦ縺ｮ縲卦ier 1・域怙驥崎ｦ・ｼ峨阪ョ繝ｼ繧ｿ
 * API繧剃ｽｿ逕ｨ縺帙★縲√Ο繝ｼ繧ｫ繝ｫ縺ｮ繝槭せ繧ｿ繝ｼ繝・・繧ｿ縺ｨ縺励※菫晄戟
 */

export type NutritionTier = 'Tier 1' | 'Tier 2' | 'Tier 3';
export type AnimalType = 'beef' | 'pork' | 'chicken' | 'egg' | 'fish' | 'lamb' | 'duck' | 'game';
export type PartLocation = 'rib' | 'belly' | 'leg' | 'internal' | 'body' | 'whole';

export interface DeepFoodItem {
  id: string;
  name_ja: string; // 譌･譛ｬ隱槫錐
  part_location: PartLocation; // UI荳翫・驛ｨ菴・  animal_type: AnimalType;

  // 繝槭け繝ｭ (100g縺ゅ◆繧・
  protein: number;
  fat: number;
  carbs: number;

  // Primal Metrics (隧ｳ邏ｰ繝・・繧ｿ)
  saturated_fat: number; // 驥崎ｦ√↑繧ｨ繝阪Ν繧ｮ繝ｼ貅・  omega_6: number; // 菴弱＞縺ｻ縺ｩ濶ｯ縺・  zinc: number; // 莠憺央 (mg)
  vitamin_b12: number; // B12 (ﾎｼg)

  // UI逕ｨ繝｡繝・そ繝ｼ繧ｸ
  primal_verdict: string; // 荳險繧ｳ繝｡繝ｳ繝・
  // 霑ｽ蜉譬・､顔ｴ・域里蟄倥す繧ｹ繝・Β縺ｨ縺ｮ莠呈鋤諤ｧ縺ｮ縺溘ａ・・  hemeIron?: number;
  vitaminC?: number;
  vitaminK?: number;
  sodium?: number;
  magnesium?: number;
  potassium?: number;
  // 閼よｺｶ諤ｧ繝薙ち繝溘Φ・医き繝ｼ繝九・繧｢驥崎ｦ・ｼ夂央閼ゅ・蜊ｵ鮟・・繝ｬ繝舌・遲会ｼ・  vitamin_a?: number; // IU
  vitamin_d?: number; // IU
  vitamin_k2?: number; // ﾎｼg (MK-4)
  omega_3?: number; // g
  choline?: number; // mg
}

// 蛻晄悄繝槭せ繧ｿ繝ｼ繝・・繧ｿ
export const MASTER_FOODS: DeepFoodItem[] = [
  {
    id: 'beef_ribeye',
    name_ja: '迚帙Μ繝悶い繧､ (迚ｧ闕臥央諠ｳ螳・',
    part_location: 'rib',
    animal_type: 'beef',
    protein: 22.0,
    fat: 16.0,
    carbs: 0,
    saturated_fat: 7.5,
    omega_6: 0.4,
    zinc: 4.5,
    vitamin_b12: 2.8,
    primal_verdict: '繧ｫ繝ｼ繝九・繧｢縺ｮ邇区ｧ倥りр雉ｪ縺ｨ繧ｿ繝ｳ繝代け雉ｪ縺ｮ繝舌Λ繝ｳ繧ｹ縺檎･槭・,
    hemeIron: 2.3,
    vitaminC: 0,
    vitaminK: 1.1,
    sodium: 54,
    magnesium: 20,
    potassium: 250,
  },
  {
    id: 'beef_belly',
    name_ja: '迚帙ヰ繝ｩ / 繝悶Μ繧ｹ繧ｱ繝・ヨ',
    part_location: 'belly',
    animal_type: 'beef',
    protein: 14.0,
    fat: 35.0,
    carbs: 0.1,
    saturated_fat: 15.0,
    omega_6: 0.8,
    zinc: 3.2,
    vitamin_b12: 2.0,
    primal_verdict: '蠑ｷ蜉帙↑繧ｨ繝阪Ν繧ｮ繝ｼ貅舌ょ｡ｩ繧貞､壹ａ縺ｫ謖ｯ繧九％縺ｨ縲・,
    hemeIron: 2.0,
    vitaminC: 0,
    vitaminK: 1.0,
    sodium: 50,
    magnesium: 15,
    potassium: 200,
  },
  {
    id: 'pork_belly',
    name_ja: '雎壹ヰ繝ｩ (騾壼ｸｸ閧･閧ｲ)',
    part_location: 'belly',
    animal_type: 'pork',
    protein: 14.2,
    fat: 34.6,
    carbs: 0.1,
    saturated_fat: 11.0,
    omega_6: 3.5, // 窶ｻ縺薙％縺碁ｫ倥＞縺ｮ縺瑚ｱ壹・迚ｹ蠕ｴ
    zinc: 1.5,
    vitamin_b12: 0.6,
    primal_verdict: '鄒主袖縺励＞縺後が繝｡繧ｬ6縺碁ｫ倥ａ縲る｣溘∋驕弱℃縺溘ｉ鬲壹〒繝舌Λ繝ｳ繧ｹ繧偵・,
    hemeIron: 0.7,
    vitaminC: 0,
    vitaminK: 0,
    sodium: 50,
    magnesium: 15,
    potassium: 180,
  },
  {
    id: 'chicken_liver',
    name_ja: '鮓上Ξ繝舌・',
    part_location: 'internal',
    animal_type: 'chicken',
    protein: 18.9,
    fat: 3.1,
    carbs: 0.6,
    saturated_fat: 1.0,
    omega_6: 0.5,
    zinc: 3.3,
    vitamin_b12: 44.4, // 窶ｻ辷・匱逧・↓鬮倥＞
    primal_verdict: '螟ｩ辟ｶ縺ｮ繝槭Ν繝√ン繧ｿ繝溘Φ縲るｱ縺ｫ謨ｰ蝗槭〒蜊∝・縲・,
    hemeIron: 9.0,
    vitaminC: 13.0,
    vitaminK: 0,
    sodium: 69,
    magnesium: 18,
    potassium: 220,
    // 繝ｬ繝舌・縺ｯ閼よｺｶ諤ｧ繝薙ち繝溘Φ縺ｮ螳晏ｺｫ
    vitamin_a: 49678, // IU/100g・磯撼蟶ｸ縺ｫ鬮倥＞・・    vitamin_d: 49, // IU/100g
    vitamin_k2: 0, // 繝ｬ繝舌・縺ｫ縺ｯK1縺ｯ縺ゅｋ縺桑2縺ｯ蟆代↑縺・    omega_3: 0.1,
  },
  {
    id: 'salmon',
    name_ja: '繧ｵ繝ｼ繝｢繝ｳ (繧｢繝医Λ繝ｳ繝・ぅ繝・け)',
    part_location: 'body',
    animal_type: 'fish',
    protein: 20.0,
    fat: 13.0,
    carbs: 0,
    saturated_fat: 3.1,
    omega_6: 0.1,
    zinc: 0.5,
    vitamin_b12: 3.2,
    primal_verdict: '繧ｪ繝｡繧ｬ3縺ｮ螳晏ｺｫ縲りｱ夊ｉ繧帝｣溘∋縺滓律縺ｮ隱ｿ謨ｴ蠖ｹ縺ｫ譛驕ｩ縲・,
    hemeIron: 0.8,
    vitaminC: 0,
    vitaminK: 0.1,
    sodium: 44,
    magnesium: 30,
    potassium: 363,
  },
];

/**
 * 驛ｨ菴阪〒鬟溷刀繧呈､懃ｴ｢
 */
export function getFoodsByPart(animalType: AnimalType, partLocation: PartLocation): DeepFoodItem[] {
  return MASTER_FOODS.filter(
    (food) => food.animal_type === animalType && food.part_location === partLocation
  );
}

/**
 * 蜍慕黄繧ｿ繧､繝励〒鬟溷刀繧呈､懃ｴ｢
 */
export function getFoodsByAnimal(animalType: AnimalType): DeepFoodItem[] {
  return MASTER_FOODS.filter((food) => food.animal_type === animalType);
}

/**
 * ID縺ｧ鬟溷刀繧貞叙蠕・ */
export function getDeepFoodById(id: string): DeepFoodItem | undefined {
  return MASTER_FOODS.find((food) => food.id === id);
}

