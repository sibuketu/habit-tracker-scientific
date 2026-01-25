# Netlify閾ｪ蜍輔ョ繝励Ο繧､險ｭ螳壽焔鬆・

## 讎りｦ・

Git繝ｪ繝昴ず繝医Μ縺ｫ繝励ャ繧ｷ繝･縺吶ｋ縺縺代〒縲∬・蜍慕噪縺ｫNetlify縺ｧ繝薙Ν繝峨・繝・・繝ｭ繧､縺輔ｌ繧九ｈ縺・↓險ｭ螳壹＠縺ｾ縺吶・

## 蜑肴署譚｡莉ｶ

- Netlify繧｢繧ｫ繧ｦ繝ｳ繝医ｒ謖√▲縺ｦ縺・ｋ
- GitHub/GitLab/Bitbucket縺ｮ繝ｪ繝昴ず繝医Μ繧呈戟縺｣縺ｦ縺・ｋ・医∪縺溘・菴懈・縺吶ｋ・・
- 繝励Ο繧ｸ繧ｧ繧ｯ繝医′Git繝ｪ繝昴ず繝医Μ縺ｨ縺励※邂｡逅・＆繧後※縺・ｋ

## 險ｭ螳壽焔鬆・

### 1. Git繝ｪ繝昴ず繝医Μ縺ｮ貅門ｙ

繝励Ο繧ｸ繧ｧ繧ｯ繝医′Git繝ｪ繝昴ず繝医Μ縺ｧ邂｡逅・＆繧後※縺・ｋ縺狗｢ｺ隱搾ｼ・

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
git status
```

Git繝ｪ繝昴ず繝医Μ縺ｧ縺ｪ縺・ｴ蜷医・蛻晄悄蛹厄ｼ・

```powershell
git init
git add .
git commit -m "Initial commit"
```

### 2. GitHub/GitLab/Bitbucket縺ｫ繝ｪ繝昴ず繝医Μ繧剃ｽ懈・

- GitHub: https://github.com/new
- GitLab: https://gitlab.com/projects/new
- Bitbucket: https://bitbucket.org/repo/create

繝ｪ繝昴ず繝医Μ蜷阪・ `primal-logic-web` 縺ｪ縺ｩ驕ｩ蛻・↑蜷榊燕繧剃ｻ倥￠繧・

### 3. 繝ｪ繝｢繝ｼ繝医Μ繝昴ず繝医Μ繧定ｿｽ蜉

```powershell
git remote add origin <繝ｪ繝昴ず繝医Μ縺ｮURL>
git branch -M main
git push -u origin main
```

萓具ｼ・
```powershell
git remote add origin https://github.com/yourusername/primal-logic-web.git
git push -u origin main
```

### 4. Netlify縺ｧ繧ｵ繧､繝医ｒ菴懈・

1. https://app.netlify.com 縺ｫ繝ｭ繧ｰ繧､繝ｳ
2. 縲窟dd new site縲坂・縲栗mport an existing project縲阪ｒ繧ｯ繝ｪ繝・け
3. GitHub/GitLab/Bitbucket繧帝∈謚槭＠縺ｦ隱崎ｨｼ
4. 菴懈・縺励◆繝ｪ繝昴ず繝医Μ繧帝∈謚・

### 5. 繝薙Ν繝芽ｨｭ螳・

Netlify縺ｮ險ｭ螳夂判髱｢縺ｧ莉･荳九ｒ險ｭ螳夲ｼ・

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Node version**: `20`・医∪縺溘・譛譁ｰ縺ｮLTS・・

縺ｾ縺溘・縲～netlify.toml`縺梧里縺ｫ險ｭ螳壹＆繧後※縺・ｋ縺ｮ縺ｧ縲√◎縺ｮ縺ｾ縺ｾ菴ｿ逕ｨ蜿ｯ閭ｽ縺ｧ縺吶・

### 6. 迺ｰ蠅・､画焚縺ｮ險ｭ螳夲ｼ亥ｿ・ｦ√↓蠢懊§縺ｦ・・

Netlify縺ｮ險ｭ螳夂判髱｢縺ｧ迺ｰ蠅・､画焚繧定ｨｭ螳夲ｼ・

- `VITE_GEMINI_API_KEY`: Gemini API繧ｭ繝ｼ・・I繝√Ε繝・ヨ讖溯・逕ｨ・・
- `VITE_SUPABASE_URL`: Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase ANON KEY
- `VITE_REPLICATE_API_TOKEN`: Replicate API繝医・繧ｯ繝ｳ・育判蜒冗函謌千畑縲√が繝励す繝ｧ繝ｳ・・

險ｭ螳壽婿豕包ｼ・
1. Netlify縺ｮ繧ｵ繧､繝郁ｨｭ螳・竊偵窪nvironment variables縲・
2. 縲窟dd a variable縲阪ｒ繧ｯ繝ｪ繝・け
3. 螟画焚蜷阪→蛟､繧貞・蜉・

### 7. 繝・・繝ｭ繧､縺ｮ遒ｺ隱・

險ｭ螳壹′螳御ｺ・☆繧九→縲∬・蜍慕噪縺ｫ繝・・繝ｭ繧､縺碁幕蟋九＆繧後∪縺吶・

- 繝・・繝ｭ繧､螻･豁ｴ縺ｯ縲轡eploys縲阪ち繝悶〒遒ｺ隱榊庄閭ｽ
- 繝・・繝ｭ繧､縺梧・蜉溘☆繧九→縲ゞRL縺瑚｡ｨ遉ｺ縺輔ｌ縺ｾ縺・
- 莉･髯阪；it縺ｫ繝励ャ繧ｷ繝･縺吶ｋ縺溘・縺ｫ閾ｪ蜍輔ョ繝励Ο繧､縺輔ｌ縺ｾ縺・

## 閾ｪ蜍輔ョ繝励Ο繧､縺ｮ蜍穂ｽ・

1. Git繝ｪ繝昴ず繝医Μ縺ｫ繝励ャ繧ｷ繝･・・git push`・・
2. Netlify縺悟､画峩繧呈､懃衍
3. 閾ｪ蜍慕噪縺ｫ繝薙Ν繝峨さ繝槭Φ繝会ｼ・npm run build`・峨ｒ螳溯｡・
4. `dist`繝輔か繝ｫ繝繧偵ョ繝励Ο繧､
5. URL縺ｯ螟峨ｏ繧峨★縲∽ｸｭ霄ｫ縺縺第峩譁ｰ縺輔ｌ繧・

## 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### 繝薙Ν繝峨お繝ｩ繝ｼ縺檎匱逕溘☆繧句ｴ蜷・

- Netlify縺ｮ繝・・繝ｭ繧､繝ｭ繧ｰ繧堤｢ｺ隱・
- 繝ｭ繝ｼ繧ｫ繝ｫ縺ｧ`npm run build`縺梧・蜉溘☆繧九°遒ｺ隱・
- 迺ｰ蠅・､画焚縺梧ｭ｣縺励￥險ｭ螳壹＆繧後※縺・ｋ縺狗｢ｺ隱・

### 繝・・繝ｭ繧､縺瑚・蜍募ｮ溯｡後＆繧後↑縺・ｴ蜷・

- Git繝ｪ繝昴ず繝医Μ縺梧ｭ｣縺励￥騾｣謳ｺ縺輔ｌ縺ｦ縺・ｋ縺狗｢ｺ隱・
- Netlify縺ｮ險ｭ螳壹〒縲沓uild settings縲阪ｒ遒ｺ隱・
- 繝悶Λ繝ｳ繝∝錐縺形main`縺ｾ縺溘・`master`縺ｫ縺ｪ縺｣縺ｦ縺・ｋ縺狗｢ｺ隱・

## 蜿り・

- Netlify蜈ｬ蠑上ラ繧ｭ繝･繝｡繝ｳ繝・ https://docs.netlify.com/
- `netlify.toml`縺ｮ險ｭ螳・ 繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医・`netlify.toml`繧貞盾辣ｧ


