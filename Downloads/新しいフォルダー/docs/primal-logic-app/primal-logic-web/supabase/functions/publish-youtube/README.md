# publish-youtube Function

YouTube Shorts縺ｫ蜍慕判繧呈兜遞ｿ縺吶ｋFunction縺ｧ縺吶・

## 蠢・ｦ√↑迺ｰ蠅・､画焚

Supabase Secrets縺ｫ莉･荳九ｒ險ｭ螳壹＠縺ｦ縺上□縺輔＞・・

```bash
supabase secrets set YOUTUBE_API_KEY=your_youtube_api_key
supabase secrets set YOUTUBE_ACCESS_TOKEN=your_youtube_access_token
```

## API繧ｭ繝ｼ蜿門ｾ玲婿豕・

1. [Google Cloud Console](https://console.cloud.google.com/)縺ｧ繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ菴懈・
2. YouTube Data API v3繧呈怏蜉ｹ蛹・
3. 隱崎ｨｼ諠・ｱ 竊・OAuth 2.0 繧ｯ繝ｩ繧､繧｢繝ｳ繝・D繧剃ｽ懈・
4. OAuth 2.0縺ｧ繧｢繧ｯ繧ｻ繧ｹ繝医・繧ｯ繝ｳ繧貞叙蠕・

## 菴ｿ縺・婿

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/publish-youtube \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_url": "https://example.com/video.mp4",
    "content": {
      "title": "蜍慕判繧ｿ繧､繝医Ν",
      "script": "蜍慕判繧ｹ繧ｯ繝ｪ繝励ヨ",
      "hashtags": ["#carnivore"],
      "keywords": ["carnivore"],
      "scientificEvidence": "遘大ｭｦ逧・ｹ諡"
    }
  }'
```

## 繝ｬ繧ｹ繝昴Φ繧ｹ

謌仙粥譎ゑｼ・
```json
{
  "platform": "youtube",
  "video_id": "abc123",
  "video_url": "https://www.youtube.com/shorts/abc123",
  "post_url": "https://www.youtube.com/shorts/abc123",
  "status": "success"
}
```

螟ｱ謨玲凾・・
```json
{
  "platform": "youtube",
  "status": "failed",
  "error": "繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ"
}
```

