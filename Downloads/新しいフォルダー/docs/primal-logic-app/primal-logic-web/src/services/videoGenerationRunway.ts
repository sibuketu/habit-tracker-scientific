/**
 * CarnivoreOS - Runway API Integration
 *
 * Runway API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ * API莉墓ｧ・ https://docs.runwayml.com/ (隕∫｢ｺ隱・
 */

import type { VideoScript } from './videoGeneration';
import { logError } from '../utils/errorHandler';

const RUNWAY_API_KEY = import.meta.env.VITE_RUNWAY_API_KEY;
// Runway ML API 繧ｨ繝ｳ繝峨・繧､繝ｳ繝・// 蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝・ https://docs.runwayml.com/
// 螳滄圀縺ｮAPI繧ｨ繝ｳ繝峨・繧､繝ｳ繝医・蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝医〒遒ｺ隱阪＠縺ｦ縺上□縺輔＞
const RUNWAY_API_URL = 'https://api.runwayml.com/v1';

export interface RunwayVideoRequest {
  prompt: string; // 繧ｹ繧ｯ繝ｪ繝励ヨ縺九ｉ逕滓・縺励◆繝励Ο繝ｳ繝励ヨ
  duration?: number;
  aspect_ratio?: '16:9' | '9:16' | '1:1';
}

export interface RunwayVideoResponse {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  output?: string[]; // 蜍慕判URL縺ｮ驟榊・
  error?: string;
}

/**
 * Runway API繧剃ｽｿ逕ｨ縺励※蜍慕判繧堤函謌・ */
export async function generateVideoWithRunway(script: VideoScript): Promise<string> {
  if (!RUNWAY_API_KEY) {
    throw new Error('VITE_RUNWAY_API_KEY is not set');
  }

  // 繧ｹ繧ｯ繝ｪ繝励ヨ縺九ｉ繝励Ο繝ｳ繝励ヨ繧堤函謌撰ｼ亥ｮ悟・螳溯｣・沿・・  // 繧ｿ繧､繝医Ν縲∬ｪｬ譏弱√せ繧ｯ繝ｪ繝励ヨ縺ｮ譛蛻昴・驛ｨ蛻・ｒ邨・∩蜷医ｏ縺帙※繝励Ο繝ｳ繝励ヨ繧剃ｽ懈・
  const scriptPreview = script.script.substring(0, 500);
  const prompt = `${script.title}. ${script.description || ''}. ${scriptPreview}`.trim();

  // 繝励Λ繝・ヨ繝輔か繝ｼ繝縺ｫ蠢懊§縺ｦ繧｢繧ｹ繝壹け繝域ｯ斐ｒ豎ｺ螳・  const aspectRatioMap: Record<string, '16:9' | '9:16' | '1:1'> = {
    youtube: '16:9',
    tiktok: '9:16',
    instagram: script.duration <= 60 ? '9:16' : '1:1', // 繧ｷ繝ｧ繝ｼ繝亥虚逕ｻ縺ｯ9:16縲√Ο繝ｳ繧ｰ蜍慕判縺ｯ1:1
  };

  const aspectRatio = script.platform ? aspectRatioMap[script.platform] || '16:9' : '16:9'; // 繝・ヵ繧ｩ繝ｫ繝医・16:9・・ouTube逕ｨ・・
  const request: RunwayVideoRequest = {
    prompt,
    duration: script.duration,
    aspect_ratio: aspectRatio,
  };

  try {
    // Step 1: 蜍慕判逕滓・繝ｪ繧ｯ繧ｨ繧ｹ繝医ｒ騾∽ｿ｡
    const response = await fetch(`${RUNWAY_API_URL}/video/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RUNWAY_API_KEY}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Runway API error: ${response.statusText}`);
    }

    const data: RunwayVideoResponse = await response.json();

    // Step 2: 蜍慕判逕滓・縺ｮ螳御ｺ・ｒ蠕・▽・医・繝ｼ繝ｪ繝ｳ繧ｰ・・    if (data.status === 'pending' || data.status === 'processing') {
      return await pollVideoStatus(data.id);
    }

    if (data.status === 'completed' && data.output && data.output.length > 0) {
      return data.output[0];
    }

    throw new Error(data.error || 'Video generation failed');
  } catch (error) {
    logError(error, { component: 'videoGenerationRunway', action: 'generateVideoWithRunway' });
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
      const response = await fetch(`${RUNWAY_API_URL}/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${RUNWAY_API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to check video status: ${response.statusText}`);
      }

      const data: RunwayVideoResponse = await response.json();

      if (data.status === 'completed' && data.output && data.output.length > 0) {
        return data.output[0];
      }

      if (data.status === 'failed') {
        throw new Error(data.error || 'Video generation failed');
      }

      // 縺ｾ縺蜃ｦ逅・ｸｭ
    } catch (error) {
      logError(error, { component: 'videoGenerationRunway', action: 'pollVideoStatus', videoId });
      throw error;
    }
  }

  throw new Error('Video generation timeout');
}

