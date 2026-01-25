# App Store提出ガイド

> Apple Developer Program加入済み（12,000円/年）の状態から、App Storeにアプリを提出するまでの完全な手順

---

## ⚠️ 重要な前提条件

### Windowsでの制約
- **iOSアプリのビルドは不可**: macOS + Xcodeが必要
- **ブラウザから可能な作業**: App Store Connectでの設定、Bundle ID登録、メタデータ入力

### 必要な環境
1. ✅ **Apple Developer Program**: 加入済み（12,000円/年）
2. ❌ **macOS + Xcode**: ビルドとアップロードに必要（Windowsでは不可）
3. ✅ **ブラウザ**: App Store Connectでの設定作業

---

## 📋 現在のプロジェクト情報

- **Bundle ID**: `com.primallogic.app`
- **App Name**: `Primal Logic` (Info.plist) / `CarnivOS` (capacitor.config.json)
- **Version**: `1.0`
- **Deployment Target**: iOS 15.0

---

## 🚀 手順（ブラウザで可能な部分）

### Step 1: Apple Developer PortalでBundle IDを登録

1. **Apple Developer Portalにログイン**
   - URL: https://developer.apple.com/account/resources/identifiers/list
   - Apple IDでログイン

2. **Bundle IDを登録**
   - 「+」ボタンをクリック
   - 「App IDs」を選択
   - **Description**: `Primal Logic` または `CarnivOS`
   - **Bundle ID**: `com.primallogic.app` (Explicit)
   - **Capabilities**: 必要な機能を選択（Push Notifications、In-App Purchase等）
   - 「Continue」→「Register」

### Step 2: App Store Connectでアプリを登録

1. **App Store Connectにログイン**
   - URL: https://appstoreconnect.apple.com
   - Apple IDでログイン

2. **新しいアプリを作成**
   - 「マイ App」→「+」→「新しいApp」
   - **プラットフォーム**: iOS
   - **名前**: `Primal Logic` または `CarnivOS`
   - **プライマリ言語**: 日本語
   - **Bundle ID**: `com.primallogic.app` (Step 1で登録したもの)
   - **SKU**: 任意の一意の文字列（例: `primal-logic-001`）
   - **ユーザーアクセス**: フルアクセス

3. **アプリ情報を入力**
   - **カテゴリ**: ヘルスケア/フィットネス
   - **コンテンツの権利**: 必要に応じて設定
   - **年齢制限**: 適切な年齢を選択

### Step 3: アプリのメタデータを入力

1. **App情報**
   - **名前**: `Primal Logic`
   - **サブタイトル**: アプリの短い説明
   - **プライバシーポリシーURL**: 必要に応じて設定

2. **価格と販売状況**
   - **価格**: 無料または有料を選択
   - **利用可能な地域**: 全世界または特定の地域

3. **App Storeの情報**
   - **説明**: アプリの詳細な説明（最大4,000文字）
   - **キーワード**: 検索用キーワード（最大100文字）
   - **サポートURL**: サポートページのURL
   - **マーケティングURL**: マーケティングページのURL（任意）

4. **スクリーンショット**
   - **必須サイズ**:
     - iPhone 6.7インチ: 1290 x 2796 pixels
     - iPhone 6.5インチ: 1284 x 2778 pixels
     - iPhone 5.5インチ: 1242 x 2208 pixels
   - 最低1セット必要（最大10セット）

5. **アプリアイコン**
   - **サイズ**: 1024 x 1024 pixels
   - **形式**: PNG（アルファチャンネルなし）

6. **プライバシー情報**
   - **プライバシー実践**: データ収集の有無を設定
   - **App Tracking Transparency**: 必要に応じて設定

---

## 🍎 macOS + Xcodeで必要な作業（Windowsでは不可）

### Step 4: Xcodeでのビルドとアップロード

**⚠️ この作業はmacOS + Xcodeが必要です。Windowsでは実行できません。**

1. **macOSでプロジェクトを開く**
   ```bash
   cd primal-logic-web
   npm run build
   npx cap sync
   npx cap open ios
   ```

2. **Xcodeで設定**
   - **Signing & Capabilities**:
     - **Team**: Apple Developer Programのチームを選択
     - **Bundle Identifier**: `com.primallogic.app`
     - **Automatically manage signing**: チェックを入れる
   - **Version**: `1.0`
   - **Build**: `1`

3. **Archiveを作成**
   - **Product** → **Archive**
   - ビルドが完了するまで待つ

4. **App Store Connectにアップロード**
   - **Distribute App** → **App Store Connect** → **Upload**
   - アップロードが完了するまで待つ（数分〜数十分）

---

## 📝 審査提出

### Step 5: App Store Connectで審査を提出

1. **ビルドを選択**
   - App Store Connectで「ビルド」セクションに移動
   - アップロードしたビルドを選択

2. **審査情報を入力**
   - **審査用メモ**: 審査員向けの説明（任意）
   - **連絡先情報**: 審査中の問い合わせ先

3. **提出**
   - 「審査に提出」をクリック
   - 審査は通常1〜3営業日

---

## 🔄 代替案（Windowsでも可能）

### PWA（Progressive Web App）

**App Store審査不要で、iOSでも利用可能:**

- ✅ すぐに利用可能
- ✅ App Store審査不要
- ✅ iOS Safariで「ホーム画面に追加」可能
- ⚠️ ただし、App Storeには表示されない

**既にPWA対応済み**: `manifest.json`、Service Worker等が設定済み

---

## 📚 参考リンク

- [Apple Developer Portal](https://developer.apple.com/account)
- [App Store Connect](https://appstoreconnect.apple.com)
- [App Store審査ガイドライン](https://developer.apple.com/app-store/review/guidelines/)
- [Bundle ID登録ガイド](https://developer.apple.com/documentation/appstoreconnect/managing-app-ids)

---

## ✅ チェックリスト

### ブラウザで可能な作業
- [ ] Apple Developer PortalでBundle IDを登録
- [ ] App Store Connectでアプリを登録
- [ ] アプリのメタデータを入力
- [ ] スクリーンショットを準備・アップロード
- [ ] アプリアイコンを準備・アップロード
- [ ] プライバシー情報を設定

### macOS + Xcodeが必要な作業
- [ ] Xcodeでプロジェクトを開く
- [ ] Signing & Capabilitiesを設定
- [ ] Archiveを作成
- [ ] App Store Connectにアップロード
- [ ] 審査を提出

---

最終更新: 2026-01-03
