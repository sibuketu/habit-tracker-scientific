/**
 * CarnivoreOS - Nutrient Priority System
 *
 * 縲先圻螳夂噪縺ｪTier蛻・｡・- 隕．iscord/Reddit蛻・梵縺ｧ讀懆ｨｼ縲・ *
 * 迴ｾ蝨ｨ縺ｮ譬ｹ諡・壹き繝ｼ繝九・繧｢蟆る摩螳ｶ縺ｮ隕玖ｧ｣ + 遘大ｭｦ逧・㍾隕∝ｺｦ
 * 讀懆ｨｼ蠕・■・咼iscord/Reddit蛻・梵縺ｫ繧医ｋ螳滄圀縺ｮ雉ｪ蝠城ｻ蠎ｦ
 *
 * Tier 1: 遘大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｼ井ｽ弱う繝ｳ繧ｹ繝ｪ繝ｳ迥ｶ諷九〒蠢・茨ｼ・ * Tier 2: 遘大ｭｦ逧・㍾隕∝ｺｦ笘・・笘・・笘・ｻ･荳奇ｼ亥倶ｺｺ蟾ｮ縺ゅｊ縲∽ｸ驛ｨ譬ｹ諡阮・＞・・ * Tier 3: 縺昴・莉門・縺ｦ・郁ｩｳ邏ｰ繝・・繧ｿ遒ｺ隱咲畑・・ */

import { logError } from './errorHandler';

/**
 * 譬・､顔ｴ縺ｮ陦ｨ遉ｺ繝｢繝ｼ繝会ｼ・ebug繝｢繝ｼ繝牙炎髯､・單etailed縺ｨ驥崎､・・縺溘ａ・・ * - simple: 繧ｷ繝ｳ繝励Ν繝｢繝ｼ繝会ｼ磯崕隗｣雉ｪ+閼りｳｪ縺ｮ縺ｿ・・ 繧ｫ繝ｼ繝九・繧｢螳溯ｷｵ閠・髄縺・ * - standard: 讓呎ｺ悶Δ繝ｼ繝会ｼ磯㍾隕√↑譬・､顔ｴ10鬆・岼・・ 蛻晏ｿ・・髄縺・ * - detailed: 隧ｳ邏ｰ繝｢繝ｼ繝会ｼ亥・譬・､顔ｴ60鬆・岼莉･荳奇ｼ・ 繝・・繧ｿ驥崎ｦ悶Θ繝ｼ繧ｶ繝ｼ蜷代￠
 */
export type NutrientDisplayMode = 'simple' | 'standard' | 'detailed';

/**
 * Nutrient Tier Classification (app display order)
 *
 * [Provisional] Based on scientific importance, pending Discord/Reddit verification
 */
export const NUTRIENT_TIERS = {
  /**
   * Tier 1: Always displayed (Scientific importance 笘・・笘・・笘・
   * Essential in low insulin state, fundamental for carnivore practitioners
   */
  tier1: [
    'fat', // Fat: Primary energy source (P:F ratio 1:1.2-1.5 recommended)
    'protein', // Protein: Essential amino acid supply, muscle, organs, hormones
    'sodium', // Sodium: Low insulin 竊・increased kidney excretion (7000mg during transition)
    'potassium', // Potassium: Electrolyte balance (antagonistic with Na)
    'magnesium', // Magnesium: 300+ enzyme reactions, muscle, nerves
  ] as const,

  /**
   * Tier 2: Displayed in collapsible format (Scientific importance 笘・・笘・・笘・or higher)
   *
   * [Needs verification] The following nutrients may have low Discord question frequency:
   * - glycineMethionineRatio (too specialized?)
   * - calciumPhosphorusRatio (too specialized?)
   * - vitaminB12 (sufficient from meat?)
   * - choline (sufficient from liver and eggs?)
   */
  tier2: [
    'omegaRatio', // Omega-3/6 ratio: Inflammation management (1:4 or less recommended) - Importance 笘・・笘・・
    'iron', // Iron (heme iron): Especially important for women - Importance 笘・・笘・・
    'zinc', // Zinc: Immune function, protein synthesis - Importance 笘・・笘・    'vitaminD', // Vitamin D: Bone, immune (sunlight integration) - Importance 笘・・笘・・
    'vitaminA', // Vitamin A (retinol): Vision, skin - Importance 笘・・笘・    'vitaminK2', // Vitamin K2 (MK-4): Bone health - Importance 笘・・笘・    'vitaminB12', // Vitamin B12: Nerve function (sufficient from meat?) - Importance 笘・・
    'choline', // Choline: Brain health (sufficient from liver and eggs?) - Importance 笘・・
    'glycineMethionineRatio', // Glycine:Methionine ratio: Collagen, sleep - Importance 笘・・
    'calciumPhosphorusRatio', // Calcium:Phosphorus ratio: Bone (concern about high P in meat) - Importance 笘・・
  ] as const,

  /**
   * Tier 3: Displayed in debug mode and detailed mode (all others)
   * Generally not needed, but for users who want detailed data
   */
  tier3: [
    // Macronutrients
    'carbs',
    'netCarbs',
    'fiber',

    // Other minerals
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

    // Other fat-soluble vitamins
    'vitaminK',
    'vitaminE',

    // Water-soluble vitamins
    'vitaminC',
    'vitaminB1',
    'vitaminB2',
    'vitaminB3',
    'vitaminB5',
    'vitaminB6',
    'vitaminB7',
    'vitaminB9',

    // Others
    'taurine',
    'omega3',
    'omega6',
    'pfRatio',

    // Antinutrients (Avoid Zone)
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

    // Plant-based foods (Avoid Zone)
    'plantProtein',
    'vegetableOil',
  ] as const,
} as const;

/**
 * Classify Tier 1 nutrients into electrolytes and macronutrients
 */
export const TIER1_CATEGORIES = {
  electrolytes: ['sodium', 'potassium', 'magnesium'] as const,
  macros: ['fat', 'protein'] as const,
} as const;

/**
 * Get nutrients to display according to nutrient display mode
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
 * 譬・､顔ｴ縺ｮTier繧貞叙蠕・ */
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
 * Get nutrient display mode
 */
export function getNutrientDisplayMode(): NutrientDisplayMode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    // Debug mode has been removed (merged into detailed)
    if (saved === 'debug') return 'detailed';
    if (saved && ['simple', 'standard', 'detailed'].includes(saved)) {
      return saved as NutrientDisplayMode;
    }
  } catch (error) {
    logError(error, { component: 'nutrientPriority', action: 'getNutrientDisplayMode' });
  }
  // Default is standard mode (beginner-friendly)
  return 'standard';
}

/**
 * Save nutrient display mode
 */
export function saveNutrientDisplayMode(mode: NutrientDisplayMode): void {
  try {
    localStorage.setItem(STORAGE_KEY, mode);
    // Fire custom event to notify components of the change
    window.dispatchEvent(new CustomEvent('nutrientDisplayModeChanged'));
  } catch (error) {
    logError(error, { component: 'nutrientPriority', action: 'saveNutrientDisplayMode' });
  }
}

/**
 * Get description of display mode
 */
export function getNutrientDisplayModeDescription(mode: NutrientDisplayMode): string {
  switch (mode) {
    case 'simple':
      return 'For carnivore practitioners. Display only electrolytes and fat. Return from "numerical management" to "body sensation".';
    case 'standard':
      return 'For beginners. Display 10 important nutrients. Comfortable amount of information.';
    case 'detailed':
      return 'For data-focused users. Display all nutrients (60+ items).';
    default:
      return '';
  }
}

/**
 * Get default mode for persona
 * @param persona - 'carnivore_practitioner' | 'beginner' | 'data_focused'
 */
export function getDefaultModeForPersona(
  persona: 'carnivore_practitioner' | 'beginner' | 'data_focused'
): NutrientDisplayMode {
  switch (persona) {
    case 'carnivore_practitioner':
      return 'simple'; // Carnivore practitioner: Simple
    case 'beginner':
      return 'standard'; // Beginner: Standard
    case 'data_focused':
      return 'detailed'; // Data-focused: Detailed
    default:
      return 'standard';
  }
}

