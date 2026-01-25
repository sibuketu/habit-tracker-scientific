# Makefilm.ai APIキー取得ガイチE

> **作�E日**: 2026-01-22  
> **目皁E*: Makefilm.aiのAPIキー取得手頁E��ブラウザ操作で案�E

---

## 🔍 Makefilm.ai APIキー取得手頁E

### Step 1: Makefilm.aiにアクセス

1. **ブラウザで https://makefilm.ai を開ぁE*
2. トップ�Eージが表示されめE

### Step 2: アカウント作�E/ログイン

1. **右上�E「Sign Up」また�E「Log In」をクリチE��**
2. アカウントを作�E�E�また�E既存アカウントでログイン�E�E

### Step 3: ダチE��ュボ�Eドに移勁E

1. ログイン後、E*「Dashboard」また�E「App、E*をクリチE��
2. ダチE��ュボ�Eド画面に移勁E

### Step 4: APIキーを探ぁE

**一般皁E��場所**:
- **Settings** ↁE**API Keys**
- **Account** ↁE**API Settings**
- **Developer** ↁE**API Keys**
- **Profile** ↁE**API Keys**

**見つからなぁE��吁E*:
- ペ�Eジ冁E��索�E�Etrl+F�E�で「API」を検索
- ペ�Eジ下部の「Documentation」や「API」リンクを確誁E

### Step 5: APIキーを生戁E

1. **「Create API Key」また�E「Generate API Key」をクリチE��**
2. APIキー名を入力（侁E "CarnivoreOS"�E�E
3. **APIキーをコピ�E**�E�表示は一度だけ�E可能性があるため、忁E��コピ�E�E�E

### Step 6: .envファイルに追加

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
- Makefilm App: https://makefilm.ai/app�E�ログイン後！E

---

**最終更新**: 2026-01-22

