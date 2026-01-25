// orchestrator Function - 謇句虚蜍慕判URL蟇ｾ蠢懃沿
// HeyGen API邨ｱ蜷医・菫晉蕗縲よ焔蜍輔〒逕滓・縺励◆蜍慕判URL繧貞女縺大叙縺｣縺ｦ縲∝・SNS縺ｫ閾ｪ蜍墓兜遞ｿ縺吶ｋ

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

interface CarnivoreContent {
  topic: string;
  title: string;
  script: string;
  hook: string;
  scientificEvidence?: string;
  hashtags: string[];
  keywords: string[];
  duration: number;
}

interface SNSPublishResult {
  platform: string;
  status: 'success' | 'failed';
  url?: string;
  error?: string;
}

serve(async (req) => {
  try {
    const { content, video_url } = await req.json();

    // 繝舌Μ繝・・繧ｷ繝ｧ繝ｳ
    if (!content) {
      return new Response(
        JSON.stringify({ error: 'content is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!video_url) {
      return new Response(
        JSON.stringify({ error: 'video_url is required (謇句虚縺ｧ逕滓・縺励◆蜍慕判URL繧呈欠螳壹＠縺ｦ縺上□縺輔＞)' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Supabase繧ｯ繝ｩ繧､繧｢繝ｳ繝亥・譛溷喧
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 繧ｳ繝ｳ繝・Φ繝・ｒ繝・・繧ｿ繝吶・繧ｹ縺ｫ菫晏ｭ・
    const { data: savedContent, error: saveError } = await supabase
      .from('carnivore_content')
      .insert({
        topic: content.topic,
        title: content.title,
        script: content.script,
        hook: content.hook,
        scientific_evidence: content.scientificEvidence || null,
        hashtags: content.hashtags || [],
        keywords: content.keywords || [],
        duration: content.duration,
        video_url: video_url,
        video_status: 'completed', // 謇句虚逕滓・縺ｪ縺ｮ縺ｧ completed
      })
      .select()
      .single();

    if (saveError) {
      console.error('Failed to save content:', saveError);
      // 繧ｨ繝ｩ繝ｼ縺ｧ繧らｶ夊｡鯉ｼ医Ο繧ｰ縺縺題ｨ倬鹸・・
    }

    const contentId = savedContent?.id || crypto.randomUUID();

    // 蜷ТNS縺ｸ縺ｮ荳ｦ蛻玲兜遞ｿ・・縺､螟ｱ謨励＠縺ｦ繧ゆｻ悶・邯咏ｶ夲ｼ・
    const platforms = ['youtube', 'instagram', 'tiktok', 'facebook', 'linkedin', 'pinterest'];
    const results: SNSPublishResult[] = [];
    const manualPostUrls: string[] = [];

    const publishPromises = platforms.map(async (platform) => {
      try {
        const functionUrl = `${supabaseUrl}/functions/v1/publish-${platform}`;
        const response = await fetch(functionUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${supabaseKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            video_url: video_url,
            content: content,
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`${platform} publish failed: ${errorText}`);
        }

        const result = await response.json();
        const postUrl = result.video_url || result.post_url || result.post_id;

        // 繝・・繧ｿ繝吶・繧ｹ縺ｫ謚慕ｨｿ螻･豁ｴ繧剃ｿ晏ｭ・
        await supabase.from('sns_posts').insert({
          content_id: contentId,
          platform: platform,
          post_id: result.video_id || result.post_id || result.media_id || result.reel_id || result.pin_id,
          post_url: postUrl,
          status: 'published',
          published_at: new Date().toISOString(),
        });

        results.push({
          platform,
          status: 'success',
          url: postUrl,
        });

        if (postUrl) {
          manualPostUrls.push(postUrl);
        }
      } catch (error) {
        const errorMessage = (error as Error).message;

        // 繧ｨ繝ｩ繝ｼ繝ｭ繧ｰ繧偵ョ繝ｼ繧ｿ繝吶・繧ｹ縺ｫ險倬鹸
        await supabase.from('error_logs').insert({
          content_id: contentId,
          function_name: 'orchestrator',
          platform: platform,
          error_type: 'api_error',
          error_message: errorMessage,
          request_data: { platform, video_url, content },
        });

        // 謚慕ｨｿ螻･豁ｴ繧貞､ｱ謨励→縺励※險倬鹸
        await supabase.from('sns_posts').insert({
          content_id: contentId,
          platform: platform,
          status: 'failed',
          error_message: errorMessage,
        });

        results.push({
          platform,
          status: 'failed',
          error: errorMessage,
        });
      }
    });

    await Promise.allSettled(publishPromises);

    // X/Twitter謇句虚謚慕ｨｿ逕ｨ縺ｮURL繝ｪ繧ｹ繝医ｒ菫晏ｭ・
    await supabase.from('sns_manual_posts').insert({
      content_id: contentId,
      platform: 'twitter',
      post_urls: manualPostUrls,
      status: 'pending',
    });

    // 邨先棡繧定ｿ斐☆
    return new Response(
      JSON.stringify({
        content_id: contentId,
        video_url: video_url,
        posts: results,
        manual_post_urls: manualPostUrls, // X/Twitter謇句虚謚慕ｨｿ逕ｨ
        summary: {
          total: platforms.length,
          success: results.filter((r) => r.status === 'success').length,
          failed: results.filter((r) => r.status === 'failed').length,
        },
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    // 繧ｨ繝ｩ繝ｼ繝ｭ繧ｰ繧定ｨ倬鹸
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('error_logs').insert({
      function_name: 'orchestrator',
      error_type: 'unknown_error',
      error_message: (error as Error).message,
      error_stack: (error as Error).stack || null,
    });

    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
});

