# 匁E��皁E��質保証プロトコル�E�Eomprehensive Check Protocol�E�E

> **作�E日**: 2026-01-21  
> **目皁E*: 要件定義から実裁E��亁E��で、�Eての段階での品質保証を統合的に管琁E 
> **更新ルール**: プロトコルの変更時�E、E��連するルールファイル�E�E.cursor/rules/*.mdc`�E�も同時に更新

---

## 概要E

「�E動チェチE��」とは、E*要件定義から実裁E��亁E��で全ての段階でのチェチE��**を指す、E2EチE��ト！Elaywright�E��Eみを指すものではなぁE��E

本プロトコルは、以下�E5段階チェチE��を統合的に管琁E��る！E

1. **要件定義チェチE��**�E�EM/アーキチE��ト担当！E
2. **コード品質チェチE��**�E�実裁E��ンジニア拁E��！E
3. **動作確認チェチE��**�E�EA/レビュー拁E��！E
4. **仕様適合チェチE��**�E�EA/レビュー拁E��！E
5. **セキュリチE��チェチE��**�E�EA/レビュー拁E��！E

---

## 1. 要件定義チェチE���E�EM/アーキチE��ト担当！E

### 実行タイミング
- **実裁E��始前**に忁E��実衁E
- ユーザーの要望を受けた時点で実衁E

### チェチE��頁E��

#### 1.1 要件の明確性・完�E性
- [ ] 要件が�E確に定義されてぁE��ぁE
- [ ] 不足してぁE��惁E��はなぁE��
- [ ] 曖昧な表現はなぁE��
- [ ] 実裁E��能なタスクに刁E��されてぁE��ぁE

#### 1.2 医学皁E�E科学皁E��拠の検証
- [ ] カーニ�Eア系の惁E��を扱ぁE��合、Ken Berry、Shawn Baker等�E惁E��源をWeb検索で確認したか
- [ ] 他�Eカーニ�Eアアプリで同様�E持E��が使われてぁE��か確認したか
- [ ] ユーザーに忁E��性と科学皁E��拠を確認したか
- [ ] 医学皁E�E科学皁E��拠のなぁE��報を実裁E��てぁE��ぁE��

#### 1.3 既存機�Eとの整合性
- [ ] 既存�E機�EめE��ータ構造と矛盾してぁE��ぁE��
- [ ] 既存�EUI/UXパターンと一貫してぁE��ぁE
- [ ] 既存�EAPI設計と整合してぁE��ぁE

#### 1.4 ユーザー体験�E一貫性
- [ ] UI/UXが既存�E画面と一貫してぁE��ぁE
- [ ] 用語や表記が統一されてぁE��ぁE
- [ ] ナビゲーションが直感的ぁE

#### 1.5 実裁E��能性
- [ ] 技術的に実裁E��能ぁE
- [ ] 忁E��なリソース�E�EPI、ライブラリ等）�E揁E��てぁE��ぁE
- [ ] 実裁E�E褁E��度は適刁E��

### 記録方況E
- 要件定義チェチE��の結果は`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
- 問題がある場合�E、�E体的な持E��を記輁E
- 問題がなぁE��合�E「✅ 要件定義チェチE��完亁E��と記輁E

---

## 2. コード品質チェチE���E�実裁E��ンジニア拁E��！E

### 実行タイミング
- **実裁E��亁E��**に忁E��実衁E
- コミット前にも実行（推奨�E�E

### チェチE��頁E��

#### 2.1 LintチェチE��
- [ ] `npm run lint`を実衁E
- [ ] エラー: 0件
- [ ] 警呁E 可能な限り0件�E�意図皁E��警告�Eコメントで説明！E
- [ ] 自動修正可能なも�Eは`npm run lint:fix`で修正

#### 2.2 TypeScript型チェチE��
- [ ] `npx tsc --noEmit`を実衁E
- [ ] 型エラー: 0件
- [ ] `any`型�E使用は最小限�E�意図皁E��使用はコメントで説明！E

#### 2.3 PrettierフォーマットチェチE��
- [ ] `npm run format:check`を実衁E
- [ ] フォーマットエラー: 0件
- [ ] 自動修正可能なも�Eは`npm run format`で修正

#### 2.4 未使用コード�E検�E
- [ ] 未使用のimportを削除
- [ ] 未使用の変数・関数を削除
- [ ] 未使用のファイルを削除�E�忁E��に応じて�E�E

### 記録方況E
- コード品質チェチE��の結果は`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
- エラーがある場合�E、�E体的なエラー冁E��を記輁E
- エラーがなぁE��合�E「✅ コード品質チェチE��完亁E��Eint: 0件、型エラー: 0件�E�」と記輁E

---

## 3. 動作確認チェチE���E�EA/レビュー拁E��！E

### 実行タイミング
- **実裁E��亁E��、レビュー晁E*に忁E��実衁E
- 実裁Egentからレビュー依頼を受けた時点で実衁E

### チェチE��頁E��

#### 3.1 起動確認！Etartup Guarantee�E�E
- [ ] **サーバ�E起勁E*: 開発サーバ�Eを起動！Enpm run dev`�E�し、正常に起動するか
  - Vite開発サーバ�Eが起動するか
  - ポ�Eト番号�E�通常5173また�E5174�E�でアクセスできるぁE
  - ビルドエラーがなぁE��
- [ ] **画面表示**: 画面が表示される（「画面が真っ黒」でなぁE��E
- [ ] **エラーメチE��ージ**: エラーメチE��ージが表示されなぁE
- [ ] **コンソールエラー**: コンソールエラーがなぁE

#### 3.2 基本機�Eの動作確誁E
- [ ] **実裁E���E**: 実裁E��た機�Eが実際に動作するか�E�ブラウザで確認！E
- [ ] **画面遷移**: 全ての画面に正しく遷移できるぁE
- [ ] **状態管琁E*: 状態管琁E��正しく動作するか�E��Eレンダリング、状態�E保持等！E
- [ ] **チE�Eタ保孁E*: チE�Eタが正しく保存されるか！Eupabase/localStorage�E�E
- [ ] **チE�Eタ読み込み**: チE�Eタが正しく読み込まれるぁE
- [ ] **API呼び出ぁE*: APIが正しく呼ばれてぁE��か（モチE��ではなぁE��E
- [ ] **エラーハンドリング**: エラーが適刁E��処琁E��れてぁE��か（ネチE��ワークエラー、APIエラー等！E

#### 3.3 認証・ログイン機�Eの確誁E
- [ ] **ログイン機�E**: ログイン・ログアウトが正しく動作するか�E�Esrc/screens/AuthScreen.tsx`�E�E
- [ ] **認証状慁E*: セチE��ョン管琁E��正しく動作するか�E�Eupabase Auth、`src/App.tsx`の`session`状態！E
- [ ] **ユーザー登録**: ユーザー登録�E�メール/パスワード）が正しく動作するか
- [ ] **パスワードリセチE��**: パスワードリセチE��が正しく動作するか
- [ ] **ゲストモーチE*: ゲストモード（オプション�E�が正しく動作するか�E�Eocal First方針！E

**参�E**: `docs/BASIC_FEATURES_CHECKLIST.md`の、E. 認証・セキュリチE��」セクションを参照

#### 3.4 エチE��ケースのチE��チE
- [ ] **空チE�Eタ**: 空チE�Eタ、null、undefined等に対応してぁE��ぁE
- [ ] **通信遮断**: 通信遮断時�Eエラーハンドリングが適刁E��
- [ ] **状態保持**: 画面遷移時に状態が保持されるか
- [ ] **異常入劁E*: 異常な入力値に対する処琁E��適刁E��

#### 3.5 「�Eりぼて」チェチE���E�最重要E��E
- [ ] **UIが表示されるだけで、実際には動作しなぁE* ↁE機�Eが実裁E��れてぁE��か確誁E
- [ ] **チE�Eタが保存されなぁE* ↁEストレージへの保存�E琁E��実裁E��れてぁE��か確誁E
- [ ] **API呼び出しがモチE��だぁE* ↁE実際のAPIが呼ばれてぁE��か確誁E
- [ ] **エラーメチE��ージが表示されなぁE* ↁEエラー処琁E��実裁E��れてぁE��か確誁E
- [ ] **状態がリセチE��されなぁE* ↁE画面遷移時に状態が保持されるか確誁E

### 記録方況E
- 動作確認チェチE��の結果は`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
- 問題がある場合�E「❌ 問題あめE [具体的な持E��]」と記輁E
- 問題がなぁE��合�E「✅ 動作確認完亁E��と記輁E

---

## 4. 仕様適合チェチE���E�EA/レビュー拁E��！E

### 実行タイミング
- **実裁E��亁E��、レビュー晁E*に忁E��実衁E
- 動作確認チェチE��と同時に実衁E

### チェチE��頁E��

#### 4.1 ユーザー要求�E允E��
- [ ] **ユーザー要汁E*: ユーザーの要求を満たしてぁE��ぁE
- [ ] **要件定義**: 要件定義で定義された機�Eが実裁E��れてぁE��ぁE
- [ ] **期征E��佁E*: 期征E��れる動作と一致してぁE��ぁE

#### 4.2 忁E��機�Eの実裁E��誁E
- [ ] **リリース要件**: リリース要件�E�ERELEASE_REQUIREMENTS.md`�E�に記載された忁E��機�Eが実裁E��れてぁE��ぁE
- [ ] **認証機�E**: ログイン・登録・パスワードリセチE��が実裁E��れてぁE��ぁE
- [ ] **チE�Eタ保護**: チE�Eタの暗号化、RLS設定が適刁E��
- [ ] **法的要件**: プライバシーポリシー、利用規紁E��表示されるか
- [ ] **エラーハンドリング**: ネットワークエラー、APIエラーの処琁E��実裁E��れてぁE��ぁE
- [ ] **パフォーマンス**: 読み込み速度、コード�E割、キャチE��ュ戦略が適刁E��
- [ ] **アクセシビリチE��**: キーボ�Eドナビゲーション、スクリーンリーダー対応が実裁E��れてぁE��ぁE
- [ ] **モバイル対忁E*: レスポンシブデザイン、タチE��フレンドリーなUIが実裁E��れてぁE��ぁE

#### 4.3 既存機�Eの破壊確誁E
- [ ] 既存�E機�Eを壊してぁE��ぁE��
- [ ] 既存�E画面遷移が正しく動作するか
- [ ] 既存�EチE�Eタ構造と整合してぁE��ぁE

#### 4.4 UI/UXの一貫性
- [ ] UI/UXが既存�E画面と一貫してぁE��ぁE
- [ ] 用語や表記が統一されてぁE��ぁE
- [ ] ナビゲーションが直感的ぁE

#### 4.5 他�EAgentとの衝突確誁E
- [ ] 他�EAgentの作業と衝突してぁE��ぁE��
- [ ] 同じファイルを同時に編雁E��てぁE��ぁE��
- [ ] タスクの依存関係が正しいぁE

### 記録方況E
- 仕様適合チェチE��の結果は`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
- 問題がある場合�E「❌ 問題あめE [具体的な持E��]」と記輁E
- 問題がなぁE��合�E「✅ 仕様適合チェチE��完亁E��と記輁E

---

## 5. セキュリチE��チェチE���E�EA/レビュー拁E��！E

### 実行タイミング
- **実裁E��亁E��、レビュー晁E*に忁E��実衁E
- 動作確認チェチE��と同時に実衁E

### チェチE��頁E��

#### 5.1 認証・認可の確誁E
- [ ] 認証なし�EAPIがなぁE��
- [ ] 適刁E��認証・認可が実裁E��れてぁE��ぁE
- [ ] RLS�E�Eow Level Security�E�が設定されてぁE��か！Eupabase使用時！E

#### 5.2 入力値バリチE�Eション
- [ ] 入力値のバリチE�Eションが実裁E��れてぁE��ぁE
- [ ] 不正な入力値が拒否されるか
- [ ] エラーメチE��ージが適刁E��

#### 5.3 XSS/SQLインジェクション対筁E
- [ ] XSS攻撁E��防げてぁE��か！Eeactの自動エスケープ！E
- [ ] SQLインジェクションを防げてぁE��か！Eupabaseクライアントライブラリ使用�E�E
- [ ] 危険な斁E���Eのサニタイズが実裁E��れてぁE��ぁE

#### 5.4 チE�Eタ保護
- [ ] 機寁E��ータが暗号化されてぁE��ぁE
- [ ] チE�Eタの送信がHTTPSで行われてぁE��ぁE
- [ ] ローカルストレージに機寁E��ータを保存してぁE��ぁE��

### 記録方況E
- セキュリチE��チェチE��の結果は`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録
- 問題がある場合�E「❌ 問題あめE [具体的な持E��]」と記輁E
- 問題がなぁE��合�E「✅ セキュリチE��チェチE��完亁E��と記輁E

---

## 自動化の篁E��

### 完�E自動化可能なチェチE��
以下�EチェチE��は、`auto-check-ui.bat`やCI/CDで完�Eに自動化可能�E�E

- **LintチェチE��**: `npm run lint`
- **TypeScript型チェチE��**: `npx tsc --noEmit`
- **PrettierフォーマッチE*: `npm run format:check`
- **ビルドチェチE��**: `npm run build`

### 半�E動化可能なチェチE��
以下�EチェチE��は、手動実行が忁E��だが、�E動化チE�Eルを使用可能�E�E

- **E2EチE��チE*: `npm test`�E�Elaywright�E�E
- **Visual Regression Test**: `npm run test:visual`

### 手動チェチE��が忁E��な頁E��
以下�EチェチE��は、Agentの判断が忁E��で、完�Eな自動化は困難�E�E

- **要件定義の妥当性**: PM/アーキチE��ト�E判断
- **動作確誁E*: ブラウザでの実際の操佁E
- **「�Eりぼて」チェチE��**: 実際の操作による検証
- **仕様適吁E*: ユーザー要求との照吁E
- **セキュリチE��**: 脁E��性の検�E�E�一部は自動化可能�E�E

---

## チェチE��頁E��の探索プロセス

### PM/アーキチE��ト�E責任

アプリとして忁E��な機�Eを探索し、チェチE��リストに追加する責任がある、E

#### 探索対象の機�EカチE��リ

1. **認証・セキュリチE��**
   - ログイン・ログアウチE
   - ユーザー登録
   - パスワードリセチE��
   - セチE��ョン管琁E
   - 認証状態�E確誁E

2. **チE�Eタ管琁E*
   - チE�Eタ保存！Eupabase/localStorage�E�E
   - チE�Eタ読み込み
   - チE�Eタ同期
   - チE�Eタエクスポ�EチEインポ�EチE
   - チE�Eタ削除

3. **サーバ�E・インフラ**
   - 開発サーバ�E起動！Enpm run dev`�E�E
   - ビルド！Enpm run build`�E�E
   - ポ�Eト番号の確誁E
   - 環墁E��数の設宁E

4. **画面・ナビゲーション**
   - 全画面の遷移
   - 戻る�Eタン
   - 下部ナビゲーション
   - 画面の表示�E�真っ黒でなぁE��E

5. **API・通信**
   - API呼び出し（モチE��ではなぁE��E
   - ネットワークエラーハンドリング
   - 通信遮断時�E処琁E

6. **エラーハンドリング**
   - エラーメチE��ージの表示
   - エラーログの記録
   - ユーザーフレンドリーなエラーメチE��ージ

#### 探索プロセス

1. **コード�Eースの網羁E��検索**
   - `src/screens/`冁E�E全画面をリストアチE�E�E�Elist_dir`を使用�E�E
   - `src/App.tsx`の`validScreens`を確誁E
   - 吁E��面の実裁E��況を確認！Ecodebase_search`を使用�E�E
   - 認証機�Eの確認！Egrep -r "auth\|login\|Auth" src/`�E�E
   - チE�Eタ保存機�Eの確認！Egrep -r "save\|Save\|storage\|Storage" src/utils/storage.ts`�E�E
   - サーバ�E起動�E確認！Egrep -r "npm run dev\|vite" package.json`�E�E

2. **リリース要件の確誁E*
   - `RELEASE_REQUIREMENTS.md`を参照し、忁E��機�Eを確誁E
   - 忁E��機�Eのリストを作�E
   - 吁E���Eが実裁E��れてぁE��か確誁E

3. **既存チェチE��リスト�E確誁E*
   - `RELEASE_CHECKLIST.md`を参照
   - `docs/BASIC_FEATURES_CHECKLIST.md`を参照�E�存在する場合！E
   - 既存�EチェチE��頁E��を確誁E
   - 不足してぁE��頁E��を特宁E

4. **基本機�Eの網羁E��リスト作�E**
   - アプリとして忁E��な基本機�Eのリストを作�E
   - 吁E���EのチェチE��頁E��を定義
   - チェチE��リストに追加

5. **チェチE��リストへの追加**
   - 不足頁E��をチェチE��リストに追加
   - 各Agentの拁E��篁E��を�E確匁E

#### 探索の自動化

**探索コマンド�E定義**:

```bash
# 全画面のリストアチE�E
grep -r "Screen" src/App.tsx | grep "import\|Lazy"

# 認証機�Eの確誁E
grep -r "auth\|login\|Auth" src/ | grep -v "node_modules"

# チE�Eタ保存機�Eの確誁E
grep -r "save\|Save\|storage\|Storage" src/utils/storage.ts

# サーバ�E起動�E確誁E
grep -r "npm run dev\|vite" package.json
```

#### 探索のタイミング

- **実裁E��始前**: 要件定義チェチE��時に探索�E�忁E��！E
- **定期皁E��見直ぁE*: リリース前、機�E追加時に見直ぁE
- **チェチE��リスト更新晁E*: 新しい機�Eが追加された際に探索

---

## Agent別チェチE��リスチE

### PM/アーキチE��ト用チェチE��リスチE
詳細は`.cursor/rules/pm_architect.mdc`の「要件定義チェチE��」セクションを参照、E

### 実裁E��ンジニア用チェチE��リスチE
詳細は`.cursor/rules/fullstack_engineer.mdc`の「チェチE��リスト（実裁E��亁E���E�」セクションを参照、E

**主要チェチE��頁E��**:
- [ ] LintチェチE��: `npm run lint`�E�エラー: 0件�E�E
- [ ] TypeScript型チェチE��: `npx tsc --noEmit`�E�型エラー: 0件�E�E
- [ ] PrettierフォーマッチE `npm run format:check`�E�フォーマットエラー: 0件�E�E
- [ ] 未使用コード�E削除
- [ ] エラーハンドリングの実裁E
- [ ] セキュリチE��ホ�Eルの確誁E

### QA/レビュー用チェチE��リスチE
詳細は`.cursor/rules/qa_reviewer.mdc`の「チェチE��リスト（レビュー時）」セクションを参照、E

---

## チェチE��結果の記録

### 記録場所
- `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ、E
- `docs/AGENT_LOG.md`�E�作業ログ�E�E

### 記録形弁E
```
[YYYY-MM-DD] [Agent名]: [チェチE��段階] 開姁E完亁E
[YYYY-MM-DD] [Agent名]: ✁E[チェチE��段階] 完亁E- [詳細]
[YYYY-MM-DD] [Agent名]: ❁E[チェチE��段階] 問題あめE- [具体的な持E��]
```

### 侁E
```
[2026-01-21] PM/アーキチE��チE 要件定義チェチE��開姁E
[2026-01-21] PM/アーキチE��チE ✁E要件定義チェチE��完亁E- 医学皁E��拠確認済み�E�Een Berry参�E�E�E
[2026-01-21] 実裁E��ンジニア: コード品質チェチE��完亁E- Lint: 0件、型エラー: 0件
[2026-01-21] QA/レビュー: ❁E動作確認チェチE�� 問題あめE- チE�Eタ保存�E琁E��未実裁E
```

---

## 関連ファイル

- `.cursor/rules/master_rule.mdc` - マスタールール�E�包括皁E��質保証プロトコルの定義�E�E
- `.cursor/rules/pm_architect.mdc` - PM/アーキチE��ト用ルール�E�要件定義チェチE���E�E
- `.cursor/rules/qa_reviewer.mdc` - QA/レビュー用ルール�E�動作�E仕様�EセキュリチE��チェチE���E�E
- `auto-check-ui.bat` - 自動チェチE��実行スクリプト
- `RELEASE_CHECKLIST.md` - リリース前チェチE��リスチE
- `docs/NEXT_TASKS_APP_DEV.md` - 次のタスク�E�アプリ開発チ�Eム�E�E

---

**最終更新**: 2026-01-21

