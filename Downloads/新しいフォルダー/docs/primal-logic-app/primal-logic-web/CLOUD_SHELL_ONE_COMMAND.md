# Cloud Shell縺ｧ荳豌励↓繝輔ぃ繧､繝ｫ菴懈・

> **逶ｮ逧・*: Cloud Shell縺ｧ1縺､縺ｮ繧ｳ繝槭Φ繝峨〒蜈ｨ縺ｦ縺ｮ繝輔ぃ繧､繝ｫ繧剃ｽ懈・

---

## 搭 荳豌励↓螳溯｡後☆繧九さ繝槭Φ繝・

**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ縲∽ｻ･荳九ｒ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠**:

```bash
bash <(curl -s https://raw.githubusercontent.com/YOUR_USERNAME/YOUR_REPO/main/scripts/cloud-shell-setup-all.sh)
```

**縺ｾ縺溘・縲∽ｻ･荳九・蜀・ｮｹ繧辰loud Shell縺ｫ逶ｴ謗･雋ｼ繧贋ｻ倥￠**:

・・scripts/cloud-shell-setup-all.sh`縺ｮ蜀・ｮｹ繧偵◎縺ｮ縺ｾ縺ｾ雋ｼ繧贋ｻ倥￠・・

---

## 搭 謇矩・

### Step 1: 繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
# 繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ蜀・ｮｹ繧辰loud Shell縺ｫ雋ｼ繧贋ｻ倥￠縺ｦ螳溯｡・
bash scripts/cloud-shell-setup-all.sh
```

**縺ｾ縺溘・縲√せ繧ｯ繝ｪ繝励ヨ縺ｮ蜀・ｮｹ繧堤峩謗･Cloud Shell縺ｫ雋ｼ繧贋ｻ倥￠縺ｦ螳溯｡・*

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

**譛邨よ峩譁ｰ**: 2026-01-22

