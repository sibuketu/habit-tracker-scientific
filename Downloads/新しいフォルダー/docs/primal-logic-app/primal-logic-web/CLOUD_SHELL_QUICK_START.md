# Cloud Shell繧ｯ繧､繝・け繧ｹ繧ｿ繝ｼ繝・

> **驥崎ｦ・*: 莉･荳九・繧ｳ繝槭Φ繝峨・**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell**縺ｧ螳溯｡後＠縺ｦ縺上□縺輔＞

---

## 搭 Step 1: Cloud Shell縺ｧ繝・ぅ繝ｬ繧ｯ繝医Μ繧剃ｽ懈・

**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ螳溯｡・*:

```bash
mkdir -p scripts
```

**豕ｨ諢・*: 繝ｭ繝ｼ繧ｫ繝ｫ縺ｮPowerShell縺ｧ縺ｯ縺ｪ縺上・*繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell**縺ｧ螳溯｡・

---

## 搭 Step 2: 繝輔ぃ繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝・

**Cloud Shell縺ｮ縲後ヵ繧｡繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝峨肴ｩ溯・繧剃ｽｿ逕ｨ**:

1. **Cloud Shell縺ｮ蜿ｳ荳翫・縲・縺､縺ｮ轤ｹ縲阪Γ繝九Η繝ｼ繧偵け繝ｪ繝・け**
2. **縲後ヵ繧｡繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝峨阪ｒ驕ｸ謚・*
3. **莉･荳九・繝輔ぃ繧､繝ｫ繧偵い繝・・繝ｭ繝ｼ繝・*:
   - `Dockerfile`・医・繝ｭ繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医↓・・
   - `scripts/cloud-run-api-server.py`
   - `scripts/auto_video_editor.py`

**縺ｾ縺溘・縲√ヵ繧｡繧､繝ｫ縺ｮ蜀・ｮｹ繧堤峩謗･繧ｳ繝斐・**:

1. **Cloud Shell縺ｧ繝輔ぃ繧､繝ｫ繧剃ｽ懈・**:
   ```bash
   nano Dockerfile
   ```
2. **繝輔ぃ繧､繝ｫ縺ｮ蜀・ｮｹ繧定ｲｼ繧贋ｻ倥￠**・・trl+Shift+V・・
3. **菫晏ｭ・*: Ctrl+O 竊・Enter 竊・Ctrl+X

---

## 搭 Step 3: 繝・・繝ｭ繧､繧貞ｮ溯｡・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
gcloud config set project gen-lang-client-0090221486
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

## 笞・・驥崎ｦ・ 螳溯｡悟ｴ謇縺ｮ遒ｺ隱・

- **Cloud Shell**: 繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ螳溯｡・
- **繝ｭ繝ｼ繧ｫ繝ｫPowerShell**: Supabase Secrets險ｭ螳壹→繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ縺ｿ

---

**譛邨よ峩譁ｰ**: 2026-01-22

