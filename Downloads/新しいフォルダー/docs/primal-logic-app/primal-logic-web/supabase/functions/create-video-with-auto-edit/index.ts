/**
 * 閾ｪ蜍募虚逕ｻ邱ｨ髮・unction・・upabase Functions・・
 * TTS髻ｳ螢ｰ + 逕ｻ蜒上ｒ閾ｪ蜍募粋謌舌＠縺ｦ蜍慕判繧堤函謌・
 */

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface ImageInfo {
  path: string;
  start: number;
  duration: number;
  description?: string;
}

interface SubtitleInfo {
  text: string;
  start: number;
  duration: number;
}

interface RequestBody {
  audio?: string; // Base64繧ｨ繝ｳ繧ｳ繝ｼ繝峨＆繧後◆髻ｳ螢ｰ繝・・繧ｿ
  audioUrl?: string; // 髻ｳ螢ｰ繝輔ぃ繧､繝ｫ縺ｮURL
  images: ImageInfo[];
  subtitles?: SubtitleInfo[];
  width?: number;
  height?: number;
  fps?: number;
}

serve(async (req) => {
  try {
    // 繧ｹ繝・・繧ｿ繧ｹ遒ｺ隱阪お繝ｳ繝峨・繧､繝ｳ繝・
    if (req.method === 'GET') {
      const url = new URL(req.url);
      const videoId = url.searchParams.get('video_id');
      
      if (!videoId) {
        return new Response(
          JSON.stringify({ error: 'video_id is required' }),
          { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);
      
      // 繝・・繧ｿ繝吶・繧ｹ縺九ｉ繧ｹ繝・・繧ｿ繧ｹ繧貞叙蠕・
      const { data, error } = await supabase
        .from('video_generation_jobs')
        .select('*')
        .eq('id', videoId)
        .single();
      
      if (error || !data) {
        return new Response(
          JSON.stringify({ error: 'Video job not found' }),
          { status: 404, headers: { 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({
          video_id: data.id,
          status: data.status,
          video_url: data.video_url || null,
          error: data.error || null,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // 蜍慕判逕滓・繧ｨ繝ｳ繝峨・繧､繝ｳ繝・
    const body: RequestBody = await req.json();
    
    // 繝舌Μ繝・・繧ｷ繝ｧ繝ｳ
    if (!body.audio && !body.audioUrl) {
      return new Response(
        JSON.stringify({ error: 'audio or audioUrl is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!body.images || body.images.length === 0) {
      return new Response(
        JSON.stringify({ error: 'images is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Supabase Storage縺ｫ髻ｳ螢ｰ繝輔ぃ繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝会ｼ亥ｿ・ｦ√↓蠢懊§縺ｦ・・
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    let audioFilePath: string;
    
    if (body.audio) {
      // Base64繝・さ繝ｼ繝・
      const audioBytes = Uint8Array.from(atob(body.audio), c => c.charCodeAt(0));
      
      // Supabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・
      const fileName = `audio_${Date.now()}.mp3`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, audioBytes, {
          contentType: 'audio/mpeg',
        });
      
      if (uploadError) {
        throw new Error(`髻ｳ螢ｰ繧｢繝・・繝ｭ繝ｼ繝峨↓螟ｱ謨励＠縺ｾ縺励◆: ${uploadError.message}`);
      }
      
      // 蜈ｬ髢偽RL繧貞叙蠕・
      const { data: urlData } = supabase.storage
        .from('videos')
        .getPublicUrl(fileName);
      
      audioFilePath = urlData.publicUrl;
    } else {
      audioFilePath = body.audioUrl!;
    }
    
    // Cloud Run縺ｧFFmpeg繧貞ｮ溯｡・
    const cloudRunUrl = Deno.env.get('CLOUD_RUN_VIDEO_EDITOR_URL');
    
    if (!cloudRunUrl) {
      // Cloud Run URL縺瑚ｨｭ螳壹＆繧後※縺・↑縺・ｴ蜷医∽ｸ譎ら噪縺ｫ繧ｸ繝ｧ繝悶ｒ繧ｭ繝･繝ｼ縺ｫ霑ｽ蜉
      const videoId = crypto.randomUUID();
      const { error: dbError } = await supabase
        .from('video_generation_jobs')
        .insert({
          id: videoId,
          audio_url: audioFilePath,
          images: body.images,
          subtitles: body.subtitles || [],
          width: body.width || 1080,
          height: body.height || 1920,
          fps: body.fps || 30,
          status: 'pending',
        });
      
      if (dbError) {
        throw new Error(`繧ｸ繝ｧ繝紋ｿ晏ｭ倥↓螟ｱ謨励＠縺ｾ縺励◆: ${dbError.message}`);
      }
      
      return new Response(
        JSON.stringify({
          video_id: videoId,
          status: 'pending',
          message: 'Cloud Run URL縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ縲ら腸蠅・､画焚CLOUD_RUN_VIDEO_EDITOR_URL繧定ｨｭ螳壹＠縺ｦ縺上□縺輔＞縲・,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Cloud Run縺ｫ蜍慕判逕滓・繝ｪ繧ｯ繧ｨ繧ｹ繝医ｒ騾∽ｿ｡
    const cloudRunResponse = await fetch(cloudRunUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        audio: body.audio,
        audioUrl: audioFilePath,
        images: body.images,
        subtitles: body.subtitles || [],
        width: body.width || 1080,
        height: body.height || 1920,
        fps: body.fps || 30,
      }),
    });
    
    if (!cloudRunResponse.ok) {
      const errorText = await cloudRunResponse.text();
      throw new Error(`Cloud Run蜍慕判逕滓・縺ｫ螟ｱ謨励＠縺ｾ縺励◆: ${cloudRunResponse.status} - ${errorText}`);
    }
    
    const cloudRunResult = await cloudRunResponse.json();
    
    // 逕滓・縺輔ｌ縺溷虚逕ｻ繧担upabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・
    if (cloudRunResult.videoUrl) {
      // 蜍慕判繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝・
      const videoResponse = await fetch(cloudRunResult.videoUrl);
      const videoBlob = await videoResponse.blob();
      const videoBytes = new Uint8Array(await videoBlob.arrayBuffer());
      
      // Supabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・
      const videoFileName = `video_${Date.now()}.mp4`;
      const { data: videoUploadData, error: videoUploadError } = await supabase.storage
        .from('videos')
        .upload(videoFileName, videoBytes, {
          contentType: 'video/mp4',
        });
      
      if (videoUploadError) {
        throw new Error(`蜍慕判繧｢繝・・繝ｭ繝ｼ繝峨↓螟ｱ謨励＠縺ｾ縺励◆: ${videoUploadError.message}`);
      }
      
      // 蜈ｬ髢偽RL繧貞叙蠕・
      const { data: videoUrlData } = supabase.storage
        .from('videos')
        .getPublicUrl(videoFileName);
      
      return new Response(
        JSON.stringify({
          video_id: cloudRunResult.videoId || crypto.randomUUID(),
          video_url: videoUrlData.publicUrl,
          status: 'completed',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // 蜍慕判逕滓・荳ｭ縺ｮ蝣ｴ蜷・
    return new Response(
      JSON.stringify({
        video_id: cloudRunResult.videoId || crypto.randomUUID(),
        status: 'processing',
        message: '蜍慕判逕滓・荳ｭ縺ｧ縺吶・,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

