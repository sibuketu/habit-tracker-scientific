# 譬・､顔ｴTier/陦ｨ遉ｺ繝｢繝ｼ繝画｡茨ｼ磯驕ｿ・・

縺薙・繝輔ぃ繧､繝ｫ縺ｯ縲～src/utils/nutrientPriority.ts`縺ｮ繝ｭ繧ｸ繝・け譯医ｒ**蠕後〒蜀榊茜逕ｨ縺ｧ縺阪ｋ繧医≧縺ｫ騾驕ｿ**縺励◆繧ゅ・縺ｧ縺吶・

- **豕ｨ諢・*: Tier蛻・｡槭・`nutrientPriority.ts`蜀・さ繝｡繝ｳ繝医・騾壹ｊ**證ｫ螳夲ｼ郁ｦ．iscord/Reddit蛻・梵縺ｧ讀懆ｨｼ・・*縺ｧ縺吶・
- **逶ｮ逧・*: 螳溯｣・ｒ豸医＆縺壹∝ｰ・擂縺ｮ蜀肴､懆ｨ弱・蜀崎ｨｭ險医・譚先侭縺ｨ縺励※菫晏ｭ倥＠縺ｾ縺吶・

---

## 騾驕ｿ縺励◆繧ｳ繝ｼ繝会ｼ・src/utils/nutrientPriority.ts`・・

```ts
/**
 * CarnivoreOS - Nutrient Priority System
 *
 * 縲先圻螳夂噪縺ｪTier蛻・｡・- 隕．iscord/Reddit蛻・梵縺ｧ讀懆ｨｼ縲・
 *
 * 迴ｾ蝨ｨ縺ｮ譬ｹ諡・壹き繝ｼ繝九・繧｢蟆る摩螳ｶ縺ｮ隕玖ｧ｣ + 遘大ｭｦ逧・㍾隕∝ｺｦ
 * 讀懆ｨｼ蠕・■・咼iscord/Reddit蛻・梵縺ｫ繧医ｋ螳滄圀縺ｮ雉ｪ蝠城ｻ蠎ｦ
 *
 * Tier 1: 遘大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｼ井ｽ弱う繝ｳ繧ｹ繝ｪ繝ｳ迥ｶ諷九〒蠢・茨ｼ・
 * Tier 2: 遘大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｻ･荳奇ｼ亥倶ｺｺ蟾ｮ縺ゅｊ縲∽ｸ驛ｨ譬ｹ諡阮・＞・・
 * Tier 3: 縺昴・莉門・縺ｦ・郁ｩｳ邏ｰ繝・・繧ｿ遒ｺ隱咲畑・・
 */

import { logError } from './errorHandler';

/**
 * 譬・､顔ｴ縺ｮ陦ｨ遉ｺ繝｢繝ｼ繝会ｼ・ebug繝｢繝ｼ繝牙炎髯､・單etailed縺ｨ驥崎､・・縺溘ａ・・
 * - simple: 繧ｷ繝ｳ繝励Ν繝｢繝ｼ繝会ｼ磯崕隗｣雉ｪ+閼りｳｪ縺ｮ縺ｿ・・ 繧ｫ繝ｼ繝九・繧｢螳溯ｷｵ閠・髄縺・
 * - standard: 讓呎ｺ悶Δ繝ｼ繝会ｼ磯㍾隕√↑譬・､顔ｴ10鬆・岼・・ 蛻晏ｿ・・髄縺・
 * - detailed: 隧ｳ邏ｰ繝｢繝ｼ繝会ｼ亥・譬・､顔ｴ60鬆・岼莉･荳奇ｼ・ 繝・・繧ｿ驥崎ｦ悶Θ繝ｼ繧ｶ繝ｼ蜷代￠
 */
export type NutrientDisplayMode = 'simple' | 'standard' | 'detailed';

/**
 * 譬・､顔ｴ縺ｮTier蛻・｡橸ｼ医い繝励Μ陦ｨ遉ｺ鬆・ｼ・
 *
 * 縲先圻螳夂噪縲醍ｧ大ｭｦ逧・㍾隕∝ｺｦ繝吶・繧ｹ縲．iscord/Reddit讀懆ｨｼ蠕・■
 */
export const NUTRIENT_TIERS = {
  /**
   * Tier 1: 蟶ｸ縺ｫ陦ｨ遉ｺ・育ｧ大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｼ・
   * 菴弱う繝ｳ繧ｹ繝ｪ繝ｳ迥ｶ諷九〒蠢・医√き繝ｼ繝九・繧｢螳溯ｷｵ閠・・蝓ｺ譛ｬ
   */
  tier1: [
    'fat', // 閼りｳｪ・壻ｸｻ隕√お繝阪Ν繧ｮ繝ｼ貅撰ｼ・:F豈皮紫 1:1.2-1.5謗ｨ螂ｨ・・
    'protein', // 繧ｿ繝ｳ繝代け雉ｪ・壼ｿ・医い繝溘ヮ驟ｸ萓帷ｵｦ縲∫ｭ玖ｉ繝ｻ閾灘勣繝ｻ繝帙Ν繝｢繝ｳ
    'sodium', // 繝翫ヨ繝ｪ繧ｦ繝・壻ｽ弱う繝ｳ繧ｹ繝ｪ繝ｳ竊定・閾捺賜蜃ｺ蠅怜刈・育ｧｻ陦梧悄7000mg・・
    'potassium', // 繧ｫ繝ｪ繧ｦ繝・夐崕隗｣雉ｪ繝舌Λ繝ｳ繧ｹ・・a縺ｨ諡ｮ謚暦ｼ・
    'magnesium', // 繝槭げ繝阪す繧ｦ繝・・00莉･荳翫・驟ｵ邏蜿榊ｿ懊∫ｭ玖ｉ繝ｻ逾樒ｵ・
  ] as const,

  /**
   * Tier 2: 髢矩哩蠑上〒陦ｨ遉ｺ・育ｧ大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｻ･荳奇ｼ・
   *
   * 縲占ｦ∵､懆ｨｼ縲台ｻ･荳九・譬・､顔ｴ縺ｯDiscord雉ｪ蝠城ｻ蠎ｦ縺御ｽ弱＞蜿ｯ閭ｽ諤ｧ・・
   * - glycineMethionineRatio・亥ｰる摩逧・☆縺趣ｼ滂ｼ・
   * - calciumPhosphorusRatio・亥ｰる摩逧・☆縺趣ｼ滂ｼ・
   * - vitaminB12・郁ｉ縺ｧ蜊∝・鞫ょ叙蜿ｯ閭ｽ・滂ｼ・
   * - choline・医Ξ繝舌・繝ｻ蜊ｵ縺ｧ蜊∝・・滂ｼ・
   */
  tier2: [
    'omegaRatio', // 繧ｪ繝｡繧ｬ3/6豈皮紫・夂ｎ逞・ｮ｡逅・ｼ・:4莉･荳区耳螂ｨ・・ 驥崎ｦ∝ｺｦ笘・・笘・・
    'iron', // 驩・・・医・繝驩・ｼ会ｼ壼･ｳ諤ｧ縺ｯ迚ｹ縺ｫ驥崎ｦ・- 驥崎ｦ∝ｺｦ笘・・笘・・
    'zinc', // 莠憺央・壼・逍ｫ繝ｻ繧ｿ繝ｳ繝代け雉ｪ蜷域・ - 驥崎ｦ∝ｺｦ笘・・笘・
    'vitaminD', // 繝薙ち繝溘ΦD・夐ｪｨ繝ｻ蜈咲稔・亥､ｪ髯ｽ蜈蛾｣謳ｺ・・ 驥崎ｦ∝ｺｦ笘・・笘・・
    'vitaminA', // 繝薙ち繝溘ΦA・医Ξ繝√ヮ繝ｼ繝ｫ・会ｼ夊ｦ門鴨繝ｻ逧ｮ閹・- 驥崎ｦ∝ｺｦ笘・・笘・
    'vitaminK2', // 繝薙ち繝溘ΦK2・・K-4・会ｼ夐ｪｨ縺ｮ蛛･蠎ｷ - 驥崎ｦ∝ｺｦ笘・・笘・
    'vitaminB12', // 繝薙ち繝溘ΦB12・夂･樒ｵ梧ｩ溯・・郁ｉ縺ｧ蜊∝・・滂ｼ・ 驥崎ｦ∝ｺｦ笘・・
    'choline', // 繧ｳ繝ｪ繝ｳ・夊┻縺ｮ蛛･蠎ｷ・医Ξ繝舌・繝ｻ蜊ｵ縺ｧ蜊∝・・滂ｼ・ 驥崎ｦ∝ｺｦ笘・・
    'glycineMethionineRatio', // 繧ｰ繝ｪ繧ｷ繝ｳ:繝｡繝√が繝九Φ豈費ｼ壹さ繝ｩ繝ｼ繧ｲ繝ｳ繝ｻ逹｡逵 - 驥崎ｦ∝ｺｦ笘・・
    'calciumPhosphorusRatio', // 繧ｫ繝ｫ繧ｷ繧ｦ繝:繝ｪ繝ｳ豈皮紫・夐ｪｨ・郁ｉ縺ｮ繝ｪ繝ｳ螟壹＞諛ｸ蠢ｵ・・ 驥崎ｦ∝ｺｦ笘・・
  ] as const,

  /**
   * Tier 3: 繝・ヰ繝・げ繝｢繝ｼ繝峨・隧ｳ邏ｰ繝｢繝ｼ繝峨〒陦ｨ遉ｺ・医◎縺ｮ莉門・縺ｦ・・
   * 荳闊ｬ逧・↓縺ｯ蠢・ｦ√↑縺・′縲∬ｩｳ邏ｰ縺ｪ繝・・繧ｿ繧定ｦ九◆縺・Θ繝ｼ繧ｶ繝ｼ蜷代￠
   */
  tier3: [
    // 繝槭け繝ｭ譬・､顔ｴ
    'carbs',
    'netCarbs',
    'fiber',

    // 縺昴・莉悶・繝溘ロ繝ｩ繝ｫ
    'calcium',
    'phosphorus',
    'selenium',
    'copper',
    'manganese',
    'iodine',
    'chromium',
    'molybdenum',
    'fluoride',
    'chloride',
    'boron',
    'nickel',
    'silicon',
    'vanadium',

    // 縺昴・莉悶・閼よｺｶ諤ｧ繝薙ち繝溘Φ
    'vitaminK',
    'vitaminE',

    // 豌ｴ貅ｶ諤ｧ繝薙ち繝溘Φ
    'vitaminC',
    'vitaminB1',
    'vitaminB2',
    'vitaminB3',
    'vitaminB5',
    'vitaminB6',
    'vitaminB7',
    'vitaminB9',

    // 縺昴・莉・
    'taurine',
    'omega3',
    'omega6',
    'pfRatio',

    // 謚玲・､顔ｴ・・void Zone・・
    'phytates',
    'polyphenols',
    'flavonoids',
    'anthocyanins',
    'oxalates',
    'lectins',
    'saponins',
    'goitrogens',
    'tannins',
    'trypsinInhibitors',
    'proteaseInhibitors',
    'cyanogenicGlycosides',
    'solanine',
    'chaconine',

    // 讀咲黄諤ｧ鬟溷刀・・void Zone・・
    'plantProtein',
    'vegetableOil',
  ] as const,
} as const;

/**
 * Tier 1縺ｮ譬・､顔ｴ繧帝崕隗｣雉ｪ縺ｨ繝槭け繝ｭ譬・､顔ｴ縺ｫ蛻・｡・
 */
export const TIER1_CATEGORIES = {
  electrolytes: ['sodium', 'potassium', 'magnesium'] as const,
  macros: ['fat', 'protein'] as const,
} as const;

/**
 * 譬・､顔ｴ縺ｮ陦ｨ遉ｺ繝｢繝ｼ繝峨↓蠢懊§縺ｦ陦ｨ遉ｺ縺吶ｋ譬・､顔ｴ繧貞叙蠕・
 */
export function getNutrientsForMode(mode: NutrientDisplayMode): readonly string[] {
  switch (mode) {
    case 'simple':
      return NUTRIENT_TIERS.tier1;
    case 'standard':
      return [...NUTRIENT_TIERS.tier1, ...NUTRIENT_TIERS.tier2];
    case 'detailed':
      return [...NUTRIENT_TIERS.tier1, ...NUTRIENT_TIERS.tier2, ...NUTRIENT_TIERS.tier3];
    default:
      return NUTRIENT_TIERS.tier1;
  }
}

/**
 * 譬・､顔ｴ縺ｮTier繧貞叙蠕・
 */
export function getNutrientTier(nutrientKey: string): 1 | 2 | 3 | null {
  if (NUTRIENT_TIERS.tier1.includes(nutrientKey as any)) return 1;
  if (NUTRIENT_TIERS.tier2.includes(nutrientKey as any)) return 2;
  if (NUTRIENT_TIERS.tier3.includes(nutrientKey as any)) return 3;
  return null;
}

/**
 * 譬・､顔ｴ縺檎音螳壹・繝｢繝ｼ繝峨〒陦ｨ遉ｺ縺輔ｌ繧九°繝√ぉ繝・け
 */
export function isNutrientVisibleInMode(nutrientKey: string, mode: NutrientDisplayMode): boolean {
  const nutrients = getNutrientsForMode(mode);
  return nutrients.includes(nutrientKey);
}

/**
 * LocalStorage繧ｭ繝ｼ
 */
const STORAGE_KEY = 'primal_logic_nutrient_display_mode';

/**
 * 譬・､顔ｴ陦ｨ遉ｺ繝｢繝ｼ繝峨ｒ蜿門ｾ・
 */
export function getNutrientDisplayMode(): NutrientDisplayMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // debug繝｢繝ｼ繝峨・蜑企勁貂医∩・・etailed縺ｫ邨ｱ蜷茨ｼ・
    if (saved === 'debug') return 'detailed';
    if (saved && ['simple', 'standard', 'detailed'].includes(saved)) {
      return saved as NutrientDisplayMode;
    }
  } catch (error) {
    logError(error, { component: 'nutrientPriority', action: 'getNutrientDisplayMode' });
  }
  // 繝・ヵ繧ｩ繝ｫ繝医・讓呎ｺ悶Δ繝ｼ繝会ｼ亥・蠢・・↓蜆ｪ縺励＞・・
  return 'standard';
}

/**
 * 譬・､顔ｴ陦ｨ遉ｺ繝｢繝ｼ繝峨ｒ菫晏ｭ・
 */
export function saveNutrientDisplayMode(mode: NutrientDisplayMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
  } catch (error) {
    logError(error, { component: 'nutrientPriority', action: 'saveNutrientDisplayMode' });
  }
}

/**
 * 陦ｨ遉ｺ繝｢繝ｼ繝峨・隱ｬ譏弱ｒ蜿門ｾ・
 */
export function getNutrientDisplayModeDescription(mode: NutrientDisplayMode): string {
  switch (mode) {
    case 'simple':
      return '繧ｫ繝ｼ繝九・繧｢螳溯ｷｵ閠・髄縺代る崕隗｣雉ｪ縺ｨ閼りｳｪ縺ｮ縺ｿ陦ｨ遉ｺ縲ゅ梧焚蛟､邂｡逅・阪°繧峨瑚ｺｫ菴捺─隕壹阪∈縺ｮ蝗槫ｸｰ縲・;
    case 'standard':
      return '蛻晏ｿ・・髄縺代る㍾隕√↑譬・､顔ｴ10鬆・岼繧定｡ｨ遉ｺ縲ょｮ牙ｿ・─縺ｮ縺ゅｋ諠・ｱ驥上・;
    case 'detailed':
      return '繝・・繧ｿ驥崎ｦ悶Θ繝ｼ繧ｶ繝ｼ蜷代￠縲ょ・縺ｦ縺ｮ譬・､顔ｴ・・0鬆・岼莉･荳奇ｼ峨ｒ陦ｨ遉ｺ縲・;
    default:
      return '';
  }
}

/**
 * 繝壹Ν繧ｽ繝雁挨縺ｮ繝・ヵ繧ｩ繝ｫ繝医Δ繝ｼ繝峨ｒ蜿門ｾ・
 * @param persona - 'carnivore_practitioner' | 'beginner' | 'data_focused'
 */
export function getDefaultModeForPersona(
  persona: 'carnivore_practitioner' | 'beginner' | 'data_focused'
): NutrientDisplayMode {
  switch (persona) {
    case 'carnivore_practitioner':
      return 'simple'; // 繧ｫ繝ｼ繝九・繧｢螳溯ｷｵ閠・ｼ壹す繝ｳ繝励Ν
    case 'beginner':
      return 'standard'; // 蛻晏ｿ・・ｼ壽ｨ呎ｺ・
    case 'data_focused':
      return 'detailed'; // 繝・・繧ｿ驥崎ｦ厄ｼ夊ｩｳ邏ｰ
    default:
      return 'standard';
  }
}
```


