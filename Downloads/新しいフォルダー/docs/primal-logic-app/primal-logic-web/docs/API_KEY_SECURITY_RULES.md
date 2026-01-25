# API繧ｭ繝ｼ蜿悶ｊ謇ｱ縺・Ν繝ｼ繝ｫ・・arnivOS・・

## 邨占ｫ・

- **Vite縺ｮ `VITE_` 縺ｧ蟋九∪繧狗腸蠅・､画焚縺ｯ縲√ヵ繝ｭ繝ｳ繝茨ｼ医ヶ繝ｩ繧ｦ繧ｶ・峨↓蝓九ａ霎ｼ縺ｾ繧後ｋ**縺溘ａ縲・*遘伜ｯ・嵯繧貞・繧後※縺ｯ縺・￠縺ｾ縺帙ｓ**縲・
- **API繧ｭ繝ｼ縺ｯ繧ｵ繝ｼ繝仙・・・etlify Functions / n8n / Cloud Functions 遲会ｼ峨↓鄂ｮ縺・*縺ｮ縺梧ｭ｣隗｣縺ｧ縺吶・

---

## 1) 窶懊ヵ繝ｭ繝ｳ繝医↓蜃ｺ繧銀・縺ｨ縺ｯ

### 繝輔Ο繝ｳ繝茨ｼ・G・・
- 繝悶Λ繧ｦ繧ｶ縺ｧ蜍輔￥JavaScript・・eb迚医・UI・・
- 遶ｯ譛ｫ蜀・〒蜍輔￥繧｢繝励Μ・医Δ繝舌う繝ｫ・・

縺薙％縺ｫAPI繧ｭ繝ｼ繧貞・繧後ｋ縺ｨ縲・*繝ｦ繝ｼ繧ｶ繝ｼ繧・ｬｬ荳芽・′蜿門ｾ励〒縺阪ｋ蜑肴署**縺ｫ縺ｪ繧翫∪縺吶・

### 繧ｵ繝ｼ繝撰ｼ・K・・
- Netlify Functions
- n8n
- Firebase Functions / Cloud Run 縺ｪ縺ｩ

縺薙％縺ｫ鄂ｮ縺・◆迺ｰ蠅・､画焚・井ｾ具ｼ啻process.env.GEMINI_API_KEY`・峨・縲・*繝悶Λ繧ｦ繧ｶ縺ｫ驟榊ｸ・＆繧後∪縺帙ｓ**縲・

---

## 2) 遖∵ｭ｢莠矩・ｼ育ｵｶ蟇ｾ・・

- **`VITE_*` 縺ｫ遘伜ｯ・嵯繧貞・繧後ｋ**
  - 萓具ｼ啻VITE_GEMINI_API_KEY` / `VITE_FIREBASE_API_KEY` 縺ｪ縺ｩ
- **Git縺ｫ遘伜ｯ・嵯繧偵さ繝溘ャ繝医☆繧・*
  - `.env` / `.env.local` / `.pem` / `credentials.json` / API繧ｭ繝ｼ譁・ｭ怜・ 縺ｪ縺ｩ
- **繝√Ε繝・ヨ/繧ｹ繧ｯ繧ｷ繝ｧ縺ｫAPI繧ｭ繝ｼ譛ｬ譁・ｒ雋ｼ繧・*

---

## 3) 謗ｨ螂ｨ縺吶ｋ讒区・・・eb・・

### 繝輔Ο繝ｳ繝・
- `/api/gemini` 縺ｮ繧医≧縺ｪ **閾ｪ蛻・・繧ｨ繝ｳ繝峨・繧､繝ｳ繝・*繧貞娼縺上□縺托ｼ医く繝ｼ縺ｯ謖√◆縺ｪ縺・ｼ・

### 繧ｵ繝ｼ繝撰ｼ・etlify・・
- `netlify/functions/gemini.cjs` 縺・`process.env.GEMINI_API_KEY` 縺ｧGemini API繧貞他縺ｶ
- Netlify縺ｮ迺ｰ蠅・､画焚縺ｫ **`GEMINI_API_KEY`** 繧定ｨｭ螳夲ｼ・VITE_`縺ｯ莉倥￠縺ｪ縺・ｼ・

---

## 4) 窶懈ｼ上ｌ縺溪昴→蛻､譁ｭ縺励◆譎ゅ・謇矩・ｼ医Ο繝ｼ繝・・繧ｷ繝ｧ繝ｳ・・

1. **譁ｰ縺励＞繧ｭ繝ｼ繧剃ｽ懈・**
2. 菴ｿ縺｣縺ｦ縺・ｋ蝣ｴ謇・・8n/Netlify遲会ｼ峨ｒ **譁ｰ繧ｭ繝ｼ縺ｫ蟾ｮ縺玲崛縺・*
3. 蜍穂ｽ懃｢ｺ隱・
4. **蜿､縺・く繝ｼ繧貞炎髯､・・isable/蜑企勁・・*

窶ｻ蜈医↓蜑企勁縺吶ｋ縺ｨ縲√←縺薙′螢翫ｌ縺溘°蛻・°繧峨↑縺上↑繧翫∪縺吶・

---

## 5) 繝ｪ繝ｪ繝ｼ繧ｹ蜑阪そ繝ｫ繝輔メ繧ｧ繝・け・域怙遏ｭ・・

### A. 繧ｳ繝ｼ繝画､懃ｴ｢・域耳螂ｨ・・

- `VITE_GEMINI_API_KEY` 縺ｮ蜿ら・縺檎┌縺・％縺ｨ
- `AIza...`・・oogle API Key縺｣縺ｽ縺・枚蟄怜・・峨′辟｡縺・％縺ｨ
- `sk-...`・・penAI縺｣縺ｽ縺・枚蟄怜・・峨′辟｡縺・％縺ｨ

萓具ｼ・owerShell / bash 蜈ｱ騾壹・繧､繝｡繝ｼ繧ｸ・・
- `rg "VITE_.*KEY|AIza[0-9A-Za-z\\-_]{30,}|sk-[0-9A-Za-z]{20,}" src`

#### Windows縺ｧ `rg` 縺檎┌縺・ｴ蜷茨ｼ・owerShell・・

繝励Ο繧ｸ繧ｧ繧ｯ繝育峩荳九〒:

- `Get-ChildItem -Recurse -File src | Select-String -Pattern "VITE_.*(KEY|TOKEN|SECRET)"`
- `Get-ChildItem -Recurse -File . | Select-String -Pattern "AIza[0-9A-Za-z\\-_]{20,}"`
- `Get-ChildItem -Recurse -File . | Select-String -Pattern "sk-[0-9A-Za-z]{20,}"`

### B. Git繝√ぉ繝・け

- `.env` / `.env.local` 縺携it邂｡逅・＆繧後※縺・↑縺・％縺ｨ・・.gitignore`縺ｫ蜈･縺｣縺ｦ縺・ｋ縺薙→・・

---

## 6) 萓句､厄ｼ・irebase遲会ｼ・

Firebase縺ｮ荳驛ｨ繧ｭ繝ｼ縺ｯ縲悟・髢九＆繧後ｋ縺薙→縺悟燕謠舌阪・險ｭ險医ｂ縺ゅｊ縺ｾ縺吶′縲・*窶懷・髢軌K=辟｡蛻ｶ髯舌↓蜿ｩ縺九ｌ縺ｦOK窶昴〒縺ｯ縺ｪ縺・*縺ｮ縺ｧ縲∝ｿ・★莉･荳九ｒ菴ｵ逕ｨ縺励∪縺吶・

- 繝峨Γ繧､繝ｳ蛻ｶ髯・
- 繝ｫ繝ｼ繝ｫ・・irestore/Storage rules・・
- 莠育ｮ励い繝ｩ繝ｼ繝・


