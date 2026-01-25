# 繝輔ぅ繝ｼ繝峨ヰ繝・け騾∽ｿ｡・・8n webhook・芽ｨｭ螳・

## 騾∽ｿ｡莉墓ｧ假ｼ医い繝励Μ蜀・Κ・・

- **Method**: POST  
- **Headers**: `Content-Type: application/json`  
- **Body**: `{ "feedback": "蜈･蜉帙ユ繧ｭ繧ｹ繝・ }`

螳溯｣・・ `src/components/common/FeedbackDialog.tsx` 縺ｫ縺ゅｊ縺ｾ縺吶・

---

## 縺ｪ縺懊・api/feedback縲咲ｵ檎罰縺ｪ縺ｮ縺具ｼ郁ｦ壹∴縺ｪ縺上※OK・・

繝悶Λ繧ｦ繧ｶ縺九ｉ `https://...n8n.cloud/...` 繧堤峩謗･蜿ｩ縺上→ **CORS** 縺ｧ螟ｱ謨励＠縺ｾ縺吶・ 
縺ｪ縺ｮ縺ｧ繧｢繝励Μ縺ｯ **蜷御ｸ繧ｪ繝ｪ繧ｸ繝ｳ** 縺ｮ `POST /api/feedback` 縺ｫ騾∽ｿ｡縺励√し繝ｼ繝仙・縺ｧn8n縺ｸ荳ｭ邯吶＠縺ｾ縺吶・

- **髢狗匱・・ite・・*: `vite.config.ts` 縺ｮ `server.proxy` 縺系8n縺ｸ荳ｭ邯・
- **譛ｬ逡ｪ・・etlify・・*: `netlify.toml` 縺ｮ redirect 縺系8n縺ｸ荳ｭ邯・

---

## 騾∽ｿ｡蜈・RL縺ｮ螟画峩・亥ｿ・ｦ√↓縺ｪ縺｣縺滓凾縺縺托ｼ・

莉･荳九＞縺壹ｌ縺九・迺ｰ蠅・､画焚縺ｧ荳頑嶌縺阪〒縺阪∪縺吶・

- **Web・・ite・画耳螂ｨ**: `VITE_N8N_WEBHOOK_URL`
- **莠呈鋤逕ｨ・・xpo諠ｳ螳夲ｼ・*: `EXPO_PUBLIC_N8N_WEBHOOK_URL`

萓具ｼ医←縺｡繧峨°迚・婿縺ｧOK・・

```bash
VITE_N8N_WEBHOOK_URL=https://sibuektu.app.n8n.cloud/webhook/feedback
```

```bash
EXPO_PUBLIC_N8N_WEBHOOK_URL=https://sibuektu.app.n8n.cloud/webhook/feedback
```

窶ｻ `.env` / `.env.local` 縺ｫ譖ｸ縺・※縲・幕逋ｺ繧ｵ繝ｼ繝舌ｒ蜀崎ｵｷ蜍輔＠縺ｦ縺上□縺輔＞縲・

---

## 繝・ヵ繧ｩ繝ｫ繝・

迺ｰ蠅・､画焚縺梧悴險ｭ螳壹・蝣ｴ蜷医√ョ繝輔か繝ｫ繝医・ `https://sibuektu.app.n8n.cloud/webhook/feedback` 縺ｧ縺吶・

---

## 騾∽ｿ｡縺・04縺ｫ縺ｪ繧句ｴ蜷茨ｼ・8n蛛ｴ縺ｮ迥ｶ諷具ｼ・

莉･荳九・繧医≧縺ｪ繝｡繝・そ繝ｼ繧ｸ縺瑚ｿ斐ｋ蝣ｴ蜷医・*n8n蛛ｴ縺ｧ繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ縺窟ctive縺ｫ縺ｪ縺｣縺ｦ縺・∪縺帙ｓ**縲・

- `The workflow must be active for a production URL to run successfully`

蟇ｾ蜃ｦ・・
- n8n縺ｧ隧ｲ蠖薙Ρ繝ｼ繧ｯ繝輔Ο繝ｼ繧帝幕縺阪∝承荳翫・繝医げ繝ｫ縺ｧ **Active** 縺ｫ縺励※縺上□縺輔＞縲・

---

## 騾∽ｿ｡縺・00縺ｫ縺ｪ繧句ｴ蜷茨ｼ磯幕逋ｺ繧ｵ繝ｼ繝・荳ｭ邯吝・縺ｮ迥ｶ諷具ｼ・

DevTools縺ｮNetwork縺ｧ `api/feedback` 縺ｮ **Response縺粂TML**・・Internal Server Error`・峨↓縺ｪ縺｣縺ｦ縺・ｋ蝣ｴ蜷医・縲］8n縺ｧ縺ｯ縺ｪ縺・**髢狗匱繧ｵ繝ｼ繝撰ｼ・ite・峨・荳ｭ邯呻ｼ・roxy・峨′關ｽ縺｡縺ｦ縺・∪縺・*縲・

蟇ｾ蜃ｦ・医←繧後°1縺､縺ｧOK・・
- 繝壹・繧ｸ繧貞・隱ｭ縺ｿ霎ｼ縺ｿ・・Ctrl+F5`・・
- 髢狗匱繧ｵ繝ｼ繝舌ｒ蜀崎ｵｷ蜍包ｼ・npm run dev`・・



