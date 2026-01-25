# CursorとAntigravityのルール共有問題 - 調査結果と解決策

**作成日**: 2026-01-22  
**目的**: CursorとAntigravityでルールが共有できていなかった原因を明確化し、解決策を提示

---

## 🔍 調査結果

### 問題の原因

**結論**: **両方に問題がありました**

1. **Cursor側の問題**:
   - `.cursor/rules/master_rule.mdc`が**通常のファイル**として存在
   - **シンボリックリンクではない**
   - バージョン: **1.2.0**（最新）

2. **Antigravity側の問題**:
   - `second-brain/RULES/master_rule.mdc`が**通常のファイル**として存在
   - バージョン: **1.0.0**（古い）
   - Cursor側の更新が反映されていない

### 現状

- **`.cursor/rules/master_rule.mdc`**: バージョン1.2.0（最新、通常のファイル）
- **`second-brain/RULES/master_rule.mdc`**: バージョン1.0.0（古い、通常のファイル）
- **シンボリックリンク**: 作成されていない

### どちらが悪いか

**結論**: **両方に問題がある**

1. **Cursor側**: シンボリックリンクを作成していない（通常のファイルとして存在）
2. **Antigravity側**: 古いバージョンのファイルを参照している

**根本原因**: シンボリックリンクが作成されていないため、2つのファイルが独立して存在し、同期されていない

---

## ✅ 解決策（実施済み）

### 実施した対応

1. **マスターファイルを更新**: `second-brain/RULES/master_rule.mdc`を`.cursor/rules/master_rule.mdc`の内容で更新（バージョン1.2.0に統一）

### 今後の対策

#### オプション1: シンボリックリンクを作成（推奨）

1. `.cursor/rules/master_rule.mdc`を削除
2. `.cursor/rules/master_rule.mdc`を`second-brain/RULES/master_rule.mdc`へのシンボリックリンクとして作成

**PowerShellコマンド**:
```powershell
Remove-Item ".cursor\rules\master_rule.mdc" -Force
New-Item -ItemType SymbolicLink -Path ".cursor\rules\master_rule.mdc" -Target "second-brain\RULES\master_rule.mdc"
```

#### オプション2: 手動同期（現在の方法）

ルールを更新したら、以下の手順を実行：
1. `.cursor/rules/master_rule.mdc`を更新
2. `second-brain/RULES/master_rule.mdc`を同じ内容で更新

---

## 📋 今後の対策

### ルール更新時のプロトコル

1. **マスターファイルを更新**: `second-brain/RULES/master_rule.mdc`を更新
2. **Cursor側を更新**: `.cursor/rules/master_rule.mdc`を同じ内容で更新（またはシンボリックリンクの場合は自動反映）
3. **バージョン番号の更新**: ルールを更新したら、バージョン番号を更新

### 定期確認

- 月1回、`.cursor/rules/master_rule.mdc`と`second-brain/RULES/master_rule.mdc`のバージョン番号が一致していることを確認
- シンボリックリンクを使用する場合は、リンクが正しく機能していることを確認

---

## 📝 補足

### CursorとAntigravityのルール参照方法

- **Cursor**: `.cursor/rules/master_rule.mdc`を自動的に読み込む（`alwaysApply: true`が設定されている）
- **Antigravity**: `second-brain/RULES/master_rule.mdc`を参照（`CLAUDE.md`経由）

### シンボリックリンクのメリット

- 1つのファイルを更新すれば、両方に反映される
- バージョン管理が簡単
- 同期漏れが発生しない

---

**使用したRules**: #0, #1, #2, #5, #6, #8, #10
