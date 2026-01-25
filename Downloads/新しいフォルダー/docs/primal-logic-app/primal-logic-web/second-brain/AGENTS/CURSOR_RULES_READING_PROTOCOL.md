# Cursor Rules読み込みプロトコル�E��EAgent共通！E

> **作�E日**: 2026-01-21  
> **目皁E*: Cursor冁E�E全Agentで`.cursor/rules/master_rule.mdc`が確実に読み込まれるようにする

---

## 🔍 現状の問顁E

**同じワークスペ�Eス�E�Eprimal-logic-web`�E�で作業してぁE��のに、他�EAgent�E�Eursor冁E�E全Agent�E�でRulesが使われてぁE��ぁE��由**:

1. **`.cursor/rules/master_rule.mdc`の読み込み**
   - `alwaysApply: true`が設定されてぁE��ため、理論上�E全Agentで読み込まれるはぁE
   - しかし、各Agent固有�Eルールファイル�E�Epm_architect.mdc`, `fullstack_engineer.mdc`, `qa_reviewer.mdc`�E�が優先される可能性

2. **各Agent固有�Eルールファイル**
   - `alwaysApply: false`で、特定�Eファイルパターン�E�Elobs�E�にマッチした場合�Eみ適用されめE
   - 各Agentが「人格」として設定されてぁE��場合、そのAgent固有�Eルールファイルが優先される可能性

3. **CursorのRules読み込み頁E��E*
   - Cursorは`.cursor/rules/`冁E�E`.mdc`ファイルを�E動的に読み込む
   - しかし、読み込み頁E��や優先頁E��が不�E確

---

## ✁E解決策（実裁E��み�E�E

### 1. 各Agent固有�Eルールファイルに明示皁E��参�Eを追加

**各Agent固有�Eルールファイル�E�Epm_architect.mdc`, `fullstack_engineer.mdc`, `qa_reviewer.mdc`�E��E冒頭に以下を追加**:

```markdown
**⚠�E�E重要E こ�Eルールファイルは`.cursor/rules/master_rule.mdc`と併用されます、E*
**`master_rule.mdc`の全ルール�E��Eセクション�E�が優先されます。このファイルは[Agent名]固有�E追加ルールです、E*
```

### 2. `master_rule.mdc`の確誁E

**`.cursor/rules/master_rule.mdc`が以下を満たしてぁE��ことを確誁E*:
- `alwaysApply: true`が設定されてぁE��
- `globs: **/*`が設定されてぁE���E��Eファイルに適用�E�E
- 全Agent共通�Eルール�E��Eセクション�E�が含まれてぁE��

### 3. CursorのRules読み込み方況E

**Cursorは以下�E頁E��でRulesを読み込む**:
1. `.cursor/rules/`冁E�E`.mdc`ファイルを�Eて読み込む
2. `alwaysApply: true`のファイルは常に適用されめE
3. `alwaysApply: false`のファイルは、`globs`にマッチした場合�Eみ適用されめE
4. 褁E��のルールファイルが適用される場合、E*全てのルールが統合される**

**重要E*: `master_rule.mdc`は`alwaysApply: true`なので、E*全Agentで忁E��読み込まれる**、E

---

## 📋 各Agentへの持E��

**全Agent�E�Eursor冁E�E全Agent�E��E、以下を確認すること�E�E*

1. **`.cursor/rules/master_rule.mdc`が読み込まれてぁE��か確誁E*
   - タスク開始時に、`master_rule.mdc`の冁E��を参照する
   - 特に、Section 7�E�タスクタイプ判断と重要Rules抽出プロトコル�E�を実行すめE

2. **使用したRules番号を記録**
   - `second-brain/THINKING_PROCESS.md`に記録
   - 使用したRules番号と適用方法を併訁E

3. **各Agent固有�Eルールファイルも確誁E*
   - `pm_architect.mdc`�E�EM/アーキチE��ト！E
   - `fullstack_engineer.mdc`�E�実裁E��ンジニア�E�E
   - `qa_reviewer.mdc`�E�EA/レビュー�E�E
   - ただし、`master_rule.mdc`が優先される

---

## 🔧 トラブルシューチE��ング

### 問顁E Rulesが読み込まれてぁE��ぁE

**確認事頁E*:
1. `.cursor/rules/master_rule.mdc`が存在するぁE
2. `alwaysApply: true`が設定されてぁE��ぁE
3. Cursorを�E起動したか�E�Eulesの変更は再起動が忁E��な場合がある�E�E

**解決筁E*:
1. Cursorを�E起動すめE
2. `.cursor/rules/master_rule.mdc`の冁E��を確認すめE
3. 各Agent固有�Eルールファイルの冒頭に「`master_rule.mdc`を参照すること」を明記する（実裁E��み�E�E

---

**更新日**: 2026-01-21

