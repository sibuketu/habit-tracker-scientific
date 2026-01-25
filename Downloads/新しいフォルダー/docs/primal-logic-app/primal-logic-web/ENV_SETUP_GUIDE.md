# 迺ｰ蠅・､画焚險ｭ螳壹ぎ繧､繝・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ縺ｫ蠢・ｦ√↑迺ｰ蠅・､画焚繧定ｨｭ螳・

---

## 搭 蠢・ｦ√↑迺ｰ蠅・､画焚

### 1. GCP迺ｰ蠅・､画焚・・loud Run繝・・繝ｭ繧､逕ｨ・・

**Windows**:
```batch
set GCP_PROJECT_ID=your-project-id
set CLOUD_RUN_REGION=asia-northeast1
```

**Linux/Mac**:
```bash
export GCP_PROJECT_ID=your-project-id
export CLOUD_RUN_REGION=asia-northeast1
```

### 2. Supabase迺ｰ蠅・､画焚・・env繝輔ぃ繧､繝ｫ・・

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Supabase Secrets・・upabase Functions逕ｨ・・

```bash
# Cloud Run URL繧定ｨｭ螳夲ｼ医ョ繝励Ο繧､蠕後↓蜿門ｾ暦ｼ・
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
```

### 4. TTS API Keys・・env繝輔ぃ繧､繝ｫ・・

```env
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key
VITE_GOOGLE_TTS_API_KEY=your-google-tts-api-key
```

---

## 噫 險ｭ螳壽焔鬆・

### Step 1: GCP繝励Ο繧ｸ繧ｧ繧ｯ繝・D繧堤｢ｺ隱・

```bash
gcloud config get-value project
```

### Step 2: 迺ｰ蠅・､画焚繧定ｨｭ螳・

**Windows**: `scripts\setup-env.bat` 繧貞盾辣ｧ

**Linux/Mac**: 迺ｰ蠅・､画焚繧偵お繧ｯ繧ｹ繝昴・繝・

### Step 3: .env繝輔ぃ繧､繝ｫ繧呈峩譁ｰ

繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医・ `.env` 繝輔ぃ繧､繝ｫ縺ｫ荳願ｨ倥・迺ｰ蠅・､画焚繧定ｿｽ蜉

### Step 4: Supabase Secrets繧定ｨｭ螳・

```bash
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
```

---

**譛邨よ峩譁ｰ**: 2026-01-22

