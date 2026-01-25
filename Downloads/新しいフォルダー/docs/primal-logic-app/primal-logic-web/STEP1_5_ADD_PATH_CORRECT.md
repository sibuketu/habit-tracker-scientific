# Step 1.5: PATH縺ｫ霑ｽ蜉・域ｭ｣縺励＞譁ｹ豕包ｼ・

> **蝠城｡・*: 縲後ヱ繧ｹ繧ｳ繝ｳ繝昴・繝阪Φ繝医↓蛻ｶ蠕｡譁・ｭ励′菴ｿ縺医↑縺・阪お繝ｩ繝ｼ縲～/`繧Я"`縺ｪ縺ｩ縺ｮ迚ｹ谿頑枚蟄励′菴ｿ縺医↑縺・

---

## 肌 豁｣縺励＞譁ｹ豕・ Join-Path繧剃ｽｿ逕ｨ

**PowerShell縺ｧPATH縺ｫ霑ｽ蜉縺吶ｋ髫帙・縲～Join-Path`繧剃ｽｿ逕ｨ縺励※繝代せ繧堤ｵ仙粋縺吶ｋ**

**`scripts/add-to-path-correct.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

```powershell
$gcloudPath = Join-Path $env:LOCALAPPDATA "Google\Cloud SDK\google-cloud-sdk\bin"
$dockerPath = "C:\Program Files\Docker\Docker\resources\bin"
$env:Path = $env:Path + ";" + $gcloudPath + ";" + $dockerPath
gcloud --version
docker --version
```

**`Join-Path`繧剃ｽｿ逕ｨ縺吶ｋ縺薙→縺ｧ縲∫音谿頑枚蟄励・蝠城｡後ｒ蝗樣∩**

---

## 笨・遒ｺ隱・

**荳｡譁ｹ縺ｮ繧ｳ繝槭Φ繝峨′隱崎ｭ倥＆繧後ｌ縺ｰOK**

---

## 売 豌ｸ邯夂噪縺ｫPATH縺ｫ霑ｽ蜉・域耳螂ｨ・・

**迺ｰ蠅・､画焚繧呈ｰｸ邯夂噪縺ｫ險ｭ螳・*:

1. **繧ｷ繧ｹ繝・Β縺ｮ繝励Ο繝代ユ繧｣繧帝幕縺・*
   - Windows繧ｭ繝ｼ + R 竊・`sysdm.cpl` 竊・Enter

2. **縲瑚ｩｳ邏ｰ險ｭ螳壹阪ち繝・竊・縲檎腸蠅・､画焚縲阪ｒ繧ｯ繝ｪ繝・け**

3. **縲訓ath縲阪ｒ驕ｸ謚・竊・縲檎ｷｨ髮・阪ｒ繧ｯ繝ｪ繝・け**

4. **縲梧眠隕上阪ｒ繧ｯ繝ｪ繝・け 竊・莉･荳九・繝代せ繧定ｿｽ蜉**:
   ```
   %LOCALAPPDATA%\Google\Cloud SDK\google-cloud-sdk\bin
   C:\Program Files\Docker\Docker\resources\bin
   ```

5. **縲薫K縲阪ｒ繧ｯ繝ｪ繝・け 竊・譁ｰ縺励＞繧ｿ繝ｼ繝溘リ繝ｫ繧帝幕縺・*

---

## 統 陬懆ｶｳ: PowerShell縺ｧPATH縺ｫ霑ｽ蜉縺吶ｋ髫帙・豕ｨ諢冗せ

**驕ｿ縺代ｋ縺ｹ縺崎ｨ伜捷繝ｻ譁・ｭ・*:
- `"` (繝繝悶Ν繧ｯ繧ｩ繝ｼ繝・ - 螟画焚螻暮幕譎ゅ↓蝠城｡後′逋ｺ逕・
- `/` (繧ｹ繝ｩ繝・す繝･) - Windows縺ｧ縺ｯ`\`繧剃ｽｿ逕ｨ
- 蛻ｶ蠕｡譁・ｭ暦ｼ域隼陦後√ち繝悶↑縺ｩ・・

**謗ｨ螂ｨ縺輔ｌ繧区婿豕・*:
- `Join-Path`繧剃ｽｿ逕ｨ縺励※繝代せ繧堤ｵ仙粋
- 譁・ｭ怜・騾｣邨撰ｼ・+`・峨ｒ菴ｿ逕ｨ
- 迺ｰ蠅・､画焚縺ｯ螻暮幕貂医∩縺ｮ蛟､繧剃ｽｿ逕ｨ

---

## 噫 谺｡縺ｮ繧ｹ繝・ャ繝・

**繧ｳ繝槭Φ繝峨′隱崎ｭ倥＆繧後◆繧峨～STEP1_GET_PROJECT_ID.md` 繧貞盾辣ｧ縺励※縺上□縺輔＞**

---

**譛邨よ峩譁ｰ**: 2026-01-22

