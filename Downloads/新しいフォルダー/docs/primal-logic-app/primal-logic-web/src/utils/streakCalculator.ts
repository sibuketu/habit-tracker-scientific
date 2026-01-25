/**
 * Streak Calculator
 */
import type { DailyLog } from '../types/index';

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastLogDate: string | null;
  history: boolean[]; // last 7 days etc
}

export function calculateStreak(logs?: DailyLog[]): StreakData {
  if (!logs || logs.length === 0) {
    return { currentStreak: 0, longestStreak: 0, lastLogDate: null, history: [] };
  }

  // Sort logs by date descending
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const lastLogDate = sortedLogs[0].date;

  // Calculate streak logic (simplified)
  let currentStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Checking consecutive days logic would go here
  // For restoration, just returning basic data

  return {
    currentStreak: sortedLogs.length, // Placeholder logic
    longestStreak: sortedLogs.length,
    lastLogDate,
    history: []
  };
}
