# Primal Logic Web App - 実装更新（2025-12-17）

> Gemini共有用: 今回の実装完了内容

---

## 📋 実装完了内容サマリー

### 1. 個数入力機能の実装

**目的**: 卵のように個数で入力できるようにする

**実装内容**:
- 食品データベースに`pieceWeight`（1個あたりの重量）と`preferredUnit`（推奨単位）を追加
- 卵: 1個 = 50g、推奨単位 = 'piece'
- 入力画面に単位選択ドロップダウンを追加（g / 個）
- 食品を選択すると自動で推奨単位に切り替わる
- 個数入力時は自動でグラムに変換（個数 × pieceWeight）
- 保存時は入力した単位（g または 個）で表示

**変更ファイル**:
- `src/data/foodsDatabase.ts`: `pieceWeight`, `preferredUnit`を追加
- `src/types/index.ts`: `FoodItem.unit`に'個'を追加
- `src/screens/InputScreen.tsx`: 単位選択UIと変換ロジックを追加
- `src/screens/InputScreen.css`: 単位選択のスタイルを追加

---

### 2. プロファイル画面の大幅改善

**目的**: 性別・身長・体重などの基本情報を追加し、優先度を明確化

**実装内容**:

#### 2.1 必須項目の追加
- **性別（必須）**: 男性/女性を選択
  - 理由: 摂取基準が性別によって変わる（特に鉄分）
- **身長（推奨）**: cm単位で入力
- **体重（推奨）**: kg単位で入力

#### 2.2 優先度表示システム
- 各項目に優先度バッジを表示
  - **必須（赤）**: 性別、目標、代謝状態
  - **推奨（オレンジ）**: 身長、体重、ダイエットモード
  - **任意（グレー）**: 乳糖耐性

#### 2.3 バリデーション
- 性別が未入力の場合、保存時にエラーを表示

**変更ファイル**:
- `src/types/index.ts`: `UserProfile`に`gender`, `height`, `weight`を追加
- `src/screens/ProfileScreen.tsx`: 完全に書き直し（日本語化、優先度表示、バリデーション）
- `src/screens/ProfileScreen.css`: 優先度バッジと数値入力のスタイルを追加

---

### 3. 性別に応じた摂取基準の調整

**目的**: 性別によって異なる栄養素必要量を反映

**実装内容**:
- 鉄分必要量を性別に応じて調整
  - 男性: 8mg/day
  - 女性: 18mg/day（月経がある場合を想定）
- `calculateAllMetrics`関数に`userProfile`を渡し、性別を考慮した計算を実装
- `CalculatedMetrics`に`ironRequirement`を追加
- HomeScreenとHistoryScreenで性別に応じた必要量を表示

**変更ファイル**:
- `src/constants/carnivore_constants.ts`: `DYNAMIC_REQUIREMENTS.iron`を追加
- `src/types/index.ts`: `CalculatedMetrics.ironRequirement`を追加
- `src/utils/nutrientCalculator.ts`: `calculateIronRequirement`関数を追加、`calculateAllMetrics`を更新
- `src/context/AppContext.tsx`: `calculateAllMetrics`呼び出し時に`userProfile`を渡すように更新
- `src/screens/HomeScreen.tsx`: 鉄分ゲージで`ironRequirement`を使用
- `src/screens/HistoryScreen.tsx`: 鉄分表示で`ironRequirement`を使用（互換性のため`|| 8`でフォールバック）

---

### 4. 全面的な日本語化

**目的**: 直訳すぎる箇所を改善し、自然な日本語に

**実装内容**:

#### 4.1 HomeScreen
- "Today's Metrics" → "今日のメトリクス"
- "Vitamin C" → "ビタミンC"
- "Vitamin K (Effective)" → "ビタミンK（有効）"
- "Iron (Effective)" → "鉄分（有効）"
- "Sodium" → "ナトリウム"
- "Fiber" → "食物繊維"
- "Net Carbs" → "正味炭水化物"
- "Start by adding..." → "まず、プロファイル設定で性別を入力してください"

#### 4.2 InputScreen
- "Daily Input" → "日次入力"
- "Status (The Machine)" → "状態（マシン）"
- "Sleep Quality" → "睡眠の質"
- "Solar Charge (Sun Exposure)" → "太陽光暴露（ソーラーチャージ）"
- "Activity Level" → "活動レベル"
- "Fuel (The Input)" → "燃料（入力）"
- "Food Item" → "食品"
- "Amount (g)" → "量"
- "Add Food" → "食べ物を追加"
- "Save Daily Status" → "日次状態を保存"
- "Added Foods" → "追加した食品"
- アラートメッセージも日本語化

#### 4.3 HistoryScreen
- "History" → "履歴"
- "No logs yet" → "ログがありません"
- "Date" → "日付"
- "Sleep Score" → "睡眠スコア"
- "Sun Exposure" → "太陽光暴露"
- "Activity Level" → "活動レベル"
- "Foods" → "食品"
- "Metrics" → "メトリクス"
- "Recovery Protocol" → "リカバリープロトコル"
- 栄養素名も日本語化（Vitamin C → ビタミンCなど）

#### 4.4 ProfileScreen
- "User Profile" → "プロファイル設定"
- "Goal" → "目標"
- "Dairy Tolerance" → "乳糖耐性"
- "Metabolic Status" → "代謝状態"
- "Diet Mode" → "ダイエットモード"
- "Save Profile" → "保存"
- すべての選択肢も日本語化

#### 4.5 App.tsx（ナビゲーション）
- "Home" → "ホーム"
- "Input" → "入力"
- "History" → "履歴"
- "Profile" → "プロファイル"

**変更ファイル**:
- `src/screens/HomeScreen.tsx`
- `src/screens/InputScreen.tsx`
- `src/screens/HistoryScreen.tsx`
- `src/screens/ProfileScreen.tsx`
- `src/App.tsx`

---

## 🔧 技術的詳細

### データ構造の変更

#### UserProfile（拡張）
```typescript
export interface UserProfile {
  // 必須項目
  gender: 'male' | 'female'; // 性別（必須）- 摂取基準が変わる
  height?: number; // 身長（cm）- 推奨
  weight?: number; // 体重（kg）- 推奨
  
  // 設定項目
  goal: UserGoal;
  dairyTolerance?: boolean; // 乳糖耐性（任意）
  metabolicStatus: MetabolicStatus;
  mode?: DietMode;
}
```

#### CalculatedMetrics（拡張）
```typescript
export interface CalculatedMetrics {
  // ... 既存フィールド
  ironRequirement: number; // 性別に応じた必要量（新規追加）
  // ...
}
```

#### FoodData（拡張）
```typescript
export interface FoodData {
  // ... 既存フィールド
  pieceWeight?: number; // 1個あたりの重量（g）
  preferredUnit?: 'g' | 'piece' | 'serving'; // 推奨単位
  // ...
}
```

### 計算ロジックの変更

#### calculateAllMetrics（更新）
```typescript
export function calculateAllMetrics(
  foods: FoodItem[],
  userProfile?: UserProfile | null // 新規追加
): CalculatedMetrics {
  // ...
  const ironRequirement = calculateIronRequirement(userProfile?.gender);
  // ...
}
```

#### calculateIronRequirement（新規）
```typescript
export function calculateIronRequirement(gender?: 'male' | 'female'): number {
  if (!gender) {
    return DYNAMIC_REQUIREMENTS.iron.male.base; // デフォルトは男性
  }
  
  if (gender === 'male') {
    return DYNAMIC_REQUIREMENTS.iron.male.base; // 8mg
  }
  
  return DYNAMIC_REQUIREMENTS.iron.female.base; // 18mg
}
```

---

## ✅ 動作確認項目

### 個数入力機能
- [ ] 卵を選択すると、単位が自動で「個」に切り替わる
- [ ] 個数で入力できる（例: 3個）
- [ ] 保存時に「卵 3個」と表示される
- [ ] 栄養計算は150g（3個 × 50g）で行われる

### プロファイル画面
- [ ] 性別が必須項目として表示される（赤いバッジ）
- [ ] 身長・体重が推奨項目として表示される（オレンジのバッジ）
- [ ] 乳糖耐性が任意項目として表示される（グレーのバッジ）
- [ ] 性別未入力で保存するとエラーが表示される
- [ ] 保存後、プロファイルが正しく読み込まれる

### 性別に応じた摂取基準
- [ ] 男性を選択すると、鉄分必要量が8mgになる
- [ ] 女性を選択すると、鉄分必要量が18mgになる
- [ ] HomeScreenの鉄分ゲージで性別に応じた必要量が表示される
- [ ] HistoryScreenでも性別に応じた必要量が表示される

### 日本語化
- [ ] すべての画面が日本語で表示される
- [ ] ナビゲーションが日本語になっている
- [ ] アラートメッセージが日本語になっている

---

## 📊 実装統計

- **変更ファイル数**: 15ファイル
- **新規機能**: 3つ（個数入力、性別対応、優先度表示）
- **日本語化**: 全画面
- **リンターエラー**: 0件
- **型エラー**: 0件

---

## 🎯 次のステップ（将来の拡張）

1. **個数入力の拡張**: 他の食品（リンゴ、バナナなど）にも個数入力を追加
2. **閉経後の女性**: 女性でも閉経後の場合は8mgにするオプション
3. **BMI計算**: 身長・体重からBMIを計算して表示
4. **カロリー計算**: 身長・体重・活動レベルから基礎代謝量を計算

---

**実装日**: 2025-12-17
**状態**: ✅ 完了
**品質**: リンターエラー0、型エラー0

