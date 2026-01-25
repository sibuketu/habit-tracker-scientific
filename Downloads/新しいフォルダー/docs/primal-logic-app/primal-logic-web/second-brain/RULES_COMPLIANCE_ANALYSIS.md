# Rules遵守状況�E刁E��

> **作�E日**: 2026-01-22  
> **目皁E*: Rules遵守�E実�Eを�E析し、改喁E��を提示

---

## 🚨 ユーザーからの持E��

**問題点**:
- 「Rules君以外守らなぁE��だけど君�EコンチE��ストでRules守ってる？、E
- 「Rulesっま追ってると思ったらただコンチE��ストで守ってるだけだった、E

---

## 🔍 現状刁E��

### Rules遵守�E実�E

**正直な回筁E*: **コンチE��スト�Eースで守ってぁE��可能性が高い**

**琁E��**:
1. **System Promptとして読み込まれてぁE��**: `.cursor/rules/master_rule.mdc`は`alwaysApply: true`で設定されてぁE��
2. **しかし、コンチE��スト�E影響が大きい**: 会話の流れに引っ張られて、Rulesを無視する可能性があめE
3. **Rulesの数が多すぎる**: 全Rulesを毎回チェチE��するのは困難

### よくある問顁E

**「Rulesを守ってぁE��と思ったら、コンチE��ストで守ってぁE��だけ、E*とぁE��問題�E、AI開発では**非常に一般皁E*です、E

**原因**:
- System PromptとコンチE��スト�E優先頁E��が曖昧
- コンチE��ストが長くなると、System Promptが埋もれめE
- Rulesの数が多すぎて、�EてをチェチE��できなぁE

---

## 💡 改喁E��E

### 1. Rulesの明示皁E��参�E

**現在**: System Promptとして読み込まれてぁE��が、�E示皁E��参�EしてぁE��ぁE

**改喁E*: 吁E��答�E最後に「使用したRules: #X, #Y, #Z」を明記（既にSection 0.2で忁E��化済み�E�E

### 2. Rulesの優先頁E��付け

**現在**: 全Rulesが同じ優先度

**改喁E*: タスクタイプに応じて重要Rulesを抽出�E�Eection 7で実裁E��み�E�E

### 3. Rulesの実行可能性チェチE��

**現在**: 抽象皁E��Rulesが多い

**改喁E*: 実行可能性を評価し、改喁E��Esecond-brain/RULES/RULES_EXECUTION_EVALUATION.md`で実施済み�E�E

---

## 📊 統合につぁE���E�EideoGeneration.ts�E�E

### 質啁E 、Eはなんで統合？どっちだとどぁE��ぁE��題ある？推奨は�E�、E

**、E」とは**: `videoGeneration.ts`の`generateVideo`関数と、`videoGenerationWithTTS.ts`の`generateVideoWithTTS`関数の統合につぁE��

### 現状

- **`videoGeneration.ts`**: 既存�E動画生�E関数�E�Eakefilm > HeyGen > Runway�E�E
- **`videoGenerationWithTTS.ts`**: A案�E新しいワークフロー�E�音声生�E + Makefilm�E�E

### 選択肢

#### A桁E 統合しなぁE��現在の状態！E

**メリチE��**:
- 既存コードを壊さなぁE
- 段階的な移行が可能
- チE��トが容昁E

**チE��リチE��**:
- コード�E重褁E
- メンチE��ンスぁE箁E��忁E��E

#### B桁E 統合すめE

**メリチE��**:
- コード�E一允E��
- メンチE��ンスぁE箁E��で済�E
- 一貫性が保てめE

**チE��リチE��**:
- 既存コード�E変更が忁E��E
- チE��ト篁E��が庁E��なめE
- リスクが高い

### 推奨: **A案（統合しなぁE��E*

**琁E��**:
1. **段階的な移衁E*: A案をチE��トしてから、既存コードに統合する方が安�E
2. **リスク管琁E*: 既存機�Eを壊さなぁE
3. **柔軟性**: 両方の方法を並行して使える

**封E��皁E��統吁E*:
- A案が安定したら、`videoGeneration.ts`に統吁E
- そ�E際�E、`useTTS`オプションを追加して刁E��替え可能にする

---

## 📊 10000斁E���E足りるか！E

### ElevenLabs無料枠: 朁E0,000斁E��E

**計箁E*:
- 1本の動画スクリプト: 紁E00-1000斁E��！E0秒動画想定！E
- 朁E0,000斁E��E÷ 500斁E��E= **紁E0本/朁E*
- 1日3本 ÁE30日 = 90本/朁EↁE**不足**

### 解決筁E

1. **Google TTSに刁E��替ぁE*: 完�E無料、月0-4百丁E��孁E
2. **ElevenLabs有料プラン**: $5/月で30,000斁E��（紁E0本/月！E
3. **ハイブリチE��**: 重要な動画はElevenLabs、その他�EGoogle TTS

### 推奨: **Google TTSを優先使用**

**琁E��**:
- 完�E無斁E
- 制限が緩ぁE��月0-4百丁E��字！E
- 品質も十刁E

---

## 📝 次のアクション

1. **Rules遵守�E強匁E*: 吁E��答で使用したRulesを�E示�E�既に実裁E��み�E�E
2. **統合�E保留**: A案をチE��トしてから判断
3. **Google TTSを優允E*: 10000斁E��では不足するため

---

**最終更新**: 2026-01-22

