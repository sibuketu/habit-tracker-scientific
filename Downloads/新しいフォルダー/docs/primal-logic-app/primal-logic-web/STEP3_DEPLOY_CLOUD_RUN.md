# Step 3: Cloud Run縺ｫ繝・・繝ｭ繧､

> **繝励Ο繧ｸ繧ｧ繧ｯ繝・D**: `gen-lang-client-0090221486` (Carnivore)

---

## 搭 繝・・繝ｭ繧､謇矩・

### 繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ

**`scripts/deploy-cloud-run-final.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

## 笞・・豕ｨ諢丈ｺ矩・

1. **Docker Desktop縺瑚ｵｷ蜍輔＠縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・*
   - 繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ繧堤｢ｺ隱・
   - 縲轡ocker Desktop is running縲阪→陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽

2. **繝励Ο繧ｸ繧ｧ繧ｯ繝医ョ繧｣繝ｬ繧ｯ繝医Μ縺ｫ遘ｻ蜍・*
   ```powershell
   cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
   ```

3. **繧ｳ繝槭Φ繝峨ｒ鬆・分縺ｫ螳溯｡・*
   - 蜷・さ繝槭Φ繝峨′螳御ｺ・☆繧九∪縺ｧ蠕・▽
   - 繧ｨ繝ｩ繝ｼ縺悟・縺溷ｴ蜷医・縲√お繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ繧堤｢ｺ隱・

---

## 統 謇矩・

### Step 1: 繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ險ｭ螳・

```powershell
gcloud config set project gen-lang-client-0090221486
$env:GCP_PROJECT_ID="gen-lang-client-0090221486"
$env:CLOUD_RUN_REGION="asia-northeast1"
```

### Step 2: Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・

```powershell
docker build -t gcr.io/$env:GCP_PROJECT_ID/video-editor .
```

**謇隕∵凾髢・*: 邏・-10蛻・

### Step 3: GCR縺ｫ繝励ャ繧ｷ繝･

```powershell
docker push gcr.io/$env:GCP_PROJECT_ID/video-editor
```

**謇隕∵凾髢・*: 邏・-10蛻・

### Step 4: Cloud Run縺ｫ繝・・繝ｭ繧､

```powershell
gcloud run deploy video-editor --image gcr.io/$env:GCP_PROJECT_ID/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
```

**謇隕∵凾髢・*: 邏・-10蛻・

### Step 5: Cloud Run URL繧貞叙蠕・

```powershell
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

**蜃ｺ蜉帑ｾ・*:
```
https://video-editor-xxxxx-xx.a.run.app
```

**縺薙・URL繧偵さ繝斐・**

### Step 6: Supabase Secrets縺ｫ險ｭ螳・

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**豕ｨ諢・*: `YOUR_CLOUD_RUN_URL` 繧担tep 5縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

### Step 7: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

```powershell
supabase db push
```

---

## 笨・螳御ｺ・｢ｺ隱・

**蜈ｨ縺ｦ縺ｮ繧ｳ繝槭Φ繝峨′謌仙粥縺吶ｌ縺ｰ螳御ｺ・〒縺・*

---

**譛邨よ峩譁ｰ**: 2026-01-22

