# 栁E��ゲージ統合実裁E- ベスト�EラクチE��ス要件定義

**作�E日**: 2026-01-22  
**目皁E*: 全画面の栁E��ゲージ実裁E��ら良ぁE��素を抽出し、優先頁E��頁E��要件定義として整琁E��めE

---

## 1. 現状刁E���E�各画面の良ぁE��素

### 1.1 HomeScreenの良ぁE��素

#### 優先度: 最高（忁E��統合！E

1. **グループ化表示�E�視覚的階層�E�E*
   - 電解質: 青い背景�E�E#f0f9ff`�E�、E��ぁE�Eーダー�E�E#3b82f6`�E�、⚡アイコン
   - マクロ: 黁E��ぁE��景�E�E#fef3c7`�E�、オレンジボ�Eダー�E�E#f59e0b`�E�、🥩アイコン
   - そ�E仁E グレー背景�E�E#f3f4f6`�E�、グレーボ�Eダー�E�E#d1d5db`�E�、📊アイコン
   - **メリチE��**: 栁E��素の重要度が視覚的に刁E��りやすい

2. **Tier刁E��シスチE��**
   - Tier1: 電解質 + マクロ�E�常に表示�E�E
   - Tier2: そ�E他重要栁E��素�E�開閉式！E
   - Tier3: 詳細栁E��素�E�Eetailedモード�Eみ�E�E
   - **メリチE��**: 惁E��の優先頁E��が明確

3. **モード別タチE�E回数で全栁E��素を表示可能**
   - SimpleモーチE 0タチE�E�E�Eier1のみ表示�E�E
   - StandardモーチE 1タチE�E�E�Eier1表示、Tier2をタチE�Eで展開�E�E
   - DetailedモーチE 2タチE�E�E�Eier1表示、Tier2をタチE�Eで展開、Tier3をタチE�Eで展開�E�E
   - **全モード�E送E*: タチE�Eすれば最終的には全部見れめE
   - **メリチE��**: 画面がすっきりしつつ、詳細も見られる。モードによって操作が変わめE
   - **注愁E*: showAllNutrientsボタンは、このモード別タチE�E回数の仕絁E��の中で「�E栁E��素を一時的に表示する」�Eタンとして機�EしてぁE��

#### 優先度: 高（統合推奨�E�E

4. **UI表示用の栁E��素チE�Eタマッピング�E�EutrientDataMap�E�E*
   - `nutrientDataMap`で全栁E��素の表示名、単位、計算式等を一箁E��で管琁E
   - 計算式や特殊�E琁E��EmegaRatio等）を一箁E��に雁E��E
   - **メリチE��**: メンチE��ンスが容易、コードが整琁E��れてぁE��
   - **注愁E*: これはゲージ�E�EI�E��E話で、データベ�Eスの話ではなぁE

### 1.2 HistoryScreenの良ぁE��素

#### 優先度: 最高（忁E��統合！E

1. **平坁E��計算ロジチE��**
   - `filteredLogs.reduce()`で褁E��日の平坁E��計箁E
   - **メリチE��**: 長期的な傾向を把握可能
   - **注愁E*: これはフロントエンド�E計算ロジチE��の話で、バチE��エンド�EチE�Eタベ�Eスの話ではなぁE

#### 優先度: 中�E�EistoryScreen専用�E�E

2. **日別展開表示**
   - 吁E��グを展開すると栁E��ゲージが表示されめE
   - **メリチE��**: 詳細確認が忁E��な時に便利
   - **適用**: HistoryScreenのみ

### 1.3 RecipeScreenの良ぁE��素

#### 優先度: 高（統合推奨�E�E

1. **nutrientGauges配�E管琁E*
   - 栁E��素ゲージの設定を配�Eで管琁E
   - Tier1/Tier2の刁E��を配�Eで定義
   - **メリチE��**: コードが整琁E��れてぁE��、追加・削除が容昁E
   - **注愁E*: 現在のシスチE��ではTier3まで存在するが、RecipeScreenではTier2までしか使ってぁE��ぁE��これ�E矛盾ではなく、RecipeScreenの実裁E��Tier2までしか対応してぁE��ぁE��ぁE

### 1.4 PhotoAnalysisModalの良ぁE��素

#### 優先度: 高（統合推奨�E�E

1. **previewAmountサポ�EチE* - 唯一の良ぁE��ころ
   - 写真解析結果を�Eレビューとして表示
   - 追加前に影響を確認可能
   - **メリチE��**: 食品追加前に栁E��素への影響を確認できる。無駁E��追加を防げる

### 1.5 CustomFoodScreenの良ぁE��素

#### 優先度: 中�E�検討！E

1. **詳細栁E��素入力機�E**
   - 多くの栁E��素を�E力可能
   - **メリチE��**: 詳細な惁E��入力が可能
   - **注愁E*: HomeScreenのDetailedモード�E表示のみだが、CustomFoodScreenは入力画面で全栁E��素を�E力可能にする機�E。異なる機�E

#### 優先度: 低（問題点�E�E

2. **100g固定target**
   - **問顁E*: 動的targetに変更すべぁE
   - **琁E��**: 他�E画面と一貫性がなぁE��個人最適化されなぁE

---

## 2. 統合要件定義�E�優先頁E��頁E��E

### 2.1 忁E��要素�E�最高優先度�E�E

#### 1. ユーザー設定に応じた栁E��素の表示刁E��替え（モード別タチE�E回数で全栁E��素を表示可能�E�E
- **冁E��**: ユーザーが設定した表示モード（シンプル/標溁E詳細�E�に応じて、表示する栁E��素を�E動的に刁E��替える。�EモードでタチE�Eすれば最終的には全部見れめE
  - **シンプルモーチE*: 0タチE�E�E�Eier1のみ表示�E�E
  - **標準モーチE*: 1タチE�E�E�Eier1表示、Tier2をタチE�Eで展開�E�E
  - **詳細モーチE*: 2タチE�E�E�Eier1表示、Tier2をタチE�Eで展開、Tier3をタチE�Eで展開�E�E
- **実裁E�E**: HomeScreen
- **琁E��**: ユーザーの好みめE��皁E��応じて、見たぁE��報だけを表示できる。�E忁E��E��はシンプルに、データ重視ユーザーには詳細に表示できる。�EモードでタチE�Eすれば最終的には全部見れる�Eで、忁E��に応じて詳細も確認できる
- **適用画面**: 全画面

#### 2. 個人に最適化された目標値の自動計箁E
- **冁E��**: ユーザーのプロファイル�E�体重、活動量、性別等）に基づぁE��、各栁E��素の目標値を�E動的に計算する、E00g固定などの固定値は使わなぁE
- **実裁E�E**: HomeScreen, HistoryScreen, RecipeScreen, PhotoAnalysisModal�E�褁E��画面で実裁E��み�E�E
- **琁E��**: 体重70kgの人と100kgの人では忁E��なタンパク質が違ぁE��個人の状況に合わせた目標値で、より正確な栁E��管琁E��できる
- **適用画面**: 全画面�E�EustomFoodScreenの100g固定も個人最適化された目標値に変更�E�E

#### 3. 栁E��素の重要度による3段階�E顁E
- **冁E��**: 栁E��素を重要度に応じて3段階に刁E��し、優先頁E��を明確にする
  - **第1段階（最重要E��E*: 電解質�E�ナトリウム、カリウム、�Eグネシウム�E�とマクロ栁E��素�E�脂質、タンパク質�E�E 常に表示
  - **第2段階（重要E��E*: 重要なミネラル・ビタミン�E�鉄、亜鉛、ビタミンD、ビタミンA等！E 標準モード以上で表示
  - **第3段階（詳細�E�E*: そ�E他�E栁E��素�E�詳細モード�Eみで表示�E�E
- **実裁E�E**: HomeScreen
- **琁E��**: カーニ�Eア実践老E��とって最も重要な栁E��素を最初に見せ、情報の優先頁E��が一目で刁E��めE
- **適用画面**: 全画面

#### 4. 栁E��素の種類ごとのグループ化表示
- **冁E��**: 栁E��素を種類ごとにグループ化して表示し、視覚的に刁E��りやすくする
  - **電解質グルーチE*: 青い背景とボ�Eダー、⚡アイコンで表示
  - **マクロ栁E��素グルーチE*: 黁E��ぁE��景とボ�Eダー、🥩アイコンで表示
  - **そ�E他グルーチE*: グレー背景とボ�Eダー、📊アイコンで表示
- **実裁E�E**: HomeScreen
- **琁E��**: 栁E��素の種類が視覚的に刁E��りやすく、E��要度が一目で琁E��できる
- **適用画面**: HomeScreen, HistoryScreen, RecipeScreen�E�EustomFoodScreenとPhotoAnalysisModalは検討！E

### 2.2 推奨要素�E�高優先度�E�E

#### 5. 食品追加前�E栁E��素影響プレビュー�E�EhotoAnalysisModalの唯一の良ぁE��ころ�E�E
- **冁E��**: 食品を追加する前に、その食品を追加した場合�E栁E��素への影響を�Eレビュー表示する
- **実裁E�E**: PhotoAnalysisModal�E�唯一の良ぁE��ころ�E�E
- **琁E��**: 「この食品を追加すると、タンパク質が目標値に届くか」などを追加前に確認できる。無駁E��追加を防げる
- **適用画面**: HomeScreen, PhotoAnalysisModal�E�他�E画面は検討！E

#### 6. UI表示用の栁E��素チE�Eタマッピング�E�EutrientDataMap�E�E
- **冁E��**: 全栁E��素のチE�Eタ�E�表示名、単位、計算式等）を一箁E��で管琁E��めE
- **実裁E�E**: HomeScreen
- **琁E��**: 栁E��素の追加めE��正が一箁E��で済み、メンチE��ンスが容易。計算式や特殊�E琁E��オメガ比率等）も一箁E��に雁E��E��きる
- **注愁E*: これはゲージ�E�EI�E��E話で、データベ�Eスの話ではなぁE
- **適用画面**: 全画面�E��E通化を検討！E

#### 7. 褁E��日の平坁E��計算！EistoryScreen専用�E�E
- **冁E��**: 履歴画面で、E��択した期間�E栁E��素の平坁E��を計算して表示する
- **実裁E�E**: HistoryScreen
- **琁E��**: 「この1週間で平坁E��にタンパク質は足りてぁE��か」など、E��期的な傾向を把握できる
- **注愁E*: これはフロントエンド�E計算ロジチE��の話で、バチE��エンド�EチE�Eタベ�Eスの話ではなぁE
- **適用画面**: HistoryScreenのみ

### 2.3 検討要素�E�中優先度�E�E

#### 8. 日別ログの展開表示�E�EistoryScreen専用�E�E
- **冁E��**: 履歴画面で、各日のログを展開すると、その日の栁E��ゲージが表示されめE
- **実裁E�E**: HistoryScreen
- **琁E��**: 特定�E日の詳細な栁E��素惁E��を確認したい時に便利
- **適用画面**: HistoryScreenのみ

### 2.4 問題点の修正

#### 9. CustomFoodScreenの目標値を個人最適化に変更
- **冁E��**: カスタム食品画面で、栁E��素の目標値ぁE00g固定になってぁE��のを、個人のプロファイルに基づぁE��目標値に変更する
- **琁E��**: 他�E画面では個人最適化された目標値を使ってぁE��のに、この画面だぁE00g固定では一貫性がなぁE��また、体重めE��動量に応じた目標値の方が正確
- **注愁E*: 入力画面は、E00gあたり」�E表示のまま�E��E力�E単位�E変更しなぁE��。ゲージの目標値だけを個人最適化された値に変更する

---

## 3. 比輁E��忁E��な要素�E�どちらを採用するか�E2択！E

### 3.1 栁E��素ゲージの管琁E��況E

**比輁E��象**: HomeScreen�E�EutrientDataMap�E�Evs RecipeScreen�E�EutrientGauges配�E�E�E

**HomeScreen方式！EutrientDataMap�E�E*:
- `nutrientDataMap`で全栁E��素の表示名、単位、計算式等を一箁E��で管琁E
- 計算式や特殊�E琁E��EmegaRatio等）を一箁E��に雁E��E

**RecipeScreen方式！EutrientGauges配�E�E�E*:
- 栁E��素ゲージの設定を配�Eで管琁E
- Tier1/Tier2の刁E��を配�Eで定義

**比輁E��果**:
- **HomeScreen方弁E*: 計算式や特殊�E琁E��含めて一允E��琁E��メンチE��ンスが容昁E
- **RecipeScreen方弁E*: 配�Eで管琁E��追加・削除が容易、コードが整琁E��れてぁE��

**採用判断**: どちらを採用するか！E
- [ ] HomeScreen方式！EutrientDataMap�E�を全画面に適用
- [ ] RecipeScreen方式！EutrientGauges配�E�E�を全画面に適用
- [ ] 両方を統合！EutrientDataMap + 配�E管琁E��E

---

## 4. 統合実裁E�E設計方釁E

### 4.1 基準実裁E�E選宁E

**HomeScreenを基準実裁E��する**

**琁E��**:
1. 最も多くの良ぁE��素を含んでぁE��
2. グループ化表示、モード別タチE�E回数、showAllNutrients等�E高度な機�EがあめE
3. Tier刁E��シスチE��完�E対忁E
4. 動的target取征E
5. previewAmountサポ�EチE
6. UI表示用の栁E��素チE�Eタマッピング�E�EutrientDataMap�E�E

### 4.2 吁E��面への適用方釁E

#### HomeScreen
- 現状の実裁E��改喁E�E統吁E
- 全要素を含む完璧な実裁E��作�E

#### HistoryScreen
- HomeScreenの実裁E��コピ�E
- 平坁E��計算ロジチE��を追加
- 日別展開表示は維持E��EistoryScreen専用�E�E

#### RecipeScreen
- HomeScreenの実裁E��コピ�E
- レシピ�E栁E��素計算に合わせて調整
- Tier刁E���ETier3まで対応（現在のTier2のみから拡張�E�E

#### CustomFoodScreen
- HomeScreenの実裁E��コピ�E
- 100g固定を動的targetに変更
- 入力画面の特性を老E�E�E�グループ化表示は検討！E

#### PhotoAnalysisModal
- HomeScreenの実裁E��コピ�E
- previewAmountを活用
- モーダルの特性を老E�E�E�グループ化表示は検討！E

---

## 5. 実裁E��E��（優先度頁E��E

1. **HomeScreenに統合実裁E��作�E**�E��E要素を含む完璧な実裁E��E
2. **CustomFoodScreenの100g固定を動的targetに変更**
3. **HistoryScreenにHomeScreenの実裁E��適用**
4. **RecipeScreenにHomeScreenの実裁E��適用**
5. **CustomFoodScreenにHomeScreenの実裁E��適用**
6. **PhotoAnalysisModalにHomeScreenの実裁E��適用**

---

## 6. 完亁E��件

- [ ] HomeScreenに統合実裁E��作�E�E��E要素を含む�E�E
- [ ] CustomFoodScreenの100g固定を動的targetに変更
- [ ] 全画面でモード別タチE�E回数が正しく動作する！Eimple: 0タチE�E、Standard: 1タチE�E、Detailed: 2タチE�E�E�E
- [ ] 全画面で計算ロジチE��が一致してぁE��
- [ ] 全画面で色が統一されてぁE��
- [ ] 全画面で目標値が統一されてぁE���E�動的target�E�E
- [ ] 全画面でTier刁E��が統一されてぁE���E�Eier3まで対応！E
- [ ] HomeScreen, HistoryScreen, RecipeScreenでグループ化表示が統一されてぁE��
- [ ] 栁E��素ゲージの管琁E��法�E採用判断が完亁E��てぁE��

---

**使用したRules**: #0, #1, #2, #5.5.1, #6, #8, #10

