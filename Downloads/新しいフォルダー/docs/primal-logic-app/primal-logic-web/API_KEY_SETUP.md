# OpenAI API キー設定ガイド

## 概要

Primal LogicアプリのAIチャット機能を使用するには、OpenAI APIキーまたはGoogle Gemini APIキーが必要です。

**推奨:**
- **開発・テスト**: Gemini（無料枠が大きい）
- **本番環境**: 用途に応じて選択（詳細は `GEMINI_API_SETUP.md` を参照）

## TryAgain vs Resume（エラー処理について）

### TryAgain（再試行）
- **用途**: 一時的なネットワークエラーやレート制限エラー（429）の場合
- **実装**: ユーザーが手動で「再試行」ボタンをクリック
- **メリット**: シンプルで確実

### Resume（再開）
- **用途**: 長時間の会話セッションを維持したい場合
- **実装**: 会話履歴を保存し、途中から再開
- **メリット**: ユーザー体験が良い

**Primal Logicでの推奨**: **TryAgain**（シンプルで十分）
- カーニボアの質問は短い会話が多い
- 会話履歴は既に`messages` stateで管理されている
- エラー時は「再試行」ボタンを表示するだけで十分

## 1. OpenAI APIキーの取得方法

### ステップ1: OpenAIアカウントの作成

1. [OpenAI Platform](https://platform.openai.com/) にアクセス
2. 「Sign up」をクリックしてアカウントを作成
3. メールアドレスを確認

### ステップ2: APIキーの生成

1. ログイン後、右上のプロフィールアイコンをクリック
2. 「View API keys」を選択
3. 「Create new secret key」をクリック
4. キーに名前を付ける（例: "Primal Logic App"）
5. **重要:** 生成されたキーを**すぐにコピー**してください（後で表示されません）

### ステップ3: クレジットの追加

1. 左サイドバーの「Billing」を選択
2. 「Add payment method」をクリック
3. クレジットカード情報を入力
4. 初回利用時は$5程度のクレジットを追加することを推奨

**注意:** OpenAI APIは従量課金制です。GPT-4oモデルの使用料金は以下の通り：
- Input: $2.50 / 1M tokens
- Output: $10.00 / 1M tokens

## 2. アプリへのAPIキーの設定

### 方法1: 環境変数ファイル（推奨）

1. `primal-logic-web` ディレクトリに `.env` ファイルを作成（`.env.example`をコピー）

```bash
cd primal-logic-web
cp .env.example .env
```

2. `.env` ファイルを開き、以下のように設定：

```env
VITE_OPENAI_API_KEY=sk-your-api-key-here
```

3. **重要:** `.env` ファイルは `.gitignore` に含まれていることを確認してください（APIキーをGitにコミットしない）

### 方法2: 直接設定（開発用のみ）

開発中のみ、一時的にコードに直接設定することも可能ですが、**本番環境では絶対に使用しないでください**。

```typescript
// 一時的な設定（開発用のみ）
const API_KEY = 'sk-your-api-key-here';
```

## 3. 動作確認

1. アプリを起動（`npm run dev`）
2. 画面右下の🤖ボタンをクリック
3. AIチャットが開くことを確認
4. 簡単な質問を入力（例: "今日の食事についてアドバイスをください"）
5. カーニボア専用の回答が返ってくることを確認

## 4. トラブルシューティング

### エラー: "API request failed"

- APIキーが正しく設定されているか確認
- `.env` ファイルが正しい場所にあるか確認（`primal-logic-web` ディレクトリ直下）
- アプリを再起動（環境変数の変更は再起動が必要）

### エラー: "Insufficient quota"

- OpenAIアカウントにクレジットが残っているか確認
- 「Billing」ページで使用状況を確認

### エラー: "Invalid API key"

- APIキーが正しくコピーされているか確認（先頭の `sk-` が含まれているか）
- キーに余分なスペースや改行が含まれていないか確認

## 5. セキュリティ注意事項

⚠️ **重要:**

1. **APIキーをGitにコミットしない**
   - `.env` ファイルは必ず `.gitignore` に含める
   - GitHubなどの公開リポジトリにAPIキーをアップロードしない

2. **本番環境での設定**
   - 本番環境では環境変数やシークレット管理サービス（Vercel、Netlify、AWS Secrets Managerなど）を使用
   - クライアントサイドにAPIキーを直接埋め込まない（現在の実装は開発用）

3. **APIキーのローテーション**
   - 定期的にAPIキーを再生成することを推奨
   - 漏洩が疑われる場合は即座にキーを無効化

## 6. 代替案（APIキー不要）

将来的には、以下の代替案も検討できます：

1. **バックエンドAPI経由**
   - サーバー側でAPIキーを管理
   - クライアントからはサーバーAPIを呼び出す

2. **Supabase Edge Functions**
   - SupabaseのEdge FunctionsでOpenAI APIを呼び出す
   - 環境変数でAPIキーを管理

3. **他のAIサービス**
   - Anthropic Claude API
   - Google Gemini API
   - オープンソースのLLM（Ollamaなど）

## 7. 参考リンク

- [OpenAI Platform Documentation](https://platform.openai.com/docs)
- [OpenAI API Pricing](https://openai.com/api/pricing/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
