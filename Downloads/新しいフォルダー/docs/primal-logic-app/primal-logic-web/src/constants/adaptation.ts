export const HUNTER_PATH_CONSTANTS = {
  // Phase Definitions
  PHASES: {
    1: {
      name: 'The Purge',
      durationDays: 7,
      carbLimit: 50,
      fastingWindow: 0,
      description: '隗｣豈偵ヵ繧ｧ繝ｼ繧ｺ縲よ､咲黄豐ｹ縲∫らｳ悶∝ｰ城ｺｦ邊峨ｒ謐ｨ縺ｦ繧医・,
      allowedFoods: ['beef', 'pork', 'chicken', 'eggs', 'fish', 'butter', 'avocado', 'berries'],
    },
    2: {
      name: 'The Switch',
      durationDays: 7,
      carbLimit: 20,
      fastingWindow: 12,
      description: '辯・侭霆｢謠帙ヵ繧ｧ繝ｼ繧ｺ縲よ､咲黄諤ｧ鬟溷刀繧貞ｮ悟・謗帝勁縺帙ｈ縲・,
      allowedFoods: ['beef', 'pork', 'chicken', 'eggs', 'fish', 'animal_fat'],
    },
    3: {
      name: 'Adaptation',
      durationDays: 7,
      carbLimit: 0,
      fastingWindow: 14,
      description: '驕ｩ蠢懊ヵ繧ｧ繝ｼ繧ｺ縲・:P豈皮紫繧呈э隴倥○繧医・,
      allowedFoods: ['beef', 'organs', 'salt', 'water'],
    },
    4: {
      name: 'The Hunter',
      durationDays: 9, // Up to 30 days total
      carbLimit: 0,
      fastingWindow: 16,
      description: '隕夐・繝輔ぉ繝ｼ繧ｺ縲・譌･2鬟溘∈遘ｻ陦後○繧医・,
      allowedFoods: ['beef', 'organs', 'salt', 'water'],
    },
  },

  // Keto Flu Solutions (Neo's Prescriptions)
  KETO_FLU: {
    HEADACHE: {
      symptom: '鬆ｭ逞帙・縺ｵ繧峨▽縺・,
      cause: '閼ｱ豌ｴ・医リ繝医Μ繧ｦ繝荳崎ｶｳ・・,
      action: '豌ｴ200ml縺ｫ螟ｩ辟ｶ蝪ｩ3g・亥ｰ上＆縺伜濠蛻・ｼ峨ｒ貅ｶ縺九＠縺ｦ荳豌励↓鬟ｲ繧√・,
      icon: 'ｧ・,
    },
    CRAMPS: {
      symptom: '雜ｳ縺ｮ縺､繧・,
      cause: '繝槭げ繝阪す繧ｦ繝荳崎ｶｳ',
      action: '閧峨↓譎ｮ谿ｵ縺ｮ2蛟阪・蝪ｩ繧呈険繧後ゅお繝励た繝繧ｽ繝ｫ繝亥・豬ｴ繧偵○繧医・,
      icon: '笞｡',
    },
    DIARRHEA: {
      symptom: '荳狗里',
      cause: '閼りｳｪ縺ｮ鞫ゅｊ縺吶℃・郁ユ豎∽ｸ崎ｶｳ・・,
      action: '鬟滉ｺ倶ｸｭ縺ｮ豌ｴ繧呈而縺医ｍ縲りｿｽ蜉縺ｮ繝舌ち繝ｼ繧呈ｸ帙ｉ縺帙・,
      icon: '埒',
    },
    SUGAR_CRAVING: {
      symptom: '遐らｳ悶∈縺ｮ貂・悍',
      cause: '謔ｪ邇芽曙縺ｮ譁ｭ譛ｫ鬲・,
      action: '蜀ｷ縺溘＞繝舌ち繝ｼ10g繧貞剱繧√ゅ・繝ｼ繧ｳ繝ｳ繧堤┥縺代りр雉ｪ縺ｧ閼ｳ繧帝ｻ吶ｉ縺帙ｍ縲・,
      icon: '･・,
    },
  },

  // Onboarding Scripts
  ONBOARDING: {
    AWAKENING_1:
      '蜷帙・縺壹▲縺ｨ驕募柱諢溘ｒ諢溘§縺ｦ縺・◆縺繧阪≧・歃n繧ｫ繝ｭ繝ｪ繝ｼ繧定ｨ育ｮ励＠縲・㍽闖懊ｒ鬟溘∋縲∵ｲｹ繧呈而縺医※縺・ｋ縺ｮ縺ｫ窶ｦ\n縺ｪ縺懃夢繧後′蜿悶ｌ縺ｪ縺・ｼ・縺ｪ縺懷､ｪ繧具ｼ・縺ｪ縺懃羅繧・・,
    AWAKENING_2:
      '縺昴ｌ縺ｯ蜷帙′謔ｪ縺・・縺ｧ縺ｯ縺ｪ縺・・n謨吶∴繧峨ｌ縺溘弱Ν繝ｼ繝ｫ縲上′髢馴＆縺｣縺ｦ縺・◆縺ｮ縺縲・n莠ｺ鬘槭・250荳・ｹｴ縲∫叫莠ｺ・・unter・峨□縺｣縺溘・n霎ｲ閠輔ｒ蟋九ａ縺溘・縺ｯ縺溘▲縺・荳・ｹｴ蜑阪□縲・,
    CHOICE_BLUE: {
      label: 'Standard Mode',
      desc: '莉翫・縺ｾ縺ｾ縲∝ｰ代＠蛛･蠎ｷ縺ｫ縺ｪ繧・,
      neo_comment: '蠕捺擂縺ｮ繝ｭ繧ｸ繝・け縺ｧ邂｡逅・☆繧九よが縺上・縺ｪ縺・′縲∫悄螳溘〒縺ｯ縺ｪ縺・・,
    },
    CHOICE_RED: {
      label: "Hunter's Path",
      desc: '譛ｬ譚･縺ｮ驥守函繧貞叙繧頑綾縺呻ｼ・0譌･髢薙・螟蛾擠・・,
      neo_comment:
        '讀咲黄豈偵ｒ謗帝勁縺励∝虚迚ｩ諤ｧ鬟溷刀縺縺代〒菴薙ｒ蜀肴ｧ狗ｯ峨☆繧九・n譛蛻昴・1騾ｱ髢薙・蝨ｰ迯・°繧ゅ＠繧後↑縺・・n縺縺後√◎縺ｮ蜈医↓縺ｯ隕九◆縺薙→縺ｮ縺ｪ縺・勹濶ｲ縺悟ｾ・▲縺ｦ縺・ｋ縲・,
    },
    WELCOME:
      '雉｢譏弱↑蛻､譁ｭ縺縲・n繧医≧縺薙◎縲∫樟螳溘・荳也阜縺ｸ縲・n縺ｾ縺壹・蜀ｷ阡ｵ蠎ｫ縺ｮ荳ｭ霄ｫ繧堤ｩｺ縺ｫ縺吶ｋ縺薙→縺九ｉ蟋九ａ繧医≧縲・,
  },
};

