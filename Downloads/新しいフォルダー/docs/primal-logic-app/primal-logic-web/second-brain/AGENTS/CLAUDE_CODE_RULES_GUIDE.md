# ClaudeCode用Rules参�EガイチE

> **作�E日**: 2026-01-21  
> **目皁E*: ClaudeCodeがRulesを正しく参�Eし、追加するためのガイチE

---

## 📚 Rules参�E方況E

### マスタールールファイル

**全ルールは以下�Eファイルに記載されてぁE��す！E*
- **マスタールール**: `second-brain/RULES/master_rule.mdc`
  - Cursor、Antigravity、ClaudeCode共通�Eルール
  - 全セクション�E�E0、E10、今後�E#11...�E�が含まれてぁE��ぁE

### ClaudeCodeでの参�E方況E

1. **エントリーポインチE*: `CLAUDE.md`
   - ClaudeCodeは`CLAUDE.md`を�E動的に読み込む
   - `CLAUDE.md`は`master_rule.mdc`への参�Eを提侁E

2. **マスタールールファイルの直接参�E**
   - タスク開始時に、`second-brain/RULES/master_rule.mdc`を読み込む
   - 特に、Section 7�E�タスクタイプ判断と重要Rules抽出プロトコル�E�を実行すめE

---

## 🔄 Rules追加時�Eプロトコル�E�ElaudeCode用�E�E

**ClaudeCodeが新しいルールを追加する際�E、以下を忁E��実行すること�E�E*

### Step 1: マスタールールファイルに追加

1. **`second-brain/RULES/master_rule.mdc`に新しいセクションを追加**
   - 連番で番号を付与（侁E #11, #12...�E�E
   - 吁E��クションの冒頭に、E*ルール番号**: #X」を明訁E

2. **Rules追加時�ERules�E�Eection 1.2�E�を遵宁E*
   - 1.2.1. 実行可能性チェチE��
   - 1.2.2. 問題点発見�Eロトコル
   - 1.2.3. 効果測定性のチェチE��
   - 1.2.4. タスクタイプとの整合性
   - 1.2.5. 番号管琁E
   - 1.2.6. ClaudeCode/Claude.mdからのRules追加時�Eプロトコル

### Step 2: Cursor用のRulesファイルを更新�E�忁E��に応じて�E�E

1. **`.cursor/rules/master_rule.mdc`を更新**
   - `second-brain/RULES/master_rule.mdc`の冁E��をコピ�E
   - また�E、シンボリチE��リンクで参�E�E�Eindowsの権限問題に注意！E

### Step 3: CLAUDE.mdは更新不要E

- `CLAUDE.md`は参�Eのみ�E��Eスタールールファイルへの参�E�E�E
- マスタールールファイルを更新すれば、�E動的に反映されめE

---

## ⚠�E�E禁止事頁E

**以下�E禁止です！E*

1. **`CLAUDE.md`に直接ルールを追加すること**
   - ルールは忁E��`second-brain/RULES/master_rule.mdc`に追加すること
   - `CLAUDE.md`は参�Eのみ

2. **`CLAUDE.md`と`master_rule.mdc`を別、E��管琁E��ること**
   - マスターファイル�E�Emaster_rule.mdc`�E�に一允E��琁E��ること
   - 2箁E��の同期は不要E��参照方式�Eため�E�E

---

## 📋 クイチE��リファレンス

### 主要セクション�E��Eスタールールファイル�E�E

- **#0**: Deep Thought Protocol�E�Eつの関門�E�E
- **#1**: Meta-Rules & Autonomy�E�行動原理�E�E
- **#2**: Quality Assurance�E�品質保証�E�E
- **#3**: Idea & Strategy�E�思老E��、アイチE��技況E6�E�E
- **#4**: UI/UX Guidelines�E�Earnivore Perspective�E�E
- **#5**: Work Efficiency�E�作業効玁E��E
- **#6**: Communication Protocol�E�コミュニケーション�E�E
- **#7**: タスクタイプ判断と重要Rules抽出プロトコル
- **#8**: Context Dependency Prevention�E�コンチE��スト依存�E防止�E�E
- **#9**: SNSコンチE��チE��成（バズアルゴリズム関門�E�E
- **#10**: AI Information Source Matrix�E�情報源�E優先頁E��！E

### 思老E�Eロセスの記録

- 使用したRules番号を`second-brain/THINKING_PROCESS.md`に記録
- 使用したRules番号と適用方法を併記（侁E `使用したRules: #0, #1, #3, #7, #9`�E�E

---

## 🔧 トラブルシューチE��ング

### 問顁E Rulesが読み込まれてぁE��ぁE

**確認事頁E*:
1. `second-brain/RULES/master_rule.mdc`が存在するぁE
2. `CLAUDE.md`が`master_rule.mdc`への参�Eを正しく記載してぁE��ぁE
3. ClaudeCodeが`CLAUDE.md`を読み込んでぁE��ぁE

**解決筁E*:
1. `CLAUDE.md`の冁E��を確認すめE
2. `second-brain/RULES/master_rule.mdc`の冁E��を確認すめE
3. 忁E��に応じて、ClaudeCodeを�E起動すめE

---

**更新日**: 2026-01-21

