# 開発要注意リスチE

> **目皁E*: 変更時に注意が忁E��な箁E��・同期が忁E��な箁E��を記録
> **更新日**: 2026-01-21

---

## 1. 栁E��ゲージの数値同期問顁E[CRITICAL]

### 問顁E
栁E��ゲージ�E�EiniNutrientGauge�E�で表示される目標値と、💡モーダル冁E�E計算式�E結果が不一致になる可能性がある、E

### 原因
```
getCarnivoreTargets() ↁE計算結果A ↁEゲージに表示
MiniNutrientGauge冁EgetCalculationFormula() ↁE計算結果B ↁEモーダルに表示

A ≠ B の可能性あり
```

### 影響ファイル
- `src/data/carnivoreTargets.ts` - 本来の計算ロジチE��
- `src/components/MiniNutrientGauge.tsx` - モーダル冁E��独自計算ロジチE��あり�E�E00行目以降！E

### 対応方釁E
計算ロジチE��を`getCarnivoreTargets()`に一允E��し、計算式テキストも返すようにする、E
MiniNutrientGaugeは受け取った計算式テキストを表示するだけにする、E

### スチE�Eタス
- [x] リファクタリング完亁E��E026-01-21�E�E

---

## 2. 栁E��ゲージの色統一

### 問顁E
褁E��のゲージコンポ�Eネントが独自の色定義を持ってぁE��、E

### 影響ファイル�E�修正済み�E�E
| ファイル | 状慁E|
|----------|------|
| `src/components/StorageNutrientGauge.tsx` | ✁EgaugeUtils使用 |
| `src/components/OmegaRatioGauge.tsx` | ✁EgaugeUtils使用 |
| `src/components/CalciumPhosphorusRatioGauge.tsx` | ✁EgaugeUtils使用 |
| `src/components/GlycineMethionineRatioGauge.tsx` | ✁EgaugeUtils使用 |
| `src/components/InsulinGlucagonRatioGauge.tsx` | ✁EgaugeUtils使用 |
| `src/screens/RecipeScreen.tsx` | ✁EgaugeUtils使用 |

### 対応方釁E
すべて `src/utils/gaugeUtils.ts` の関数を使用する、E

### スチE�Eタス
- [x] 色統一完亁E��E026-01-21�E�E

---

## 3. 栁E��素タイプ別ゾーン閾値

### 概要E
栁E��素によって「過剰」�E意味が異なるため、タイプ別に色ゾーンの閾値を設定、E

### タイプ定義�E�EaugeUtils.ts�E�E
| タイチE| 不足 | 警呁E| 適正上限 | 対象栁E��素 |
|--------|------|------|----------|------------|
| `excessSensitive` | <70% | <100% | 100% | ビタミンA、E�� |
| `excessOk` | <70% | <100% | 200% | タンパク質、脂質 |
| `electrolyte` | <50% | <80% | 150% | ナトリウム、カリウム、�Eグネシウム |
| `standard` | <70% | <100% | 120% | そ�E他すべて |

### 使用方況E
```typescript
import { getColorByPercent } from '../utils/gaugeUtils';
// 栁E��素キーを渡すと自動でタイプ別閾値を使用
const color = getColorByPercent(percent, false, 'iron');
```

---

## 5. 栁E��素チE�Eタの追加晁E

### 注意点
新しい栁E��素を追加する場合、以下�Eファイルすべてを更新する忁E��がある�E�E

1. `src/data/carnivoreTargets.ts` - 目標値定義
2. `src/data/foodsDatabase.ts` - 食品の栁E��素チE�Eタ
3. `src/utils/nutrientCalculator.ts` - 計算ロジチE��
4. `src/utils/gaugeUtils.ts` - 色定義・タイプ�EチE��ング�E�忁E��なら！E
5. `src/utils/i18n.ts` - 翻訳
6. `src/types/index.ts` - 型定義

---

## 6. ゲージ変更時�E影響篁E��

### MiniNutrientGaugeを変更した場吁E
以下�E画面すべてに影響�E�E

- HomeScreen
- HistoryScreen
- RecipeScreen
- CustomFoodScreen
- PhotoAnalysisModal
- ButcherSelect

**忁E��全画面で動作確認すること、E*

---

## 永乁E��ール

### 栁E��ゲージ統一ルール

1. **唯一のゲージ**: `MiniNutrientGauge.tsx` を�E画面で使用
2. **色**: 忁E�� `gaugeUtils.ts` の `getNutrientColor()` を使用
3. **目標値**: 忁E�� `getCarnivoreTargets()` から取征E
4. **ハ�Eドコード禁止**: 色・目標値のハ�Eドコード�E禁止

### 例外（別コンポ�Eネント許可�E�E
- `PFRatioGauge` - ヘッダー固定表示
- `OmegaRatioGauge` 等�E比率系 - シーソー表示が忁E��E
- `StorageNutrientGauge` - バッチE��ー表示が忁E��E

**ただし色はgaugeUtils.tsに統一すること、E*

---

## MiniNutrientGaugeのモーダルタブ構造

### 現在の構造�E�E026-01-21更新�E�E
2タブ構�E:
1. **なぜこの数値�E�E* - Impact Factors�E�目標値に影響を与える要因�E�を表示
2. **計算弁E* - 計算ロジチE��を表示

### 旧構造�E�廁E���E�E
3タブ構�E: Simple / Detailed / General

---

*最終更新: 2026-01-21*

