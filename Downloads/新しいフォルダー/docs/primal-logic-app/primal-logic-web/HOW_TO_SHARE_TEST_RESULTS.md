# チE��ト結果の共有方法（サルでもわかる�E�E

> 作�E日: 2026-01-03
> **Playwright Test Reportの結果を�E有する方況E*

---

## 🎯 方況E: HTMLレポ�Eトを開く�E�推奨・最も簡単！E

### 手頁E

1. **エクスプローラーを開ぁE*�E�Eindowsキー+E�E�E
2. **アドレスバ�Eに以下を貼り付けてEnter:**
   ```
   C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web\playwright-report
   ```
3. **`index.html` をダブルクリチE��**
   - ブラウザでPlaywright Test Reportが開きまぁE
4. **スクリーンショチE��を撮めE*
   - Windowsキー + Shift + S�E�Enipping Tool�E�E
   - また�E、PrintScreenキー
   - 失敗したテスト�E詳細部刁E��スクリーンショチE��で撮影
5. **スクリーンショチE��をチャチE��に貼り付け**

---

## 🎯 方況E: エラーメチE��ージをコピ�E&ペ�EスチE

### 手頁E

1. **Playwright Test Reportを開ぁE*�E�方況Eを参照�E�E
2. **失敗したテストをクリチE��**
   - 左側のリストから失敗したテストを選抁E
3. **エラーメチE��ージをコピ�E**
   - エラーメチE��ージ部刁E��選択してCtrl+C
4. **チャチE��に貼り付け**
   - Ctrl+Vで貼り付け

---

## 🎯 方況E: ターミナルの出力を共朁E

### 手頁E

1. **ターミナルでチE��トを実衁E*
   ```powershell
   cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
   npm test
   ```
2. **エラーメチE��ージをコピ�E**
   - ターミナルのエラーメチE��ージ部刁E��選択してCtrl+C
3. **チャチE��に貼り付け**
   - Ctrl+Vで貼り付け

---

## 🎯 方況E: 失敗したテスト�E詳細をテキストで共朁E

### 手頁E

1. **Playwright Test Reportを開ぁE*�E�方況Eを参照�E�E
2. **失敗したテストをクリチE��**
3. **以下�E惁E��をメモ**
   - チE��ト名�E�侁E "6: 栁E��素ゲージ表示"�E�E
   - エラーメチE��ージ�E�侁E "Element not found"�E�E
   - スクリーンショチE���E�あれ�E�E�E
4. **チャチE��に貼り付け**

---

## 📋 共有すべき情報

### 最低限忁E��な惁E��

1. **失敗したテスト�E数**
   - 侁E "140個�EチE��トが失敗しました"
2. **失敗したテスト�E名前**
   - 侁E "6: 栁E��素ゲージ表示"
3. **エラーメチE��ージ**
   - 侁E "Element not found: getByText(/ビタミンC|Vitamin C/i)"

### より詳しい惁E���E�推奨�E�E

1. **スクリーンショチE��**
   - 失敗したテスト�E詳細画面
   - エラーメチE��ージが表示されてぁE��部刁E
2. **褁E��の失敗したテスト�E侁E*
   - 3-5個�E失敗したテスト�E詳細
3. **成功したチE��ト�E数**
   - 侁E "58個�EチE��トが成功しました"

---

## 🚀 クイチE��共有（推奨�E�E

### 最も簡単な方況E

1. **Playwright Test Reportを開ぁE*
   - `playwright-report/index.html` をダブルクリチE��
2. **失敗したテストを3-5個選ぶ**
3. **吁E��ストをクリチE��して、エラーメチE��ージをスクリーンショチE��で撮めE*
4. **スクリーンショチE��をチャチE��に貼り付け**

これで十�Eです！E

---

## 📝 補足

- **HTMLレポ�Eト�E場所**: `primal-logic-app/primal-logic-web/playwright-report/index.html`
- **スクリーンショチE��の場所**: `primal-logic-app/primal-logic-web/test-results/`�E�失敗したテスト�EスクリーンショチE��が保存されてぁE���E�E
- **レポ�Eトを再生戁E*: `npm test` を実行すると、最新のレポ�Eトが生�EされまぁE

---

最終更新: 2026-01-03


