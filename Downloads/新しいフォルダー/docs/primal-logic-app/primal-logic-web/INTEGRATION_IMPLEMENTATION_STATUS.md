# 連携機能実装状況

## 天気連携（OpenWeatherMap API）

### 実装状況
- ✅ 天気情報取得サービス（`weatherService.ts`）実装完了
- ✅ InputScreenに天気情報取得ボタン実装完了
- ✅ ビタミンD合成計算に天気情報を自動反映

### UI上の場所
**InputScreen**の「太陽光暴露（ソーラーチャージ）」セクションに🌤️ボタンがあります。

1. ホーム画面 → 「📝 今日の記録」を開く
2. 「太陽光暴露（ソーラーチャージ）」セクションをスクロール
3. Sunny/Cloudyボタンの右側に🌤️ボタンがあります
4. 🌤️ボタンをクリックすると、現在地の天気情報を自動取得し、ビタミンD合成計算に反映されます

### 環境変数
```env
VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here
```

### OpenWeatherMap API料金
- **無料プラン**: 1分あたり60リクエストまで（1時間あたり3,600リクエスト）
- **有料プラン**: 
  - Starter: $40/月 - 1分あたり300リクエスト
  - Business: $150/月 - 1分あたり500リクエスト
  - Professional: $400/月 - 無制限

現在の実装では、天気情報を1時間キャッシュしているため、無料プランでも十分に使用可能です。

### 取得情報
- 気温（℃）
- 天気状態（晴れ/曇り/雨/雪など）
- UV指数（0-11+）
- 雲量（0-100%）
- 湿度（0-100%）
- 位置情報（都市名）

---

## Google Fit連携

### 実装状況
- ✅ 基本構造（`googleFitService.ts`）実装完了
- ✅ HealthDeviceScreenにGoogle Fitデータ取得ボタン実装完了
- ⚠️ OAuth 2.0認証は未実装（将来的に実装予定）

### OAuth 2.0認証の実装方法

#### 1. Google Cloud Consoleで設定
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. プロジェクトを作成または選択
3. 「APIとサービス」→「認証情報」に移動
4. 「認証情報を作成」→「OAuth 2.0クライアントID」を選択
5. アプリケーションの種類を「ウェブアプリケーション」に設定
6. 承認済みのリダイレクトURIに以下を追加：
   - 開発環境: `http://localhost:5173/auth/google/callback`
   - 本番環境: `https://yourdomain.com/auth/google/callback`
7. クライアントIDとクライアントシークレットを取得

#### 2. 環境変数の設定
```env
VITE_GOOGLE_FIT_CLIENT_ID=your_client_id_here
VITE_GOOGLE_FIT_CLIENT_SECRET=your_client_secret_here
```

#### 3. OAuth 2.0認証フローの実装（将来的に実装）

```typescript
// 1. 認証URLにリダイレクト
const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?
  client_id=${clientId}&
  redirect_uri=${redirectUri}&
  response_type=code&
  scope=https://www.googleapis.com/auth/fitness.activity.read
  https://www.googleapis.com/auth/fitness.heart_rate.read
  https://www.googleapis.com/auth/fitness.location.read`;

// 2. コールバックで認証コードを受け取り
// 3. アクセストークンを取得
const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams({
    code: authCode,
    client_id: clientId,
    client_secret: clientSecret,
    redirect_uri: redirectUri,
    grant_type: 'authorization_code',
  }),
});

// 4. アクセストークンを使用してGoogle Fit APIを呼び出し
const response = await fetch('https://www.googleapis.com/fitness/v1/users/me/dataSources', {
  headers: {
    'Authorization': `Bearer ${accessToken}`,
  },
});
```

### 注意事項
- WebアプリではOAuth 2.0認証が必要です
- アクセストークンは安全に保存する必要があります（暗号化推奨）
- リフレッシュトークンを使用してアクセストークンを更新する必要があります

---

## Google Calendar連携

### 実装状況
- ✅ 基本構造（`googleCalendarService.ts`）実装完了
- ⚠️ OAuth 2.0認証は未実装（将来的に実装予定）

### OAuth 2.0認証の実装方法
Google Fitと同様のOAuth 2.0認証フローを実装します。

#### 必要なスコープ
```
https://www.googleapis.com/auth/calendar
https://www.googleapis.com/auth/calendar.events
```

#### 環境変数
```env
VITE_GOOGLE_CALENDAR_CLIENT_ID=your_client_id_here
VITE_GOOGLE_CALENDAR_CLIENT_SECRET=your_client_secret_here
```

---

## Google Drive連携

### 実装状況
- ✅ 基本構造（`googleDriveService.ts`）実装完了
- ⚠️ OAuth 2.0認証は未実装（将来的に実装予定）

### OAuth 2.0認証の実装方法
Google Fitと同様のOAuth 2.0認証フローを実装します。

#### 必要なスコープ
```
https://www.googleapis.com/auth/drive.file
```

#### 環境変数
```env
VITE_GOOGLE_DRIVE_CLIENT_ID=your_client_id_here
VITE_GOOGLE_DRIVE_CLIENT_SECRET=your_client_secret_here
```

---

## 実装優先順位

1. **天気連携**: 実装完了（APIキー設定のみ必要）
2. **Google Fit連携**: OAuth 2.0認証実装が必要
3. **Google Calendar連携**: OAuth 2.0認証実装が必要
4. **Google Drive連携**: OAuth 2.0認証実装が必要

---

## 参考リンク

- [OpenWeatherMap API ドキュメント](https://openweathermap.org/api)
- [Google Fit API ドキュメント](https://developers.google.com/fit/rest)
- [Google Calendar API ドキュメント](https://developers.google.com/calendar/api)
- [Google Drive API ドキュメント](https://developers.google.com/drive/api)
- [OAuth 2.0認証フロー](https://developers.google.com/identity/protocols/oauth2)

