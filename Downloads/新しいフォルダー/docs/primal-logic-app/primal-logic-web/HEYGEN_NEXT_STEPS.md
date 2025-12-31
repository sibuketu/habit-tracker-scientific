# HeyGen動画生成 - 次のステップ

## 現在の実装状況

✅ **完了済み**:
- スクリプト生成機能（Gemini API）実装済み
- HeyGen API統合実装済み（`videoGenerationHeyGen.ts`）
- 動画生成のメイン関数実装済み（`videoGeneration.ts`）
- ポーリング機能実装済み

⏳ **必要な作業**:
1. HeyGenアカウントでTeamプランにアップグレード（月額$39）
2. APIキーを取得して`.env`ファイルに設定
3. アバターIDとボイスIDを取得（API経由で自動取得可能）
4. 動画生成機能のテスト
5. SNS投稿機能の実装（MCPブラウザを使用）

---

## 次のステップ（優先順位順）

### 1. HeyGenアカウントの設定（最優先）

**手順**:
1. HeyGenのホーム画面（`app.heygen.com`）にログイン
2. 左サイドバーの「Subscriptions & API」をクリック
3. 「HeyGen API」タブを選択
4. Teamプランにアップグレード（月額$39）
5. APIキーをコピー

**APIキーの設定**:
- `.env`ファイルに以下を追加:
  ```
  VITE_HEYGEN_API_KEY=your_api_key_here
  ```

### 2. アバターIDとボイスIDの取得

**API経由で自動取得**（実装が必要）:
- `GET https://api.heygen.com/v2/avatars` - アバター一覧を取得
- `GET https://api.heygen.com/v2/voices` - ボイス一覧を取得

**または手動で取得**:
- HeyGenのホーム画面から「Avatars」を確認
- 使用したいアバターのIDをメモ

### 3. 動画生成機能のテスト

**テスト手順**:
1. アプリ内で動画生成機能を呼び出す
2. スクリプト生成（Gemini API）を確認
3. HeyGen APIで動画生成を実行
4. ポーリングで動画生成の完了を待つ
5. 生成された動画URLを確認

### 4. SNS投稿機能の実装

**MCPブラウザを使用**:
- YouTube、TikTok、Instagramへの自動投稿
- 動画アップロード、タイトル・説明文・ハッシュタグの設定
- 投稿スケジュール機能（オプション）

---

## 実装が必要な機能

### 1. アバター・ボイス一覧取得機能

```typescript
// src/services/videoGenerationHeyGen.ts に追加
export async function listAvatars(): Promise<Array<{ id: string; name: string }>> {
  // GET https://api.heygen.com/v2/avatars
}

export async function listVoices(): Promise<Array<{ id: string; name: string; language: string }>> {
  // GET https://api.heygen.com/v2/voices
}
```

### 2. 動画生成UI

- 動画生成ボタン（「その他」画面に追加）
- プラットフォーム選択（YouTube / TikTok / Instagram）
- 言語選択（日本語 / 英語 / フランス語 / ドイツ語）
- トピック入力（オプション）
- 生成進捗表示
- 生成された動画のプレビュー

### 3. SNS投稿機能（MCPブラウザ）

- YouTube投稿
- TikTok投稿
- Instagram投稿
- 投稿スケジュール（オプション）

---

## 推奨実装順序

1. **HeyGenアカウント設定**（ユーザー作業）
2. **アバター・ボイス一覧取得機能の実装**
3. **動画生成UIの実装**
4. **動画生成機能のテスト**
5. **SNS投稿機能の実装**

---

## 注意事項

- **APIキー**: 必ず`.env`ファイルに設定し、Gitにコミットしないこと
- **スクリプト長さ**: 5000文字以下に制限（HeyGen APIの制限）
- **動画生成時間**: ロング動画（30分）の場合、生成に時間がかかる可能性がある
- **エラーハンドリング**: APIエラー、タイムアウト、ポーリング失敗などのエラー処理を実装

