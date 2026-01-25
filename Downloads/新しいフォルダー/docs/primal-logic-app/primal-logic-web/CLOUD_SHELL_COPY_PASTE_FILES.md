# Cloud Shell縺ｧ繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ蜀・ｮｹ

> **逶ｮ逧・*: Cloud Shell縺ｧ繝輔ぃ繧､繝ｫ繧剃ｽ懈・縺吶ｋ髫帙↓縲∝・螳ｹ繧偵さ繝斐・縺ｧ縺阪ｋ繧医≧縺ｫ縺吶ｋ

---

## 搭 Dockerfile

**Cloud Shell縺ｧ `nano Dockerfile` 繧貞ｮ溯｡後＠縺ｦ縲∽ｻ･荳九ｒ雋ｼ繧贋ｻ倥￠**:

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

---

## 搭 scripts/cloud-run-api-server.py

**Cloud Shell縺ｧ `nano scripts/cloud-run-api-server.py` 繧貞ｮ溯｡後＠縺ｦ縲∽ｻ･荳九ｒ雋ｼ繧贋ｻ倥￠**:

・医ヵ繧｡繧､繝ｫ縺碁聞縺・・縺ｧ縲∝挨繝輔ぃ繧､繝ｫ縺ｫ險倩ｼ会ｼ・

---

## 搭 scripts/auto_video_editor.py

**Cloud Shell縺ｧ `nano scripts/auto_video_editor.py` 繧貞ｮ溯｡後＠縺ｦ縲∽ｻ･荳九ｒ雋ｼ繧贋ｻ倥￠**:

・医ヵ繧｡繧､繝ｫ縺碁聞縺・・縺ｧ縲∝挨繝輔ぃ繧､繝ｫ縺ｫ險倩ｼ会ｼ・

---

**譛邨よ峩譁ｰ**: 2026-01-22

