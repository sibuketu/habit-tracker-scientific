# CarnivOS - 改喁E��イチE��・要望

## 1. 写真解析機�Eの改喁E

### 1.1 フォローアチE�Eクエスチョン機�E
- **現状**: `analyzeFoodName`には`followupQuestions`があるが、`analyzeFoodImage`にはなぁE
- **要望**: 写真解析後、g数めE��E��素の調整をフォローアチE�Eクエスチョンで確誁E
- **実裁E��釁E*: 
  - `analyzeFoodImage`の戻り値に`followupQuestions`を追加
  - 解析結果表示後に、忁E��に応じてフォローアチE�E質問を表示
  - ユーザーが回答した�E容を�Eに、栁E��素めE��量を再計箁E

### 1.2 スキャン中のTips表示
- **現状**: 食品名解析時にはTipsが表示されるが、�E真解析時には表示されなぁE
- **要望**: 写真解析中にもTipsを表示して征E��時間を有効活用
- **実裁E��釁E*:
  - `analyzeFoodImage`実行中にTipsを表示
  - `CustomFoodScreen`や`ButcherSelect`の写真解析�E琁E��Tips表示を追加

### 1.3 スキャン速度の改喁E
- **現状**: 写真解析に時間がかかる
- **要望**: 解析速度を向上させたぁE
- **実裁E��釁E*:
  - 画像�Eリサイズ�E�解像度を下げる）でAPI呼び出しを高速化
  - キャチE��ュ機�Eの追加�E�同じ画像�E再解析を避ける�E�E
  - プログレスバ�Eの表示で体感速度を向丁E

## 2. バ�Eコード読み取りのスマ�E対忁E

### 2.1 問題点
- **現状**: スマ�Eで「このブラウザは対応してません Chrome or Safari」と表示されめE
- **原因**: `isBarcodeDetectorAvailable()`が`'BarcodeDetector' in window`だけをチェチE��してぁE��が、実際にはモバイルブラウザ�E�特にiOS Safari�E�では`BarcodeDetector` APIが利用できなぁE
- **実裁E��釁E*:
  - モバイルブラウザの検�Eを追加
  - iOS Safariの場合�E、代替手段�E�画像アチE�Eロード方式）を案�E
  - Android Chromeの場合�E、`BarcodeDetector` APIの実際の動作確認を追加
  - フォールバック: `@zxing/library`を使用した画像�Eースのバ�Eコード読み取り

## 3. フィードバチE��機�Eのご褒美シスチE��

### 3.1 アイチE��
- **要望**: バグ報告�E機�E提案へのご褒美（例：限定機�Eの先行開放�E�E
- **実裁E��E*:
  - フィードバチE��送信時に、ユーザーIDとフィードバチE��冁E��を記録
  - 有用なフィードバチE���E�バグ報告、機�E提案）を送ったユーザーに、E��定機�Eの先行開放
  - 例：コミュニティ機�Eの先行開放、新しい刁E��機�Eの先行開放など
  - フィードバチE��の有用性を評価するシスチE���E�EIによる評価、また�E手動評価�E�E

### 3.2 実裁E��る場合�E機�E候裁E
- コミュニティ機�Eの先行開放
- 新しい刁E��機�E�E�詳細な統計、グラフなど�E�E
- カスタムチE�Eマ機�E
- エクスポ�Eト機�Eの拡張�E�ESV、PDFなど�E�E

## 4. AI機�E説明�E形式改喁E

### 4.1 要望
- **現状**: AIが機�Eを説明する際の形式が統一されてぁE��ぁE
- **要望**: 
  - 機�Eごとに記号ナンバリング�E�E⃣、E⃣、E⃣など�E�E
  - 吁E���E冁E�E手頁E�E数字！E、E、E...�E�で番号付け
  - 例！E
    ```
    1⃣ 食品追加方況E
    1. ホ�Eム画面の、E 食品追加」をタチE�E
    2. 食品名を入力して「AI推測」をタチE�E
    3. 栁E��素を確認�E修正して「保存」をタチE�E
    ```

### 4.2 実裁E��釁E
- `chatWithAIStructured`のプロンプトに、機�E説明�E形式を追加
- 機�E説明を生�Eする際�EチE��プレートを作�E
- 記号ナンバリングと数字ナンバリングの使ぁE�Eけを明確匁E

## 5. そ�E他�E改喁E��望

### 5.1 パフォーマンス改喁E
- 写真解析�E速度向丁E
- バ�Eコード読み取りの速度向丁E
- 画面遷移の速度向丁E

### 5.2 UX改喁E
- スキャン中のTips表示
- フォローアチE�Eクエスチョンの改喁E
- エラーメチE��ージの改喁E


