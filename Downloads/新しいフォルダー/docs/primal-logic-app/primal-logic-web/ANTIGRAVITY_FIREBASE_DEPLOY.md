# Firebase Functions繝・・繝ｭ繧､ - Antigravity逕ｨ繝励Ο繝ｳ繝励ヨ

## 迥ｶ豕・
繝代せ縺ｮ譁・ｭ励お繝ｳ繧ｳ繝ｼ繝・ぅ繝ｳ繧ｰ縺ｮ蝠城｡後〒縲，ursor縺ｮ繧ｿ繝ｼ繝溘リ繝ｫ縺九ｉ逶ｴ謗･螳溯｡後〒縺阪∪縺帙ｓ縺ｧ縺励◆縲・
Antigravity縺ｧ螳溯｡後＠縺ｦ縺上□縺輔＞縲・

## 菴懈･ｭ蜀・ｮｹ

### 1. functions繝・ぅ繝ｬ繧ｯ繝医Μ縺ｮ萓晏ｭ倬未菫ら｢ｺ隱・

```powershell
cd functions
npm list stripe
```

Stripe縺後う繝ｳ繧ｹ繝医・繝ｫ縺輔ｌ縺ｦ縺・↑縺・ｴ蜷医・・・

```powershell
npm install
```

### 2. functions繝・ぅ繝ｬ繧ｯ繝医Μ縺ｮ繝薙Ν繝・

```powershell
cd functions
npm run build
```

`lib`繝輔か繝ｫ繝縺御ｽ懈・縺輔ｌ繧後・謌仙粥縺ｧ縺吶・

### 3. Firebase Functions縺ｮ繝・・繝ｭ繧､

繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝茨ｼ・primal-logic-web`・峨°繧会ｼ・

```powershell
firebase deploy --only functions
```

**豕ｨ諢・*: Firebase縺ｫ繝ｭ繧ｰ繧､繝ｳ縺励※縺・↑縺・ｴ蜷医・・・

```powershell
firebase login
```

### 4. 繝・・繝ｭ繧､邨先棡縺ｮ遒ｺ隱・

繝・・繝ｭ繧､縺梧・蜉溘＠縺溘ｉ縲∽ｻ･荳九′陦ｨ遉ｺ縺輔ｌ縺ｾ縺呻ｼ・

```
笨・ functions[createStripeCheckoutSession(us-central1)] Successful create operation.
笨・ functions[createCheckoutSession(us-central1)] Successful create operation.
笨・ functions[stripeWebhook(us-central1)] Successful create operation.
```

### 5. 螳溯｡悟ｾ後・蝣ｱ蜻・

繝・・繝ｭ繧､縺梧・蜉溘＠縺溘ｉ縲∽ｻ･荳九ｒ蝣ｱ蜻翫＠縺ｦ縺上□縺輔＞・・
- 笨・Firebase Functions縺ｮ繝・・繝ｭ繧､螳御ｺ・
- 笨・谺｡縺ｮ繧ｹ繝・ャ繝暦ｼ售tripe Webhook險ｭ螳夲ｼ亥ｾ後〒・・

繝・・繝ｭ繧､縺悟､ｱ謨励＠縺溘ｉ縲√お繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ繧貞ｱ蜻翫＠縺ｦ縺上□縺輔＞縲・

---

## 莠句燕遒ｺ隱堺ｺ矩・

繝・・繝ｭ繧､蜑阪↓縲∽ｻ･荳九′險ｭ螳壹＆繧後※縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ・

1. 笨・Firebase Console縺ｧ迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・ｋ・・
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PRICE_ID_MONTHLY`
   - `STRIPE_PRICE_ID_YEARLY`

2. 笨・`firebase.json`縺悟ｭ伜惠縺吶ｋ・井ｽ懈・貂医∩・・

3. 笨・`functions/package.json`縺ｫ`stripe`縺悟性縺ｾ繧後※縺・ｋ

