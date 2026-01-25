# 萓晏ｭ倬未菫ゅう繝ｳ繧ｹ繝医・繝ｫ繧ｬ繧､繝・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: Docker Desktop縺ｨGoogle Cloud SDK繧偵う繝ｳ繧ｹ繝医・繝ｫ縺励※縲、ntigravity縺ｫ貂｡縺・

---

## 逃 繧､繝ｳ繧ｹ繝医・繝ｫ謇矩・

### 譁ｹ豕・: .bat繝輔ぃ繧､繝ｫ繧貞ｮ溯｡鯉ｼ域耳螂ｨ・・

1. **`scripts\install-dependencies.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け**

2. **繧､繝ｳ繧ｹ繝医・繝ｫ螳御ｺ・ｒ蠕・▽**
   - 繧､繝ｳ繧ｹ繝医・繝ｫ荳ｭ縺ｫ菴募ｺｦ縺九刑縲阪ｒ謚ｼ縺励※謇ｿ隱阪☆繧句ｿ・ｦ√′縺ゅｋ蝣ｴ蜷医′縺ゅｊ縺ｾ縺・
   - 螳御ｺ・ｾ後￣C縺ｮ蜀崎ｵｷ蜍輔′蠢・ｦ√↓縺ｪ繧九％縺ｨ縺後≠繧翫∪縺・

3. **蜀崎ｵｷ蜍募ｾ後、ntigravity縺ｧ莉･荳九ｒ螳溯｡・*:
   ```bash
   # GCP隱崎ｨｼ
   gcloud auth login
   
   # 繝励Ο繧ｸ繧ｧ繧ｯ繝・D繧定ｨｭ螳・
   gcloud config set project YOUR_PROJECT_ID
   
   # Cloud Run縺ｫ繝・・繝ｭ繧､
   scripts\deploy-cloud-run.bat
   ```

---

### 譁ｹ豕・: 謇句虚縺ｧ繧､繝ｳ繧ｹ繝医・繝ｫ

**PowerShell縺ｾ縺溘・繧ｳ繝槭Φ繝峨・繝ｭ繝ｳ繝励ヨ縺ｧ螳溯｡・*:

```bash
# Docker Desktop繧偵う繝ｳ繧ｹ繝医・繝ｫ
winget install -e --id Docker.DockerDesktop

# Google Cloud SDK繧偵う繝ｳ繧ｹ繝医・繝ｫ
winget install -e --id Google.CloudSDK
```

**豕ｨ諢丈ｺ矩・*:
- 繧､繝ｳ繧ｹ繝医・繝ｫ荳ｭ縺ｫ菴募ｺｦ縺九刑縲阪ｒ謚ｼ縺励※謇ｿ隱阪☆繧句ｿ・ｦ√′縺ゅｋ蝣ｴ蜷医′縺ゅｊ縺ｾ縺・
- 螳御ｺ・ｾ後￣C縺ｮ蜀崎ｵｷ蜍輔′蠢・ｦ√↓縺ｪ繧九％縺ｨ縺後≠繧翫∪縺・

---

## 笨・繧､繝ｳ繧ｹ繝医・繝ｫ遒ｺ隱・

**蜀崎ｵｷ蜍募ｾ後∽ｻ･荳九〒遒ｺ隱・*:

```bash
# Docker Desktop縺ｮ遒ｺ隱・
docker --version

# Google Cloud SDK縺ｮ遒ｺ隱・
gcloud --version
```

---

## 噫 谺｡縺ｮ繧ｹ繝・ャ繝・

繧､繝ｳ繧ｹ繝医・繝ｫ螳御ｺ・ｾ後～ANTIGRAVITY_DEPLOY_GUIDE.md` 繧貞盾辣ｧ縺励※縲、ntigravity縺ｧCloud Run縺ｫ繝・・繝ｭ繧､縺励※縺上□縺輔＞縲・

---

**譛邨よ峩譁ｰ**: 2026-01-22

