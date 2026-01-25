# Visual Regression Test ガイチE

## 概要E

Visual Regression Test�E�ERT�E��E、UIの見た目が意図せず変更されてぁE��ぁE��を検�EするチE��トです。スクリーンショチE��を比輁E��て、デザインの変更を�E動的に検�Eします、E

## 実行方況E

### 初回実行（�Eースライン作�E�E�E

```bash
npm run test:visual:update
```

初回実行時は、現在のUIを�Eースラインとして保存します、E

### 通常のチE��ト実衁E

```bash
npm run test:visual
```

コードを変更した後、このコマンドでスクリーンショチE��を比輁E��ます、E

### UIモードで実衁E

```bash
npm run test:ui
```

ブラウザでチE��ト結果を確認できます、E

## チE��ト対象画面

- ホ�Eム画面�E�デスクトッチEモバイル�E�E
- 入力画面�E�EutcherSelect�E�（デスクトッチEモバイル�E�E
- 履歴画面�E�デスクトッチEモバイル�E�E
- Labs画面�E�デスクトップ！E
- 設定画面�E�デスクトップ！E
- AIチャチE��モーダル�E�デスクトップ！E
- 栁E��素ゲージ�E�詳細表示�E�E
- Argument Card表示

## スクリーンショチE��の保存場所

```
primal-logic-web/test-results/
```

## 差刁E�E確認方況E

チE��トが失敗した場合、`test-results/`フォルダーに以下が保存されます！E

- `*-actual.png`: 実際のスクリーンショチE��
- `*-expected.png`: 期征E��れるスクリーンショチE��
- `*-diff.png`: 差刁E��僁E

## 許容誤差の調整

`playwright.config.ts`の`maxDiffPixels`で調整できます！E

```typescript
await expect(page).toHaveScreenshot('home-screen.png', {
  maxDiffPixels: 100, // 100ピクセルまでの差刁E��許容
});
```

## 注意事頁E

- 動的コンチE��チE��日付、ランダムな値など�E��E除外する忁E��がありまぁE
- 初回実行時は忁E��`--update-snapshots`フラグを使用してください
- 意図皁E��UI変更がある場合�E、�Eースラインを更新してください


