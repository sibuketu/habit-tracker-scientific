# 開発サーバー起動方法

## 問題
PowerShellが日本語フォルダ名を含むパスを正しく処理できていないため、ターミナルから直接起動できない場合があります。

## 解決方法

### 方法1: エクスプローラーから直接起動（推奨）

1. **エクスプローラーを開く**
   - Windowsキー + E を押す

2. **プロジェクトフォルダに移動**
   - アドレスバーに以下を貼り付けてEnter:
   ```
   C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web
   ```

3. **PowerShellを開く**
   - アドレスバーに `powershell` と入力してEnter
   - または、Shift + 右クリック → 「PowerShellウィンドウをここで開く」

4. **開発サーバーを起動**
   ```powershell
   npm run dev
   ```

5. **ブラウザで確認**
   - `http://localhost:5173` にアクセス

### 方法2: バッチファイルをダブルクリック

1. **エクスプローラーで `primal-logic-app\primal-logic-web` フォルダを開く**

2. **`start-dev-server.bat` をダブルクリック**

3. **ブラウザで確認**
   - `http://localhost:5173` にアクセス

### 方法3: Cursorのターミナルから起動

1. **Cursorで `primal-logic-app\primal-logic-web` フォルダを開く**

2. **ターミナルを開く** (Ctrl + `)

3. **開発サーバーを起動**
   ```powershell
   npm run dev
   ```

4. **ブラウザで確認**
   - `http://localhost:5173` にアクセス

## トラブルシューティング

### ポート5173が使用中の場合
```powershell
# ポート5173を使用しているプロセスを確認
Get-NetTCPConnection -LocalPort 5173 | Select-Object OwningProcess

# プロセスを終了（必要に応じて）
Stop-Process -Id <プロセスID> -Force
```

### 別のポートを使用する場合
`vite.config.ts`でポートを変更:
```typescript
server: {
  host: true,
  port: 3000, // 別のポートに変更
}
```

