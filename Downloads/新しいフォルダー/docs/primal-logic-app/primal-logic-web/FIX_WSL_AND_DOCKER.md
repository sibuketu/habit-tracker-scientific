# WSL譖ｴ譁ｰ縺ｨDocker Desktop襍ｷ蜍輔・隗｣豎ｺ譁ｹ豕・

> **蝠城｡・*: Docker Desktop縺瑚ｵｷ蜍輔〒縺阪↑縺・ｼ・SL縺ｮ譖ｴ譁ｰ縺悟ｿ・ｦ・ｼ・

---

## 肌 Step 1: WSL繧呈峩譁ｰ

### 繧ｳ繝槭Φ繝峨ｒ螳溯｡・

**PowerShell繧堤ｮ｡逅・・→縺励※螳溯｡・*:

1. **繧ｹ繧ｿ繝ｼ繝医Γ繝九Η繝ｼ** 竊・**縲訓owerShell縲阪ｒ蜿ｳ繧ｯ繝ｪ繝・け** 竊・**縲檎ｮ｡逅・・→縺励※螳溯｡後・*

2. **莉･荳九・繧ｳ繝槭Φ繝峨ｒ螳溯｡・*:
   ```powershell
   wsl --update
   ```

3. **譖ｴ譁ｰ螳御ｺ・ｒ蠕・▽**・育ｴ・-2蛻・ｼ・

---

## 売 Step 2: WSL繧貞・襍ｷ蜍・

**PowerShell・育ｮ｡逅・・ｼ峨〒螳溯｡・*:

```powershell
wsl --shutdown
```

---

## 正 Step 3: Docker Desktop繧貞・襍ｷ蜍・

1. **Docker Desktop繧貞ｮ悟・縺ｫ邨ゆｺ・*
   - 繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ繧貞承繧ｯ繝ｪ繝・け 竊・縲群uit Docker Desktop縲・

2. **Docker Desktop繧貞・襍ｷ蜍・*
   - 繧ｹ繧ｿ繝ｼ繝医Γ繝九Η繝ｼ縺九ｉ縲轡ocker Desktop縲阪ｒ襍ｷ蜍・

3. **襍ｷ蜍募ｮ御ｺ・ｒ蠕・▽**・育ｴ・-2蛻・ｼ・
   - 繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ縺ｧ遒ｺ隱・
   - 縲轡ocker Desktop is running縲阪→陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽

---

## 笨・Step 4: Docker縺瑚ｵｷ蜍輔＠縺溘％縺ｨ繧堤｢ｺ隱・

**騾壼ｸｸ縺ｮPowerShell縺ｧ螳溯｡・*:

```powershell
docker ps
```

**繧ｨ繝ｩ繝ｼ縺悟・縺ｪ縺代ｌ縺ｰOK**

---

## 搭 Step 5: Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝峨・繝励ャ繧ｷ繝･繝ｻ繝・・繝ｭ繧､

**`scripts/fix-and-retry-deploy.txt`** 繧帝幕縺・※縲・-5陦檎岼繧貞ｮ溯｡・

```powershell
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

## 肌 Step 6: Supabase縺ｮ險ｭ螳・

### 6.1: Supabase繝励Ο繧ｸ繧ｧ繧ｯ繝医↓繝ｪ繝ｳ繧ｯ

```powershell
supabase link --project-ref YOUR_PROJECT_REF
```

**繝励Ο繧ｸ繧ｧ繧ｯ繝・EF縺ｮ遒ｺ隱肴婿豕・*:
- Supabase繝繝・す繝･繝懊・繝峨↓繝ｭ繧ｰ繧､繝ｳ
- 繝励Ο繧ｸ繧ｧ繧ｯ繝郁ｨｭ螳・竊・API險ｭ螳・竊・Project URL縺九ｉ遒ｺ隱・
- 萓・ `https://xxxxx.supabase.co` 竊・`xxxxx` 縺後・繝ｭ繧ｸ繧ｧ繧ｯ繝・EF

### 6.2: Supabase Secrets縺ｫ險ｭ螳・

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**豕ｨ諢・*: `YOUR_CLOUD_RUN_URL` 繧担tep 5縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

### 6.3: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

```powershell
supabase db push
```

---

## 統 繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ

### WSL譖ｴ譁ｰ逕ｨ

**`scripts/update-wsl.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

## 笞・・豕ｨ諢丈ｺ矩・

- **WSL譖ｴ譁ｰ縺ｯ邂｡逅・・ｨｩ髯舌′蠢・ｦ・*
- **Docker Desktop縺ｮ蜀崎ｵｷ蜍輔↓縺ｯ譎る俣縺後°縺九ｋ蝣ｴ蜷医′縺ゅｋ**
- **WSL譖ｴ譁ｰ蠕後￣C縺ｮ蜀崎ｵｷ蜍輔′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｋ**

---

**譛邨よ峩譁ｰ**: 2026-01-22

