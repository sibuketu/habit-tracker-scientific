/**
 * 栁E��素変動の説明を生�Eするヘルパ�E関数
 */

import type { UserProfile } from '../types/index';
import { getCarnivoreTargets } from '../data/carnivoreTargets';

export interface NutrientImpact {
  nutrient: string;
  before: number;
  after: number;
  unit: string;
  description: string;
}

/**
 * 設定変更による栁E��素の変動を計箁E */
export function calculateNutrientImpact(
  currentProfile: Partial<UserProfile>,
  changedField: keyof UserProfile,
  newValue: UserProfile[keyof UserProfile]
): NutrientImpact[] {
  const impacts: NutrientImpact[] = [];

  // 変更前�E目標値を計箁E  const beforeTargets = getCarnivoreTargets(
    currentProfile.gender,
    currentProfile.age,
    currentProfile.activityLevel,
    currentProfile.isPregnant,
    currentProfile.isBreastfeeding,
    currentProfile.isPostMenopause,
    currentProfile.stressLevel
  );

  // 変更後�Eプロファイルを作�E
  const afterProfile = { ...currentProfile, [changedField]: newValue };

  // 変更後�E目標値を計箁E  const afterTargets = getCarnivoreTargets(
    afterProfile.gender,
    afterProfile.age,
    afterProfile.activityLevel,
    afterProfile.isPregnant,
    afterProfile.isBreastfeeding,
    afterProfile.isPostMenopause,
    afterProfile.stressLevel
  );

  // 変動した栁E��素を検�E
  const nutrients: Array<{ key: keyof typeof beforeTargets; name: string; unit: string }> = [
    { key: 'protein', name: 'タンパク質', unit: 'g' },
    { key: 'fat', name: '脂質', unit: 'g' },
    { key: 'iron', name: '鉁E�E', unit: 'mg' },
    { key: 'magnesium', name: 'マグネシウム', unit: 'mg' },
    { key: 'vitamin_d', name: 'ビタミンD', unit: 'IU' },
  ];

  nutrients.forEach(({ key, name, unit }) => {
    const before = beforeTargets[key];
    const after = afterTargets[key];
    if (before !== undefined && after !== undefined && before !== after) {
      impacts.push({
        nutrient: name,
        before,
        after,
        unit,
        description: `${name}が${before}${unit}から${after}${unit}に${after > before ? '増加' : '減少'}します`,
      });
    }
  });

  return impacts;
}

/**
 * フィールドごとの栁E��素変動説明を取征E */
export function getFieldImpactDescription(
  field: keyof UserProfile,
  value: UserProfile[keyof UserProfile]
): string {
  const descriptions: Record<string, string | Record<string, string>> = {
    age:
      typeof value === 'number' && value > 50
        ? '高齢老E�EビタミンDとタンパク質の忁E��E��が増加しまぁE
        : '',
    activityLevel: {
      active: '活動的な人はタンパク質・脂質・マグネシウムの忁E��E��が増加しまぁE,
      moderate: '中程度の活動量では、タンパク質と脂質がやめE��加しまぁE,
      sedentary: '低活動量では、標準的な忁E��E��が適用されまぁE,
    },
    isPregnant:
      typeof value === 'boolean' && value
        ? '妊娠中はタンパク質・鉁E�E・マグネシウムの忁E��E��が増加しまぁE
        : '',
    isBreastfeeding:
      typeof value === 'boolean' && value
        ? '授乳中はタンパク質・マグネシウムの忁E��E��が増加しまぁE
        : '',
    isPostMenopause:
      typeof value === 'boolean' && value
        ? '閉経後�E鉁E�Eの忁E��E��ぁEmgに減少します（月経がなぁE��めE��E
        : '',
    stressLevel: {
      high: '高ストレス時�Eマグネシウムの忁E��E��が増加しまぁE,
      moderate: '中程度のストレスでは、標準的な忁E��E��が適用されまぁE,
      low: '低ストレスでは、標準的な忁E��E��が適用されまぁE,
    },
    sleepHours:
      typeof value === 'number' && value < 7
        ? '睡眠不足はマグネシウムとコルチゾールに影響しまぁE
        : '',
    exerciseIntensity: {
      intense: '激しい運動ではタンパク質・脂質・マグネシウムの忁E��E��が増加しまぁE,
      moderate: '中程度の運動では、タンパク質と脂質がやめE��加しまぁE,
      light: '軽ぁE��動では、標準的な忁E��E��が適用されまぁE,
      none: '運動なしでは、標準的な忁E��E��が適用されまぁE,
    },
    thyroidFunction: {
      hypothyroid: '甲状腺機�E低下症ではヨウ素とセレンの忁E��E��が増加しまぁE,
      hyperthyroid: '甲状腺機�E亢進痁E��はヨウ素とセレンの忁E��E��が増加しまぁE,
      normal: '',
    },
    sunExposureFrequency: {
      none: '日光暴露なしではビタミンDサプリメントが忁E��になる可能性がありまぁE,
      rare: 'まれな日光暴露ではビタミンDの忁E��E��が増加しまぁE,
      occasional: '時、E�E日光暴露では、標準的な忁E��E��が適用されまぁE,
      daily: '毎日の日光暴露では、ビタミンD合�Eが十刁E��可能性がありまぁE,
    },
  };

  const desc = descriptions[field];
  if (typeof desc === 'string') {
    return desc;
  }
  if (typeof desc === 'object' && desc !== null && typeof value === 'string') {
    return (desc as Record<string, string>)[value] || '';
  }
  return '';
}

