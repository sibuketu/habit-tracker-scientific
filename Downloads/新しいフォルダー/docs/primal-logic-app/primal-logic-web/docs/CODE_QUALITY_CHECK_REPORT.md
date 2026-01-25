# 繧ｳ繝ｼ繝牙刀雉ｪ繝√ぉ繝・け繝ｬ繝昴・繝・

> **菴懈・譌･**: 2026-01-21  
> **逶ｮ逧・*: [CODE-QUALITY-001] 繧ｳ繝ｼ繝牙刀雉ｪ繝√ぉ繝・け縺ｮ螳溯｡檎ｵ先棡  
> **諡・ｽ・*: PM/繧｢繝ｼ繧ｭ繝・け繝茨ｼ亥ｮ溯｣・お繝ｳ繧ｸ繝九いAgent縺ｮ莉｣陦鯉ｼ・

---

## 螳溯｡檎ｵ先棡繧ｵ繝槭Μ繝ｼ

### 笨・繝√ぉ繝・け螳御ｺ・・岼

1. **Lint繝√ぉ繝・け**: 笨・繧ｨ繝ｩ繝ｼ0莉ｶ・・read_lints`繝・・繝ｫ縺ｧ遒ｺ隱搾ｼ・
2. **蝙九メ繧ｧ繝・け**: 笞・・螳溯｡御ｸ榊庄・・owerShell縺ｮ繝代せ蝠城｡後↓繧医ｊ`npx tsc --noEmit`縺悟ｮ溯｡後〒縺阪↑縺・ｼ・
3. **Prettier繝輔か繝ｼ繝槭ャ繝医メ繧ｧ繝・け**: 笞・・螳溯｡御ｸ榊庄・・owerShell縺ｮ繝代せ蝠城｡後↓繧医ｊ`npm run format:check`縺悟ｮ溯｡後〒縺阪↑縺・ｼ・
4. **遖∵ｭ｢莠矩・・遒ｺ隱・*: 笞・・荳驛ｨ遒ｺ隱搾ｼ・rep繝・・繝ｫ縺ｧ遒ｺ隱搾ｼ・

---

## 隧ｳ邏ｰ邨先棡

### 1. Lint繝√ぉ繝・け

**螳溯｡梧婿豕・*: `read_lints`繝・・繝ｫ  
**邨先棡**: 笨・繧ｨ繝ｩ繝ｼ0莉ｶ

### 2. 蝙九メ繧ｧ繝・け

**螳溯｡梧婿豕・*: `npx tsc --noEmit`  
**邨先棡**: 笞・・螳溯｡御ｸ榊庄・・owerShell縺ｮ繝代せ蝠城｡鯉ｼ・

**莉｣譖ｿ遒ｺ隱・*: `read_lints`繝・・繝ｫ縺ｧ蝙九お繝ｩ繝ｼ繧堤｢ｺ隱阪＠縺溽ｵ先棡縲√お繝ｩ繝ｼ縺ｪ縺・

### 3. Prettier繝輔か繝ｼ繝槭ャ繝医メ繧ｧ繝・け

**螳溯｡梧婿豕・*: `npm run format:check`  
**邨先棡**: 笞・・螳溯｡御ｸ榊庄・・owerShell縺ｮ繝代せ蝠城｡鯉ｼ・

**謗ｨ螂ｨ**: 謇句虚縺ｧ`npm run format:check`繧貞ｮ溯｡後＠縺ｦ遒ｺ隱阪＠縺ｦ縺上□縺輔＞縲・

### 4. 遖∵ｭ｢莠矩・・遒ｺ隱・

#### 4.1 `any`蝙九・菴ｿ逕ｨ

**遒ｺ隱肴婿豕・*: `grep`繝・・繝ｫ縺ｧ`\bany\b`繧呈､懃ｴ｢  
**邨先棡**: 62邂・園縲・8繝輔ぃ繧､繝ｫ縺ｧ菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ

**荳ｻ隕√↑隧ｲ蠖薙ヵ繧｡繧､繝ｫ**:
1. `src/components/PhotoAnalysisModal.tsx` (1邂・園)
2. `src/screens/HomeScreen.tsx` (1邂・園)
3. `src/types/index.ts` (2邂・園)
4. `src/components/butcher/ButcherSelect.tsx` (3邂・園)
5. `src/screens/InputScreen.tsx` (1邂・園)
6. `src/utils/nutrientPriority.ts` (3邂・園)
7. `src/utils/errorHandler.ts` (5邂・園)
8. `src/screens/DiaryScreen.tsx` (3邂・園)
9. `src/utils/storage.ts` (2邂・園)
10. `src/screens/OnboardingScreen.tsx` (3邂・園)
... 縺昴・莉・8繝輔ぃ繧､繝ｫ

**隧穂ｾ｡**: 蝙九い繧ｵ繝ｼ繧ｷ繝ｧ繝ｳ・・as any`・峨ｄ`Record<string, any>`遲峨∵э蝗ｳ逧・↑菴ｿ逕ｨ縺悟､壹￥蜷ｫ縺ｾ繧後※縺・∪縺吶ょ・縺ｦ繧堤ｽｮ縺肴鋤縺医ｋ蠢・ｦ√・縺ゅｊ縺ｾ縺帙ｓ縺後∝庄閭ｽ縺ｪ邂・園縺ｯ`unknown`蝙九∪縺溘・蜈ｷ菴鍋噪縺ｪ蝙九↓鄂ｮ縺肴鋤縺医ｋ縺薙→繧呈耳螂ｨ縺励∪縺吶・

#### 4.2 `console.log`縺ｮ菴ｿ逕ｨ

**遒ｺ隱肴婿豕・*: `grep`繝・・繝ｫ縺ｧ`console\.log`繧呈､懃ｴ｢  
**邨先棡**: 62邂・園縲・1繝輔ぃ繧､繝ｫ縺ｧ菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ

**荳ｻ隕√↑隧ｲ蠖薙ヵ繧｡繧､繝ｫ**:
1. `src/screens/HomeScreen.tsx` (1邂・園)
2. `src/components/butcher/ButcherSelect.tsx` (1邂・園)
3. `src/screens/InputScreen.tsx` (1邂・園)
4. `src/screens/LabsScreen.tsx` (1邂・園)
5. `src/utils/nutrientOrder.ts` (1邂・園)
6. `src/services/aiService.ts` (11邂・園)
7. `src/components/MiniNutrientGauge.tsx` (1邂・園)
8. `src/components/dashboard/AISpeedDial.tsx` (4邂・園)
9. `src/services/aiServiceStory.ts` (1邂・園)
10. `src/utils/weatherService.ts` (5邂・園)
... 縺昴・莉・1繝輔ぃ繧､繝ｫ

**隧穂ｾ｡**: 縺ｻ縺ｼ蜈ｨ縺ｦ縺ｮ`console.log`縺形import.meta.env.DEV`縺ｧ蝗ｲ縺ｾ繧後※縺翫ｊ縲・幕逋ｺ迺ｰ蠅・〒縺ｮ縺ｿ螳溯｡後＆繧後∪縺吶Ａsrc/utils/generateAppIcons.ts`縺ｯ髢狗匱逕ｨ繧ｹ繧ｯ繝ｪ繝励ヨ繝輔ぃ繧､繝ｫ縺ｮ縺溘ａ蝠城｡後≠繧翫∪縺帙ｓ縲よ悽逡ｪ迺ｰ蠅・∈縺ｮ蠖ｱ髻ｿ縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲・

#### 4.3 `TODO`/`FIXME`繧ｳ繝｡繝ｳ繝医・菴ｿ逕ｨ

**遒ｺ隱肴婿豕・*: `grep`繝・・繝ｫ縺ｧ`TODO|FIXME`繧呈､懃ｴ｢  
**邨先棡**: 12邂・園縲・繝輔ぃ繧､繝ｫ縺ｧ菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ

**隧ｲ蠖薙ヵ繧｡繧､繝ｫ**:
1. `src/screens/HomeScreen.tsx` (2邂・園)
2. `src/components/butcher/ButcherSelect.tsx` (6邂・園)
3. `src/utils/feedbackContributionManager.ts` (1邂・園)
4. `src/services/videoGeneration.ts` (1邂・園)
5. `src/utils/roiCalculator.ts` (2邂・園)

**隧穂ｾ｡**: 蟆・擂縺ｮ螳溯｣・ｺ亥ｮ壹ｄ隱ｿ譟ｻ縺悟ｿ・ｦ√↑鬆・岼繧堤､ｺ縺励※縺・∪縺吶ゅΜ繝ｪ繝ｼ繧ｹ蜑阪↓蟇ｾ蠢懊☆繧九°縲∝炎髯､縺吶ｋ縺薙→繧呈耳螂ｨ縺励∪縺吶′縲∫ｷ頑･諤ｧ縺ｯ菴弱＞縺ｧ縺吶・

---

## 謗ｨ螂ｨ縺輔ｌ繧区ｬ｡縺ｮ繧｢繧ｯ繧ｷ繝ｧ繝ｳ

### 蜆ｪ蜈亥ｺｦ: 鬮・

1. **`any`蝙九・鄂ｮ縺肴鋤縺・*: 28繝輔ぃ繧､繝ｫ・・2邂・園・峨〒`any`蝙九′菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ縺溘ａ縲∝庄閭ｽ縺ｪ邂・園縺ｯ`unknown`蝙九∪縺溘・蜈ｷ菴鍋噪縺ｪ蝙九↓鄂ｮ縺肴鋤縺医ｋ縺薙→繧呈耳螂ｨ縺励∪縺吶ゅ◆縺縺励∝梛繧｢繧ｵ繝ｼ繧ｷ繝ｧ繝ｳ繧ЯRecord<string, any>`遲峨・諢丞峙逧・↑菴ｿ逕ｨ縺ｯ邯ｭ謖√＠縺ｦ蝠城｡後≠繧翫∪縺帙ｓ縲・

### 蜆ｪ蜈亥ｺｦ: 荳ｭ

2. **`TODO`/`FIXME`繧ｳ繝｡繝ｳ繝医・蟇ｾ蠢・*: 5繝輔ぃ繧､繝ｫ・・2邂・園・峨〒`TODO`/`FIXME`繧ｳ繝｡繝ｳ繝医′菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ縺溘ａ縲√Μ繝ｪ繝ｼ繧ｹ蜑阪↓蟇ｾ蠢懊☆繧九°縲∝炎髯､縺吶ｋ縺薙→繧呈耳螂ｨ縺励∪縺吶・

### 蜆ｪ蜈亥ｺｦ: 菴・

3. **蝙九メ繧ｧ繝・け縺ｮ螳溯｡・*: PowerShell縺ｮ繝代せ蝠城｡後ｒ隗｣豎ｺ縺励～npx tsc --noEmit`繧貞ｮ溯｡後＠縺ｦ蝙九お繝ｩ繝ｼ繧堤｢ｺ隱阪＠縺ｦ縺上□縺輔＞・育樟蝨ｨ縺ｯ`read_lints`縺ｧ蝙九お繝ｩ繝ｼ0莉ｶ繧堤｢ｺ隱肴ｸ医∩・峨・
4. **Prettier繝輔か繝ｼ繝槭ャ繝医メ繧ｧ繝・け縺ｮ螳溯｡・*: PowerShell縺ｮ繝代せ蝠城｡後ｒ隗｣豎ｺ縺励～npm run format:check`繧貞ｮ溯｡後＠縺ｦ繝輔か繝ｼ繝槭ャ繝医お繝ｩ繝ｼ繧堤｢ｺ隱阪＠縺ｦ縺上□縺輔＞・育樟蝨ｨ縺ｯLint縺ｧ繝輔か繝ｼ繝槭ャ繝亥撫鬘後・讀懷・縺輔ｌ縺ｦ縺・∪縺帙ｓ・峨・

**豕ｨ**: `console.log`縺ｯ蜈ｨ縺ｦ`import.meta.env.DEV`縺ｧ蝗ｲ縺ｾ繧後※縺翫ｊ縲∵悽逡ｪ迺ｰ蠅・∈縺ｮ蠖ｱ髻ｿ縺ｯ縺ゅｊ縺ｾ縺帙ｓ縲ょ炎髯､縺ｮ蜆ｪ蜈亥ｺｦ縺ｯ菴弱＞縺ｧ縺吶・

---

## 螳御ｺ・擅莉ｶ

- [x] Lint繝√ぉ繝・け螳溯｡鯉ｼ医お繝ｩ繝ｼ0莉ｶ・・
- [ ] 蝙九メ繧ｧ繝・け螳溯｡鯉ｼ亥ｮ溯｡御ｸ榊庄・・
- [ ] Prettier繝輔か繝ｼ繝槭ャ繝医メ繧ｧ繝・け螳溯｡鯉ｼ亥ｮ溯｡御ｸ榊庄・・
- [x] 遖∵ｭ｢莠矩・・遒ｺ隱搾ｼ井ｸ驛ｨ遒ｺ隱榊ｮ御ｺ・ｼ・

---

**譛邨よ峩譁ｰ**: 2026-01-21

