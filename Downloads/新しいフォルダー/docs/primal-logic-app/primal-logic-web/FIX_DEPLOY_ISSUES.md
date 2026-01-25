# 繝・・繝ｭ繧､蝠城｡後・隗｣豎ｺ譁ｹ豕・

> **逋ｺ逕溘＠縺溷撫鬘・*: Docker Desktop縺瑚ｵｷ蜍輔＠縺ｦ縺・↑縺・ヾupabase縺ｮ險ｭ螳壹′荳崎ｶｳ

---

## 肌 蝠城｡・: Docker Desktop縺瑚ｵｷ蜍輔＠縺ｦ縺・↑縺・

### 繧ｨ繝ｩ繝ｼ
```
ERROR: error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated privileges to connect
```

### 隗｣豎ｺ譁ｹ豕・

1. **Docker Desktop繧定ｵｷ蜍・*
   - 繧ｹ繧ｿ繝ｼ繝医Γ繝九Η繝ｼ縺九ｉ縲轡ocker Desktop縲阪ｒ襍ｷ蜍・
   - 繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ繧堤｢ｺ隱・
   - 縲轡ocker Desktop is running縲阪→陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・育ｴ・-2蛻・ｼ・

2. **Docker縺瑚ｵｷ蜍輔＠縺溘％縺ｨ繧堤｢ｺ隱・*
   ```powershell
   docker ps
   ```
   **繧ｨ繝ｩ繝ｼ縺悟・縺ｪ縺代ｌ縺ｰOK**

3. **蜀榊ｺｦDocker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・*
   ```powershell
   docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
   ```

---

## 肌 蝠城｡・: npx縺ｮ螳溯｡後・繝ｪ繧ｷ繝ｼ繧ｨ繝ｩ繝ｼ

### 繧ｨ繝ｩ繝ｼ
```
npx : 繝輔ぃ繧､繝ｫ C:\nodejs\npx.ps1 繧定ｪｭ縺ｿ霎ｼ繧√∪縺帙ｓ縲ゅヵ繧｡繧､繝ｫ C:\nodejs\npx.ps1 縺ｯ繝・ず繧ｿ繝ｫ鄂ｲ蜷阪＆繧後※縺・∪縺帙ｓ縲・
```

### 隗｣豎ｺ譁ｹ豕・

**譌｢縺ｫ螳溯｡梧ｸ医∩縺ｧ縺吶′縲∵眠縺励＞繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ蜀榊ｺｦ螳溯｡・*:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**遒ｺ隱阪・繝ｭ繝ｳ繝励ヨ縺瑚｡ｨ遉ｺ縺輔ｌ縺溘ｉ縲刑縲阪ｒ謚ｼ縺・*

---

## 肌 蝠城｡・: Supabase縺ｮ繝ｪ繝ｳ繧ｯ縺瑚ｨｭ螳壹＆繧後※縺・↑縺・

### 繧ｨ繝ｩ繝ｼ
```
Cannot find project ref. Have you run supabase link?
```

### 隗｣豎ｺ譁ｹ豕・

1. **Supabase繝励Ο繧ｸ繧ｧ繧ｯ繝医↓繝ｪ繝ｳ繧ｯ**
   ```powershell
   supabase link --project-ref YOUR_PROJECT_REF
   ```

2. **繝励Ο繧ｸ繧ｧ繧ｯ繝・EF繧堤｢ｺ隱・*
   - Supabase繝繝・す繝･繝懊・繝峨↓繝ｭ繧ｰ繧､繝ｳ
   - 繝励Ο繧ｸ繧ｧ繧ｯ繝郁ｨｭ螳・竊・API險ｭ螳・竊・Project URL縺九ｉ遒ｺ隱・
   - 萓・ `https://xxxxx.supabase.co` 竊・`xxxxx` 縺後・繝ｭ繧ｸ繧ｧ繧ｯ繝・EF

---

## 搭 菫ｮ豁｣蠕後・謇矩・

### Step 1: Docker Desktop繧定ｵｷ蜍・

1. **Docker Desktop繧定ｵｷ蜍・*
2. **襍ｷ蜍募ｮ御ｺ・ｒ蠕・▽**・医ち繧ｹ繧ｯ繝医Ξ繧､縺ｮ繧｢繧､繧ｳ繝ｳ縺ｧ遒ｺ隱搾ｼ・

### Step 2: Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝峨・繝励ャ繧ｷ繝･

```powershell
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
```

### Step 3: Cloud Run縺ｫ繝・・繝ｭ繧､

```powershell
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
```

### Step 4: Cloud Run URL繧貞叙蠕・

```powershell
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

### Step 5: Supabase Secrets縺ｫ險ｭ螳・

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**豕ｨ諢・*: `YOUR_CLOUD_RUN_URL` 繧担tep 4縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

### Step 6: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

```powershell
supabase db push
```

---

## 笨・遒ｺ隱阪メ繧ｧ繝・け繝ｪ繧ｹ繝・

- [ ] Docker Desktop縺瑚ｵｷ蜍輔＠縺ｦ縺・ｋ
- [ ] `docker ps` 縺梧・蜉溘☆繧・
- [ ] Docker繧､繝｡繝ｼ繧ｸ縺後ン繝ｫ繝峨・繝励ャ繧ｷ繝･縺ｧ縺阪◆
- [ ] Cloud Run縺ｫ繝・・繝ｭ繧､縺ｧ縺阪◆
- [ ] Cloud Run URL繧貞叙蠕励＠縺・
- [ ] Supabase繝励Ο繧ｸ繧ｧ繧ｯ繝医↓繝ｪ繝ｳ繧ｯ縺励◆
- [ ] Supabase Secrets縺ｫ險ｭ螳壹＠縺・
- [ ] 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺梧・蜉溘＠縺・

---

**譛邨よ峩譁ｰ**: 2026-01-22

