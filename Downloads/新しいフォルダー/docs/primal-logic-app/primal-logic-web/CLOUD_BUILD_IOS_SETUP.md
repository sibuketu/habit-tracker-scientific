# クラウドビルドサービスでiOSアプリをApp Storeに提出する手順

> Codemagic等のクラウドビルドサービスを使用（証明書は自動管理）

---

## ✅ 重要なポイント

**証明書の手動登録は不要です。** クラウドビルドサービスが自動で証明書とプロビジョニングプロファイルを生成・管理します。

---

## 📋 今すぐやるべき作業（ブラウザから）

### Step 1: App ID（Bundle ID）の登録

1. **Apple Developer Portalにアクセス**
   - URL: https://developer.apple.com/account/resources/identifiers/list
   - 「ID(英語)」をクリック

2. **App IDを登録**
   - 「+」ボタンをクリック
   - 「App IDs」を選択
   - **Description**: `Primal Logic`
   - **Bundle ID**: `com.primallogic.app` (Explicit)
   - **Capabilities**: 必要な機能を選択
   - 「Continue」→「Register」

### Step 2: App Store Connectでアプリを登録

1. **App Store Connectにアクセス**
   - URL: https://appstoreconnect.apple.com
   - 「マイ App」→「+」→「新しいApp」

2. **アプリ情報を入力**
   - **プラットフォーム**: iOS
   - **名前**: `Primal Logic`
   - **プライマリ言語**: 日本語
   - **Bundle ID**: `com.primallogic.app` (Step 1で登録したもの)
   - **SKU**: `primal-logic-001`（任意の一意の文字列）
   - **ユーザーアクセス**: フルアクセス

3. **メタデータを入力**
   - App情報、価格、スクリーンショット、アイコン等

---

## 🚀 直前でやる作業（Codemagic設定時）

### Step 3: App Store Connect API Keyの生成

**Codemagicで自動アップロードする場合に必要:**

1. **App Store Connectにアクセス**
   - URL: https://appstoreconnect.apple.com
   - 「ユーザとアクセス」→「キー」タブ

2. **API Keyを生成**
   - 「+」ボタンをクリック
   - **キー名**: `Codemagic` など
   - **アクセス**: 「App Manager」または「Admin」
   - 「生成」をクリック
   - **Key ID**と**.p8ファイル**をダウンロード（一度しか表示されないので注意）

3. **Codemagicに設定**
   - Codemagicの設定画面で、Key ID、Issuer ID、.p8ファイルを登録

---

## 🔄 証明書について

**手動での証明書登録は不要です。**

- Codemagic等のクラウドビルドサービスが自動で証明書を生成・管理
- 「証明書、ID、プロファイル」セクションでの手動登録は不要
- クラウドサービスがApple Developer Portalに自動で証明書を登録

---

## 📝 Codemagic設定手順（概要）

1. **GitHubにコードをプッシュ**
2. **Codemagicに登録・ログイン**
   - URL: https://codemagic.io
   - GitHubアカウントでログイン
3. **リポジトリを選択**
4. **ビルド設定**
   - Platform: iOS
   - Project type: Capacitor
   - Bundle ID: `com.primallogic.app`
5. **App Store Connect連携**
   - API Key（Step 3で生成したもの）を設定
6. **ビルド実行**
   - 自動でビルド → App Store Connectにアップロード

---

## ✅ チェックリスト

### 今すぐ（ブラウザで）
- [ ] App ID（Bundle ID）を登録
- [ ] App Store Connectでアプリを登録
- [ ] メタデータを入力
- [ ] スクリーンショット・アイコンを準備

### 直前（Codemagic設定時）
- [ ] App Store Connect API Keyを生成
- [ ] CodemagicにAPI Keyを設定
- [ ] GitHubにコードをプッシュ
- [ ] Codemagicでビルド実行

### 不要な作業
- ❌ 証明書の手動登録（クラウドサービスが自動管理）
- ❌ プロビジョニングプロファイルの手動作成（クラウドサービスが自動管理）

---

## 📚 参考リンク

- [Codemagic](https://codemagic.io)
- [Apple Developer Portal](https://developer.apple.com/account)
- [App Store Connect](https://appstoreconnect.apple.com)

---

最終更新: 2026-01-25
