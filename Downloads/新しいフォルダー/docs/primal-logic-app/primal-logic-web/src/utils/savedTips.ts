/**
 * CarnivoreOS - Saved Tips (縺頑ｰ励↓蜈･繧概ips)
 *
 * 繝ｦ繝ｼ繧ｶ繝ｼ縺梧弌縺ｧ菫晏ｭ倥＠縺鬱ips繧堤ｮ｡逅・ */

import { logError } from './errorHandler';

const STORAGE_KEY = 'primal_logic_saved_tips';

/**
 * 菫晏ｭ倥＆繧後◆Tips縺ｮID繝ｪ繧ｹ繝医ｒ蜿門ｾ・ */
export function getSavedTipIds(): string[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  } catch (error) {
    logError(error, { component: 'savedTips', action: 'getSavedTipIds' });
    return [];
  }
}

/**
 * Tips繧剃ｿ晏ｭ假ｼ医♀豌励↓蜈･繧翫↓霑ｽ蜉・・ */
export function saveTip(tipId: string): void {
  try {
    const saved = getSavedTipIds();
    if (!saved.includes(tipId)) {
      saved.push(tipId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saved));
    }
  } catch (error) {
    logError(error, { component: 'savedTips', action: 'saveTip', tipId });
  }
}

/**
 * Tips縺ｮ菫晏ｭ倥ｒ隗｣髯､・医♀豌励↓蜈･繧翫°繧牙炎髯､・・ */
export function unsaveTip(tipId: string): void {
  try {
    const saved = getSavedTipIds();
    const filtered = saved.filter((id) => id !== tipId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    logError(error, { component: 'savedTips', action: 'unsaveTip', tipId });
  }
}

/**
 * Tips縺御ｿ晏ｭ倥＆繧後※縺・ｋ縺九メ繧ｧ繝・け
 */
export function isTipSaved(tipId: string): boolean {
  const saved = getSavedTipIds();
  return saved.includes(tipId);
}

