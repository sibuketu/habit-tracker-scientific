# 完�E自動化ワークフロー実裁E��イチE

> **作�E日**: 2026-01-22  
> **目皁E*: 4スチE��プ完�E自動化を実現するための具体的な実裁E��イチE

---

## 🎯 目樁E

**4スチE��プで完�E自動化**:
1. スクリプト生�E ↁE✁E完亁E
2. TTS生�E ↁE✁E完亁E
3. 自動動画編雁EↁE⚠�E�E**FFmpeg実行環墁E��忁E��E*
4. 全SNS投稿 ↁE✁Eorchestrator (Agent 2)

---

## 📋 めE��ことリスチE

### ✁E完亁E��み

- [x] スクリプト生�E (`generateVideoScript`)
- [x] TTS生�E (`generateSpeech` - Google TTS無斁E
- [x] 自動動画編雁Eythonスクリプト (`scripts/auto_video_editor.py`)
- [x] TypeScript統吁E(`fullAutoVideoWorkflow.ts`)
- [x] Supabase Functions骨格 (`create-video-with-auto-edit/index.ts`)

### ⚠�E�E実裁E��忁E��E

#### 優先度: 高（完�E自動化に忁E��！E

1. **FFmpeg実行環墁E�E構篁E*
   - **推奨**: Cloud RunでFFmpegを実衁E
   - **代替**: Lambda Layer、外部サービス�E�Eux、Cloudinary等！E
   - **詳細**: `second-brain/FULL_AUTO_WORKFLOW_IMPLEMENTATION.md` 参�E

2. **Supabase Functions完�E**
   - `create-video-with-auto-edit` を完�EさせめE
   - FFmpeg実行環墁E��連携
   - 動画生�E完亁E��、Supabase StorageにアチE�EローチE

3. **画像アセチE��の準備**
   - 実際の斁E��画像を `assets/images/` に配置
   - 政府文書、解剖図、研究グラフ筁E

#### 優先度: 中�E�Egent 2拁E��！E

4. **orchestrator完�E** (Agent 2)
   - 全SNS投稿の統吁E
   - エラーハンドリング
   - リトライロジチE��

---

## 🚀 実裁E��頁E��優先頁E��頁E��E

### Step 1: FFmpeg実行環墁E�E構築（最優先！E

**推奨: Cloud Run**

#### 1.1. Dockerfileを作�E

```dockerfile
# Dockerfile
FROM python:3.11-slim

# FFmpegをインスト�Eル
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# 作業チE��レクトリを設宁E
WORKDIR /app

# Pythonスクリプトをコピ�E
COPY scripts/auto_video_editor.py /app/

# エントリーポインチE
ENTRYPOINT ["python3", "/app/auto_video_editor.py"]
```

#### 1.2. Cloud RunにチE�Eロイ

```bash
# DockerイメージをビルチE
docker build -t gcr.io/YOUR_PROJECT_ID/video-editor .

# Cloud RunにチE�Eロイ
gcloud run deploy video-editor \
  --image gcr.io/YOUR_PROJECT_ID/video-editor \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated
```

#### 1.3. Supabase Functionsから呼び出ぁE

`supabase/functions/create-video-with-auto-edit/index.ts` を更新して、Cloud Runを呼び出ぁE

---

### Step 2: Supabase Functions完�E

#### 2.1. `create-video-with-auto-edit` を完�E

**実裁E�E容**:
- Cloud Runを呼び出してFFmpegを実衁E
- 動画生�E完亁E��、Supabase StorageにアチE�EローチE
- 動画URLを返す

#### 2.2. チE��ト実衁E

```bash
# ローカルチE��チE
supabase functions serve create-video-with-auto-edit

# 本番チE�Eロイ
supabase functions deploy create-video-with-auto-edit
```

---

### Step 3: 画像アセチE��の準備

#### 3.1. 画像を配置

```
assets/images/
├── government_guidelines_doc.jpg  # 政府文書
├── anatomy_diagram.jpg            # 解剖図
├── research_graph.jpg              # 研究グラチE
└── ...
```

#### 3.2. Supabase StorageにアチE�EローチE

```bash
# Supabase Storageに画像をアチE�EローチE
supabase storage upload images/government_guidelines_doc.jpg assets/images/government_guidelines_doc.jpg
```

---

### Step 4: 統合テスチE

#### 4.1. 完�E自動化ワークフローをテスチE

```typescript
import { fullAutoVideoWorkflow } from './services/fullAutoVideoWorkflow';

const result = await fullAutoVideoWorkflow({
  topic: '野菜は毒！レクチンが�Eを破壊する真宁E,
  images: [
    {
      path: 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/images/government_guidelines_doc.jpg',
      start: 0,
      duration: 5,
    },
    {
      path: 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/images/anatomy_diagram.jpg',
      start: 5,
      duration: 8,
    },
  ],
  subtitles: [
    {
      text: 'The U.S. government just admitted it.',
      start: 0,
      duration: 3,
    },
  ],
  ttsProvider: 'google',
  width: 1080,
  height: 1920,
});
```

#### 4.2. エラーハンドリング確誁E

- 吁E��チE��プでエラーが発生した場合�E処琁E
- リトライロジチE��
- ログ記録

---

## 📊 実裁E��況チェチE��リスチE

### フロントエンド！Egent 1�E�E

- [x] スクリプト生�E
- [x] TTS生�E
- [x] 統合ワークフロー (`fullAutoVideoWorkflow.ts`)
- [ ] 画像アセチE��の準備
- [ ] 統合テスチE

### バックエンド！Egent 2�E�E

- [ ] FFmpeg実行環墁E��Eloud Run�E�E
- [ ] Supabase Functions完�E
- [ ] orchestrator完�E
- [ ] 全SNS投稿統吁E

---

## 🎯 次のアクション

### 今すぐやること

1. **FFmpeg実行環墁E�E構篁E*�E�最優先！E
   - Cloud RunでFFmpegを実行する環墁E��構篁E
   - Dockerfileを作�E
   - Cloud RunにチE�Eロイ

2. **Supabase Functions完�E**
   - `create-video-with-auto-edit` を完�E
   - Cloud Runと連携

3. **画像アセチE��の準備**
   - 実際の斁E��画像を準備
   - Supabase StorageにアチE�EローチE

### Agent 2に任せること

- orchestrator完�E
- 全SNS投稿統吁E
- エラーハンドリング・リトライロジチE��

---

## 💡 推奨実裁E��E��E

1. **FFmpeg実行環墁E*�E�Eloud Run�E�EↁE**最優允E*
2. **Supabase Functions完�E**
3. **画像アセチE��準備**
4. **統合テスチE*
5. **orchestrator完�E**�E�Egent 2�E�E

---

## 📝 参老E��E��

- **完�E自動化ワークフロー**: `second-brain/FULL_AUTO_WORKFLOW_IMPLEMENTATION.md`
- **TTS + 自動編雁E*: `second-brain/TTS_AUTO_EDIT_WORKFLOW.md`
- **Agent 2引き継ぎ**: `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md`
- **自動動画編雁E��クリプト**: `scripts/auto_video_editor.py`

---

**最終更新**: 2026-01-22

