# React Hooks エラー修正ガイド

> 最終更新: 2025-12-18

---

## 🔧 修正内容

### 1. AppContext.tsx の修正
- `React` の直接importを削除
- `ReactNode` を `type ReactNode` としてimport
- これにより、React 19との互換性を確保

### 2. manifest.json の修正
- 存在しないアイコンファイルへの参照を削除
- 空の `icons` 配列に変更

### 3. index.html の修正
- 非推奨の `apple-mobile-web-app-capable` に加えて、`mobile-web-app-capable` を追加

---

## 🚀 再起動手順

### 1. 開発サーバーを停止
Ctrl+C で開発サーバーを停止

### 2. node_modules を再インストール（推奨）
```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
Remove-Item -Recurse -Force node_modules
npm install
```

### 3. 開発サーバーを再起動
```powershell
npm run dev
```

### 4. ブラウザをリロード
- ハードリロード: Ctrl+Shift+R (Windows) / Cmd+Shift+R (Mac)
- または、ブラウザのキャッシュをクリア

---

## ✅ 確認項目

修正後、以下を確認してください：

1. **ブラウザコンソールにエラーが表示されない**
2. **アプリが正常に起動する**
3. **Hooksが正常に動作する**（useState, useEffectなど）

---

## 🐛 まだエラーが発生する場合

### 依存関係の確認
```powershell
npm list react react-dom
```

### キャッシュのクリア
```powershell
# Viteキャッシュをクリア
Remove-Item -Recurse -Force node_modules\.vite
```

### 完全な再インストール
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

最終更新: 2025-12-18

