/**
 * 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ・・繧ｹ繝・ャ繝暦ｼ・
 * 1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・
 * 2. TTS逕滓・
 * 3. 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｼ磯浹螢ｰ + 逕ｻ蜒丞粋謌撰ｼ・
 * 4. 蜈ｨSNS謚慕ｨｿ
 */

import { generateVideoScript, type VideoGenerationOptions } from './videoGeneration';
import { generateSpeech, type TTSOptions } from './textToSpeech';
import { logError } from '../utils/errorHandler';
import type { ImageInfo, SubtitleInfo } from './autoVideoEditor';

/**
 * 蜍慕判逕滓・縺ｮ繧ｹ繝・・繧ｿ繧ｹ繧偵・繝ｼ繝ｪ繝ｳ繧ｰ
 */
async function pollVideoGenerationStatus(
  supabaseUrl: string,
  supabaseAnonKey: string,
  videoId: string,
  maxAttempts: number = 60,
  intervalMs: number = 5000
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
    
    try {
      const response = await fetch(`${supabaseUrl}/functions/v1/create-video-with-auto-edit/status?video_id=${videoId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
        },
      });
      
      if (!response.ok) {
        throw new Error(`繧ｹ繝・・繧ｿ繧ｹ遒ｺ隱阪↓螟ｱ謨励＠縺ｾ縺励◆: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      if (result.status === 'completed' && result.video_url) {
        return result.video_url;
      }
      
      if (result.status === 'failed') {
        throw new Error(result.error || '蜍慕判逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆');
      }
      
      // 縺ｾ縺蜃ｦ逅・ｸｭ
      if (import.meta.env.DEV) {
        console.log(`竢ｳ 蜍慕判逕滓・荳ｭ... (${attempt + 1}/${maxAttempts})`);
      }
    } catch (error) {
      if (attempt === maxAttempts - 1) {
        throw error;
      }
      // 繝ｪ繝医Λ繧､
    }
  }
  
  throw new Error('蜍慕判逕滓・縺後ち繧､繝繧｢繧ｦ繝医＠縺ｾ縺励◆');
}

/**
 * 繝ｪ繝医Λ繧､莉倥″縺ｧ髢｢謨ｰ繧貞ｮ溯｡・
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelayMs: number = 1000
): Promise<T> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      if (attempt === maxRetries - 1) {
        throw error;
      }
      
      const delayMs = baseDelayMs * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      
      if (import.meta.env.DEV) {
        console.warn(`繝ｪ繝医Λ繧､荳ｭ... (${attempt + 1}/${maxRetries})`, error);
      }
    }
  }
  
  throw new Error('繝ｪ繝医Λ繧､荳企剞縺ｫ驕斐＠縺ｾ縺励◆');
}

export interface FullAutoVideoWorkflowOptions extends VideoGenerationOptions {
  // TTS險ｭ螳・
  ttsProvider?: 'elevenlabs' | 'google';
  ttsVoiceId?: string;
  ttsVoiceName?: string;
  
  // 逕ｻ蜒剰ｨｭ螳・
  images: ImageInfo[];
  subtitles?: SubtitleInfo[];
  
  // 蜍慕判險ｭ螳・
  width?: number;
  height?: number;
  fps?: number;
}

export interface FullAutoVideoWorkflowResult {
  script: {
    topic: string;
    title: string;
    script: string;
    hook: string;
    scientificEvidence: string;
    hashtags: string[];
    keywords: string[];
    duration: number;
  };
  audioUrl?: string;
  audioData?: ArrayBuffer;
  videoUrl?: string;
  error?: string;
}

/**
 * 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ・・繧ｹ繝・ャ繝暦ｼ・
 * 
 * Step 1: 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・
 * Step 2: TTS逕滓・
 * Step 3: 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｼ・upabase Functions邨檎罰・・
 * Step 4: 蜈ｨSNS謚慕ｨｿ・・upabase Functions邨檎罰・・
 */
export async function fullAutoVideoWorkflow(
  options: FullAutoVideoWorkflowOptions
): Promise<FullAutoVideoWorkflowResult> {
  try {
    // Step 1: 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・
    const script = await generateVideoScript(options);
    
    if (import.meta.env.DEV) {
      console.log('笨・Step 1: 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・螳御ｺ・, {
        topic: script.topic,
        title: script.title,
        duration: script.duration,
      });
    }
    
    // Step 2: TTS逕滓・・医Μ繝医Λ繧､莉倥″・・
    let audioUrl: string | undefined;
    let audioData: ArrayBuffer | undefined;
    
    try {
      const ttsResponse = await retryWithBackoff(async () => {
        const ttsOptions: TTSOptions = {
          text: script.script,
          language: script.language || 'en',
          provider: options.ttsProvider || 'google', // 繝・ヵ繧ｩ繝ｫ繝医・Google TTS・育┌譁呻ｼ・
          voiceId: options.ttsVoiceId,
          voiceName: options.ttsVoiceName,
        };
        
        return await generateSpeech(ttsOptions);
      });
      
      audioUrl = ttsResponse.audioUrl;
      audioData = ttsResponse.audioData;
      
      if (import.meta.env.DEV) {
        console.log('笨・Step 2: TTS逕滓・螳御ｺ・, {
          provider: ttsResponse.provider,
          duration: ttsResponse.duration,
        });
      }
    } catch (error) {
      logError(error, {
        component: 'fullAutoVideoWorkflow',
        action: 'fullAutoVideoWorkflow',
        step: 'tts',
      });
      throw new Error(`TTS逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Step 3: 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｼ・upabase Functions邨檎罰・・
    let videoUrl: string | undefined;
    
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ');
      }
      
      // 髻ｳ螢ｰ繝・・繧ｿ繧達ase64縺ｫ螟画鋤
      let audioBase64: string | undefined;
      if (audioData) {
        const audioBytes = new Uint8Array(audioData);
        audioBase64 = btoa(String.fromCharCode(...audioBytes));
      }
      
      // Supabase Functions縺ｮ`create-video-with-auto-edit`繧貞他縺ｳ蜃ｺ縺呻ｼ医Μ繝医Λ繧､莉倥″・・
      const result = await retryWithBackoff(async () => {
        const response = await fetch(`${supabaseUrl}/functions/v1/create-video-with-auto-edit`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            audio: audioBase64,
            audioUrl: audioUrl,
            images: options.images,
            subtitles: options.subtitles || [],
            width: options.width || 1080,
            height: options.height || 1920,
            fps: options.fps || 30,
          }),
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`蜍慕判逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆: ${response.status} - ${errorText}`);
        }
        
        return await response.json();
      });
      
      // 蜍慕判逕滓・荳ｭ縺ｮ蝣ｴ蜷医√・繝ｼ繝ｪ繝ｳ繧ｰ縺ｧ螳御ｺ・ｒ蠕・▽
      if (result.status === 'processing' && result.video_id) {
        videoUrl = await pollVideoGenerationStatus(
          supabaseUrl,
          supabaseAnonKey,
          result.video_id,
          60, // 譛螟ｧ60蝗橸ｼ・蛻・ｼ・
          5000 // 5遘帝俣髫・
        );
      } else {
        videoUrl = result.video_url;
      }
      
      if (import.meta.env.DEV) {
        console.log('笨・Step 3: 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｮ御ｺ・, { videoUrl });
      }
    } catch (error) {
      logError(error, {
        component: 'fullAutoVideoWorkflow',
        action: 'fullAutoVideoWorkflow',
        step: 'video_editing',
      });
      throw new Error(`蜍慕判邱ｨ髮・↓螟ｱ謨励＠縺ｾ縺励◆: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
    
    // Step 4: 蜈ｨSNS謚慕ｨｿ・・upabase Functions邨檎罰・・
    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
      
      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Supabase迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ');
      }
      
      // orchestrator Function繧貞他縺ｳ蜃ｺ縺・
      const response = await fetch(`${supabaseUrl}/functions/v1/orchestrator`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: {
            topic: script.topic,
            title: script.title,
            script: script.script,
            hook: script.hook || '',
            scientificEvidence: script.scientificEvidence || '',
            hashtags: script.hashtags || [],
            keywords: script.keywords || [],
            duration: script.duration,
          },
          video_url: videoUrl,
        }),
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`SNS謚慕ｨｿ縺ｫ螟ｱ謨励＠縺ｾ縺励◆: ${response.status} - ${errorText}`);
      }
      
      const result = await response.json();
      
      if (import.meta.env.DEV) {
        console.log('笨・Step 4: 蜈ｨSNS謚慕ｨｿ螳御ｺ・, result);
      }
    } catch (error) {
      logError(error, {
        component: 'fullAutoVideoWorkflow',
        action: 'fullAutoVideoWorkflow',
        step: 'sns_posting',
      });
      // SNS謚慕ｨｿ螟ｱ謨励・閾ｴ蜻ｽ逧・〒縺ｯ縺ｪ縺・・縺ｧ縲∬ｭｦ蜻翫・縺ｿ
      console.warn('笞・・SNS謚慕ｨｿ縺ｫ螟ｱ謨励＠縺ｾ縺励◆・亥虚逕ｻ縺ｯ逕滓・貂医∩・・', error);
    }
    
    return {
      script: {
        topic: script.topic,
        title: script.title,
        script: script.script,
        hook: script.hook || '',
        scientificEvidence: script.scientificEvidence || '',
        hashtags: script.hashtags || [],
        keywords: script.keywords || [],
        duration: script.duration,
      },
      audioUrl,
      audioData,
      videoUrl,
    };
  } catch (error) {
    logError(error, {
      component: 'fullAutoVideoWorkflow',
      action: 'fullAutoVideoWorkflow',
    });
    
    return {
      script: {
        topic: '',
        title: '',
        script: '',
        hook: '',
        scientificEvidence: '',
        hashtags: [],
        keywords: [],
        duration: 0,
      },
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

