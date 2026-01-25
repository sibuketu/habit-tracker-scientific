# Google Gemini API キー設定ガイチE

## 概要E

CarnivOSアプリのAIチャチE��機�Eで、OpenAIの代わりにGoogle Gemini APIを使用することも可能です、E

## Gemini vs OpenAI: どちらが向いてぁE��か！E

### Gemini API の特徴

**メリチE��:**
- **無料枠が大きい**: 1日あためE0リクエスト（無料！E
- **コストが安い**: 有料プランでもOpenAIより安価
- **日本語対応が良ぁE*: Google製のため、日本語�E琁E��が優秀
- **マルチモーダル**: 画像�E力にも対応（封E��拡張可能�E�E

**チE��リチE��:**
- **レスポンス速度**: OpenAI GPT-4oよりめE��遁E��場合がある
- **コンチE��ストウィンドウ**: OpenAIより小さぁE��ただし十刁E��E

### OpenAI API の特徴

**メリチE��:**
- **レスポンス速度**: 非常に高送E
- **品質**: GPT-4oは高品質な回筁E
- **Assistants API**: スレチE��管琁E��ファイルアチE�Eロードに対応（高度な機�E�E�E

**チE��リチE��:**
- **コスチE*: Geminiより高価
- **無料枠**: なし（クレジチE��カード忁E��！E

### 推奨

**開発・チE��ト段隁E*: Gemini�E�無料枠が大きい�E�E
**本番環墁E*: 用途に応じて選抁E
- コスト重要EↁEGemini
- 速度・品質重要EↁEOpenAI

## 1. Gemini APIキーの取得方況E

### スチE��チE: Google AI Studio にアクセス

1. [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセス
2. Googleアカウントでログイン

### スチE��チE: APIキーの生�E

1. 「Create API Key」をクリチE��
2. Google Cloud プロジェクトを選択（新規作�Eも可能�E�E
3. APIキーが生成される
4. **重要E** 生�EされたキーめE*すぐにコピ�E**してください

### スチE��チE: APIの有効匁E

1. [Google Cloud Console](https://console.cloud.google.com/) にアクセス
2. プロジェクトを選抁E
3. 「APIとサービス」�E「有効なAPI」を選抁E
4. 「Generative Language API」が有効になってぁE��か確誁E
5. 有効でなぁE��合�E「APIを有効にする」をクリチE��

## 2. アプリへのAPIキーの設宁E

### 方況E: 環墁E��数ファイル�E�推奨�E�E

1. `primal-logic-web` チE��レクトリの `.env` ファイルを開く（また�E作�E�E�E

2. 以下�Eように設定！E

```env
# OpenAI API�E�既存！E
VITE_OPENAI_API_KEY=sk-your-api-key-here

# Gemini API�E�新規追加�E�E
VITE_GEMINI_API_KEY=your-gemini-api-key-here
```

3. アプリを�E起勁E

### 方況E: コードで刁E��替ぁE

`AIFloatButton.tsx` で使用するAPIを選択！E

```typescript
const USE_GEMINI = true; // Geminiを使用する場吁E
const USE_OPENAI = false; // OpenAIを使用する場吁E
```

## 3. Gemini APIの実裁E

### 基本皁E��実裁E

```typescript
const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: `${systemPrompt}\n\nUser: ${userMessage}\n\nAssistant:`,
            },
          ],
        },
      ],
    }),
  }
);

const data = await response.json();
const assistantMessage = data.candidates[0]?.content?.parts[0]?.text || 'エラー';
```

## 4. Assistants APIにつぁE��

### OpenAI Assistants API

**特徴:**
- スレチE��管琁E��会話履歴の自動管琁E��E
- ファイルアチE�Eロード！EDF、CSVなど�E�E
- コード実行！Eode Interpreter�E�E
- 関数呼び出し！Eunction Calling�E�E

**用送E**
- 褁E��な会話管琁E��忁E��な場吁E
- ファイルを参照して回答を生�EしたぁE��吁E
- コードを実行して結果を返したい場吁E

**CarnivOSでの使用侁E**
- ユーザーの過去のログをファイルとしてアチE�EローチE
- 栁E��データベ�Eスを参照して回答を生�E

### Gemini の類似機�E

Geminiには「Assistants API」に相当する機�Eはありませんが、以下�E方法で実現可能�E�E

1. **コンチE��スト管琁E*: 手動で会話履歴を管琁E
2. **ファイル参�E**: 封E��、Gemini Pro Visionで画像�E力に対応予宁E

## 5. 実裁E�E刁E��替え方況E

`AIFloatButton.tsx` を修正して、両方のAPIに対応！E

```typescript
const handleSendMessage = async () => {
  // ...
  
  const useGemini = import.meta.env.VITE_USE_GEMINI === 'true';
  
  if (useGemini) {
    // Gemini API呼び出ぁE
    const response = await fetch(/* Gemini API */);
  } else {
    // OpenAI API呼び出ぁE
    const response = await fetch(/* OpenAI API */);
  }
};
```

## 6. コスト比輁E

### Gemini API
- **無料枠**: 1日60リクエスチE
- **有料**: $0.00025 / 1K characters�E��E力）、E0.0005 / 1K characters�E��E力！E

### OpenAI API (GPT-4o)
- **無料枠**: なぁE
- **有料**: $2.50 / 1M tokens�E��E力）、E10.00 / 1M tokens�E��E力！E

**侁E 1回�E会話�E�E00斁E��！E*
- Gemini: 紁E$0.0002
- OpenAI: 紁E$0.001

## 7. 推奨設宁E

### 開発環墁E
```env
VITE_USE_GEMINI=true
VITE_GEMINI_API_KEY=your-key-here
```

### 本番環墁E
- コスト重要EↁEGemini
- 速度・品質重要EↁEOpenAI
- 両方対忁EↁEユーザーが選択可能にする

## 8. トラブルシューチE��ング

### エラー: "API key not valid"
- APIキーが正しく設定されてぁE��か確誁E
- Google Cloud ConsoleでAPIが有効になってぁE��か確誁E

### エラー: "Quota exceeded"
- 無料枠�E�E日60リクエスト）を趁E��てぁE��
- 有料プランにアチE�Eグレードするか、翌日まで征E��

## 参老E��ンク

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/docs)
- [Gemini API Pricing](https://ai.google.dev/pricing)


