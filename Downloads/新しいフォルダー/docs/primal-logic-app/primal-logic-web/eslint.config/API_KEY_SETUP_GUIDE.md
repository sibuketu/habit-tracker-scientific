# APIキー設定ガイチE

## Gemini APIキー�E�アプリのAIチャチE��機�E�E�E

### 設定場所

`.env` ファイルに以下を追加�E�E

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

### APIキー取得方況E

1. **[Google AI Studio](https://aistudio.google.com/app/apikey)** にアクセス
2. 「Create API Key」をクリチE��
3. プロジェクトを選択（また�E新規作�E�E�E
4. APIキーをコピ�E
5. `.env`ファイルに貼り付け

---

## Replicate APIト�Eクン�E�画像生成�E自動化�E�E

### 設定場所

`.env` ファイルに以下を追加�E�E

```env
VITE_REPLICATE_API_TOKEN=r8_your_api_token_here
```

### APIト�Eクン取得方況E

1. **[Replicate](https://replicate.com/)** にアクセス�E�クリチE��で開きます！E
2. アカウント作�E�E�無料！E
3. **[API Tokens](https://replicate.com/account/api-tokens)** にアクセス�E�クリチE��で開きます！E
4. 「Create token」をクリチE��
5. ト�Eクンをコピ�E�E�Er8_...`で始まる！E
6. `.env`ファイルに貼り付け

---

## Supabase�E�オプション - チE�Eタ永続化�E�E

### 設定場所

`.env` ファイルに以下を追加�E�E

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 取得方況E

1. **[Supabase](https://supabase.com/)** にアクセス�E�クリチE��で開きます！E
2. プロジェクトを作�E
3. 「Settings」�E「API」でURLとAnon Keyをコピ�E
4. `.env`ファイルに貼り付け

---

## .envファイルの場所

`primal-logic-app/primal-logic-web/.env`

---

## 設定後�E手頁E

1. `.env`ファイルを保孁E
2. 開発サーバ�Eを�E起動（�E動で実行されます！E


