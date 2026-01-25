# 繝励Ο繧ｸ繧ｧ繧ｯ繝・D縺ｨCloud Run URL縺ｮ蜿門ｾ玲婿豕・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: YOUR_PROJECT_ID縺ｨCloud Run URL繧貞叙蠕励☆繧区焔鬆・

---

## 搭 繝励Ο繧ｸ繧ｧ繧ｯ繝・D縺ｮ蜿門ｾ玲婿豕・

### 譁ｹ豕・: 繧ｳ繝槭Φ繝峨〒蜿門ｾ暦ｼ域耳螂ｨ・・

**Antigravity縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ螳溯｡・*:

```bash
gcloud projects list
```

**蜃ｺ蜉帑ｾ・*:
```
PROJECT_ID              NAME                  PROJECT_NUMBER
my-project-12345        My Project           123456789012
```

**PROJECT_ID蛻励・蛟､**・井ｾ・ `my-project-12345`・峨ｒ菴ｿ逕ｨ

---

### 譁ｹ豕・: GCP繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ縺ｧ遒ｺ隱・

1. https://console.cloud.google.com/ 縺ｫ繧｢繧ｯ繧ｻ繧ｹ
2. 逕ｻ髱｢荳企Κ縺ｮ繝励Ο繧ｸ繧ｧ繧ｯ繝磯∈謚槭ラ繝ｭ繝・・繝繧ｦ繝ｳ繧偵け繝ｪ繝・け
3. 繝励Ο繧ｸ繧ｧ繧ｯ繝・D縺瑚｡ｨ遉ｺ縺輔ｌ繧・

---

## 倹 Cloud Run URL縺ｮ蜿門ｾ玲婿豕・

### 繝・・繝ｭ繧､蠕後↓閾ｪ蜍募叙蠕・

**繝・・繝ｭ繧､螳御ｺ・ｾ後∽ｻ･荳九・繧ｳ繝槭Φ繝峨〒蜿門ｾ・*:

```bash
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

**蜃ｺ蜉帑ｾ・*:
```
https://video-editor-xxxxx-xx.a.run.app
```

**縺薙・URL繧偵さ繝斐・縺励※菴ｿ逕ｨ**

---

## 統 蜿門ｾ礼畑繧ｳ繝槭Φ繝会ｼ医さ繝斐・逕ｨ・・

### 繝励Ο繧ｸ繧ｧ繧ｯ繝・D蜿門ｾ・

**`scripts/get-project-id.txt`** 繧帝幕縺・※繧ｳ繝斐・:

```bash
gcloud projects list
```

### Cloud Run URL蜿門ｾ・

**`scripts/get-cloud-run-url.txt`** 繧帝幕縺・※繧ｳ繝斐・:

```bash
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

## 売 繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ

1. **繝励Ο繧ｸ繧ｧ繧ｯ繝・D繧貞叙蠕・*
   ```bash
   gcloud projects list
   ```
   竊・PROJECT_ID繧偵さ繝斐・

2. **繝・・繝ｭ繧､繧ｳ繝槭Φ繝峨〒菴ｿ逕ｨ**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   $env:GCP_PROJECT_ID="YOUR_PROJECT_ID"
   ```
   竊・YOUR_PROJECT_ID繧貞ｮ滄圀縺ｮ蛟､縺ｫ鄂ｮ縺肴鋤縺・

3. **繝・・繝ｭ繧､螳溯｡・*

4. **Cloud Run URL繧貞叙蠕・*
   ```bash
   gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
   ```
   竊・URL繧偵さ繝斐・

5. **Supabase Secrets縺ｫ險ｭ螳・*
   ```bash
   npx supabase secrets set CLOUD_RUN_VIDEO_EDITOR_URL=YOUR_CLOUD_RUN_URL
   ```
   竊・YOUR_CLOUD_RUN_URL繧貞ｮ滄圀縺ｮURL縺ｫ鄂ｮ縺肴鋤縺・

---

**譛邨よ峩譁ｰ**: 2026-01-22

