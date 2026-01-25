# Cloud Shell縺ｧ繝・・繝ｭ繧､・・ocker Desktop荳崎ｦ・ｼ・

> **逶ｮ逧・*: Cloud Run縺ｫFFmpeg螳溯｡檎腸蠅・ｒ繝・・繝ｭ繧､縺励※縲∝ｮ悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ繧貞ｮ溽樟

---

## 識 縺ｪ縺廚loud Shell縺・

- **Docker Desktop荳崎ｦ・*: 繝ｭ繝ｼ繧ｫ繝ｫ縺ｫDocker Desktop繧偵う繝ｳ繧ｹ繝医・繝ｫ縺吶ｋ蠢・ｦ√′縺ｪ縺・
- **WSL荳崎ｦ・*: Windows Subsystem for Linux縺御ｸ崎ｦ・
- **繝悶Λ繧ｦ繧ｶ縺縺代〒螳檎ｵ・*: 繝ｭ繝ｼ繧ｫ繝ｫ迺ｰ蠅・・蝠城｡後ｒ螳悟・縺ｫ蝗樣∩
- **讓ｩ髯占ｨｭ螳壻ｸ崎ｦ・*: Cloud Shell縺ｯ閾ｪ蜍慕噪縺ｫ讓ｩ髯舌′莉倅ｸ弱＆繧後※縺・ｋ

---

## 搭 謇矩・

### Step 1: Cloud Shell繧帝幕縺・

1. **GCP繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ繧帝幕縺・*
   - https://console.cloud.google.com/?project=gen-lang-client-0090221486

2. **Cloud Shell繧定ｵｷ蜍・*
   - 逕ｻ髱｢荳企Κ縺ｮ縲靴loud Shell縲阪い繧､繧ｳ繝ｳ繧偵け繝ｪ繝・け・・_ 縺ｮ繧｢繧､繧ｳ繝ｳ・・
   - 蛻晏屓縺ｯ謨ｰ蛻・°縺九ｋ蝣ｴ蜷医′縺ゅｋ

---

### Step 2: 繝ｪ繝昴ず繝医Μ繧偵け繝ｭ繝ｼ繝ｳ

**Cloud Shell縺ｧ螳溯｡・*:

```bash
# GitHub繝ｪ繝昴ず繝医Μ繧偵け繝ｭ繝ｼ繝ｳ・医Μ繝昴ず繝医ΜURL繧堤ｽｮ縺肴鋤縺医ｋ・・
git clone YOUR_REPOSITORY_URL
cd primal-logic-web
```

**縺ｾ縺溘・縲√ヵ繧｡繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝・*:

1. **Cloud Shell縺ｮ縲後ヵ繧｡繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝峨阪ｒ繧ｯ繝ｪ繝・け**
2. **蠢・ｦ√↑繝輔ぃ繧､繝ｫ繧帝∈謚・*:
   - `Dockerfile`
   - `scripts/cloud-run-api-server.py`
   - `scripts/auto_video_editor.py`

---

### Step 3: Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
# 繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ險ｭ螳・
gcloud config set project gen-lang-client-0090221486

# Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
```

**謇隕∵凾髢・*: 邏・-10蛻・

---

### Step 4: GCR縺ｫ繝励ャ繧ｷ繝･

**Cloud Shell縺ｧ螳溯｡・*:

```bash
docker push gcr.io/gen-lang-client-0090221486/video-editor
```

**謇隕∵凾髢・*: 邏・-10蛻・

---

### Step 5: Cloud Run縺ｫ繝・・繝ｭ繧､

**Cloud Shell縺ｧ螳溯｡・*:

```bash
gcloud run deploy video-editor \
  --image gcr.io/gen-lang-client-0090221486/video-editor \
  --platform managed \
  --region asia-northeast1 \
  --allow-unauthenticated \
  --memory 2Gi \
  --cpu 2 \
  --timeout 300
```

**謇隕∵凾髢・*: 邏・-10蛻・

---

### Step 6: Cloud Run URL繧貞叙蠕・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
gcloud run services describe video-editor \
  --region asia-northeast1 \
  --format "value(status.url)"
```

**蜃ｺ蜉帑ｾ・*:
```
https://video-editor-xxxxx-xx.a.run.app
```

**縺薙・URL繧偵さ繝斐・**

---

### Step 7: Supabase Secrets縺ｫ險ｭ螳・

**繝ｭ繝ｼ繧ｫ繝ｫ縺ｮPowerShell縺ｧ螳溯｡・*:

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**豕ｨ諢・*: `YOUR_CLOUD_RUN_URL` 繧担tep 6縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

---

### Step 8: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

**繝ｭ繝ｼ繧ｫ繝ｫ縺ｮPowerShell縺ｧ螳溯｡・*:

```powershell
supabase db push
```

---

## 統 繧ｳ繝斐・逕ｨ繧ｳ繝槭Φ繝会ｼ・loud Shell逕ｨ・・

**`scripts/deploy-cloud-shell.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

## 笨・遒ｺ隱阪メ繧ｧ繝・け繝ｪ繧ｹ繝・

- [ ] Cloud Shell縺瑚ｵｷ蜍輔＠縺・
- [ ] 繝ｪ繝昴ず繝医Μ繧偵け繝ｭ繝ｼ繝ｳ縺励◆・医∪縺溘・繝輔ぃ繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝峨＠縺滂ｼ・
- [ ] Docker繧､繝｡繝ｼ繧ｸ縺後ン繝ｫ繝峨〒縺阪◆
- [ ] GCR縺ｫ繝励ャ繧ｷ繝･縺ｧ縺阪◆
- [ ] Cloud Run縺ｫ繝・・繝ｭ繧､縺ｧ縺阪◆
- [ ] Cloud Run URL繧貞叙蠕励＠縺・
- [ ] Supabase Secrets縺ｫ險ｭ螳壹＠縺・
- [ ] 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺梧・蜉溘＠縺・

---

## 笞・・豕ｨ諢丈ｺ矩・

- **Cloud Shell縺ｮ繧ｻ繝・す繝ｧ繝ｳ**: Cloud Shell繧帝哩縺倥ｋ縺ｨ縲√い繝・・繝ｭ繝ｼ繝峨＠縺溘ヵ繧｡繧､繝ｫ縺ｯ蜑企勁縺輔ｌ繧具ｼ・itHub縺九ｉ繧ｯ繝ｭ繝ｼ繝ｳ縺励◆蝣ｴ蜷医・蝠城｡後↑縺暦ｼ・
- **繧ｿ繧､繝繧｢繧ｦ繝・*: Cloud Shell縺ｯ20蛻・〒繧ｿ繧､繝繧｢繧ｦ繝医☆繧句ｴ蜷医′縺ゅｋ・磯聞譎る俣縺ｮ繝薙Ν繝峨・豕ｨ諢擾ｼ・
- **繧ｹ繝医Ξ繝ｼ繧ｸ**: Cloud Shell縺ｮ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｯ5GB縺ｾ縺ｧ

---

**譛邨よ峩譁ｰ**: 2026-01-22

