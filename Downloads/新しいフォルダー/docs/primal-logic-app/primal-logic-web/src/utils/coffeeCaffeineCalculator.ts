/**
 * CarnivoreOS - Coffee Caffeine Calculator
 *
 * 繧ｳ繝ｼ繝偵・蜈･蜉帙°繧峨き繝輔ぉ繧､繝ｳ驥上ｒ閾ｪ蜍戊ｨ育ｮ・ */

// 繧ｹ繧ｿ繝舌・繧ｵ繧､繧ｺ蛻･繧ｫ繝輔ぉ繧､繝ｳ蜷ｫ譛蛾㍼・・g・・const STARBUCKS_CAFFEINE: Record<string, number> = {
  short: 155, // 240ml
  tall: 220, // 350ml
  grande: 330, // 470ml
  venti: 415, // 590ml
  trenta: 475, // 920ml・医さ繝ｼ繝ｫ繝峨ラ繝ｪ繝ｳ繧ｯ縺ｮ縺ｿ・・};

// 荳闊ｬ逧・↑繧ｳ繝ｼ繝偵・縺ｮ繧ｫ繝輔ぉ繧､繝ｳ蜷ｫ譛蛾㍼・・g/100ml・・const COFFEE_CAFFEINE_PER_100ML = 60; // 繝峨Μ繝・・繧ｳ繝ｼ繝偵・

/**
 * 繧ｳ繝ｼ繝偵・蜈･蜉帙°繧峨き繝輔ぉ繧､繝ｳ驥上ｒ險育ｮ・ *
 * @param input 繧ｳ繝ｼ繝偵・蜈･蜉幢ｼ井ｾ・ "繧ｹ繧ｿ繝舌・繧ｳ繝ｼ繝偵・Short", "繧ｳ繝ｼ繝偵・2譚ｯ", "繧ｳ繝ｼ繝偵・300ml"・・ * @returns 繧ｫ繝輔ぉ繧､繝ｳ驥擾ｼ・g・峨→隱ｬ譏・ */
export function calculateCaffeineFromCoffee(input: string): {
  caffeineMg: number;
  description: string;
} {
  const lowerInput = input.toLowerCase().trim();

  // 繧ｹ繧ｿ繝舌・繧ｵ繧､繧ｺ繧呈､懷・
  for (const [size, caffeine] of Object.entries(STARBUCKS_CAFFEINE)) {
    if (lowerInput.includes(`繧ｹ繧ｿ繝秦) || lowerInput.includes(`starbucks`)) {
      if (lowerInput.includes(size)) {
        return {
          caffeineMg: caffeine,
          description: `繧ｹ繧ｿ繝・${size}繧ｵ繧､繧ｺ: ${caffeine}mg`,
        };
      }
    }
  }

  // 譚ｯ謨ｰ繧呈､懷・・井ｾ・ "繧ｳ繝ｼ繝偵・2譚ｯ"・・  const cupMatch = lowerInput.match(/(\d+)\s*譚ｯ/);
  if (cupMatch) {
    const cups = parseInt(cupMatch[1], 10);
    // 1譚ｯ = 200ml・域律譛ｬ縺ｮ荳闊ｬ逧・↑繧ｳ繝ｼ繝偵・繧ｫ繝・・・・    const ml = cups * 200;
    const caffeine = (ml / 100) * COFFEE_CAFFEINE_PER_100ML;
    return {
      caffeineMg: Math.round(caffeine),
      description: `繧ｳ繝ｼ繝偵・${cups}譚ｯ・・{ml}ml・・ 邏・{Math.round(caffeine)}mg`,
    };
  }

  // ml謨ｰ繧呈､懷・・井ｾ・ "繧ｳ繝ｼ繝偵・300ml"・・  const mlMatch = lowerInput.match(/(\d+)\s*ml/);
  if (mlMatch) {
    const ml = parseInt(mlMatch[1], 10);
    const caffeine = (ml / 100) * COFFEE_CAFFEINE_PER_100ML;
    return {
      caffeineMg: Math.round(caffeine),
      description: `繧ｳ繝ｼ繝偵・${ml}ml: 邏・{Math.round(caffeine)}mg`,
    };
  }

  // 繝・ヵ繧ｩ繝ｫ繝・ 1譚ｯ縺ｨ莉ｮ螳・  return {
    caffeineMg: Math.round((200 / 100) * COFFEE_CAFFEINE_PER_100ML),
    description: `繧ｳ繝ｼ繝偵・1譚ｯ・・00ml・・ 邏・{Math.round((200 / 100) * COFFEE_CAFFEINE_PER_100ML)}mg・域耳螳夲ｼ荏,
  };
}

/**
 * 繧ｫ繝輔ぉ繧､繝ｳ驥上°繧画曹蜿悶Ξ繝吶Ν繧貞愛螳・ */
export function getCaffeineIntakeLevel(caffeineMg: number): 'none' | 'low' | 'moderate' | 'high' {
  if (caffeineMg === 0) return 'none';
  if (caffeineMg < 100) return 'low';
  if (caffeineMg < 300) return 'moderate';
  return 'high';
}

