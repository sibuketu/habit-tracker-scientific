/**
 * CarnivoreOS - Debug Data Generator
 *
 * チE��チE��用の仮チE�Eタを生戁E */

import type { DailyLog, FoodItem, UserProfile } from '../types/index';
import { calculateAllMetrics } from './nutrientCalculator';
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { getFoodMasterItem } from '../data/foodMaster';
import { getLanguage } from './i18n';

/**
 * チE��チE��用の仮チE�Eタを生成！E0日刁E��E * シード値を固定して、毎回同じチE�Eタを生成すめE */
export function generateDebugData(seed: number = 12345): DailyLog[] {
  const logs: DailyLog[] = [];
  const today = new Date();

  // シード値でランダム生�Eを固宁E  let seedValue = seed;
  const random = () => {
    seedValue = (seedValue * 9301 + 49297) % 233280;
    return seedValue / 233280;
  };

  // 食品の定義�E�EoodMasterから取得可能なも�E�E�E  const foodConfigs = [
    { animal: 'beef' as const, part: 'ribeye', amount: 300, unit: 'g' as const },
    { animal: 'beef' as const, part: 'brisket', amount: 250, unit: 'g' as const },
    { animal: 'egg' as const, part: 'whole', amount: 4, unit: 'piece' as const },
    { animal: 'fish' as const, part: 'salmon', amount: 200, unit: 'g' as const },
    { animal: 'dairy' as const, part: 'butter', amount: 50, unit: 'g' as const },
  ];

  // 30日刁E�EチE�Eタを生成（今日を含む過去30日�E�E  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    // ランダムな食品チE�Eタを生戁E    const foods: FoodItem[] = [];

    // 1日あためE-4品目をランダムに選択（シード固定！E    const numFoods = Math.floor(random() * 3) + 2;
    const selectedConfigs = [];
    for (let j = 0; j < numFoods; j++) {
      const config = foodConfigs[Math.floor(random() * foodConfigs.length)];
      selectedConfigs.push(config);
    }

    // 重褁E��除去
    const uniqueConfigs = Array.from(
      new Map(selectedConfigs.map((c) => [`${c.animal}_${c.part}`, c])).values()
    );

    uniqueConfigs.forEach((config) => {
      const masterItem = getFoodMasterItem(config.animal, config.part);
      if (masterItem) {
        // FoodMasterItemからFoodItemに変換
        const multiplier =
          config.unit === 'piece' && config.animal === 'egg'
            ? config.amount / 1 // 卵の場合�E個数
            : config.amount / 100; // 100gあたり�E値

        const nutrients: Record<string, number> = {
          protein: masterItem.protein.value * multiplier,
          fat: masterItem.fat.value * multiplier,
          carbs: masterItem.carbs.value * multiplier,
        };

        if (masterItem.saturated_fat) {
          nutrients.saturatedFat = masterItem.saturated_fat.value * multiplier;
        }
        if (masterItem.omega_6) {
          nutrients.omega6 = masterItem.omega_6.value * multiplier;
        }
        if (masterItem.omega_3) {
          nutrients.omega3 = masterItem.omega_3.value * multiplier;
        }
        if (masterItem.zinc) {
          nutrients.zinc = masterItem.zinc.value * multiplier;
        }
        if (masterItem.iron) {
          nutrients.iron = masterItem.iron.value * multiplier;
        }
        if (masterItem.sodium) {
          nutrients.sodium = masterItem.sodium.value * multiplier;
        }
        if (masterItem.magnesium) {
          nutrients.magnesium = masterItem.magnesium.value * multiplier;
        }
        if (masterItem.potassium) {
          nutrients.potassium = masterItem.potassium.value * multiplier;
        }
        if (masterItem.vitamin_a) {
          nutrients.vitaminA = masterItem.vitamin_a.value * multiplier;
        }
        if (masterItem.vitamin_d) {
          nutrients.vitaminD = masterItem.vitamin_d.value * multiplier;
        }
        if (masterItem.vitamin_k2) {
          nutrients.vitaminK2 = masterItem.vitamin_k2.value * multiplier;
        }
        if (masterItem.vitamin_b12) {
          nutrients.vitaminB12 = masterItem.vitamin_b12.value * multiplier;
        }
        if (masterItem.choline) {
          nutrients.choline = masterItem.choline.value * multiplier;
        }
        if (masterItem.glycine) {
          nutrients.glycine = masterItem.glycine.value * multiplier;
        }
        if (masterItem.methionine) {
          nutrients.methionine = masterItem.methionine.value * multiplier;
        }
        if (masterItem.calcium) {
          nutrients.calcium = masterItem.calcium.value * multiplier;
        }
        if (masterItem.phosphorus) {
          nutrients.phosphorus = masterItem.phosphorus.value * multiplier;
        }
        if (masterItem.iodine) {
          nutrients.iodine = masterItem.iodine.value * multiplier;
        }

        // typeを決宁E        let type: 'animal' | 'plant' | 'trash' | 'ruminant' | 'dairy' = 'animal';
        if (config.animal === 'beef') {
          type = 'ruminant';
        } else if (config.animal === 'dairy' || config.animal === 'egg') {
          type = 'dairy';
        } else if (config.animal === 'fish') {
          type = 'animal';
        }

        // 現在の言語に応じた食品名を取征E        const currentLang = getLanguage();
        const getFoodName = (): string => {
          if (currentLang === 'ja') return masterItem.name_ja;
          if (currentLang === 'fr') return masterItem.name_fr || masterItem.name;
          if (currentLang === 'de') return masterItem.name_de || masterItem.name;
          if (currentLang === 'zh') return masterItem.name_ja; // 中国語�E日本語名を使用�E�封E��皁E��追加可能�E�E          return masterItem.name; // 英語（デフォルト！E        };

        // チE��チE��用の写真URLを生成！E0%の確玁E��写真あり�E�E        const hasPhoto = random() < 0.3;
        const photoUrl = hasPhoto
          ? `https://picsum.photos/seed/${dateString}_${config.animal}_${config.part}/400/400`
          : undefined;

        foods.push({
          item: getFoodName(),
          amount: config.amount,
          unit: config.unit,
          type,
          nutrients,
          photoUrl,
        });
      }
    });

    // 栁E��素を計箁E    const calculatedMetrics = calculateAllMetrics(foods, {
      gender: 'male',
      weight: 70,
      height: 175,
      age: 35,
      activityLevel: 'moderate',
      goal: 'healing',
      metabolicStatus: 'adapted',
      mode: 'strict_carnivore',
    });

    // 22日連続にするため、最初�E8日は違反あり、残り22日は違反なぁE    // i=0が今日、i=29ぁE0日剁E    // 最初�E8日�E�E=22、E9、つまめE0日前かめE日前まで�E��E違反あり
    // 残り22日�E�E=0、E1、つまめE日前から今日まで�E��E違反なぁE= 22日連綁E    const isInFirst8Days = i >= 22; // 30日前かめE日前まで�E�最初�E8日�E�E    const hasViolation = isInFirst8Days; // 最初�E8日は全て違反あり
    if (hasViolation) {
      calculatedMetrics.hasViolation = true;
      calculatedMetrics.violationTypes = ['sugar_carbs'];
    }

    // 日記データを追加�E�E0%の確玁E��日記あり、症状めE��調に関する記録�E�E    const diaryEntries = [
      '今日は調子がぁE��。肉が美味しかった、E,
      'ぁE��こが硬ぁE��もっと脂質を増やそう、E,
      '頭痛がする。塩刁E��増やしたほぁE��ぁE��かも、E,
      '疲れやすい。睡眠不足かもしれなぁE��E,
      '関節痛がある。炎痁E��起きてぁE��かも、E,
      '今日は快便だった。体調が良ぁE��E,
      'こ�Eら返りがあった。�Eグネシウムが忁E��かも、E,
      'よく眠れた。調子がぁE��、E,
    ];
    const hasDiary = random() < 0.3;
    const diary = hasDiary ? diaryEntries[Math.floor(random() * diaryEntries.length)] : undefined;

    // Bio-Tuner記録を追加�E�E0%の確玁E��記録あり�E�E    const bowelMovementStatuses: Array<'normal' | 'constipated' | 'loose' | 'watery'> = [
      'normal',
      'constipated',
      'loose',
      'watery',
    ];
    const hasBowelMovement = random() < 0.5;
    const bowelMovement = hasBowelMovement
      ? {
          status: bowelMovementStatuses[Math.floor(random() * bowelMovementStatuses.length)] as
            | 'normal'
            | 'constipated'
            | 'loose'
            | 'watery',
          bristolScale: Math.floor(random() * 7) + 1, // 1-7
          notes: random() < 0.3 ? diaryEntries[Math.floor(random() * diaryEntries.length)] : undefined,
        }
      : undefined;

    // 体重チE�Eタを生成！E0kgを基準に±5kgの篁E��で変動、徐、E��減少傾向！E    const baseWeight = 70;
    const weightVariation = (random() - 0.5) * 5; // -2.5kg �E�E+2.5kg
    const weightTrend = (29 - i) * 0.1; // 過去から現在に向かって徐、E��減少（最大2.9kg減少！E    const weight = Math.round((baseWeight + weightVariation - weightTrend) * 10) / 10; // 小数点第1位まで

    // 体脂肪玁E��ータを生成！E5%を基準に±3%の篁E��で変動�E�E    const baseBodyFat = 15;
    const bodyFatVariation = (random() - 0.5) * 3; // -1.5% �E�E+1.5%
    const bodyFatPercentage = Math.round((baseBodyFat + bodyFatVariation) * 10) / 10; // 小数点第1位まで

    // 睡眠時間チE�Eタを生成！E時間を基準に±2時間の篁E��で変動�E�E    const baseSleepHours = 7;
    const sleepHoursVariation = (random() - 0.5) * 2; // -1時間 �E�E+1時間
    const sleepHours = Math.round((baseSleepHours + sleepHoursVariation) * 10) / 10; // 小数点第1位まで

    logs.push({
      date: dateString,
      status: {
        sleepScore: Math.floor(random() * 30) + 70, // 70-100
        sleepHours: sleepHours, // 睡眠時間�E�E.5-8.5時間の篁E���E�E        sunMinutes: Math.floor(random() * 60) + 10, // 10-70
        activityLevel: ['low', 'moderate', 'high'][Math.floor(random() * 3)] as
          | 'high'
          | 'low'
          | 'moderate',
        stressLevel: ['low', 'medium', 'high'][Math.floor(random() * 3)] as
          | 'low'
          | 'medium'
          | 'high',
        bowelMovement: bowelMovement,
      },
      fuel: foods,
      calculatedMetrics,
      diary,
      weight: weight, // 体重チE�Eタ�E�E7-72kgの篁E��、徐、E��減少傾向！E      bodyFatPercentage: bodyFatPercentage, // 体脂肪玁E��ータ�E�E3.5-16.5%の篁E���E�E      recoveryProtocol: hasViolation
        ? (() => {
            const currentLang = getLanguage();
            return {
              violationType: 'sugar_carbs',
              isActive: true,
              fastingTargetHours: 16,
              activities:
                currentLang === 'ja'
                  ? ['軽ぁE��歩']
                  : currentLang === 'fr'
                    ? ['Marche légère']
                    : currentLang === 'de'
                      ? ['Leichter Spaziergang']
                      : currentLang === 'zh'
                        ? ['轻散步']
                        : ['Light walk'],
              dietRecommendations:
                currentLang === 'ja'
                  ? ['脂質を増やぁE]
                  : currentLang === 'fr'
                    ? ['Augmenter les graisses']
                    : currentLang === 'de'
                      ? ['Fett erhöhen']
                      : currentLang === 'zh'
                        ? ['增加脂肪']
                        : ['Increase fat'],
              supplements: [],
              warnings: [],
              protocolId: 'default',
              targetFastEnd: new Date(date.getTime() + 16 * 60 * 60 * 1000).toISOString(),
            };
          })()
        : undefined,
    });
  }

  return logs;
}

/**
 * チE��チE��用のプロファイルを生成（�E栁E��素の計算式が動的に作用するように�E�E * 様、E��条件を満たすプロファイルを生成して、�E栁E��素の調整が適用されるよぁE��する
 */
export function generateDebugProfile(): UserProfile {
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 20); // 20日前から開始（移行期間中�E�E
  const profile: UserProfile = {
    // 基本情報��
    gender: 'male',
    age: 55, // 50歳以上（ビタミンD、タンパク質の調整�E�E    weight: 75,
    height: 175,

    // 活動量・運動�E�タンパク質、脂質、�Eグネシウムの調整�E�E    activityLevel: 'active', // 活動的な人�E�タンパク質120g、脂質180g、�Eグネシウム700mg�E�E    exerciseIntensity: 'intense', // 激しい運動�E�タンパク質130g、脂質190g、�Eグネシウム750mg�E�E    exerciseFrequency: '5+', // 週5回以上（タンパク質130g、脂質190g、�Eグネシウム750mg�E�E
    // 移行期間（ナトリウム、�Eグネシウム、カリウムの調整�E�E    daysOnCarnivore: 20, // 20日�E�E0日未満なので移行期間中�E�E    carnivoreStartDate: startDate.toISOString().split('T')[0],
    forceAdaptationMode: null, // 自動判宁E
    // ストレス・睡眠�E��Eグネシウムの調整�E�E    stressLevel: 'high', // 高ストレス�E��Eグネシウム700mg�E�E    sleepHours: 6, // 7時間未満�E��Eグネシウム650mg�E�E
    // 日光暴露�E�ビタミンDの調整�E�E    sunExposureFrequency: 'none', // 日光暴露なし（ビタミンD4000IU、サプリメントなし�E場合！E    supplementVitaminD: false, // サプリメントなぁE
    // メンタルヘルス�E��Eグネシウム、ビタミンDの調整�E�E    mentalHealthStatus: 'poor', // メンタルヘルス不良�E��Eグネシウム700mg、ビタミンD3000IU�E�E
    // アルコール・カフェイン�E��Eグネシウム、ビタミンB12の調整�E�E    alcoholFrequency: 'weekly', // 週1回（�Eグネシウム700mg、ビタミンB12 3.0μg�E�E    caffeineIntake: 'high', // 高カフェイン摂取�E��Eグネシウム700mg、E��ストレス+高カフェインで750mg�E�E
    // 消化器系�E�タンパク質の調整�E�E    digestiveIssues: true, // 消化器系の問題（タンパク質110g�E�E
    // 炎症�E��Eグネシウムの調整�E�E    inflammationLevel: 'high', // 炎症レベル高（�Eグネシウム650mg�E�E
    // 代謝ストレス持E��（ナトリウム、�Eグネシウムの調整�E�E    metabolicStressIndicators: [
      'morning_fatigue', // 朝起きるのが辛い�E�ナトリウム+1500mg�E�E      'night_wake', // 睡眠中に目が覚める（�Eグネシウム+200mg�E�E      'coffee_high', // コーヒ�E毎日2杯以上（ナトリウム+500mg�E�E    ],

    // サプリメンチE    supplementMagnesium: false, // マグネシウムサプリメントなぁE    supplementIodine: false, // ヨウ素サプリメントなぁE
    // そ�E仁E    goal: 'healing',
    metabolicStatus: 'adapted',
    mode: 'strict_carnivore',
    isPregnant: false,
    isBreastfeeding: false,
    isPostMenopause: false,
    thyroidFunction: 'normal',

    // カスタム栁E��素目標値�E�テスト用�E�E    customNutrientTargets: {},
  };

  // チE��チE��プロファイルは保存しなぁE��毎回生�EされるためE��E  return profile;
}

