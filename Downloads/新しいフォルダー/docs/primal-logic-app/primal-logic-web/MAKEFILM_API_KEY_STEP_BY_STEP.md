# Makefilm.ai APIキー取得手頁E��スチE��プバイスチE��プ！E

> **作�E日**: 2026-01-22  
> **目皁E*: Makefilm.aiのAPIキー取得をブラウザ操作で案�E

---

## 🔍 現在の状況E

**URL**: https://makefilm.ai/ja-JP/workspace  
**状慁E*: ログインペ�EジにリダイレクトされてぁE��ぁE

---

## 📝 手頁E

### Step 1: ログイン

1. **「Googleでログイン」�EタンをクリチE��**
   - また�E「登録する」�Eタンでアカウント作�E
2. Googleアカウントでログイン完亁E

### Step 2: ダチE��ュボ�Eドに移勁E

ログイン後、以下�EぁE��れかでダチE��ュボ�Eドに移動！E
- **「Makefilm App」をクリチE��**
- URL: https://makefilm.ai/ja-JP/workspace に直接アクセス

### Step 3: APIキーを探ぁE

ダチE��ュボ�Eドで以下を確認！E

**一般皁E��場所**:
1. **右上�Eプロフィールアイコン** ↁE**「Settings、E* ↁE**「API Keys、E*
2. **左サイドバー** ↁE**「Settings、E* ↁE**「API、E*
3. **「Developer、E* また�E **「API、E* セクション

**見つからなぁE��吁E*:
- ペ�Eジ冁E��索�E�Etrl+F�E�で「API」を検索
- 「Documentation」リンクを確誁E
- サポ�Eトに問い合わぁE support@makefilm.ai

### Step 4: APIキーを生戁E

1. **「Create API Key、E* また�E **「Generate API Key、E* をクリチE��
2. APIキー名を入力（侁E "CarnivoreOS"�E�E
3. **APIキーをコピ�E**�E�表示は一度だけ�E可能性があるため、忁E��コピ�E�E�E

### Step 5: .envファイルに追加

`.env`ファイルの最後に以下を追加:

```env
VITE_MAKEFILM_API_KEY=your_makefilm_api_key_here
```

**重要E*: `your_makefilm_api_key_here` を実際のAPIキーに置き換ぁE

---

## ⚠�E�E注意事頁E

- **APIキーは秘寁E��報**: チャチE��に貼り付けなぁE
- **一度しか表示されなぁE��能性**: 忁E��コピ�Eして保孁E
- **.envファイルに追加**: ファイルの最後に追加すればOK�E�行番号は気にしなくて良ぁE��E

---

## 🔗 参老E��ンク

- Makefilm.ai: https://makefilm.ai
- サポ�EチE support@makefilm.ai

---

**最終更新**: 2026-01-22

