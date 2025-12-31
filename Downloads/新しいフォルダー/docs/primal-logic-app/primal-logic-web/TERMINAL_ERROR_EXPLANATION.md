# ターミナルエラーの説明

## エラーメッセージ
```
Set-Location : パス 'C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web' が見つかりませんでした。
```

## 原因
PowerShellが日本語フォルダ名（「新しいフォルダー」）を含むパスを正しく処理できていない可能性があります。

## 解決方法

### 方法1: エクスプローラーから直接起動
1. エクスプローラーで `primal-logic-app\primal-logic-web` フォルダを開く
2. アドレスバーに `powershell` と入力してEnter
3. ターミナルで以下を実行:
```powershell
npm run dev
```

### 方法2: 絶対パスを使用
```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
npm run dev
```

### 方法3: 短いパス名を使用
```powershell
cd "C:\Users\susam\Downloads\~1\docs\primal-logic-app\primal-logic-web"
npm run dev
```

## 確認方法
サーバーが起動したら、ブラウザで `http://localhost:5173` にアクセスしてください。

