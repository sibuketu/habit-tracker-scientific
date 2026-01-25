# 栁E��ゲージ一貫性レポ�EチE

## 基溁E HomeScreen

### HomeScreenの表示ルール
- **nutrientDisplayMode**に基づぁE��表示/非表示を制御
  - `simple`: 電解質�E�Eodium, potassium, magnesium�E�E マクロ�E�Eat, protein�E��Eみ
  - `standard`: 上訁E+ Tier2栁E��素�E�Eron, zinc等！E
  - `detailed`: 全ての栁E��素�E�Eier1 + Tier2 + Tier3�E�E

- **UIサイズ**: 
  - MiniNutrientGauge: `maxWidth: '300px'`
  - 親要素の幁E��応じて調整

---

## 不一致箁E��

### 1. HistoryScreen

**問題点:**
- ❁E`nutrientDisplayMode`を老E�EしてぁE��ぁE
- ❁ESummaryタチE Protein, Fatのみ�E�Eつ固定！E
- ❁EDetail表示: Protein, Fat, Sodium, Potassium, Magnesium, Zinc, Iron, Calcium, Phosphorus...�E�固定で多数表示�E�E
- ❁E日本語が残ってぁE���E�「脂質」「詳細表示 →」！E

**修正方釁E**
- HomeScreenと同じ`nutrientDisplayMode`に基づく表示ルールを適用
- SimpleモーチE 電解質 + マクロのみ
- Standard/DetailedモーチE Tier2栁E��素も表示
- 日本語を英語化

---

### 2. ButcherSelect

**問題点:**
- ⚠�E�Eプレビュー用に多数の栁E��素を表示�E�Eabel=""で表示�E�E
- ⚠�E�E`nutrientDisplayMode`を老E�EしてぁE��ぁE��能性

**修正方釁E**
- プレビュー用途なので、表示栁E��素の数は現状維持でも可
- ただし、`nutrientDisplayMode`に基づくフィルタリングを検訁E

---

### 3. そ�E他�E画面�E�EecipeScreen, CustomFoodScreen, PhotoAnalysisModal�E�E

**問題点:**
- ❁E色が統一されてぁE��ぁE��EomeScreen基溁E protein/fat=#3b82f6, zinc/magnesium/iron=#06b6d4, sodium=#10b981�E�E
- ❁EtargetがハードコードされてぁE��
- ❁E`nutrientDisplayMode`を老E�EしてぁE��ぁE

**修正方釁E**
- 色をHomeScreen基準に統一
- targetは`getCarnivoreTargets()`から取征E
- `nutrientDisplayMode`に基づく表示ルールを適用

---

## 修正優先頁E��E

1. **髁E*: HistoryScreenの`nutrientDisplayMode`対忁E+ 日本語英語化
2. **中**: そ�E他画面の色統一 + target取得方法�E統一
3. **佁E*: ButcherSelectの`nutrientDisplayMode`対応（�Eレビュー用途�Eため�E�E

---

## Cursor向け持E��

### タスク1: HistoryScreenの栁E��ゲージ表示をHomeScreen基準に統一

**修正ファイル:**
- `src/screens/HistoryScreen.tsx`

**修正冁E��:**
1. `nutrientDisplayMode`を取得！EuseSettings`フックを使用�E�E
2. Summaryタブ�E栁E��ゲージ表示を`nutrientDisplayMode`に基づぁE��制御
   - Simple: 電解質 + マクロのみ
   - Standard/Detailed: Tier2栁E��素も表示
3. Detail表示の栁E��ゲージも同様に制御
4. 日本語を英語化:
   - 「脂質」�E "Fat"
   - 「詳細表示 →」�E "Show Details ↁE

**参老E**
- HomeScreenの実裁E��Esrc/screens/HomeScreen.tsx` 800-1100行目�E�E
- `isNutrientVisibleInMode()`関数�E�Esrc/utils/nutrientPriority.ts`�E�E

---

### タスク2: そ�E他画面の色とtargetを統一

**修正ファイル:**
1. `src/screens/RecipeScreen.tsx`
2. `src/screens/CustomFoodScreen.tsx`
3. `src/components/PhotoAnalysisModal.tsx`

**修正冁E��:**
1. 色をHomeScreen基準に統一:
   - protein/fat: `#3b82f6`
   - zinc/magnesium/iron: `#06b6d4`
   - sodium: `#10b981`
   - そ�E仁E `#06b6d4`をデフォルトに
2. targetを`getCarnivoreTargets()`から取得（ハードコードを削除�E�E
3. `nutrientDisplayMode`に基づく表示ルールを適用�E�可能な篁E��で�E�E

**注愁E**
- CustomFoodScreenの、E00gあたり」表示は固定target (100)でOK
- `hideTarget={true}`はそ�Eまま維持E

