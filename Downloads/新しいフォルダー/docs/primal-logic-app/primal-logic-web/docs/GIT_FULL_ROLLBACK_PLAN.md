# Git完全ロールバック計画

**作成日**: 2026-01-25  
**目的**: Antigravityによる変更を完全に取り消し、安定した状態に戻す

---

## 現状の問題

- UIが「ありえないくらい」おかしい
- 前の状態と「ありえないくらい」異なる
- 個別修正では対応できないレベル

---

## ロールバック方針

### 1. 保持するもの（自然言語の記録）
- `docs/` 配下のすべてのMarkdownファイル
- 会話の記録（AGENT_LOG.md等）
- 要件定義や設計ドキュメント

### 2. 戻すもの（コード）
- `src/` 配下のすべてのコード
- `package.json`, `tsconfig.json` 等の設定ファイル
- その他のコードファイル

---

## 実行手順

### Step 1: 現在の状態を確認
```powershell
git status
git log --oneline -10
```

### Step 2: 適切なコミットを特定
- Antigravityが変更を加える前のコミットを特定
- 安定していた状態のコミットを選択

### Step 3: 完全ロールバック
```powershell
# すべての変更を破棄
git reset --hard <commit-hash>

# 未追跡ファイルを削除
git clean -fd

# Viteキャッシュをクリア
Remove-Item -Recurse -Force node_modules/.vite -ErrorAction SilentlyContinue
```

### Step 4: 開発サーバー再起動
```powershell
npm run dev
```

---

## 注意事項

- **自然言語の記録は保持**: `docs/` 配下はGit管理外または別ブランチで保持
- **会話の記録は残す**: 今回の経験を記録として残す
- **完全に戻す**: コードは完全に以前の状態に戻す

---

## 実行後の確認

- [ ] アプリが正常に起動する
- [ ] UIが以前の状態に戻っている
- [ ] コンソールにエラーが表示されない
- [ ] すべての画面が正常に表示される
