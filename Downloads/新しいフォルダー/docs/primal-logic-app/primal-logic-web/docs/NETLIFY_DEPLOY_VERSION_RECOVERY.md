# Netlifyデプロイバージョンの復元計画

**作成日**: 2026-01-25  
**目的**: 3日前にNetlifyにデプロイされた安定したバージョンをローカルに復元する

---

## 確認事項

### NetlifyデプロイURL
- **URL**: https://strong-travesseiro-0a6a1c.netlify.app
- **デプロイ日**: 3日前（2026-01-22頃）
- **状態**: HistoryScreenが正常に表示されている

### 現在のローカル状態
- **HEAD**: `2a87694` (2025-12-30)
- **問題**: UIが「ありえないくらい」おかしい
- **状態**: Netlifyのデプロイバージョンと異なる

---

## 復元方法

### 方法1: リモートリポジトリから取得

Netlifyは通常、Gitリポジトリから自動デプロイするため、リモートリポジトリに3日前のコミットが存在する可能性があります。

```powershell
# 1. リモートリポジトリを確認
git remote -v

# 2. リモートから最新情報を取得
git fetch --all

# 3. リモートブランチのコミット履歴を確認
git log --oneline origin/main -30
# または
git log --oneline origin/master -30

# 4. 3日前のコミットを特定
git log --oneline --all --since="2026-01-20" --until="2026-01-24" -20

# 5. そのコミットに戻す
git reset --hard <commit-hash>
```

### 方法2: Netlifyのデプロイ履歴から確認

Netlifyのダッシュボードで以下を確認：
1. https://app.netlify.com にログイン
2. サイト「strong-travesseiro-0a6a1c」を選択
3. 「Deploys」タブを開く
4. 3日前のデプロイを選択
5. ビルドログからコミットハッシュを確認

### 方法3: Netlifyのビルドログからコミットハッシュを取得

Netlifyのビルドログには通常、以下のような情報が含まれます：
```
Commit: abc123def456...
Branch: main
```

このコミットハッシュを使ってローカルに戻すことができます。

---

## 実行手順

### Step 1: リモートリポジトリの確認

```powershell
git remote -v
git fetch --all
```

### Step 2: 3日前のコミットを特定

```powershell
# リモートブランチのコミット履歴を確認
git log --oneline origin/main --since="2026-01-20" --until="2026-01-24" -20
```

### Step 3: そのコミットに戻す

```powershell
# 特定したコミットに戻す
git reset --hard <commit-hash>

# 未追跡ファイルを削除
git clean -fd

# Viteキャッシュをクリア
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
```

### Step 4: 開発サーバー再起動

```powershell
npm run dev
```

---

## 注意事項

- **自然言語の記録は保持**: `docs/` 配下のMarkdownファイルは保持されます
- **コードは完全に戻す**: すべてのコードファイルはNetlifyのデプロイバージョンに戻ります
- **ブラウザキャッシュ**: 再起動後、ブラウザのキャッシュもクリアしてください

---

## 確認事項

復元後、以下を確認：
- [ ] アプリが正常に起動する
- [ ] HistoryScreenが正常に表示される（Netlifyと同じ状態）
- [ ] LabsScreenが正常に表示される
- [ ] ProfileScreenが正常に表示される
- [ ] HomeScreenが正常に表示される
- [ ] UIがNetlifyのデプロイバージョンと同じ状態になっている

---

## 参考

- **NetlifyデプロイURL**: https://strong-travesseiro-0a6a1c.netlify.app
- **Netlifyダッシュボード**: https://app.netlify.com
