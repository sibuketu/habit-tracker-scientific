import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { 
  User, 
  Habit, 
  HabitRecord, 
  SimpleRecord, 
  TimeAttackState, 
  MainTab,
  ColorTheme,
  MoodLevel 
} from '@/types';

// User Store
interface UserStore {
  user: User | null;
  settings: {
    notification_enabled: boolean;
    ui_color: ColorTheme;
    sound_enabled: boolean;
  };
  setUser: (user: User) => void;
  updateSettings: (settings: Partial<UserStore['settings']>) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      settings: {
        notification_enabled: true,
        ui_color: 'blue',
        sound_enabled: true,
      },
      setUser: (user) => set({ user }),
      updateSettings: (newSettings) => 
        set((state) => ({ 
          settings: { ...state.settings, ...newSettings } 
        })),
    }),
    {
      name: 'user-store',
    }
  )
);

// Habits Store
interface HabitsStore {
  habits: Habit[];
  activeHabits: Habit[];
  setHabits: (habits: Habit[]) => void;
  addHabit: (habit: Habit) => void;
  updateHabit: (id: string, updates: Partial<Habit>) => void;
  deleteHabit: (id: string) => void;
  getActiveHabits: () => Habit[];
}

export const useHabitsStore = create<HabitsStore>((set, get) => ({
  habits: [],
  activeHabits: [],
  setHabits: (habits) => set({ 
    habits, 
    activeHabits: habits.filter(h => h.is_active) 
  }),
  addHabit: (habit) => set((state) => ({
    habits: [...state.habits, habit],
    activeHabits: habit.is_active 
      ? [...state.activeHabits, habit] 
      : state.activeHabits
  })),
  updateHabit: (id, updates) => set((state) => {
    const updatedHabits = state.habits.map(h => 
      h.id === id ? { ...h, ...updates } : h
    );
    return {
      habits: updatedHabits,
      activeHabits: updatedHabits.filter(h => h.is_active)
    };
  }),
  deleteHabit: (id) => set((state) => ({
    habits: state.habits.filter(h => h.id !== id),
    activeHabits: state.activeHabits.filter(h => h.id !== id)
  })),
  getActiveHabits: () => get().activeHabits,
}));

// Records Store
interface RecordsStore {
  habitRecords: HabitRecord[];
  simpleRecords: SimpleRecord[];
  addHabitRecord: (record: HabitRecord) => void;
  updateHabitRecord: (id: string, updates: Partial<HabitRecord>) => void;
  addSimpleRecord: (record: SimpleRecord) => void;
  getTodayRecords: () => { habitRecords: HabitRecord[]; simpleRecords: SimpleRecord[] };
}

export const useRecordsStore = create<RecordsStore>((set, get) => ({
  habitRecords: [],
  simpleRecords: [],
  addHabitRecord: (record) => set((state) => ({
    habitRecords: [...state.habitRecords, record]
  })),
  updateHabitRecord: (id, updates) => set((state) => ({
    habitRecords: state.habitRecords.map(r => 
      r.id === id ? { ...r, ...updates } : r
    )
  })),
  addSimpleRecord: (record) => set((state) => ({
    simpleRecords: [...state.simpleRecords, record]
  })),
  getTodayRecords: () => {
    const today = new Date().toISOString().split('T')[0];
    const { habitRecords, simpleRecords } = get();
    
    return {
      habitRecords: habitRecords.filter(r => 
        r.start_time.startsWith(today)
      ),
      simpleRecords: simpleRecords.filter(r => 
        r.created_at.startsWith(today)
      )
    };
  },
}));

// Time Attack Store
interface TimeAttackStore {
  state: TimeAttackState;
  currentHabit: Habit | null;
  startTimeAttack: (habit: Habit) => void;
  pauseTimeAttack: () => void;
  resumeTimeAttack: () => void;
  stopTimeAttack: () => void;
  addSplitTime: () => void;
  setAlternative: (isAlternative: boolean) => void;
  resetTimeAttack: () => void;
}

export const useTimeAttackStore = create<TimeAttackStore>((set, get) => ({
  state: {
    isRunning: false,
    elapsedTime: 0,
    targetTime: 0,
    splitTimes: [],
    isAlternative: false,
  },
  currentHabit: null,
  startTimeAttack: (habit) => set({
    currentHabit: habit,
    state: {
      isRunning: true,
      startTime: new Date(),
      elapsedTime: 0,
      targetTime: habit.target_duration_seconds,
      splitTimes: [],
      isAlternative: false,
    }
  }),
  pauseTimeAttack: () => set((state) => ({
    state: { ...state.state, isRunning: false }
  })),
  resumeTimeAttack: () => set((state) => ({
    state: { ...state.state, isRunning: true }
  })),
  stopTimeAttack: () => set((state) => ({
    state: { ...state.state, isRunning: false }
  })),
  addSplitTime: () => set((state) => ({
    state: {
      ...state.state,
      splitTimes: [...state.state.splitTimes, state.state.elapsedTime]
    }
  })),
  setAlternative: (isAlternative) => set((state) => ({
    state: { ...state.state, isAlternative }
  })),
  resetTimeAttack: () => set({
    state: {
      isRunning: false,
      elapsedTime: 0,
      targetTime: 0,
      splitTimes: [],
      isAlternative: false,
    },
    currentHabit: null,
  }),
}));

// Navigation Store
interface NavigationStore {
  currentTab: MainTab;
  setCurrentTab: (tab: MainTab) => void;
}

export const useNavigationStore = create<NavigationStore>((set) => ({
  currentTab: 'home',
  setCurrentTab: (tab) => set({ currentTab: tab }),
}));

// Reward型を定義
interface Reward {
  id: string;
  title: string;
  description: string;
  type: 'badge' | 'achievement' | 'unlock';
  earnedAt: Date;
  claimed: boolean;
}

// Rewards Store
interface RewardsStore {
  rewards: Reward[];
  unclaimedRewards: Reward[];
  addReward: (reward: Reward) => void;
  claimReward: (id: string) => void;
  checkRewards: () => void;
}

export const useRewardsStore = create<RewardsStore>((set, get) => ({
  rewards: [],
  unclaimedRewards: [],
  addReward: (reward) => set((state) => ({
    rewards: [...state.rewards, reward],
    unclaimedRewards: !reward.claimed 
      ? [...state.unclaimedRewards, reward] 
      : state.unclaimedRewards
  })),
  claimReward: (id) => set((state) => ({
    rewards: state.rewards.map(r => 
      r.id === id ? { ...r, is_claimed: true, claimed_at: new Date().toISOString() } : r
    ),
    unclaimedRewards: state.unclaimedRewards.filter(r => r.id !== id)
  })),
  checkRewards: () => {
    // ご褒美条件をチェックするロジック
    // 実装は後で追加
  },
}));
