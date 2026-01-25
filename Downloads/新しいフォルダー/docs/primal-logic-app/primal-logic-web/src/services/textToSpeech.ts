/**
 * CarnivoreOS - Text-to-Speech Service
 *
 * 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ: ElevenLabs / Google TTS
 */

import { logError } from '../utils/errorHandler';

const ELEVENLABS_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY;
const GOOGLE_TTS_API_KEY = import.meta.env.VITE_GOOGLE_TTS_API_KEY;

// ElevenLabs API
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Google TTS API
const GOOGLE_TTS_API_URL = 'https://texttospeech.googleapis.com/v1';

export interface TTSOptions {
  text: string;
  language?: 'en' | 'ja';
  voiceId?: string; // ElevenLabs逕ｨ
  voiceName?: string; // Google TTS逕ｨ
  provider?: 'elevenlabs' | 'google'; // 繝・ヵ繧ｩ繝ｫ繝・ 'elevenlabs'
}

export interface TTSResponse {
  audioUrl: string;
  audioData?: ArrayBuffer; // 繧ｪ繝励す繝ｧ繝ｳ: 繝舌う繝翫Μ繝・・繧ｿ
  duration?: number; // 遘・
  provider: 'elevenlabs' | 'google';
}

/**
 * ElevenLabs API繧剃ｽｿ逕ｨ縺励※髻ｳ螢ｰ繧堤函謌・
 */
export async function generateSpeechWithElevenLabs(
  text: string,
  language: 'en' | 'ja' = 'en',
  voiceId?: string
): Promise<TTSResponse> {
  if (!ELEVENLABS_API_KEY) {
    throw new Error('VITE_ELEVENLABS_API_KEY is not set');
  }

  // 繝・ヵ繧ｩ繝ｫ繝医・voiceId・郁恭隱・ 21m00Tcm4TlvDq8ikWAM, 譌･譛ｬ隱・ 譛ｪ險ｭ螳壹・蝣ｴ蜷医・闍ｱ隱槭ｒ菴ｿ逕ｨ・・
  const defaultVoiceId = language === 'en' ? '21m00Tcm4TlvDq8ikWAM' : '21m00Tcm4TlvDq8ikWAM';
  const selectedVoiceId = voiceId || defaultVoiceId;

  try {
    const response = await fetch(`${ELEVENLABS_API_URL}/text-to-speech/${selectedVoiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify({
        text,
        model_id: 'eleven_multilingual_v2', // 螟夊ｨ隱槫ｯｾ蠢懊Δ繝・Ν
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`ElevenLabs API error: ${response.statusText} - ${errorText}`);
    }

    const audioData = await response.arrayBuffer();
    const audioBlob = new Blob([audioData], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);

    // 縺翫♀繧医◎縺ｮduration繧定ｨ育ｮ暦ｼ域枚蟄玲焚縺九ｉ謗ｨ螳壹・遘偵≠縺溘ｊ邏・0譁・ｭ暦ｼ・
    const estimatedDuration = Math.ceil(text.length / 10);

    return {
      audioUrl,
      audioData,
      duration: estimatedDuration,
      provider: 'elevenlabs',
    };
  } catch (error) {
    logError(error, { component: 'textToSpeech', action: 'generateSpeechWithElevenLabs' });
    throw error;
  }
}

/**
 * Google Text-to-Speech API繧剃ｽｿ逕ｨ縺励※髻ｳ螢ｰ繧堤函謌・
 */
export async function generateSpeechWithGoogleTTS(
  text: string,
  language: 'en' | 'ja' = 'en',
  voiceName?: string
): Promise<TTSResponse> {
  if (!GOOGLE_TTS_API_KEY) {
    throw new Error('VITE_GOOGLE_TTS_API_KEY is not set');
  }

  // 繝・ヵ繧ｩ繝ｫ繝医・voiceName
  const defaultVoiceName =
    language === 'en'
      ? 'en-US-Neural2-D' // 闍ｱ隱・ 逕ｷ諤ｧ螢ｰ
      : 'ja-JP-Neural2-B'; // 譌･譛ｬ隱・ 螂ｳ諤ｧ螢ｰ
  const selectedVoiceName = voiceName || defaultVoiceName;

  // 險隱槭さ繝ｼ繝・
  const languageCode = language === 'en' ? 'en-US' : 'ja-JP';

  try {
    const response = await fetch(
      `${GOOGLE_TTS_API_URL}/text:synthesize?key=${GOOGLE_TTS_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode,
            name: selectedVoiceName,
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 1.0,
            pitch: 0,
            volumeGainDb: 0,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Google TTS API error: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    const audioBase64 = data.audioContent;
    const audioData = Uint8Array.from(atob(audioBase64), (c) => c.charCodeAt(0)).buffer;
    const audioBlob = new Blob([audioData], { type: 'audio/mp3' });
    const audioUrl = URL.createObjectURL(audioBlob);

    // 縺翫♀繧医◎縺ｮduration繧定ｨ育ｮ・
    const estimatedDuration = Math.ceil(text.length / 10);

    return {
      audioUrl,
      audioData,
      duration: estimatedDuration,
      provider: 'google',
    };
  } catch (error) {
    logError(error, { component: 'textToSpeech', action: 'generateSpeechWithGoogleTTS' });
    throw error;
  }
}

/**
 * 髻ｳ螢ｰ逕滓・縺ｮ繝｡繧､繝ｳ髢｢謨ｰ・医・繝ｭ繝舌う繝繝ｼ閾ｪ蜍暮∈謚橸ｼ・
 */
export async function generateSpeech(options: TTSOptions): Promise<TTSResponse> {
  const { text, language = 'en', provider = 'elevenlabs', voiceId, voiceName } = options;

  try {
    if (provider === 'elevenlabs') {
      return await generateSpeechWithElevenLabs(text, language, voiceId);
    } else if (provider === 'google') {
      return await generateSpeechWithGoogleTTS(text, language, voiceName);
    } else {
      // 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ: ElevenLabs繧定ｩｦ縺・竊・螟ｱ謨励＠縺溘ｉGoogle TTS
      try {
        return await generateSpeechWithElevenLabs(text, language, voiceId);
      } catch (error) {
        console.warn('ElevenLabs failed, trying Google TTS:', error);
        return await generateSpeechWithGoogleTTS(text, language, voiceName);
      }
    }
  } catch (error) {
    logError(error, { component: 'textToSpeech', action: 'generateSpeech', options });
    throw error;
  }
}

