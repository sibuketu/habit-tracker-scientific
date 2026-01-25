# Agent作業刁E��・協調プロトコル

## 目皁E
褁E��のAgentが同時に作業する際、勝手に進めず、衝突を防ぐため�E仕絁E��、E 
**重要E*: 「作業刁E��」ではなく「一緒に作業」が正しい。実裁EgentとレビューAgentが�Eアで作業し、質を向上させる、E

---

## 1. 基本原則

### 1.1. Plan Mode忁E��E
- **全ての作業はPlan Modeで開始すめE*
- ユーザーの明示皁E��承認なしに実行しなぁE
- Cursorの設計上、Plan ModeではGoサインを�EさなぁE

### 1.2. 作業ロチE��
- `MULTI_AGENT_RELEASE_WORK.md`で「🔁E実行中」�Eタスクは他�EAgentが触らなぁE
- 作業開始前に忁E��状態を確誁E

### 1.3. タスクID管琁E
- 吁E��スクに一意�EIDを付与（侁E `SHARE-001`, `NOTIF-002`�E�E
- `AGENT_LOG.md`でIDを記録し、E��褁E��防ぁE

---

## 2. 作業開始�Eロトコル

### スチE��チE: 作業前チェチE��
1. `docs/AGENT_LOG.md`の直迁E件を読む
2. `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`を確誁E
3. 同じタスクが「🔁E実行中」でなぁE��確誁E
4. 同じファイルを触ってぁE��AgentがいなぁE��確誁E

### スチE��チE: 計画提示�E�Elan Mode�E�E
1. **忁E��Plan Modeで計画を提示**
2. 計画には以下を含める�E�E
   - タスクID
   - 触るファイル一覧
   - 他�EAgentへの影響
   - 依存関俁E
3. ユーザーの承認を征E��

### スチE��チE: 作業ロチE��取征E
1. `MULTI_AGENT_RELEASE_WORK.md`で状態を「🔁E実行中」に更新
2. 開始時刻を記録
3. タスクIDを記録

### スチE��チE: 実衁E
1. ユーザー承認後に実行開姁E
2. 進捗を定期皁E��更新�E�E0-20刁E��と�E�E

### スチE��チE: 完亁E��呁E
1. `AGENT_LOG.md`に追訁E
2. `MULTI_AGENT_RELEASE_WORK.md`で状態を「✅ 完亁E��に更新
3. 完亁E��刻を記録
4. **レビュー依頼**: 実裁E��亁E��、忁E��別のAgentにレビューを依頼する�E�後述の「�Eア作業プロトコル」参照�E�E

---

## 3. 衝突E��止ルール

### 3.1. ファイルロチE��
- 同じファイルを触る場合�E、�Eに作業を開始したAgentが優允E
- 後から来たAgentは征E��か、別の方法を検訁E

### 3.2. 依存関係�E確誁E
- 他�EAgentの作業完亁E��征E��忁E��がある場合�E、�E確に記録
- ブロチE��ーとして`MULTI_AGENT_RELEASE_WORK.md`に記輁E

### 3.3. 緊急時�E対忁E
- 衝突が発生した場合�E、`AGENT_LOG.md`に記録
- ユーザーに報告し、指示を仰ぁE

---

## 4. タスクID命名規則

形弁E `[カチE��リ]-[連番]`

侁E
- `SHARE-001`: シェア機�Eの最初�Eタスク
- `NOTIF-002`: 通知機�Eの2番目のタスク
- `UI-003`: UI改喁E�E3番目のタスク

---

## 5. 禁止事頁E

### 5.1. 勝手な実衁E
- ❁EPlan Modeなしで実行開姁E
- ❁Eユーザー承認なしで実衁E
- ❁E他�EAgentが「🔁E実行中」�Eタスクに手を出ぁE

### 5.2. ロチE��無要E
- ❁E`MULTI_AGENT_RELEASE_WORK.md`を確認せずに作業開姁E
- ❁E`AGENT_LOG.md`を読まずに作業開姁E

### 5.3. 状態更新の怠慢
- ❁E作業開始時に状態を更新しなぁE
- ❁E作業完亁E��に状態を更新しなぁE
- ❁E進捗を更新しなぁE

---

## 6. 推奨フロー

```
1. AGENT_LOG.mdの直迁E件を読む
   ↁE
2. MULTI_AGENT_RELEASE_WORK.mdで状態確誁E
   ↁE
3. 計画を立てる！Elan Mode�E�E
   ↁE
4. ユーザーに計画を提示して承認を征E��
   ↁE
5. 承認後、MULTI_AGENT_RELEASE_WORK.mdで状態を「🔁E実行中」に更新
   ↁE
6. 作業実衁E
   ↁE
7. 進捗を定期皁E��更新
   ↁE
8. 完亁E��、AGENT_LOG.mdに追訁E
   ↁE
9. MULTI_AGENT_RELEASE_WORK.mdで状態を「✅ 完亁E��に更新
```

---

## 7. チェチE��リスト（作業開始前�E�E

- [ ] `AGENT_LOG.md`の直迁E件を読んだ
- [ ] `MULTI_AGENT_RELEASE_WORK.md`で状態を確認しぁE
- [ ] 同じタスクが「🔁E実行中」でなぁE��とを確認しぁE
- [ ] 同じファイルを触ってぁE��AgentがいなぁE��とを確認しぁE
- [ ] タスクIDを決定しぁE
- [ ] Plan Modeで計画を提示した
- [ ] ユーザーの承認を征E��てぁE��

---

## 8. ペア作業プロトコル�E�実裁Egent + レビューAgent�E�【推奨、E

### 8.1. 目皁E
- **「�Eりぼて」を防ぁE*: 実裁Egentが「実裁E��ました」と言っても、実際には動作しなぁE�E不完�Eな場合がある
- **質の向丁E*: 別のAgentがチェチE��することで、バグめE��計ミスを早期発要E
- **ユーザーの手間削渁E*: ユーザーが逐一チェチE��する忁E��がなくなめE

### 8.2. 基本フロー

```
1. 実裁Egent: タスクを実裁E
   ↁE
2. 実裁Egent: 「✅ 実裁E��亁E��と報呁E
   ↁE
3. レビューAgent: 自動的にレビューを開姁E
   ↁE
4. レビューAgent: チェチE��リストに基づぁE��検証
   ↁE
5. レビューAgent: 問題があれば「❌ 問題あり」、なければ「✅ 承認、E
   ↁE
6. 問題がある場吁E 実裁Egentが修正 ↁE再レビュー
```

### 8.3. レビューAgentのチェチE��リスチE

#### コード品質チェチE��
- [ ] 型エラーがなぁE���E�Enpx tsc --noEmit`�E�E
- [ ] LintエラーがなぁE���E�Enpm run lint`�E�E
- [ ] 未使用のimport/変数がなぁE��
- [ ] エラーハンドリングが適刁E��

#### 動作確認チェチE��
- [ ] 実裁E��た機�Eが実際に動作するか�E�ブラウザで確認！E
- [ ] エチE��ケース�E�空チE�Eタ、null、undefined等）に対応してぁE��ぁE
- [ ] 画面遷移が正しく動作するか
- [ ] 状態管琁E��正しく動作するか�E��Eレンダリング、状態�E保持等！E

#### 「�Eりぼて」チェチE���E�最重要E��E
- [ ] **UIが表示されるだけで、実際には動作しなぁE* ↁE機�Eが実裁E��れてぁE��か確誁E
- [ ] **チE�Eタが保存されなぁE* ↁEストレージへの保存�E琁E��実裁E��れてぁE��か確誁E
- [ ] **API呼び出しがモチE��だぁE* ↁE実際のAPIが呼ばれてぁE��か確誁E
- [ ] **エラーメチE��ージが表示されなぁE* ↁEエラー処琁E��実裁E��れてぁE��か確誁E
- [ ] **状態がリセチE��されなぁE* ↁE画面遷移時に状態が保持されるか確誁E

#### 仕様適合チェチE��
- [ ] ユーザーの要求を満たしてぁE��ぁE
- [ ] 既存�E機�Eを壊してぁE��ぁE��
- [ ] 他�EAgentの作業と衝突してぁE��ぁE��

### 8.4. レビューAgentの作業手頁E

1. **実裁Egentの報告を確誁E*
   - `AGENT_LOG.md`の最新エントリを確誁E
   - 実裁E��たファイルを特宁E

2. **コードレビュー**
   - 実裁E��たファイルを読み、ロジチE��を理解
   - チェチE��リストに基づぁE��検証

3. **動作確誁E*
   - 開発サーバ�Eを起動（忁E��に応じて�E�E
   - 実裁E��た機�Eを実際に操作して確誁E

4. **レビュー結果の記録**
   - `MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
   - 問題がある場合�E、�E体的な持E��を記輁E
   - 問題がなぁE��合�E「✅ 承認」と記輁E

5. **実裁Egentへの通知**
   - 問題がある場吁E 「❌ 問題あめE [具体的な持E��]」と会話ログに記輁E
   - 問題がなぁE��吁E 「✅ 承認」と会話ログに記輁E

### 8.5. 実裁Egentの対忁E

- **レビューAgentから持E��があった場吁E*:
  1. 持E��冁E��を確誁E
  2. 修正を実施
  3. `AGENT_LOG.md`に「レビュー持E��の修正」として追訁E
  4. レビューAgentに再レビューを依頼

- **レビューAgentから承認された場吁E*:
  1. `MULTI_AGENT_RELEASE_WORK.md`で状態を「✅ 完亁E��レビュー済み�E�」に更新
  2. 次のタスクに進む

### 8.6. 自動レビュー依頼の仕絁E��

実裁Egentが「✅ 実裁E��亁E��と報告した際、以下�Eルールを適用�E�E

1. **自動的にレビューAgentに通知**
   - `MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に「[実裁Egent名] ↁE[レビューAgent名]: レビュー依頼」と記輁E
   - レビューAgentはこ�Eログを監視し、�E刁E�E名前が呼ばれたら�E動的にレビューを開姁E

2. **レビューAgentの割り当て**
   - 実裁Egentとは別のAgentを�E動的に割り当て
   - 褁E��のレビューAgentがいる場合�E、ローチE�Eションで割り当て

### 8.7. 会話ログの活用

`MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」を活用�E�E

```
[2026-01-20] Coder: ✁Eシェア機�Eの実裁E��亁E��ShareModal.tsxを作�E、E
[2026-01-20] Reviewer: レビュー開始。ShareModal.tsxを確認中、E
[2026-01-20] Reviewer: ❁E問題あめE Web Share APIのエラーハンドリングが未実裁E��navigator.shareが存在しなぁE��合�E処琁E��忁E��、E
[2026-01-20] Coder: 持E��を確認。エラーハンドリングを追加中、E
[2026-01-20] Coder: ✁E修正完亁E��エラーハンドリングを追加、E
[2026-01-20] Reviewer: ✁E承認。エラーハンドリングが適刁E��実裁E��れてぁE��、E
```

### 8.8. メリチE��

- **質の向丁E*: 実裁Egentだけでは見落としがちな問題を発要E
- **ユーザーの手間削渁E*: ユーザーが逐一チェチE��する忁E��がなくなめE
- **学習効极E*: 実裁EgentとレビューAgentが会話することで、両方の質が向丁E
- **「�Eりぼて」�E防止**: 動作しなぁE��裁E��早期発要E

---

**重要E*: こ�Eプロトコルは全てのAgentが�E守する忁E��があります。違反した場合�E、作業を中断し、ユーザーに報告してください、E

