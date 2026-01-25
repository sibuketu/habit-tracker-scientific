# 繧ｯ繧､繝・け繝・せ繝亥ｮ溯｡後ぎ繧､繝・

## 蜷梧凾荳ｦ陦後〒螳溯｡後〒縺阪ｋ繝・せ繝・

### 笨・Visual Regression Test・・I隕九◆逶ｮ繝・せ繝茨ｼ・

**螳溯｡梧婿豕包ｼ医し繝ｫ縺ｧ繧ゅｏ縺九ｋ隱ｬ譏趣ｼ・**

**譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ井ｸ逡ｪ邁｡蜊倥・謗ｨ螂ｨ・・*

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ繧呈款縺・
   - 縲後お繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縲阪→蜈･蜉帙＠縺ｦEnter
   - 縺ｾ縺溘・縲仝indows繧ｭ繝ｼ+E繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ繝代せ繧定ｲｼ繧贋ｻ倥￠繧・*
   - 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺ｮ荳企Κ縺ｫ縺ゅｋ繧｢繝峨Ξ繧ｹ繝舌・・医ヵ繧ｩ繝ｫ繝繝ｼ縺ｮ繝代せ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ謇・峨ｒ繧ｯ繝ｪ繝・け
   - 莉･荳九ｒ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠・・trl+V・・
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```
   - Enter繧ｭ繝ｼ繧呈款縺・

3. **繝舌ャ繝√ヵ繧｡繧､繝ｫ繧貞ｮ溯｡・*
   - `run-visual-test.bat` 縺ｨ縺・≧繝輔ぃ繧､繝ｫ繧呈爾縺・
   - 繝繝悶Ν繧ｯ繝ｪ繝・け縺吶ｋ

**譁ｹ豕・: PowerShell縺九ｉ螳溯｡・*

1. **PowerShell繧帝幕縺・*
   - Windows繧ｭ繝ｼ繧呈款縺・
   - 縲訓owerShell縲阪→蜈･蜉帙＠縺ｦEnter
   - 縺ｾ縺溘・縲仝indows繧ｭ繝ｼ+X 竊・縲係indows PowerShell縲阪ｒ驕ｸ謚・

2. **莉･荳九ｒ繧ｳ繝斐・縺励※螳溯｡鯉ｼ・陦後★縺､・・*
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
```
```powershell
.\run-visual-test.bat
```

**蛻晏屓螳溯｡鯉ｼ医・繝ｼ繧ｹ繝ｩ繧､繝ｳ菴懈・・・**

**譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ井ｸ逡ｪ邁｡蜊假ｼ・*
1. 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺擾ｼ・indows繧ｭ繝ｼ+E・・
2. 繧｢繝峨Ξ繧ｹ繝舌・縺ｫ莉･荳九ｒ雋ｼ繧贋ｻ倥￠縺ｦEnter:
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```
3. `create-visual-baseline.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

**譁ｹ豕・: PowerShell縺九ｉ螳溯｡・*
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
npm run test:visual:update
```

**迚ｹ蠕ｴ:**
- 笨・PC縺ｧ螳檎ｵ撰ｼ医ヶ繝ｩ繧ｦ繧ｶ縺ｧ螳溯｡鯉ｼ・
- 笨・莉悶・繝・せ繝医→蜷梧凾螳溯｡悟庄閭ｽ
- 笨・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ縺ｧUI縺ｮ螟画峩繧呈､懷・

---

### 笨・iOS迚医ユ繧ｹ繝茨ｼ・aestro・・

**螳溯｡梧婿豕包ｼ医し繝ｫ縺ｧ繧ゅｏ縺九ｋ隱ｬ譏趣ｼ・**

**譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ井ｸ逡ｪ邁｡蜊倥・謗ｨ螂ｨ・・*

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ+E繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ繝代せ繧定ｲｼ繧贋ｻ倥￠繧・*
   - 繧｢繝峨Ξ繧ｹ繝舌・繧偵け繝ｪ繝・け
   - 莉･荳九ｒ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠:
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app
   ```
   - Enter繧ｭ繝ｼ繧呈款縺・

3. **繝舌ャ繝√ヵ繧｡繧､繝ｫ繧貞ｮ溯｡・*
   - `run-ios-test.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

**譁ｹ豕・: PowerShell縺九ｉ螳溯｡・*

1. **PowerShell繧帝幕縺・*
   - Windows繧ｭ繝ｼ 竊・縲訓owerShell縲阪→蜈･蜉・竊・Enter

2. **莉･荳九ｒ繧ｳ繝斐・縺励※螳溯｡鯉ｼ・陦後★縺､・・*
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app"
```
```powershell
.\run-ios-test.bat
```

**蜑肴署譚｡莉ｶ:**
1. 笨・Maestro繧､繝ｳ繧ｹ繝医・繝ｫ貂医∩・・2.0.10遒ｺ隱肴ｸ医∩・・
2. iOS螳滓ｩ溘ｒUSB謗･邯・
3. 繧｢繝励Μ繧定ｵｷ蜍包ｼ亥挨繧ｿ繝ｼ繝溘リ繝ｫ・・
   - 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺擾ｼ・indows繧ｭ繝ｼ+E・・
   - 繧｢繝峨Ξ繧ｹ繝舌・縺ｫ莉･荳九ｒ雋ｼ繧贋ｻ倥￠縺ｦEnter:
     ```
     C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app
     ```
   - `start-ios-app.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

**迚ｹ蠕ｴ:**
- 笨・iOS螳滓ｩ溘〒螳溯｡・
- 笨・Visual Regression Test縺ｨ蜷梧凾螳溯｡悟庄閭ｽ

---

## 蜷梧凾螳溯｡後・謇矩・

### 繧ｿ繝ｼ繝溘リ繝ｫ1: Visual Regression Test

**譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ井ｸ逡ｪ邁｡蜊倥・謗ｨ螂ｨ・・*

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ+E繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ繝代せ繧定ｲｼ繧贋ｻ倥￠繧・*
   - 繧｢繝峨Ξ繧ｹ繝舌・繧偵け繝ｪ繝・け
   - 莉･荳九ｒ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠:
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```
   - Enter繧ｭ繝ｼ繧呈款縺・

3. **繝舌ャ繝√ヵ繧｡繧､繝ｫ繧貞ｮ溯｡・*
   - `run-visual-test.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

**譁ｹ豕・: PowerShell縺九ｉ螳溯｡・*

1. **PowerShell繧帝幕縺・*
   - Windows繧ｭ繝ｼ 竊・縲訓owerShell縲阪→蜈･蜉・竊・Enter

2. **莉･荳九ｒ繧ｳ繝斐・縺励※螳溯｡鯉ｼ・陦後★縺､・・*
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
```
```powershell
.\run-visual-test.bat
```

### 繧ｿ繝ｼ繝溘リ繝ｫ2: iOS迚医ユ繧ｹ繝・

**譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ井ｸ逡ｪ邁｡蜊倥・謗ｨ螂ｨ・・*

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ+E繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ繝代せ繧定ｲｼ繧贋ｻ倥￠繧・*
   - 繧｢繝峨Ξ繧ｹ繝舌・繧偵け繝ｪ繝・け
   - 莉･荳九ｒ繧ｳ繝斐・縺励※雋ｼ繧贋ｻ倥￠:
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app
   ```
   - Enter繧ｭ繝ｼ繧呈款縺・

3. **繧｢繝励Μ繧定ｵｷ蜍・*
   - `start-ios-app.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

4. **蛻･縺ｮ繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺ｧ繝・せ繝亥ｮ溯｡・*
   - 繧ゅ≧荳蠎ｦ繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺擾ｼ・indows繧ｭ繝ｼ+E・・
   - 蜷後§繝代せ繧定ｲｼ繧贋ｻ倥￠縺ｦEnter
   - `run-ios-test.bat` 繧偵ム繝悶Ν繧ｯ繝ｪ繝・け

**譁ｹ豕・: PowerShell縺九ｉ螳溯｡・*

1. **PowerShell繧帝幕縺・*
   - Windows繧ｭ繝ｼ 竊・縲訓owerShell縲阪→蜈･蜉・竊・Enter

2. **繧｢繝励Μ繧定ｵｷ蜍包ｼ・陦後★縺､・・*
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app"
```
```powershell
.\start-ios-app.bat
```

3. **蛻･縺ｮPowerShell繧帝幕縺・※繝・せ繝亥ｮ溯｡・*
   - 繧ゅ≧荳蠎ｦPowerShell繧帝幕縺・
   - 莉･荳九ｒ螳溯｡鯉ｼ・陦後★縺､・・
```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app"
```
```powershell
.\run-ios-test.bat
```

---

## 繝・せ繝育ｵ先棡

### Visual Regression Test
- 邨先棡: `primal-logic-app/primal-logic-web/test-results/`
- 蟾ｮ蛻・′縺ゅｋ蝣ｴ蜷・ `*-diff.png`縺ｧ遒ｺ隱・

### iOS迚医ユ繧ｹ繝・
- 邨先棡: 繧ｿ繝ｼ繝溘リ繝ｫ縺ｫ陦ｨ遉ｺ
- 繝ｭ繧ｰ: `.maestro/test-results/`・医≠繧後・・・

---

## 豕ｨ諢丈ｺ矩・

- **Visual Regression Test**: 蛻晏屓螳溯｡梧凾縺ｯ蠢・★`--update-snapshots`縺ｧ繝吶・繧ｹ繝ｩ繧､繝ｳ繧剃ｽ懈・
- **iOS迚医ユ繧ｹ繝・*: iOS螳滓ｩ溘′蠢・ｦ・ｼ・indows迺ｰ蠅・〒縺ｯ螳滓ｩ溘・縺ｿ蟇ｾ蠢懶ｼ・
- **蜷梧凾螳溯｡・*: 荳｡譁ｹ縺ｮ繝・せ繝医・迢ｬ遶九＠縺ｦ縺・ｋ縺溘ａ縲∝酔譎ょｮ溯｡悟庄閭ｽ

---

譛邨よ峩譁ｰ: 2026-01-03

