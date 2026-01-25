# Carnivoreアプリ�E�Erimal-logic-web�E��E環墁E��数設定ガイチE

## 📍 .envファイルの場所

```
C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\.env
```

## ✁E忁E���E環墁E��数

### 1. Gemini APIキー�E�EIチャチE��機�Eに忁E��！E

**エラーが�EてぁE��場吁E*: `VITE_GEMINI_API_KEY` が設定されてぁE��せん

**設定方況E*:

1. **[Google AI Studio](https://aistudio.google.com/app/apikey)** にアクセス
2. 「Create API Key」をクリチE��
3. プロジェクトを選択（また�E新規作�E�E�E
4. APIキーをコピ�E�E�EAIzaSy...`で始まる！E
5. `.env`ファイルを開ぁE
6. `VITE_GEMINI_API_KEY=your_gemini_api_key_here` の部刁E��以下に置き換え！E
   ```env
   VITE_GEMINI_API_KEY=AIzaSy...�E�実際のAPIキー�E�E
   ```

**重要E*: 
- `your_gemini_api_key_here` を削除して、実際のAPIキーを貼り付け
- `=` の前後にスペ�Eスを�EれなぁE
- コメント！E#`�E�を同じ行に入れなぁE

## 🔧 オプションの環墁E��数

### 2. Supabase�E�クラウドバチE��アチE�Eを使用する場合！E

**現在のエラー**: `VITE_SUPABASE_URL` と `VITE_SUPABASE_ANON_KEY` が設定されてぁE��せん

**注愁E*: Supabaseは**オプション**です。設定されてぁE��ぁE��合、`localStorage`のみを使用します（�E動フォールバック�E�、E

**設定する場合�E手頁E*:

1. **[Supabase](https://supabase.com/)** にアクセス
2. プロジェクトを作�E�E�また�E既存�Eプロジェクトを使用�E�E
3. 「Settings」�E「API」を開く
4. 以下�E値をコピ�E�E�E
   - **Project URL** ↁE`VITE_SUPABASE_URL`
   - **anon public** キー ↁE`VITE_SUPABASE_ANON_KEY`
5. `.env`ファイルを開ぁE
6. コメント！E#`�E�を外して、実際の値を設定！E
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

**Supabaseを設定しなぁE��吁E*: 
- エラーは出ますが、アプリは動作しまぁE
- チE�Eタは`localStorage`に保存されます（ブラウザのローカルストレージ�E�E
- クラウドバチE��アチE�E機�Eは使用できません

## 🔄 設定後�E手頁E

### 重要E 開発サーバ�Eを�E起勁E

**Viteでは、`.env`ファイルを変更したら、E��発サーバ�Eを完�Eに再起動する忁E��があります、E*

1. **開発サーバ�Eを停止**�E�Etrl+C�E�E
2. **開発サーバ�Eを�E起勁E*:
   ```bash
   cd primal-logic-app/primal-logic-web
   npm run dev
   ```

**注愁E*: 
- ブラウザをリロードするだけでは不十刁E
- 開発サーバ�Eを完�Eに停止して再起動する忁E��がある

## 📝 .envファイルの例（完�E形�E�E

```env
# Gemini API キー�E�忁E��！E
VITE_GEMINI_API_KEY=AIzaSyC...�E�実際のAPIキー�E�E

# Supabase�E�オプション - クラウドバチE��アチE�Eを使用する場合！E
# VITE_SUPABASE_URL=https://your-project.supabase.co
# VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Replicate API�E�オプション - 画像生成�E自動化を使用する場合！E
# VITE_REPLICATE_API_TOKEN=r8_your_api_token_here
```

## ❁Eよくある質啁E

### Q: Supabaseは忁E��ですか�E�E

**A: ぁE��え、オプションです、E*
- 設定されてぁE��ぁE��合、`localStorage`のみを使用しまぁE
- エラーは出ますが、アプリは動作しまぁE
- クラウドバチE��アチE�E機�Eを使ぁE��ぁE��合�Eみ設定してください

### Q: 再起動しても動かなぁE

**A: 以下を確認してください�E�E*
1. `.env`ファイルが正しい場所にあるか！Eprimal-logic-web`フォルダ冁E��E
2. 環墁E��数名が正しいか！EVITE_`プレフィチE��スが忁E��E��E
3. `=`の前後にスペ�EスがなぁE��
4. 実際のAPIキーが設定されてぁE��か！Eyour_gemini_api_key_here`が残ってぁE��ぁE���E�E
5. 開発サーバ�Eを完�Eに再起動したか

### Q: チャチE��を変えてしまった�Eは問題ですか�E�E

**A: Obsidianにメモがあれ�E問題ありません、E*
- CursorのチャチE��履歴は左サイドバーから確認できまぁE
- 重要な惁E��はObsidianにメモしておけば問題ありません

## 🔗 関連ドキュメンチE

- `API_KEY_SETUP_GUIDE.md` - 詳細なAPIキー取得方況E
- `README.md` - プロジェクト�E概要E
- `.env_OPEN_GUIDE.md` - .envファイルの開き方


