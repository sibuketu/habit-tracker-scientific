/**
 * CarnivoreOS - Makefilm API Integration
 *
 * Makefilm API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ * API莉墓ｧ・ https://makefilm.jp/ (隕∫｢ｺ隱・
 */

import type { VideoScript } from './videoGeneration';
import { logError } from '../utils/errorHandler';

const MAKEFILM_API_KEY = import.meta.env.VITE_MAKEFILM_API_KEY;
// Makefilm API 繧ｨ繝ｳ繝峨・繧､繝ｳ繝・// 蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝医〒遒ｺ隱阪＠縺ｦ縺上□縺輔＞
// 螳滄圀縺ｮAPI繧ｨ繝ｳ繝峨・繧､繝ｳ繝医・蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝医〒遒ｺ隱阪＠縺ｦ縺上□縺輔＞
const MAKEFILM_API_URL = 'https://api.makefilm.jp/v1';

export interface MakefilmVideoRequest {
  script: string;
  title: string;
  duration: number;
  language: string;
}

export interface MakefilmVideoResponse {
  video_id: string;
  status: 'processing' | 'completed' | 'failed';
  video_url?: string;
  error?: string;
}

/**
 * Makefilm API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ */
export async function generateVideoWithMakefilm(script: VideoScript): Promise<string> {
  if (!MAKEFILM_API_KEY) {
    throw new Error('VITE_MAKEFILM_API_KEY is not set');
  }

  // 險隱槭ｒ蜿門ｾ暦ｼ・cript縺九ｉ縲√∪縺溘・繝・ヵ繧ｩ繝ｫ繝医〒'ja'・・  const language = script.language || 'ja';

  // 險隱槭さ繝ｼ繝峨ｒMakefilm API縺ｮ蠖｢蠑上↓螟画鋤
  const languageMap: Record<string, string> = {
    ja: 'ja',
    en: 'en',
    fr: 'fr',
    de: 'de',
  };

  const request: MakefilmVideoRequest = {
    script: script.script,
    title: script.title,
    duration: script.duration,
    language: languageMap[language] || 'ja',
  };

  try {
    // Step 1: 蜍慕判逕滓・繝ｪ繧ｯ繧ｨ繧ｹ繝医ｒ騾∽ｿ｡
    const response = await fetch(`${MAKEFILM_API_URL}/videos/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${MAKEFILM_API_KEY}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Makefilm API error: ${response.statusText}`);
    }

    const data: MakefilmVideoResponse = await response.json();

    // Step 2: 蜍慕判逕滓・縺ｮ螳御ｺ・ｒ蠕・▽・医・繝ｼ繝ｪ繝ｳ繧ｰ・・    if (data.status === 'processing') {
      return await pollVideoStatus(data.video_id);
    }

    if (data.status === 'completed' && data.video_url) {
      return data.video_url;
    }

    throw new Error(data.error || 'Video generation failed');
  } catch (error) {
    logError(error, { component: 'videoGenerationMakefilm', action: 'generateVideoWithMakefilm' });
    throw error;
  }
}

/**
 * 蜍慕判逕滓・縺ｮ繧ｹ繝・・繧ｿ繧ｹ繧偵・繝ｼ繝ｪ繝ｳ繧ｰ
 */
async function pollVideoStatus(
  videoId: string,
  maxAttempts = 60,
  intervalMs = 5000
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

    try {
      const response = await fetch(`${MAKEFILM_API_URL}/videos/${videoId}`, {
        headers: {
          Authorization: `Bearer ${MAKEFILM_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to check video status: ${response.statusText}`);
      }

      const data: MakefilmVideoResponse = await response.json();

      if (data.status === 'completed' && data.video_url) {
        return data.video_url;
      }

      if (data.status === 'failed') {
        throw new Error(data.error || 'Video generation failed');
      }

      // 縺ｾ縺蜃ｦ逅・ｸｭ
    } catch (error) {
      logError(error, { component: 'videoGenerationMakefilm', action: 'pollVideoStatus', videoId });
      throw error;
    }
  }

  throw new Error('Video generation timeout');
}

