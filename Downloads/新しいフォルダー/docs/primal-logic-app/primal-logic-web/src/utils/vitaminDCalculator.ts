/**
 * CarnivoreOS - Vitamin D Calculator
 *
 * Solar Charge (螟ｪ髯ｽ蜈画垓髴ｲ) 縺九ｉ Vitamin D 蜷域・驥上ｒ險育ｮ・ * 謚陦謎ｻ墓ｧ俶嶌: @Primal_Logic_Technical_Spec.md 蜿ら・
 */

/**
 * Calculate Vitamin D synthesis from sun exposure
 *
 * Simplified calculation based on:
 * - Time of exposure (minutes)
 * - Skin exposure area (simplified to "full body" vs "arms/face")
 * - UV index (simplified to "sunny" vs "cloudy")
 *
 * Note: This is a simplified model. Real calculation would consider:
 * - Latitude
 * - Time of day
 * - Season
 * - Skin type
 * - Age
 */
export interface SunExposure {
  minutes: number;
  isSunny: boolean; // true = sunny, false = cloudy
  exposureArea?: 'full' | 'partial'; // full body vs arms/face only
  weatherFactor?: number; // 螟ｩ豌玲ュ蝣ｱ縺ｫ繧医ｋ菫よ焚・・-1縲『eatherService縺九ｉ蜿門ｾ暦ｼ・  uvIndex?: number; // UV謖・焚・・-11+・・  cloudCover?: number; // 髮ｲ驥擾ｼ・-100%・・}

/**
 * Calculate Vitamin D synthesis (IU)
 *
 * Rough estimates:
 * - Full body, sunny, 30 min: ~10,000-20,000 IU
 * - Arms/face, sunny, 30 min: ~2,000-4,000 IU
 * - Cloudy reduces by ~50-70%
 */
export function calculateVitaminDSynthesis(exposure: SunExposure): number {
  const {
    minutes,
    isSunny,
    exposureArea = 'partial',
    weatherFactor,
    uvIndex,
    cloudCover,
  } = exposure;

  // Base synthesis rate (IU per minute)
  // Full body exposure: ~500-700 IU/min (sunny)
  // Partial exposure (arms/face): ~100-150 IU/min (sunny)
  const baseRate = exposureArea === 'full' ? 600 : 120;

  // 螟ｩ豌玲ュ蝣ｱ縺ｫ繧医ｋ菫よ焚繧帝←逕ｨ・・eatherService縺九ｉ蜿門ｾ励＠縺溷ｴ蜷茨ｼ・  let rate = baseRate;
  if (weatherFactor !== undefined) {
    // weatherFactor縺梧署萓帙＆繧後※縺・ｋ蝣ｴ蜷医・縺昴ｌ繧剃ｽｿ逕ｨ・医ｈ繧頑ｭ｣遒ｺ・・    rate = baseRate * weatherFactor;
  } else {
    // 蠕捺擂縺ｮ譁ｹ豕包ｼ・sSunny縺ｮ縺ｿ・・    // Cloudy conditions reduce synthesis by ~60%
    rate = isSunny ? baseRate : baseRate * 0.4;

    // UV謖・焚縺ｨ髮ｲ驥上′謠蝉ｾ帙＆繧後※縺・ｋ蝣ｴ蜷医・繧医ｊ豁｣遒ｺ縺ｫ險育ｮ・    if (uvIndex !== undefined && cloudCover !== undefined) {
      // UV謖・焚縺ｫ繧医ｋ蠖ｱ髻ｿ・・-11+繧・.3-1.5縺ｮ遽・峇縺ｫ繝槭ャ繝斐Φ繧ｰ・・      const uvFactor = 0.3 + (uvIndex / 11) * 1.2;
      // 髮ｲ驥上↓繧医ｋ蠖ｱ髻ｿ・磯峇驥上′螟壹＞縺ｻ縺ｩ菫よ焚縺御ｽ弱＞・・      const cloudFactor = (100 - cloudCover) / 100;
      rate = baseRate * Math.min(uvFactor, 1.5) * cloudFactor;
    }
  }

  // Calculate total synthesis
  const total = rate * minutes;

  // Cap at reasonable maximum (very long exposure doesn't linearly increase)
  // After ~30-60 min, additional exposure has diminishing returns
  if (minutes > 60) {
    const capped = rate * 60;
    const additional = rate * 0.3 * (minutes - 60); // Diminishing returns
    return Math.round(capped + additional);
  }

  return Math.round(total);
}

/**
 * Get recommended sun exposure based on current Vitamin D status
 *
 * Note: This is a simplified recommendation. Real recommendations
 * would consider current blood levels, latitude, season, etc.
 */
export function getRecommendedSunExposure(
  currentLevel?: number // Current Vitamin D level (ng/mL)
): { minutes: number; frequency: string } {
  // Default recommendation: 15-30 min, 3-4 times per week
  if (!currentLevel) {
    return {
      minutes: 20,
      frequency: '3-4 times per week',
    };
  }

  if (currentLevel < 20) {
    // Deficient
    return {
      minutes: 30,
      frequency: 'Daily until levels improve',
    };
  }

  if (currentLevel < 30) {
    // Insufficient
    return {
      minutes: 25,
      frequency: '4-5 times per week',
    };
  }

  // Optimal
  return {
    minutes: 15,
    frequency: '2-3 times per week',
  };
}

