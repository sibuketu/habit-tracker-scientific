/**
 * CarnivoreOS - ROI Calculator
 *
 * Primal ROI・・eturn on Investment・芽ｨ育ｮ励Ο繧ｸ繝・け
 * 萓｡譬ｼ縺ｫ蟇ｾ縺吶ｋ譬・､顔ｴ縺ｮ雋ｻ逕ｨ蟇ｾ蜉ｹ譫懊ｒ險育ｮ・ */

export type ROIMode = 'muscle' | 'energy' | 'primal';

export interface ROICalculatorInput {
  protein: number; // g
  fat: number; // g
  price: number; // 蜀・  foodType?: string; // 'liver', 'organ', 'beef', 'pork', 'chicken', 'fish', etc.
  amount?: number; // g・郁・閾薙・豈呈ｧ繝√ぉ繝・け逕ｨ・・}

export interface ROIResult {
  mode: ROIMode;
  score: number | string; // 謨ｰ蛟､ or "竏・
  unit: string;
  interpretation: 'excellent' | 'good' | 'fair' | 'poor' | 'invalid';
}

/**
 * Density Multipliers・域・､雁ｯ・ｺｦ菫よ焚・・ * CLAUDE_DEV_SPEC.md貅匁侠
 */
const DENSITY_MULTIPLIERS: Record<string, number> = {
  liver: 3.0,
  organ: 2.0,
  egg: 2.0,
  beef: 1.2,
  'red meat': 1.2,
  pork: 1.0,
  chicken: 1.0,
  poultry: 1.0,
  fish: 1.0,
};

/**
 * Deficiency Multipliers・域ｬ荵冗憾諷倶ｿよ焚・・ * Future feature: 繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ螳滄圀縺ｮ鞫ょ叙繝・・繧ｿ縺九ｉ險育ｮ暦ｼ育樟蝨ｨ縺ｯ繝繝溘・・・ */
const DEFICIENCY_MULTIPLIERS = {
  deficient: 5.0,
  normal: 1.0,
  excess: 0.1,
};

/**
 * Muscle ROI・育ｭ玖ｉ蜉ｹ邇・ｼ峨ｒ險育ｮ・ * Price / Protein (g)
 */
export function calculateMuscleROI(input: ROICalculatorInput): ROIResult {
  const { protein, price } = input;

  if (price <= 0 || price === null || price === undefined) {
    return {
      mode: 'muscle',
      score: '竏・,
      unit: '蜀・g',
      interpretation: 'invalid',
    };
  }

  if (protein <= 0) {
    return {
      mode: 'muscle',
      score: 0,
      unit: '蜀・g',
      interpretation: 'poor',
    };
  }

  const score = price / protein;

  return {
    mode: 'muscle',
    score: parseFloat(score.toFixed(2)),
    unit: '蜀・g',
    interpretation: getInterpretation(score, 'muscle'),
  };
}

/**
 * Energy ROI・医お繝阪Ν繧ｮ繝ｼ蜉ｹ邇・ｼ峨ｒ險育ｮ・ * Price / Fat (g)
 */
export function calculateEnergyROI(input: ROICalculatorInput): ROIResult {
  const { fat, price } = input;

  if (price <= 0 || price === null || price === undefined) {
    return {
      mode: 'energy',
      score: '竏・,
      unit: '蜀・g',
      interpretation: 'invalid',
    };
  }

  if (fat <= 0) {
    return {
      mode: 'energy',
      score: 0,
      unit: '蜀・g',
      interpretation: 'poor',
    };
  }

  const score = price / fat;

  return {
    mode: 'energy',
    score: parseFloat(score.toFixed(2)),
    unit: '蜀・g',
    interpretation: getInterpretation(score, 'energy'),
  };
}

/**
 * Primal ROI・・od Mode・峨ｒ險育ｮ・ * ((protein + fat) * densityMultiplier * deficiencyMultiplier) / price * 100
 */
export function calculatePrimalROI(input: ROICalculatorInput): ROIResult {
  const { protein, fat, price, foodType = '', amount = 0 } = input;

  if (price <= 0 || price === null || price === undefined) {
    return {
      mode: 'primal',
      score: '竏・,
      unit: 'pts',
      interpretation: 'invalid',
    };
  }

  // Density Multiplier・域・､雁ｯ・ｺｦ菫よ焚・・  let densityMultiplier = 1.0;
  const foodTypeLower = foodType.toLowerCase();

  if (foodTypeLower.includes('liver')) {
    densityMultiplier = DENSITY_MULTIPLIERS.liver;
  } else if (
    foodTypeLower.includes('organ') ||
    foodTypeLower.includes('heart') ||
    foodTypeLower.includes('kidney')
  ) {
    densityMultiplier = DENSITY_MULTIPLIERS.organ;
  } else if (foodTypeLower.includes('egg')) {
    densityMultiplier = DENSITY_MULTIPLIERS.egg;
  } else if (
    foodTypeLower.includes('beef') ||
    foodTypeLower.includes('ribeye') ||
    foodTypeLower.includes('sirloin')
  ) {
    densityMultiplier = DENSITY_MULTIPLIERS.beef;
  } else if (foodTypeLower.includes('pork')) {
    densityMultiplier = DENSITY_MULTIPLIERS.pork;
  } else if (foodTypeLower.includes('chicken') || foodTypeLower.includes('poultry')) {
    densityMultiplier = DENSITY_MULTIPLIERS.chicken;
  } else if (
    foodTypeLower.includes('fish') ||
    foodTypeLower.includes('salmon') ||
    foodTypeLower.includes('tuna')
  ) {
    densityMultiplier = DENSITY_MULTIPLIERS.fish;
  }

  // Deficiency Multiplier・域ｬ荵冗憾諷倶ｿよ焚・・  // Future feature: 繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ螳滄圀縺ｮ鞫ょ叙繝・・繧ｿ縺九ｉ險育ｮ・  // 迴ｾ蝨ｨ縺ｯ縲系ormal縲阪→縺励※1.0繧剃ｽｿ逕ｨ
  const deficiencyMultiplier = DEFICIENCY_MULTIPLIERS.normal;

  // Toxicity Penalty・郁・閾薙・豈呈ｧ繝壹リ繝ｫ繝・ぅ・・  let toxicityPenalty = 0;
  if (foodTypeLower.includes('liver') && amount > 200) {
    // 閧晁∮繧・00g莉･荳頑曹蜿悶＠縺溷ｴ蜷医√・繝翫Ν繝・ぅ驕ｩ逕ｨ
    const excessAmount = amount - 200;
    toxicityPenalty = excessAmount * 0.5; // 雜・℃蛻・↓蟇ｾ縺励※繝壹リ繝ｫ繝・ぅ
  }

  // Primal ROI險育ｮ・  const score =
    (((protein + fat) * densityMultiplier * deficiencyMultiplier) / price) * 100 - toxicityPenalty;

  return {
    mode: 'primal',
    score: parseFloat(score.toFixed(2)),
    unit: 'pts',
    interpretation: getInterpretation(score, 'primal'),
  };
}

/**
 * ROI繧ｹ繧ｳ繧｢縺ｮ隗｣驥医ｒ霑斐☆
 */
function getInterpretation(
  score: number,
  mode: ROIMode
): 'excellent' | 'good' | 'fair' | 'poor' | 'invalid' {
  if (typeof score === 'string') {
    return 'invalid';
  }

  if (mode === 'primal') {
    // Primal ROI: 繧ｹ繧ｳ繧｢縺碁ｫ倥＞縺ｻ縺ｩ濶ｯ縺・    if (score >= 100) return 'excellent';
    if (score >= 50) return 'good';
    if (score >= 20) return 'fair';
    return 'poor';
  } else {
    // Muscle ROI / Energy ROI: 萓｡譬ｼ/g 縺ｪ縺ｮ縺ｧ菴弱＞縺ｻ縺ｩ濶ｯ縺・    if (score <= 5) return 'excellent';
    if (score <= 10) return 'good';
    if (score <= 20) return 'fair';
    return 'poor';
  }
}

/**
 * 蜈ｨ縺ｦ縺ｮROI繧定ｨ育ｮ・ */
export function calculateAllROI(input: ROICalculatorInput) {
  return {
    muscle: calculateMuscleROI(input),
    energy: calculateEnergyROI(input),
    primal: calculatePrimalROI(input),
  };
}

