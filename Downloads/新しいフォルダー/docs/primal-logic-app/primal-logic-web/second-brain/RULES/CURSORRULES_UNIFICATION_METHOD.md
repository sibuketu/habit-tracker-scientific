# .cursorrules 邨ｱ荳蛹匁婿豕・

> **菴懈・譌･**: 2026-01-20  
> **逶ｮ逧・*: 隍・焚縺ｮ繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｧ蜷御ｸ縺ｮ`.cursorrules`繧剃ｽｿ逕ｨ縺吶ｋ譁ｹ豕・

---

## 識 邨ｱ荳蛹悶・譁ｹ豕・

### 譁ｹ豕柊: 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ・域耳螂ｨ・・

**繝｡繝ｪ繝・ヨ**:
- 1縺､縺ｮ繝輔ぃ繧､繝ｫ繧堤ｷｨ髮・☆繧後・蜈ｨ繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｫ蜿肴丐
- 閾ｪ蜍募酔譛滂ｼ域焔蜍輔さ繝斐・荳崎ｦ・ｼ・
- 繝・ぅ繧ｹ繧ｯ螳ｹ驥上ｒ遽邏・

**繝・Γ繝ｪ繝・ヨ**:
- Windows縺ｧ縺ｯ邂｡逅・・ｨｩ髯舌′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｋ
- Git縺ｧ繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ繧呈桶縺・ｴ蜷医・豕ｨ諢上′蠢・ｦ・

**螳溯｣・焔鬆・*:

1. **繝槭せ繧ｿ繝ｼ繝輔ぃ繧､繝ｫ繧呈ｱｺ螳・*
   - 萓・ `C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules`

2. **莉悶・繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｮ`.cursorrules`繧貞炎髯､**
   ```powershell
   # 蜷・Ρ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｧ螳溯｡・
   Remove-Item "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\.cursorrules" -Force
   Remove-Item "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\.cursorrules" -Force
   Remove-Item "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\.cursorrules" -Force
   ```

3. **繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ繧剃ｽ懈・**
   ```powershell
   # 邂｡逅・・ｨｩ髯舌〒PowerShell繧帝幕縺・
   # 繝ｫ繝ｼ繝医ョ繧｣繝ｬ繧ｯ繝医Μ
   New-Item -ItemType SymbolicLink -Path "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\.cursorrules" -Target "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules"
   
   # docs繝・ぅ繝ｬ繧ｯ繝医Μ
   New-Item -ItemType SymbolicLink -Path "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\.cursorrules" -Target "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules"
   
   # primal-logic-app繝・ぅ繝ｬ繧ｯ繝医Μ
   New-Item -ItemType SymbolicLink -Path "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\.cursorrules" -Target "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules"
   ```

---

### 譁ｹ豕稗: 繝槭せ繧ｿ繝ｼ繝輔ぃ繧､繝ｫ + 繧ｳ繝斐・繧ｹ繧ｯ繝ｪ繝励ヨ

**繝｡繝ｪ繝・ヨ**:
- 邂｡逅・・ｨｩ髯蝉ｸ崎ｦ・
- Git縺ｧ謇ｱ縺・ｄ縺吶＞

**繝・Γ繝ｪ繝・ヨ**:
- 謇句虚縺ｧ蜷梧悄縺吶ｋ蠢・ｦ√′縺ゅｋ・医∪縺溘・繧ｹ繧ｯ繝ｪ繝励ヨ螳溯｡鯉ｼ・

**螳溯｣・焔鬆・*:

1. **繝槭せ繧ｿ繝ｼ繝輔ぃ繧､繝ｫ繧呈ｱｺ螳・*
   - 萓・ `second-brain/AI_RULES_MASTER.md` 縺ｾ縺溘・ `primal-logic-web/.cursorrules`

2. **繧ｳ繝斐・繧ｹ繧ｯ繝ｪ繝励ヨ繧剃ｽ懈・**
   ```powershell
   # sync-cursorrules.ps1
   $masterFile = "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules"
   $targets = @(
       "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\.cursorrules",
       "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\.cursorrules",
       "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\.cursorrules"
   )
   
   foreach ($target in $targets) {
       Copy-Item -Path $masterFile -Destination $target -Force
       Write-Host "Copied to: $target"
   }
   ```

3. **繝ｫ繝ｼ繝ｫ譖ｴ譁ｰ譎ゅ↓繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡・*
   ```powershell
   .\sync-cursorrules.ps1
   ```

---

### 譁ｹ豕匹: 髫主ｱ､逧・Ν繝ｼ繝ｫ讒矩・域沐霆滓ｧ驥崎ｦ厄ｼ・

**繝｡繝ｪ繝・ヨ**:
- 繝励Ο繧ｸ繧ｧ繧ｯ繝亥崋譛峨・繝ｫ繝ｼ繝ｫ繧定ｨｭ螳壼庄閭ｽ
- 蜈ｱ騾壹Ν繝ｼ繝ｫ縺ｨ繝励Ο繧ｸ繧ｧ繧ｯ繝亥崋譛峨Ν繝ｼ繝ｫ繧貞・髮｢

**繝・Γ繝ｪ繝・ヨ**:
- 讒矩縺瑚､・尅縺ｫ縺ｪ繧・
- 縺ｩ縺ｮ繝ｫ繝ｼ繝ｫ縺碁←逕ｨ縺輔ｌ縺ｦ縺・ｋ縺句・縺九ｊ縺ｫ縺上＞

**螳溯｣・焔鬆・*:

1. **蜈ｱ騾壹Ν繝ｼ繝ｫ**: `second-brain/AI_RULES.md`
2. **繝励Ο繧ｸ繧ｧ繧ｯ繝亥崋譛峨Ν繝ｼ繝ｫ**: 蜷・Ρ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｮ`.cursorrules`
3. **`.cursorrules`縺ｮ蜈磯ｭ縺ｫ蜈ｱ騾壹Ν繝ｼ繝ｫ縺ｸ縺ｮ蜿ら・繧定ｿｽ蜉**
   ```markdown
   # 蜈ｱ騾壹Ν繝ｼ繝ｫ縺ｮ蜿ら・
   > 蜈ｱ騾壹Ν繝ｼ繝ｫ縺ｯ `../../second-brain/AI_RULES.md` 繧貞盾辣ｧ縺励※縺上□縺輔＞縲・
   
   # 繝励Ο繧ｸ繧ｧ繧ｯ繝亥崋譛峨Ν繝ｼ繝ｫ
   ## Tech Stack
   - Stack: React (Vite), Vanilla CSS (Tailwind遖∵ｭ｢), TypeScript, Firebase.
   ...
   ```

---

## 庁 謗ｨ螂ｨ譁ｹ豕・

**譁ｹ豕柊・医す繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ・峨ｒ謗ｨ螂ｨ**縺励∪縺吶・

**逅・罰**:
1. 閾ｪ蜍募酔譛滂ｼ域焔蜍墓桃菴應ｸ崎ｦ・ｼ・
2. 1縺､縺ｮ繝輔ぃ繧､繝ｫ繧堤ｷｨ髮・☆繧後・蜈ｨ繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｫ蜿肴丐
3. 繝・ぅ繧ｹ繧ｯ螳ｹ驥上ｒ遽邏・

**豕ｨ諢冗せ**:
- Windows縺ｧ縺ｯ邂｡逅・・ｨｩ髯舌′蠢・ｦ√↑蝣ｴ蜷医′縺ゅｋ
- Git縺ｧ繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ繧呈桶縺・ｴ蜷医・縲～.gitattributes`縺ｫ險ｭ螳壹′蠢・ｦ・

---

## 肌 螳溯｣・せ繧ｯ繝ｪ繝励ヨ

### 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ菴懈・繧ｹ繧ｯ繝ｪ繝励ヨ

```powershell
# create-cursorrules-symlinks.ps1
# 邂｡逅・・ｨｩ髯舌〒螳溯｡・

$masterFile = "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web\.cursorrules"
$targets = @(
    "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\.cursorrules",
    "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\.cursorrules",
    "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\.cursorrules"
)

# 譌｢蟄倥・繝輔ぃ繧､繝ｫ繧貞炎髯､
foreach ($target in $targets) {
    if (Test-Path $target) {
        Remove-Item $target -Force
        Write-Host "Removed: $target"
    }
}

# 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ繧剃ｽ懈・
foreach ($target in $targets) {
    New-Item -ItemType SymbolicLink -Path $target -Target $masterFile
    Write-Host "Created symlink: $target -> $masterFile"
}

Write-Host "Done!"
```

---

## 搭 谺｡縺ｮ繧ｹ繝・ャ繝・

1. [ ] 繝槭せ繧ｿ繝ｼ繝輔ぃ繧､繝ｫ繧呈ｱｺ螳夲ｼ・primal-logic-web/.cursorrules`繧呈耳螂ｨ・・
2. [ ] 莉悶・繝ｯ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｮ`.cursorrules`繧堤｢ｺ隱阪・繝舌ャ繧ｯ繧｢繝・・
3. [ ] 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ菴懈・繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡・
4. [ ] 蜷・Ρ繝ｼ繧ｯ繧ｹ繝壹・繧ｹ縺ｧ蜍穂ｽ懃｢ｺ隱・
5. [ ] Git險ｭ螳壹ｒ遒ｺ隱搾ｼ医す繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ蟇ｾ蠢懶ｼ・

---

**譛邨よ峩譁ｰ**: 2026-01-20・医お繝ｼ繧ｸ繧ｧ繝ｳ繝・・・

