# .cursorrules 統一化計画

> **作�E日**: 2026-01-19  
> **目皁E*: ワークスペ�Eスごとに異なる`.cursorrules`を統一する計画

---

## 🔍 現状の問顁E

### 問題点
1. **ワークスペ�Eスごとに`.cursorrules`が異なめE*
   - Cursorは開いてぁE��ワークスペ�Eスの`.cursorrules`を読み込む
   - ワークスペ�Eスを�Eり替えると、異なるルールが適用されめE
   - ルールがバラバラになり、一貫性が失われめE

2. **現在の`.cursorrules`の冁E��**
   - タイトル: "AI Rules - CarnivOS (Cursor & Antigravity共送E"
   - 「このファイルはCursorとAntigravity両方が参照する唯一のルールファイルです」と記輁E
   - しかし、実際にはワークスペ�Eスごとに異なる可能性があめE

3. **参�Eファイルの不整吁E*
   - `.cursorrules`冁E��`AI_RULES.md`を参照してぁE��が、実際のファイルの場所が不�E確
   - 吁E��ークスペ�Eスで異なる場所を参照してぁE��可能性

---

## 🎯 解決策�E検訁E

### 桁E: マスタールールファイル方式（推奨�E�E
**方況E*:
1. 共通ルールを`second-brain/AI_RULES.md`に雁E��E
2. 吁E��ークスペ�Eスの`.cursorrules`は、�Eスターファイルへの参�Eを追加
3. プロジェクト固有�Eルールのみを`.cursorrules`に記輁E

**メリチE��**:
- 共通ルールを一允E��琁E��きる
- ルールの更新が容昁E
- 一貫性が保たれる

**チE��リチE��**:
- 吁E��ークスペ�Eスで参�Eパスを統一する忁E��がある

### 桁E: 全ワークスペ�Eスで同一の`.cursorrules`を使用
**方況E*:
1. 1つの`.cursorrules`ファイルを�Eスターとして作�E
2. 全てのワークスペ�Eスで同一のファイルをシンボリチE��リンクまた�Eコピ�E

**メリチE��**:
- 完�Eに同一のルールが適用されめE

**チE��リチE��**:
- プロジェクト固有�Eルールが設定できなぁE
- プロジェクトごとに異なるルールが忁E��な場合�E使えなぁE

### 桁E: 階層皁E��ール構造
**方況E*:
1. 共通ルール: `second-brain/AI_RULES.md`
2. プロジェクト�E通ルール: プロジェクトディレクトリの`.cursorrules`
3. ワークスペ�Eス固有ルール: ワークスペ�Eスの`.cursorrules`�E�忁E��に応じて�E�E

**メリチE��**:
- 柔軟性が高い
- プロジェクト固有�Eルールを設定できる

**チE��リチE��**:
- 構造が褁E��になめE
- どのルールが適用されてぁE��か�Eかりにくい

---

## 📋 推奨解決筁E 桁E�E��Eスタールールファイル方式！E

### 実裁E��頁E

1. **マスタールールファイルの確認�E作�E**
   - `second-brain/AI_RULES.md`の存在確誁E
   - 存在しなぁE��合�E、現在の`.cursorrules`を�Eースに作�E

2. **吁E��ークスペ�Eスの`.cursorrules`を更新**
   - 共通ルールは`AI_RULES.md`への参�Eに変更
   - プロジェクト固有�Eルールのみを`.cursorrules`に記輁E

3. **参�E方法�E統一**
   - 相対パス: `../../second-brain/AI_RULES.md`
   - また�E、絶対パス: `C:\Users\susam\Downloads\新しいフォルダー\docs\second-brain\AI_RULES.md`

4. **ルールの刁E��E*
   - **共通ルール** (`AI_RULES.md`):
     - Deep Thought Protocol
     - Meta-Rules & Autonomy
     - Communication Protocol
     - AI Information Source Matrix
   - **プロジェクト固有ルール** (`.cursorrules`):
     - Tech Stack�E�Eeact/Vite、TypeScript等！E
     - プロジェクト固有�EチE��レクトリ構造
     - プロジェクト固有�E作業フロー

---

## 🔧 次のスチE��チE

1. **現状確誁E*
   - [ ] 他�Eワークスペ�Eスの`.cursorrules`を確誁E
   - [ ] `second-brain/AI_RULES.md`の存在確誁E
   - [ ] 現在の`.cursorrules`と`AI_RULES.md`の差刁E��誁E

2. **マスターファイルの準備**
   - [ ] `second-brain/AI_RULES.md`を確認�E更新
   - [ ] 共通ルールとプロジェクト固有ルールを�E離

3. **吁E��ークスペ�Eスの更新**
   - [ ] 現在のワークスペ�Eス�E�Eprimal-logic-web`�E��E`.cursorrules`を更新
   - [ ] 他�Eワークスペ�Eスの`.cursorrules`を更新�E�忁E��に応じて�E�E

4. **チE��チE*
   - [ ] 吁E��ークスペ�Eスでルールが正しく適用されるか確誁E

---

## 📝 注意事頁E

- ルールの変更は慎重に行う
- 変更前に現在のルールをバチE��アチE�Eする
- 変更後�E吁E��ークスペ�Eスで動作確認を行う

---

**最終更新**: 2026-01-19�E�エージェンチE�E�E

