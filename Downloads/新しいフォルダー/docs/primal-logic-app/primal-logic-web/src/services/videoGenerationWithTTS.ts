/**
 * CarnivoreOS - Video Generation with TTS (A譯亥ｮ溯｣・
 *
 * A譯・ Makefilm蜆ｪ蜈・+ 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ
 * 繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ: 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・ 竊・髻ｳ螢ｰ逕滓・ 竊・蜍慕判逕滓・・・akefilm・・
 */

import type { VideoScript } from './videoGeneration';
import { generateVideoScript, type VideoGenerationOptions } from './videoGeneration';
import { generateVideoWithMakefilm } from './videoGenerationMakefilm';
import { generateSpeech, type TTSOptions } from './textToSpeech';
import { logError } from '../utils/errorHandler';

export interface VideoGenerationWithTTSOptions extends VideoGenerationOptions {
  ttsProvider?: 'elevenlabs' | 'google';
  ttsVoiceId?: string; // ElevenLabs逕ｨ
  ttsVoiceName?: string; // Google TTS逕ｨ
}

export interface VideoGenerationWithTTSResult {
  script: VideoScript;
  audioUrl?: string;
  videoUrl?: string;
  error?: string;
}

/**
 * A譯・ Makefilm蜆ｪ蜈・+ 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ縺ｧ蜍慕判繧堤函謌・
 */
export async function generateVideoWithTTS(
  options: VideoGenerationWithTTSOptions
): Promise<VideoGenerationWithTTSResult> {
  try {
    // Step 1: 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・
    const script = await generateVideoScript(options);

    // Step 2: 髻ｳ螢ｰ逕滓・・・levenLabs/Google TTS・・
    let audioUrl: string | undefined;
    try {
      const ttsOptions: TTSOptions = {
        text: script.script,
        language: script.language || 'en',
        provider: options.ttsProvider || 'elevenlabs',
        voiceId: options.ttsVoiceId,
        voiceName: options.ttsVoiceName,
      };

      const ttsResponse = await generateSpeech(ttsOptions);
      audioUrl = ttsResponse.audioUrl;

      if (import.meta.env.DEV) {
        console.log('笨・Audio generated:', {
          provider: ttsResponse.provider,
          duration: ttsResponse.duration,
          audioUrl,
        });
      }
    } catch (error) {
      logError(error, {
        component: 'videoGenerationWithTTS',
        action: 'generateVideoWithTTS',
        step: 'tts',
      });
      // 髻ｳ螢ｰ逕滓・縺ｫ螟ｱ謨励＠縺ｦ繧ょ虚逕ｻ逕滓・縺ｯ邯夊｡鯉ｼ・akefilm縺碁浹螢ｰ繧堤函謌舌☆繧句庄閭ｽ諤ｧ縺後≠繧九◆繧・ｼ・
      console.warn('TTS generation failed, continuing with video generation:', error);
    }

    // Step 3: 蜍慕判逕滓・・・akefilm API・・
    let videoUrl: string | undefined;
    try {
      // Makefilm縺ｫ髻ｳ螢ｰURL繧呈ｸ｡縺呻ｼ・akefilm API縺碁浹螢ｰURL繧偵し繝昴・繝医＠縺ｦ縺・ｋ蝣ｴ蜷茨ｼ・
      // 迴ｾ蝨ｨ縺ｮMakefilm螳溯｣・〒縺ｯ縲√せ繧ｯ繝ｪ繝励ヨ縺九ｉ逶ｴ謗･蜍慕判繧堤函謌舌☆繧九◆繧√・
      // 髻ｳ螢ｰ縺ｯMakefilm蛛ｴ縺ｧ逕滓・縺輔ｌ繧句庄閭ｽ諤ｧ縺後≠繧・
      // 蟆・擂逧・↓Makefilm API縺碁浹螢ｰURL繧貞女縺大叙繧後ｋ繧医≧縺ｫ縺ｪ縺｣縺溘ｉ縲√％縺薙〒audioUrl繧呈ｸ｡縺・
      videoUrl = await generateVideoWithMakefilm(script);

      if (import.meta.env.DEV) {
        console.log('笨・Video generated:', { videoUrl });
      }
    } catch (error) {
      logError(error, {
        component: 'videoGenerationWithTTS',
        action: 'generateVideoWithTTS',
        step: 'makefilm',
      });
      throw error;
    }

    return {
      script,
      audioUrl,
      videoUrl,
    };
  } catch (error) {
    logError(error, {
      component: 'videoGenerationWithTTS',
      action: 'generateVideoWithTTS',
    });
    return {
      script: {} as VideoScript,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

