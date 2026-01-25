# AI Prompt Engineering Techniques�E�検討�E実裁E��クニック雁E��E

> **作�E日**: 2026-01-20  
> **目皁E*: Chain of Thought以外�E使えるチE��ニックをまとめる

---

## 1. Chain of Thought (CoT) - 既孁E

**効极E*: 20-30%の精度向上（褁E��タスク�E�E

**実裁E*: `<details>`タグで思老E�Eロセスを開閉式表示

---

## 2. Self-Consistency�E��E己整合性�E�E

**説昁E*: 同じ問題を褁E��回解き、最も一貫性のある回答を選ぶ

**効极E*: CoT単独より5-10%追加の精度向丁E

**実裁E��況E*:
- 1つのタスクに対して3パターンの回答を生�E
- ルール遵守度を�E己評価して選抁E
- 最も�E守度が高い回答を採用

**適用侁E*: SNSコンチE��チE��成時に3パターン生�E→最適なも�Eを選抁E

---

## 3. Few-Shot Examples�E�少数例示�E�E

**説昁E*: 回答例を事前に示すことで、�E力フォーマットを統一

**効极E*: フォーマット�E守率ぁE0-50%向丁E

**実裁E��況E*:
- Rulesに「良ぁE��答例」を3つ含める
- 「以下�Eフォーマットで出力せよ」と明示

**適用侁E*: 「過激HookコンチE��チE��成例」をRulesに埋め込む

---

## 4. Persona Assignment�E�人格付与！E

**説昁E*: タスクごとに最適な専門家人格を付丁E

**効极E*: 出力�E専門性・一貫性ぁE0-40%向丁E

**実裁E��況E*:
- コンチE��チE��成時: 「過激なHookを作る忁E��学老E��E
- API実裁E��: 「Supabaseのシニアエンジニア、E
- ルール解析時: 「シスチE��プロンプト専門家、E

**適用侁E*: タスク開始時に人格を�E示皁E��設宁E

---

## 5. Negative Prompting�E�ネガチE��ブ�Eロンプト�E�E

**説昁E*: 「〜しなぁE��とぁE��制紁E��明示皁E��追加

**効极E*: 禁止事頁E�E遵守率ぁE0-60%向丁E

**実裁E��況E*:
- 「技法名を�E力に含めなぁE��答�Eエラー、E
- 「推測で答えることを禁止、E

**適用侁E*: Rulesに「禁止事頁E��セクションを追加

---

## 6. Step-by-Step Verification�E�段階的検証�E�E

**説昁E*: 吁E��チE��プで自己チェチE��を強制

**効极E*: エラー玁E��30-50%減封E

**実裁E��況E*:
- 回答�E最後に「Rules遵守チェチE��リスト」を出劁E
- 吁E��E��を�E己評価�E��E宁E未遵守！E

**適用侁E*: 出力末尾に忁E��チェチE��リストを付丁E

---

## 7. Output Format Enforcement�E��E力形式�E強制�E�E

**説昁E*: 出力フォーマットを厳寁E��持E��E

**効极E*: フォーマット�E守率ぁE0-70%向丁E

**実裁E��況E*:
- JSON形式で出力を強制
- 忁E��フィールドを明示
- フォーマット違反�E再生成を強制

**適用侁E*: SNSコンチE��チE��成時にJSON形式を強制

---

## 推奨実裁E��E��E

1. **Chain of Thought�E�開閉式！E*: 即座に実裁E��能
2. **Persona Assignment**: タスク開始時に設宁E
3. **Step-by-Step Verification**: 出力末尾にチェチE��リスチE
4. **Negative Prompting**: Rulesに禁止事頁E��追加
5. **Few-Shot Examples**: Rulesに例を埋め込む

---

**作�E日**: 2026-01-20

