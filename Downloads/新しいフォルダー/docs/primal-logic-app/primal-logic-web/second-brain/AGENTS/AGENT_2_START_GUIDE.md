# Agent 2 起動手頁E SNS自動投稿シスチE��構篁E

> **目皁E*: Agent 2がSNS自動投稿シスチE���E�Eupabase Functions�E�を構築するため�E起動手頁E

---

## 🚀 開始手頁E

### 0. ⚠�E�E重要E Rules参�E�E�忁E��！E

**こ�Eタスクを開始する前に、忁E��以下を確認すること�E�E*

1. **マスタールール**: `second-brain/RULES/master_rule.mdc`を読み込む
   - 全Agent共通�Eルール
   - タスク開始時に忁E��参�Eすること

2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する
   - こ�Eタスクは「機�E実裁E��Eupabase Functions�E�」タイチE
   - 重要Rules: #0, #1, #2, #7

3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する
   - `second-brain/THINKING_PROCESS.md`に記録
   - 使用したRules番号と適用方法を併訁E

**Rulesを参照しなぁE��合、ルール違反として扱ぁE��E*

詳細は `second-brain/AGENTS/RULES_SHARING_PROTOCOL.md` を参照、E

### 1. 引き継ぎ賁E��を確誁E

以下�Eファイルを忁E��読む�E�E
- `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` - 詳細な引き継ぎ賁E��
- `VIDEO_WORKFLOW.md` - ワークフロー詳細
- `SNS_HOOK_CONTENT_PLAN.md` - コンチE��チE��成計画
- `second-brain/RULES/master_rule.mdc` - **マスタールール�E�忁E��！E*

### 2. 状態を更新

`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` を開き、�E刁E�E状態を「🔁E実行中」に更新、E

### 3. Supabase FunctionsのセチE��アチE�E

#### 3.1. Supabase CLIのインスト�Eル

```bash
# Windows (PowerShell)
irm https://github.com/supabase/cli/releases/latest/download/supabase_windows_amd64.zip -OutFile supabase.zip
Expand-Archive supabase.zip -DestinationPath .
Move-Item supabase.exe C:\Windows\System32\supabase.exe

# macOS
brew install supabase/tap/supabase

# Linux
curl -fsSL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar -xz
sudo mv supabase /usr/local/bin/
```

#### 3.2. Supabaseプロジェクト�E初期匁E

```bash
# プロジェクトルートで実衁E
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"

# Supabaseプロジェクトを初期化（既存�E場合�EスキチE�E�E�E
supabase init

# Supabaseにログイン
supabase login

# プロジェクトをリンク�E�既存�ESupabaseプロジェクトがある場合！E
supabase link --project-ref YOUR_PROJECT_REF
```

#### 3.3. ローカル開発環墁E�E構篁E

```bash
# ローカルSupabase環墁E��起動！Eockerが忁E��E��E
supabase start

# 起動後、以下�E惁E��が表示される！E
# - API URL: http://localhost:54321
# - anon key: ...
# - service_role key: ...
```

#### 3.4. チE�Eタベ�Eススキーマ�E作�E

```bash
# SQL Editorでスキーマを実衁E
# Supabase Dashboard ↁESQL Editor ↁENew Query
# `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` の「データベ�Eススキーマ設計」セクションのSQLを実衁E
```

#### 3.5. 環墁E��数の設定（ローカル�E�E

```bash
# ローカル環墁E��数を設定！Eenv.local また�E supabase/.env�E�E
# 注愁E 本番環墁E��は `supabase secrets set` を使用

# 侁E .env.local ファイルを作�E
HEYGEN_API_KEY=your_heygen_api_key
YOUTUBE_API_KEY=your_youtube_api_key
# ... 他�EAPI Keys
```

#### 3.6. 本番環墁E�E環墁E��数設宁E

```bash
# Supabase Secretsに環墁E��数を設宁E
supabase secrets set HEYGEN_API_KEY=your_heygen_api_key
supabase secrets set YOUTUBE_API_KEY=your_youtube_api_key
supabase secrets set YOUTUBE_CLIENT_ID=your_youtube_client_id
supabase secrets set YOUTUBE_CLIENT_SECRET=your_youtube_client_secret
supabase secrets set YOUTUBE_ACCESS_TOKEN=your_youtube_access_token
supabase secrets set TIKTOK_CLIENT_KEY=your_tiktok_client_key
supabase secrets set TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
supabase secrets set TIKTOK_ACCESS_TOKEN=your_tiktok_access_token
supabase secrets set META_APP_ID=your_meta_app_id
supabase secrets set META_APP_SECRET=your_meta_app_secret
supabase secrets set META_ACCESS_TOKEN=your_meta_access_token
supabase secrets set INSTAGRAM_USER_ID=your_instagram_user_id
supabase secrets set FACEBOOK_PAGE_ID=your_facebook_page_id
supabase secrets set PINTEREST_APP_ID=your_pinterest_app_id
supabase secrets set PINTEREST_APP_SECRET=your_pinterest_app_secret
supabase secrets set PINTEREST_ACCESS_TOKEN=your_pinterest_access_token
supabase secrets set PINTEREST_BOARD_ID=your_pinterest_board_id
supabase secrets set LINKEDIN_CLIENT_ID=your_linkedin_client_id
supabase secrets set LINKEDIN_CLIENT_SECRET=your_linkedin_client_secret
supabase secrets set LINKEDIN_ACCESS_TOKEN=your_linkedin_access_token
supabase secrets set LINKEDIN_PERSON_URN=your_linkedin_person_urn
```

#### 3.7. FunctionsチE��レクトリ構造の作�E

```bash
# チE��レクトリ構造を作�E
mkdir -p supabase/functions/orchestrator
mkdir -p supabase/functions/create-video
mkdir -p supabase/functions/publish-youtube
mkdir -p supabase/functions/publish-tiktok
mkdir -p supabase/functions/publish-instagram
mkdir -p supabase/functions/publish-facebook
mkdir -p supabase/functions/publish-linkedin
mkdir -p supabase/functions/publish-pinterest
mkdir -p supabase/functions/shared
```

#### 3.8. ローカルでのFunction実衁E

```bash
# ローカルでFunctionを実行（開発中�E�E
supabase functions serve orchestrator --no-verify-jwt

# また�E、�EてのFunctionsを起勁E
supabase functions serve --no-verify-jwt
```

#### 3.9. チE�Eロイ

```bash
# 各Functionをデプロイ
supabase functions deploy orchestrator
supabase functions deploy create-video
supabase functions deploy publish-youtube
supabase functions deploy publish-tiktok
supabase functions deploy publish-instagram
supabase functions deploy publish-facebook
supabase functions deploy publish-linkedin
supabase functions deploy publish-pinterest
```

---

## 📋 Agent 2への持E���E�コピ�E用�E�E

```
あなた�E「Agent 2」です。SNS自動投稿シスチE���E�Eupabase Functions�E��E構築を拁E��します、E

【作業冁E��、E
1. `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` を開ぁE��、�E刁E�E状態を「🔁E実行中」に更新
2. `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` を読んで、詳細な要件を確誁E
3. Supabase Functionsの構造を作�E
4. 各SNS投稿Functionを実裁E��EouTube, TikTok, Instagram, Facebook, LinkedIn, Pinterest, X/Twitter, Threads�E�E
5. orchestrator Functionを実裁E���E体統合！E
6. 環墁E��数を設宁E
7. チE�Eロイ・チE��ト実衁E
8. 作業完亁E��、`second-brain/AGENT_2_REPORT.md` に結果を記録
9. `MULTI_AGENT_RELEASE_WORK.md` の状態を「✅ 完亁E��に更新

【重要、E
- Agent 1のコンチE��チE��式！EarnivoreContent�E�を忁E��確誁E
- 全7プラチE��フォームへの投稿を実裁E
- エラーハンドリングを徹底！EつのプラチE��フォームで失敗しても他�E継続！E
- API無料枠の制限に注意！E日3本であれば問題なし！E
- 作業開始�E完亁E��に忁E�� `MULTI_AGENT_RELEASE_WORK.md` を更新

【参照ファイル、E
- `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` - 詳細な引き継ぎ賁E��
- `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` - 作業刁E��表
- `VIDEO_WORKFLOW.md` - ワークフロー詳細
- `second-brain/RULES/master_rule.mdc` - **マスタールール�E�忁E��！E*
- `second-brain/AGENTS/RULES_SHARING_PROTOCOL.md` - Rules共有�Eロトコル
```

---

## 🔧 トラブルシューチE��ング

### よくあるエラーと対処況E

#### 1. "Function not found" エラー

**原因**: FunctionがデプロイされてぁE��ぁE��また�E名前が間違ってぁE��

**対処況E*:
```bash
# Functionの一覧を確誁E
supabase functions list

# 再デプロイ
supabase functions deploy FUNCTION_NAME
```

#### 2. "Environment variable not set" エラー

**原因**: 環墁E��数が設定されてぁE��ぁE

**対処況E*:
```bash
# 環墁E��数を確誁E
supabase secrets list

# 環墁E��数を設宁E
supabase secrets set VARIABLE_NAME=value
```

#### 3. "Database connection failed" エラー

**原因**: Supabase接続情報が間違ってぁE��、また�ERLSポリシーが設定されてぁE��ぁE

**対処況E*:
- Supabase Dashboardで接続情報を確誁E
- RLSポリシーが正しく設定されてぁE��か確認！Esecond-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` の「データベ�Eススキーマ設計」セクションを参照�E�E

#### 4. "API rate limit exceeded" エラー

**原因**: APIのレート制限に達しぁE

**対処況E*:
- 1日3本の制限�Eで運用する
- エラーログを確認して、どのAPIが制限に達したか確誁E
- 忁E��に応じて、リトライ間隔を調整

#### 5. "Video generation timeout" エラー

**原因**: HeyGen APIの動画生�EがタイムアウトしぁE

**対処況E*:
- `pollVideoStatus` 関数の `maxAttempts` を増やす（デフォルチE 60囁E= 5刁E��E
- スクリプトの長さを確認！Ereeプラン: 500斁E��、有料�Eラン: 5000斁E��！E

#### 6. "Authentication failed" エラー

**原因**: APIキーまた�Eアクセスト�Eクンが無効

**対処況E*:
- 各SNSプラチE��フォームの開発老E��チE��ュボ�EドでAPIキーを確誁E
- アクセスト�Eクンの有効期限を確認（忁E��に応じて再取得！E

### チE��チE��方況E

#### 1. ローカルログの確誁E

```bash
# Supabase CLIでログを確誁E
supabase functions logs FUNCTION_NAME

# リアルタイムでログを確誁E
supabase functions logs FUNCTION_NAME --follow
```

#### 2. エラーログチE�Eブルの確誁E

```sql
-- Supabase Dashboard ↁESQL Editor
SELECT * FROM error_logs 
ORDER BY created_at DESC 
LIMIT 10;
```

#### 3. 投稿履歴の確誁E

```sql
-- 投稿履歴を確誁E
SELECT 
  sp.platform,
  sp.status,
  sp.post_url,
  sp.error_message,
  sp.created_at
FROM sns_posts sp
ORDER BY sp.created_at DESC
LIMIT 20;
```

#### 4. コンチE��チE�E状態確誁E

```sql
-- コンチE��チE�E状態を確誁E
SELECT 
  id,
  title,
  video_status,
  video_url,
  created_at
FROM carnivore_content
ORDER BY created_at DESC
LIMIT 10;
```

---

## ✁E完亁E��件

- [ ] 全6プラチE��フォーム�E�EouTube, Instagram, TikTok, Facebook, LinkedIn, Pinterest�E��E投稿Functionが実裁E��亁E
- [ ] orchestratorが正常に動佁E
- [ ] 環墁E��数が�Eて設定済み
- [ ] チE��ト実行が成功
- [ ] Agent 1からの呼び出しが正常に動佁E
- [ ] エラーハンドリングが正常に動作！EつのプラチE��フォームで失敗しても他�E継続！E
- [ ] エラーログが正しく記録されめE
- [ ] X/Twitter手動投稿用のURLリストが生�EされめE
- [ ] レポ�Eト作�E完亁E

---

**作�E日**: 2026-01-20  
**更新日**: 2026-01-20

