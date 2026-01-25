# Sentry險ｭ螳壹ぎ繧､繝・

> CarnivOS - 繧ｨ繝ｩ繝ｼ繝医Λ繝・く繝ｳ繧ｰ・・entry・峨・險ｭ螳壽婿豕・

---

## 搭 讎りｦ・

Sentry縺ｯ譛ｬ逡ｪ迺ｰ蠅・〒縺ｮ繧ｨ繝ｩ繝ｼ繧定ｿｽ霍｡繝ｻ逶｣隕悶☆繧九◆繧√・繧ｵ繝ｼ繝薙せ縺ｧ縺吶よ里縺ｫ繧ｳ繝ｼ繝峨↓縺ｯ邨ｱ蜷域ｸ医∩縺ｧ縺吶′縲∝ｮ滄圀縺ｫ菴ｿ逕ｨ縺吶ｋ縺ｫ縺ｯSentry繧｢繧ｫ繧ｦ繝ｳ繝医・險ｭ螳壹′蠢・ｦ√〒縺吶・

---

## 噫 繧ｻ繝・ヨ繧｢繝・・謇矩・

### 1. Sentry繧｢繧ｫ繧ｦ繝ｳ繝医・菴懈・

1. [Sentry.io](https://sentry.io) 縺ｫ繧｢繧ｯ繧ｻ繧ｹ
2. 繧｢繧ｫ繧ｦ繝ｳ繝医ｒ菴懈・・育┌譁吶・繝ｩ繝ｳ縺ゅｊ・・
3. 譁ｰ縺励＞繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ菴懈・
   - 繝励Λ繝・ヨ繝輔か繝ｼ繝: **JavaScript** 竊・**React**
   - 繝励Ο繧ｸ繧ｧ繧ｯ繝亥錐: **CarnivOS**

### 2. DSN・・ata Source Name・峨・蜿門ｾ・

1. Sentry繝繝・す繝･繝懊・繝峨〒繝励Ο繧ｸ繧ｧ繧ｯ繝医ｒ髢九￥
2. 縲郡ettings縲坂・縲靴lient Keys (DSN)縲阪↓遘ｻ蜍・
3. DSN繧偵さ繝斐・・井ｾ・ `https://xxxxx@xxxxx.ingest.sentry.io/xxxxx`・・

### 3. 迺ｰ蠅・､画焚縺ｮ險ｭ螳・

`.env` 繝輔ぃ繧､繝ｫ・医∪縺溘・ `.env.production`・峨↓霑ｽ蜉:

```env
VITE_SENTRY_DSN=https://xxxxx@xxxxx.ingest.sentry.io/xxxxx
```

**豕ｨ諢・** `.env` 繝輔ぃ繧､繝ｫ縺ｯ `.gitignore` 縺ｫ蜷ｫ縺ｾ繧後※縺・ｋ縺溘ａ縲；it縺ｫ縺ｯ繧ｳ繝溘ャ繝医＆繧後∪縺帙ｓ縲・

### 4. Sentry SDK縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ・医が繝励す繝ｧ繝ｳ・・

迴ｾ蝨ｨ縺ｮ螳溯｣・〒縺ｯ縲ヾentry SDK繧堤峩謗･繧､繝ｳ繧ｹ繝医・繝ｫ縺励※縺・∪縺帙ｓ縲ゅｈ繧願ｩｳ邏ｰ縺ｪ繧ｨ繝ｩ繝ｼ霑ｽ霍｡縺悟ｿ・ｦ√↑蝣ｴ蜷医・縲∽ｻ･荳九ｒ繧､繝ｳ繧ｹ繝医・繝ｫ:

```bash
npm install @sentry/react
```

縺昴・蠕後～src/main.tsx` 縺ｾ縺溘・ `src/App.tsx` 縺ｧ蛻晄悄蛹・

```typescript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.MODE,
  // 縺昴・莉悶・險ｭ螳・..
});
```

---

## 肌 迴ｾ蝨ｨ縺ｮ螳溯｣・憾豕・

### 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ

`src/utils/errorHandler.ts` 縺ｧ莉･荳九・讖溯・縺悟ｮ溯｣・＆繧後※縺・∪縺・

1. **繝ｦ繝ｼ繧ｶ繝ｼ繝輔Ξ繝ｳ繝峨Μ繝ｼ縺ｪ繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ**
   - 繝阪ャ繝医Ρ繝ｼ繧ｯ繧ｨ繝ｩ繝ｼ
   - 隱崎ｨｼ繧ｨ繝ｩ繝ｼ
   - API繧ｨ繝ｩ繝ｼ
   - 繧ｹ繝医Ξ繝ｼ繧ｸ繧ｨ繝ｩ繝ｼ

2. **繧ｨ繝ｩ繝ｼ繝ｭ繧ｰ險倬鹸**
   - 髢狗匱迺ｰ蠅・ 繧ｳ繝ｳ繧ｽ繝ｼ繝ｫ縺ｫ蜃ｺ蜉・
   - 譛ｬ逡ｪ迺ｰ蠅・ Sentry縺ｫ騾∽ｿ｡・・SN縺瑚ｨｭ螳壹＆繧後※縺・ｋ蝣ｴ蜷茨ｼ・

3. **繧ｨ繝ｩ繝ｼ繧ｿ繧､繝励・蛻､螳・*
   - `NETWORK_ERROR`
   - `AUTH_ERROR`
   - `VALIDATION_ERROR`
   - `API_ERROR`
   - `STORAGE_ERROR`

### 菴ｿ逕ｨ譁ｹ豕・

```typescript
import { logError, getUserFriendlyErrorMessage } from './utils/errorHandler';

try {
  // 菴輔ｉ縺九・蜃ｦ逅・
} catch (error) {
  // 繧ｨ繝ｩ繝ｼ繧偵Ο繧ｰ縺ｫ險倬鹸
  logError(error, { component: 'ComponentName', action: 'actionName' });
  
  // 繝ｦ繝ｼ繧ｶ繝ｼ縺ｫ陦ｨ遉ｺ縺吶ｋ繝｡繝・そ繝ｼ繧ｸ繧貞叙蠕・
  const message = getUserFriendlyErrorMessage(error);
  alert(message);
}
```

---

## 投 繧ｨ繝ｩ繝ｼ逶｣隕・

### Sentry繝繝・す繝･繝懊・繝峨〒遒ｺ隱阪〒縺阪ｋ諠・ｱ

- 繧ｨ繝ｩ繝ｼ縺ｮ逋ｺ逕滄ｻ蠎ｦ
- 繧ｨ繝ｩ繝ｼ縺ｮ遞ｮ鬘・
- 繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺溽腸蠅・ｼ磯幕逋ｺ/譛ｬ逡ｪ・・
- 繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺溘Θ繝ｼ繧ｶ繝ｼ・郁ｪ崎ｨｼ貂医∩縺ｮ蝣ｴ蜷茨ｼ・
- 繧ｹ繧ｿ繝・け繝医Ξ繝ｼ繧ｹ
- 繝悶Λ繧ｦ繧ｶ/繝・ヰ繧､繧ｹ諠・ｱ

### 繧｢繝ｩ繝ｼ繝郁ｨｭ螳・

1. Sentry繝繝・す繝･繝懊・繝峨〒縲窟lerts縲阪↓遘ｻ蜍・
2. 譁ｰ縺励＞繧｢繝ｩ繝ｼ繝医Ν繝ｼ繝ｫ繧剃ｽ懈・
   - 萓・ 1譎る俣縺ｫ10蝗樔ｻ･荳翫・繧ｨ繝ｩ繝ｼ縺檎匱逕溘＠縺溷ｴ蜷医↓騾夂衍

---

## 白 繝励Λ繧､繝舌す繝ｼ閠・・莠矩・

### 蛟倶ｺｺ諠・ｱ縺ｮ髯､螟・

Sentry縺ｫ騾∽ｿ｡縺輔ｌ繧九ョ繝ｼ繧ｿ縺九ｉ蛟倶ｺｺ諠・ｱ繧帝勁螟悶☆繧玖ｨｭ螳・

```typescript
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  beforeSend(event, hint) {
    // 蛟倶ｺｺ諠・ｱ繧帝勁螟・
    if (event.user) {
      delete event.user.email;
      delete event.user.ip_address;
    }
    return event;
  },
});
```

---

## ｧｪ 繝・せ繝・

### 繧ｨ繝ｩ繝ｼ騾∽ｿ｡縺ｮ繝・せ繝・

髢狗匱迺ｰ蠅・〒繧ｨ繝ｩ繝ｼ繧呈э蝗ｳ逧・↓逋ｺ逕溘＆縺帙※縲ヾentry縺ｫ騾∽ｿ｡縺輔ｌ繧九°遒ｺ隱・

```typescript
// 繝・せ繝育畑縺ｮ繧ｨ繝ｩ繝ｼ
throw new Error('Test error for Sentry');
```

Sentry繝繝・す繝･繝懊・繝峨〒繧ｨ繝ｩ繝ｼ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

---

## 答 蜿り・Μ繝ｳ繧ｯ

- [Sentry蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝・(https://docs.sentry.io/platforms/javascript/guides/react/)
- [Sentry React邨ｱ蜷・(https://docs.sentry.io/platforms/javascript/guides/react/)

---

譛邨よ峩譁ｰ: 2026-01-19

