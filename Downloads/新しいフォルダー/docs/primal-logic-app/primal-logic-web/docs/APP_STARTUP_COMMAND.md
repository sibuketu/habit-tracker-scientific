# アプリ起動コマンド（完全版）

**重要**: ターミナルは毎回新しいシェルが開かれるため、必ず `cd` コマンドも含めて実行してください。

---

## PowerShellでの起動コマンド

```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"; npm run dev
```

または、2行に分けて：

```powershell
cd "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web"
npm run dev
```

---

## コマンドプロンプト（CMD）での起動コマンド

```cmd
cd /d "C:\Users\susam\Downloads\新しいフォルダー\docs\primal-logic-app\primal-logic-web" && npm run dev
```

---

## 注意事項

- **毎回 `cd` を含める**: ターミナルは毎回新しいシェルが開かれるため、必ずディレクトリ移動コマンドも含めてください
- **パスは完全に**: 相対パスではなく、完全なパスを使用してください
- **引用符**: パスに日本語が含まれているため、必ず引用符で囲んでください

---

## 開発サーバーのURL

起動後、以下のURLでアクセスできます：
- http://localhost:5174

---

## 停止方法

開発サーバーを停止するには：
- `Ctrl+C` を押す
