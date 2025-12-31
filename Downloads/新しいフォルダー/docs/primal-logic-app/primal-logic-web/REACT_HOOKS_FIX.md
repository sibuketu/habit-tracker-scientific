# React Hooks エラー完全修正ガイド

> 最終更新: 2025-12-18

---

## 🔧 修正内容

### 1. Vite設定の更新
- `vite.config.ts` に `resolve.alias` を追加
- ReactとReact DOMの重複を防ぐ `dedupe` 設定を追加
- `optimizeDeps` でReactを明示的に含める

### 2. 依存関係の再インストール（必須）

このエラーは、node_modulesに複数のReactコピーが存在する可能性が高いです。

---

## 🚀 完全修正手順

### ステップ1: 開発サーバーを停止
Ctrl+C で開発サーバーを停止

### ステップ2: node_modulesとキャッシュを完全削除
```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"

# node_modulesを削除
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue

# package-lock.jsonを削除
Remove-Item package-lock.json -ErrorAction SilentlyContinue

# Viteキャッシュを削除
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### ステップ3: 依存関係を再インストール
```powershell
npm install
```

### ステップ4: 開発サーバーを再起動
```powershell
npm run dev
```

### ステップ5: ブラウザを完全リロード
- **ハードリロード**: Ctrl+Shift+R (Windows)
- または、ブラウザのキャッシュを完全にクリア

---

## ✅ 確認項目

修正後、以下を確認してください：

1. ✅ ブラウザコンソールにエラーが表示されない
2. ✅ アプリが正常に起動する
3. ✅ すべての画面が正常に表示される
4. ✅ Hooksが正常に動作する（useState, useEffectなど）

---

## 🐛 まだエラーが発生する場合

### 依存関係の確認
```powershell
npm list react react-dom
```

すべてのReactパッケージが同じバージョン（19.2.0）であることを確認してください。

### 完全なクリーンアップ
```powershell
# すべてを削除
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
Remove-Item -Recurse -Force .vite

# 再インストール
npm install

# 開発サーバー起動
npm run dev
```

---

## 📝 技術的詳細

### エラーの原因
- React 19は比較的新しいバージョンで、Viteの依存関係解決に問題が発生する可能性がある
- node_modulesに複数のReactコピーが存在すると、Hooksが正しく動作しない
- Viteのキャッシュが古い状態を保持している可能性がある

### 解決策
- `vite.config.ts` でReactの解決方法を明示的に指定
- `dedupe` で重複を防ぐ
- `optimizeDeps` でReactを明示的に含める
- node_modulesを完全に再インストール

---

最終更新: 2025-12-18

