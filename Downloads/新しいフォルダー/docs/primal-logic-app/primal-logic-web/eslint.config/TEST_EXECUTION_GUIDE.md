# 繝・せ繝亥ｮ溯｡後ぎ繧､繝・

## 蜷梧凾荳ｦ陦後〒螳溯｡後〒縺阪ｋ繝・せ繝・

### 1. Visual Regression Test・・I隕九◆逶ｮ繝・せ繝茨ｼ峨晋eb迚医・

**螳溯｡梧婿豕・**
```bash
cd primal-logic-app/primal-logic-web
run-visual-test.bat
```

縺ｾ縺溘・:
```bash
npm run test:visual
```

**蛻晏屓螳溯｡梧凾・医・繝ｼ繧ｹ繝ｩ繧､繝ｳ菴懈・・・**
```bash
npm run test:visual:update
```

**迚ｹ蠕ｴ:**
- Web繝悶Λ繧ｦ繧ｶ縺ｧ螳溯｡鯉ｼ・C縺ｧ螳檎ｵ撰ｼ・
- 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈ｯ碑ｼ・＠縺ｦUI縺ｮ螟画峩繧呈､懷・
- 莉悶・繝・せ繝医→蜷梧凾螳溯｡悟庄閭ｽ

---

### 2. iOS迚医ユ繧ｹ繝茨ｼ・aestro・峨進OS螳滓ｩ溘・

**螳溯｡梧婿豕・**
```bash
cd primal-logic-app
run-ios-test.bat
```

縺ｾ縺溘・:
```bash
npm run test:e2e
```

**蜑肴署譚｡莉ｶ:**
1. Maestro縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ
   ```powershell
   iwr https://get.maestro.mobile.dev -UseBasicParsing | iex
   ```

2. iOS螳滓ｩ溘・謗･邯・
   - USB繧ｱ繝ｼ繝悶Ν縺ｧPC縺ｫ謗･邯・
   - 縲後％縺ｮ繧ｳ繝ｳ繝斐Η繝ｼ繧ｿ繧剃ｿ｡鬆ｼ縺吶ｋ縲阪ｒ驕ｸ謚・

3. 繧｢繝励Μ縺ｮ襍ｷ蜍包ｼ亥挨繧ｿ繝ｼ繝溘リ繝ｫ・・
   ```bash
   cd primal-logic-app
   npx expo start --ios
   ```

**迚ｹ蠕ｴ:**
- iOS螳滓ｩ溘〒螳溯｡・
- 螳滓ｩ溘〒縺ｮ蜍穂ｽ懊ｒ遒ｺ隱・
- Visual Regression Test縺ｨ蜷梧凾螳溯｡悟庄閭ｽ

---

## 蜷梧凾螳溯｡後・謇矩・

### 繧ｿ繝ｼ繝溘リ繝ｫ1: Visual Regression Test

```bash
cd primal-logic-app/primal-logic-web
run-visual-test.bat
```

### 繧ｿ繝ｼ繝溘リ繝ｫ2: iOS迚医ユ繧ｹ繝・

```bash
# 1. 繧｢繝励Μ繧定ｵｷ蜍・
cd primal-logic-app
npx expo start --ios

# 2. 蛻･縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ縺ｧ繝・せ繝亥ｮ溯｡・
cd primal-logic-app
run-ios-test.bat
```

---

## 繝・せ繝育ｵ先棡縺ｮ遒ｺ隱・

### Visual Regression Test
- 邨先棡: `primal-logic-app/primal-logic-web/test-results/`
- 蟾ｮ蛻・判蜒・ `*-diff.png`
- 螳滄圀縺ｮ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ: `*-actual.png`

### iOS迚医ユ繧ｹ繝・
- 邨先棡: `primal-logic-app/.maestro/test-results/`
- 繝ｭ繧ｰ: 繧ｿ繝ｼ繝溘リ繝ｫ縺ｫ陦ｨ遉ｺ

---

## 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### Visual Regression Test

**蟾ｮ蛻・′讀懷・縺輔ｌ縺溷ｴ蜷・**
1. 諢丞峙逧・↑螟画峩縺狗｢ｺ隱・
2. 諢丞峙逧・↑蝣ｴ蜷医・縲√・繝ｼ繧ｹ繝ｩ繧､繝ｳ繧呈峩譁ｰ:
   ```bash
   npm run test:visual:update
   ```

### iOS迚医ユ繧ｹ繝・

**繝・ヰ繧､繧ｹ縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷・**
```bash
maestro devices
```
- 螳滓ｩ溘′陦ｨ遉ｺ縺輔ｌ縺ｪ縺・ｴ蜷医・縲ゞSB謗･邯壹ｒ遒ｺ隱・

**繧｢繝励Μ縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷・**
- 繧｢繝励Μ縺瑚ｵｷ蜍輔＠縺ｦ縺・ｋ縺狗｢ｺ隱・
- appId縺梧ｭ｣縺励＞縺狗｢ｺ隱搾ｼ・com.primallogic.app`・・

---

譛邨よ峩譁ｰ: 2026-01-03


