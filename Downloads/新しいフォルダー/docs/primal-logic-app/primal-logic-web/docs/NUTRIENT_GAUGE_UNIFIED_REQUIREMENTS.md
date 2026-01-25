# 栁E��ゲージ統一実裁E��件定義

**作�E日**: 2026-01-22  
**目皁E*: 全画面で栁E��ゲージの表示ロジチE��を統一し、HistoryScreenの実裁E��基準として他画面に適用する

---

## 1. 現状の問題点

### 1.1 HomeScreen
- ✁E`nutrientDisplayMode`を使用してぁE���E�実裁E��み�E�E
- ⚠�E�Eユーザーが「�E然モード反映してなぁE��と持E���E�確認が忁E��E��E

### 1.2 HistoryScreen
- ✁E`nutrientDisplayMode`を使用してぁE���E�実裁E��み�E�E
- ✁E計算ロジチE��が正しく実裁E��れてぁE���E�基準として使用�E�E
- ⚠�E�Eユーザーが「計算一致してなぁE��と持E���E�確認が忁E��E��E

### 1.3 そ�E他画面
- ❁ERecipeScreen: `nutrientDisplayMode`未対忁E
- ❁ECustomFoodScreen: `nutrientDisplayMode`未対応！E00g固定�E仕様通り�E�E
- ❁EPhotoAnalysisModal: `nutrientDisplayMode`未対忁E
- ❁EButcherSelect: `nutrientDisplayMode`未対応（�Eレビュー用途！E

---

## 2. 要件定義

### 2.1 基準実裁E HistoryScreen

**HistoryScreenの実裁E��基準として、以下を全画面に適用する�E�E*

1. **`nutrientDisplayMode`の取征E*
   - `useSettings`フックから`nutrientDisplayMode`を取征E
   - `isNutrientVisibleInMode()`関数を使用して表示/非表示を制御

2. **表示ルール**
   - **SimpleモーチE*: Tier1栁E��素のみ�E�電解質 + マクロ�E�E
     - 電解質: sodium, potassium, magnesium
     - マクロ: fat, protein
   - **StandardモーチE*: Tier1 + Tier2栁E��素�E�開閉式！E
     - Tier1: 常に表示
     - Tier2: 開閉ボタンで表示/非表示
   - **DetailedモーチE*: Tier1 + Tier2 + Tier3栁E��素�E��Eて表示�E�E
     - Tier1: 常に表示
     - Tier2: 常に表示
     - Tier3: 常に表示

3. **計算ロジチE��**
   - `calculateAllMetrics()`を使用して栁E��素を計箁E
   - `getCarnivoreTargets()`を使用して目標値を取征E
   - `getNutrientColor()`を使用して色を統一

4. **UI構造**
   - Tier1栁E��素: グループ化して表示�E�電解質、�Eクロ�E�E
   - Tier2栁E��素: 開閉式！Etandardモード！E
   - Tier3栁E��素: 開閉式！Eetailedモード！E

---

### 2.2 適用対象画面

#### 2.2.1 HomeScreen
- **現状**: `nutrientDisplayMode`を使用してぁE��が、ユーザーが「�E然モード反映してなぁE��と持E��
- **修正**: HistoryScreenの実裁E��確認し、同じロジチE��を適用
- **確認頁E��**:
  - `isNutrientVisibleInMode()`の使用が正しいぁE
  - Tier1/Tier2/Tier3の表示制御が正しいぁE
  - 計算ロジチE��がHistoryScreenと一致してぁE��ぁE

#### 2.2.2 RecipeScreen
- **現状**: `nutrientDisplayMode`未対忁E
- **修正**: HistoryScreenの実裁E��コピ�Eして適用
- **注愁E*: レシピ�E栁E��素計算�E`calculateAllMetrics()`を使用

#### 2.2.3 CustomFoodScreen
- **現状**: `nutrientDisplayMode`未対応、targetは100g固定（仕様通り�E�E
- **修正**: `nutrientDisplayMode`に基づく表示制御を追加
- **注愁E*: targetは100g固定�Eまま�E�E00gあたり�E力画面のため�E�E

#### 2.2.4 PhotoAnalysisModal
- **現状**: `nutrientDisplayMode`未対忁E
- **修正**: HistoryScreenの実裁E��コピ�Eして適用
- **注愁E*: プレビュー用途なので、表示栁E��素の数は現状維持でも可

#### 2.2.5 ButcherSelect
- **現状**: `nutrientDisplayMode`未対応（�Eレビュー用途！E
- **修正**: プレビュー用途なので、表示栁E��素の数は現状維持でも可
- **注愁E*: 封E��皁E��`nutrientDisplayMode`に基づくフィルタリングを検訁E

---

### 2.3 計算ロジチE��の統一

#### 2.3.1 栁E��素の計箁E
- **使用関数**: `calculateAllMetrics(foods, userProfile)`
- **入劁E*: `FoodItem[]`, `UserProfile | null`
- **出劁E*: `CalculatedMetrics`
- **注愁E*: 全画面で同じ計算ロジチE��を使用する

#### 2.3.2 目標値の取征E
- **使用関数**: `getCarnivoreTargets(...)`
- **入劁E*: ユーザープロファイルの吁E��パラメータ
- **出劁E*: `CarnivoreTargets`
- **注愁E*: 全画面で同じ目標値を使用する

#### 2.3.3 色の統一
- **使用関数**: `getNutrientColor(nutrientKey)`
- **入劁E*: 栁E��素キー�E�侁E 'protein', 'fat', 'sodium'�E�E
- **出劁E*: 色コード（侁E '#3b82f6', '#10b981'�E�E
- **注愁E*: 全画面で同じ色を使用する

---

## 3. 実裁E��頁E

### 3.1 スチE��チE: HistoryScreenの実裁E��誁E
1. HistoryScreenの実裁E��詳細に確誁E
2. 計算ロジチE��が正しいことを確誁E
3. `nutrientDisplayMode`の使用が正しいことを確誁E
4. 問題があれば修正

### 3.2 スチE��チE: HomeScreenの修正
1. HistoryScreenの実裁E��参老E��、HomeScreenを修正
2. `nutrientDisplayMode`の使用を確誁E
3. 計算ロジチE��がHistoryScreenと一致してぁE��ことを確誁E
4. Tier1/Tier2/Tier3の表示制御を確誁E

### 3.3 スチE��チE: そ�E他画面への適用
1. RecipeScreen: HistoryScreenの実裁E��コピ�Eして適用
2. CustomFoodScreen: `nutrientDisplayMode`に基づく表示制御を追加
3. PhotoAnalysisModal: HistoryScreenの実裁E��コピ�Eして適用
4. ButcherSelect: プレビュー用途なので、現状維持E��封E��皁E��検討！E

---

## 4. 完亁E��件

- [ ] HistoryScreenの実裁E��正しいことを確誁E
- [ ] HomeScreenが`nutrientDisplayMode`を正しく反映してぁE��ことを確誁E
- [ ] RecipeScreenが`nutrientDisplayMode`を正しく反映してぁE��ことを確誁E
- [ ] CustomFoodScreenが`nutrientDisplayMode`を正しく反映してぁE��ことを確誁E
- [ ] PhotoAnalysisModalが`nutrientDisplayMode`を正しく反映してぁE��ことを確誁E
- [ ] 全画面で計算ロジチE��が一致してぁE��ことを確誁E
- [ ] 全画面で色が統一されてぁE��ことを確誁E
- [ ] 全画面で目標値が統一されてぁE��ことを確誁E

---

## 5. 参老E��E��

- `src/screens/HistoryScreen.tsx` - 基準実裁E
- `src/screens/HomeScreen.tsx` - 修正対象
- `src/utils/nutrientPriority.ts` - `isNutrientVisibleInMode()`関数
- `src/utils/nutrientCalculator.ts` - `calculateAllMetrics()`関数
- `src/data/carnivoreTargets.ts` - `getCarnivoreTargets()`関数
- `src/utils/gaugeUtils.ts` - `getNutrientColor()`関数
- `docs/NUTRIENT_GAUGE_CONSISTENCY_REPORT.md` - 既存�Eレポ�EチE

---

## 6. オンボ�EチE��ングとログイン機�E

### 6.1 現状
- オンボ�EチE��ング画面は実裁E��れてぁE���E�EOnboardingScreen.tsx`�E�E
- ログイン機�Eは実裁E��れてぁE��が、オンボ�EチE��ングには含まれてぁE��ぁE
- SettingsScreenからアクセス可能�E�Eccountセクション�E�E

### 6.2 要件
- ログイン機�Eをオンボ�EチE��ングに追加
- オンボ�EチE��ングのスチE��プとして、ログイン/新規登録を選択可能にする
- オプション: スキチE�E可能�E�ゲストモード！E

### 6.3 実裁E��釁E
- オンボ�EチE��ングのスチE��プに「ログイン/新規登録」を追加
- `AuthScreen`をオンボ�EチE��ング冁E��表示
- スキチE�E可能にする�E�ゲストモード！E

---

## 7. 隠されてぁE��機�Eの確誁E

### 7.1 featureFlagsで制御されてぁE��機�E
- `recipe`: false�E�Ehase 2で追加予定！E
- `streakTracker`: false
- `healthDevice`: false
- `community`: false�E�Ehase 4で追加予定！E
- `shop`: false�E�Ehase 4で追加予定！E
- `gift`: false�E�Ehase 4で追加予定！E
- `karmaCounter`: false�E�本番リリース時�E非表示�E�E

### 7.2 確認事頁E
- これら�E機�Eは削除されてぁE��ぁE��EeatureFlagsで制御されてぁE���E�E
- 開発時�E`VITE_ENABLE_ALL_FEATURES=true`で表示可能

---

**使用したRules**: #0, #1, #2, #5, #5.5.1, #6, #8, #10, #10.4, #10.5

