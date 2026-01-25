/**
 * CarnivoreOS - HeyGen API Integration
 *
 * HeyGen API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ * API莉墓ｧ・ https://www.heygen.com/api (隕∫｢ｺ隱・
 */

import type { VideoScript } from './videoGeneration';
import { logError } from '../utils/errorHandler';

const HEYGEN_API_KEY = import.meta.env.VITE_HEYGEN_API_KEY;
const HEYGEN_API_URL = 'https://api.heygen.com/v2'; // HeyGen API V2

export interface HeyGenVideoRequest {
  text: string; // 繧ｹ繧ｯ繝ｪ繝励ヨ繝・く繧ｹ繝茨ｼ・000譁・ｭ嶺ｻ･荳具ｼ・  avatar_id?: string; // 繧｢繝舌ち繝ｼID・亥ｿ・茨ｼ・  voice_id?: string; // 髻ｳ螢ｰID・亥ｿ・茨ｼ・  dimension?: {
    width: number;
    height: number;
  }; // 隗｣蜒丞ｺｦ・医ョ繝輔か繝ｫ繝・ 720p・・  background?: string; // 閭梧勹險ｭ螳・  caption?: boolean; // 繧ｭ繝｣繝励す繝ｧ繝ｳ陦ｨ遉ｺ
  test?: boolean; // 繝・せ繝医Δ繝ｼ繝・}

export interface HeyGenVideoResponse {
  data: {
    video_id: string;
    status: 'pending' | 'waiting' | 'processing' | 'completed' | 'failed';
    video_url?: string;
    error?: string;
  };
}

/**
 * HeyGen API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ * @param script 蜍慕判繧ｹ繧ｯ繝ｪ繝励ヨ
 * @param useFreePlan Free繝励Λ繝ｳ繧剃ｽｿ逕ｨ縺吶ｋ蝣ｴ蜷・rue・・蛻・・720p繝ｻ譛・譛ｬ縺ｾ縺ｧ・・ */
export async function generateVideoWithHeyGen(
  script: VideoScript,
  useFreePlan: boolean = false,
  apiKey?: string
): Promise<string> {
  const keyToUse = apiKey || HEYGEN_API_KEY;

  if (!keyToUse) {
    throw new Error('HeyGen API繧ｭ繝ｼ縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ縲・PI繧ｭ繝ｼ繧貞・蜉帙＠縺ｦ縺上□縺輔＞縲・);
  }

  // Free繝励Λ繝ｳ縺ｮ蝣ｴ蜷医√せ繧ｯ繝ｪ繝励ヨ髟ｷ縺輔ｒ500譁・ｭ励↓蛻ｶ髯・  if (useFreePlan) {
    if (script.script.length > 500) {
      throw new Error('Free繝励Λ繝ｳ縺ｧ縺ｯ繧ｹ繧ｯ繝ｪ繝励ヨ縺ｯ500譁・ｭ嶺ｻ･蜀・↓蛻ｶ髯舌＆繧後※縺・∪縺呻ｼ・蛻・ｻ･蜀・・蜍慕判逕ｨ・・);
    }
    if (script.duration > 180) {
      throw new Error('Free繝励Λ繝ｳ縺ｧ縺ｯ蜍慕判縺ｮ髟ｷ縺輔・3蛻・ｼ・80遘抵ｼ我ｻ･蜀・↓蛻ｶ髯舌＆繧後※縺・∪縺・);
    }
  } else {
    // 譛画侭繝励Λ繝ｳ縺ｮ蝣ｴ蜷医・000譁・ｭ励∪縺ｧ
    if (script.script.length > 5000) {
      throw new Error('Script text must be less than 5000 characters');
    }
  }

  const request: HeyGenVideoRequest = {
    text: script.script,
    // avatar_id縺ｨvoice_id縺ｯ蠢・医□縺後√ョ繝輔か繝ｫ繝亥､繧剃ｽｿ逕ｨ縺吶ｋ蝣ｴ蜷医・逵∫払蜿ｯ閭ｽ
    // 螳滄圀縺ｮ菴ｿ逕ｨ譎ゅ↓縺ｯ縲∽ｺ句燕縺ｫList Avatars API縺ｨList Voices API縺ｧ蜿門ｾ励＠縺櫑D繧剃ｽｿ逕ｨ
    dimension: useFreePlan
      ? { width: 1280, height: 720 } // Free繝励Λ繝ｳ: 720p
      : { width: 1920, height: 1080 }, // 譛画侭繝励Λ繝ｳ: 1080p・・eam繝励Λ繝ｳ縺ｪ繧・K繧ょ庄閭ｽ・・  };

  try {
    // Step 1: 蜍慕判逕滓・繝ｪ繧ｯ繧ｨ繧ｹ繝医ｒ騾∽ｿ｡
    // 繧ｨ繝ｳ繝峨・繧､繝ｳ繝・ POST https://api.heygen.com/v2/video/generate
    const response = await fetch(`${HEYGEN_API_URL}/video/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': keyToUse, // HeyGen API縺ｯX-Api-Key繝倥ャ繝繝ｼ繧剃ｽｿ逕ｨ
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyGen API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const result: HeyGenVideoResponse = await response.json();
    const data = result.data;

    // Step 2: 蜍慕判逕滓・縺ｮ螳御ｺ・ｒ蠕・▽・医・繝ｼ繝ｪ繝ｳ繧ｰ・・    if (data.status === 'pending' || data.status === 'waiting' || data.status === 'processing') {
      return await pollVideoStatus(data.video_id, keyToUse);
    }

    if (data.status === 'completed' && data.video_url) {
      return data.video_url;
    }

    throw new Error(data.error || 'Video generation failed');
  } catch (error) {
    logError(error, { component: 'videoGenerationHeyGen', action: 'generateVideoWithHeyGen' });
    throw error;
  }
}

/**
 * 蜍慕判逕滓・縺ｮ繧ｹ繝・・繧ｿ繧ｹ繧偵・繝ｼ繝ｪ繝ｳ繧ｰ
 */
async function pollVideoStatus(
  videoId: string,
  apiKey: string,
  maxAttempts = 60,
  intervalMs = 5000
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

    try {
      // 繧ｨ繝ｳ繝峨・繧､繝ｳ繝・ GET https://api.heygen.com/v2/video_status?video_id={video_id}
      const response = await fetch(`${HEYGEN_API_URL}/video_status?video_id=${videoId}`, {
        headers: {
          'X-Api-Key': apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to check video status: ${response.statusText}`);
      }

      const result: HeyGenVideoResponse = await response.json();
      const data = result.data;

      if (data.status === 'completed' && data.video_url) {
        return data.video_url;
      }

      if (data.status === 'failed') {
        throw new Error(data.error || 'Video generation failed');
      }

      // 縺ｾ縺蜃ｦ逅・ｸｭ
    } catch (error) {
      logError(error, { component: 'videoGenerationHeyGen', action: 'pollVideoStatus', videoId });
      throw error;
    }
  }

  throw new Error('Video generation timeout');
}

