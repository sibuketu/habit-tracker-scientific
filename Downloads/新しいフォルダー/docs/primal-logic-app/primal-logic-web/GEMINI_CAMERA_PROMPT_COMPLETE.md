# Geminiへの要件定義プロンプト�E�カメラ機�E統合（完�E版！E

> 作�E日: 2025-01-27
> 目皁E Geminiと要件定義を行い、カメラ機�E�E��E真から追加・バ�Eコード読み取り・アルバム選択）�E最適な実裁E��法を決定すめE
> **重要E*: こ�Eアプリのことを�Eく知らなぁE��提で、包括皁E��惁E��を提供すめE

---

## 📱 プロジェクト概要E

### アプリ吁E
**CarnivOS**�E�別吁E Carnivore Compass�E�E

### アプリの目皁E
**世界一のカーニ�EアダイエチE��管琁E��プリを目持E��**

カーニ�EアダイエチE���E�肉・魚�E卵・冁E��のみを食べる食事法）を実践する人、E��サポ�Eトする専門アプリ。一般皁E��健康管琁E��プリとは異なり、E*進化的適合性**と**生化学**を重視し、疫学皁E��E��ガイドラインを優先しなぁE��E

### ミッション
現代の栁E��情報の「ノイズ」に対する「盾�E�Ehield�E�」として機�Eし、論理皁E��自己防衛�E「武器�E�Eeapon�E�」を提供する、E

### ターゲチE��ユーザー
- カーニ�EアダイエチE��実践老E�E興味がある人
- 性別・年齢・健康状態を問わず、�Eてのカーニ�Eア実践老E��対忁E
- 女性特有�E条件�E�妊娠、授乳、E��経、PMS、PCOS等）も完�Eに対忁E
- 健康状態が様、E��人に対応するため、疾患・痁E��・血液検査値も幁E��E��対忁E

### アプリの特徴
1. **動的目標値**: ユーザーの状態に応じた栁E��素目標値の自動調整�E�E00頁E��以上�Eプロファイル設定！E
2. **バイオアベイラビリチE��ロジチE��**: 植物性栁E��素はペナルチE��、動物性栁E��素は優允E
3. **メンタル安�E性**: 厳格なカロリー計算ではなく、「不安�EなぁE��追跡と「リカバリープロトコル」に焦点
4. **4ゾーングラチE�Eションゲージ**: 栁E��素の状態を直感的に可視化�E�Eed/Orange/Green/Purple�E�E

---

## 🛠�E�E技術スタチE��

### フロントエンチE
- **フレームワーク**: React + Vite
- **言誁E*: TypeScript�E�Etrict mode�E�E
- **スタイリング**: Tailwind CSS
- **アイコン**: Lucide React
- **状態管琁E*: React Context API
- **ストレージ**: localStorage�E�オフライン対応！E

### プラチE��フォーム
- **PWA�E�Erogressive Web App�E�E*: ネイチE��ブアプリではなぁE��め、ブラウザAPIの制限がある
- **モバイルファースチE*: スマ�E�E�EPhone 15幁E��で完璧に見えるレイアウトを最優允E
- **iOS匁E*: Capacitor�E�封E��皁E��iOSアプリ化可能�E�E

### 外部API
- **Gemini API**: AIチャチE��、�E真解析！EanalyzeFoodImage`関数�E�E
- **Supabase**: クラウドバチE��アチE�E�E�オプション�E�E
- **Browser Notification API**: 通知機�E

### 既存�Eカメラ関連実裁E
- **写真解极E*: [`src/services/aiService.ts`](primal-logic-app/primal-logic-web/src/services/aiService.ts) - `analyzeFoodImage`関数
- **バ�Eコード読み取り**: [`src/utils/barcodeScanner.ts`](primal-logic-app/primal-logic-web/src/utils/barcodeScanner.ts) - `scanBarcodeFromCamera`関数、`BarcodeDetector API`使用
- **バ�Eコードスキャナ�Eモーダル**: [`src/components/BarcodeScannerModal.tsx`](primal-logic-app/primal-logic-web/src/components/BarcodeScannerModal.tsx)
- **写真解析モーダル**: [`src/components/PhotoAnalysisModal.tsx`](primal-logic-app/primal-logic-web/src/components/PhotoAnalysisModal.tsx)

---

## 🎨 チE��イン原則

### スチE��ーブ�Eジョブズ風ミニマルチE��イン
- **余計な裁E��を削ぎ落とぁE*: 機�Eと美しさ�Eバランスを重要E
- **間隔は最小限**: `gap: 0`、`padding: 0.5rem`以丁E
- **余白は忁E��最小限**: 統一性と一貫性を最優允E
- **色は抑制皁E��**: Apple製品�Eような「見えなぁE��ザイン」を目持E��
- **フォントサイズ**: 読みめE��さを保ちつつ控えめに

### UI/UXルール
- **モバイルファースチE*: スマ�E�E�EPhone 15幁E��で完璧に見えるレイアウトを最優允E
- **タチE��フレンドリー**: すべてのボタンめE�E力要素は、指で押しやすいサイズ�E�E4px以上）を確俁E
- **統一性**: 栁E��ゲージのUI�E�背景色、枠線、E��隔、ゲージバ�Eの高さ、色ロジチE��など�E��E、アプリ全体で一貫したチE��インを保つ

### 現在のボタン仕様（カメラ機�E�E�E
- **サイズ**: 44px ÁE44px
- **アイコン**: 📷�E�絵斁E��！E
- **背景色**: `#f3f4f6`�E�グレー�E�E
- **ホバー**: `#e5e7eb`�E�薄ぁE��レー�E�E
- **位置**: ホ�Eム画面の食品追加ボタンエリア
- **ファイル**: [`src/screens/HomeScreen.tsx`](primal-logic-app/primal-logic-web/src/screens/HomeScreen.tsx) (917-1008行目)

---

## 📋 既存�E決定事頁E

### カメラ機�Eの意図と目皁E
**食品記録の手間を削減し、ユーザーの継続的な使用を俁E��する**

詳細は [`FEATURE_INTENTS.md`](primal-logic-app/primal-logic-web/FEATURE_INTENTS.md) を参照、E

### 実裁E��釁E
- **統吁EI**: 1つのボタンで褁E��の機�Eを提供！EIがシンプルになる！E
- **健康管琁E��プリのパターンを参老E*: MyFitnessPal、Lifesum、Noomなどのパターンを参老E
- **カメラ1つで褁E��の機�Eを提侁E*: UIがシンプルになめE

### 既存�E実裁E��況E
- **場所**: [`src/screens/HomeScreen.tsx`](primal-logic-app/primal-logic-web/src/screens/HomeScreen.tsx) (917-1008行目)
- **実裁E��況E*: `window.confirm`で「�E真から追加」か「バーコード読み取り」かを選抁E
- **問題点**: 
  - UXが悪ぁE��確認ダイアログは非推奨�E�E
  - モバイルで使ぁE��くい
  - 他アプリのベスト�EラクチE��スに沿ってぁE��ぁE
  - **アルバムから写真を選ぶ機�EがなぁE*

### 現在のコード（抜粋！E
```typescript
// HomeScreen.tsx (917-1008行目)
<button
  onClick={async () => {
    const action = window.confirm('写真から追加しますか�E�\n\n「OK、E 写真から追加\n「キャンセル、E バ�Eコード読み取り');
    
    if (action) {
      // 写真から追加
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.capture = 'environment'; // カメラのみ�E�アルバム選択不可�E�E
      // ... 写真解析�E琁E
    } else {
      // バ�Eコード読み取り
      setShowBarcodeScanner(true);
    }
  }}
>
  📷
</button>
```

---

## 🔍 他アプリのパターン調査

### 健康管琁E��プリ

#### MyFitnessPal
- **パターン**: 写真とバ�Eコードを別ボタンに刁E��てぁE��
- **写真ボタン**: カメラ起勁EↁE写真撮影 ↁEAI解极E
- **バ�Eコード�Eタン**: カメラ起勁EↁEバ�Eコード検�E ↁE啁E��惁E��取征E
- **アルバム**: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能

#### Lifesum
- **パターン**: 1つのボタンで、カメラ起動後にモード選抁E
- **アクションシート！EOS�E�E ボトムシート！Endroid�E�E*: 「カメラで撮影」「アルバムから選択」「バーコード読み取り」を選抁E
- **UX**: モバイルで使ぁE��すい選択UI

#### Noom
- **パターン**: 写真とバ�Eコードを統吁E
- **カメラ起動征E*: 自動的にバ�Eコードを検�Eし、なければ写真として処琁E
- **アルバム**: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能

### ショチE��ングアプリ

#### Amazon
- **パターン**: カメラ起勁EↁEバ�Eコード検�Eを優允EↁE検�Eできなければ写真として処琁E
- **アルバム**: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能

#### 楽天
- **パターン**: 1つのボタンで、カメラ起動後にモード選択（アクションシート！E
- **選択肢**: 「カメラで撮影」「アルバムから選択」「バーコード読み取り、E

### カメラアプリ

#### Google Lens
- **パターン**: カメラ起勁EↁE自動的にバ�EコーチEチE��スチE画像を検�E ↁE適刁E��処琁E��実衁E
- **アルバム**: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能

#### Microsoft Lens
- **パターン**: 同様�E自動検�E機�E
- **アルバム**: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能

### ベスト�EラクチE��ス
1. **アクションシーチEボトムシーチE*: モバイルで使ぁE��すい選択UI
2. **自動検�E**: バ�Eコードを自動検�Eし、なければ写真として処琁E
3. **統吁EI**: 1つのボタンで褁E��の機�Eを提供！EIがシンプル�E�E
4. **アルバム選抁E*: 写真ボタンから、カメラ撮影かアルバム選択かを選択可能�E�忁E��機�E�E�E

---

## 💡 実裁E��法�E選択肢

### 選択肢A: アクションシーチEボトムシート（推奨候裁E�E�E
- **方況E*: ボタンタチE�E後、アクションシートで「カメラで撮影」「アルバムから選択」「バーコード読み取り」を選抁E
- **メリチE��**: 
  - モバイルで使ぁE��すい
  - 明確な選抁E
  - アルバム選択も含められる
- **チE��リチE��**: 1回�EタチE�Eが増えめE

### 選択肢B: 自動検�E + アクションシート（推奨候裁E�E�E
- **方況E*: カメラ起動後、�E動的にバ�Eコードを検�E。検�Eできればバ�Eコード�E琁E��できなければアクションシートで「�E真として処琁E��「アルバムから選択」を選抁E
- **メリチE��**: 
  - ユーザーの操作が少なぁE��バーコード検�E時！E
  - スムーズな体騁E
  - アルバム選択も含められる
- **チE��リチE��**: バ�Eコード検�Eの精度に依孁E

### 選択肢C: カメラ起動後�Eモード選抁E
- **方況E*: カメラ起動後、画面上に「�E真」「アルバム」「バーコード」�Eタンを表示
- **メリチE��**: 視覚的に刁E��りやすい
- **チE��リチE��**: UIが褁E��になる、カメラ起動が忁E��E

### 選択肢D: 別ボタンに刁E��めE
- **方況E*: 写真ボタンとバ�Eコード�Eタンを別、E��配置
- **メリチE��**: 明確、他アプリ�E�EyFitnessPal�E��Eパターン
- **チE��リチE��**: UIが褁E��になる、�Eタンが増えめE

### 選択肢E: 3つのボタンに刁E��めE
- **方況E*: 「カメラで撮影」「アルバムから選択」「バーコード読み取り」を3つのボタンに刁E��めE
- **メリチE��**: 最も�E確
- **チE��リチE��**: UIが最も褁E��になる、�EタンぁEつになめE

---

## 🔧 技術的な実裁E��件

### 現在の技術スタチE��
- **写真解极E*: Gemini API�E�E`src/services/aiService.ts`](primal-logic-app/primal-logic-web/src/services/aiService.ts) - `analyzeFoodImage`関数�E�E
- **バ�Eコード読み取り**: [`src/utils/barcodeScanner.ts`](primal-logic-app/primal-logic-web/src/utils/barcodeScanner.ts) - `scanBarcodeFromCamera`関数、`BarcodeDetector API`使用
- **カメラ起勁E*: HTML5 `<input type="file" accept="image/*" capture="environment">`�E�現在は`capture="environment"`でカメラのみ�E�E

### アルバム選択�E実裁E
- **HTML5 File API**: `<input type="file" accept="image/*">`�E�Ecapture`属性なしでアルバム選択可能�E�E
- **モバイルブラウザ**: iOS Safari、Chrome Mobileでの動作を保証

### アクションシーチEボトムシート�E実裁E
- **PWAの制紁E*: ネイチE��ブアプリではなぁE��め、ブラウザAPIの制限がある
- **実裁E��況E*: カスタムコンポ�Eネント�E作�Eが忁E��E
- **ライブラリ**: Headless UI、Radix UIなどの利用も検討可能

### バ�Eコード�E動検�Eの実裁E
- **Web BarcodeDetector API**: Chrome/Edge対応、iOS Safariでは利用不可
- **フォールバック**: `@zxing/library`などのライブラリ
- **パフォーマンス**: リアルタイム検�Eが忁E��E

---

## 🎯 機�E要件

### 忁E��機�E
1. **カメラで撮影**: カメラを起動して写真を撮影し、AIで解极E
2. **アルバムから選抁E*: 既存�E写真をアルバムから選択し、AIで解极E
3. **バ�Eコード読み取り**: バ�Eコードをスキャンして啁E��惁E��を取征E

### オプション機�E
1. **自動検�E**: カメラ起動後、�E動的にバ�Eコードを検�E
2. **褁E��写真選抁E*: アルバムから褁E��の写真を選択（封E��皁E���E�E

---

## 🚫 制紁E��件

### 技術的制紁E
- **PWA**: ネイチE��ブアプリではなぁE��め、ブラウザAPIの制限がある
- **モバイルブラウザ**: iOS Safari、Chrome Mobileでの動作を保証
- **カメラ権陁E*: ブラウザのカメラ権限が忁E��E
- **アルバムアクセス**: ブラウザのファイルアクセス権限が忁E��E

### UI制紁E
- **ボタンサイズ**: 44px ÁE44px�E�タチE��フレンドリー�E�E
- **チE��イン**: スチE��ーブ�Eジョブズ風ミニマルチE��イン
- **モバイルファースチE*: スマ�Eで完璧に動佁E

### パフォーマンス制紁E
- **写真解极E*: Gemini APIのレスポンス時間�E�数秒！E
- **バ�Eコード検�E**: リアルタイム検�Eが忁E��E

---

## 🤁E整合性チェチE��と推諁E

### 既存機�Eとの整合性
1. **AI機�E**: 写真解析�E既にGemini APIを使用�E�E`src/services/aiService.ts`](primal-logic-app/primal-logic-web/src/services/aiService.ts)�E�E
2. **バ�Eコード機�E**: 既に`BarcodeDetector API`を使用�E�E`src/utils/barcodeScanner.ts`](primal-logic-app/primal-logic-web/src/utils/barcodeScanner.ts)�E�E
3. **UI統一性**: 他�E食品追加ボタン�E�「食品追加」「いつも�E」「履歴」）と統一性を保つ忁E��がある

### チE��イン原則との整合性
1. **ミニマルチE��イン**: アクションシーチEボトムシート�E、UIをシンプルに保つ
2. **モバイルファースチE*: アクションシーチEボトムシート�E、モバイルで使ぁE��すい
3. **タチE��フレンドリー**: すべての選択肢は44px以上�EタチE��ターゲチE��を確俁E

### ユーザー体験�E推諁E
1. **操作�E流れ**: ボタンタチE�E ↁE選抁EↁE実衁EↁE結果表示
2. **エラーハンドリング**: カメラ権限が拒否された場合、アルバム選択にフォールバック
3. **ローチE��ング表示**: 写真解析中はローチE��ング表示�E�既存実裁E��参老E��E

---

## ❁EGeminiへの質啁E

1. **実裁E��法�E推奨**: 上記�E選択肢A-EのぁE��、どれが最適か？理由は�E�E
   - 既存�EチE��イン原則�E�スチE��ーブ�Eジョブズ風ミニマルチE��イン�E�との整合性
   - モバイルファースト�E観点
   - ユーザー体験�E最適匁E

2. **アルバム選択�E実裁E*: アルバムから写真を選ぶ機�Eを実裁E��る場合、どのような方法が最適か！E
   - HTML5 File APIの`capture`属性なしでの実裁E
   - モバイルブラウザ�E�EOS Safari、Chrome Mobile�E�での動作確誁E
   - 既存�E写真解析機�Eとの統吁E

3. **アクションシーチEボトムシート�E実裁E*: PWAでアクションシーチEボトムシートを実裁E��る場合、どのような方法が最適か！E
   - カスタムコンポ�Eネント�E作�E
   - ライブラリの利用�E�Eeadless UI、Radix UIなど�E�E
   - モバイルブラウザでの動作確誁E
   - 既存�EチE��イン原則との整合性

4. **自動検�Eの実裁E*: バ�Eコード�E自動検�Eを実裁E��る場合、どのような技術を使ぁE��きか�E�E
   - Web API�E�EarcodeDetector API�E��E利用可否
   - ライブラリの推奨�E�EuaggaJS、ZXingなど�E�E
   - パフォーマンスの最適化方況E
   - iOS Safariでの動作！EarcodeDetector APIは利用不可�E�E

5. **UXの最適匁E*: ユーザー体験を最適化するために、どのような工夫ができるか！E
   - ローチE��ング表示の改喁E
   - エラーハンドリングの強匁E
   - フィードバチE��の提侁E
   - 操作�E流れの最適匁E

6. **他アプリのパターン**: 他アプリ�E�EyFitnessPal、Lifesum、Noomなど�E��Eパターンを参老E��、さらに改喁E��きる点はあるか！E
   - 既存�E決定事頁E��の整合性
   - チE��イン原則との整合性
   - ユーザー体験�E最適匁E

7. **実裁E�E優先頁E��E*: 実裁E�E優先頁E���EどぁE��べきか�E�E
   - Phase 1: アクションシーチEボトムシート�E実裁E��アルバム選択を含む�E�E
   - Phase 2: 自動検�E機�Eの追加
   - Phase 3: UXの最適匁E

8. **整合性チェチE��**: 既存�E決定事頁E��デザイン原則、技術スタチE��との整合性をチェチE��し、推奨実裁E��法を提示してください、E

---

## 📤 期征E��る�E劁E

1. **推奨実裁E��況E*: 選択肢A-EのぁE��、どれを選ぶべきか、理由とともに
2. **技術的な実裁E��況E*: 具体的なコード例やライブラリの推奨
3. **UI/UX設訁E*: アクションシーチEボトムシート�EチE��イン桁E
4. **アルバム選択�E実裁E*: アルバムから写真を選ぶ機�Eの実裁E��況E
5. **実裁E�E優先頁E��E*: Phase 1-3の具体的な実裁E�E容
6. **他アプリとの比輁E*: 他アプリのパターンを参老E��した改喁E��E
7. **整合性チェチE��**: 既存�E決定事頁E��デザイン原則、技術スタチE��との整合性チェチE��結果
8. **推諁E*: ユーザー体験、パフォーマンス、保守性などの観点からの推諁E

---

## 📚 補足惁E��

### 関連ファイル
- [`src/screens/HomeScreen.tsx`](primal-logic-app/primal-logic-web/src/screens/HomeScreen.tsx): 現在の実裁E��E17-1008行目�E�E
- [`src/components/BarcodeScannerModal.tsx`](primal-logic-app/primal-logic-web/src/components/BarcodeScannerModal.tsx): バ�Eコード読み取りコンポ�EネンチE
- [`src/components/PhotoAnalysisModal.tsx`](primal-logic-app/primal-logic-web/src/components/PhotoAnalysisModal.tsx): 写真解析コンポ�EネンチE
- [`src/utils/barcodeScanner.ts`](primal-logic-app/primal-logic-web/src/utils/barcodeScanner.ts): バ�Eコード読み取りユーチE��リチE��
- [`src/services/aiService.ts`](primal-logic-app/primal-logic-web/src/services/aiService.ts): AIサービス�E��E真解析！E
- [`FEATURE_INTENTS.md`](primal-logic-app/primal-logic-web/FEATURE_INTENTS.md): 機�Eの意図と目皁E
- [`README.md`](primal-logic-app/primal-logic-web/README.md): プロジェクト概要E

### 参老E��E��
- [Web BarcodeDetector API](https://developer.mozilla.org/en-US/docs/Web/API/BarcodeDetector)
- [QuaggaJS - Barcode Scanner](https://github.com/serratus/quaggaJS)
- [ZXing - Multi-format 1D/2D barcode image processing library](https://github.com/zxing/zxing)
- [HTML5 File API](https://developer.mozilla.org/en-US/docs/Web/API/File_API)

---

## 🎯 プロンプト送信時�E注愁E

こ�EプロンプトをGeminiに送る際�E、以下を追加�E�E
- 「余計なくらぁE��報を送りたい」とぁE��要望
- アイチE��創造56技法を使った検討を希望
- 褁E��の選択肢を提示し、推奨頁E��上から並べめE
- 技術的な実裁E��法も具体的に提示する
- **整合性チェチE��と推論を忁E��行う**

---

**重要E*: こ�Eプロンプトは、アプリのことを�Eく知らなぁE��提で作�EされてぁE��す。包括皁E��惁E��を提供し、整合性チェチE��と推論を行ってください、E


