/**
 * CarnivoreOS - Storage Utility
 *
 * Managing local storage and syncing with Supabase
 */

import type { DailyLog, UserProfile } from '../types/index';
import { defaultUserProfile } from '../types/index';
import { logError } from './errorHandler';
import { supabase, isSupabaseAvailable } from '../lib/supabaseClient';

const STORAGE_KEYS = {
  DAILY_LOGS: 'carnivos_daily_logs',
  USER_PROFILE: 'carnivos_user_profile',
  LAST_SYNC: 'carnivos_last_sync',
};

// --- Local Storage Helpers ---

export const getDailyLogs = async (): Promise<Record<string, DailyLog>> => {
  try {
    const logs = localStorage.getItem(STORAGE_KEYS.DAILY_LOGS);
    return logs ? JSON.parse(logs) : {};
  } catch (error) {
    logError(error, { component: 'storage', action: 'getDailyLogs' });
    return {};
  }
};

export const getTodayLog = async (): Promise<DailyLog> => {
  const today = new Date().toISOString().split('T')[0];
  const logs = await getDailyLogs();

  if (logs[today]) {
    return logs[today];
  }

  // Create new log for today
  const newLog: DailyLog = {
    id: `log_${today}_${Date.now()}`,
    date: today,
    fuel: [],
    status: {
      energy: 3,
      mentalClarity: 3,
      digestion: 3,
      sleepQuality: 3,
      mood: 3,
      libido: 3,
    },
    symptoms: [],
    bowelMovements: [],
    calculatedMetrics: {
      totalCalories: 0,
      totalProtein: 0,
      totalFat: 0,
      totalCarbs: 0,
      pfRatio: 0,
      omegaRatio: 0,
      nutrients: {},
    },
  };
  return newLog;
};

export const saveDailyLog = async (log: DailyLog): Promise<void> => {
  try {
    const logs = await getDailyLogs();
    logs[log.date] = log;
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));

    // Potentially sync to Supabase here or via separate trigger
    // await syncLogToSupabase(log);
  } catch (error) {
    logError(error, { component: 'storage', action: 'saveDailyLog' });
    throw error;
  }
};

export const getUserProfile = async (): Promise<UserProfile | null> => {
  try {
    const profile = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return profile ? JSON.parse(profile) : defaultUserProfile;
  } catch (error) {
    logError(error, { component: 'storage', action: 'getUserProfile' });
    return defaultUserProfile;
  }
};

export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    logError(error, { component: 'storage', action: 'saveUserProfile' });
    throw error;
  }
};

// --- Import/Export ---

export const exportAllData = async (): Promise<void> => {
  try {
    const logs = await getDailyLogs();
    const profile = await getUserProfile();
    const data = {
      logs,
      profile,
      exportDate: new Date().toISOString(),
      version: '1.0',
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `carnivos_backup_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (error) {
    logError(error, { component: 'storage', action: 'exportAllData' });
    alert('Export failed');
  }
};

export const importAllData = async (file: File): Promise<void> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const content = e.target?.result as string;
        const data = JSON.parse(content);

        if (data.logs) {
          localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(data.logs));
        }
        if (data.profile) {
          localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.profile));
        }
        resolve();
      } catch (error) {
        logError(error, { component: 'storage', action: 'importAllData' });
        reject(error);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

export const syncLocalStorageToSupabase = async () => {
  if (!isSupabaseAvailable()) return;
  // TODO: Implement actual sync logic
  console.log('Syncing to Supabase...');
};
