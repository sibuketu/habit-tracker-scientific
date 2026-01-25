# Cloud Shell縺ｧ繝輔ぃ繧､繝ｫ繧剃ｽ懈・縺吶ｋ譁ｹ豕・

> **驥崎ｦ・*: 莉･荳九・繧ｳ繝槭Φ繝峨・**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell**縺ｧ螳溯｡後＠縺ｦ縺上□縺輔＞

---

## 搭 Step 1: Cloud Shell縺ｧ繝・ぅ繝ｬ繧ｯ繝医Μ繧剃ｽ懈・

**繝悶Λ繧ｦ繧ｶ縺ｮCloud Shell縺ｧ螳溯｡・*:

```bash
mkdir -p scripts
```

---

## 搭 Step 2: 繝輔ぃ繧､繝ｫ繧剃ｽ懈・・域婿豕柊: nano繧ｨ繝・ぅ繧ｿ・・

### 2.1: Dockerfile繧剃ｽ懈・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
nano Dockerfile
```

**莉･荳九・蜀・ｮｹ繧定ｲｼ繧贋ｻ倥￠**・・trl+Shift+V・・

```
# FFmpeg螳溯｡檎腸蠅・ｼ・loud Run逕ｨ・・
FROM python:3.11-slim

# FFmpeg繧偵う繝ｳ繧ｹ繝医・繝ｫ
RUN apt-get update && apt-get install -y \
    ffmpeg \
    && rm -rf /var/lib/apt/lists/*

# Flask繧偵う繝ｳ繧ｹ繝医・繝ｫ
RUN pip install flask flask-cors

# 菴懈･ｭ繝・ぅ繝ｬ繧ｯ繝医Μ繧定ｨｭ螳・
WORKDIR /app

# Python繧ｹ繧ｯ繝ｪ繝励ヨ繧偵さ繝斐・
COPY scripts/cloud-run-api-server.py /app/app.py

# 繝昴・繝医ｒ蜈ｬ髢・
EXPOSE 8080

# 繧ｨ繝ｳ繝医Μ繝ｼ繝昴う繝ｳ繝・
CMD ["python3", "/app/app.py"]
```

**菫晏ｭ・*: Ctrl+O 竊・Enter 竊・Ctrl+X

---

### 2.2: cloud-run-api-server.py繧剃ｽ懈・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
nano scripts/cloud-run-api-server.py
```

**繝輔ぃ繧､繝ｫ縺ｮ蜀・ｮｹ繧定ｲｼ繧贋ｻ倥￠**・・trl+Shift+V・・

・・scripts/cloud-run-api-server.py`縺ｮ蜀・ｮｹ繧偵◎縺ｮ縺ｾ縺ｾ雋ｼ繧贋ｻ倥￠・・

**菫晏ｭ・*: Ctrl+O 竊・Enter 竊・Ctrl+X

---

### 2.3: auto_video_editor.py繧剃ｽ懈・

**Cloud Shell縺ｧ螳溯｡・*:

```bash
nano scripts/auto_video_editor.py
```

**繝輔ぃ繧､繝ｫ縺ｮ蜀・ｮｹ繧定ｲｼ繧贋ｻ倥￠**・・trl+Shift+V・・

・・scripts/auto_video_editor.py`縺ｮ蜀・ｮｹ繧偵◎縺ｮ縺ｾ縺ｾ雋ｼ繧贋ｻ倥￠・・

**菫晏ｭ・*: Ctrl+O 竊・Enter 竊・Ctrl+X

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

