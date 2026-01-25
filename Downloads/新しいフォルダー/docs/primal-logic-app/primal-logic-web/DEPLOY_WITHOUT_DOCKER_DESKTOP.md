# Docker Desktop荳崎ｦ・ Cloud Build縺ｧ繝・・繝ｭ繧､

> **逶ｮ逧・*: Docker Desktop縺ｨWSL繧剃ｽｿ繧上★縺ｫ縲，loud Build縺ｧDocker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝峨・繝・・繝ｭ繧､

---

## 識 縺ｪ縺懊％縺ｮ譁ｹ豕輔°

- **Docker Desktop荳崎ｦ・*: 繝ｭ繝ｼ繧ｫ繝ｫ縺ｫDocker Desktop繧偵う繝ｳ繧ｹ繝医・繝ｫ縺吶ｋ蠢・ｦ√′縺ｪ縺・
- **WSL荳崎ｦ・*: Windows Subsystem for Linux縺御ｸ崎ｦ・
- **繧ｷ繝ｳ繝励Ν**: gcloud繧ｳ繝槭Φ繝峨□縺代〒螳檎ｵ・

---

## 搭 謇矩・

### Step 1: Cloud Build API繧呈怏蜉ｹ蛹・

```powershell
gcloud services enable cloudbuild.googleapis.com
```

---

### Step 2: Cloud Build縺ｧDocker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・

**繝励Ο繧ｸ繧ｧ繧ｯ繝医ョ繧｣繝ｬ繧ｯ繝医Μ縺ｫ遘ｻ蜍・*:

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
```

**Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝・*:

```powershell
gcloud builds submit --tag gcr.io/gen-lang-client-0090221486/video-editor
```

**謇隕∵凾髢・*: 邏・-10蛻・ｼ亥・蝗槭・髟ｷ繧・ｼ・

---

### Step 3: Cloud Run縺ｫ繝・・繝ｭ繧､

```powershell
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
```

---

### Step 4: Cloud Run URL繧貞叙蠕・

```powershell
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

### Step 5: Supabase Secrets縺ｫ險ｭ螳・

```powershell
npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
```

**豕ｨ諢・*: `YOUR_CLOUD_RUN_URL` 繧担tep 4縺ｧ蜿門ｾ励＠縺欟RL縺ｫ鄂ｮ縺肴鋤縺医ｋ

---

### Step 6: 繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ螳溯｡・

```powershell
supabase db push
```

---

## 笨・繝｡繝ｪ繝・ヨ

- **Docker Desktop荳崎ｦ・*: 繝ｭ繝ｼ繧ｫ繝ｫ縺ｫDocker Desktop繧偵う繝ｳ繧ｹ繝医・繝ｫ縺吶ｋ蠢・ｦ√′縺ｪ縺・
- **WSL荳崎ｦ・*: Windows Subsystem for Linux縺御ｸ崎ｦ・
- **繧ｷ繝ｳ繝励Ν**: gcloud繧ｳ繝槭Φ繝峨□縺代〒螳檎ｵ・
- **鬮倬・*: Cloud Build縺ｯ鬮倬溘〒繝薙Ν繝峨〒縺阪ｋ

---

## 笞・・豕ｨ諢丈ｺ矩・

- **Cloud Build API縺ｮ譛牙柑蛹悶′蠢・ｦ・*・亥・蝗槭・縺ｿ・・
- **繝薙Ν繝画凾髢・*: 蛻晏屓縺ｯ邏・-10蛻・°縺九ｋ蝣ｴ蜷医′縺ゅｋ
- **繧ｳ繧ｹ繝・*: Cloud Build縺ｮ菴ｿ逕ｨ驥上↓蠢懊§縺ｦ隱ｲ驥代＆繧後ｋ・育┌譁呎棧縺ゅｊ・・

---

**譛邨よ峩譁ｰ**: 2026-01-22

