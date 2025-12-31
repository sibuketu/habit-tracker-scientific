# 将来追加する機能（メモ）

## スマホからCursorとObsidianを使う方法

### 目的
PCと同じような開発・知識管理体験をスマホから実現する

### 検討事項
- **Cursorのモバイル対応方法**
  - Cursorは現在、デスクトップアプリのみ（iOS/Androidアプリは未提供）
  - 代替案：
    - VS Code Server（code-server）をサーバーに構築し、ブラウザからアクセス
    - GitHub CodespacesなどのクラウドIDE
    - リモートデスクトップでPCにアクセス
- **Obsidianのモバイルアプリ連携**
  - ObsidianにはiOS/Androidアプリが存在
  - 同期方法：
    - Obsidian Sync（有料）
    - iCloud/Dropbox/OneDriveで同期
    - Gitで同期（Advanced版）
- **ファイル同期方法**
  - Git（GitHub、GitLabなど）
  - クラウドストレージ（iCloud、Dropbox、OneDrive、Google Drive）
  - Obsidian Sync
- **操作の最適化**
  - タッチ操作への対応
  - 画面サイズの調整
  - キーボードショートカットの代替

### 推奨アプローチ
1. **Obsidian**: モバイルアプリ + Obsidian Sync または iCloud/Dropbox同期
2. **Cursor**: VS Code Server または リモートデスクトップ

### 実装タイミング
- 優先度: 中
- 実装時期: 未定

