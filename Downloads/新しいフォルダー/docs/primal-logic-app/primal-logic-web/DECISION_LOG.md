# Decision Log - CarnivOS

> **目皁E*: 重要な決定事頁E��、その琁E���E�Ehy�E�を記録する、E
> **ルール**: 決定した�E容だけでなく、「なぜその選択をしたか」を忁E��記録する、E

---

## 2026-01-15: SNS動画キャラクター変更�E�ずんだもん ↁEVeritas�E�E

### 決定�E容
**SNS動画のキャラクターをずんだもん�E�EOICEVOX�E�からVeritas�E�アプリ冁EI�E�に変更する、E*

### 琁E���E�Ehy�E�E
1. **ブランド統一**: アプリとSNSのブランドイメージを一貫させる。ユーザーがアプリで接するVeritasと同じキャラクターが動画に登場することで、認知度と信頼性が向上する、E
2. **マ�EケチE��ング効极E*: 動画視�E老E��「このキャラはアプリで使える」と直感的に琁E��できる、EouTube ↁEアプリダウンロード�E導線が強化される、E
3. **差別匁E*: ずんだもんは汎用キャラクターで他�E多くのコンチE��チE��も使用されてぁE��。Veritasは独自キャラクターとして差別化が可能、E
4. **キャラクター一貫性**: アプリ冁E��Veritasが提供する情報と、SNS動画で提供する情報の発信老E��同一であることで、情報の信頼性が向上する、E

### 影響篁E��
- `second-brain/CARNIVOS/STATUS.md`: 最新決定事頁E��して記録
- `second-brain/CARNIVOS/README.md`: キャラクター惁E��を更新
- `second-brain/README.md`: プロジェクト概要を更新
- `second-brain/CHAT_HISTORY/INDEX.md`: SNS自動化セクションを更新
- SNS/VIDEO関連ドキュメンチE 今後�E制作�EVeritasベ�Eスで実施

### 次のアクション
1. Obsidian冁E�E全「ずんだもん」記述に`[DEPRECATED]`タグを追加
2. 新規コンチE��チE��画はVeritasベ�Eスで作�E
3. SNS自動化ワークフロー構築を優先タスクとして実施

### 参老E
- `second-brain/CARNIVOS/STATUS.md` - 現在のプロジェクト状慁E
- `second-brain/CARNIVOS/VIDEO/` - 動画制作仕様（更新予定！E

---

## 2026-01-11: If-Then機�Eの削除決宁E

### 決定�E容
**If-Then機�Eは実裁E��なぁE��E*

### 琁E���E�Ehy�E�E
1. **めE��こしくなめE*: If-Then機�EはHabitica/Streaksのような汎用習�E化アプリの機�E。カーニ�Eアアプリには不要な褁E��性を追加する、E
2. **Todoで十�E**: 「外食時の対応」「糖質摂取時�E対応」�E、TodoリストやチェチE��リストで十�E対応可能、E
3. **カーニ�Eア哲学に反すめE*: カーニ�Eアは「シンプル」が哲学。機�Eを増やすことで本質から離れる、E

### 参老E
- `FEATURE_INTENTS.md` の「If-Thenルール機�E」セクション
- 習�E化アプリ�E�Eabitica、Streaks�E��EIf-Then機�Eを参老E��してぁE��が、削除決定、E

---

## 2026-01-11: Phase概念の削除決宁E

### 決定�E容
**Phase 1、Phase 2、Phase 3などの概念を使用しなぁE��E*

### 琁E���E�Ehy�E�E
1. **CLAUDE.mdのルールと矛盾**: CLAUDE.md�E�E05行）に「Phase概念なし：リリース時に自信を持って機�Eを提供する。Phase 1、Phase 2、Phase 3などの概念は使わなぁE��と明記されてぁE��、E
2. **実裁E��針�E混乱**: Phaseで刁E��すると「Phase 1が終わるまでPhase 2を実裁E��なぁE��とぁE��誤解を生む。実際は並行実裁E��可能、E
3. **大量実裁E��針に反すめE*: リリース前に全部実裁E��て見せる方針。Phaseで刁E��すると段階的リリースを示唁E��てしまぁE��E

### 変更冁E��
- `Carnivore_Logic_Master_Spec.md`: 「Phase 1/2/3」�E「Implementation Status」に変更
- `GEMINI_FEATURES_TO_IMPLEMENT.md`: 「Phase 2/3/4/5」を削除

---

## 記録フォーマッチE

吁E��定には以下を記録する�E�E
1. **日仁E*: 決定した日
2. **決定�E容**: 何を決定したか�E�簡潔に�E�E
3. **琁E���E�Ehy�E�E*: なぜその選択をしたか（詳細に�E�E
4. **参老E*: 関連するドキュメント、ファイル、外部惁E��溁E

---

最終更新: 2026-01-11

