# Capacitor繧ｻ繝・ヨ繧｢繝・・謇矩・ｼ・026-01-03・・

> Web繧｢繝励Μ繧偵ロ繧､繝・ぅ繝悶い繝励Μ蛹悶☆繧区焔鬆・

---

## 笨・螳御ｺ・＠縺滉ｽ懈･ｭ

1. **Capacitor縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ**: 螳御ｺ・
   ```bash
   npm install @capacitor/core @capacitor/cli @capacitor/ios @capacitor/android --save-dev
   ```

2. **Capacitor縺ｮ蛻晄悄蛹・*: 螳御ｺ・
   ```bash
   npx cap init "CarnivOS" "com.primallogic.app" --web-dir="dist"
   ```

---

## 搭 谺｡縺ｮ繧ｹ繝・ャ繝・

### 1. Web繧｢繝励Μ繧偵ン繝ｫ繝・

```bash
cd primal-logic-web
npm run build
```

縺薙ｌ縺ｧ`dist`繝・ぅ繝ｬ繧ｯ繝医Μ縺ｫ繝薙Ν繝峨＆繧後◆繝輔ぃ繧､繝ｫ縺檎函謌舌＆繧後∪縺吶・

### 2. iOS/Android繝励Λ繝・ヨ繝輔か繝ｼ繝繧定ｿｽ蜉

**Android・・indows縺ｧ繧ょ庄閭ｽ・・**
```bash
npx cap add android
```

**iOS・・acOS縺悟ｿ・ｦ・ｼ・**
```bash
npx cap add ios
```

**豕ｨ諢・*: Windows縺ｧ縺ｯiOS繝励Λ繝・ヨ繝輔か繝ｼ繝縺ｮ霑ｽ蜉縺ｯ縺ｧ縺阪∪縺帙ｓ縲ＮacOS縺悟ｿ・ｦ√〒縺吶・

### 3. Capacitor縺ｫ蜷梧悄

```bash
npx cap sync
```

縺薙ｌ縺ｧ縲√ン繝ｫ繝峨＆繧後◆Web繧｢繝励Μ縺後ロ繧､繝・ぅ繝悶・繝ｭ繧ｸ繧ｧ繧ｯ繝医↓繧ｳ繝斐・縺輔ｌ縺ｾ縺吶・

### 4. 螳滓ｩ溘〒繝・せ繝・

**Android:**
```bash
npx cap open android
```
Android Studio縺碁幕縺上・縺ｧ縲∝ｮ滓ｩ溘ｒ謗･邯壹＠縺ｦ螳溯｡後〒縺阪∪縺吶・

**iOS・・acOS縺悟ｿ・ｦ・ｼ・**
```bash
npx cap open ios
```
Xcode縺碁幕縺上・縺ｧ縲∝ｮ滓ｩ溘ｒ謗･邯壹＠縺ｦ螳溯｡後〒縺阪∪縺吶・

---

## 肌 險ｭ螳壹ヵ繧｡繧､繝ｫ

### capacitor.config.ts

Capacitor縺ｮ險ｭ螳壹ヵ繧｡繧､繝ｫ縺御ｽ懈・縺輔ｌ縺ｦ縺・ｋ縺ｯ縺壹〒縺吶ら｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.primallogic.app',
  appName: 'CarnivOS',
  webDir: 'dist',
  // 縺昴・莉悶・險ｭ螳・
};

export default config;
```

---

## 統 豕ｨ諢丈ｺ矩・

1. **Windows縺ｧ縺ｮiOS髢狗匱**: Windows縺ｧ縺ｯiOS繝励Λ繝・ヨ繝輔か繝ｼ繝縺ｮ霑ｽ蜉縺ｯ縺ｧ縺阪∪縺帙ｓ縲ＮacOS縺悟ｿ・ｦ√〒縺吶・
2. **Android髢狗匱**: Windows縺ｧ繧・ndroid髢狗匱縺ｯ蜿ｯ閭ｽ縺ｧ縺吶・
3. **繝薙Ν繝・*: 繝阪う繝・ぅ繝悶い繝励Μ繧貞ｮ溯｡後☆繧句燕縺ｫ縲∝ｿ・★`npm run build`繧貞ｮ溯｡後＠縺ｦ縺上□縺輔＞縲・

---

## 識 谺｡縺ｮ繧｢繧ｯ繧ｷ繝ｧ繝ｳ

1. Web繧｢繝励Μ繧偵ン繝ｫ繝・ `npm run build`
2. Android繝励Λ繝・ヨ繝輔か繝ｼ繝繧定ｿｽ蜉: `npx cap add android`
3. Capacitor縺ｫ蜷梧悄: `npx cap sync`
4. Android Studio縺ｧ髢九￥: `npx cap open android`
5. 螳滓ｩ溘〒繝・せ繝・

---

譛邨よ峩譁ｰ: 2026-01-03


