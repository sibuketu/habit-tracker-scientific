// publish-youtube Function - YouTube Shorts縺ｫ蜍慕判繧呈兜遞ｿ
// YouTube Data API v3繧剃ｽｿ逕ｨ

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    const accessToken = Deno.env.get('YOUTUBE_ACCESS_TOKEN');

    if (!apiKey || !accessToken) {
      return new Response(
        JSON.stringify({ error: 'YouTube API credentials not set' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 1. 蜍慕判繝輔ぃ繧､繝ｫ繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝・
    const videoResponse = await fetch(video_url);
    if (!videoResponse.ok) {
      throw new Error(`Failed to download video: ${videoResponse.statusText}`);
    }
    const videoBlob = await videoResponse.blob();

    // 2. YouTube Data API v3縺ｧ蜍慕判繧偵い繝・・繝ｭ繝ｼ繝・
    // 豕ｨ諢・ 螳滄圀縺ｮ螳溯｣・〒縺ｯ縲［ultipart/form-data蠖｢蠑上〒繧｢繝・・繝ｭ繝ｼ繝峨′蠢・ｦ・
    const formData = new FormData();
    
    // 繝｡繧ｿ繝・・繧ｿ・・nippet・・
    formData.append('snippet', JSON.stringify({
      title: content.title,
      description: `${content.script}\n\n${content.hashtags.join(' ')}\n\n${content.scientificEvidence || ''}`,
      tags: content.keywords || [],
      categoryId: '22', // People & Blogs
    }));
    
    // 繧ｹ繝・・繧ｿ繧ｹ諠・ｱ
    formData.append('status', JSON.stringify({
      privacyStatus: 'public',
      selfDeclaredMadeForKids: false,
      madeForKids: false,
    }));

    // 蜍慕判繝輔ぃ繧､繝ｫ
    formData.append('video', videoBlob, 'video.mp4');

    // YouTube Data API v3縺ｧ繧｢繝・・繝ｭ繝ｼ繝・
    const uploadResponse = await fetch(
      `https://www.googleapis.com/upload/youtube/v3/videos?part=snippet,status&key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      console.error('YouTube upload error:', errorText);
      throw new Error(`YouTube upload failed: ${uploadResponse.status} - ${errorText}`);
    }

    const result = await uploadResponse.json();
    const videoId = result.id;
    const youtubeUrl = `https://www.youtube.com/shorts/${videoId}`;

    return new Response(
      JSON.stringify({
        platform: 'youtube',
        video_id: videoId,
        video_url: youtubeUrl,
        post_url: youtubeUrl,
        status: 'success',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('YouTube publish error:', error);
    return new Response(
      JSON.stringify({ 
        platform: 'youtube',
        status: 'failed',
        error: (error as Error).message 
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

