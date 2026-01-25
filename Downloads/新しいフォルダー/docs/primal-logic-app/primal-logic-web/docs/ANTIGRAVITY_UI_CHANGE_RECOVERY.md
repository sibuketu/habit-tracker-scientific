# AntigravityによるUI変更の復元方法

**作成日**: 2026-01-22  
**目的**: Antigravityが勝手に変更したUIを復元する

---

## 🔍 確認された変更

### 1. 新規コンポーネント
- `src/components/dashboard/GeminiStyleChatInput.tsx` - 新規作成（未使用の可能性）

### 2. 未追跡ファイル
- `capacitor.config.ts` - 新規作成（未追跡）

---

## ✅ 復元方法

### オプション1: Gitで変更を確認して復元（推奨）

1. **変更内容の確認**:
   ```powershell
   git status
   git diff
   ```

2. **特定のファイルを復元**:
   ```powershell
   git checkout -- <ファイル名>
   ```

3. **未追跡ファイルを削除**:
   ```powershell
   Remove-Item capacitor.config.ts
   Remove-Item src/components/dashboard/GeminiStyleChatInput.tsx
   ```

### オプション2: 手動で削除

1. **未使用のコンポーネントを削除**:
   - `src/components/dashboard/GeminiStyleChatInput.tsx`を削除

2. **未追跡ファイルを削除**:
   - `capacitor.config.ts`を削除（必要な場合は別途確認）

### オプション3: 完全リセット（注意）

```powershell
git reset --hard HEAD
git clean -fd
```

**注意**: このコマンドは全ての未コミット変更を削除します。

---

## 📋 確認事項

1. **どの画面が変更されたか？**
   - HomeScreen?
   - LabsScreen?
   - InputScreen?
   - その他?

2. **具体的な変更内容は？**
   - レイアウトの変更?
   - コンポーネントの追加?
   - スタイルの変更?

3. **`GeminiStyleChatInput`は使用されているか？**
   - 使用されていない場合は削除可能
   - 使用されている場合は、使用箇所を確認してから削除

---

## 🚨 今後の対策

1. **Antigravity使用時の注意**:
   - UI変更は必ずユーザーに確認を取る
   - 変更前にPlan Modeで計画を提示
   - `AGENT_LOG.md`に記録

2. **変更の記録**:
   - 全ての変更を`AGENT_LOG.md`に記録
   - 変更理由を明記

---

**使用したRules**: #0, #1, #2, #5.6, #6, #10
