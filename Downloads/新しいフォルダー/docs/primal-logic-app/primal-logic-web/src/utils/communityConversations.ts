/**
 * Community Conversations - 繧ｳ繝溘Η繝九ユ繧｣莨夊ｩｱ縺ｮ繝｢繝・け繝・・繧ｿ
 *
 * 繝ｦ繝ｼ繧ｶ繝ｼ蜷悟｣ｫ縺ｮ莨夊ｩｱ縺後ョ繝ｼ繧ｿ縺ｨ縺励※隗｣譫舌＆繧後・寔蜷育衍縺ｫ縺ｪ繧玖ｨｭ險・ */

export interface CommunityConversation {
  id: string;
  title: string;
  category: 'question' | 'experience' | 'tip';
  author: string;
  content: string;
  replies: number;
  views: number;
  upvotes: number;
  timestamp: string;
  tags: string[];
}

export const mockConversations: CommunityConversation[] = [
  {
    id: '1',
    title: '荳狗里縺檎ｶ壹＞縺ｦ縺・∪縺吶ゅ←縺・ｯｾ蜃ｦ縺吶∋縺阪〒縺吶°・・,
    category: 'question',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼA',
    content: '繧ｫ繝ｼ繝九・繧｢繧貞ｧ九ａ縺ｦ3譌･逶ｮ縺ｧ縺吶′縲∽ｸ狗里縺檎ｶ壹＞縺ｦ縺・∪縺吶ょ｡ｩ蛻・ｒ蠅励ｄ縺吶∋縺阪〒縺励ｇ縺・°・・,
    replies: 12,
    views: 245,
    upvotes: 8,
    timestamp: '2譎る俣蜑・,
    tags: ['荳狗里', '蛻晏ｿ・・, '逞・憾'],
  },
  {
    id: '2',
    title: '萓ｿ遘倥′謾ｹ蝟・＠縺ｾ縺励◆・√・繧ｰ繝阪す繧ｦ繝600mg縺ｧ',
    category: 'experience',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼB',
    content:
      '繝槭げ繝阪す繧ｦ繝繧・00mg鞫ょ叙縺吶ｋ繧医≧縺ｫ縺励◆繧峨∽ｾｿ遘倥′螳悟・縺ｫ謾ｹ蝟・＠縺ｾ縺励◆縲・騾ｱ髢鍋ｶ壹￠縺ｦ縺・∪縺吶・,
    replies: 5,
    views: 189,
    upvotes: 15,
    timestamp: '5譎る俣蜑・,
    tags: ['萓ｿ遘・, '謾ｹ蝟・, '繝槭げ繝阪す繧ｦ繝'],
  },
  {
    id: '3',
    title: '驕募渚蠕後・蝗槫ｾｩ譁ｹ豕輔↓縺､縺・※',
    category: 'question',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼC',
    content: '縺・▲縺九ｊ轤ｭ豌ｴ蛹也黄繧呈曹蜿悶＠縺ｦ縺励∪縺・∪縺励◆縲・6譎る俣繝輔ぃ繧ｹ繝・ぅ繝ｳ繧ｰ縺ｧ蝗槫ｾｩ縺ｧ縺阪∪縺吶°・・,
    replies: 18,
    views: 312,
    upvotes: 11,
    timestamp: '1譌･蜑・,
    tags: ['驕募渚', '蝗槫ｾｩ', '繝輔ぃ繧ｹ繝・ぅ繝ｳ繧ｰ'],
  },
  {
    id: '4',
    title: '蝪ｩ蛻・・鞫ょ叙驥上↓縺､縺・※',
    category: 'question',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼD',
    content: '1譌･縺ｩ縺ｮ縺上ｉ縺・・蝪ｩ蛻・ｒ鞫ょ叙縺吶∋縺阪〒縺吶°・・000mg莉･荳翫→閨槭″縺ｾ縺励◆縺・..',
    replies: 23,
    views: 456,
    upvotes: 19,
    timestamp: '1譌･蜑・,
    tags: ['蝪ｩ蛻・, '繝翫ヨ繝ｪ繧ｦ繝', '蛻晏ｿ・・],
  },
  {
    id: '5',
    title: '鬆ｭ逞帙′邯壹＞縺ｦ縺・∪縺吶ゅリ繝医Μ繧ｦ繝荳崎ｶｳ縺ｧ縺励ｇ縺・°・・,
    category: 'question',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼE',
    content: '繧ｫ繝ｼ繝九・繧｢繧貞ｧ九ａ縺ｦ縺九ｉ鬆ｭ逞帙′邯壹＞縺ｦ縺・∪縺吶ゅリ繝医Μ繧ｦ繝繧貞｢励ｄ縺吶∋縺阪〒縺励ｇ縺・°・・,
    replies: 9,
    views: 167,
    upvotes: 6,
    timestamp: '2譌･蜑・,
    tags: ['鬆ｭ逞・, '繝翫ヨ繝ｪ繧ｦ繝', '逞・憾'],
  },
  {
    id: '6',
    title: '縺薙・繧芽ｿ斐ｊ縺後↑縺上↑繧翫∪縺励◆',
    category: 'experience',
    author: '蛹ｿ蜷阪Θ繝ｼ繧ｶ繝ｼF',
    content:
      '繝槭げ繝阪す繧ｦ繝繧貞｢励ｄ縺励◆繧峨√％繧繧芽ｿ斐ｊ縺悟ｮ悟・縺ｫ縺ｪ縺上↑繧翫∪縺励◆縲よｯ取律400mg鞫ょ叙縺励※縺・∪縺吶・,
    replies: 4,
    views: 134,
    upvotes: 12,
    timestamp: '2譌･蜑・,
    tags: ['縺薙・繧芽ｿ斐ｊ', '謾ｹ蝟・, '繝槭げ繝阪す繧ｦ繝'],
  },
];

