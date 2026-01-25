# Supabase完�E設定ガイチE

> **作�E日**: 2026-01-21  
> **目皁E*: Supabaseの設定を完�Eに完亁E��るため�E詳細ガイチE

---

## 前提条件

- [ ] Supabaseアカウントを持ってぁE���E�また�E作�Eできる�E�E
- [ ] インターネット接続がある
- [ ] `.env`ファイルを作�E・編雁E��きる
- [ ] 開発サーバ�Eを�E起動できる

---

## スチE��チE: Supabaseプロジェクト�E作�E

### 1.1 アカウント�E作�E・ログイン

1. **[Supabase](https://supabase.com/)** にアクセス
2. 「Start your project」をクリチE��
3. アカウントがなぁE��合�E作�E�E�EitHubアカウントでログイン可能�E�E
4. アカウントがある場合�Eログイン

### 1.2 プロジェクト�E作�E

1. ダチE��ュボ�Eドで「New Project」をクリチE��
2. プロジェクト情報を�E力！E
   - **Name**: `primal-logic` また�E任意�E名前
   - **Database Password**: 強力なパスワードを設定！E*忁E��保存しておく**�E�E
   - **Region**: 最寁E��のリージョンを選抁E
     - 推奨: `Northeast Asia (Tokyo)`�E�日本からアクセスする場合！E
     - そ�E仁E `Southeast Asia (Singapore)`, `West US (Oregon)`など
3. 「Create new project」をクリチE��
4. プロジェクト�E作�E完亁E��征E���E�E*1-2刁E��かりまぁE*�E�E

**重要E*: チE�Eタベ�Eスパスワード�E後で忁E��になる�Eで、安�Eな場所に保存してください、E

---

## スチE��チE: 環墁E��数の取征E

### 2.1 API設定画面を開ぁE

1. SupabaseダチE��ュボ�Eドで、左メニューから「Settings」をクリチE��
2. 「API」をクリチE��

### 2.2 環墁E��数をコピ�E

以下�E値をコピ�Eしてください�E�E

1. **Project URL**
   - 場所: 「Project URL」セクション
   - 形弁E `https://xxxxxxxxxxxxx.supabase.co`
   - 用送E `VITE_SUPABASE_URL`に設宁E

2. **anon public キー**
   - 場所: 「Project API keys」セクションの「anon public、E
   - 形弁E `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`�E�長ぁE��字�E�E�E
   - 用送E `VITE_SUPABASE_ANON_KEY`に設宁E

**重要E*: これら�E値は後で使用するので、安�Eな場所に保存してください、E

---

## スチE��チE: チE�Eタベ�Eススキーマ�E適用

### 3.1 SQL Editorを開ぁE

1. SupabaseダチE��ュボ�Eドで、左メニューから「SQL Editor」をクリチE��
2. 「New query」をクリチE��

### 3.2 スキーマファイルを開ぁE

1. プロジェクトフォルダで `supabase_schema.sql` ファイルを開ぁE
2. ファイルの冁E��めE*全て**コピ�E�E�Etrl+A ↁECtrl+C�E�E

### 3.3 SQLを実衁E

1. SupabaseのSQL Editorに貼り付け�E�Etrl+V�E�E
2. 「Run」�EタンをクリチE���E�また�E `Ctrl+Enter`�E�E
3. 成功メチE��ージが表示されることを確誁E

**エラーが�Eた場吁E*:
- 既にチE�Eブルが存在する場吁E `CREATE TABLE IF NOT EXISTS`によりスキチE�Eされます（問題なし！E
- ポリシーが既に存在する場吁E エラーが�Eる可能性がありますが、無視してOKでぁE
- そ�E他�Eエラー: エラーメチE��ージを確認し、忁E��に応じて修正

### 3.4 チE�Eブルの確誁E

1. 左メニューから「Table Editor」をクリチE��
2. 以下�EチE�Eブルが作�EされてぁE��ことを確認！E
   - `daily_logs`
   - `profiles`
   - `streaks`
   - `carnivore_content`�E�ENS用�E�E
   - `sns_posts`�E�ENS用�E�E
   - `error_logs`�E�ENS用�E�E
   - `sns_manual_posts`�E�ENS用�E�E

---

## スチE��チE: `.env`ファイルの作�E・設宁E

### 4.1 `.env`ファイルの作�E

1. プロジェクトフォルダ�E�Eprimal-logic-web`�E�に移勁E
2. `.env`ファイルが存在しなぁE��合�E、新規作�E
3. `.env`ファイルを開ぁE

### 4.2 環墁E��数の設宁E

以下�E環墁E��数を追加�E�また�E既存�Eコメントを外して設定）！E

```env
# Supabase�E�クラウドバチE��アチE�Eを使用する場合！E
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**重要E*: 
- `https://xxxxxxxxxxxxx.supabase.co` を実際のProject URLに置き換える
- `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` を実際のanon publicキーに置き換える
- `=` の前後にスペ�Eスを�EれなぁE
- コメント！E#`�E�を同じ行に入れなぁE

### 4.3 ファイルの保孁E

1. `.env`ファイルを保存！Etrl+S�E�E
2. ファイルが正しく保存されたことを確誁E

---

## スチE��チE: 開発サーバ�Eの再起勁E

### 5.1 開発サーバ�Eの停止

1. 開発サーバ�Eが起動してぁE��場合�E、停止�E�Etrl+C�E�E

### 5.2 開発サーバ�Eの再起勁E

1. ターミナルで以下を実行！E
   ```bash
   cd primal-logic-app/primal-logic-web
   npm run dev
   ```

**重要E*: Viteでは、`.env`ファイルを変更したら、E��発サーバ�Eを完�Eに再起動する忁E��があります。ブラウザをリロードするだけでは不十刁E��す、E

---

## スチE��チE: 動作確誁E

### 6.1 エラーの確誁E

1. ブラウザでアプリを開く（通常は `http://localhost:5174`�E�E
2. ブラウザの開発老E��ールを開く！E12�E�E
3. 「Console」タブを開く
4. Supabase関連のエラーが�EてぁE��ぁE��とを確誁E

### 6.2 認証機�Eの確誁E

1. アプリで認証画面に遷移�E�E#auth`にアクセス、また�E設定から認証画面を開く！E
2. 新規登録を試す！E
   - メールアドレスとパスワードを入劁E
   - 「Sign Up」をクリチE��
   - 確認メールが送信されることを確誁E
3. ログインを試す！E
   - メールアドレスとパスワードを入劁E
   - 「Login」をクリチE��
   - ログインが�E功することを確誁E

### 6.3 チE�Eタ保存�E確誁E

1. アプリでチE�Eタを�E力（侁E 食品を追加、日記を記録�E�E
2. チE�Eタが保存されることを確誁E
3. ペ�Eジをリロードして、データが残ってぁE��ことを確誁E

### 6.4 SupabaseダチE��ュボ�Eドでの確誁E

1. SupabaseダチE��ュボ�Eドで「Table Editor」を開く
2. `daily_logs`チE�Eブルを開ぁE
3. チE�Eタが保存されてぁE��ことを確誁E

---

## トラブルシューチE��ング

### `.env`ファイルが見つからなぁE

**解決方況E*:
1. プロジェクトフォルダ�E�Eprimal-logic-web`�E��Eに`.env`ファイルを作�E
2. ファイル名が`.env`であることを確認！E.env.txt`ではなぁE��E

### 環墁E��数が読み込まれなぁE

**解決方況E*:
1. 開発サーバ�Eを完�Eに再起動したか確誁E
2. 環墁E��数名が正しいか確認！EVITE_`プレフィチE��スが忁E��E��E
3. `=`の前後にスペ�EスがなぁE��確誁E
4. 実際の値が設定されてぁE��か確認！Eyour_supabase_url_here`が残ってぁE��ぁE���E�E

### チE�Eタベ�Eススキーマ�Eエラー

**解決方況E*:
1. 既にチE�Eブルが存在する場吁E `CREATE TABLE IF NOT EXISTS`によりスキチE�Eされる（問題なし！E
2. ポリシーが既に存在する場吁E エラーが�Eる可能性があるが、無視してOK
3. そ�E他�Eエラー: エラーメチE��ージを確認し、忁E��に応じて修正

### 認証が動作しなぁE

**解決方況E*:
1. 環墁E��数が正しく設定されてぁE��か確誁E
2. 開発サーバ�Eを�E起動したか確誁E
3. ブラウザのコンソールにエラーが�EてぁE��ぁE��確誁E
4. SupabaseダチE��ュボ�Eドで認証設定を確誁E

---

## 完亁E��件

以下�E全てを満たした場合、Supabaseの設定�E完亁E��す！E

- [ ] Supabaseプロジェクトが作�EされてぁE��
- [ ] 環墁E��数が取得されてぁE��
- [ ] チE�Eタベ�Eススキーマが適用されてぁE��
- [ ] `.env`ファイルに環墁E��数が設定されてぁE��
- [ ] 開発サーバ�Eを�E起動しぁE
- [ ] ブラウザでエラーが�EなぁE
- [ ] 認証機�Eが動作すめE
- [ ] チE�Eタが保存される

---

## 参老E��キュメンチE

- `supabase_schema.sql` - チE�Eタベ�EススキーチE
- `src/lib/supabaseClient.ts` - Supabaseクライアント設宁E
- `src/types/supabase.ts` - チE�Eタベ�Eス型定義
- `ENV_SETUP_COMPLETE_GUIDE.md` - 環墁E��数設定ガイチE

---

**最終更新**: 2026-01-21

