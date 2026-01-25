# 繧､繝ｳ繧ｹ繝医・繝ｫ螳御ｺ・ｾ後・谺｡縺ｮ繧ｹ繝・ャ繝・

> **菴懈・譌･**: 2026-01-22  
> **迥ｶ豕・*: Docker Desktop縺ｨGoogle Cloud SDK縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ縺悟ｮ御ｺ・

---

## 笨・繧､繝ｳ繧ｹ繝医・繝ｫ遒ｺ隱・

**蜀崎ｵｷ蜍募ｾ後∽ｻ･荳九〒遒ｺ隱・*:

```bash
# Docker Desktop縺ｮ遒ｺ隱・
docker --version

# Google Cloud SDK縺ｮ遒ｺ隱・
gcloud --version
```

---

## 噫 谺｡縺ｮ繧ｹ繝・ャ繝暦ｼ・ntigravity縺ｧ螳溯｡鯉ｼ・

### Step 1: Antigravity縺ｧ繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ髢九￥

1. **Antigravity繧定ｵｷ蜍・*
2. **縲薫pen Folder縲阪ｒ繧ｯ繝ｪ繝・け**
3. **莉･荳九・繝代せ繧帝∈謚・*:
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```

### Step 2: GCP隱崎ｨｼ

**Antigravity縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ螳溯｡・*:

```bash
# GCP縺ｫ繝ｭ繧ｰ繧､繝ｳ・医ヶ繝ｩ繧ｦ繧ｶ縺碁幕縺阪∪縺呻ｼ・
gcloud auth login

# 繝励Ο繧ｸ繧ｧ繧ｯ繝・D繧堤｢ｺ隱搾ｼ域里縺ｫ險ｭ螳壹＆繧後※縺・ｋ蝣ｴ蜷茨ｼ・
gcloud config get-value project

# 繝励Ο繧ｸ繧ｧ繧ｯ繝・D繧定ｨｭ螳夲ｼ・OUR_PROJECT_ID繧堤ｽｮ縺肴鋤縺医ｋ・・
gcloud config set project YOUR_PROJECT_ID
```

### Step 3: 迺ｰ蠅・､画焚繧定ｨｭ螳・

**PowerShell**:
```powershell
$env:GCP_PROJECT_ID="your-project-id"
$env:CLOUD_RUN_REGION="asia-northeast1"
```

### Step 4: Cloud Run縺ｫ繝・・繝ｭ繧､

**譁ｹ豕・: .bat繝輔ぃ繧､繝ｫ繧貞ｮ溯｡鯉ｼ域耳螂ｨ・・*
```powershell
.\scripts\deploy-cloud-run.bat
```

**譁ｹ豕・: 繧ｳ繝槭Φ繝峨ｒ逶ｴ謗･螳溯｡・*
```bash
# Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・
docker build -t gcr.io/$env:GCP_PROJECT_ID/video-editor .

# GCR縺ｫ繝励ャ繧ｷ繝･
docker push gcr.io/$env:GCP_PROJECT_ID/video-editor

# Cloud Run縺ｫ繝・・繝ｭ繧､
gcloud run deploy video-editor --image gcr.io/$env:GCP_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
```

### Step 5: Cloud Run URL繧貞叙蠕・

```bash
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

### Step 6: Supabase Secrets縺ｫ險ｭ螳・

```bash
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
```

**豕ｨ諢・*: `https://video-editor-xxxxx.run.app` 繧担tep 5縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

### Step 7: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

```bash
supabase db push
```

---

## 搭 繧ｳ繝斐・逕ｨ繧ｳ繝槭Φ繝会ｼ亥・謇矩・ｼ・

**Antigravity縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ鬆・分縺ｫ螳溯｡・*:

```bash
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
$env:GCP_PROJECT_ID="YOUR_PROJECT_ID"
$env:CLOUD_RUN_REGION="asia-northeast1"
docker build -t gcr.io/$env:GCP_PROJECT_ID/video-editor .
docker push gcr.io/$env:GCP_PROJECT_ID/video-editor
gcloud run deploy video-editor --image gcr.io/$env:GCP_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=https://video-editor-xxxxx.run.app
supabase db push
```

**繝輔ぃ繧､繝ｫ縺九ｉ繧ｳ繝斐・**: `scripts/deploy-cloud-run-copy-paste.txt` 繧帝幕縺・※蜈ｨ繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・

---

## 笞・・繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### Docker Desktop縺瑚ｵｷ蜍輔＠縺ｪ縺・

1. **Docker Desktop繧定ｵｷ蜍・*・医せ繧ｿ繝ｼ繝医Γ繝九Η繝ｼ縺九ｉ・・
2. **繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｧDocker繧｢繧､繧ｳ繝ｳ繧堤｢ｺ隱・*
3. **縲轡ocker Desktop is running縲阪→陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽**

### gcloud繧ｳ繝槭Φ繝峨′隕九▽縺九ｉ縺ｪ縺・

1. **PC繧貞・襍ｷ蜍・*・医う繝ｳ繧ｹ繝医・繝ｫ蠕後∝・蝗槭・縺ｿ・・
2. **譁ｰ縺励＞繧ｿ繝ｼ繝溘リ繝ｫ繧帝幕縺・*
3. **`gcloud --version` 縺ｧ遒ｺ隱・*

### 繝励Ο繧ｸ繧ｧ繧ｯ繝・D縺悟・縺九ｉ縺ｪ縺・

```bash
# 蛻ｩ逕ｨ蜿ｯ閭ｽ縺ｪ繝励Ο繧ｸ繧ｧ繧ｯ繝井ｸ隕ｧ繧定｡ｨ遉ｺ
gcloud projects list
```

---

**譛邨よ峩譁ｰ**: 2026-01-22

