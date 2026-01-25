/**
 * CarnivoreOS - Profile Completion Calculator
 *
 * プロフィール完�E度を計算するユーチE��リチE��
 */

import type { UserProfile } from '../types/index';

export type FieldCategory =
  | 'basic'
  | 'body'
  | 'health'
  | 'lifestyle'
  | 'disease'
  | 'lab'
  | 'advanced';

interface ProfileFieldConfig {
  key: keyof UserProfile;
  category: FieldCategory;
  priority: 'required' | 'recommended' | 'optional';
  weight: number; // 重要度�E�Eequired: 3, recommended: 2, optional: 1�E�E}

const PROFILE_FIELDS: ProfileFieldConfig[] = [
  // 基本惁E���E�忁E��！E  { key: 'gender', category: 'basic', priority: 'required', weight: 3 },
  { key: 'goal', category: 'basic', priority: 'required', weight: 3 },
  { key: 'metabolicStatus', category: 'basic', priority: 'required', weight: 3 },

  // 基本惁E���E�推奨�E�E  { key: 'height', category: 'basic', priority: 'recommended', weight: 2 },
  { key: 'weight', category: 'basic', priority: 'recommended', weight: 2 },
  { key: 'age', category: 'basic', priority: 'recommended', weight: 2 },
  { key: 'mode', category: 'basic', priority: 'recommended', weight: 2 },

  // 体絁E�E�E�推奨�E�E  { key: 'bodyComposition', category: 'body', priority: 'recommended', weight: 2 },
  { key: 'activityLevel', category: 'body', priority: 'recommended', weight: 2 },
  { key: 'exerciseIntensity', category: 'body', priority: 'recommended', weight: 2 },
  { key: 'exerciseFrequency', category: 'body', priority: 'recommended', weight: 2 },

  // 健康状態（推奨�E�E  { key: 'stressLevel', category: 'health', priority: 'recommended', weight: 2 },
  { key: 'sleepHours', category: 'health', priority: 'recommended', weight: 2 },
  { key: 'thyroidFunction', category: 'health', priority: 'recommended', weight: 2 },
  { key: 'sunExposureFrequency', category: 'health', priority: 'recommended', weight: 2 },

  // 女性特有（推奨・任意！E  { key: 'isPregnant', category: 'health', priority: 'recommended', weight: 2 },
  { key: 'isBreastfeeding', category: 'health', priority: 'recommended', weight: 2 },
  { key: 'isPostMenopause', category: 'health', priority: 'recommended', weight: 2 },

  // ライフスタイル�E�任意！E  { key: 'dairyTolerance', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'digestiveIssues', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'caffeineIntake', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'alcoholFrequency', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'supplementMagnesium', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'supplementVitaminD', category: 'lifestyle', priority: 'optional', weight: 1 },
  { key: 'supplementIodine', category: 'lifestyle', priority: 'optional', weight: 1 },

  // 疾患・痁E���E�任意！E  { key: 'inflammationLevel', category: 'disease', priority: 'optional', weight: 1 },
  { key: 'mentalHealthStatus', category: 'disease', priority: 'optional', weight: 1 },
  { key: 'diabetes', category: 'disease', priority: 'optional', weight: 1 },
  { key: 'autoimmuneConditions', category: 'disease', priority: 'optional', weight: 1 },
  { key: 'chronicDiseases', category: 'disease', priority: 'optional', weight: 1 },

  // 血液検査値�E�任意！E  { key: 'vitaminDLevel', category: 'lab', priority: 'optional', weight: 1 },
  { key: 'b12Level', category: 'lab', priority: 'optional', weight: 1 },
  { key: 'ferritin', category: 'lab', priority: 'optional', weight: 1 },
  { key: 'omega3Index', category: 'lab', priority: 'optional', weight: 1 },
];

/**
 * フィールドが入力されてぁE��かチェチE��
 */
function isFieldFilled(profile: UserProfile | null, key: keyof UserProfile): boolean {
  if (!profile) return false;

  const value = profile[key];

  // undefined, nullは未入劁E  if (value === undefined || value === null) return false;

  // boolean型�Efalseでも�E力済みとみなぁE  if (typeof value === 'boolean') return true;

  // 数値型�E0以外を入力済みとみなぁE  if (typeof value === 'number') return value > 0;

  // 斁E���E型�E空斁E���EでなぁE��合に入力済み
  if (typeof value === 'string') return value.trim() !== '';

  // 配�E型�E空配�EでなぁE��合に入力済み
  if (Array.isArray(value)) return value.length > 0;

  // オブジェクト型はnull以外を入力済みとみなぁE  if (typeof value === 'object') return true;

  return false;
}

/**
 * プロフィール完�E度を計算！E-100%�E�E */
export function calculateProfileCompletion(profile: UserProfile | null): number {
  if (!profile) return 0;

  let totalWeight = 0;
  let filledWeight = 0;

  for (const field of PROFILE_FIELDS) {
    totalWeight += field.weight;
    if (isFieldFilled(profile, field.key)) {
      filledWeight += field.weight;
    }
  }

  if (totalWeight === 0) return 0;

  return Math.round((filledWeight / totalWeight) * 100);
}

/**
 * カチE��リ別の完�E度を計箁E */
export function calculateCategoryCompletion(
  profile: UserProfile | null,
  category: FieldCategory
): number {
  if (!profile) return 0;

  const categoryFields = PROFILE_FIELDS.filter((f) => f.category === category);
  if (categoryFields.length === 0) return 0;

  let totalWeight = 0;
  let filledWeight = 0;

  for (const field of categoryFields) {
    totalWeight += field.weight;
    if (isFieldFilled(profile, field.key)) {
      filledWeight += field.weight;
    }
  }

  if (totalWeight === 0) return 0;

  return Math.round((filledWeight / totalWeight) * 100);
}

/**
 * カチE��リ名を取征E */
export function getCategoryName(category: FieldCategory): string {
  const names: Record<FieldCategory, string> = {
    basic: '基本惁E��',
    body: '体絁E�E',
    health: '健康状慁E,
    lifestyle: 'ライフスタイル',
    disease: '疾患・痁E��',
    lab: '血液検査値',
    advanced: '詳細設宁E,
  };
  return names[category];
}

/**
 * カチE��リの優先度を取得（カチE��リ冁E�E最高優先度�E�E */
export function getCategoryPriority(
  category: FieldCategory
): 'required' | 'recommended' | 'optional' {
  const categoryFields = PROFILE_FIELDS.filter((f) => f.category === category);
  if (categoryFields.some((f) => f.priority === 'required')) return 'required';
  if (categoryFields.some((f) => f.priority === 'recommended')) return 'recommended';
  return 'optional';
}

