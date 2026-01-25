# Geminiに送るプロンプト�E�コピ�E用�E�E

以下�EプロンプトをGeminiに送信してください�E�E

---

# カメラ機�E統合�E要件定義依頼

## プロジェクト概要E

**CarnivOS** - 世界一のカーニ�EアダイエチE��管琁E��プリ�E�EWA、React + TypeScript�E�E

現在、カメラ機�E�E��E真から追加・バ�Eコード読み取り�E�を1つのボタンに統合したいと老E��てぁE��す。他アプリのパターンを調査し、最適な実裁E��法を決定したいです、E

## 現在の実裁E��況E

### 問題点
- `window.confirm`で「�E真から追加」か「バーコード読み取り」かを選択！EXが悪ぁE��E
- モバイルで使ぁE��くい
- 他アプリのベスト�EラクチE��スに沿ってぁE��ぁE

### 現在のコーチE
```typescript
// HomeScreen.tsx
<button onClick={async () => {
  const action = window.confirm('写真から追加しますか�E�\n\n「OK、E 写真から追加\n「キャンセル、E バ�Eコード読み取り');
  if (action) {
    // 写真から追加�E�Eemini APIで解析！E
  } else {
    // バ�Eコード読み取り�E�EarcodeScannerModal�E�E
  }
}}>
  📷
</button>
```

## 他アプリのパターン

1. **MyFitnessPal**: 写真とバ�Eコードを別ボタンに刁E��てぁE��
2. **Lifesum**: 1つのボタンで、カメラ起動後にアクションシーチEボトムシートで選抁E
3. **Noom**: カメラ起動後、�E動的にバ�Eコードを検�Eし、なければ写真として処琁E
4. **Amazon/楽天**: カメラ起動後、�E動的にバ�Eコードを検�E、検�Eできなければ写真として処琁E
5. **Google Lens**: カメラ起動後、�E動的にバ�EコーチEチE��スチE画像を検�E

## 実裁E��法�E選択肢

### 選択肢A: アクションシーチEボトムシーチE
- カメラ起動前に、アクションシートで「�E真から追加」「バーコード読み取り」を選抁E
- メリチE��: モバイルで使ぁE��すい、�E確な選抁E
- チE��リチE��: 1回�EタチE�Eが増えめE

### 選択肢B: 自動検�E�E�推奨候補！E
- カメラ起動後、�E動的にバ�Eコードを検�E。検�Eできればバ�Eコード�E琁E��できなければ写真処琁E
- メリチE��: ユーザーの操作が少なぁE��スムーズな体騁E
- チE��リチE��: バ�Eコード検�Eの精度に依孁E

### 選択肢C: カメラ起動後�Eモード選抁E
- カメラ起動後、画面上に「�E真」「バーコード」�Eタンを表示
- メリチE��: 視覚的に刁E��りやすい
- チE��リチE��: UIが褁E��になめE

### 選択肢D: 別ボタンに刁E��めE
- 写真ボタンとバ�Eコード�Eタンを別、E��配置
- メリチE��: 明確、他アプリ�E�EyFitnessPal�E��Eパターン
- チE��リチE��: UIが褁E��になる、�Eタンが増えめE

## 技術スタチE��

- React (Vite) + TypeScript
- PWA�E�Erogressive Web App�E�E
- 写真解极E Gemini API�E�EanalyzeFoodImage`�E�E
- バ�Eコード読み取り: `BarcodeScannerModal`コンポ�Eネント（既存、`scanBarcodeFromCamera`関数を使用�E�E
- カメラ起勁E HTML5 `<input type="file" accept="image/*" capture="environment">`

## UI/UX要件

- **チE��イン**: スチE��ーブ�Eジョブズ風ミニマルチE��イン
- **モバイルファースチE*: スマ�E�E�EPhone 15幁E��で完璧に動佁E
- **ボタンサイズ**: 44px ÁE44px�E�タチE��フレンドリー�E�E
- **現在のボタン**: 📷アイコン、グレー背景�E�E#f3f4f6`�E�E

## 制紁E��件

- PWAのため、ブラウザAPIの制限がある
- iOS Safari、Chrome Mobileでの動作を保証
- ブラウザのカメラ権限が忁E��E

## 質啁E

1. **実裁E��法�E推奨**: 選択肢A-DのぁE��、どれが最適か？理由は�E�E
2. **自動検�Eの実裁E*: バ�Eコード�E自動検�Eを実裁E��る場合、どのような技術を使ぁE��きか�E�！Eeb BarcodeDetector API、QuaggaJS、ZXingなど�E�E
3. **アクションシーチEボトムシート�E実裁E*: PWAでアクションシーチEボトムシートを実裁E��る場合、どのような方法が最適か？（カスタムコンポ�Eネント、Headless UI、Radix UIなど�E�E
4. **UXの最適匁E*: ユーザー体験を最適化するために、どのような工夫ができるか！E
5. **他アプリのパターン**: 他アプリのパターンを参老E��、さらに改喁E��きる点はあるか！E
6. **実裁E�E優先頁E��E*: Phase 1�E�アクションシーチEボトムシート）、Phase 2�E��E動検�E機�E�E�、Phase 3�E�EXの最適化）�E具体的な実裁E�E容は�E�E

## 期征E��る�E劁E

1. **推奨実裁E��況E*: 選択肢A-DのぁE��、どれを選ぶべきか、理由とともに
2. **技術的な実裁E��況E*: 具体的なコード例やライブラリの推奨
3. **UI/UX設訁E*: アクションシーチEボトムシート�EチE��イン桁E
4. **実裁E�E優先頁E��E*: Phase 1-3の具体的な実裁E�E容
5. **他アプリとの比輁E*: 他アプリのパターンを参老E��した改喁E��E

## 補足

- **アイチE��創造56技況E*: 技況E9「俁E��の要因」を使って、UXチE��イナ�E、フロントエンドエンジニア、�Eロダクト�Eネ�Eジャーの視点で刁E��してください
- **余計なくらぁE��報を送りたい**: 可能な限り詳細な惁E��、褁E��の選択肢、�E体的な実裁E��法を提示してください
- **推奨頁E*: 褁E��の選択肢を提示する場合�E、推奨頁E��上から並べてください

---

**重要E*: こ�EプロンプトをGeminiに送る際�E、上記�E冁E��をそのままコピ�E&ペ�Eストしてください、E


