# Cursor ﾃ・Obsidian 騾｣謳ｺ繧ｹ繧ｯ繝ｪ繝励ヨ

## 讎りｦ・

Cursor縺ｮTODO繝ｪ繧ｹ繝医ｒObsidian縺ｫ閾ｪ蜍戊ｨ倬鹸縺吶ｋ縺溘ａ縺ｮ繧ｹ繧ｯ繝ｪ繝励ヨ縺ｧ縺吶・

## 繧ｻ繝・ヨ繧｢繝・・

### 1. Obsidian縺ｮVault繝代せ繧堤｢ｺ隱・

Obsidian繧帝幕縺阪〃ault縺ｮ蝣ｴ謇繧堤｢ｺ隱阪＠縺ｦ縺上□縺輔＞縲・
- 險ｭ螳夲ｼ・ettings・俄・ 繝輔ぃ繧､繝ｫ縺ｨ繝ｪ繝ｳ繧ｯ・・iles & Links・・
- 縲祁ault縺ｮ蝣ｴ謇縲阪ｒ遒ｺ隱・

### 2. 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ縺ｮ菴懈・・域耳螂ｨ・・

```powershell
# 繝励Ο繧ｸ繧ｧ繧ｯ繝医Ν繝ｼ繝医↓遘ｻ蜍・
cd "C:\Users\susam\Downloads\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\docs\primal-logic-app\primal-logic-web"

# 繧ｷ繝ｳ繝懊Μ繝・け繝ｪ繝ｳ繧ｯ繧剃ｽ懈・
New-Item -ItemType SymbolicLink -Path ".\obsidian-vault" -Target "C:\Users\susam\Documents\ObsidianVault"
```

### 3. 繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ繝代せ繧呈峩譁ｰ

`scripts/saveTodoToObsidian.ts` 縺ｮ `getObsidianVaultPath()` 髢｢謨ｰ蜀・・繝代せ繧偵∝ｮ滄圀縺ｮObsidian Vault繝代せ縺ｫ譖ｴ譁ｰ縺励※縺上□縺輔＞縲・

### 4. Obsidian縺ｮ繝輔か繝ｫ繝讒矩繧剃ｽ懈・

Obsidian縺ｮVault蜀・↓莉･荳九・繝輔か繝ｫ繝繧剃ｽ懈・縺励※縺上□縺輔＞・・
- `Daily/` - 譌･莉倥＃縺ｨ縺ｮTODO繝ｪ繧ｹ繝医ｒ菫晏ｭ・

## 菴ｿ逕ｨ譁ｹ豕・

### 謇句虚螳溯｡・

```bash
# TypeScript繧貞ｮ溯｡鯉ｼ・sx縺悟ｿ・ｦ・ｼ・
npx tsx scripts/saveTodoToObsidian.ts
```

### package.json縺ｫ繧ｹ繧ｯ繝ｪ繝励ヨ繧定ｿｽ蜉

```json
{
  "scripts": {
    "save-todo": "tsx scripts/saveTodoToObsidian.ts"
  }
}
```

螳溯｡・
```bash
npm run save-todo
```

## 莉雁ｾ後・謾ｹ蝟・

- [ ] Cursor縺ｮTODO繝ｪ繧ｹ繝医ｒ螳滄圀縺ｫ蜿門ｾ励☆繧区ｩ溯・
- [ ] 閾ｪ蜍募ｮ溯｡鯉ｼ・itHub Actions縲…ron遲会ｼ・
- [ ] 譌｢蟄倥・TODO繝ｪ繧ｹ繝医→縺ｮ繝槭・繧ｸ讖溯・
- [ ] 螳御ｺ・＠縺溘ち繧ｹ繧ｯ縺ｮ繧｢繝ｼ繧ｫ繧､繝匁ｩ溯・


