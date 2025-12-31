# Viteキャッシュ問題の解決方法

> 最終更新: 2025-12-17

---

## 🔧 問題

`npm list` ではReactバージョンが一致しているのに、ブラウザでエラーが出る場合、**Viteのキャッシュ**が原因です。

ブラウザのキャッシュをクリアする必要はありません！

---

## ✅ 解決方法（ブラウザキャッシュは触らない）

### 1. 開発サーバーを停止
Ctrl+C で開発サーバーを停止

### 2. Viteキャッシュを削除
```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue
```

### 3. 開発サーバーを再起動
```powershell
npm run dev
```

### 4. ブラウザでハードリロード
- **Ctrl+Shift+R** (Windows)
- これでブラウザのキャッシュはクリアされず、Viteのキャッシュだけが更新されます

---

## 📝 説明

- **Viteキャッシュ**: `node_modules/.vite` に保存される開発サーバーのキャッシュ
- **ブラウザキャッシュ**: ブラウザに保存されるキャッシュ（ログイン情報なども含む）

Viteキャッシュを削除すれば、開発サーバーが最新の依存関係を読み込み直します。
ブラウザのキャッシュは触らないので、ログイン情報などは保持されます。

---

最終更新: 2025-12-17

