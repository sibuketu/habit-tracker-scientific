/**
 * CarnivoreOS - Feedback Contribution Manager
 *
 * 繝輔ぅ繝ｼ繝峨ヰ繝・け謗｡逕ｨ邂｡逅・ｼ磯夂衍縲∝ｮ溽ｸｾ莉倅ｸ趣ｼ・
 */

import { sendNotification } from './notificationManager';

const CONTRIBUTED_FEEDBACK_IDS_KEY = 'primal_logic_contributed_feedback_ids';
const CONTRIBUTED_FEEDBACK_COUNT_KEY = 'primal_logic_contributed_feedback_count';

/**
 * 謗｡逕ｨ縺輔ｌ縺溘ヵ繧｣繝ｼ繝峨ヰ繝・けID繧偵・繝ｼ繧ｯ
 * ・育ｮ｡逅・・′謇句虚縺ｧ險ｭ螳壹√∪縺溘・迚ｹ螳壹・繧ｭ繝ｼ繝ｯ繝ｼ繝峨〒閾ｪ蜍募愛螳夲ｼ・
 */
export function markFeedbackAsContributed(feedbackId: string, improvementDescription?: string): void {
  try {
    // 譌｢縺ｫ謗｡逕ｨ貂医∩縺九メ繧ｧ繝・け
    const contributedIds = getContributedFeedbackIds();
    if (contributedIds.includes(feedbackId)) {
      return; // 譌｢縺ｫ謗｡逕ｨ貂医∩
    }

    // 謗｡逕ｨ貂医∩ID繝ｪ繧ｹ繝医↓霑ｽ蜉
    contributedIds.push(feedbackId);
    localStorage.setItem(CONTRIBUTED_FEEDBACK_IDS_KEY, JSON.stringify(contributedIds));

    // 謗｡逕ｨ蝗樊焚繧偵き繧ｦ繝ｳ繝・
    const currentCount = getContributedFeedbackCount();
    const newCount = currentCount + 1;
    localStorage.setItem(CONTRIBUTED_FEEDBACK_COUNT_KEY, newCount.toString());

    // 騾夂衍繧帝∽ｿ｡
    const title = '脂 縺ゅ↑縺溘・繝輔ぅ繝ｼ繝峨ヰ繝・け縺梧治逕ｨ縺輔ｌ縺ｾ縺励◆・・;
    const body = improvementDescription
      ? `莉雁屓縺ｮ菫ｮ豁｣縲・{improvementDescription}縲阪・縲√≠縺ｪ縺溘・繝輔ぅ繝ｼ繝峨ヰ繝・け繧貞・縺ｫ謾ｹ蝟・＆繧後∪縺励◆縲Ａ
      : '縺ゅ↑縺溘・繝輔ぅ繝ｼ繝峨ヰ繝・け縺後い繝励Μ縺ｫ雋｢迪ｮ縺励∪縺励◆縲・;

    sendNotification(title, {
      body,
      data: {
        screen: 'results',
        type: 'feedback_contributed',
        feedbackId,
      },
    });

    // 繧､繝吶Φ繝医ｒ逋ｺ轣ｫ縺励※Achievements繧ｳ繝ｳ繝昴・繝阪Φ繝医↓騾夂衍
    window.dispatchEvent(new CustomEvent('feedbackContributed', { detail: { feedbackId, count: newCount } }));

    // 繝医・繧ｹ繝磯夂衍繧り｡ｨ遉ｺ・磯夂衍讓ｩ髯舌′縺ｪ縺・ｴ蜷医・繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ・・
    if (typeof window !== 'undefined' && (window as any).showToast) {
      (window as any).showToast(`脂 ${body}`);
    }
  } catch (error) {
    console.warn('Failed to mark feedback as contributed:', error);
  }
}

/**
 * 謗｡逕ｨ縺輔ｌ縺溘ヵ繧｣繝ｼ繝峨ヰ繝・けID繝ｪ繧ｹ繝医ｒ蜿門ｾ・
 */
export function getContributedFeedbackIds(): string[] {
  try {
    const saved = localStorage.getItem(CONTRIBUTED_FEEDBACK_IDS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  } catch (error) {
    console.warn('Failed to get contributed feedback IDs:', error);
    return [];
  }
}

/**
 * 謗｡逕ｨ縺輔ｌ縺溘ヵ繧｣繝ｼ繝峨ヰ繝・け蝗樊焚繧貞叙蠕・
 */
export function getContributedFeedbackCount(): number {
  try {
    const count = localStorage.getItem(CONTRIBUTED_FEEDBACK_COUNT_KEY);
    return count ? parseInt(count, 10) : 0;
  } catch (error) {
    console.warn('Failed to get contributed feedback count:', error);
    return 0;
  }
}

/**
 * 繝輔ぅ繝ｼ繝峨ヰ繝・けID縺梧治逕ｨ貂医∩縺九メ繧ｧ繝・け
 */
export function isFeedbackContributed(feedbackId: string): boolean {
  const contributedIds = getContributedFeedbackIds();
  return contributedIds.includes(feedbackId);
}

/**
 * 繧｢繝励Μ襍ｷ蜍墓凾縺ｫ謗｡逕ｨ縺輔ｌ縺溘ヵ繧｣繝ｼ繝峨ヰ繝・け繧偵メ繧ｧ繝・け
 * ・亥ｰ・擂逧・↓API縺九ｉ蜿門ｾ励☆繧九％縺ｨ繧呈Φ螳夲ｼ・
 */
export function checkContributedFeedbackOnStartup(): void {
  // Future feature: 蟆・擂逧・↓API縺九ｉ蜿門ｾ励☆繧九％縺ｨ繧呈Φ螳・
  // 迴ｾ譎らせ縺ｧ縺ｯ縲〕ocalStorage縺ｫ菫晏ｭ倥＆繧後◆謗｡逕ｨ貂医∩ID繧堤｢ｺ隱阪☆繧九・縺ｿ

  // 萓・ 迚ｹ螳壹・繧ｭ繝ｼ繝ｯ繝ｼ繝峨ｒ蜷ｫ繧繝輔ぅ繝ｼ繝峨ヰ繝・け繧定・蜍慕噪縺ｫ謗｡逕ｨ貂医∩縺ｫ縺吶ｋ
  // ・亥ｮ溯｣・・蠕梧律縲∫ｮ｡逅・・′謇句虚縺ｧ險ｭ螳壹☆繧倶ｻ慕ｵ・∩縺ｫ螟画峩莠亥ｮ夲ｼ・
}

