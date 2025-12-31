# Netlify環境変数設定用テンプレート

Netlifyの環境変数インポート画面（画像の画面）で、以下の内容を「Contents of .env file:」のテキストエリアに貼り付けてください。

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_MAKEFILM_API_KEY=your_makefilm_api_key_here
VITE_HEYGEN_API_KEY=your_heygen_api_key_here
VITE_RUNWAY_API_KEY=your_runway_api_key_here
```

## 設定手順

1. Netlifyの環境変数設定画面を開く
2. 「Contents of .env file:」のテキストエリアに上記の内容を貼り付け
3. `your_gemini_api_key_here` を実際のGemini APIキーに置き換え
4. `your_supabase_project_url` を実際のSupabase URLに置き換え
5. `your_supabase_anon_key` を実際のSupabase ANON KEYに置き換え
6. 「Contains secret values」にチェックを入れる（推奨）
7. 「All scopes」を選択
8. 「All deploy contexts」を選択
9. インポートを実行

## 各環境変数の取得方法

- **VITE_GEMINI_API_KEY**: https://aistudio.google.com/app/apikey
- **VITE_SUPABASE_URL**: Supabase Dashboard → Settings → API → Project URL
- **VITE_SUPABASE_ANON_KEY**: Supabase Dashboard → Settings → API → Publishable key
- **VITE_MAKEFILM_API_KEY**: https://makefilm.jp/ (APIキー取得方法を確認)
- **VITE_HEYGEN_API_KEY**: https://www.heygen.com/api (APIキー取得方法を確認)
- **VITE_RUNWAY_API_KEY**: https://docs.runwayml.com/ (APIキー取得方法を確認)

