/**
 * Fasting Timer Utility
 * 断食タイマ�Eの時刻管琁E��ローカルストレージ操佁E */

const LAST_MEAL_TIME_KEY = 'primalLogic_lastMealTime';

/**
 * 最後�E食事時刻を保孁E */
export function setLastMealTime(timestamp: number): void {
  localStorage.setItem(LAST_MEAL_TIME_KEY, timestamp.toString());
}

/**
 * 最後�E食事時刻を取征E * @returns 最後�E食事時刻のタイムスタンプ（ミリ秒）、未設定�E場合�Enull
 */
export function getLastMealTime(): number | null {
  const stored = localStorage.getItem(LAST_MEAL_TIME_KEY);
  if (!stored) return null;
  const timestamp = parseInt(stored, 10);
  return isNaN(timestamp) ? null : timestamp;
}

/**
 * 断食タイマ�EをリセチE���E�断食終亁E��E */
export function clearLastMealTime(): void {
  localStorage.removeItem(LAST_MEAL_TIME_KEY);
}

/**
 * 断食時間を計算（時間と刁E��E * @param lastMealTime 最後�E食事時刻�E�ミリ秒！E * @param currentTime 現在時刻�E�ミリ秒！E * @returns { hours, minutes, totalMinutes }
 */
export function calculateFastingDuration(
  lastMealTime: number,
  currentTime: number = Date.now()
): { hours: number; minutes: number; totalMinutes: number } {
  const diff = currentTime - lastMealTime;
  const totalMinutes = Math.floor(diff / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return { hours, minutes, totalMinutes };
}

/**
 * 断食時間をフォーマッチE * @param hours 時間
 * @param minutes 刁E * @returns フォーマットされた斁E���E�E�侁E "16h 30m"�E�E */
export function formatFastingDuration(hours: number, minutes: number): string {
  return `${hours}h ${minutes}m`;
}

/**
 * 断食段階を判宁E * @param totalMinutes 断食時間（�E�E�E * @returns 断食段階�E惁E��
 */
export function getFastingStage(totalMinutes: number): {
  stage: string;
  color: string;
  description: string;
} {
  if (totalMinutes < 720) {
    // 12時間未満
    return {
      stage: 'Early',
      color: '#3b82f6', // Blue
      description: 'グリコーゲン消費中',
    };
  } else if (totalMinutes < 960) {
    // 12-16時間
    return {
      stage: 'Fat Burning',
      color: '#f97316', // Orange
      description: '脂肪燁E��開姁E,
    };
  } else if (totalMinutes < 1080) {
    // 16-18時間
    return {
      stage: 'Ketosis',
      color: '#8b5cf6', // Purple
      description: 'ケト�Eシス突�E',
    };
  } else if (totalMinutes < 1440) {
    // 18-24時間
    return {
      stage: 'Deep Ketosis',
      color: '#10b981', // Green
      description: '深ぁE��ト�Eシス',
    };
  } else {
    // 24時間以丁E    return {
      stage: 'Autophagy',
      color: '#dc2626', // Red
      description: 'オートファジー俁E��',
    };
  }
}

