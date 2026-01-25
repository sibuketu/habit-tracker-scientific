# CarnivOS Web App - 髢狗匱繧ｵ繝ｼ繝舌・襍ｷ蜍輔ぎ繧､繝・

> 譛邨よ峩譁ｰ: 2025-12-18

---

## 噫 髢狗匱繧ｵ繝ｼ繝舌・襍ｷ蜍墓婿豕・

### 譁ｹ豕・: 邨ｶ蟇ｾ繝代せ縺ｧ襍ｷ蜍包ｼ域耳螂ｨ・・

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
npm run dev
```

### 譁ｹ豕・: 迴ｾ蝨ｨ縺ｮ繝・ぅ繝ｬ繧ｯ繝医Μ縺九ｉ

```powershell
npm --prefix ".\primal-logic-app\primal-logic-web" run dev
```

### 譁ｹ豕・: PowerShell縺ｧ繝代せ繧呈､懃ｴ｢縺励※襍ｷ蜍・

```powershell
$webPath = (Get-ChildItem -Path . -Filter "package.json" -Recurse | Where-Object { $_.DirectoryName -like "*primal-logic-web*" } | Select-Object -First 1).DirectoryName
if ($webPath) {
    Set-Location $webPath
    npm run dev
}
```

---

## 導 繧｢繧ｯ繧ｻ繧ｹ

繝悶Λ繧ｦ繧ｶ縺ｧ `http://localhost:5173` 繧帝幕縺・

---

## 笨・蜍穂ｽ懃｢ｺ隱埼・岼

### 蝓ｺ譛ｬ蜍穂ｽ・
- [ ] 繧｢繝励Μ縺瑚ｵｷ蜍輔☆繧・
- [ ] 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ・・ome, Input, History, Profile・峨′蜍穂ｽ懊☆繧・
- [ ] 繧ｨ繝ｩ繝ｼ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｪ縺・

### Home逕ｻ髱｢
- [ ] 繝ｭ繧ｰ縺後↑縺・ｴ蜷医・Empty State縺瑚｡ｨ遉ｺ縺輔ｌ繧・
- [ ] 繝ｭ繧ｰ縺後≠繧句ｴ蜷医∵・､顔ｴ繧ｲ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧・
- [ ] 繧ｲ繝ｼ繧ｸ繧偵ち繝・・縺吶ｋ縺ｨArgument Card縺瑚｡ｨ遉ｺ縺輔ｌ繧・

### Input逕ｻ髱｢
- [ ] Status蜈･蜉幢ｼ・leep, Sun, Activity・峨′蜍穂ｽ懊☆繧・
- [ ] 鬟溷刀讀懃ｴ｢縺悟虚菴懊☆繧・
- [ ] 鬟溷刀霑ｽ蜉縺悟虚菴懊☆繧・
- [ ] Recovery Protocol縺瑚・蜍慕函謌舌＆繧後ｋ・磯＆蜿埼｣溷刀縺ｮ蝣ｴ蜷茨ｼ・

### History逕ｻ髱｢
- [ ] 繝ｭ繧ｰ荳隕ｧ縺瑚｡ｨ遉ｺ縺輔ｌ繧具ｼ域眠縺励＞鬆・ｼ・
- [ ] 繝ｭ繧ｰ繧｢繧､繝・Β繧偵ち繝・・縺吶ｋ縺ｨ隧ｳ邏ｰ縺悟ｱ暮幕縺輔ｌ繧具ｼ医い繧ｳ繝ｼ繝・ぅ繧ｪ繝ｳ蠖｢蠑擾ｼ・
- [ ] 蜑企勁繝懊ち繝ｳ縺悟虚菴懊☆繧・
- [ ] 譬・､顔ｴ繝｡繝医Μ繧ｯ繧ｹ繧偵ち繝・・縺吶ｋ縺ｨArgument Card縺瑚｡ｨ遉ｺ縺輔ｌ繧・

### Profile逕ｻ髱｢
- [ ] 繝励Ο繝輔ぃ繧､繝ｫ險ｭ螳壹′菫晏ｭ倥〒縺阪ｋ
- [ ] 險ｭ螳壹′豁｣縺励￥隱ｭ縺ｿ霎ｼ縺ｾ繧後ｋ

---

## 菅 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### 繝昴・繝・173縺梧里縺ｫ菴ｿ逕ｨ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷・

```powershell
# 繝昴・繝医ｒ菴ｿ逕ｨ縺励※縺・ｋ繝励Ο繧ｻ繧ｹ繧堤｢ｺ隱・
netstat -ano | findstr :5173

# 繝励Ο繧ｻ繧ｹ繧堤ｵゆｺ・ｼ亥ｿ・ｦ√↓蠢懊§縺ｦ・・
taskkill /PID <繝励Ο繧ｻ繧ｹID> /F
```

### 萓晏ｭ倬未菫ゅ・蜀阪う繝ｳ繧ｹ繝医・繝ｫ

```powershell
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"
rm -r node_modules
npm install
```

---

譛邨よ峩譁ｰ: 2025-12-18


