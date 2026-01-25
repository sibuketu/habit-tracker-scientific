/**
 * CarnivoreOS - Supabase Database Types
 *
 * Supabase繝・・繧ｿ繝吶・繧ｹ縺ｮ繝・・繝悶Ν蝙句ｮ夂ｾｩ
 */

/**
 * daily_logs 繝・・繝悶Ν縺ｮ蝙句ｮ夂ｾｩ
 */
export interface DailyLogRow {
  id?: string;
  user_id: string;
  date: string; // ISO date string (YYYY-MM-DD)
  status: {
    sleep_score: number;
    sleep_hours?: number;
    sun_minutes: number;
    activity_level: 'high' | 'moderate' | 'low';
    stress_level?: 'low' | 'medium' | 'high';
    bowel_movement?: {
      status: 'normal' | 'constipated' | 'loose' | 'watery';
      bristol_scale?: number;
      notes?: string;
    };
  };
  fuel: Array<{
    item: string;
    amount: number;
    unit: 'g' | 'serving' | 'piece' | '蛟・;
    type: 'animal' | 'plant' | 'trash' | 'ruminant' | 'dairy';
    nutrients?: Record<string, number>;
  }>;
  calculated_metrics: {
    net_carbs: number;
    effective_vit_c: number;
    vit_c_requirement: number;
    effective_vit_k: number;
    effective_iron: number;
    iron_requirement: number;
    effective_zinc: number;
    fiber_total: number;
    sodium_total: number;
    magnesium_total: number;
    effective_protein: number;
    protein_total: number;
    protein_requirement: number;
    fat_total: number;
    [key: string]: number | undefined;
  };
  recovery_protocol?: {
    violation_type: string;
    is_active: boolean;
    fasting_target_hours: number;
    activities?: string[];
    diet_recommendations: string[];
    supplements?: string[];
    warnings?: string[];
    protocol_id?: string;
    target_fast_end?: string;
  };
  diary?: string; // 譌･險假ｼ郁・逕ｱ蜈･蜉幢ｼ・  weight?: number; // 菴馴㍾・・g・・ 譌･谺｡險倬鹸
  body_fat_percentage?: number; // 菴楢р閧ｪ邇・ｼ・・・ 譌･谺｡險倬鹸
  created_at?: string;
  updated_at?: string;
}

/**
 * profiles 繝・・繝悶Ν縺ｮ蝙句ｮ夂ｾｩ
 */
export interface ProfileRow {
  id?: string;
  user_id: string;
  gender: 'male' | 'female';
  height?: number;
  weight?: number;
  age?: number;
  activity_level?: 'sedentary' | 'moderate' | 'active';
  goal: string;
  dairy_tolerance?: boolean;
  metabolic_status: 'adapted' | 'transitioning';
  mode?: string;
  target_carbs?: number;
  is_pregnant?: boolean;
  is_breastfeeding?: boolean;
  is_post_menopause?: boolean;
  stress_level?: 'low' | 'moderate' | 'high';
  sleep_hours?: number;
  exercise_intensity?: 'none' | 'light' | 'moderate' | 'intense';
  exercise_frequency?: 'none' | '1-2' | '3-4' | '5+';
  thyroid_function?: 'normal' | 'hypothyroid' | 'hyperthyroid';
  sun_exposure_frequency?: 'none' | 'rare' | 'occasional' | 'daily';
  digestive_issues?: boolean;
  inflammation_level?: 'low' | 'moderate' | 'high';
  mental_health_status?: 'good' | 'moderate' | 'poor';
  supplement_magnesium?: boolean;
  supplement_vitamin_d?: boolean;
  supplement_iodine?: boolean;
  alcohol_frequency?: 'none' | 'rare' | 'weekly' | 'daily';
  caffeine_intake?: 'none' | 'low' | 'moderate' | 'high';
  chronic_diseases?: string[];
  language?: 'ja' | 'en' | 'fr' | 'de';
  created_at?: string;
  updated_at?: string;
}

/**
 * streaks 繝・・繝悶Ν縺ｮ蝙句ｮ夂ｾｩ
 */
export interface StreakRow {
  id?: string;
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_log_date: string; // ISO date string
  created_at?: string;
  updated_at?: string;
}

/**
 * tips_history 繝・・繝悶Ν縺ｮ蝙句ｮ夂ｾｩ・医が繝励す繝ｧ繝ｳ・・ */
export interface TipHistoryRow {
  id?: string;
  user_id: string;
  tip_id: string;
  tip_title: string;
  tip_content: string;
  tip_category?: string;
  viewed_at: string; // ISO timestamp
  created_at?: string;
}

