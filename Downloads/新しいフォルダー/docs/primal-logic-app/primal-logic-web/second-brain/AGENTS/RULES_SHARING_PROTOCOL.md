# Rules共有�Eロトコル�E��EAgent共通！E

> **作�E日**: 2026-01-21  
> **目皁E*: 全Agentで共通�ERulesを使用するためのプロトコル

---

## 🔍 現状の問顁E

**他�EAgentでRulesが使われなぁE��由**:

1. **ワークスペ�Eス固有�ERules**
   - `.cursor/rules/master_rule.mdc`はこ�Eワークスペ�Eス�E�Eprimal-logic-web`�E�にのみ存在
   - 他�EAgentが別のワークスペ�Eスで作業してぁE��場合、そのワークスペ�EスのRulesが適用されめE
   - また�E、Rulesファイルが存在しなぁE��能性

2. **明示皁E��持E��がなぁE*
   - Agent 2の引き継ぎ賁E��に「Rulesを参照してください」とぁE��持E��がなぁE
   - 他�EAgentがRulesの存在を知らなぁE��能性

3. **チE�Eルの違い**
   - 他�EAgentがAntigravity等�E別チE�Eルを使ってぁE��場合、`.cursor/rules/`を参照しなぁE��能性
   - CursorとAntigravityでRulesの読み込み方法が異なる可能性

---

## ✁E解決筁E

### 方況E: マスターファイルをSystem Promptとして明示皁E��参�E�E�推奨・最重要E��E

**各Agentの引き継ぎ賁E��に以下を追加**:

```markdown
## ⚠�E�E重要E Rules参�E�E�忁E���ESystem Promptとして�E�E

**全Agentは、タスク開始時に忁E��以下を実行すること�E�E*

1. **マスタールールファイルをSystem Promptとして読み込む**:
   - Cursorの場吁E `.cursor/rules/master_rule.mdc`を読み込む
   - Antigravity/ClaudeCodeの場吁E `second-brain/RULES/master_rule.mdc`を読み込む
   - **コンチE��スト�Eースではなく、System Promptとして確実に読み込む**

2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する

3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する

**違反時�EペナルチE��**:
- Rulesを参照しなぁE��合、ルール違反として扱ぁE
- コンチE��スト�Eースでしか守られてぁE��ぁE��合、即座にSystem Promptとして読み込む
```

### 方況E: 他�EAgentのワークスペ�EスにもRulesをコピ�E

**手頁E*:
1. `second-brain/RULES/master_rule.mdc`を�Eスターとして決宁E
2. 他�EAgentが作業するワークスペ�Eスの`.cursor/rules/`チE��レクトリにコピ�E
3. また�E、シンボリチE��リンクを作�E�E�Eindowsの権限問題に注意！E

### 方況E: Agent引き継ぎ賁E��にRules参�Eを追加

**各Agentの引き継ぎ賁E��の冒頭に以下を追加**:

```markdown
## ⚠�E�E重要E Rules参�E�E�忁E��！E

**こ�Eタスクを開始する前に、忁E��以下を確認すること�E�E*

1. **マスタールール**: `second-brain/RULES/master_rule.mdc`を読み込む
2. **タスクタイプ判断**: Section 7に従って、タスクタイプを判断し、E��要Rulesを抽出する
3. **Rules適用**: 使用したRules番号を思老E�Eロセスに記録する

**Rulesを参照しなぁE��合、ルール違反として扱ぁE��E*
```

---

## 📋 実裁E��頁E

### Step 1: Agent 2の引き継ぎ賁E��を更新

`second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md`の冒頭に「Rules参�E�E�忁E��）」セクションを追加

### Step 2: Agent 2のスタートガイドを更新

`second-brain/AGENTS/AGENT_2_START_GUIDE.md`の冒頭に「Rules参�E�E�忁E��）」セクションを追加

### Step 3: 他�EAgentの引き継ぎ賁E��も同様に更新

今後、他�EAgentを作�Eする際�E、忁E��「Rules参�E�E�忁E��）」セクションを含める

---

## 🔧 今後�E方釁E

1. **全Agentの引き継ぎ賁E��に「Rules参�E�E�忁E��）」セクションを追加**
2. **タスク開始時に、忁E��`second-brain/RULES/master_rule.mdc`を参照することを�E示**
3. **使用したRules番号を思老E�Eロセスに記録することを忁E��化**

---

**更新日**: 2026-01-21

