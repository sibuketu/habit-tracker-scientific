# Antigravity UI変更の復元計画

**作成日**: 2026-01-22  
**緊急度**: 高

---

## 🔍 確認された問題

### 1. InputScreenエラー
- **エラー**: `Failed to fetch dynamically imported module: http://localhost:5174/src/screen/InputScreen.tsx`
- **原因**: パスが間違っている可能性（`screen` → `screens`）

### 2. AISpeedDial（赤いFAB）が全画面に表示
- **場所**: 全画面の右下に赤い🤖ボタン
- **ファイル**: `src/components/dashboard/AISpeedDial.tsx`
- **表示条件**: `App.tsx`の636行目で条件付き表示

### 3. 未追跡ファイル
- `capacitor.config.ts` - 新規作成

### 4. 未使用コンポーネント
- `src/components/dashboard/GeminiStyleChatInput.tsx` - 作成されているが未使用

---

## ✅ 復元手順

### ステップ1: AISpeedDialを非表示にする（最優先）

**方法1: featureFlagsで非表示**
```typescript
// src/utils/featureFlags.ts
export const FEATURE_FLAGS = {
  // ...
  aiFeatures: false, // 一時的に無効化
};
```

**方法2: App.tsxでコメントアウト**
```typescript
// src/App.tsx の636行目付近
{/* 一時的に非表示
{getFeatureDisplaySettings().aiSpeedDial && isFeatureEnabled('aiFeatures') && (
  <AISpeedDial
    onOpenFatTab={openFatTabCallback || undefined}
    onAddFood={addFoodCallback || undefined}
  />
)}
*/}
```

### ステップ2: InputScreenのエラーを修正

**確認事項**:
- `src/screens/InputScreen.tsx`のパスが正しいか
- 動的インポートのパスが正しいか

**修正方法**:
```typescript
// src/App.tsx の51行目付近
const LazyInputScreen = lazy(() => import('./screens/InputScreen')); // パス確認
```

### ステップ3: 未使用ファイルの削除

```powershell
Remove-Item src/components/dashboard/GeminiStyleChatInput.tsx
Remove-Item capacitor.config.ts  # 必要な場合は確認してから
```

### ステップ4: Gitで変更を確認

```powershell
git status
git diff
git log --oneline -10
```

---

## 🚨 緊急復元（全ての変更を元に戻す）

### オプションA: 特定のファイルを復元
```powershell
git checkout HEAD -- src/App.tsx
git checkout HEAD -- src/utils/featureFlags.ts
```

### オプションB: 完全リセット（注意）
```powershell
git reset --hard HEAD
git clean -fd
```

**注意**: 全ての未コミット変更が削除されます。

---

## 📋 確認済みスクリーンショット

1. **HomeScreen**: `antigravity-ui-change-home.png`
2. **LabsScreen**: `antigravity-ui-change-labs.png` - 赤いFABが表示
3. **InputScreen**: `antigravity-ui-change-input.png` - エラー表示

---

## 📝 次のステップ

1. **AISpeedDialを非表示にする**（最優先）
2. **InputScreenのエラーを修正**
3. **未使用ファイルを削除**
4. **動作確認**

---

**使用したRules**: #0, #1, #2, #5.6, #6, #10
