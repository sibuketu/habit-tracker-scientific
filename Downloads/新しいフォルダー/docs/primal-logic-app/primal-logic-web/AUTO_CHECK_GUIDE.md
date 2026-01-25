# UI閾ｪ蜍輔メ繧ｧ繝・け繧ｬ繧､繝・

## 讎りｦ・

Rules縺ｫ霑ｽ蜉縺励◆閾ｪ蜍輔メ繧ｧ繝・け讖溯・繧貞ｮ溯｡後☆繧九◆繧√・繧ｬ繧､繝峨〒縺吶ゆｻ･荳九・鬆・岼繧定・蜍慕噪縺ｫ繝√ぉ繝・け縺励∪縺呻ｼ・

1. **蜈･蜉帙ヵ繧｣繝ｼ繝ｫ繝峨・陦ｨ遉ｺ**: `flex: 1`縲～width: 100%`縲～display: flex`縺梧ｭ｣縺励￥險ｭ螳壹＆繧後※縺・ｋ縺・
2. **繝懊ち繝ｳ縺ｮ陦ｨ遉ｺ**: 繧ｵ繧､繧ｺ縲∬牡縲・・鄂ｮ縺梧ｭ｣縺励＞縺・
3. **繝・く繧ｹ繝医・陦ｨ遉ｺ**: 繝輔か繝ｳ繝医し繧､繧ｺ縲∬牡縲・・鄂ｮ縺梧ｭ｣縺励＞縺・
4. **繝ｬ繧ｹ繝昴Φ繧ｷ繝悶ョ繧ｶ繧､繝ｳ**: 繝｢繝舌う繝ｫ縲√ち繝悶Ξ繝・ヨ縲￣C縺ｧ豁｣縺励￥蜍穂ｽ懊☆繧九°

## 螳溯｡梧婿豕・

### 譁ｹ豕・: 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ螳溯｡鯉ｼ域耳螂ｨ繝ｻ荳逡ｪ邁｡蜊假ｼ・

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ + E 繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ莉･荳九ｒ雋ｼ繧贋ｻ倥￠縺ｦEnter**
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```

3. **`auto-check-ui.bat`繧偵ム繝悶Ν繧ｯ繝ｪ繝・け**
   - 繝舌ャ繝√ヵ繧｡繧､繝ｫ繧偵ム繝悶Ν繧ｯ繝ｪ繝・け縺吶ｋ縺ｨ閾ｪ蜍輔メ繧ｧ繝・け縺碁幕蟋九＆繧後∪縺・

### 譁ｹ豕・: PowerShell縺九ｉ螳溯｡・

1. **PowerShell繧帝幕縺・*
   - Windows繧ｭ繝ｼ 竊・縲訓owerShell縲阪→蜈･蜉・竊・Enter

2. **莉･荳九・繧ｳ繝槭Φ繝峨ｒ繧ｳ繝斐・縺励※螳溯｡・*
   ```powershell
   cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
   .\auto-check-ui.bat
   ```

## 繝√ぉ繝・け蜀・ｮｹ

### 1. ESLint・医さ繝ｼ繝牙刀雉ｪ繝√ぉ繝・け・・
- 繧ｳ繝ｼ繝峨・蜩∬ｳｪ縺ｨ荳雋ｫ諤ｧ繧偵メ繧ｧ繝・け
- 繧ｨ繝ｩ繝ｼ縺瑚ｦ九▽縺九▲縺溷ｴ蜷・ `npm run lint:fix`縺ｧ閾ｪ蜍穂ｿｮ豁｣蜿ｯ閭ｽ

### 2. TypeScript蝙九メ繧ｧ繝・け
- 蝙九お繝ｩ繝ｼ縺後↑縺・°繝√ぉ繝・け
- 繧ｨ繝ｩ繝ｼ縺瑚ｦ九▽縺九▲縺溷ｴ蜷・ 繧ｳ繝ｼ繝峨ｒ菫ｮ豁｣縺吶ｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・

### 3. Prettier・医ヵ繧ｩ繝ｼ繝槭ャ繝医メ繧ｧ繝・け・・
- 繧ｳ繝ｼ繝峨・繝輔か繝ｼ繝槭ャ繝医′邨ｱ荳縺輔ｌ縺ｦ縺・ｋ縺九メ繧ｧ繝・け
- 繧ｨ繝ｩ繝ｼ縺瑚ｦ九▽縺九▲縺溷ｴ蜷・ `npm run format`縺ｧ閾ｪ蜍穂ｿｮ豁｣蜿ｯ閭ｽ

### 4. Visual Regression Test・・I隕九◆逶ｮ繝√ぉ繝・け・・
- UI縺ｮ隕九◆逶ｮ縺梧э蝗ｳ縺帙★螟画峩縺輔ｌ縺ｦ縺・↑縺・°繝√ぉ繝・け
- **豕ｨ諢・*: 髢狗匱繧ｵ繝ｼ繝舌・・・npm run dev`・峨′襍ｷ蜍輔＠縺ｦ縺・ｋ蠢・ｦ√′縺ゅｊ縺ｾ縺・
- 繧ｨ繝ｩ繝ｼ縺瑚ｦ九▽縺九▲縺溷ｴ蜷・ `npm run test:ui`縺ｧ邨先棡繧堤｢ｺ隱阪〒縺阪∪縺・

## 髢狗匱繧ｵ繝ｼ繝舌・縺ｮ襍ｷ蜍墓婿豕・

Visual Regression Test繧貞ｮ溯｡後☆繧句燕縺ｫ縲・幕逋ｺ繧ｵ繝ｼ繝舌・繧定ｵｷ蜍輔☆繧句ｿ・ｦ√′縺ゅｊ縺ｾ縺呻ｼ・

### 繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ縺九ｉ襍ｷ蜍包ｼ域耳螂ｨ・・

1. **繧ｨ繧ｯ繧ｹ繝励Ο繝ｼ繝ｩ繝ｼ繧帝幕縺・*
   - Windows繧ｭ繝ｼ + E 繧呈款縺・

2. **繧｢繝峨Ξ繧ｹ繝舌・縺ｫ莉･荳九ｒ雋ｼ繧贋ｻ倥￠縺ｦEnter**
   ```
   C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web
   ```

3. **`start-dev-server.bat`繧偵ム繝悶Ν繧ｯ繝ｪ繝・け**
   - 髢狗匱繧ｵ繝ｼ繝舌・縺瑚ｵｷ蜍輔＠縺ｾ縺呻ｼ・http://localhost:5174`・・

### PowerShell縺九ｉ襍ｷ蜍・

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
.\start-dev-server.bat
```

## 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### Visual Regression Test縺悟､ｱ謨励☆繧句ｴ蜷・

1. **髢狗匱繧ｵ繝ｼ繝舌・縺瑚ｵｷ蜍輔＠縺ｦ縺・ｋ縺狗｢ｺ隱・*
   - `http://localhost:5174`縺ｫ繧｢繧ｯ繧ｻ繧ｹ縺ｧ縺阪ｋ縺狗｢ｺ隱・

2. **繝吶・繧ｹ繝ｩ繧､繝ｳ繧呈峩譁ｰ縺吶ｋ**
   ```powershell
   npm run test:visual:update
   ```

3. **UI繝｢繝ｼ繝峨〒邨先棡繧堤｢ｺ隱阪☆繧・*
   ```powershell
   npm run test:ui
   ```

### ESLint繧ｨ繝ｩ繝ｼ縺檎匱逕溘☆繧句ｴ蜷・

閾ｪ蜍穂ｿｮ豁｣繧貞ｮ溯｡鯉ｼ・
```powershell
npm run lint:fix
```

### Prettier繧ｨ繝ｩ繝ｼ縺檎匱逕溘☆繧句ｴ蜷・

閾ｪ蜍穂ｿｮ豁｣繧貞ｮ溯｡鯉ｼ・
```powershell
npm run format
```

## 蛟句挨繝√ぉ繝・け縺ｮ螳溯｡・

### ESLint縺ｮ縺ｿ螳溯｡・
```powershell
npm run lint
```

### TypeScript蝙九メ繧ｧ繝・け縺ｮ縺ｿ螳溯｡・
```powershell
npx tsc --noEmit
```

### Prettier繝√ぉ繝・け縺ｮ縺ｿ螳溯｡・
```powershell
npm run format:check
```

### Visual Regression Test縺ｮ縺ｿ螳溯｡・
```powershell
npm run test:visual
```

## 蜿り・

- [Visual Regression Test 繧ｬ繧､繝云(VISUAL_REGRESSION_TEST_GUIDE.md)
- [繝ｪ繝ｪ繝ｼ繧ｹ蜑阪メ繧ｧ繝・け繝ｪ繧ｹ繝・(RELEASE_PRE_CHECKLIST.md)


