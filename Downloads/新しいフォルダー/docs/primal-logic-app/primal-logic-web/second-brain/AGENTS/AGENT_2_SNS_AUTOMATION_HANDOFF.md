# Agent 2 引き継ぎ賁E��: SNS自動投稿シスチE��構篁E

> **作�E日**: 2026-01-20  
> **目皁E*: Agent 2がSNS自動投稿シスチE���E�Eupabase Functions�E�を構築するため�E引き継ぎ賁E��

---

## ⚠�E�E重要E Rules参�E�E�忁E��！E

**こ�Eタスクを開始する前に、忁E��以下を確認すること�E�E*

1. **マスタールール**: `second-brain/RULES/master_rule.mdc`を読み込む
   - 全Agent共通�Eルール
   - タスク開始時に忁E��参�Eすること

2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する
   - こ�Eタスクは「機�E実裁E��Eupabase Functions�E�」タイチE
   - 重要Rules: #0, #1, #2, #7

3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する
   - `second-brain/THINKING_PROCESS.md`に記録
   - 使用したRules番号と適用方法を併訁E

**Rulesを参照しなぁE��合、ルール違反として扱ぁE��E*

詳細は `second-brain/AGENTS/RULES_SHARING_PROTOCOL.md` を参照、E

---

## 📋 作業概要E

**Agent 2の拁E��E*: SNS自動投稿シスチE���E�Eupabase Functions�E�E
- コンチE��チE��戁EↁE動画作�E ↁE全SNS投稿の自動化
- API統吁E
- チE�Eロイ・運用

**Agent 1の拁E��E*: 過激HookコンチE��チE��成！E週間集中、E日3本�E�E
- ニュース/トレンド収雁E
- Hook生�E�E�「野菜�E毒！」系�E�E
- 科学皁E��拠の絁E��込み

---

## 🎯 シスチE��要件

### 1. 入力データ�E�Egent 1から受け取る�E�E

```typescript
interface CarnivoreContent {
  topic: string              // トピチE���E�例：「野菜�E毒！」！E
  title: string              // 動画タイトル
  script: string             // 動画スクリプト�E�E0秒用�E�E
  hook: string               // 過激Hook�E��E頭5秒！E
  scientificEvidence: string // 科学皁E��拠
  hashtags: string[]         // ハッシュタグ
  keywords: string[]         // SEOキーワーチE
  duration: number           // 動画の長さ（秒！E
}
```

### 2. 出力（�ESNS投稿�E�E

**投稿先（�E動投稿対象 - 6プラチE��フォーム�E�E*:
1. YouTube Shorts
2. Instagram Reels
3. TikTok
4. Facebook Reels
5. LinkedIn
6. Pinterest

**手動投稿対象**:
- X (Twitter) - 自動化から除外（手動でもやる価値があるくらい重要E��E
  - 参�E: `second-brain/SNS_手動投稿リスチEmd`

---

## 🏗�E�EシスチE��構�E�E�Eupabase Functions�E�E

### チE��レクトリ構造

```
supabase/functions/
├── generate-script/        # スクリプト生�E�E�Egent 1が使用�E�E
├── create-video/           # 動画生�E�E�EeyGen API�E�E
├── publish-youtube/        # YouTube投稿
├── publish-tiktok/         # TikTok投稿
├── publish-instagram/      # Instagram投稿
├── publish-facebook/       # Facebook投稿
├── publish-linkedin/       # LinkedIn投稿
├── publish-pinterest/      # Pinterest投稿
# X (Twitter)は手動投稿のため除外（参照: second-brain/SNS_手動投稿リスチEmd�E�E
├── orchestrator/           # 全体オーケストレーション
└── shared/                 # 共通型定義
    └── types.ts
```

### ワークフロー

```mermaid
graph LR
    A[Agent 1: コンチE��チE��成] -->|CarnivoreContent JSON| B[orchestrator]
    B --> C[create-video: HeyGen API]
    C -->|MP4 Video| D[並列投稿]
    D --> E[YouTube]
    D --> F[Instagram]
    D --> G[TikTok]
    D --> H[Facebook]
    D --> I[LinkedIn]
    D --> J[Pinterest]
    M[X/Twitter手動投稿] -.->|別途手動| N[X投稿完亁E
```

---

## 🔧 実裁E��細

### 1. orchestrator/index.ts

**役割**: Agent 1からのコンチE��チE��受け取り、動画生�E→�ESNS投稿を実衁E

**入劁E*:
```json
{
  "content": {
    "topic": "野菜は毒！E,
    "title": "野菜は毒！科学皁E��拠で証明すめE,
    "script": "...",
    "hook": "...",
    "scientificEvidence": "...",
    "hashtags": ["#carnivore", "#野菜は毁E],
    "keywords": ["carnivore", "vegetable toxins"],
    "duration": 60
  }
}
```

**処琁E��ロー**:
1. `create-video` Functionを呼び出して動画生�E
2. 生�Eされた動画URLを取征E
3. 6プラチE��フォーム�E�EouTube, Instagram, TikTok, Facebook, LinkedIn, Pinterest�E�に並列投稿
4. X (Twitter)は手動投稿のため除夁E
5. 投稿結果を返す�E�E投稿用のURLリストも含む�E�E

### 2. create-video/index.ts

**役割**: HeyGen APIを使用して動画を生戁E

**忁E��なAPI Key**:
- `HEYGEN_API_KEY` (Supabase Secrets)

**処琁E*:
1. HeyGen APIにスクリプトを送信
2. 動画生�Eを征E��（�Eーリング�E�E
3. 生�Eされた動画URLを返す

**実裁E��E*:

```typescript
// supabase/functions/create-video/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const HEYGEN_API_URL = 'https://api.heygen.com/v2';

interface HeyGenVideoRequest {
  text: string;
  avatar_id?: string;
  voice_id?: string;
  dimension?: { width: number; height: number };
  background?: string;
  caption?: boolean;
  test?: boolean;
}

interface HeyGenVideoResponse {
  data: {
    video_id: string;
    status: 'pending' | 'waiting' | 'processing' | 'completed' | 'failed';
    video_url?: string;
    error?: string;
  };
}

serve(async (req) => {
  try {
    const { content } = await req.json();
    const apiKey = Deno.env.get('HEYGEN_API_KEY');

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'HEYGEN_API_KEY not set' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // スクリプト長さチェチE���E�Ereeプラン: 500斁E��、有料�Eラン: 5000斁E��！E
    const maxLength = content.duration <= 180 ? 500 : 5000;
    if (content.script.length > maxLength) {
      return new Response(
        JSON.stringify({ error: `Script too long: ${content.script.length} > ${maxLength}` }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 動画生�EリクエスチE
    const request: HeyGenVideoRequest = {
      text: content.script,
      dimension: content.duration <= 180
        ? { width: 1280, height: 720 }  // Freeプラン: 720p
        : { width: 1920, height: 1080 }, // 有料プラン: 1080p
      caption: true, // 字幕を有効匁E
    };

    const response = await fetch(`${HEYGEN_API_URL}/video/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HeyGen API error: ${response.status} - ${errorText}`);
    }

    const result: HeyGenVideoResponse = await response.json();
    const data = result.data;

    // ポ�Eリング処琁E
    if (data.status === 'pending' || data.status === 'waiting' || data.status === 'processing') {
      const videoUrl = await pollVideoStatus(data.video_id, apiKey);
      return new Response(
        JSON.stringify({ video_url: videoUrl }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (data.status === 'completed' && data.video_url) {
      return new Response(
        JSON.stringify({ video_url: data.video_url }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    throw new Error(data.error || 'Video generation failed');
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});

// ポ�Eリング関数
async function pollVideoStatus(
  videoId: string,
  apiKey: string,
  maxAttempts = 60,
  intervalMs = 5000
): Promise<string> {
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    await new Promise((resolve) => setTimeout(resolve, intervalMs));

    const response = await fetch(`${HEYGEN_API_URL}/video_status?video_id=${videoId}`, {
      headers: { 'X-Api-Key': apiKey },
    });

    if (!response.ok) {
      throw new Error(`Failed to check video status: ${response.statusText}`);
    }

    const result: HeyGenVideoResponse = await response.json();
    const data = result.data;

    if (data.status === 'completed' && data.video_url) {
      return data.video_url;
    }

    if (data.status === 'failed') {
      throw new Error(data.error || 'Video generation failed');
    }
  }

  throw new Error('Video generation timeout');
}
```

**重要なポインチE*:
- **APIエンド�EインチE*: `https://api.heygen.com/v2/video/generate`
- **認証**: `X-Api-Key` ヘッダーにAPIキーを設宁E
- **ポ�Eリング**: 動画生�Eは非同期�Eため、`video_status` エンド�EイントでスチE�Eタスを確誁E
- **タイムアウチE*: 最大60回！E秒間隁E= 最大5刁E��まで征E��E
- **解像度**: Freeプランは720p、有料�Eランは1080p
- **スクリプト長ぁE*: Freeプランは500斁E��、有料�Eランは5000斁E��まで

### 3. 各SNS投稿Function

**共通�E琁E*:
- 動画URLから動画ファイルを取征E
- 各SNS APIにアチE�EローチE
- 投稿結果�E�投稿ID、URL�E�を返す

**忁E��なAPI Keys** (Supabase Secrets):
- `YOUTUBE_API_KEY`
- `TIKTOK_ACCESS_TOKEN`
- `META_ACCESS_TOKEN` (Instagram + Facebook)
- `PINTEREST_ACCESS_TOKEN`
- `LINKEDIN_ACCESS_TOKEN`

**X (Twitter)**:
- **自動化から除夁E*: 手動投稿に変更�E�手動でもやる価値があるくらい重要E��E
- 参�E: `second-brain/SNS_手動投稿リスチEmd`

#### 3.1. publish-youtube/index.ts

**役割**: YouTube Shortsに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-youtube/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const apiKey = Deno.env.get('YOUTUBE_API_KEY');
    const accessToken = Deno.env.get('YOUTUBE_ACCESS_TOKEN');

    if (!apiKey || !accessToken) {
      return new Response(
        JSON.stringify({ error: 'YouTube API credentials not set' }),
        { status: 500 }
      );
    }

    // 1. 動画ファイルをダウンローチE
    const videoResponse = await fetch(video_url);
    const videoBlob = await videoResponse.blob();

    // 2. YouTube Data API v3で動画をアチE�EローチE
    // 注愁E 実際の実裁E��は、multipart/form-data形式でアチE�Eロードが忁E��E
    const formData = new FormData();
    formData.append('snippet', JSON.stringify({
      title: content.title,
      description: `${content.script}\n\n${content.hashtags.join(' ')}`,
      tags: content.keywords,
      categoryId: '22', // People & Blogs
    }));
    formData.append('status', JSON.stringify({
      privacyStatus: 'public',
      selfDeclaredMadeForKids: false,
    }));
    formData.append('video', videoBlob);

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
      const error = await uploadResponse.text();
      throw new Error(`YouTube upload failed: ${error}`);
    }

    const result = await uploadResponse.json();
    const videoId = result.id;
    const videoUrl = `https://www.youtube.com/shorts/${videoId}`;

    return new Response(
      JSON.stringify({
        platform: 'youtube',
        video_id: videoId,
        video_url: videoUrl,
        status: 'success',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: YouTube Data API v3 ドキュメンチE
- エンド�EインチE `https://www.googleapis.com/upload/youtube/v3/videos`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 1日10,000ユニット（動画アチE�Eロード�E紁E,600ユニット！E

#### 3.2. publish-tiktok/index.ts

**役割**: TikTokに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-tiktok/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const accessToken = Deno.env.get('TIKTOK_ACCESS_TOKEN');
    const clientKey = Deno.env.get('TIKTOK_CLIENT_KEY');

    if (!accessToken || !clientKey) {
      return new Response(
        JSON.stringify({ error: 'TikTok API credentials not set' }),
        { status: 500 }
      );
    }

    // 1. 動画ファイルをダウンローチE
    const videoResponse = await fetch(video_url);
    const videoBlob = await videoResponse.blob();

    // 2. TikTok Content Posting APIで動画をアチE�EローチE
    // 注愁E TikTok APIは2段階アチE�Eロード（�E期化 ↁEアチE�EローチEↁE公開！E
    const formData = new FormData();
    formData.append('video', videoBlob);
    formData.append('post_info', JSON.stringify({
      title: content.title,
      privacy_level: 'PUBLIC_TO_EVERYONE',
      disable_duet: false,
      disable_comment: false,
      disable_stitch: false,
      video_cover_timestamp_ms: 1000,
    }));

    const uploadResponse = await fetch(
      'https://open.tiktokapis.com/v2/post/publish/video/init/',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      throw new Error(`TikTok upload failed: ${error}`);
    }

    const result = await uploadResponse.json();
    const videoId = result.data.publish_id;

    return new Response(
      JSON.stringify({
        platform: 'tiktok',
        video_id: videoId,
        status: 'success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: TikTok Content Posting API ドキュメンチE
- エンド�EインチE `https://open.tiktokapis.com/v2/post/publish/video/init/`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 開発老E��カウントで無斁E

#### 3.3. publish-instagram/index.ts

**役割**: Instagram Reelsに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-instagram/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const accessToken = Deno.env.get('META_ACCESS_TOKEN');
    const instagramUserId = Deno.env.get('INSTAGRAM_USER_ID');

    if (!accessToken || !instagramUserId) {
      return new Response(
        JSON.stringify({ error: 'Instagram API credentials not set' }),
        { status: 500 }
      );
    }

    // 1. 動画ファイルをダウンローチE
    const videoResponse = await fetch(video_url);
    const videoBlob = await videoResponse.blob();

    // 2. Instagram Graph APIで動画をアチE�Eロード！E段階！E
    // Step 1: コンチE��作�E
    const containerResponse = await fetch(
      `https://graph.instagram.com/v18.0/${instagramUserId}/media?media_type=REELS&video_url=${encodeURIComponent(video_url)}&caption=${encodeURIComponent(content.title + '\n\n' + content.hashtags.join(' '))}&access_token=${accessToken}`,
      { method: 'POST' }
    );

    if (!containerResponse.ok) {
      const error = await containerResponse.text();
      throw new Error(`Instagram container creation failed: ${error}`);
    }

    const containerResult = await containerResponse.json();
    const containerId = containerResult.id;

    // Step 2: コンチE��公閁E
    const publishResponse = await fetch(
      `https://graph.instagram.com/v18.0/${instagramUserId}/media_publish?creation_id=${containerId}&access_token=${accessToken}`,
      { method: 'POST' }
    );

    if (!publishResponse.ok) {
      const error = await publishResponse.text();
      throw new Error(`Instagram publish failed: ${error}`);
    }

    const publishResult = await publishResponse.json();
    const mediaId = publishResult.id;

    return new Response(
      JSON.stringify({
        platform: 'instagram',
        media_id: mediaId,
        status: 'success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: Instagram Graph API ドキュメンチE
- エンド�EインチE `https://graph.instagram.com/v18.0/{user-id}/media`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 基本機�Eは無斁E

#### 3.4. publish-facebook/index.ts

**役割**: Facebook Reelsに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-facebook/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const accessToken = Deno.env.get('META_ACCESS_TOKEN');
    const pageId = Deno.env.get('FACEBOOK_PAGE_ID');

    if (!accessToken || !pageId) {
      return new Response(
        JSON.stringify({ error: 'Facebook API credentials not set' }),
        { status: 500 }
      );
    }

    // Facebook Graph APIでReelsを投稿
    // 注愁E Facebook Reels APIはペ�Eジアカウントが忁E��E
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${pageId}/video_reels?video_url=${encodeURIComponent(video_url)}&description=${encodeURIComponent(content.title + '\n\n' + content.hashtags.join(' '))}&access_token=${accessToken}`,
      { method: 'POST' }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Facebook upload failed: ${error}`);
    }

    const result = await response.json();
    const reelId = result.id;

    return new Response(
      JSON.stringify({
        platform: 'facebook',
        reel_id: reelId,
        status: 'success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: Facebook Graph API ドキュメンチE
- エンド�EインチE `https://graph.facebook.com/v18.0/{page-id}/video_reels`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 基本機�Eは無斁E

#### 3.5. publish-linkedin/index.ts

**役割**: LinkedInに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-linkedin/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const accessToken = Deno.env.get('LINKEDIN_ACCESS_TOKEN');
    const personUrn = Deno.env.get('LINKEDIN_PERSON_URN'); // urn:li:person:xxxxx

    if (!accessToken || !personUrn) {
      return new Response(
        JSON.stringify({ error: 'LinkedIn API credentials not set' }),
        { status: 500 }
      );
    }

    // LinkedIn APIで動画を投稿�E�E段階！E
    // Step 1: 動画アチE�Eロード！Epload URL取得！E
    const uploadResponse = await fetch(
      'https://api.linkedin.com/v2/assets?action=registerUpload',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          registerUploadRequest: {
            recipes: ['urn:li:digitalmediaRecipe:feedshare-video'],
            owner: personUrn,
            serviceRelationships: [{
              relationshipType: 'OWNER',
              identifier: 'urn:li:userGeneratedContent',
            }],
          },
        }),
      }
    );

    if (!uploadResponse.ok) {
      const error = await uploadResponse.text();
      throw new Error(`LinkedIn upload URL failed: ${error}`);
    }

    const uploadResult = await uploadResponse.json();
    const uploadUrl = uploadResult.value.uploadMechanism['com.linkedin.digitalmedia.uploading.MediaUploadHttpRequest'].uploadUrl;
    const asset = uploadResult.value.asset;

    // Step 2: 動画ファイルをアチE�EローチE
    const videoResponse = await fetch(video_url);
    const videoBlob = await videoResponse.blob();

    const putResponse = await fetch(uploadUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
      },
      body: videoBlob,
    });

    if (!putResponse.ok) {
      throw new Error(`LinkedIn video upload failed: ${putResponse.statusText}`);
    }

    // Step 3: 投稿作�E
    const postResponse = await fetch(
      'https://api.linkedin.com/v2/ugcPosts',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Restli-Protocol-Version': '2.0.0',
        },
        body: JSON.stringify({
          author: personUrn,
          lifecycleState: 'PUBLISHED',
          specificContent: {
            'com.linkedin.ugc.ShareContent': {
              shareCommentary: {
                text: `${content.title}\n\n${content.hashtags.join(' ')}`,
              },
              shareMediaCategory: 'VIDEO',
              media: [{
                status: 'READY',
                media: asset,
                title: {
                  text: content.title,
                },
              }],
            },
          },
          visibility: {
            'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC',
          },
        }),
      }
    );

    if (!postResponse.ok) {
      const error = await postResponse.text();
      throw new Error(`LinkedIn post creation failed: ${error}`);
    }

    const postResult = await postResponse.json();
    const postId = postResult.id;

    return new Response(
      JSON.stringify({
        platform: 'linkedin',
        post_id: postId,
        status: 'success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: LinkedIn API ドキュメンチE
- エンド�EインチE `https://api.linkedin.com/v2/ugcPosts`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 開発老E��カウントで無斁E

#### 3.6. publish-pinterest/index.ts

**役割**: Pinterestに動画を投稿

**実裁E��E*:

```typescript
// supabase/functions/publish-pinterest/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

serve(async (req) => {
  try {
    const { video_url, content } = await req.json();
    const accessToken = Deno.env.get('PINTEREST_ACCESS_TOKEN');
    const boardId = Deno.env.get('PINTEREST_BOARD_ID');

    if (!accessToken || !boardId) {
      return new Response(
        JSON.stringify({ error: 'Pinterest API credentials not set' }),
        { status: 500 }
      );
    }

    // Pinterest APIで動画ピンを作�E
    const response = await fetch(
      'https://api.pinterest.com/v5/pins',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          board_id: boardId,
          media_source: {
            source_type: 'video_url',
            url: video_url,
          },
          title: content.title,
          description: `${content.script}\n\n${content.hashtags.join(' ')}`,
          link: video_url,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Pinterest upload failed: ${error}`);
    }

    const result = await response.json();
    const pinId = result.id;

    return new Response(
      JSON.stringify({
        platform: 'pinterest',
        pin_id: pinId,
        status: 'success',
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});
```

**参老E*: Pinterest API ドキュメンチE
- エンド�EインチE `https://api.pinterest.com/v5/pins`
- 認証: OAuth 2.0�E�Eccess Tokenが忁E��E��E
- 無料枠: 開発老E��カウントで無斁E

---

## 🗄�E�EチE�Eタベ�Eススキーマ設訁E

### チE�Eブル設訁E

#### 1. `carnivore_content` チE�Eブル�E�コンチE��チE��存！E

```sql
CREATE TABLE IF NOT EXISTS carnivore_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  title TEXT NOT NULL,
  script TEXT NOT NULL,
  hook TEXT NOT NULL,
  scientific_evidence TEXT,
  hashtags TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  duration INTEGER NOT NULL,
  video_url TEXT,
  video_status TEXT DEFAULT 'pending', -- pending, generating, completed, failed
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT DEFAULT 'agent1'
);

-- インチE��クス
CREATE INDEX IF NOT EXISTS idx_carnivore_content_status ON carnivore_content(video_status);
CREATE INDEX IF NOT EXISTS idx_carnivore_content_created_at ON carnivore_content(created_at DESC);
```

#### 2. `sns_posts` チE�Eブル�E�投稿履歴�E�E

```sql
CREATE TABLE IF NOT EXISTS sns_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE CASCADE,
  platform TEXT NOT NULL, -- youtube, instagram, tiktok, facebook, linkedin, pinterest
  post_id TEXT, -- 吁E�EラチE��フォームの投稿ID
  post_url TEXT,
  status TEXT DEFAULT 'pending', -- pending, published, failed
  error_message TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インチE��クス
CREATE INDEX IF NOT EXISTS idx_sns_posts_content_id ON sns_posts(content_id);
CREATE INDEX IF NOT EXISTS idx_sns_posts_platform ON sns_posts(platform);
CREATE INDEX IF NOT EXISTS idx_sns_posts_status ON sns_posts(status);
CREATE INDEX IF NOT EXISTS idx_sns_posts_published_at ON sns_posts(published_at DESC);
```

#### 3. `error_logs` チE�Eブル�E�エラーログ�E�E

```sql
CREATE TABLE IF NOT EXISTS error_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE SET NULL,
  function_name TEXT NOT NULL, -- orchestrator, create-video, publish-youtube, etc.
  platform TEXT, -- youtube, instagram, etc. (null if not platform-specific)
  error_type TEXT NOT NULL, -- api_error, timeout, validation_error, etc.
  error_message TEXT NOT NULL,
  error_stack TEXT,
  request_data JSONB,
  response_data JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- インチE��クス
CREATE INDEX IF NOT EXISTS idx_error_logs_content_id ON error_logs(content_id);
CREATE INDEX IF NOT EXISTS idx_error_logs_function_name ON error_logs(function_name);
CREATE INDEX IF NOT EXISTS idx_error_logs_platform ON error_logs(platform);
CREATE INDEX IF NOT EXISTS idx_error_logs_created_at ON error_logs(created_at DESC);
```

#### 4. `sns_manual_posts` チE�Eブル�E�E/Twitter手動投稿用�E�E

```sql
CREATE TABLE IF NOT EXISTS sns_manual_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES carnivore_content(id) ON DELETE CASCADE,
  platform TEXT DEFAULT 'twitter', -- twitter, threads
  post_urls JSONB, -- 他�EプラチE��フォームへの投稿URLリスチE
  status TEXT DEFAULT 'pending', -- pending, posted, skipped
  posted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- インチE��クス
CREATE INDEX IF NOT EXISTS idx_sns_manual_posts_content_id ON sns_manual_posts(content_id);
CREATE INDEX IF NOT EXISTS idx_sns_manual_posts_status ON sns_manual_posts(status);
```

### トリガー関数�E�更新日時�E自動更新�E�E

```sql
-- updated_atを�E動更新する関数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 吁E��ーブルにトリガーを設宁E
CREATE TRIGGER update_carnivore_content_updated_at
  BEFORE UPDATE ON carnivore_content
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sns_posts_updated_at
  BEFORE UPDATE ON sns_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sns_manual_posts_updated_at
  BEFORE UPDATE ON sns_manual_posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

### Row Level Security (RLS) ポリシー

```sql
-- Service Role Keyでアクセス可能にする�E�Eunctionsから使用�E�E
ALTER TABLE carnivore_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE sns_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE sns_manual_posts ENABLE ROW LEVEL SECURITY;

-- Service Role Keyは全ての操作を許可�E�Eunctions用�E�E
CREATE POLICY "Service role can do everything" ON carnivore_content
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything" ON sns_posts
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything" ON error_logs
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role can do everything" ON sns_manual_posts
  FOR ALL USING (auth.role() = 'service_role');
```

---

## 📦 忁E��な環墁E��数�E�Eupabase Secrets�E�E

```bash
# 動画生�E
HEYGEN_API_KEY=xxx

# SNS APIs
YOUTUBE_API_KEY=xxx
YOUTUBE_CLIENT_ID=xxx
YOUTUBE_CLIENT_SECRET=xxx
YOUTUBE_ACCESS_TOKEN=xxx

TIKTOK_CLIENT_KEY=xxx
TIKTOK_CLIENT_SECRET=xxx
TIKTOK_ACCESS_TOKEN=xxx

META_APP_ID=xxx
META_APP_SECRET=xxx
META_ACCESS_TOKEN=xxx
INSTAGRAM_USER_ID=xxx

PINTEREST_APP_ID=xxx
PINTEREST_APP_SECRET=xxx
PINTEREST_ACCESS_TOKEN=xxx

LINKEDIN_CLIENT_ID=xxx
LINKEDIN_CLIENT_SECRET=xxx
LINKEDIN_ACCESS_TOKEN=xxx

# Supabase
SUPABASE_URL=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx
```

---

## 🚀 実裁E��頁E

### Step 1: Supabase Functions構造を作�E

```bash
# チE��レクトリ作�E
mkdir -p supabase/functions/{orchestrator,create-video,publish-youtube,publish-tiktok,publish-instagram,publish-facebook,publish-linkedin,publish-pinterest,publish-x,publish-threads,shared}
```

### Step 2: 共通型定義を作�E

`supabase/functions/shared/types.ts` に以下を定義:
- `CarnivoreContent` interface
- `VideoOutput` interface
- `SNSPublishResult` interface

### Step 3: 各Functionを実裁E

優先頁E��E
1. `create-video` (動画生�E)
2. `publish-youtube` (YouTube投稿)
3. `publish-tiktok` (TikTok投稿)
4. `publish-instagram` (Instagram投稿)
5. `publish-facebook` (Facebook投稿)
6. `publish-linkedin` (LinkedIn投稿)
7. `publish-pinterest` (Pinterest投稿)
8. `orchestrator` (全体統吁E
9. X (Twitter)は手動投稿�E�参照: `second-brain/SNS_手動投稿リスチEmd`�E�E

### Step 4: 環墁E��数設宁E

```bash
npx supabase secrets set HEYGEN_API_KEY=xxx
npx supabase secrets set YOUTUBE_API_KEY=xxx
# ... 他�EAPI Keys
```

### Step 5: チE�Eロイ

```bash
npx supabase functions deploy orchestrator
npx supabase functions deploy create-video
# ... 他�EFunctions
```

### Step 6: チE��ト実衁E

#### ローカルチE��ト！Eupabase CLI使用�E�E

```bash
# 1. Supabase CLIでローカル環墁E��起勁E
supabase start

# 2. ローカルでFunctionを実衁E
curl -X POST http://localhost:54321/functions/v1/create-video \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "topic": "野菜は毒！E,
      "title": "チE��ト動画",
      "script": "これはチE��トです、E,
      "hook": "野菜は毒です！E,
      "scientificEvidence": "科学皁E��拠...",
      "hashtags": ["#test"],
      "keywords": ["test"],
      "duration": 30
    }
  }'
```

#### 本番環墁E��スチE

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/orchestrator \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "topic": "野菜は毒！E,
      "title": "チE��ト動画",
      "script": "これはチE��トです、E,
      "hook": "野菜は毒です！E,
      "scientificEvidence": "科学皁E��拠...",
      "hashtags": ["#test"],
      "keywords": ["test"],
      "duration": 30
    }
  }'
```

#### 各Functionの個別チE��チE

**create-video チE��チE*:
```bash
curl -X POST http://localhost:54321/functions/v1/create-video \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "content": {
      "script": "This is a test script for video generation.",
      "duration": 30
    }
  }'
```

**publish-youtube チE��チE*:
```bash
curl -X POST http://localhost:54321/functions/v1/publish-youtube \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "video_url": "https://example.com/test-video.mp4",
    "content": {
      "title": "Test Video",
      "script": "Test script",
      "hashtags": ["#test"],
      "keywords": ["test"]
    }
  }'
```

#### 統合テスト手頁E

1. **チE�Eタベ�Eススキーマ確誁E*:
```bash
# Supabase DashboardでSQL Editorを開き、スキーマが正しく作�EされてぁE��か確誁E
SELECT * FROM carnivore_content;
SELECT * FROM sns_posts;
SELECT * FROM error_logs;
```

2. **環墁E��数確誁E*:
```bash
# Supabase CLIで環墁E��数を確誁E
supabase secrets list
```

3. **エンドツーエンドテスチE*:
   - Agent 1がコンチE��チE��生�E
   - orchestrator Functionを呼び出ぁE
   - 動画生�Eが�E功することを確誁E
   - 各SNSへの投稿が�E功することを確認（また�E適刁E��エラーハンドリングされることを確認！E
   - エラーログが正しく記録されることを確誁E

4. **エラーハンドリングチE��チE*:
   - 無効なAPIキーでエラーが発生することを確誁E
   - 1つのプラチE��フォームで失敗しても、他�EプラチE��フォームへの投稿が継続することを確誁E
   - エラーログが`error_logs`チE�Eブルに記録されることを確誁E

#### チE��トチェチE��リスチE

- [ ] `create-video` Functionが正常に動作すめE
- [ ] 各SNS投稿Functionが正常に動作すめE
- [ ] `orchestrator` Functionが正常に動作すめE
- [ ] エラーハンドリングが正常に動作する！EつのプラチE��フォームで失敗しても他�E継続！E
- [ ] エラーログが正しく記録されめE
- [ ] チE�Eタベ�Eスに正しくチE�Eタが保存される
- [ ] X/Twitter手動投稿用のURLリストが生�EされめE

---

## 📚 参老E��E��

- `VIDEO_WORKFLOW.md` - ワークフロー詳細
- `SNS_HOOK_CONTENT_PLAN.md` - コンチE��チE��成計画
- `SNS_AUTOMATION_PLAN.md` - SNS自動化計画
- `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` - Agent刁E��の仕絁E��
- `second-brain/AGENTS/MULTI_AGENT_START_GUIDE.md` - Agent起動手頁E

---

## 🔄 Agent 1との連携

### チE�Eタ受け渡ぁE

**Agent 1 ↁEAgent 2**:
- Agent 1が生成したコンチE��チE��JSON形式でSupabase Storageまた�EDatabaseに保孁E
- `orchestrator` Functionを呼び出して自動投稿を開姁E

**Agent 2 ↁEAgent 1**:
- 投稿結果�E��E劁E失敗、投稿ID、URL�E�を返す
- エラーログをAgent 1に通知

---

## ✁E完亁E��件

- [ ] 全6プラチE��フォーム�E�EouTube, Instagram, TikTok, Facebook, LinkedIn, Pinterest�E��E投稿Functionが実裁E��亁E
- [ ] orchestratorが正常に動佁E
- [ ] 環墁E��数が�Eて設定済み
- [ ] チE��ト実行が成功
- [ ] Agent 1からの呼び出しが正常に動佁E
- [ ] X (Twitter)手動投稿用のURLリストが生�EされめE

---

## 🛡�E�Eエラーハンドリング戦略

### 基本方釁E

1. **部刁E��敗�E許容**: 1つのプラチE��フォームで失敗しても、他�EプラチE��フォームへの投稿は継綁E
2. **リトライロジチE��**: 一時的なエラー�E�ネチE��ワークエラー、レート制限等）�E自動リトライ
3. **エラーログ記録**: 全てのエラーを`error_logs`チE�Eブルに記録
4. **失敗通知**: 重要なエラーはAgent 1に通知

### リトライロジチE��実裁E��E

```typescript
// supabase/functions/shared/retry.ts
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  initialDelay = 1000
): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;

      // リトライ不可なエラー�E�認証エラー、バリチE�Eションエラー等）�E即座に失敁E
      if (isNonRetryableError(error)) {
        throw error;
      }

      // 最後�E試行でなぁE��合、征E��してリトライ
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt); // 持E��バックオチE
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error('Retry failed');
}

function isNonRetryableError(error: any): boolean {
  // 認証エラー�E�E01, 403�E�E
  if (error.status === 401 || error.status === 403) {
    return true;
  }

  // バリチE�Eションエラー�E�E00�E�E
  if (error.status === 400) {
    return true;
  }

  // リソースが見つからなぁE��E04�E�E
  if (error.status === 404) {
    return true;
  }

  return false;
}
```

### エラーログ記録関数

```typescript
// supabase/functions/shared/errorLogger.ts
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

export async function logError(
  error: Error,
  context: {
    contentId?: string;
    functionName: string;
    platform?: string;
    requestData?: any;
    responseData?: any;
  }
): Promise<void> {
  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    await supabase.from('error_logs').insert({
      content_id: context.contentId || null,
      function_name: context.functionName,
      platform: context.platform || null,
      error_type: error.name || 'unknown',
      error_message: error.message,
      error_stack: error.stack || null,
      request_data: context.requestData || null,
      response_data: context.responseData || null,
    });
  } catch (logError) {
    // エラーログの記録に失敗しても、�Eのエラーを投げる
    console.error('Failed to log error:', logError);
  }
}
```

### orchestratorでのエラーハンドリング実裁E��E

```typescript
// supabase/functions/orchestrator/index.ts
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { retryWithBackoff } from '../shared/retry.ts';
import { logError } from '../shared/errorLogger.ts';

serve(async (req) => {
  const { content } = await req.json();
  const contentId = content.id || crypto.randomUUID();

  const results = {
    video_url: null as string | null,
    posts: [] as Array<{ platform: string; status: string; url?: string; error?: string }>,
    manual_post_urls: [] as string[],
  };

  try {
    // 1. 動画生�E�E�リトライ付き�E�E
    try {
      const videoResponse = await retryWithBackoff(async () => {
        const response = await fetch(
          `${Deno.env.get('SUPABASE_URL')}/functions/v1/create-video`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
          }
        );
        if (!response.ok) throw new Error(`Video generation failed: ${response.statusText}`);
        return await response.json();
      });

      results.video_url = videoResponse.video_url;
    } catch (error) {
      await logError(error as Error, {
        contentId,
        functionName: 'orchestrator',
        requestData: { step: 'video_generation', content },
      });
      // 動画生�E失敗�E致命皁E��ので、ここで終亁E
      throw error;
    }

    // 2. 各SNSへの並列投稿�E�Eつ失敗しても他�E継続！E
    const platforms = ['youtube', 'instagram', 'tiktok', 'facebook', 'linkedin', 'pinterest'];
    const publishPromises = platforms.map(async (platform) => {
      try {
        const response = await retryWithBackoff(async () => {
          const funcResponse = await fetch(
            `${Deno.env.get('SUPABASE_URL')}/functions/v1/publish-${platform}`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                video_url: results.video_url,
                content,
              }),
            }
          );
          if (!funcResponse.ok) throw new Error(`${platform} publish failed: ${funcResponse.statusText}`);
          return await funcResponse.json();
        });

        results.posts.push({
          platform,
          status: 'success',
          url: response.video_url || response.post_url,
        });
        results.manual_post_urls.push(response.video_url || response.post_url);
      } catch (error) {
        await logError(error as Error, {
          contentId,
          functionName: 'orchestrator',
          platform,
          requestData: { step: 'publish', platform, content },
        });

        results.posts.push({
          platform,
          status: 'failed',
          error: (error as Error).message,
        });
      }
    });

    await Promise.allSettled(publishPromises);

    // 3. 結果を返す
    return new Response(
      JSON.stringify({
        content_id: contentId,
        video_url: results.video_url,
        posts: results.posts,
        manual_post_urls: results.manual_post_urls, // X/Twitter手動投稿用
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await logError(error as Error, {
      contentId,
      functionName: 'orchestrator',
      requestData: { content },
    });

    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});
```

### エラー通知�E�Egent 1への通知�E�E

```typescript
// supabase/functions/shared/notifyAgent1.ts
export async function notifyAgent1(
  contentId: string,
  error: Error,
  context: { platform?: string; functionName: string }
): Promise<void> {
  // Agent 1への通知方法（侁E Supabase Databaseに通知チE�Eブルを作�E、また�EWebhook�E�E
  // ここでは、error_logsチE�Eブルに記録することで、Agent 1が確認できるようにする
  // 忁E��に応じて、追加の通知メカニズム�E�メール、Slack等）を実裁E
}
```

---

## ⚠�E�E注意事頁E

1. **API制陁E*: 各SNSのAPI制限に注意！E日3本であれば問題なし！E
2. **X (Twitter)手動投稿**: 自動化から除外。手動でもやる価値があるくらい重要。投稿用URLリストを生�Eする、E
3. **エラーハンドリング**: 1つのプラチE��フォームで失敗しても、他�EプラチE��フォームへの投稿は継綁E
4. **ログ記録**: 全ての投稿結果をSupabase Databaseに記録
5. **X投稿用URLリスチE*: 他�EプラチE��フォームへの投稿URLをリスト化し、手動投稿用に提侁E
6. **リトライ戦略**: 一時的なエラーは自動リトライ�E�最大3回、指数バックオフ！E
7. **エラー刁E��E*: リトライ不可なエラー�E�認証エラー等）�E即座に失敁E

---

**作�E老E*: Agent 1  
**引き継ぎ允E*: Agent 2  
**作�E日**: 2026-01-20

