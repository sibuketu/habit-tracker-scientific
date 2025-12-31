# 開発サーバー起動方法

## 問題
`http://localhost:5173`にアクセスできない

## 解決方法

### 1. ターミナルで以下のコマンドを実行
```powershell
cd primal-logic-app\primal-logic-web
npm run dev
```

### 2. 起動確認
ターミナルに以下のようなメッセージが表示されることを確認:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 3. ブラウザでアクセス
`http://localhost:5173` にアクセス

## トラブルシューティング

### ポート5173が使用中の場合
1. 他のプロセスを終了:
```powershell
Get-Process | Where-Object {$_.ProcessName -like "*node*"} | Stop-Process -Force
```

2. 別のポートを使用:
`vite.config.ts`でポートを変更:
```typescript
server: {
  host: true,
  port: 3000, // 別のポートに変更
}
```

### ファイアウォールの確認
Windowsファイアウォールがポート5173をブロックしていないか確認

### キャッシュのクリア
ブラウザのキャッシュをクリアして再読み込み
