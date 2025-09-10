// IF-THEN Habit Chain App Type Definitions

export interface User {
  id: string;
  email: string;
  name: string;
  gender?: 'male' | 'female' | 'other';
  age?: number;
  goal_category?: string;
  created_at: string;
  updated_at: string;
}

export interface UserSettings {
  user_id: string;
  notification_enabled: boolean;
  ui_color: string;
  sound_enabled: boolean;
}

export interface Habit {
  id: string;
  user_id: string;
  if_condition: string;
  then_action: string;
  target_duration_seconds: number;
  version: string;
  is_active: boolean;
  big_goal?: string;
  predicted_mood?: number;
  predicted_difficulty?: number;
  alternative_action?: string;
  created_at: string;
  updated_at: string;
}

export interface HabitRecord {
  id: string;
  habit_id: string;
  user_id: string;
  start_time: string;
  end_time?: string;
  actual_duration_seconds?: number;
  target_duration_seconds: number;
  is_completed: boolean;
  is_alternative: boolean;
  split_times?: string; // JSON string
  predicted_mood?: number;
  actual_mood?: number;
  notes?: string;
  created_at: string;
}

export interface SimpleRecord {
  id: string;
  user_id: string;
  action: string;
  predicted_mood?: number;
  actual_mood?: number;
  notes?: string;
  reward_claimed: boolean;
  created_at: string;
}

export interface Reward {
  id: string;
  user_id: string;
  type: 'streak' | 'pb' | 'simple_record';
  condition_type: string;
  condition_value: number;
  is_claimed: boolean;
  claimed_at?: string;
  next_reward_date?: string;
  created_at: string;
}

export interface Community {
  id: string;
  name: string;
  description?: string;
  max_members: number;
  approval_rule: 'self' | '2_members' | '3_members' | 'percentage';
  approval_percentage?: number;
  require_photo: boolean;
  same_day_only: boolean;
  created_by: string;
  created_at: string;
}

export interface CommunityMember {
  id: string;
  community_id: string;
  user_id: string;
  role: 'admin' | 'member';
  joined_at: string;
}

export interface CommunityApproval {
  id: string;
  community_id: string;
  approver_id: string;
  target_user_id: string;
  habit_record_id?: string;
  simple_record_id?: string;
  approved_at: string;
}

export interface Routine {
  id: string;
  user_id: string;
  name: string;
  week_start_date: string;
  is_template: boolean;
  created_at: string;
}

export interface RoutineItem {
  id: string;
  routine_id: string;
  habit_id?: string;
  action: string;
  day_of_week: number; // 0-6 (Sunday-Saturday)
  time_slot?: string;
  color: string;
  is_new_habit: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// UI State Types
export interface TimeAttackState {
  isRunning: boolean;
  startTime?: Date;
  elapsedTime: number;
  targetTime: number;
  splitTimes: number[];
  isAlternative: boolean;
}

export interface ResultSummary {
  date: string;
  totalHabits: number;
  completedHabits: number;
  totalTime: number;
  averageMood: number;
  streakDays: number;
  newPBs: number;
  rewardsEarned: number;
}

// Navigation Types
export type MainTab = 'home' | 'record' | 'habit-setting' | 'time-attack' | 'my-routine';

// Mood Types
export type MoodLevel = 1 | 2 | 3 | 4 | 5;

// Color Themes
export type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'red';

// MiniApp Types
export type MiniAppType = 'community' | 'diary' | 'block' | 'analytics';

export interface MiniApp {
  id: string;
  type: MiniAppType;
  name: string;
  description: string;
  icon: string;
  isEnabled: boolean;
}
