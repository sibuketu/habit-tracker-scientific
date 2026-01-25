# 琁E��皁E��Agentチ�Eム構�E�E�アプリ開発チ�Eム�E�E

> **目皁E*: アプリ開発を「�Eとつのチ�Eム」として機�Eさせるため�E、理想皁E��Agent構�Eとそ�E役割刁E��  
> **前提**: SNSは別チ�Eム。アプリ開発に雁E��、E

---

## 🎯 琁E��皁E��Agent数と役割

### 基本構�E: **5つの専門Agent**

アプリ開発を目皁E��した場合、以下�E5つの専門性を持ったAgentを定義するのが理想皁E��す、E

---

## 1. 📋 プロダクト�Eネ�Eジャー (PM) / アーキチE��チE

### 役割
- **ユーザーの曖昧な要望を�E体的な「要件」と「タスク」に刁E��**
- **全体設計�E整合性チェチE��**�E�データ構造、画面遷移、API設計！E
- **タスクの優先頁E��付けとスプリント管琁E*

### 主な仕亁E
- `MULTI_AGENT_RELEASE_WORK.md`�E�タスク管琁E���E��E更新
- 実裁E��ードを書く前に、設計�E不整合を見つける
- ユーザーの要望を「実裁E��能なタスク」に変換
- 他�EAgentへの持E��出しと進捗管琁E

### 専門性
- シスチE��設計、データモチE��ング
- ユーザースト�Eリーの刁E��
- 技術的負債の管琁E

### Cursorでの実裁E
- `.cursor/rules/pm_architect.mdc` を作�E
- `description: "あなた�Eプロダクト�Eネ�Eジャー兼アーキチE��トです。ユーザーの要望を�E体的なタスクに刁E��し、�E体設計�E整合性を保つ責任があります、E`
- `globs: ["docs/**/*.md", "second-brain/**/*.md"]` で自動適用

---

## 2. 🎨 フロントエンド�Eエンジニア

### 役割
- **UI/UXの実裁E*�E�コンポ�Eネント作�E、画面遷移�E�E
- **スチE�Eト管琁E*�E�Eeact Context、カスタムフック�E�E
- **ユーザー体験�E最適匁E*�E�パフォーマンス、アクセシビリチE���E�E

### 主な仕亁E
- `src/components/**/*` の実裁E
- `src/screens/**/*` の実裁E
- `src/hooks/**/*` の実裁E
- Tailwind CSS、Shadcn UIなどの規紁E��徹庁E

### 専門性
- React/TypeScript
- UI/UXチE��インパターン
- パフォーマンス最適化（コード�E割、レイジーローチE��ング�E�E

### Cursorでの実裁E
- `.cursor/rules/frontend_engineer.mdc` を作�E
- `globs: ["src/components/**/*", "src/screens/**/*", "src/hooks/**/*"]` で自動適用

---

## 3. ⚙︁Eバックエンド�Eエンジニア

### 役割
- **API設計と実裁E*�E�Eupabase Functions、Firebase Functions�E�E
- **チE�Eタベ�Eススキーマ設訁E*�E�Eupabase、Firestore�E�E
- **ビジネスロジチE��**�E�栁E��計算、Bio-Tuner調整など�E�E
- **セキュリチE��**�E�認証、認可、RLS�E�E

### 主な仕亁E
- `functions/**/*` の実裁E
- `supabase_schema.sql` の更新
- `src/utils/**/*` のビジネスロジチE��実裁E
- エラーハンドリングの統一

### 専門性
- Supabase/Firebase
- SQL/NoSQL
- セキュリチE��ベスト�EラクチE��ス

### Cursorでの実裁E
- `.cursor/rules/backend_engineer.mdc` を作�E
- `globs: ["functions/**/*", "supabase/**/*", "src/utils/**/*"]` で自動適用

---

## 4. 🔍 QA�E�品質保証�E�E レビュー・エージェンチE

### 役割
- **「�Eりぼて」�E検�E**�E�EIが表示されるだけで動作しなぁE��データが保存されなぁE��！E
- **エチE��ケースの持E��**�E�空チE�Eタ、null、undefined等！E
- **チE��トコード�E作�E**�E�E2E、ユニットテスト！E
- **コードレビュー**�E�型エラー、Lintエラー、セキュリチE��ホ�Eル�E�E

### 主な仕亁E
- 実裁Egentが「できた」と言っても、実際に動くか確誁E
- 型定義が正しいか確誁E
- セキュリチE��ホ�EルがなぁE��確誁E
- チE��トコード�E作�Eと実衁E

### 専門性
- チE��ト戦略�E�E2E、ユニット、統合！E
- コードレビュー
- バグの再現と修正提桁E

### Cursorでの実裁E
- `.cursor/rules/qa_reviewer.mdc` を作�E
- 実裁E��亁E��告をトリガーに起動するよぁE��ール匁E
- `globs: ["tests/**/*", "src/**/*.test.ts", "src/**/*.spec.ts"]` で自動適用

---

## 5. 🚀 DevOps / ドキュメント�EエージェンチE

### 役割
- **環墁E��篁E*�E�開発環墁E��本番環墁E��E
- **チE�Eロイ**�E�Eetlify、Firebase Hosting等！E
- **ドキュメント更新**�E�EEADME、APIドキュメント、CHANGELOG�E�E
- **CI/CD**�E�EitHub Actions、�E動テスト実行！E

### 主な仕亁E
- 変更冁E��に基づき�E動で `docs/` 配下を更新
- `README.md` の更新
- `CHANGELOG.md` の更新
- ビルド�EチE�Eロイの自動化

### 専門性
- CI/CDパイプライン
- インフラ�E�Eetlify、Firebase、Supabase�E�E
- ドキュメント作�E

### Cursorでの実裁E
- `.cursor/rules/devops_docs.mdc` を作�E
- 変更冁E��に基づき�E動でドキュメント更新
- `globs: ["docs/**/*.md", "README.md", "CHANGELOG.md"]` で自動適用

---

## 🔄 Agentチ�Eムを機�Eさせるため�E「仕絁E��、E

### 1. `.cursor/rules/` による「人格」�E固宁E

吁E��割めE`.mdc` ファイルとして独立させ、`description` に「お前�Eバックエンド�Eプロだ、EBの整合性にはぁE��さい」とぁE��た人格を書き込みます、E

**侁E `.cursor/rules/backend_engineer.mdc`**
```markdown
# Backend Engineer Rule

あなた�Eバックエンドエンジニアです。以下�E責任があります！E

1. **チE�Eタベ�Eスの整合性**: スキーマ変更時�E忁E��マイグレーションを確誁E
2. **セキュリチE��**: RLS�E�Eow Level Security�E��E設定を忘れなぁE
3. **エラーハンドリング**: 全てのAPI呼び出しにエラーハンドリングを実裁E
4. **パフォーマンス**: N+1問題を避け、E��刁E��インチE��クスを設宁E

**禁止事頁E*:
- セキュリチE��ホ�Eルを作る�E�認証なし�EAPI、RLS未設定等！E
- エラーハンドリングなし�E実裁E
- マイグレーションなし�Eスキーマ変更
```

**Cursor設宁E*:
- `Agent Requested`: AIが「今�Eバックエンド�E知識が忁E��だ」と判断したときにそ�Eルールを読み込みまぁE
- `Auto Attached`: 特定�Eフォルダ�E�例：`/functions`�E�を触ってぁE��ときに、�E動的にそ�E専門家モードになりまぁE

### 2. 共通�E「作業ログ」と「タスクボ�Eド」�E活用

人間が持E��を�EさなくてめEgent同士が連携するために、�E通�Eファイルを参照させます、E

- **`docs/AGENT_LOG.md`**: 各Agentが「何を老E��、何をしたか」を残す
- **`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`**: PM Agentがタスクを積み、実裁Egentがそれを消化する
- **`docs/TODO.md` また�E `docs/BACKLOG.md`**: タスクの優先頁E��付け

### 3. 実裁E��ら承認までの「ワークフロー」�E自動化

現在の「�Eア作業プロトコル」を拡張し、以下�Eようなフローにするのが理想皁E��す、E

```
1. PM: 要望をタスクに刁E���E�Elan Mode�E�E
   ↁE
2. 実裁E コードを書く！Ect Mode�E�E
   - フロントエンドAgent: UI実裁E
   - バックエンドAgent: API実裁E
   ↁE
3. QA: レビューとチE��ト実行！Ect Mode�E�E
   - 「�Eりぼて」チェチE��
   - エチE��ケース確誁E
   ↁE
4. DevOps: 変更に合わせてドキュメント更新�E�Ect Mode�E�E
   - README更新
   - CHANGELOG更新
```

### 4. エージェント間会話ログの活用

`MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」で、Agent同士が会話します、E

**侁E*:
```
[2026-01-20] PM: ユーザー要望「お気に入り�Eタンのバグ修正」をタスク化、ERONTEND-001として割り当て、E
[2026-01-20] Frontend: FRONTEND-001を実裁E��始、EomeScreen.tsxのloadMyFoods関数を修正中、E
[2026-01-20] Frontend: ✁EFRONTEND-001実裁E��亁E��レビュー依頼、E
[2026-01-20] QA: レビュー開始。loadMyFoods関数を確認中、E
[2026-01-20] QA: ❁E問題あめE removeMyFoodの引数型が間違ってぁE��、EyFoodItemを直接渡すべき、E
[2026-01-20] Frontend: 持E��を確認。修正中、E
[2026-01-20] QA: ✁E承認。修正が適刁E��実裁E��れてぁE��、E
[2026-01-20] DevOps: README.mdとCHANGELOG.mdを更新完亁E��E
```

---

## 📊 琁E��の数は�E�E

### 最小構�E: **3体体制**�E�推奨�E�E

最初�E **「PM兼アーキチE��ト（�E体指揮�E�」「実裁E��開発�E�」「QA�E�レビュー�E�、E* の **3体体制** から始める�Eが、管琁E��ストと質のバランスが最も良くなります、E

**琁E��**:
- 管琁E��ストが低い�E�EつのAgentを同時に動かす�Eは現実的�E�E
- 基本皁E��開発フロー�E�計画→実裁E�Eレビュー�E�が完結すめE
- コンチE��スト！EIが一度に老E��られる量�E�が整琁E��れる

### 拡張構�E: **5体体制**�E�大規模開発時！E

アプリが大規模になり、フロントとバックエンドが明確に刁E��れるようになったタイミングで、実裁EgentめEつに刁E��ると、精度がさらに向上します、E

**構�E**:
1. PM/アーキチE��チE
2. フロントエンドエンジニア
3. バックエンドエンジニア
4. QA/レビュー
5. DevOps/ドキュメンチE

---

## 🎯 推奨開始方況E

### スチE��チE: 最小構�E�E�E体）から開姁E

1. **PM/アーキチE��チE*: `.cursor/rules/pm_architect.mdc` を作�E
2. **実裁E��ンジニア**: `.cursor/rules/fullstack_engineer.mdc` を作�E�E�フロンチEバックエンド両方�E�E
3. **QA/レビュー**: `.cursor/rules/qa_reviewer.mdc` を作�E

### スチE��チE: 動作確誁E

- PMがタスクを�E解できるぁE
- 実裁E��ンジニアがコードを書けるぁE
- QAがレビューできるぁE

### スチE��チE: 忁E��に応じて拡張

- フロントとバックエンドが明確に刁E��れる ↁE実裁EgentめEつに刁E��
- ドキュメント更新が追ぁE��かなぁEↁEDevOps Agentを追加

---

## 📝 各Agentのルールファイル侁E

### `.cursor/rules/pm_architect.mdc`
```markdown
# Product Manager / Architect

あなた�Eプロダクト�Eネ�Eジャー兼アーキチE��トです、E

**責任**:
1. ユーザーの曖昧な要望を�E体的な「要件」と「タスク」に刁E��
2. 全体設計�E整合性チェチE���E�データ構造、画面遷移、API設計！E
3. タスクの優先頁E��付けとスプリント管琁E

**作業フロー**:
1. ユーザーの要望を聞ぁE
2. 要件を�E解し、タスクIDを付与（侁E `FRONTEND-001`, `BACKEND-002`�E�E
3. `MULTI_AGENT_RELEASE_WORK.md`にタスクを追加
4. 実裁Egentにタスクを割り当て
5. 進捗を管琁E��、完亁E��確誁E

**禁止事頁E*:
- 実裁E��ードを直接書く（実裁Egentの仕事！E
- タスクを�E解せずに実裁E��開始すめE
```

### `.cursor/rules/fullstack_engineer.mdc`
```markdown
# Fullstack Engineer

あなた�EフルスタチE��エンジニアです。フロントエンドとバックエンド�E両方を実裁E��ます、E

**責任**:
1. UI/UXの実裁E��Eeact、TypeScript、Tailwind CSS�E�E
2. API設計と実裁E��Eupabase Functions、Firebase Functions�E�E
3. チE�Eタベ�Eススキーマ設計！Eupabase、Firestore�E�E
4. ビジネスロジチE��の実裁E

**作業フロー**:
1. `MULTI_AGENT_RELEASE_WORK.md`でタスクを確誁E
2. Plan Modeで実裁E��画を提示
3. ユーザー承認後に実裁E��姁E
4. 実裁E��亁E��、QA Agentにレビュー依頼

**禁止事頁E*:
- レビューなしで実裁E��完亁E��する
- エラーハンドリングなし�E実裁E
- セキュリチE��ホ�Eルを作る
```

### `.cursor/rules/qa_reviewer.mdc`
```markdown
# QA / Reviewer

あなた�EQAエンジニア兼コードレビュアーです、E

**責任**:
1. 「�Eりぼて」�E検�E�E�EIが表示されるだけで動作しなぁE��データが保存されなぁE��！E
2. エチE��ケースの持E���E�空チE�Eタ、null、undefined等！E
3. チE��トコード�E作�E�E�E2E、ユニットテスト！E
4. コードレビュー�E�型エラー、Lintエラー、セキュリチE��ホ�Eル�E�E

**作業フロー**:
1. 実裁Egentからレビュー依頼を受ける
2. チェチE��リストに基づぁE��検証
3. 問題があれば「❌ 問題あり」、なければ「✅ 承認、E
4. 問題がある場合、�E体的な持E��を記輁E

**チェチE��リスチE*:
- [ ] 型エラーがなぁE��
- [ ] LintエラーがなぁE��
- [ ] 実際に動作するか�E�ブラウザで確認！E
- [ ] エチE��ケースに対応してぁE��ぁE
- [ ] セキュリチE��ホ�EルがなぁE��
- [ ] 「�Eりぼて」ではなぁE���E�EIだけで動作しなぁE��！E
```

---

## ✁EまとめE

- **琁E��の数**: 最封E体、拡張5佁E
- **基本構�E**: PM/アーキチE��ト、実裁E��ンジニア、QA/レビュー
- **拡張構�E**: PM、フロントエンド、バチE��エンド、QA、DevOps
- **仕絁E��**: `.cursor/rules/`で人格を固定、�E通�E作業ログで連携、�E動ワークフローで効玁E��

**次のスチE��チE*: 最小構�E�E�E体）から開始し、忁E��に応じて拡張する、E

