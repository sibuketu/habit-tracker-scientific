# Rules適用の問題点と解決筁E

> **作�E日**: 2026-01-22  
> **目皁E*: Rulesが�EAgentで確実に適用されるよぁE��するための問題点刁E��と解決筁E

---

## 🔍 問題点の刁E��

### 定義の明確匁E

**「Agent」�E定義**: CursorのマルチAgent機�Eで作�Eされる別、E�EAgent�E�EM/アーキチE��ト、実裁E��ンジニア、QA/レビュー等）�Eこと、E

**「タスク開始時」�E定義**: ユーザーが新しいAgentにメチE��ージを送った瞬間、また�E既存�EAgentに新しいタスクのメチE��ージを送った瞬間。つまり、E*メチE��ージ送信時と同義**、E

### 現状の問顁E

1. **Cursor冁E�E`.cursor/rules/master_rule.mdc`**
   - `alwaysApply: true`が設定されてぁE��が、E*Cursor専用**
   - AntigravityやClaudeCodeは別のチE�Eルなので、`.cursor/rules/`を参照しなぁE
   - 各Agentが別のワークスペ�Eスで作業してぁE��場合、そのワークスペ�EスのRulesが適用されめE
   - **重要E*: Cursorの`.cursor/rules/`は自動的に読み込まれるが、Rulesが正しく適用されてぁE��か確認する忁E��がある

2. **System Prompt Enforcement Protocol�E�Eection 1.1�E�E*
   - 「ルールは忁E�� `user_rules` (System Prompt) として機�Eさせよ」と明記されてぁE��
   - しかし、E*実際にはコンチE��スト�Eースでしか守られてぁE��ぁE��能性があめE*
   - 会話の流れ�E�Ehort-term Memory�E�に依存してぁE��可能性

3. **Rulesの読み込み方況E*
   - Cursor: `.cursor/rules/`を�E動的に読み込む�E�EalwaysApply: true`の場合！E
   - Antigravity: 不�E�E�E.cursor/rules/`を参照しなぁE��能性�E�E
   - ClaudeCode: `CLAUDE.md`経由で`second-brain/RULES/master_rule.mdc`を参照

4. **各Agent固有�Eルールファイル**
   - `pm_architect.mdc`, `fullstack_engineer.mdc`, `qa_reviewer.mdc`は`alwaysApply: false`
   - 特定�Eファイルパターン�E�Elobs�E�にマッチした場合�Eみ適用されめE
   - 各Agentが「人格」として設定されてぁE��場合、そのAgent固有�Eルールファイルが優先される可能性

---

## ✁E解決筁E

### 方況E: System Promptとして確実に機�Eさせる（最重要E��E

**問顁E*: RulesがコンチE��スト�Eースでしか守られてぁE��ぁE

**解決筁E*: 各Agentの引き継ぎ賁E��めE��スク開始時に、E*明示皁E��RulesをSystem Promptとして読み込む**ことを忁E��化する

#### 実裁E��頁E

1. **各Agentの引き継ぎ賁E��の冒頭に以下を追加**:
   ```markdown
   ## ⚠�E�E重要E Rules参�E�E�忁E���ESystem Promptとして�E�E

   **こ�Eタスクを開始する前に、忁E��以下を実行すること�E�E*

   1. **マスタールールファイルをSystem Promptとして読み込む**:
      - `second-brain/RULES/master_rule.mdc`を読み込む
      - また�E、`.cursor/rules/master_rule.mdc`を読み込む�E�Eursorの場合！E
      - **コンチE��スト�Eースではなく、System Promptとして確実に読み込む**

   2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する

   3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する

   **Rulesを参照しなぁE��合、ルール違反として扱ぁE��E*
   ```

2. **`master_rule.mdc`のSection 1.1を強匁E*:
   ```markdown
   ### 1.1. 【絶対厳守】System Prompt Enforcement Protocol
   **ルールは忁E�� `user_rules` (System Prompt) として機�Eさせよ。会話のコンチE��スト（文脈）に依存してはならなぁE��E*

   **実裁E��況E*:
   - タスク開始時に、忁E��`second-brain/RULES/master_rule.mdc`を読み込む
   - また�E、`.cursor/rules/master_rule.mdc`を読み込む�E�Eursorの場合！E
   - **コンチE��スト�Eースではなく、System Promptとして確実に読み込む**
   - 使用したRules番号を思老E�Eロセスに記録する

   **違反時�EペナルチE��**:
   - Rulesを参照しなぁE��合、ルール違反として扱ぁE
   - コンチE��スト�Eースでしか守られてぁE��ぁE��合、即座にSystem Promptとして読み込む
   ```

### 方況E: 全Agent共通�ERules参�Eプロトコルを確竁E

**問顁E*: 各Agentが別のチE�Eルを使ってぁE��場合、Rulesを参照しなぁE

**解決筁E*: 全Agent共通�ERules参�Eプロトコルを確立し、各Agentの引き継ぎ賁E��に明示皁E��記載すめE

#### 実裁E��頁E

1. **`second-brain/AGENTS/RULES_SHARING_PROTOCOL.md`を更新**:
   - 「Rules参�E�E�忁E���ESystem Promptとして�E�」セクションを追加
   - 各Agentの引き継ぎ賁E��にこ�Eセクションを含めることを忁E��化

2. **各Agentの引き継ぎ賁E��を更新**:
   - `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md`
   - `second-brain/AGENTS/AGENT_2_START_GUIDE.md`
   - そ�E他�EAgent引き継ぎ賁E��

3. **`MULTI_AGENT_RELEASE_WORK.md`の冒頭にRules参�Eを追加**:
   ```markdown
   ## ⚠�E�E重要E Rules参�E�E�忁E���ESystem Promptとして�E�E

   **全Agentは、タスク開始時に忁E��以下を実行すること�E�E*

   1. **マスタールールファイルをSystem Promptとして読み込む**:
      - `second-brain/RULES/master_rule.mdc`を読み込む
      - また�E、`.cursor/rules/master_rule.mdc`を読み込む�E�Eursorの場合！E

   2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する

   3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する
   ```

### 方況E: Cursor冁E�E全AgentでRulesを確実に読み込む

**問顁E*: Cursor冁E�E全AgentでRulesが使われてぁE��ぁE

**解決筁E*: `.cursor/rules/master_rule.mdc`の`alwaysApply: true`を確認し、各Agent固有�Eルールファイルに明示皁E��参�Eを追加�E�実裁E��み�E�E

#### 確認事頁E

1. **`.cursor/rules/master_rule.mdc`の確誁E*:
   - `alwaysApply: true`が設定されてぁE�� ✁E
   - `globs: **/*`が設定されてぁE�� ✁E
   - 全Agent共通�Eルール�E��Eセクション�E�が含まれてぁE�� ✁E

2. **各Agent固有�Eルールファイルの確誁E*:
   - `pm_architect.mdc`: 「`master_rule.mdc`を参照すること」が明記されてぁE�� ✁E
   - `fullstack_engineer.mdc`: 「`master_rule.mdc`を参照すること」が明記されてぁE�� ✁E
   - `qa_reviewer.mdc`: 「`master_rule.mdc`を参照すること」が明記されてぁE�� ✁E

3. **CursorのRules読み込み頁E��E*:
   - `.cursor/rules/`冁E�E`.mdc`ファイルを�Eて読み込む
   - `alwaysApply: true`のファイルは常に適用されめE
   - **琁E��上�E全Agentで読み込まれるはぁE*

---

## 📋 実裁E��ェチE��リスチE

### 即座に実行すべき頁E��

- [ ] `second-brain/AGENTS/RULES_SHARING_PROTOCOL.md`を更新�E�「Rules参�E�E�忁E���ESystem Promptとして�E�」セクションを追加�E�E
- [ ] `MULTI_AGENT_RELEASE_WORK.md`の冒頭にRules参�Eを追加
- [ ] 各Agentの引き継ぎ賁E��に「Rules参�E�E�忁E���ESystem Promptとして�E�」セクションを追加
- [ ] `master_rule.mdc`のSection 1.1を強化！Eystem Promptとして確実に読み込むことを�E記！E

### 確認すべき頁E��

- [ ] `.cursor/rules/master_rule.mdc`が`alwaysApply: true`になってぁE��ぁE
- [ ] 各Agent固有�Eルールファイルに「`master_rule.mdc`を参照すること」が明記されてぁE��ぁE
- [ ] Cursorを�E起動したか�E�Eulesの変更は再起動が忁E��な場合がある�E�E

---

## 🔧 トラブルシューチE��ング

### 問顁E Rulesが読み込まれてぁE��ぁE

**確認事頁E*:
1. `.cursor/rules/master_rule.mdc`が存在するぁE
2. `alwaysApply: true`が設定されてぁE��ぁE
3. Cursorを�E起動したか�E�Eulesの変更は再起動が忁E��な場合がある�E�E
4. 各Agent固有�Eルールファイルの冒頭に「`master_rule.mdc`を参照すること」が明記されてぁE��ぁE

**解決筁E*:
1. Cursorを�E起動すめE
2. `.cursor/rules/master_rule.mdc`の冁E��を確認すめE
3. 各Agent固有�Eルールファイルの冒頭に「`master_rule.mdc`を参照すること」を明記する（実裁E��み�E�E
4. **タスク開始時に、�E示皁E��`master_rule.mdc`をSystem Promptとして読み込む**

### 問顁E コンチE��スト�Eースでしか守られてぁE��ぁE

**確認事頁E*:
1. RulesがSystem Promptとして読み込まれてぁE��ぁE
2. 会話の流れ�E�Ehort-term Memory�E�に依存してぁE��ぁE��

**解決筁E*:
1. **タスク開始時に、�E示皁E��`master_rule.mdc`をSystem Promptとして読み込む**
2. 使用したRules番号を思老E�Eロセスに記録する
3. Rulesを参照しなぁE��合、ルール違反として扱ぁE

---

## 📝 今後�E方釁E

1. **全Agentの引き継ぎ賁E��に「Rules参�E�E�忁E���ESystem Promptとして�E�」セクションを追加**
2. **タスク開始時に、忁E��`second-brain/RULES/master_rule.mdc`をSystem Promptとして読み込むことを忁E��化**
3. **使用したRules番号を思老E�Eロセスに記録することを忁E��化**
4. **Rulesを参照しなぁE��合、ルール違反として扱ぁE*

---

**最終更新**: 2026-01-22

