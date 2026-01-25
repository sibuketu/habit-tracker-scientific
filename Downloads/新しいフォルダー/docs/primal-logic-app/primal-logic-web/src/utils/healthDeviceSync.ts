/**
 * CarnivoreOS - Health Device Sync Utility
 *
 * 繧ｦ繧ｧ繧｢繝ｩ繝悶Ν繝・ヰ繧､繧ｹ騾｣謳ｺ・・pple Health縲；oogle Fit・・ *
 * 豕ｨ諢・ Web繧｢繝励Μ縺ｧ縺ｯ逶ｴ謗･逧・↑騾｣謳ｺ縺ｯ髮｣縺励＞縺溘ａ縲∽ｻ･荳九・譁ｹ豕輔ｒ謠蝉ｾ・
 * 1. 謇句虚蜈･蜉幢ｼ域ｴｻ蜍暮㍼縲∝ｿ・牛謨ｰ縺ｪ縺ｩ・・ * 2. 蟆・擂逧・↓繝｢繝舌う繝ｫ繧｢繝励Μ・・xpo・峨〒螳溯｣・ｺ亥ｮ・ */

import { logError } from './errorHandler';

export interface HealthData {
  steps?: number; // 豁ｩ謨ｰ
  heartRate?: number; // 蠢・牛謨ｰ・・pm・・  activeMinutes?: number; // 豢ｻ蜍墓凾髢難ｼ亥・・・  caloriesBurned?: number; // 豸郁ｲｻ繧ｫ繝ｭ繝ｪ繝ｼ・・cal・・  date: string; // ISO date string (YYYY-MM-DD)
}

const HEALTH_DATA_STORAGE_KEY = 'primal_logic_health_data';

/**
 * 蛛･蠎ｷ繝・・繧ｿ繧剃ｿ晏ｭ・ */
export function saveHealthData(data: HealthData): void {
  try {
    const allData = getHealthData();
    const existingIndex = allData.findIndex((d) => d.date === data.date);

    if (existingIndex >= 0) {
      allData[existingIndex] = { ...allData[existingIndex], ...data };
    } else {
      allData.push(data);
    }

    localStorage.setItem(HEALTH_DATA_STORAGE_KEY, JSON.stringify(allData));
  } catch (error) {
    logError(error, { component: 'healthDeviceSync', action: 'saveHealthData' });
  }
}

/**
 * 蛛･蠎ｷ繝・・繧ｿ繧貞叙蠕・ */
export function getHealthData(date?: string): HealthData[] {
  try {
    const stored = localStorage.getItem(HEALTH_DATA_STORAGE_KEY);
    if (!stored) return [];
    const allData: HealthData[] = JSON.parse(stored);
    if (date) {
      return allData.filter((d) => d.date === date);
    }
    return allData;
  } catch (error) {
    logError(error, { component: 'healthDeviceSync', action: 'getHealthData' });
    return [];
  }
}

/**
 * 蛛･蠎ｷ繝・・繧ｿ繧貞炎髯､
 */
export function deleteHealthData(date: string): boolean {
  try {
    const allData = getHealthData();
    const filtered = allData.filter((d) => d.date !== date);
    if (filtered.length === allData.length) return false;
    localStorage.setItem(HEALTH_DATA_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (error) {
    logError(error, { component: 'healthDeviceSync', action: 'deleteHealthData' });
    return false;
  }
}

/**
 * Apple Health騾｣謳ｺ・亥ｰ・擂螳溯｣・ｺ亥ｮ夲ｼ・ *
 * 豕ｨ諢・ Web繧｢繝励Μ縺ｧ縺ｯ逶ｴ謗･逧・↑騾｣謳ｺ縺ｯ荳榊庄閭ｽ縲・ * 繝｢繝舌う繝ｫ繧｢繝励Μ・・xpo・峨〒螳溯｣・ｺ亥ｮ壹・ */
export async function syncWithAppleHealth(): Promise<HealthData | null> {
  // 蟆・擂螳溯｣・ｺ亥ｮ・  if (import.meta.env.DEV) {
    console.log('Apple Health騾｣謳ｺ縺ｯ繝｢繝舌う繝ｫ繧｢繝励Μ縺ｧ螳溯｣・ｺ亥ｮ壹〒縺・);
  }
  return null;
}

/**
 * Google Fit騾｣謳ｺ・亥ｰ・擂螳溯｣・ｺ亥ｮ夲ｼ・ *
 * 豕ｨ諢・ Web繧｢繝励Μ縺ｧ縺ｯ逶ｴ謗･逧・↑騾｣謳ｺ縺ｯ荳榊庄閭ｽ縲・ * 繝｢繝舌う繝ｫ繧｢繝励Μ・・xpo・峨〒螳溯｣・ｺ亥ｮ壹・ */
export async function syncWithGoogleFit(): Promise<HealthData | null> {
  // 蟆・擂螳溯｣・ｺ亥ｮ・  if (import.meta.env.DEV) {
    console.log('Google Fit騾｣謳ｺ縺ｯ繝｢繝舌う繝ｫ繧｢繝励Μ縺ｧ螳溯｣・ｺ亥ｮ壹〒縺・);
  }
  return null;
}

