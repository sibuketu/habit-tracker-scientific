/**
 * Fuzzy Data Master - 栁E��素の「幁E��を持つマスターチE�Eタ
 *
 * 栁E��素は、E00~130g」�Eような幁E��Eange�E�として保持するが、E * メイン画面では中央値のみシンプルに表示する、E */

/**
 * 栁E��素の幁E��Euzzy Data�E�E */
export type FuzzyNutrient = {
  value: number; // UI表示用�E�中央値�E�E  min: number; // 最小値
  max: number; // 最大値
};

/**
 * 食品マスターチE�Eタの垁E */
export interface FoodMasterItem {
  id: string;
  name: string; // 英語名
  name_ja: string; // 日本語名
  name_fr?: string; // フランス語名�E�オプション�E�E  name_de?: string; // ドイチE��名�E�オプション�E�E  protein: FuzzyNutrient; // per 100g
  fat: FuzzyNutrient; // per 100g
  carbs: FuzzyNutrient; // per 100g
  default_unit: number; // チE��ォルト�E量！E�E�E  // 追加栁E��素�E�オプション�E�E  saturated_fat?: FuzzyNutrient;
  omega_6?: FuzzyNutrient;
  zinc?: FuzzyNutrient;
  vitamin_b12?: FuzzyNutrient;
  iron?: FuzzyNutrient;
  sodium?: FuzzyNutrient;
  magnesium?: FuzzyNutrient;
  potassium?: FuzzyNutrient; // mg
  // 脂溶性ビタミン�E�カーニ�Eア重要E��E  vitamin_a?: FuzzyNutrient; // IU
  vitamin_d?: FuzzyNutrient; // IU
  vitamin_k2?: FuzzyNutrient; // μg (MK-4)
  omega_3?: FuzzyNutrient; // g
  choline?: FuzzyNutrient; // mg
  vitamin_b7?: FuzzyNutrient; // μg (ビオチン)
  iodine?: FuzzyNutrient; // μg (ヨウ素)
  calcium?: FuzzyNutrient; // mg (カルシウム)
  phosphorus?: FuzzyNutrient; // mg (リン)
  glycine?: FuzzyNutrient; // g (グリシン、コラーゲン、皮、E��、軟骨由来)
  methionine?: FuzzyNutrient; // g (メチオニン、筋肉由来)
  // 食物繊維�E�Evoid Zone用�E�E  fiber?: FuzzyNutrient; // g (食物繊維)
  // 抗栁E��素�E�植物性食品のみ、カーニ�Eア重要E��E  phytates?: FuzzyNutrient; // mg (フィチン酸)
  polyphenols?: FuzzyNutrient; // mg (ポリフェノ�Eル)
  flavonoids?: FuzzyNutrient; // mg (フラボノイチE
  oxalates?: FuzzyNutrient; // mg (シュウ酸)
  lectins?: FuzzyNutrient; // mg (レクチン)
  saponins?: FuzzyNutrient; // mg (サポニン)
  goitrogens?: FuzzyNutrient; // mg (ゴイトロゲン)
  tannins?: FuzzyNutrient; // mg (タンニン)
}

/**
 * 動物タイプごとの食品マスター
 */
export type FoodMaster = {
  beef: Record<string, FoodMasterItem>;
  pork: Record<string, FoodMasterItem>;
  chicken: Record<string, FoodMasterItem>;
  egg: Record<string, FoodMasterItem>;
  fish: Record<string, FoodMasterItem>;
  dairy: Record<string, FoodMasterItem>;
  fat: Record<string, FoodMasterItem>;
  plant?: Record<string, FoodMasterItem>; // 植物性食品�E�Evoid Zone用�E�E};

/**
 * 食品マスターチE�Eタ
 */
export const FOOD_MASTER: FoodMaster = {
  beef: {
    ribeye: {
      id: 'beef_ribeye',
      name: 'Ribeye Steak',
      name_ja: '牛リブアイ',
      name_fr: 'Entrecôte',
      name_de: 'Rippensteak',
      protein: { value: 20, min: 18, max: 22 }, // per 100g
      fat: { value: 22, min: 18, max: 28 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300, // g
      saturated_fat: { value: 9, min: 7, max: 11 },
      omega_6: { value: 0.4, min: 0.2, max: 0.6 },
      zinc: { value: 4.5, min: 3.5, max: 5.5 },
      vitamin_b12: { value: 2.8, min: 2.0, max: 3.5 },
      iron: { value: 2.5, min: 2.0, max: 3.0 },
      sodium: { value: 50, min: 30, max: 70 },
      magnesium: { value: 20, min: 15, max: 25 },
      potassium: { value: 350, min: 300, max: 400 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 }, // IU/100g�E�赤身肉には少なぁE��E      vitamin_d: { value: 0.1, min: 0.05, max: 0.2 }, // IU/100g�E�微量、USDAチE�Eタ�E�E      vitamin_k2: { value: 1.5, min: 1.0, max: 2.0 }, // μg/100g�E�脂肪刁E��来の微量値�E�E      omega_3: { value: 0.05, min: 0.03, max: 0.08 }, // g/100g�E�牧草牛はより高い�E�E      choline: { value: 80, min: 70, max: 90 }, // mg/100g
      // グリシン:メチオニン比（筋肉肉�Eメチオニンが多い�E�E      glycine: { value: 0.8, min: 0.7, max: 0.9 }, // g/100g�E�筋肉肉には少なぁE��E      methionine: { value: 0.5, min: 0.45, max: 0.55 }, // g/100g�E�筋肉肉には多い�E�E    },
    sirloin: {
      id: 'beef_sirloin',
      name: 'Sirloin Steak',
      name_ja: '牛サーロイン',
      name_fr: 'Faux-filet',
      name_de: 'Rinderfilet',
      protein: { value: 22, min: 20, max: 24 },
      fat: { value: 12, min: 8, max: 16 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300,
      saturated_fat: { value: 5, min: 3, max: 7 },
      omega_6: { value: 0.3, min: 0.2, max: 0.5 },
      zinc: { value: 4.0, min: 3.0, max: 5.0 },
      vitamin_b12: { value: 2.5, min: 2.0, max: 3.0 },
      iron: { value: 2.3, min: 2.0, max: 2.8 },
      sodium: { value: 45, min: 30, max: 60 },
      magnesium: { value: 22, min: 18, max: 26 },
      potassium: { value: 360, min: 320, max: 400 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0, min: 0, max: 0 },
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 85, min: 75, max: 95 }, // mg/100g
    },
    ground: {
      id: 'beef_ground',
      name: 'Ground Beef',
      name_ja: '牛�Eき肉',
      name_fr: 'Bœuf haché',
      name_de: 'Rinderhackfleisch',
      protein: { value: 18, min: 16, max: 20 },
      fat: { value: 20, min: 15, max: 25 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 450, // 1 pound = 450g
      saturated_fat: { value: 8, min: 6, max: 10 },
      omega_6: { value: 0.5, min: 0.3, max: 0.7 },
      zinc: { value: 4.2, min: 3.5, max: 5.0 },
      vitamin_b12: { value: 2.2, min: 1.8, max: 2.6 },
      iron: { value: 2.0, min: 1.5, max: 2.5 },
      sodium: { value: 60, min: 40, max: 80 },
      magnesium: { value: 18, min: 15, max: 21 },
      potassium: { value: 340, min: 300, max: 380 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.1, min: 0.05, max: 0.2 }, // IU/100g�E�微量、USDAチE�Eタ�E�E      vitamin_k2: { value: 1.5, min: 1.0, max: 2.0 }, // μg/100g�E�脂肪刁E��来の微量値�E�E      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 75, min: 65, max: 85 }, // mg/100g
    },
    brisket: {
      id: 'beef_brisket',
      name: 'Brisket',
      name_ja: '牛バラ / ブリスケチE��',
      name_fr: 'Poitrine de bœuf',
      name_de: 'Rinderbrust',
      protein: { value: 14, min: 12, max: 16 },
      fat: { value: 35, min: 30, max: 40 },
      carbs: { value: 0.1, min: 0, max: 0.3 },
      default_unit: 300,
      saturated_fat: { value: 15, min: 12, max: 18 },
      omega_6: { value: 0.8, min: 0.5, max: 1.0 },
      zinc: { value: 3.2, min: 2.5, max: 4.0 },
      vitamin_b12: { value: 2.0, min: 1.5, max: 2.5 },
      iron: { value: 1.8, min: 1.5, max: 2.2 },
      sodium: { value: 55, min: 40, max: 70 },
      magnesium: { value: 15, min: 12, max: 18 },
      potassium: { value: 320, min: 280, max: 360 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.1, min: 0.05, max: 0.2 }, // IU/100g�E�微量、USDAチE�Eタ�E�E      vitamin_k2: { value: 2.0, min: 1.5, max: 2.5 }, // μg/100g�E�脂肪刁E��来の微量値、バラはより高い�E�E      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 70, min: 60, max: 80 }, // mg/100g
    },
    chuck: {
      id: 'beef_chuck',
      name: 'Chuck Roast',
      name_ja: '牛肩ロース',
      name_fr: 'Palette de bœuf',
      name_de: 'Rinderschulter',
      protein: { value: 19, min: 17, max: 21 },
      fat: { value: 16, min: 12, max: 20 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300,
      saturated_fat: { value: 7, min: 5, max: 9 },
      omega_6: { value: 0.5, min: 0.3, max: 0.7 },
      zinc: { value: 3.8, min: 3.0, max: 4.5 },
      vitamin_b12: { value: 2.3, min: 1.8, max: 2.8 },
      iron: { value: 2.2, min: 1.8, max: 2.6 },
      sodium: { value: 50, min: 35, max: 65 },
      magnesium: { value: 19, min: 16, max: 22 },
      potassium: { value: 355, min: 320, max: 390 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.1, min: 0.05, max: 0.2 }, // IU/100g�E�微量、USDAチE�Eタ�E�E      vitamin_k2: { value: 1.2, min: 0.8, max: 1.6 }, // μg/100g�E�脂肪刁E��来の微量値�E�E      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 82, min: 72, max: 92 }, // mg/100g
    },
    liver: {
      id: 'beef_liver',
      name: 'Beef Liver',
      name_ja: '牛レバ�E',
      name_fr: 'Foie de bœuf',
      name_de: 'Rinderleber',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 3.6, min: 2.5, max: 5.0 },
      carbs: { value: 3.9, min: 3.0, max: 5.0 },
      default_unit: 100, // レバ�Eは少量
      saturated_fat: { value: 1.5, min: 1.0, max: 2.0 },
      omega_6: { value: 0.2, min: 0.1, max: 0.3 },
      zinc: { value: 4.0, min: 3.5, max: 4.5 },
      vitamin_b12: { value: 59.3, min: 50, max: 70 }, // 非常に高い
      iron: { value: 6.2, min: 5.0, max: 7.5 },
      sodium: { value: 70, min: 50, max: 90 },
      magnesium: { value: 18, min: 15, max: 21 },
      // レバ�Eは脂溶性ビタミンの宝庫
      vitamin_a: { value: 49678, min: 45000, max: 55000 }, // IU/100g�E�非常に高い�E�E      vitamin_d: { value: 49, min: 40, max: 60 }, // IU/100g
      vitamin_k2: { value: 0, min: 0, max: 0 }, // レバ�EにはK1はあるがK2は少なぁE      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      // レバ�EはCholineが非常に豊寁E      choline: { value: 350, min: 320, max: 380 }, // mg/100g
    },
  },
  pork: {
    belly: {
      id: 'pork_belly',
      name: 'Pork Belly',
      name_ja: '豚バラ',
      name_fr: 'Poitrine de porc',
      name_de: 'Schweinebauch',
      protein: { value: 14.2, min: 12, max: 16 },
      fat: { value: 34.6, min: 30, max: 40 },
      carbs: { value: 0.1, min: 0, max: 0.3 },
      default_unit: 300,
      saturated_fat: { value: 11, min: 9, max: 13 },
      omega_6: { value: 3.5, min: 2.5, max: 4.5 }, // 高い
      zinc: { value: 1.5, min: 1.0, max: 2.0 },
      vitamin_b12: { value: 0.6, min: 0.4, max: 0.8 },
      iron: { value: 0.8, min: 0.5, max: 1.2 },
      sodium: { value: 50, min: 30, max: 70 },
      magnesium: { value: 15, min: 12, max: 18 },
      potassium: { value: 200, min: 180, max: 220 }, // mg/100g
      // 豚バラは脂溶性ビタミンを含む�E�ラード由来�E�E      vitamin_a: { value: 0, min: 0, max: 0 }, // 豚バラにはビタミンAはほとんど含まれなぁE      vitamin_d: { value: 2.5, min: 2.0, max: 3.0 }, // IU/100g�E�ラード由来の微量値�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.2, min: 0.15, max: 0.25 },
      choline: { value: 60, min: 50, max: 70 }, // mg/100g
    },
    loin: {
      id: 'pork_loin',
      name: 'Pork Loin',
      name_ja: '豚ロース',
      name_fr: 'Longe de porc',
      name_de: 'Schweinelende',
      protein: { value: 22, min: 20, max: 24 },
      fat: { value: 10, min: 7, max: 13 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300,
      saturated_fat: { value: 3.5, min: 2.5, max: 4.5 },
      omega_6: { value: 1.8, min: 1.2, max: 2.4 },
      zinc: { value: 2.0, min: 1.5, max: 2.5 },
      vitamin_b12: { value: 0.7, min: 0.5, max: 0.9 },
      iron: { value: 0.9, min: 0.7, max: 1.2 },
      sodium: { value: 55, min: 40, max: 70 },
      magnesium: { value: 20, min: 17, max: 23 },
      potassium: { value: 300, min: 270, max: 330 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.5, min: 0.3, max: 0.7 }, // IU/100g�E�ラード由来の微量値�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      choline: { value: 75, min: 65, max: 85 }, // mg/100g
    },
    shoulder: {
      id: 'pork_shoulder',
      name: 'Pork Shoulder',
      name_ja: '豚肩ロース',
      name_fr: 'Épaule de porc',
      name_de: 'Schweineschulter',
      protein: { value: 18, min: 16, max: 20 },
      fat: { value: 20, min: 16, max: 24 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300,
      saturated_fat: { value: 7, min: 5, max: 9 },
      omega_6: { value: 2.5, min: 1.8, max: 3.2 },
      zinc: { value: 1.8, min: 1.3, max: 2.3 },
      vitamin_b12: { value: 0.65, min: 0.5, max: 0.8 },
      iron: { value: 0.85, min: 0.6, max: 1.1 },
      sodium: { value: 52, min: 38, max: 66 },
      magnesium: { value: 18, min: 15, max: 21 },
      potassium: { value: 290, min: 260, max: 320 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.6, min: 0.4, max: 0.8 }, // IU/100g�E�ラード由来の微量値�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      choline: { value: 70, min: 60, max: 80 }, // mg/100g
    },
    ribs: {
      id: 'pork_ribs',
      name: 'Pork Ribs',
      name_ja: '豚スペアリチE,
      name_fr: 'Côtes de porc',
      name_de: 'Schweinerippchen',
      protein: { value: 16, min: 14, max: 18 },
      fat: { value: 28, min: 24, max: 32 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 300,
      saturated_fat: { value: 9, min: 7, max: 11 },
      omega_6: { value: 3.0, min: 2.2, max: 3.8 },
      zinc: { value: 1.6, min: 1.2, max: 2.0 },
      vitamin_b12: { value: 0.6, min: 0.4, max: 0.8 },
      iron: { value: 0.8, min: 0.6, max: 1.0 },
      sodium: { value: 48, min: 35, max: 65 },
      magnesium: { value: 16, min: 13, max: 19 },
      potassium: { value: 275, min: 245, max: 305 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0.7, min: 0.5, max: 0.9 }, // IU/100g�E�ラード由来の微量値�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      choline: { value: 65, min: 55, max: 75 }, // mg/100g
    },
    liver: {
      id: 'pork_liver',
      name: 'Pork Liver',
      name_ja: '豚レバ�E',
      name_fr: 'Foie de porc',
      name_de: 'Schweineleber',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 4.0, min: 3.0, max: 5.5 },
      carbs: { value: 3.0, min: 2.0, max: 4.0 },
      default_unit: 100,
      saturated_fat: { value: 1.5, min: 1.0, max: 2.0 },
      omega_6: { value: 0.5, min: 0.3, max: 0.7 },
      zinc: { value: 3.0, min: 2.5, max: 3.5 },
      vitamin_b12: { value: 26.0, min: 22, max: 30 },
      iron: { value: 15.0, min: 12, max: 18 }, // 非常に高い
      sodium: { value: 75, min: 55, max: 95 },
      magnesium: { value: 17, min: 14, max: 20 },
      potassium: { value: 230, min: 200, max: 260 }, // mg/100g
      // 豚レバ�Eも脂溶性ビタミンが豊富（牛レバ�EよりめE��低い�E�E      vitamin_a: { value: 32976, min: 30000, max: 36000 }, // IU/100g�E�非常に高い�E�E      vitamin_d: { value: 23, min: 20, max: 26 }, // IU/100g
      vitamin_k2: { value: 0, min: 0, max: 0 }, // レバ�EにはK1はあるがK2は少なぁE      omega_3: { value: 0.15, min: 0.1, max: 0.2 },
      choline: { value: 320, min: 290, max: 350 }, // mg/100g�E�非常に高い�E�E    },
  },
  chicken: {
    breast: {
      id: 'chicken_breast',
      name: 'Chicken Breast',
      name_ja: '鶏�E肁E,
      name_fr: 'Blanc de poulet',
      name_de: 'Hähnchenbrust',
      protein: { value: 31, min: 29, max: 33 },
      fat: { value: 3.6, min: 2.5, max: 5.0 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 200,
      saturated_fat: { value: 1.0, min: 0.7, max: 1.5 },
      omega_6: { value: 0.6, min: 0.4, max: 0.8 },
      zinc: { value: 0.9, min: 0.7, max: 1.2 },
      vitamin_b12: { value: 0.3, min: 0.2, max: 0.4 },
      iron: { value: 0.7, min: 0.5, max: 0.9 },
      sodium: { value: 70, min: 50, max: 90 },
      magnesium: { value: 28, min: 24, max: 32 },
      potassium: { value: 220, min: 200, max: 240 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0, min: 0, max: 0 },
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 65, min: 55, max: 75 }, // mg/100g
    },
    thigh: {
      id: 'chicken_thigh',
      name: 'Chicken Thigh',
      name_ja: '鶏もも肉',
      name_fr: 'Cuisse de poulet',
      name_de: 'Hähnchenschenkel',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 15, min: 12, max: 18 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 200,
      saturated_fat: { value: 4.0, min: 3.0, max: 5.0 },
      omega_6: { value: 2.5, min: 2.0, max: 3.0 },
      zinc: { value: 1.5, min: 1.2, max: 1.8 },
      vitamin_b12: { value: 0.4, min: 0.3, max: 0.5 },
      iron: { value: 0.9, min: 0.7, max: 1.2 },
      sodium: { value: 75, min: 55, max: 95 },
      magnesium: { value: 20, min: 17, max: 23 },
      potassium: { value: 240, min: 210, max: 270 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0, min: 0, max: 0 },
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 70, min: 60, max: 80 }, // mg/100g
    },
    wing: {
      id: 'chicken_wing',
      name: 'Chicken Wing',
      name_ja: '鶏手羽',
      name_fr: 'Aile de poulet',
      name_de: 'Hähnchenflügel',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 15, min: 12, max: 18 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 150,
      saturated_fat: { value: 4.0, min: 3.0, max: 5.0 },
      omega_6: { value: 2.5, min: 2.0, max: 3.0 },
      zinc: { value: 1.5, min: 1.2, max: 1.8 },
      vitamin_b12: { value: 0.4, min: 0.3, max: 0.5 },
      iron: { value: 0.9, min: 0.7, max: 1.2 },
      sodium: { value: 75, min: 55, max: 95 },
      magnesium: { value: 20, min: 17, max: 23 },
      potassium: { value: 240, min: 210, max: 270 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0, min: 0, max: 0 },
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 70, min: 60, max: 80 }, // mg/100g
    },
    liver: {
      id: 'chicken_liver',
      name: 'Chicken Liver',
      name_ja: '鶏レバ�E',
      name_fr: 'Foie de poulet',
      name_de: 'Hähnchenleber',
      protein: { value: 18.9, min: 17, max: 21 },
      fat: { value: 3.1, min: 2.0, max: 4.5 },
      carbs: { value: 0.6, min: 0.3, max: 1.0 },
      default_unit: 100,
      saturated_fat: { value: 1.0, min: 0.7, max: 1.5 },
      omega_6: { value: 0.5, min: 0.3, max: 0.7 },
      zinc: { value: 3.3, min: 2.8, max: 3.8 },
      vitamin_b12: { value: 44.4, min: 38, max: 50 }, // 非常に高い
      iron: { value: 9.0, min: 7.5, max: 11.0 },
      sodium: { value: 80, min: 60, max: 100 },
      magnesium: { value: 16, min: 13, max: 19 },
      // 鶏レバ�Eも脂溶性ビタミンが豊寁E      vitamin_a: { value: 32976, min: 30000, max: 36000 }, // IU/100g�E�非常に高い�E�E      vitamin_d: { value: 49, min: 40, max: 60 }, // IU/100g
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      // 鶏レバ�EめEholineが豊寁E      choline: { value: 290, min: 270, max: 310 }, // mg/100g
    },
    whole: {
      id: 'chicken_whole',
      name: 'Whole Chicken',
      name_ja: '鶏丸ごと',
      name_fr: 'Poulet entier',
      name_de: 'Ganzes Hähnchen',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 12, min: 9, max: 15 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 1000, // 1kg
      saturated_fat: { value: 3.5, min: 2.5, max: 4.5 },
      omega_6: { value: 2.0, min: 1.5, max: 2.5 },
      zinc: { value: 1.2, min: 1.0, max: 1.5 },
      vitamin_b12: { value: 0.35, min: 0.25, max: 0.45 },
      iron: { value: 0.8, min: 0.6, max: 1.0 },
      sodium: { value: 72, min: 52, max: 92 },
      magnesium: { value: 19, min: 16, max: 22 },
      potassium: { value: 248, min: 220, max: 275 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 },
      vitamin_d: { value: 0, min: 0, max: 0 },
      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.05, min: 0.03, max: 0.08 },
      choline: { value: 68, min: 58, max: 78 }, // mg/100g
    },
  },
  egg: {
    whole: {
      id: 'egg_whole',
      name: 'Whole Egg',
      name_ja: '卵�E��E卵�E�E,
      name_fr: 'Œuf entier',
      name_de: 'Volles Ei',
      protein: { value: 12.5, min: 11, max: 14 },
      fat: { value: 10.0, min: 8, max: 12 },
      carbs: { value: 0.7, min: 0.5, max: 1.0 },
      default_unit: 50, // 1倁E= 50g
      saturated_fat: { value: 3.1, min: 2.5, max: 3.7 },
      omega_6: { value: 1.2, min: 1.0, max: 1.5 },
      zinc: { value: 1.0, min: 0.8, max: 1.2 },
      vitamin_b12: { value: 0.9, min: 0.7, max: 1.1 },
      iron: { value: 1.5, min: 1.2, max: 1.8 },
      sodium: { value: 140, min: 120, max: 160 },
      magnesium: { value: 10, min: 8, max: 12 },
      potassium: { value: 138, min: 120, max: 155 }, // mg/100g
      // 卵は脂溶性ビタミンの宝庫�E�特に卵黁E��E      vitamin_a: { value: 540, min: 480, max: 600 }, // IU/100g�E�卵黁E��来�E�E      vitamin_d: { value: 87, min: 80, max: 95 }, // IU/100g�E�卵黁E��来�E�E      vitamin_k2: { value: 5.4, min: 4.8, max: 6.0 }, // μg/100g�E�EK-4、卵黁E��来�E�E      omega_3: { value: 0.2, min: 0.15, max: 0.25 }, // g�E�放牧卵はより高い�E�E      choline: { value: 251, min: 230, max: 270 }, // mg/100g�E�非常に高い�E�E      vitamin_b7: { value: 20, min: 18, max: 22 }, // μg/100g�E�ビオチン、卵黁E��豊富！E    },
    yolk: {
      id: 'egg_yolk',
      name: 'Egg Yolk',
      name_ja: '卵黁E,
      name_fr: "Jaune d'œuf",
      name_de: 'Eigelb',
      protein: { value: 16.0, min: 14, max: 18 },
      fat: { value: 26.5, min: 24, max: 29 },
      carbs: { value: 0.3, min: 0.2, max: 0.5 },
      default_unit: 17, // 1個�E卵黁E= 17g
      saturated_fat: { value: 9.5, min: 8, max: 11 },
      omega_6: { value: 1.8, min: 1.5, max: 2.1 },
      zinc: { value: 2.3, min: 2.0, max: 2.6 },
      vitamin_b12: { value: 1.8, min: 1.5, max: 2.1 },
      iron: { value: 2.7, min: 2.3, max: 3.1 },
      sodium: { value: 8, min: 6, max: 10 },
      magnesium: { value: 5, min: 4, max: 6 },
      // 卵黁E�E脂溶性ビタミンの宝庫
      vitamin_a: { value: 1442, min: 1300, max: 1600 }, // IU/100g�E�非常に高い�E�E      vitamin_d: { value: 218, min: 200, max: 240 }, // IU/100g�E�非常に高い�E�E      vitamin_k2: { value: 15.5, min: 14, max: 17 }, // μg/100g�E�EK-4�E�E      omega_3: { value: 0.5, min: 0.4, max: 0.6 }, // g�E�放牧卵はより高い�E�E      // 卵黁E�ECholineが非常に豊寁E      choline: { value: 680, min: 650, max: 710 }, // mg/100g�E�非常に高い�E�E      vitamin_b7: { value: 50, min: 45, max: 55 }, // μg/100g�E�ビオチン、卵黁E��非常に豊富！E    },
    white: {
      id: 'egg_white',
      name: 'Egg White',
      name_ja: '卵白',
      name_fr: "Blanc d'œuf",
      name_de: 'EiweiÁE,
      protein: { value: 10.9, min: 9.5, max: 12 },
      fat: { value: 0.2, min: 0.1, max: 0.3 },
      carbs: { value: 0.7, min: 0.5, max: 1.0 },
      default_unit: 33, // 1個�E卵白 = 33g
      saturated_fat: { value: 0, min: 0, max: 0.1 },
      omega_6: { value: 0, min: 0, max: 0.1 },
      zinc: { value: 0.1, min: 0.05, max: 0.15 },
      vitamin_b12: { value: 0.1, min: 0.05, max: 0.15 },
      iron: { value: 0.1, min: 0.05, max: 0.15 },
      sodium: { value: 166, min: 150, max: 180 },
      magnesium: { value: 11, min: 9, max: 13 },
      potassium: { value: 163, min: 150, max: 175 }, // mg/100g
      vitamin_a: { value: 0, min: 0, max: 0 }, // 卵白にはビタミンAは含まれなぁE      vitamin_d: { value: 0, min: 0, max: 0 }, // 卵白にはビタミンDは含まれなぁE      vitamin_k2: { value: 0, min: 0, max: 0 }, // 卵白にはビタミンK2は含まれなぁE      omega_3: { value: 0, min: 0, max: 0 },
      choline: { value: 0.4, min: 0.3, max: 0.5 }, // mg/100g�E�非常に少なぁE��E      vitamin_b7: { value: 0, min: 0, max: 0 }, // μg/100g�E�卵白にはビオチンは含まれなぁE��アビジンが含まれる�E�E    },
  },
  fish: {
    salmon: {
      id: 'fish_salmon',
      name: 'Salmon',
      name_ja: 'サーモン',
      name_fr: 'Saumon',
      name_de: 'Lachs',
      protein: { value: 20, min: 18, max: 22 },
      fat: { value: 12, min: 10, max: 14 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 200,
      saturated_fat: { value: 2.5, min: 2.0, max: 3.0 },
      omega_6: { value: 0.2, min: 0.1, max: 0.3 },
      zinc: { value: 0.5, min: 0.4, max: 0.6 },
      vitamin_b12: { value: 4.9, min: 4.0, max: 5.8 },
      iron: { value: 0.8, min: 0.6, max: 1.0 },
      sodium: { value: 44, min: 35, max: 55 },
      magnesium: { value: 27, min: 23, max: 31 },
      potassium: { value: 363, min: 330, max: 395 }, // mg/100g
      // サーモンはビタミンDが非常に豊寁E      vitamin_a: { value: 58, min: 50, max: 65 }, // IU/100g�E�微量！E      vitamin_d: { value: 988, min: 900, max: 1100 }, // IU/100g�E�非常に高い�E�E      vitamin_k2: { value: 0.5, min: 0.3, max: 0.7 }, // μg/100g�E�微量！E      omega_3: { value: 2.3, min: 2.0, max: 2.6 }, // g�E�非常に高い�E�E      choline: { value: 75, min: 65, max: 85 }, // mg/100g
      iodine: { value: 35, min: 30, max: 40 }, // μg/100g�E�サーモンはヨウ素が豊富！E    },
    tuna: {
      id: 'fish_tuna',
      name: 'Tuna',
      name_ja: 'マグロ',
      name_fr: 'Thon',
      name_de: 'Thunfisch',
      protein: { value: 24, min: 22, max: 26 },
      fat: { value: 1.0, min: 0.5, max: 1.5 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 200,
      saturated_fat: { value: 0.3, min: 0.2, max: 0.4 },
      omega_6: { value: 0.1, min: 0.05, max: 0.15 },
      zinc: { value: 0.8, min: 0.6, max: 1.0 },
      vitamin_b12: { value: 9.0, min: 7.5, max: 10.5 },
      iron: { value: 1.0, min: 0.8, max: 1.2 },
      sodium: { value: 37, min: 30, max: 45 },
      magnesium: { value: 30, min: 25, max: 35 },
      potassium: { value: 323, min: 290, max: 355 }, // mg/100g
      vitamin_a: { value: 60, min: 50, max: 70 }, // IU/100g�E�微量！E      vitamin_d: { value: 227, min: 200, max: 250 }, // IU/100g�E�高い�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.2, min: 0.15, max: 0.25 }, // g
      choline: { value: 65, min: 55, max: 75 }, // mg/100g
      iodine: { value: 50, min: 45, max: 55 }, // μg/100g�E��Eグロはヨウ素が非常に豊富！E    },
    mackerel: {
      id: 'fish_mackerel',
      name: 'Mackerel',
      name_ja: 'サチE,
      name_fr: 'Maquereau',
      name_de: 'Makrele',
      protein: { value: 19, min: 17, max: 21 },
      fat: { value: 12.6, min: 11, max: 14 },
      carbs: { value: 0, min: 0, max: 0.5 },
      default_unit: 200,
      saturated_fat: { value: 3.3, min: 2.8, max: 3.8 },
      omega_6: { value: 0.2, min: 0.15, max: 0.25 },
      zinc: { value: 0.6, min: 0.5, max: 0.7 },
      vitamin_b12: { value: 8.7, min: 7.5, max: 10 },
      iron: { value: 1.6, min: 1.3, max: 1.9 },
      sodium: { value: 63, min: 50, max: 75 },
      magnesium: { value: 25, min: 21, max: 29 },
      potassium: { value: 314, min: 280, max: 350 }, // mg/100g
      vitamin_a: { value: 50, min: 40, max: 60 }, // IU/100g�E�微量！E      vitamin_d: { value: 360, min: 320, max: 400 }, // IU/100g�E�高い�E�E      vitamin_k2: { value: 0.1, min: 0, max: 0.2 }, // μg/100g�E�微量！E      omega_3: { value: 2.6, min: 2.3, max: 2.9 }, // g�E�非常に高い�E�E      choline: { value: 65, min: 55, max: 75 }, // mg/100g
      iodine: { value: 25, min: 20, max: 30 }, // μg/100g�E�サバ�Eヨウ素が豊富！E    },
  },
  dairy: {
    egg: {
      id: 'dairy_egg',
      name: 'Egg (Whole)',
      name_ja: '卵�E��E卵�E�E,
      protein: { value: 12.3, min: 11.5, max: 13.0 },
      fat: { value: 10.6, min: 9.5, max: 11.5 },
      carbs: { value: 0.7, min: 0.5, max: 1.0 },
      default_unit: 50, // 1倁E= 50g
      saturated_fat: { value: 3.3, min: 3.0, max: 3.6 },
      omega_6: { value: 1.4, min: 1.2, max: 1.6 },
      zinc: { value: 1.1, min: 0.9, max: 1.3 },
      vitamin_b12: { value: 0.9, min: 0.7, max: 1.1 },
      iron: { value: 1.8, min: 1.5, max: 2.1 },
      sodium: { value: 140, min: 130, max: 150 },
      magnesium: { value: 12, min: 10, max: 14 },
      // 卵�E��E卵�E��E脂溶性ビタミンが豊寁E      vitamin_a: { value: 540, min: 480, max: 600 }, // IU/100g
      vitamin_d: { value: 87, min: 80, max: 95 }, // IU/100g
      vitamin_k2: { value: 31.4, min: 28, max: 35 }, // μg/100g�E�EK-4�E�E      omega_3: { value: 0.3, min: 0.2, max: 0.4 }, // g�E�放牧卵はより高い�E�E      // 卵はCholineが豊寁E      choline: { value: 150, min: 140, max: 160 }, // mg/100g
      // カリウム
      potassium: { value: 138, min: 120, max: 155 }, // mg/100g
      // ビタミンB7�E�ビオチン�E�E      vitamin_b7: { value: 20, min: 18, max: 22 }, // μg/100g�E�ビオチン、卵黁E��豊富！E      // ヨウ素
      iodine: { value: 25, min: 20, max: 30 }, // μg/100g�E�卵はヨウ素が豊富！E      // カルシウム、リン
      calcium: { value: 56, min: 50, max: 60 }, // mg/100g�E�卵はカルシウムが豊富！E      phosphorus: { value: 198, min: 180, max: 210 }, // mg/100g�E�卵はリンが豊富！E      // グリシン:メチオニン比（卵はバランスが良ぁE��E      glycine: { value: 0.4, min: 0.35, max: 0.45 }, // g/100g
      methionine: { value: 0.4, min: 0.35, max: 0.45 }, // g/100g�E�卵は1:1に近い�E�E    },
    cheese: {
      id: 'dairy_cheese',
      name: 'Cheese',
      name_ja: 'チ�Eズ',
      name_fr: 'Fromage',
      name_de: 'Käse',
      protein: { value: 25, min: 23, max: 27 },
      fat: { value: 33, min: 30, max: 36 },
      carbs: { value: 1, min: 0.5, max: 2 },
      default_unit: 100,
      saturated_fat: { value: 21, min: 19, max: 23 },
      omega_6: { value: 0.8, min: 0.6, max: 1.0 },
      zinc: { value: 3.1, min: 2.8, max: 3.5 },
      vitamin_b12: { value: 0.8, min: 0.6, max: 1.0 },
      iron: { value: 0.7, min: 0.5, max: 0.9 },
      sodium: { value: 650, min: 600, max: 700 },
      magnesium: { value: 25, min: 22, max: 28 },
      potassium: { value: 98, min: 85, max: 110 }, // mg/100g
      // チ�Eズは脂溶性ビタミンを含む�E�特にビタミンK2�E�E      vitamin_a: { value: 1002, min: 900, max: 1100 }, // IU/100g�E�高い�E�E      vitamin_d: { value: 24, min: 20, max: 28 }, // IU/100g
      vitamin_k2: { value: 76, min: 70, max: 82 }, // μg/100g�E�EK-4、E��常に高い�E�E      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      choline: { value: 15, min: 12, max: 18 }, // mg/100g
    },
    heavy_cream: {
      id: 'dairy_heavy_cream',
      name: 'Heavy Cream',
      name_ja: '生クリーム',
      name_fr: 'Crème épaisse',
      name_de: 'Schlagsahne',
      protein: { value: 2.8, min: 2.5, max: 3.0 },
      fat: { value: 37, min: 35, max: 40 },
      carbs: { value: 2.8, min: 2.5, max: 3.0 },
      default_unit: 100,
      saturated_fat: { value: 23, min: 21, max: 25 },
      omega_6: { value: 0.6, min: 0.5, max: 0.7 },
      zinc: { value: 0.2, min: 0.15, max: 0.25 },
      vitamin_b12: { value: 0.2, min: 0.15, max: 0.25 },
      iron: { value: 0.03, min: 0.02, max: 0.04 },
      sodium: { value: 27, min: 25, max: 30 },
      magnesium: { value: 7, min: 6, max: 8 },
      potassium: { value: 132, min: 120, max: 145 }, // mg/100g
      vitamin_a: { value: 1387, min: 1300, max: 1500 }, // IU/100g�E�高い�E�E      vitamin_d: { value: 7, min: 5, max: 9 }, // IU/100g�E�微量！E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.1, min: 0.05, max: 0.15 },
      choline: { value: 19, min: 17, max: 21 }, // mg/100g
    },
    butter: {
      id: 'dairy_butter',
      name: 'Butter',
      name_ja: 'バター',
      name_fr: 'Beurre',
      name_de: 'Butter',
      protein: { value: 0.9, min: 0.7, max: 1.1 },
      fat: { value: 81, min: 80, max: 82 },
      carbs: { value: 0.1, min: 0, max: 0.2 },
      default_unit: 100,
      saturated_fat: { value: 51, min: 50, max: 52 },
      omega_6: { value: 2.7, min: 2.5, max: 3.0 },
      zinc: { value: 0.1, min: 0.05, max: 0.15 },
      vitamin_b12: { value: 0.2, min: 0.15, max: 0.25 },
      iron: { value: 0.02, min: 0.01, max: 0.03 },
      sodium: { value: 11, min: 10, max: 12 },
      magnesium: { value: 2, min: 1.5, max: 2.5 },
      potassium: { value: 24, min: 20, max: 28 }, // mg/100g
      // バターは脂溶性ビタミンを含む
      vitamin_a: { value: 2499, min: 2300, max: 2700 }, // IU/100g�E�非常に高い�E�E      vitamin_d: { value: 60, min: 50, max: 70 }, // IU/100g
      vitamin_k2: { value: 15, min: 12, max: 18 }, // μg/100g�E�EK-4�E�E      omega_3: { value: 0.3, min: 0.2, max: 0.4 },
      choline: { value: 19, min: 17, max: 21 }, // mg/100g
    },
  },
  fat: {
    tallow: {
      id: 'fat_tallow',
      name: 'Beef Tallow',
      name_ja: '牛脂',
      name_fr: 'Suif de bœuf',
      name_de: 'Rindertalg',
      protein: { value: 0, min: 0, max: 0 },
      fat: { value: 100, min: 99, max: 100 },
      carbs: { value: 0, min: 0, max: 0 },
      default_unit: 100,
      saturated_fat: { value: 50, min: 48, max: 52 },
      omega_6: { value: 0.5, min: 0.4, max: 0.6 },
      zinc: { value: 0, min: 0, max: 0 },
      vitamin_b12: { value: 0, min: 0, max: 0 },
      iron: { value: 0, min: 0, max: 0 },
      sodium: { value: 0, min: 0, max: 0 },
      magnesium: { value: 0, min: 0, max: 0 },
      // 牛脂は脂溶性ビタミンの宝庫�E�特にビタミンDが豊富！E      vitamin_a: { value: 0, min: 0, max: 0 }, // 牛脂自体には含まれなぁE��、加熱時に溶出
      vitamin_d: { value: 101, min: 90, max: 112 }, // IU/100g�E�牧草牛の脂�E特に高い�E�E      vitamin_k2: { value: 0, min: 0, max: 0 },
      omega_3: { value: 0.3, min: 0.2, max: 0.4 }, // g�E�牧草牛の脂にはオメガ3が含まれる�E�E    },
    ghee: {
      id: 'fat_ghee',
      name: 'Ghee',
      name_ja: 'ギー',
      name_fr: 'Ghee',
      name_de: 'Ghee',
      protein: { value: 0, min: 0, max: 0 },
      fat: { value: 100, min: 99, max: 100 },
      carbs: { value: 0, min: 0, max: 0 },
      default_unit: 100,
      saturated_fat: { value: 65, min: 63, max: 67 },
      omega_6: { value: 2.9, min: 2.7, max: 3.1 },
      zinc: { value: 0, min: 0, max: 0 },
      vitamin_b12: { value: 0, min: 0, max: 0 },
      iron: { value: 0, min: 0, max: 0 },
      sodium: { value: 0, min: 0, max: 0 },
      magnesium: { value: 0, min: 0, max: 0 },
      potassium: { value: 0, min: 0, max: 0 },
      // ギーはバターを精製したも�Eなので、バターよりビタミン含有量は低い
      vitamin_a: { value: 3069, min: 2800, max: 3300 }, // IU/100g�E�高い、バターよりめE��高い�E�E      vitamin_d: { value: 0, min: 0, max: 0 }, // ギーにはビタミンDは含まれなぁE��精製過程で失われる！E      vitamin_k2: { value: 0, min: 0, max: 0 }, // ギーにはビタミンK2は含まれなぁE      omega_3: { value: 0.3, min: 0.2, max: 0.4 },
      choline: { value: 0, min: 0, max: 0 },
    },
    salt: {
      id: 'fat_salt',
      name: 'Salt',
      name_ja: '塩',
      name_fr: 'Sel',
      name_de: 'Salz',
      protein: { value: 0, min: 0, max: 0 },
      fat: { value: 0, min: 0, max: 0 },
      carbs: { value: 0, min: 0, max: 0 },
      default_unit: 5, // チE��ォルチEg
      saturated_fat: { value: 0, min: 0, max: 0 },
      omega_6: { value: 0, min: 0, max: 0 },
      zinc: { value: 0, min: 0, max: 0 },
      vitamin_b12: { value: 0, min: 0, max: 0 },
      iron: { value: 0, min: 0, max: 0 },
      sodium: { value: 38758, min: 38500, max: 39000 }, // 塩5g = 紁E940mg Na
      magnesium: { value: 2, min: 1.5, max: 2.5 },
      // ぬちまーす（沖縁E�E塩�E��Eヨウ素が豊富（通常の食塩より高い�E�E      iodine: { value: 200, min: 180, max: 220 }, // μg/100g�E�ぬちまーす�E特に高い、E��常の食塩は0-10μg/100g�E�E      potassium: { value: 0, min: 0, max: 0 },
    },
  },
  plant: {
    // 植物性食品�E�Evoid Zone用、抗栁E��素チE�Eタ含む�E�E    soybean: {
      id: 'plant_soybean',
      name: 'Soybean',
      name_ja: '大豁E,
      protein: { value: 35.0, min: 33.0, max: 37.0 },
      fat: { value: 19.9, min: 18.0, max: 21.8 },
      carbs: { value: 30.2, min: 28.0, max: 32.4 },
      default_unit: 100,
      fiber: { value: 15.7, min: 14.0, max: 17.4 },
      // 抗栁E��素
      phytates: { value: 1500, min: 1200, max: 1800 }, // mg/100g�E�フィチン酸�E�E      lectins: { value: 200, min: 150, max: 250 }, // mg/100g�E�レクチン�E�E      saponins: { value: 500, min: 400, max: 600 }, // mg/100g�E�サポニン�E�E      oxalates: { value: 200, min: 150, max: 250 }, // mg/100g�E�シュウ酸�E�E    },
    tofu: {
      id: 'plant_tofu',
      name: 'Tofu',
      name_ja: '豁E�E',
      protein: { value: 8.1, min: 7.5, max: 8.7 },
      fat: { value: 4.8, min: 4.2, max: 5.4 },
      carbs: { value: 1.9, min: 1.5, max: 2.3 },
      default_unit: 100,
      fiber: { value: 0.4, min: 0.2, max: 0.6 },
      // 抗栁E��素�E�加工により減少！E      phytates: { value: 500, min: 300, max: 700 }, // mg/100g�E�フィチン酸、加工により減少！E      lectins: { value: 50, min: 30, max: 70 }, // mg/100g�E�レクチン、加工により減少！E      saponins: { value: 100, min: 50, max: 150 }, // mg/100g�E�サポニン、加工により減少！E    },
    spinach: {
      id: 'plant_spinach',
      name: 'Spinach',
      name_ja: 'ほぁE��ん草',
      protein: { value: 2.9, min: 2.5, max: 3.3 },
      fat: { value: 0.4, min: 0.3, max: 0.5 },
      carbs: { value: 3.6, min: 3.0, max: 4.2 },
      default_unit: 100,
      fiber: { value: 2.2, min: 2.0, max: 2.4 },
      // 抗栁E��素
      oxalates: { value: 970, min: 800, max: 1140 }, // mg/100g�E�シュウ酸、E��常に高い�E�E      goitrogens: { value: 200, min: 150, max: 250 }, // mg/100g�E�ゴイトロゲン�E�E      tannins: { value: 50, min: 30, max: 70 }, // mg/100g�E�タンニン�E�E    },
    nuts: {
      id: 'plant_nuts',
      name: 'Nuts',
      name_ja: 'ナッチE��E,
      protein: { value: 20.0, min: 18.0, max: 22.0 },
      fat: { value: 50.0, min: 45.0, max: 55.0 },
      carbs: { value: 20.0, min: 18.0, max: 22.0 },
      default_unit: 30,
      fiber: { value: 10.0, min: 8.0, max: 12.0 },
      // 抗栁E��素
      phytates: { value: 2000, min: 1500, max: 2500 }, // mg/100g�E�フィチン酸、E��常に高い�E�E      lectins: { value: 300, min: 200, max: 400 }, // mg/100g�E�レクチン�E�E      tannins: { value: 100, min: 50, max: 150 }, // mg/100g�E�タンニン�E�E    },
    grain: {
      id: 'plant_grain',
      name: 'Grain',
      name_ja: '穀物',
      protein: { value: 12.0, min: 10.0, max: 14.0 },
      fat: { value: 2.0, min: 1.5, max: 2.5 },
      carbs: { value: 72.0, min: 70.0, max: 74.0 },
      default_unit: 100,
      fiber: { value: 12.0, min: 10.0, max: 14.0 },
      // 抗栁E��素
      phytates: { value: 3000, min: 2500, max: 3500 }, // mg/100g�E�フィチン酸、E��常に高い�E�E      lectins: { value: 500, min: 400, max: 600 }, // mg/100g�E�レクチン、特に全粒穀物�E�E      saponins: { value: 200, min: 150, max: 250 }, // mg/100g�E�サポニン�E�E    },
  },
};

/**
 * 動物タイプと部位名から食品マスターチE�Eタを取征E */
export function getFoodMasterItem(
  animal: 'beef' | 'pork' | 'chicken' | 'egg' | 'fish' | 'dairy' | 'fat' | 'plant',
  part: string
): FoodMasterItem | undefined {
  return FOOD_MASTER[animal]?.[part];
}

/**
 * 食品IDから食品マスターチE�Eタを取征E */
export function getFoodMasterItemById(id: string): FoodMasterItem | undefined {
  for (const animal of Object.keys(FOOD_MASTER) as Array<keyof FoodMaster>) {
    const animalData = FOOD_MASTER[animal];
    if (!animalData) continue;
    for (const part of Object.keys(animalData)) {
      if (animalData[part]?.id === id) {
        return animalData[part];
      }
    }
  }
  return undefined;
}

/**
 * 動物タイプごとの部位リストを取征E */
export function getPartsByAnimal(
  animal: 'beef' | 'pork' | 'chicken' | 'egg' | 'fish' | 'dairy' | 'fat' | 'plant'
): string[] {
  return Object.keys(FOOD_MASTER[animal] || {});
}

/**
 * 食品名（日本語�E英語対応）から食品マスターチE�Eタを検索
 * 部刁E��致で検索し、最も一致度の高いも�Eを返す
 *
 * 検索優先頁E��E
 * 1. 完�E一致�E�英語名・日本語名�E�E * 2. キーワード�EチE��ング�E�日本語�E英語！E * 3. 部刁E��致�E�英語名・日本語名�E�E * 4. 単語単位�E部刁E��致�E�英語名・日本語名�E�E */
export function searchFoodMasterByName(foodName: string): FoodMasterItem | undefined {
  const lowerName = foodName.toLowerCase().trim();
  if (lowerName.length === 0) return undefined;

  // キーワード�EチE��ング�E�日本語�E英語対応！E  const keywordMap: Record<string, { animal: keyof FoodMaster; part: string }> = {
    // 牛肉�E�日本語！E    リブアイ: { animal: 'beef', part: 'ribeye' },
    リチE { animal: 'beef', part: 'ribeye' },
    サーロイン: { animal: 'beef', part: 'sirloin' },
    スチE�Eキ: { animal: 'beef', part: 'ribeye' },
    牁E { animal: 'beef', part: 'ribeye' },
    牛肉: { animal: 'beef', part: 'ribeye' },
    ひき肉: { animal: 'beef', part: 'ground' },
    牛肉バラ: { animal: 'beef', part: 'brisket' },
    ブリスケチE��: { animal: 'beef', part: 'brisket' },
    牛肉肩ロース: { animal: 'beef', part: 'chuck' },
    レバ�E: { animal: 'beef', part: 'liver' },
    // 牛肉�E�英語！E    ribeye: { animal: 'beef', part: 'ribeye' },
    rib: { animal: 'beef', part: 'ribeye' },
    sirloin: { animal: 'beef', part: 'sirloin' },
    steak: { animal: 'beef', part: 'ribeye' },
    beef: { animal: 'beef', part: 'ribeye' },
    ground: { animal: 'beef', part: 'ground' },
    brisket: { animal: 'beef', part: 'brisket' },
    chuck: { animal: 'beef', part: 'chuck' },
    liver: { animal: 'beef', part: 'liver' },
    // 牛肉�E�フランス語！E    entrecôte: { animal: 'beef', part: 'ribeye' },
    bœuf: { animal: 'beef', part: 'ribeye' },
    foie: { animal: 'beef', part: 'liver' },
    // 牛肉�E�ドイチE��！E    rippensteak: { animal: 'beef', part: 'ribeye' },
    rindfleisch: { animal: 'beef', part: 'ribeye' },
    leber: { animal: 'beef', part: 'liver' },
    // 豚肉�E�日本語！E    豚バラ: { animal: 'pork', part: 'belly' },
    バラ: { animal: 'pork', part: 'belly' },
    豁E { animal: 'pork', part: 'belly' },
    豚肉: { animal: 'pork', part: 'belly' },
    ロース: { animal: 'pork', part: 'loin' },
    肩ロース: { animal: 'pork', part: 'shoulder' },
    スペアリチE { animal: 'pork', part: 'ribs' },
    豚レバ�E: { animal: 'pork', part: 'liver' },
    // 豚肉�E�英語！E    pork: { animal: 'pork', part: 'belly' },
    belly: { animal: 'pork', part: 'belly' },
    loin: { animal: 'pork', part: 'loin' },
    shoulder: { animal: 'pork', part: 'shoulder' },
    ribs: { animal: 'pork', part: 'ribs' },
    // 豚肉�E�フランス語！E    porc: { animal: 'pork', part: 'belly' },
    ventre: { animal: 'pork', part: 'belly' },
    // 豚肉�E�ドイチE��！E    schweinefleisch: { animal: 'pork', part: 'belly' },
    bauch: { animal: 'pork', part: 'belly' },
    // 鶏肉�E�日本語！E    鶏もめE { animal: 'chicken', part: 'thigh' },
    もも: { animal: 'chicken', part: 'thigh' },
    鶁E { animal: 'chicken', part: 'thigh' },
    鶏肉: { animal: 'chicken', part: 'thigh' },
    胸肁E { animal: 'chicken', part: 'breast' },
    手羽: { animal: 'chicken', part: 'wing' },
    鶏レバ�E: { animal: 'chicken', part: 'liver' },
    丸ごと: { animal: 'chicken', part: 'whole' },
    // 鶏肉�E�英語！E    chicken: { animal: 'chicken', part: 'thigh' },
    thigh: { animal: 'chicken', part: 'thigh' },
    breast: { animal: 'chicken', part: 'breast' },
    wing: { animal: 'chicken', part: 'wing' },
    whole: { animal: 'chicken', part: 'whole' },
    // 鶏肉�E�フランス語！E    poulet: { animal: 'chicken', part: 'thigh' },
    cuisse: { animal: 'chicken', part: 'thigh' },
    blanc_poulet: { animal: 'chicken', part: 'breast' },
    // 鶏肉�E�ドイチE��！E    huhn: { animal: 'chicken', part: 'thigh' },
    hähnchen: { animal: 'chicken', part: 'thigh' },
    schenkel: { animal: 'chicken', part: 'thigh' },
    brust: { animal: 'chicken', part: 'breast' },
    // 魚（日本語！E    サーモン: { animal: 'fish', part: 'salmon' },
    サケ: { animal: 'fish', part: 'salmon' },
    マグロ: { animal: 'fish', part: 'tuna' },
    サチE { animal: 'fish', part: 'mackerel' },
    // 魚（英語！E    salmon: { animal: 'fish', part: 'salmon' },
    tuna: { animal: 'fish', part: 'tuna' },
    mackerel: { animal: 'fish', part: 'mackerel' },
    fish: { animal: 'fish', part: 'salmon' },
    // 魚（フランス語！E    saumon: { animal: 'fish', part: 'salmon' },
    thon: { animal: 'fish', part: 'tuna' },
    maquereau: { animal: 'fish', part: 'mackerel' },
    poisson: { animal: 'fish', part: 'salmon' },
    // 魚（ドイチE��！E    lachs: { animal: 'fish', part: 'salmon' },
    thunfisch: { animal: 'fish', part: 'tuna' },
    makrele: { animal: 'fish', part: 'mackerel' },
    fisch: { animal: 'fish', part: 'salmon' },
    // 卵�E�日本語！E    卵: { animal: 'egg', part: 'whole' },
    たまぁE { animal: 'egg', part: 'whole' },
    全卵: { animal: 'egg', part: 'whole' },
    卵黁E { animal: 'egg', part: 'yolk' },
    卵白: { animal: 'egg', part: 'white' },
    // 卵�E�英語！E    egg: { animal: 'egg', part: 'whole' },
    yolk: { animal: 'egg', part: 'yolk' },
    white: { animal: 'egg', part: 'white' },
    // 卵�E�フランス語！E    œuf: { animal: 'egg', part: 'whole' },
    oeuf: { animal: 'egg', part: 'whole' },
    jaune: { animal: 'egg', part: 'yolk' },
    blanc: { animal: 'egg', part: 'white' },
    // 卵�E�ドイチE��！E    ei: { animal: 'egg', part: 'whole' },
    eigelb: { animal: 'egg', part: 'yolk' },
    eiweiÁE { animal: 'egg', part: 'white' },
    // 乳製品E��日本語！E    チ�Eズ: { animal: 'dairy', part: 'cheese' },
    生クリーム: { animal: 'dairy', part: 'heavy_cream' },
    バター: { animal: 'dairy', part: 'butter' },
    // 乳製品E��英語！E    cheese: { animal: 'dairy', part: 'cheese' },
    cream: { animal: 'dairy', part: 'heavy_cream' },
    butter: { animal: 'dairy', part: 'butter' },
    // 乳製品E��フランス語！E    fromage: { animal: 'dairy', part: 'cheese' },
    crème: { animal: 'dairy', part: 'heavy_cream' },
    beurre: { animal: 'dairy', part: 'butter' },
    // 乳製品E��ドイチE��！E    käse: { animal: 'dairy', part: 'cheese' },
    sahne: { animal: 'dairy', part: 'heavy_cream' },
    // 脂質�E�日本語！E    牛脂: { animal: 'fat', part: 'tallow' },
    ギー: { animal: 'fat', part: 'ghee' },
    塩: { animal: 'fat', part: 'salt' },
    // 脂質�E�英語！E    tallow: { animal: 'fat', part: 'tallow' },
    ghee: { animal: 'fat', part: 'ghee' },
    salt: { animal: 'fat', part: 'salt' },
  };

  // 1. 完�E一致検索�E�優先度最高！E  for (const animal of Object.keys(FOOD_MASTER) as Array<keyof FoodMaster>) {
    const animalData = FOOD_MASTER[animal];
    if (!animalData) continue;
    for (const part of Object.keys(animalData)) {
      const item = animalData[part];
      if (!item) continue;

      // 英語名・日本語名・フランス語名・ドイチE��名の完�E一致
      if (
        item.name.toLowerCase() === lowerName ||
        item.name_ja.toLowerCase() === lowerName ||
        item.id.toLowerCase() === lowerName ||
        (item.name_fr && item.name_fr.toLowerCase() === lowerName) ||
        (item.name_de && item.name_de.toLowerCase() === lowerName)
      ) {
        return item;
      }
    }
  }

  // 2. キーワード�EチE��ングで検索
  for (const [keyword, mapping] of Object.entries(keywordMap)) {
    if (lowerName.includes(keyword) || keyword.includes(lowerName)) {
      const item = getFoodMasterItem(mapping.animal, mapping.part);
      if (item) return item;
    }
  }

  // 3. 部刁E��致検索�E�英語名・日本語名�E�E  let bestMatch: FoodMasterItem | undefined;
  let bestScore = 0;

  for (const animal of Object.keys(FOOD_MASTER) as Array<keyof FoodMaster>) {
    const animalData = FOOD_MASTER[animal];
    if (!animalData) continue;
    for (const part of Object.keys(animalData)) {
      const item = animalData[part];
      if (!item) continue;

      const nameLower = item.name.toLowerCase();
      const nameJaLower = item.name_ja.toLowerCase();
      const nameFrLower = item.name_fr?.toLowerCase() || '';
      const nameDeLower = item.name_de?.toLowerCase() || '';
      const idLower = item.id.toLowerCase();

      // スコアリングシスチE��: 検索語と食品名�E一致度を数値化し、最も一致度の高い食品を返す
      // スコアが高いほど、検索語と食品名�E一致度が高いことを意味する
      let score = 0;

      // 完�E一致�E�最高スコア: 100点�E�E      if (
        nameLower === lowerName ||
        nameJaLower === lowerName ||
        idLower === lowerName ||
        nameFrLower === lowerName ||
        nameDeLower === lowerName
      ) {
        score = 100;
      }
      // 前方一致�E�E0点�E�E      else if (
        nameLower.startsWith(lowerName) ||
        nameJaLower.startsWith(lowerName) ||
        nameFrLower.startsWith(lowerName) ||
        nameDeLower.startsWith(lowerName)
      ) {
        score = 80;
      }
      // 後方一致�E�E0点�E�E      else if (
        nameLower.endsWith(lowerName) ||
        nameJaLower.endsWith(lowerName) ||
        nameFrLower.endsWith(lowerName) ||
        nameDeLower.endsWith(lowerName)
      ) {
        score = 70;
      }
      // 部刁E��致�E�E0点�E�E      else if (
        nameLower.includes(lowerName) ||
        nameJaLower.includes(lowerName) ||
        nameFrLower.includes(lowerName) ||
        nameDeLower.includes(lowerName)
      ) {
        score = 60;
      }
      // 送E��向�E部刁E��致�E�検索語が食品名を含む、E0点�E�E      else if (
        lowerName.includes(nameLower) ||
        lowerName.includes(nameJaLower) ||
        lowerName.includes(nameFrLower) ||
        lowerName.includes(nameDeLower)
      ) {
        score = 50;
      }
      // 単語単位�E部刁E��致�E�E0点/単語！E      else {
        const nameWords = nameLower.split(/[\s\-_]+/);
        const nameJaWords = nameJaLower.split(/[\s\-_]+/);
        const nameFrWords = nameFrLower.split(/[\s\-_]+/);
        const nameDeWords = nameDeLower.split(/[\s\-_]+/);
        const searchWords = lowerName.split(/[\s\-_]+/);

        for (const searchWord of searchWords) {
          if (nameWords.some((w) => w.includes(searchWord) || searchWord.includes(w))) {
            score += 30;
          }
          if (nameJaWords.some((w) => w.includes(searchWord) || searchWord.includes(w))) {
            score += 30;
          }
          if (nameFrWords.some((w) => w.includes(searchWord) || searchWord.includes(w))) {
            score += 30;
          }
          if (nameDeWords.some((w) => w.includes(searchWord) || searchWord.includes(w))) {
            score += 30;
          }
        }
      }

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    }
  }

  return bestMatch;
}

