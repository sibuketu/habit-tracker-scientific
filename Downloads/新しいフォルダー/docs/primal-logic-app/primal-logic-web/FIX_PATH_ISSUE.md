# PATH蝠城｡後・隗｣豎ｺ譁ｹ豕・

> **蝠城｡・*: `gcloud` 縺ｨ `docker` 繧ｳ繝槭Φ繝峨′隱崎ｭ倥＆繧後↑縺・ｼ亥・襍ｷ蜍募ｾ後ｂ・・

---

## 剥 Step 1: 繧､繝ｳ繧ｹ繝医・繝ｫ蜈医ｒ遒ｺ隱・

**閾ｪ蛻・・繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ螳溯｡・*:

```powershell
Test-Path "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
Test-Path "C:\Program Files\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
Test-Path "$env:LOCALAPPDATA\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd"
Test-Path "C:\Program Files\Docker\Docker\resources\bin\docker.exe"
```

**True 縺瑚｡ｨ遉ｺ縺輔ｌ縺溘ヱ繧ｹ縺後う繝ｳ繧ｹ繝医・繝ｫ蜈医〒縺・*

---

## 肌 Step 2: PATH縺ｫ謇句虚霑ｽ蜉・井ｸ譎ら噪・・

**隕九▽縺九▲縺溘ヱ繧ｹ繧堤腸蠅・､画焚縺ｫ霑ｽ蜉**:

```powershell
# gcloud縺ｮ繝代せ繧定ｿｽ蜉・郁ｦ九▽縺九▲縺溘ヱ繧ｹ縺ｫ鄂ｮ縺肴鋤縺医ｋ・・
$env:Path += ";C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin"

# docker縺ｮ繝代せ繧定ｿｽ蜉
$env:Path += ";C:\Program Files\Docker\Docker\resources\bin"
```

**縺薙・繧ｿ繝ｼ繝溘リ繝ｫ繧ｻ繝・す繝ｧ繝ｳ縺ｧ縺ｮ縺ｿ譛牙柑**

---

## 笨・Step 3: 繧ｳ繝槭Φ繝峨′隱崎ｭ倥＆繧後ｋ縺狗｢ｺ隱・

```powershell
gcloud --version
docker --version
```

---

## 売 Step 4: 豌ｸ邯夂噪縺ｫPATH縺ｫ霑ｽ蜉・域耳螂ｨ・・

**迺ｰ蠅・､画焚繧呈ｰｸ邯夂噪縺ｫ險ｭ螳・*:

1. **繧ｷ繧ｹ繝・Β縺ｮ繝励Ο繝代ユ繧｣繧帝幕縺・*
   - Windows繧ｭ繝ｼ + R 竊・`sysdm.cpl` 竊・Enter

2. **縲瑚ｩｳ邏ｰ險ｭ螳壹阪ち繝・竊・縲檎腸蠅・､画焚縲阪ｒ繧ｯ繝ｪ繝・け**

3. **縲訓ath縲阪ｒ驕ｸ謚・竊・縲檎ｷｨ髮・阪ｒ繧ｯ繝ｪ繝・け**

4. **縲梧眠隕上阪ｒ繧ｯ繝ｪ繝・け 竊・莉･荳九・繝代せ繧定ｿｽ蜉**:
   ```
   C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin
   C:\Program Files\Docker\Docker\resources\bin
   ```
   ・亥ｮ滄圀縺ｫ隕九▽縺九▲縺溘ヱ繧ｹ縺ｫ鄂ｮ縺肴鋤縺医ｋ・・

5. **縲薫K縲阪ｒ繧ｯ繝ｪ繝・け 竊・譁ｰ縺励＞繧ｿ繝ｼ繝溘リ繝ｫ繧帝幕縺・*

---

## 噫 莉｣譖ｿ譯・ 繝輔Ν繝代せ縺ｧ螳溯｡・

**PATH縺瑚ｨｭ螳壹＆繧後↑縺・ｴ蜷医√ヵ繝ｫ繝代せ縺ｧ螳溯｡・*:

```powershell
# gcloud・郁ｦ九▽縺九▲縺溘ヱ繧ｹ縺ｫ鄂ｮ縺肴鋤縺医ｋ・・
& "C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd" --version

# docker
& "C:\Program Files\Docker\Docker\resources\bin\docker.exe" --version
```

---

## 搭 繧ｳ繝斐・逕ｨ繝輔ぃ繧､繝ｫ

**`scripts/check-install-path.txt`** 繧帝幕縺・※縲∝・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※縺上□縺輔＞縲・

---

**譛邨よ峩譁ｰ**: 2026-01-22

