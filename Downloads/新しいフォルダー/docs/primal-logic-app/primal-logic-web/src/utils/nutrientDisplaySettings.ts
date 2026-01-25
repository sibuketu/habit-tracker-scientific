/**
 * CarnivoreOS - Nutrient Display Settings
 *
 * Utility to manage nutrient display/hide
 * Default is to display all
 */

import { logError } from './errorHandler';

export type NutrientKey =
  // Macronutrients
  | 'protein'
  | 'fat'
  | 'carbs'
  | 'netCarbs'
  | 'fiber'
  // Minerals
  | 'sodium'
  | 'magnesium'
  | 'potassium'
  | 'zinc'
  | 'iron'
  | 'calcium'
  | 'phosphorus'
  | 'selenium'
  | 'copper'
  | 'manganese'
  | 'iodine'
  | 'chromium'
  | 'molybdenum'
  | 'fluoride'
  | 'chloride'
  | 'boron'
  | 'nickel'
  | 'silicon'
  | 'vanadium'
  // Fat-soluble Vitamins
  | 'vitaminA'
  | 'vitaminD'
  | 'vitaminK'
  | 'vitaminK2'
  | 'vitaminE'
  // Water-soluble Vitamins
  | 'vitaminC'
  | 'vitaminB1'
  | 'vitaminB2'
  | 'vitaminB3'
  | 'vitaminB5'
  | 'vitaminB6'
  | 'vitaminB7'
  | 'vitaminB9'
  | 'vitaminB12'
  // Others
  | 'choline'
  | 'taurine'
  | 'omega3'
  | 'omega6'
  | 'omegaRatio'
  | 'vitaminB5'
  | 'vitaminB9'
  // Ratios
  | 'calciumPhosphorusRatio'
  | 'glycineMethionineRatio'
  | 'pfRatio'
  // Antinutrients (Avoid Zone)
  | 'phytates'
  | 'polyphenols'
  | 'flavonoids'
  | 'anthocyanins'
  | 'oxalates'
  | 'lectins'
  | 'saponins'
  | 'goitrogens'
  | 'tannins'
  | 'trypsinInhibitors'
  | 'proteaseInhibitors'
  | 'cyanogenicGlycosides'
  | 'solanine'
  | 'chaconine'
  // Plant-based Foods (Avoid Zone)
  | 'plantProtein'
  | 'vegetableOil';

export interface NutrientDisplayConfig {
  key: NutrientKey;
  label: string;
  unit: string;
  category:
    | 'macro'
    | 'mineral'
    | 'fatSolubleVitamin'
    | 'waterSolubleVitamin'
    | 'other'
    | 'ratio'
    | 'antiNutrient'
    | 'avoid';
  defaultVisible: boolean; // Default is to display all
}

/**
 * Display settings for all nutrients (default: display all)
 */
export const ALL_NUTRIENT_DISPLAY_CONFIGS: NutrientDisplayConfig[] = [
  // Macronutrients
  {
    key: 'protein',
    label: 'Protein (Effective)',
    unit: 'g',
    category: 'macro',
    defaultVisible: true,
  },
  { key: 'fat', label: 'Fat', unit: 'g', category: 'macro', defaultVisible: true },
  { key: 'carbs', label: 'Carbs', unit: 'g', category: 'macro', defaultVisible: true },
  { key: 'netCarbs', label: 'Net Carbs', unit: 'g', category: 'macro', defaultVisible: true },
  { key: 'fiber', label: 'Fiber', unit: 'g', category: 'macro', defaultVisible: true },

  // Minerals
  { key: 'sodium', label: 'Sodium', unit: 'mg', category: 'mineral', defaultVisible: true },
  {
    key: 'magnesium',
    label: 'Magnesium',
    unit: 'mg',
    category: 'mineral',
    defaultVisible: true,
  },
  { key: 'potassium', label: 'Potassium', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'zinc', label: 'Zinc (Effective)', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'iron', label: 'Iron (Effective)', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'calcium', label: 'Calcium', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'phosphorus', label: 'Phosphorus', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'selenium', label: 'Selenium', unit: 'ﾎｼg', category: 'mineral', defaultVisible: true },
  { key: 'copper', label: 'Copper', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'manganese', label: 'Manganese', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'iodine', label: 'Iodine', unit: 'ﾎｼg', category: 'mineral', defaultVisible: true },
  { key: 'chromium', label: 'Chromium', unit: 'ﾎｼg', category: 'mineral', defaultVisible: true },
  { key: 'molybdenum', label: 'Molybdenum', unit: 'ﾎｼg', category: 'mineral', defaultVisible: true },
  { key: 'fluoride', label: 'Fluoride', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'chloride', label: 'Chloride', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'boron', label: 'Boron', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'nickel', label: 'Nickel', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'silicon', label: 'Silicon', unit: 'mg', category: 'mineral', defaultVisible: true },
  { key: 'vanadium', label: 'Vanadium', unit: 'ﾎｼg', category: 'mineral', defaultVisible: true },

  // Fat-soluble Vitamins
  {
    key: 'vitaminA',
    label: 'Vitamin A',
    unit: 'IU',
    category: 'fatSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminD',
    label: 'Vitamin D',
    unit: 'IU',
    category: 'fatSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminK',
    label: 'Vitamin K (Effective)',
    unit: 'ﾎｼg',
    category: 'fatSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminK2',
    label: 'Vitamin K2',
    unit: 'ﾎｼg',
    category: 'fatSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminE',
    label: 'Vitamin E',
    unit: 'mg',
    category: 'fatSolubleVitamin',
    defaultVisible: true,
  },

  // Water-soluble Vitamins
  {
    key: 'vitaminC',
    label: 'Vitamin C',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB1',
    label: 'Vitamin B1',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB2',
    label: 'Vitamin B2',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB3',
    label: 'Vitamin B3',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB6',
    label: 'Vitamin B6',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB7',
    label: 'Vitamin B7 (Biotin)',
    unit: 'ﾎｼg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB9',
    label: 'Vitamin B9 (Folate)',
    unit: 'ﾎｼg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB12',
    label: 'Vitamin B12',
    unit: 'ﾎｼg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },
  {
    key: 'vitaminB5',
    label: 'Vitamin B5 (Pantothenic Acid)',
    unit: 'mg',
    category: 'waterSolubleVitamin',
    defaultVisible: true,
  },

  // Others
  { key: 'choline', label: 'Choline', unit: 'mg', category: 'other', defaultVisible: true },
  { key: 'taurine', label: 'Taurine', unit: 'mg', category: 'other', defaultVisible: true },
  { key: 'omega3', label: 'Omega-3', unit: 'g', category: 'other', defaultVisible: true },
  { key: 'omega6', label: 'Omega-6', unit: 'g', category: 'other', defaultVisible: true },
  { key: 'omegaRatio', label: 'Omega-6:3 Ratio', unit: '', category: 'other', defaultVisible: true },

  // Ratios
  {
    key: 'calciumPhosphorusRatio',
    label: 'Calcium:Phosphorus Ratio',
    unit: '',
    category: 'ratio',
    defaultVisible: true,
  },
  {
    key: 'glycineMethionineRatio',
    label: 'Glycine:Methionine Ratio',
    unit: '',
    category: 'ratio',
    defaultVisible: true,
  },
  { key: 'pfRatio', label: 'P:F Ratio', unit: '', category: 'ratio', defaultVisible: true },

  // Antinutrients (Avoid Zone)
  {
    key: 'phytates',
    label: 'Phytic Acid',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'polyphenols',
    label: 'Polyphenols',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'flavonoids',
    label: 'Flavonoids',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'anthocyanins',
    label: 'Anthocyanins',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'oxalates',
    label: 'Oxalic Acid',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  { key: 'lectins', label: 'Lectins', unit: 'mg', category: 'antiNutrient', defaultVisible: true },
  {
    key: 'saponins',
    label: 'Saponins',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'goitrogens',
    label: 'Goitrogens',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  { key: 'tannins', label: 'Tannins', unit: 'mg', category: 'antiNutrient', defaultVisible: true },
  {
    key: 'trypsinInhibitors',
    label: 'Trypsin Inhibitors',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'proteaseInhibitors',
    label: 'Protease Inhibitors',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'cyanogenicGlycosides',
    label: 'Cyanogenic Glycosides',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'solanine',
    label: 'Solanine',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },
  {
    key: 'chaconine',
    label: 'Chaconine',
    unit: 'mg',
    category: 'antiNutrient',
    defaultVisible: true,
  },

  // Plant-based Foods (Avoid Zone)
  {
    key: 'plantProtein',
    label: 'Plant Protein',
    unit: 'g',
    category: 'avoid',
    defaultVisible: true,
  },
  { key: 'vegetableOil', label: 'Vegetable Oil', unit: 'g', category: 'avoid', defaultVisible: true },
];

const STORAGE_KEY = 'primal_logic_nutrient_display_settings';

/**
 * Get nutrient display settings (default: display all)
 */
export function getNutrientDisplaySettings(): Record<NutrientKey, boolean> {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Merge with default values (also handles newly added nutrients)
      const defaults = {} as Record<NutrientKey, boolean>;
      ALL_NUTRIENT_DISPLAY_CONFIGS.forEach((config) => {
        defaults[config.key] = config.defaultVisible;
      });
      return { ...defaults, ...parsed };
    }
    // Default is to display all
    const defaults = {} as Record<NutrientKey, boolean>;
    ALL_NUTRIENT_DISPLAY_CONFIGS.forEach((config) => {
      defaults[config.key] = config.defaultVisible;
    });
    return defaults;
  } catch (error) {
    logError(error, { component: 'nutrientDisplaySettings', action: 'getNutrientDisplaySettings' });
    // Default is to display all even on error
    const defaults = {} as Record<NutrientKey, boolean>;
    ALL_NUTRIENT_DISPLAY_CONFIGS.forEach((config) => {
      defaults[config.key] = config.defaultVisible;
    });
    return defaults;
  }
}

/**
 * 譬・､顔ｴ縺ｮ陦ｨ遉ｺ險ｭ螳壹ｒ菫晏ｭ・ */
export function saveNutrientDisplaySettings(settings: Record<NutrientKey, boolean>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch (error) {
    logError(error, {
      component: 'nutrientDisplaySettings',
      action: 'saveNutrientDisplaySettings',
    });
  }
}

/**
 * 迚ｹ螳壹・譬・､顔ｴ縺ｮ陦ｨ遉ｺ/髱櫁｡ｨ遉ｺ繧貞・繧頑崛縺・ */
export function toggleNutrientVisibility(key: NutrientKey): void {
  const settings = getNutrientDisplaySettings();
  settings[key] = !settings[key];
  saveNutrientDisplaySettings(settings);
}

/**
 * 繧ｫ繝・ざ繝ｪ縺斐→縺ｫ陦ｨ遉ｺ/髱櫁｡ｨ遉ｺ繧貞・繧頑崛縺・ */
export function toggleCategoryVisibility(
  category: NutrientDisplayConfig['category'],
  visible: boolean
): void {
  const settings = getNutrientDisplaySettings();
  ALL_NUTRIENT_DISPLAY_CONFIGS.filter((config) => config.category === category).forEach(
    (config) => {
      settings[config.key] = visible;
    }
  );
  saveNutrientDisplaySettings(settings);
}

/**
 * 蜈ｨ縺ｦ縺ｮ譬・､顔ｴ繧定｡ｨ遉ｺ/髱櫁｡ｨ遉ｺ
 */
export function setAllNutrientsVisible(visible: boolean): void {
  const settings = {} as Record<NutrientKey, boolean>;
  ALL_NUTRIENT_DISPLAY_CONFIGS.forEach((config) => {
    settings[config.key] = visible;
  });
  saveNutrientDisplaySettings(settings);
}

