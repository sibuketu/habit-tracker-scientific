# Cloud Build讓ｩ髯舌お繝ｩ繝ｼ縺ｮ隗｣豎ｺ譁ｹ豕・

> **蝠城｡・*: `PERMISSION_DENIED: The caller does not have permission`

---

## 肌 Step 1: Cloud Build API縺ｮ讓ｩ髯舌ｒ遒ｺ隱・

### 1.1: 迴ｾ蝨ｨ縺ｮ繧｢繧ｫ繧ｦ繝ｳ繝医ｒ遒ｺ隱・

```powershell
gcloud config get-value account
```

**蜃ｺ蜉・*: `sibuketu@gmail.com` 縺瑚｡ｨ遉ｺ縺輔ｌ繧九・縺・

---

## 肌 Step 2: IAM繝ｭ繝ｼ繝ｫ繧堤｢ｺ隱阪・霑ｽ蜉

### 2.1: 蠢・ｦ√↑繝ｭ繝ｼ繝ｫ繧堤｢ｺ隱・

Cloud Build繧剃ｽｿ逕ｨ縺吶ｋ縺ｫ縺ｯ縲∽ｻ･荳九・繝ｭ繝ｼ繝ｫ縺悟ｿ・ｦ・ｼ・
- `Cloud Build Service Account` 縺ｮ讓ｩ髯・
- `Storage Admin` 縺ｾ縺溘・ `Storage Object Admin`・・CR縺ｫ繧｢繝・・繝ｭ繝ｼ繝峨☆繧九◆繧・ｼ・

### 2.2: 讓ｩ髯舌ｒ莉倅ｸ趣ｼ・CP繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ縺九ｉ・・

1. **GCP繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ繧帝幕縺・*
   - https://console.cloud.google.com/iam-admin/iam?project=gen-lang-client-0090221486

2. **IAM縺ｨ繧｢繧ｯ繧ｻ繧ｹ讓ｩ髯・* 竊・**IAM** 繧帝幕縺・

3. **繧｢繧ｫ繧ｦ繝ｳ繝・`sibuketu@gmail.com` 繧呈､懃ｴ｢**

4. **縲檎ｷｨ髮・阪ｒ繧ｯ繝ｪ繝・け** 竊・**縲後Ο繝ｼ繝ｫ繧定ｿｽ蜉縲阪ｒ繧ｯ繝ｪ繝・け**

5. **莉･荳九・繝ｭ繝ｼ繝ｫ繧定ｿｽ蜉**:
   - `Cloud Build Editor`
   - `Storage Admin`
   - `Service Account User`

6. **縲御ｿ晏ｭ倥阪ｒ繧ｯ繝ｪ繝・け**

---

## 肌 Step 3: Cloud Build繧ｵ繝ｼ繝薙せ繧｢繧ｫ繧ｦ繝ｳ繝医↓讓ｩ髯舌ｒ莉倅ｸ・

### 3.1: Cloud Build繧ｵ繝ｼ繝薙せ繧｢繧ｫ繧ｦ繝ｳ繝医ｒ遒ｺ隱・

```powershell
gcloud projects describe gen-lang-client-0090221486 --format="value(projectNumber)"
```

**蜃ｺ蜉・*: 繝励Ο繧ｸ繧ｧ繧ｯ繝育分蜿ｷ縺瑚｡ｨ遉ｺ縺輔ｌ繧具ｼ井ｾ・ `546920120452`・・

### 3.2: 繧ｵ繝ｼ繝薙せ繧｢繧ｫ繧ｦ繝ｳ繝医↓讓ｩ髯舌ｒ莉倅ｸ・

```powershell
gcloud projects add-iam-policy-binding gen-lang-client-0090221486 --member="serviceAccount:546920120452@cloudbuild.gserviceaccount.com" --role="roles/run.admin"
gcloud projects add-iam-policy-binding gen-lang-client-0090221486 --member="serviceAccount:546920120452@cloudbuild.gserviceaccount.com" --role="roles/storage.admin"
```

**豕ｨ諢・*: `546920120452` 繧貞ｮ滄圀縺ｮ繝励Ο繧ｸ繧ｧ繧ｯ繝育分蜿ｷ縺ｫ鄂ｮ縺肴鋤縺医ｋ

---

## 売 Step 4: 蜀榊ｺｦCloud Build繧貞ｮ溯｡・

```powershell
gcloud builds submit --tag gcr.io/gen-lang-client-0090221486/video-editor
```

---

## 噫 莉｣譖ｿ譯・ 謇句虚縺ｧDockerfile繧堤｢ｺ隱・

**Dockerfile縺梧ｭ｣縺励￥驟咲ｽｮ縺輔ｌ縺ｦ縺・ｋ縺狗｢ｺ隱・*:

```powershell
Test-Path Dockerfile
```

**蟄伜惠縺励↑縺・ｴ蜷・*: Dockerfile繧剃ｽ懈・縺吶ｋ蠢・ｦ√′縺ゅｋ

---

## 統 繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ

### 讓ｩ髯千｢ｺ隱・

**`scripts/check-cloud-build-permissions.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

**譛邨よ峩譁ｰ**: 2026-01-22

