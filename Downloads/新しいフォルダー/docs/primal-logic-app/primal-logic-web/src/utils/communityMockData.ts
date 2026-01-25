/**
 * Community Mock Data - 繧ｳ繝溘Η繝九ユ繧｣縺ｮ繝・ヰ繝・げ逕ｨ繝｢繝・け繝・・繧ｿ
 */

export interface CommunityInsight {
  id: string;
  title: string;
  description: string;
  stat: string;
  category: 'nutrition' | 'recovery' | 'symptom';
}

export interface CommunityPattern {
  id: string;
  pattern: string;
  description: string;
  percentage: number;
  sampleSize: number;
}

export const mockCommunityInsights: CommunityInsight[] = [
  {
    id: '1',
    title: '荳狗里縺ｮ謾ｹ蝟・,
    description: '荳狗里繧堤ｵ碁ｨ薙＠縺溘Θ繝ｼ繧ｶ繝ｼ縺ｮ80%縺後∝｡ｩ蛻・ｒ蠅励ｄ縺吶％縺ｨ縺ｧ3譌･莉･蜀・↓謾ｹ蝟・,
    stat: '80%',
    category: 'symptom',
  },
  {
    id: '2',
    title: '萓ｿ遘倥・謾ｹ蝟・,
    description: '萓ｿ遘倥ｒ邨碁ｨ薙＠縺溘Θ繝ｼ繧ｶ繝ｼ縺ｮ75%縺後√・繧ｰ繝阪す繧ｦ繝繧・00mg莉･荳頑曹蜿悶☆繧九％縺ｨ縺ｧ謾ｹ蝟・,
    stat: '75%',
    category: 'symptom',
  },
  {
    id: '3',
    title: '驕募渚縺九ｉ縺ｮ蝗槫ｾｩ',
    description: '驕募渚蠕後・6譎る俣繝輔ぃ繧ｹ繝・ぅ繝ｳ繧ｰ繧貞ｮ滓命縺励◆繝ｦ繝ｼ繧ｶ繝ｼ縺ｮ90%縺・譌･莉･蜀・↓蝗槫ｾｩ',
    stat: '90%',
    category: 'recovery',
  },
  {
    id: '4',
    title: '繧ｿ繝ｳ繝代け雉ｪ鞫ょ叙驥・,
    description: '繧ｳ繝溘Η繝九ユ繧｣蜈ｨ菴薙・蟷ｳ蝮・ち繝ｳ繝代け雉ｪ鞫ょ叙驥上・120g/譌･',
    stat: '120g/譌･',
    category: 'nutrition',
  },
  {
    id: '5',
    title: '鬆ｭ逞帙・謾ｹ蝟・,
    description: '鬆ｭ逞帙ｒ邨碁ｨ薙＠縺溘Θ繝ｼ繧ｶ繝ｼ縺ｮ70%縺後√リ繝医Μ繧ｦ繝繧・000mg莉･荳頑曹蜿悶☆繧九％縺ｨ縺ｧ謾ｹ蝟・,
    stat: '70%',
    category: 'symptom',
  },
];

export const mockCommunityPatterns: CommunityPattern[] = [
  {
    id: '1',
    pattern: '荳狗里 竊・蝪ｩ蛻・｢怜刈',
    description: '荳狗里繧堤ｵ碁ｨ薙＠縺滉ｺｺ縺ｮ80%縺後∝｡ｩ蛻・ｒ蠅励ｄ縺吶％縺ｨ縺ｧ3譌･莉･蜀・↓謾ｹ蝟・,
    percentage: 80,
    sampleSize: 1250,
  },
  {
    id: '2',
    pattern: '萓ｿ遘・竊・繝槭げ繝阪す繧ｦ繝蠅怜刈',
    description: '萓ｿ遘倥ｒ邨碁ｨ薙＠縺滉ｺｺ縺ｮ75%縺後√・繧ｰ繝阪す繧ｦ繝繧・00mg莉･荳頑曹蜿悶☆繧九％縺ｨ縺ｧ謾ｹ蝟・,
    percentage: 75,
    sampleSize: 980,
  },
  {
    id: '3',
    pattern: '鬆ｭ逞・竊・繝翫ヨ繝ｪ繧ｦ繝蠅怜刈',
    description: '鬆ｭ逞帙ｒ邨碁ｨ薙＠縺滉ｺｺ縺ｮ70%縺後√リ繝医Μ繧ｦ繝繧・000mg莉･荳頑曹蜿悶☆繧九％縺ｨ縺ｧ謾ｹ蝟・,
    percentage: 70,
    sampleSize: 650,
  },
  {
    id: '4',
    pattern: '驕募渚 竊・16譎る俣繝輔ぃ繧ｹ繝・ぅ繝ｳ繧ｰ',
    description: '驕募渚蠕後・6譎る俣繝輔ぃ繧ｹ繝・ぅ繝ｳ繧ｰ繧貞ｮ滓命縺励◆莠ｺ縺ｮ90%縺・譌･莉･蜀・↓蝗槫ｾｩ',
    percentage: 90,
    sampleSize: 2100,
  },
  {
    id: '5',
    pattern: '縺薙・繧芽ｿ斐ｊ 竊・繝槭げ繝阪す繧ｦ繝蠅怜刈',
    description: '縺薙・繧芽ｿ斐ｊ繧堤ｵ碁ｨ薙＠縺滉ｺｺ縺ｮ85%縺後√・繧ｰ繝阪す繧ｦ繝繧貞｢励ｄ縺吶％縺ｨ縺ｧ謾ｹ蝟・,
    percentage: 85,
    sampleSize: 420,
  },
];

