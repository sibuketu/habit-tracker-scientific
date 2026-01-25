# Step 1.5: PATH縺ｫ霑ｽ蜉縺励※繧ｳ繝槭Φ繝峨ｒ隱崎ｭ倥＆縺帙ｋ

> **迥ｶ豕・*: 繧､繝ｳ繧ｹ繝医・繝ｫ蜈医ｒ遒ｺ隱肴ｸ医∩縲１ATH縺ｫ霑ｽ蜉縺吶ｋ蠢・ｦ√′縺ゅｋ

---

## 搭 繧､繝ｳ繧ｹ繝医・繝ｫ蜈医・遒ｺ隱咲ｵ先棡

- **gcloud**: `$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd` 笨・
- **docker**: `C:\Program Files\Docker\Docker\resources\bin\docker.exe` 笨・

---

## 肌 PATH縺ｫ霑ｽ蜉・医％縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ繧ｻ繝・す繝ｧ繝ｳ・・

**`scripts/add-to-path.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

```powershell
$env:Path += ";$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin"
$env:Path += ";C:\Program Files\Docker\Docker\resources\bin"
gcloud --version
docker --version
```

**縺薙・繧ｿ繝ｼ繝溘リ繝ｫ繧ｻ繝・す繝ｧ繝ｳ縺ｧ縺ｮ縺ｿ譛牙柑**

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

## 噫 谺｡縺ｮ繧ｹ繝・ャ繝・

**繧ｳ繝槭Φ繝峨′隱崎ｭ倥＆繧後◆繧峨～STEP1_GET_PROJECT_ID.md` 繧貞盾辣ｧ縺励※縺上□縺輔＞**

---

**譛邨よ峩譁ｰ**: 2026-01-22

