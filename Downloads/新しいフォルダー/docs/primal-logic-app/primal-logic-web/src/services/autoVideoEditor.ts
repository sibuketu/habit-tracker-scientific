/**
 * 閾ｪ蜍募虚逕ｻ邱ｨ髮・し繝ｼ繝薙せ・・Fmpeg + Python邨ｱ蜷茨ｼ・
 * 髻ｳ螢ｰ + 螳滄圀縺ｮ譁・嶌逕ｻ蜒上ｒ閾ｪ蜍募粋謌舌＠縺ｦ蜍慕判繧堤函謌・
 */

import { logError } from '../utils/errorHandler';

export interface ImageInfo {
  path: string;
  start: number; // 髢句ｧ区凾髢難ｼ育ｧ抵ｼ・
  duration: number; // 陦ｨ遉ｺ譎る俣・育ｧ抵ｼ・
  description?: string;
}

export interface SubtitleInfo {
  text: string;
  start: number; // 髢句ｧ区凾髢難ｼ育ｧ抵ｼ・
  duration: number; // 陦ｨ遉ｺ譎る俣・育ｧ抵ｼ・
}

export interface AutoVideoEditorOptions {
  audioPath: string; // 髻ｳ螢ｰ繝輔ぃ繧､繝ｫ縺ｮ繝代せ・・P3・・
  images: ImageInfo[];
  subtitles?: SubtitleInfo[];
  outputPath: string;
  duration?: number; // 蜍慕判縺ｮ邱乗凾髢難ｼ育ｧ抵ｼ・
  fps?: number; // 繝輔Ξ繝ｼ繝繝ｬ繝ｼ繝茨ｼ医ョ繝輔か繝ｫ繝・ 30・・
  width?: number; // 蜍慕判縺ｮ蟷・ｼ医ョ繝輔か繝ｫ繝・ 1080・・
  height?: number; // 蜍慕判縺ｮ鬮倥＆・医ョ繝輔か繝ｫ繝・ 1920・・
}

export interface AutoVideoEditorResult {
  success: boolean;
  videoPath?: string;
  error?: string;
}

/**
 * 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｒ螳溯｡鯉ｼ・ython繧ｹ繧ｯ繝ｪ繝励ヨ繧貞他縺ｳ蜃ｺ縺呻ｼ・
 */
export async function autoEditVideo(
  options: AutoVideoEditorOptions
): Promise<AutoVideoEditorResult> {
  try {
    // 逕ｻ蜒乗ュ蝣ｱ繧谷SON繝輔ぃ繧､繝ｫ縺ｫ菫晏ｭ・
    const imagesJsonPath = options.outputPath.replace('.mp4', '_images.json');
    const imagesJson = JSON.stringify(options.images, null, 2);
    
    // Node.js迺ｰ蠅・〒縺ｯ縲√ヵ繧｡繧､繝ｫ繧ｷ繧ｹ繝・ΒAPI繧剃ｽｿ逕ｨ
    if (typeof window === 'undefined') {
      // Node.js迺ｰ蠅・ｼ・upabase Functions遲会ｼ・
      const fs = await import('fs/promises');
      await fs.writeFile(imagesJsonPath, imagesJson, 'utf-8');
    } else {
      // 繝悶Λ繧ｦ繧ｶ迺ｰ蠅・〒縺ｯ縲。lob繧剃ｽｿ逕ｨ縺励※繝繧ｦ繝ｳ繝ｭ繝ｼ繝・
      const blob = new Blob([imagesJson], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = imagesJsonPath;
      a.click();
      URL.revokeObjectURL(url);
    }
    
    // 蟄怜ｹ墓ュ蝣ｱ繧谷SON繝輔ぃ繧､繝ｫ縺ｫ菫晏ｭ假ｼ域欠螳壹＆繧後※縺・ｋ蝣ｴ蜷茨ｼ・
    let subtitlesJsonPath: string | undefined;
    if (options.subtitles && options.subtitles.length > 0) {
      subtitlesJsonPath = options.outputPath.replace('.mp4', '_subtitles.json');
      const subtitlesJson = JSON.stringify(options.subtitles, null, 2);
      
      if (typeof window === 'undefined') {
        const fs = await import('fs/promises');
        await fs.writeFile(subtitlesJsonPath, subtitlesJson, 'utf-8');
      } else {
        const blob = new Blob([subtitlesJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = subtitlesJsonPath;
        a.click();
        URL.revokeObjectURL(url);
      }
    }
    
    // Python繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡鯉ｼ・upabase Functions遲峨・繧ｵ繝ｼ繝舌・迺ｰ蠅・〒螳溯｡鯉ｼ・
    // 繝悶Λ繧ｦ繧ｶ迺ｰ蠅・〒縺ｯ縲√Θ繝ｼ繧ｶ繝ｼ縺ｫPython繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡後＠縺ｦ繧ゅｉ縺・ｿ・ｦ√′縺ゅｋ
    if (typeof window === 'undefined') {
      // Node.js迺ｰ蠅・ Python繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡・
      const { exec } = await import('child_process');
      const { promisify } = await import('util');
      const execAsync = promisify(exec);
      
      const scriptPath = 'scripts/auto_video_editor.py';
      const cmd = [
        'python3',
        scriptPath,
        '--audio', options.audioPath,
        '--images', imagesJsonPath,
        ...(subtitlesJsonPath ? ['--subtitles', subtitlesJsonPath] : []),
        '--output', options.outputPath,
        ...(options.duration ? ['--duration', options.duration.toString()] : []),
        '--fps', (options.fps || 30).toString(),
        '--width', (options.width || 1080).toString(),
        '--height', (options.height || 1920).toString(),
      ].join(' ');
      
      const { stdout, stderr } = await execAsync(cmd);
      
      if (stderr) {
        console.warn('Python script stderr:', stderr);
      }
      
      return {
        success: true,
        videoPath: options.outputPath,
      };
    } else {
      // 繝悶Λ繧ｦ繧ｶ迺ｰ蠅・ 繝ｦ繝ｼ繧ｶ繝ｼ縺ｫPython繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡後＠縺ｦ繧ゅｉ縺・
      return {
        success: false,
        error: '繝悶Λ繧ｦ繧ｶ迺ｰ蠅・〒縺ｯ縲￣ython繧ｹ繧ｯ繝ｪ繝励ヨ繧呈焔蜍輔〒螳溯｡後☆繧句ｿ・ｦ√′縺ゅｊ縺ｾ縺吶・,
      };
    }
  } catch (error) {
    logError(error, {
      component: 'autoVideoEditor',
      action: 'autoEditVideo',
      options,
    });
    
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * TTS + 閾ｪ蜍募虚逕ｻ邱ｨ髮・・邨ｱ蜷医Ρ繝ｼ繧ｯ繝輔Ο繝ｼ
 */
export async function generateVideoWithAutoEdit(
  audioUrl: string,
  images: ImageInfo[],
  subtitles?: SubtitleInfo[],
  options?: Partial<AutoVideoEditorOptions>
): Promise<AutoVideoEditorResult> {
  // 髻ｳ螢ｰ繝輔ぃ繧､繝ｫ繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝会ｼ亥ｿ・ｦ√↓蠢懊§縺ｦ・・
  const audioPath = options?.audioPath || 'temp_audio.mp3';
  
  // 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｒ螳溯｡・
  return await autoEditVideo({
    audioPath,
    images,
    subtitles,
    outputPath: options?.outputPath || 'output_video.mp4',
    duration: options?.duration,
    fps: options?.fps,
    width: options?.width,
    height: options?.height,
  });
}

