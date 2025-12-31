# .envファイルの正しい開き方

## 場所

`primal-logic-app/primal-logic-web/.env`

## 開き方

### ⚠️ Ctrl+P（クイックオープン）は使わない

**理由**: 別プロジェクトの`.env`が出てくる可能性がある

### ✅ 正しい開き方

**左サイドバーのファイルツリーで**:

1. `primal-logic-app` フォルダを展開
2. `primal-logic-web` フォルダを展開
3. `.env` ファイルをクリック

これで正しい`.env`ファイルが開けます。

---

## 設定が必要な環境変数

### 必須
- `VITE_GEMINI_API_KEY`: Gemini APIキー（AIチャット機能用）

### オプション
- `VITE_SUPABASE_URL`: Supabase Project URL
- `VITE_SUPABASE_ANON_KEY`: Supabase ANON KEY
- `VITE_REPLICATE_API_TOKEN`: Replicate APIトークン（画像生成用）

---

## 設定後の手順

1. `.env`ファイルを保存（Ctrl+S）
2. 開発サーバーを再起動（必須）
