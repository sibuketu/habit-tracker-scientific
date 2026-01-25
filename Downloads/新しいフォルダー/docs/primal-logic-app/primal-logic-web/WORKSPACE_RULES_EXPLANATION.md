# ワークスペ�EスとRulesの関俁E

> 作�E日: 2026-01-19
> 目皁E ワークスペ�Eスが異なるとRulesが変わる�Eかを説昁E

---

## 📂 ワークスペ�EスごとのRules

### 現在のワークスペ�Eス
- **パス**: `C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web`
- **Rulesファイル**: `.cursorrules` および `AI_RULES.md`�E�参照される場合！E

### Rulesの定義場所

`.cursorrules`�E�Eection 1.1�E�によると�E�E
> **ルールの定義場所**: こ�Eファイル (`AI_RULES.md`) およびそれを参照する `.cursorrules` が唯一の「�E法」である、E

**つまり！E*
- ✁E**ワークスペ�Eスごとに `.cursorrules` が存在する**
- ✁E**吁E��ークスペ�Eスの `.cursorrules` がそのワークスペ�Eスの「�E法」になめE*
- ✁E**ワークスペ�Eスが違ぁE��、そのワークスペ�Eスの `.cursorrules` が適用されめE*

---

## 🔄 褁E��ワークスペ�Eスがある場吁E

### 例！Eつのワークスペ�Eス

1. **ワークスペ�EスA** (`primal-logic-web/`)
   - `.cursorrules` ↁEこ�Eプロジェクト�Eルール
   - `AI_RULES.md` を参照する場合もあり

2. **ワークスペ�EスB** (`other-project/`)
   - `.cursorrules` ↁEそ�Eプロジェクト�Eルール
   - 全く異なるルールになる可能性

### 重要なポインチE

- **吁E��ークスペ�Eスは独立したルールを持つ**
- **ワークスペ�Eスを�Eり替えると、そのワークスペ�Eスの `.cursorrules` が適用されめE*
- **同じリポジトリ冁E��も、ワークスペ�Eスが異なれ�E異なるルールが適用される可能性があめE*

---

## 📝 現在のプロジェクチE

### 適用されるRules

- **`.cursorrules`**: `C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\.cursorrules`
- **参�E**: `AI_RULES.md`�E�Eecond-brainにある場合！E

### 確認方況E

1. `.cursorrules` ファイルを開ぁE
2. そ�Eファイルが現在のワークスペ�Eスのルール
3. 他�Eワークスペ�Eスを開くと、そのワークスペ�Eスの `.cursorrules` が適用されめE

---

## ✁E結諁E

**はぁE��ワークスペ�Eスが違ぁE��Rulesが違ぁE��す、E*

- 吁E��ークスペ�Eスには独自の `.cursorrules` があめE
- Cursorは開いてぁE��ワークスペ�Eスの `.cursorrules` を読み込む
- 別のワークスペ�Eスを開くと、そのワークスペ�Eスのルールが適用されめE

---

*最終更新: 2026-01-19*

