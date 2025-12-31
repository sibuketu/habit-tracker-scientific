# Primal Logic - Capacitor設定ガイド

> WebアプリをCapacitorでiOSアプリ化する手順

---

## 📱 Capacitorとは

Capacitorは、Webアプリをネイティブアプリ（iOS/Android）に変換するツールです。

**メリット**:
- Webコードをそのまま使用可能
- App Storeに公開可能
- ネイティブ機能（通知、カメラ等）にアクセス可能
- 開発効率が高い

---

## 🚀 セットアップ手順

### 1. Capacitorのインストール

```bash
cd primal-logic-web
npm install @capacitor/core @capacitor/cli
npm install @capacitor/ios
```

### 2. Capacitorの初期化

```bash
npx cap init "Primal Logic" "com.primallogic.app"
```

### 3. iOSプラットフォームの追加

```bash
npx cap add ios
```

### 4. Webアプリのビルド

```bash
npm run build
```

### 5. Capacitorに同期

```bash
npx cap sync
```

### 6. Xcodeで開く

```bash
npx cap open ios
```

---

## 📝 設定ファイル

### `capacitor.config.ts`

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.primallogic.app',
  appName: 'Primal Logic',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

---

## 🔔 通知機能の追加

Capacitorでは、ネイティブ通知機能を使用できます：

```bash
npm install @capacitor/push-notifications
```

```typescript
import { PushNotifications } from '@capacitor/push-notifications';

// 通知の許可をリクエスト
await PushNotifications.requestPermissions();
```

---

## 📦 App Store申請

1. Xcodeでプロジェクトを開く
2. アプリ情報を設定（Bundle ID、バージョン等）
3. 証明書とプロビジョニングプロファイルを設定
4. Archiveを作成
5. App Store Connectにアップロード
6. 審査を申請

---

## 🎯 次のステップ

1. Webアプリの完成
2. Capacitorのセットアップ
3. iOSアプリのビルド
4. App Store申請

---

最終更新: 2025-12-18

