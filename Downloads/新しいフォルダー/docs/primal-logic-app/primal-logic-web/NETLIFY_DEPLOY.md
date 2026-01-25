# Netlify繝・・繝ｭ繧､謇矩・

## 繝薙Ν繝峨さ繝槭Φ繝・

```bash
npm run build
```

## 蜈ｬ髢九ョ繧｣繝ｬ繧ｯ繝医Μ

```
dist
```

## Netlify險ｭ螳壹ヵ繧｡繧､繝ｫ

`netlify.toml`縺梧里縺ｫ蟄伜惠縺励∪縺呻ｼ・

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "20"
```

## 迺ｰ蠅・､画焚

Netlify縺ｮ繝繝・す繝･繝懊・繝峨〒莉･荳九・迺ｰ蠅・､画焚繧定ｨｭ螳壹＠縺ｦ縺上□縺輔＞・・

- `VITE_GEMINI_API_KEY`: Gemini API繧ｭ繝ｼ・・I繝√Ε繝・ヨ讖溯・逕ｨ・・
- `VITE_SUPABASE_URL`: Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase ANON KEY
- `VITE_REPLICATE_API_TOKEN`: Replicate API繝医・繧ｯ繝ｳ・育判蜒冗函謌千畑縲√が繝励す繝ｧ繝ｳ・・

## 繝・・繝ｭ繧､譁ｹ豕・

1. Netlify縺ｫ繝ｭ繧ｰ繧､繝ｳ
2. 譁ｰ縺励＞繧ｵ繧､繝医ｒ菴懈・
3. Git繝ｪ繝昴ず繝医Μ繧呈磁邯・
4. 繝薙Ν繝芽ｨｭ螳夲ｼ・
   - **繝薙Ν繝峨さ繝槭Φ繝・*: `npm run build`
   - **蜈ｬ髢九ョ繧｣繝ｬ繧ｯ繝医Μ**: `dist`
5. 迺ｰ蠅・､画焚繧定ｨｭ螳・
6. 繝・・繝ｭ繧､

## 豕ｨ諢丈ｺ矩・

- `dist`繝輔か繝ｫ繝縺ｯ`.gitignore`縺ｫ蜷ｫ縺ｾ繧後※縺・ｋ縺溘ａ縲；it縺ｫ縺ｯ繧ｳ繝溘ャ繝医＆繧後∪縺帙ｓ
- Netlify縺瑚・蜍慕噪縺ｫ繝薙Ν繝峨＠縺ｦ繝・・繝ｭ繧､縺励∪縺・
- SPA・・ingle Page Application・峨・縺溘ａ縲～netlify.toml`縺ｧ繝ｪ繝繧､繝ｬ繧ｯ繝郁ｨｭ螳壹′蠢・ｦ√〒縺・

