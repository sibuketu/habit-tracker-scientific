# Docker Desktop襍ｷ蜍募撫鬘後・隗｣豎ｺ譁ｹ豕・

> **蝠城｡・*: Docker Desktop縺瑚ｵｷ蜍輔〒縺阪↑縺・

---

## 剥 Step 1: Docker Desktop縺ｮ迥ｶ諷九ｒ遒ｺ隱・

### 1.1: Docker Desktop縺悟ｮ悟・縺ｫ邨ゆｺ・＠縺ｦ縺・ｋ縺狗｢ｺ隱・

1. **繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ繧堤｢ｺ隱・*
   - 繧｢繧､繧ｳ繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷・竊・蜿ｳ繧ｯ繝ｪ繝・け 竊・縲群uit Docker Desktop縲・

2. **繧ｿ繧ｹ繧ｯ繝槭ロ繝ｼ繧ｸ繝｣繝ｼ縺ｧ遒ｺ隱・*
   - Ctrl + Shift + Esc 竊・縲後・繝ｭ繧ｻ繧ｹ縲阪ち繝・
   - 縲轡ocker縲阪〒讀懃ｴ｢ 竊・蜈ｨ縺ｦ縺ｮDocker繝励Ο繧ｻ繧ｹ繧堤ｵゆｺ・

---

## 肌 Step 2: WSL縺ｮ迥ｶ諷九ｒ遒ｺ隱・

**PowerShell・育ｮ｡逅・・ｼ峨〒螳溯｡・*:

```powershell
wsl --status
wsl --list --verbose
```

**WSL縺梧ｭ｣蟶ｸ縺ｫ蜍穂ｽ懊＠縺ｦ縺・ｋ縺狗｢ｺ隱・*

---

## 売 Step 3: WSL繧呈峩譁ｰ・域悴螳溯｡後・蝣ｴ蜷茨ｼ・

**PowerShell・育ｮ｡逅・・ｼ峨〒螳溯｡・*:

```powershell
wsl --update
wsl --shutdown
```

**譖ｴ譁ｰ螳御ｺ・ｒ蠕・▽**・育ｴ・-2蛻・ｼ・

---

## 正 Step 4: Docker Desktop繧貞・襍ｷ蜍・

### 4.1: 螳悟・縺ｫ邨ゆｺ・

1. **繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ繧貞承繧ｯ繝ｪ繝・け** 竊・**縲群uit Docker Desktop縲・*
2. **繧ｿ繧ｹ繧ｯ繝槭ロ繝ｼ繧ｸ繝｣繝ｼ縺ｧDocker繝励Ο繧ｻ繧ｹ繧堤｢ｺ隱・* 竊・蜈ｨ縺ｦ邨ゆｺ・

### 4.2: 蜀崎ｵｷ蜍・

1. **繧ｹ繧ｿ繝ｼ繝医Γ繝九Η繝ｼ縺九ｉ縲轡ocker Desktop縲阪ｒ襍ｷ蜍・*
2. **襍ｷ蜍募ｮ御ｺ・ｒ蠕・▽**・育ｴ・-3蛻・ｼ・
   - 繧ｿ繧ｹ繧ｯ繝医Ξ繧､縺ｮDocker繧｢繧､繧ｳ繝ｳ縺ｧ遒ｺ隱・
   - 縲轡ocker Desktop is running縲阪→陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽

---

## 売 Step 5: PC繧貞・襍ｷ蜍包ｼ域耳螂ｨ・・

**WSL譖ｴ譁ｰ蠕後￣C縺ｮ蜀崎ｵｷ蜍輔ｒ謗ｨ螂ｨ**:

1. **PC繧貞・襍ｷ蜍・*
2. **蜀崎ｵｷ蜍募ｾ後．ocker Desktop繧定ｵｷ蜍・*
3. **襍ｷ蜍募ｮ御ｺ・ｒ蠕・▽**

---

## 笨・Step 6: Docker縺瑚ｵｷ蜍輔＠縺溘％縺ｨ繧堤｢ｺ隱・

**PowerShell縺ｧ螳溯｡・*:

```powershell
docker ps
```

**繧ｨ繝ｩ繝ｼ縺悟・縺ｪ縺代ｌ縺ｰOK**

---

## 搭 Step 7: Docker繧､繝｡繝ｼ繧ｸ繧偵ン繝ｫ繝峨・繝励ャ繧ｷ繝･繝ｻ繝・・繝ｭ繧､

**繝励Ο繧ｸ繧ｧ繧ｯ繝医ョ繧｣繝ｬ繧ｯ繝医Μ縺ｫ遘ｻ蜍・*:

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
```

**`scripts/fix-and-retry-deploy.txt`** 繧帝幕縺・※縲・-5陦檎岼繧貞ｮ溯｡・

```powershell
docker build -t gcr.io/gen-lang-client-0090221486/video-editor .
docker push gcr.io/gen-lang-client-0090221486/video-editor
gcloud run deploy video-editor --image gcr.io/gen-lang-client-0090221486/video-editor --platform managed --region asia-northeast1 --allow-unauthenticated --memory 2Gi --cpu 2 --timeout 300
gcloud run services describe video-editor --region asia-northeast1 --format "value(status.url)"
```

---

## 笞・・繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### Docker Desktop縺瑚ｵｷ蜍輔＠縺ｪ縺・ｴ蜷・

1. **Docker Desktop縺ｮ險ｭ螳壹ｒ繝ｪ繧ｻ繝・ヨ**
   - Docker Desktop 竊・Settings 竊・Reset to factory defaults

2. **WSL2縺ｮ蜀阪う繝ｳ繧ｹ繝医・繝ｫ**
   ```powershell
   wsl --unregister docker-desktop
   wsl --unregister docker-desktop-data
   ```
   竊・Docker Desktop繧貞・襍ｷ蜍包ｼ郁・蜍慕噪縺ｫ蜀堺ｽ懈・縺輔ｌ繧具ｼ・

3. **PC縺ｮ蜀崎ｵｷ蜍・*
   - WSL譖ｴ譁ｰ蠕後・蜀崎ｵｷ蜍輔ｒ謗ｨ螂ｨ

---

## 統 繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ

### WSL迥ｶ諷狗｢ｺ隱・

**`scripts/check-wsl-status.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

**譛邨よ峩譁ｰ**: 2026-01-22

