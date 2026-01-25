# Cloud Shell縺ｧ荳豌励↓繝輔ぃ繧､繝ｫ菴懈・・域怙邨ら沿・・

> **逶ｮ逧・*: Cloud Shell縺ｧ1縺､縺ｮ繧ｳ繝槭Φ繝峨ヶ繝ｭ繝・け縺ｧ蜈ｨ縺ｦ縺ｮ繝輔ぃ繧､繝ｫ繧剃ｽ懈・

---

## 搭 謇矩・

### Step 1: 繝輔ぃ繧､繝ｫ繧剃ｽ懈・

**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ縲～CLOUD_SHELL_COPY_PASTE_ALL.txt`縺ｮ蜀・ｮｹ繧偵◎縺ｮ縺ｾ縺ｾ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠縲・nter繧呈款縺・*

縺薙ｌ縺ｧ莉･荳九′菴懈・縺輔ｌ縺ｾ縺・
- `Dockerfile`
- `scripts/cloud-run-api-server.py`
- `scripts/auto_video_editor.py`

---

### Step 2: 繝・・繝ｭ繧､繧貞ｮ溯｡・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
gcloud config set project gen-lang-client-0090221486
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

## 笞・・驥崎ｦ・

- **Cloud Shell**: 繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ螳溯｡・
- **繝ｭ繝ｼ繧ｫ繝ｫPowerShell**: Supabase Secrets險ｭ螳壹→繝・・繧ｿ繝吶・繧ｹ繝槭う繧ｰ繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ縺ｿ

---

**譛邨よ峩譁ｰ**: 2026-01-22

