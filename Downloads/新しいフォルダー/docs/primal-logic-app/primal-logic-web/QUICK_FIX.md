# React Hooks エラー - クイック修正

> 最終更新: 2025-12-18

---

## 🚀 修正手順（3ステップ）

### 1. 開発サーバーを停止
Ctrl+C で開発サーバーを停止

### 2. 依存関係を再インストール
```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item package-lock.json -ErrorAction SilentlyContinue
npm install
```

### 3. 開発サーバーを再起動
```powershell
npm run dev
```

### 4. ブラウザをハードリロード
- **Ctrl+Shift+R** (Windows)
- または、ブラウザのキャッシュをクリア

---

## ✅ 修正内容

1. **vite.config.ts**: Reactの重複を防ぐ設定を追加
2. **node_modules**: 完全に再インストールしてReactの重複を解消

---

## 🐛 まだエラーが出る場合

ブラウザの開発者ツールで以下を確認：
1. **Application** タブ → **Clear storage** → **Clear site data**
2. ブラウザを完全に閉じて再起動
3. 再度 `npm run dev` を実行

---

最終更新: 2025-12-18

