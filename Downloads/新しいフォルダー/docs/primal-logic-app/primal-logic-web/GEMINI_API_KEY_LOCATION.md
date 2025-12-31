# Gemini APIキーの設定場所

## 📍 設定ファイルの場所

**`.env` ファイル**:
```
primal-logic-app/primal-logic-web/.env
```

**完全なパス**:
```
C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\.env
```

---

## 🔑 APIキーの設定方法

### 1. `.env`ファイルを開く

**方法1: Cursor内から開く**
- 左サイドバーのファイルツリーで `primal-logic-app` → `primal-logic-web` → `.env` をクリック

**方法2: エクスプローラーから開く**
- エクスプローラーで `primal-logic-app/primal-logic-web` フォルダを開く
- `.env` ファイルを右クリック → 「Cursorで開く」

---

### 2. APIキーを取得

1. **[Google AI Studio](https://aistudio.google.com/app/apikey)** にアクセス
2. 「Create API Key」をクリック
3. プロジェクトを選択（または新規作成）
4. APIキーをコピー（`AIzaSy...`で始まる）

---

### 3. `.env`ファイルに貼り付け

**設定例**:
```env
VITE_GEMINI_API_KEY=AIzaSy...（実際のAPIキーを貼り付け）
```

**重要**: 
- `=` の前後にスペースを入れない
- コメント（`#`）を同じ行に入れない
- APIキーは`AIzaSy...`で始まる形式

---

### 4. 開発サーバーを再起動

`.env`ファイルを変更した後は、**必ず開発サーバーを再起動**してください。

**再起動方法**:
1. 現在の開発サーバーを停止（Ctrl+C）
2. `npm run dev` を再実行

---

## ✅ 設定確認

設定が正しく行われているか確認する方法:

1. ブラウザのコンソールを開く（F12）
2. エラーが表示されていないか確認
3. AIチャット機能を試す

**エラーが出る場合**:
- `Gemini APIキーが設定されていません` → `.env`ファイルを確認
- `VITE_GEMINI_API_KEY` が正しく設定されているか確認
- 開発サーバーを再起動したか確認

---

## 🔒 セキュリティ注意事項

**重要**: 
- `.env`ファイルは**絶対にGitにコミットしない**（`.gitignore`に追加されているはず）
- APIキーをチャットや公開場所に貼り付けない
- APIキーを他人と共有しない

---

最終更新: 2025-12-20

