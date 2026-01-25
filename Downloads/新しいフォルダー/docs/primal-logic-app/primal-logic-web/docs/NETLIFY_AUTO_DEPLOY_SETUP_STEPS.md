# Netlify自動デプロイ設定手順（実行用）

## 現在の状況
- GitHubリポジトリ: `https://github.com/sibuketu/CarnivoreGuid.git`
- リモート: `origin` に設定済み
- `netlify.toml`: 設定済み

## 自動デプロイ設定手順

### Step 1: NetlifyダッシュボードでGit連携を有効化

1. https://app.netlify.com にログイン
2. サイト「carnivos」を選択
3. サイト設定 → 「Build & deploy」を開く
4. 「Continuous Deployment」セクションを確認
5. 「Link repository」または「Connect to Git provider」をクリック
6. GitHubを選択して認証
7. リポジトリ「CarnivoreGuid」を選択
8. ブランチ: `main` を選択
9. ビルド設定（`netlify.toml`が自動で読み込まれる）:
   - Build command: `npm run build`
   - Publish directory: `dist`
10. 「Deploy site」をクリック

### Step 2: 環境変数の設定

1. サイト設定 → 「Environment variables」を開く
2. 以下の変数を追加（既にある場合は確認）:
   - `VITE_GEMINI_API_KEY`
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_REPLICATE_API_TOKEN`（オプション）

### Step 3: 初回デプロイの確認

1. 「Deploys」タブを開く
2. 自動デプロイが開始されることを確認
3. デプロイが完了したら、URLが更新されていることを確認

### Step 4: 動作確認

1. ローカルで変更をコミット:
   ```powershell
   git add .
   git commit -m "Test auto deploy"
   git push origin main
   ```
2. Netlifyの「Deploys」タブで自動デプロイが開始されることを確認

## 自動デプロイのメリット

- `git push`で自動デプロイ
- コミットハッシュで管理可能
- ロールバックが簡単
- デプロイ履歴が明確
