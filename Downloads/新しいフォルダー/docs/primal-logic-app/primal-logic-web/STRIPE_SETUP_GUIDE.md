# Stripe螳溯｣・ｮ悟・繧ｬ繧､繝・

## 讎りｦ・

縺薙・繧ｬ繧､繝峨〒縺ｯ縲￣rimal Logic Web繧｢繝励Μ縺ｫStripe豎ｺ貂域ｩ溯・繧貞ｮ溯｣・☆繧区焔鬆・ｒ隱ｬ譏弱＠縺ｾ縺吶・

## 螳溯｣・ｸ医∩讖溯・

- **繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ豎ｺ貂・* (`PaywallScreen.tsx`): 譛磯｡阪・蟷ｴ鬘阪・繝ｩ繝ｳ
- **繝ｯ繝ｳ繧ｿ繧､繝豎ｺ貂・* (`ShopScreen.tsx`, `GiftScreen.tsx`): 繧｢繧､繝・Β雉ｼ蜈･繝ｻ繧ｮ繝輔ヨ讖溯・
- **Webhook蜃ｦ逅・*: 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ迥ｶ諷九・閾ｪ蜍募酔譛・

---

## 1. Stripe繧｢繧ｫ繧ｦ繝ｳ繝郁ｨｭ螳・

### 1.1 Stripe繧｢繧ｫ繧ｦ繝ｳ繝井ｽ懈・

1. **[Stripe](https://stripe.com/)** 縺ｫ繧｢繧ｯ繧ｻ繧ｹ
2. 繧｢繧ｫ繧ｦ繝ｳ繝医ｒ菴懈・・医ユ繧ｹ繝医Δ繝ｼ繝峨〒髢句ｧ句庄閭ｽ・・
3. 繝繝・す繝･繝懊・繝峨↓繝ｭ繧ｰ繧､繝ｳ

### 1.2 蝠・刀繝ｻ萓｡譬ｼ縺ｮ菴懈・

#### 譛磯｡阪・繝ｩ繝ｳ

1. Stripe繝繝・す繝･繝懊・繝・竊・**Products** 竊・**Add product**
2. 蝠・刀諠・ｱ繧貞・蜉・
   - **Name**: `CarnivOS - Monthly Subscription`
   - **Description**: `Monthly access to CarnivOS premium features`
   - **Pricing**: `Recurring` 竊・`Monthly` 竊・`$9.99 USD`
3. **Save** 繧偵け繝ｪ繝・け
4. **Price ID** 繧偵さ繝斐・・・price_...`縺ｧ蟋九∪繧具ｼ俄・ `STRIPE_PRICE_ID_MONTHLY` 縺ｫ菴ｿ逕ｨ

#### 蟷ｴ鬘阪・繝ｩ繝ｳ

1. 蜷後§蝠・刀縺ｫ譁ｰ縺励＞萓｡譬ｼ繧定ｿｽ蜉:
   - **Add another price**
   - **Pricing**: `Recurring` 竊・`Yearly` 竊・`$69.99 USD`
2. **Save** 繧偵け繝ｪ繝・け
3. **Price ID** 繧偵さ繝斐・・・price_...`縺ｧ蟋九∪繧具ｼ俄・ `STRIPE_PRICE_ID_YEARLY` 縺ｫ菴ｿ逕ｨ

---

## 2. 迺ｰ蠅・､画焚縺ｮ險ｭ螳・

### 2.1 繝輔Ο繝ｳ繝医お繝ｳ繝臥腸蠅・､画焚 (`.env`)

繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医・ `.env` 繝輔ぃ繧､繝ｫ縺ｫ莉･荳九ｒ霑ｽ蜉:

```env
# Stripe蜈ｬ髢九く繝ｼ・医ヵ繝ｭ繝ｳ繝医お繝ｳ繝臥畑・・
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...・医ユ繧ｹ繝医Δ繝ｼ繝会ｼ・
# 縺ｾ縺溘・
VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...・域悽逡ｪ繝｢繝ｼ繝会ｼ・
```

**蜿門ｾ玲婿豕・*:
1. Stripe繝繝・す繝･繝懊・繝・竊・**Developers** 竊・**API keys**
2. **Publishable key** 繧偵さ繝斐・

### 2.2 Firebase Functions迺ｰ蠅・､画焚

Firebase Functions v2縺ｧ縺ｯ縲：irebase Console縺ｧ迺ｰ蠅・､画焚繧定ｨｭ螳壹＠縺ｾ縺・

1. Firebase Console 竊・**Functions** 竊・**Config** 竊・**Environment variables**
2. 莉･荳九・迺ｰ蠅・､画焚繧定ｿｽ蜉:
   - `STRIPE_SECRET_KEY`: Stripe遘伜ｯ・く繝ｼ・・sk_test_...` 縺ｾ縺溘・ `sk_live_...`・・
   - `STRIPE_PRICE_ID_MONTHLY`: 譛磯｡堺ｾ｡譬ｼID・・price_...`・・
   - `STRIPE_PRICE_ID_YEARLY`: 蟷ｴ鬘堺ｾ｡譬ｼID・・price_...`・・
   - `STRIPE_WEBHOOK_SECRET`: Webhook繧ｷ繝ｼ繧ｯ繝ｬ繝・ヨ・亥ｾ瑚ｿｰ縲～whsec_...`・・

**豕ｨ諢・*: Firebase Functions v2縺ｧ縺ｯ縲～firebase functions:config:set`縺ｯ菴ｿ逕ｨ縺励∪縺帙ｓ縲・irebase Console縺ｧ逶ｴ謗･險ｭ螳壹＠縺ｦ縺上□縺輔＞縲・

---

## 3. Firebase Functions縺ｮ繝・・繝ｭ繧､

### 3.1 萓晏ｭ倬未菫ゅ・繧､繝ｳ繧ｹ繝医・繝ｫ

```bash
cd functions
npm install
```

### 3.2 繝薙Ν繝・

```bash
npm run build
```

### 3.3 繝・・繝ｭ繧､

```bash
# 繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医°繧・
firebase deploy --only functions
```

---

## 4. Stripe Webhook險ｭ螳・

### 4.1 Webhook繧ｨ繝ｳ繝峨・繧､繝ｳ繝医・菴懈・

1. Stripe繝繝・す繝･繝懊・繝・竊・**Developers** 竊・**Webhooks**
2. **Add endpoint** 繧偵け繝ｪ繝・け
3. **Endpoint URL** 繧貞・蜉・
   ```
   https://us-central1-<YOUR_PROJECT_ID>.cloudfunctions.net/stripeWebhook
   ```
   ・・<YOUR_PROJECT_ID>` 縺ｯFirebase繝励Ο繧ｸ繧ｧ繧ｯ繝・D・・
4. **Events to send** 繧帝∈謚・
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. **Add endpoint** 繧偵け繝ｪ繝・け
6. **Signing secret** 繧偵さ繝斐・・・whsec_...`縺ｧ蟋九∪繧具ｼ俄・ `STRIPE_WEBHOOK_SECRET` 縺ｫ險ｭ螳・

### 4.2 Webhook繧ｷ繝ｼ繧ｯ繝ｬ繝・ヨ縺ｮ險ｭ螳・

1. Firebase Console 竊・**Functions** 竊・**Config** 竊・**Environment variables**
2. `STRIPE_WEBHOOK_SECRET` 迺ｰ蠅・､画焚繧定ｿｽ蜉・亥､: `whsec_...`・・
3. 蜀榊ｺｦ繝・・繝ｭ繧､:

```bash
firebase deploy --only functions
```

---

## 5. 蜍穂ｽ懃｢ｺ隱・

### 5.1 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ豎ｺ貂医ユ繧ｹ繝・

1. 繧｢繝励Μ繧定ｵｷ蜍・
2. **PaywallScreen** 縺ｫ繧｢繧ｯ繧ｻ繧ｹ
3. 譛磯｡阪∪縺溘・蟷ｴ鬘阪・繝ｩ繝ｳ繧帝∈謚・
4. **Start 7-Day Free Trial** 繧偵け繝ｪ繝・け
5. Stripe Checkout繝壹・繧ｸ縺ｫ繝ｪ繝繧､繝ｬ繧ｯ繝医＆繧後ｋ縺薙→繧堤｢ｺ隱・
6. 繝・せ繝医き繝ｼ繝峨〒豎ｺ貂・
   - **繧ｫ繝ｼ繝臥分蜿ｷ**: `4242 4242 4242 4242`
   - **譛牙柑譛滄剞**: 莉ｻ諢上・譛ｪ譚･縺ｮ譌･莉・
   - **CVC**: 莉ｻ諢上・3譯・
   - **驛ｵ萓ｿ逡ｪ蜿ｷ**: 莉ｻ諢上・5譯・

### 5.2 繝ｯ繝ｳ繧ｿ繧､繝豎ｺ貂医ユ繧ｹ繝・

1. **ShopScreen** 縺ｾ縺溘・ **GiftScreen** 縺ｫ繧｢繧ｯ繧ｻ繧ｹ
2. 繧｢繧､繝・Β繧定ｳｼ蜈･
3. Stripe Checkout繝壹・繧ｸ縺ｫ繝ｪ繝繧､繝ｬ繧ｯ繝医＆繧後ｋ縺薙→繧堤｢ｺ隱・
4. 繝・せ繝医き繝ｼ繝峨〒豎ｺ貂・

### 5.3 Webhook蜍穂ｽ懃｢ｺ隱・

1. Stripe繝繝・す繝･繝懊・繝・竊・**Developers** 竊・**Webhooks**
2. 菴懈・縺励◆繧ｨ繝ｳ繝峨・繧､繝ｳ繝医ｒ繧ｯ繝ｪ繝・け
3. **Recent events** 縺ｧ繧､繝吶Φ繝医′蜿嶺ｿ｡縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・
4. Firebase Console 竊・**Firestore** 縺ｧ `subscriptions` 繧ｳ繝ｬ繧ｯ繧ｷ繝ｧ繝ｳ縺ｫ繝・・繧ｿ縺御ｿ晏ｭ倥＆繧後※縺・ｋ縺薙→繧堤｢ｺ隱・

---

## 6. 譛ｬ逡ｪ迺ｰ蠅・∈縺ｮ遘ｻ陦・

### 6.1 Stripe譛ｬ逡ｪ繝｢繝ｼ繝峨∈縺ｮ蛻・ｊ譖ｿ縺・

1. Stripe繝繝・す繝･繝懊・繝峨〒 **Activate live mode** 繧偵け繝ｪ繝・け
2. **Live** 繧ｭ繝ｼ繧貞叙蠕・
   - **Publishable key** (譛ｬ逡ｪ)
   - **Secret key** (譛ｬ逡ｪ)
3. 迺ｰ蠅・､画焚繧呈峩譁ｰ:
   - `.env` 繝輔ぃ繧､繝ｫ: `VITE_STRIPE_PUBLISHABLE_KEY=pk_live_...`
   - Firebase Console 竊・**Functions** 竊・**Config**: `STRIPE_SECRET_KEY=sk_live_...`
4. 譛ｬ逡ｪ逕ｨ縺ｮ蝠・刀繝ｻ萓｡譬ｼ繧剃ｽ懈・・医ユ繧ｹ繝医Δ繝ｼ繝峨→縺ｯ蛻･・・
5. 譛ｬ逡ｪ逕ｨ縺ｮWebhook繧ｨ繝ｳ繝峨・繧､繝ｳ繝医ｒ菴懈・
6. 蜀榊ｺｦ繝・・繝ｭ繧､

---

## 7. 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### 繧ｨ繝ｩ繝ｼ: "Stripe price ID not configured"

**蜴溷屏**: Firebase Functions縺ｮ迺ｰ蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・↑縺・

**隗｣豎ｺ譁ｹ豕・*:
1. Firebase Console 竊・**Functions** 竊・**Config** 竊・**Environment variables**
2. `STRIPE_PRICE_ID_MONTHLY` 縺ｨ `STRIPE_PRICE_ID_YEARLY` 繧定ｨｭ螳・
3. 蜀榊ｺｦ繝・・繝ｭ繧､:
   ```bash
   firebase deploy --only functions
   ```

### 繧ｨ繝ｩ繝ｼ: "Webhook signature verification failed"

**蜴溷屏**: Webhook繧ｷ繝ｼ繧ｯ繝ｬ繝・ヨ縺梧ｭ｣縺励￥險ｭ螳壹＆繧後※縺・↑縺・

**隗｣豎ｺ譁ｹ豕・*:
1. Stripe繝繝・す繝･繝懊・繝峨〒Webhook縺ｮ **Signing secret** 繧堤｢ｺ隱・
2. Firebase Console 竊・**Functions** 竊・**Config** 竊・**Environment variables**
3. `STRIPE_WEBHOOK_SECRET` 迺ｰ蠅・､画焚繧呈峩譁ｰ・亥､: `whsec_...`・・
4. 蜀榊ｺｦ繝・・繝ｭ繧､:
   ```bash
   firebase deploy --only functions
   ```

### 繧ｨ繝ｩ繝ｼ: "User must be authenticated"

**蜴溷屏**: Firebase Auth縺瑚ｨｭ螳壹＆繧後※縺・↑縺・√∪縺溘・蛹ｿ蜷崎ｪ崎ｨｼ縺悟､ｱ謨・

**隗｣豎ｺ譁ｹ豕・*:
1. `firebaseClient.ts` 縺ｧFirebase險ｭ螳壹ｒ遒ｺ隱・
2. `.env` 縺ｫFirebase險ｭ螳壹′蜷ｫ縺ｾ繧後※縺・ｋ縺薙→繧堤｢ｺ隱・

---

## 8. 螳溯｣・ヵ繧｡繧､繝ｫ荳隕ｧ

### 譁ｰ隕丈ｽ懈・
- `functions/package.json`
- `functions/tsconfig.json`
- `functions/src/index.ts`
- `functions/.gitignore`

### 菫ｮ豁｣
- `package.json` (Stripe SDK霑ｽ蜉)
- `index.html` (Stripe.js隱ｭ縺ｿ霎ｼ縺ｿ)
- `src/screens/ShopScreen.tsx` (Firebase Functions蜻ｼ縺ｳ蜃ｺ縺・
- `src/screens/GiftScreen.tsx` (Firebase Functions蜻ｼ縺ｳ蜃ｺ縺・

---

## 9. 蜿り・Μ繝ｳ繧ｯ

- [Stripe蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝・(https://stripe.com/docs)
- [Firebase Functions蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝・(https://firebase.google.com/docs/functions)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Stripe Webhooks](https://stripe.com/docs/webhooks)

