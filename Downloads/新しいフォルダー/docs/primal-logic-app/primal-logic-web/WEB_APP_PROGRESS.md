# Primal Logic Web App - 進捗状況

> 最終更新: 2025-12-18

---

## ✅ 完了した作業

### 1. プロジェクトセットアップ
- ✅ Vite + React + TypeScriptプロジェクト作成
- ✅ 基本構造の確認

### 2. 共通ファイル（そのままコピー）
- ✅ `constants/carnivore_constants.ts` - バイオアベイラビリティ係数、動的必要量
- ✅ `types/index.ts` - TypeScript型定義
- ✅ `data/foodsDatabase.ts` - 食品データベース
- ✅ `data/argumentCards.ts` - Argument Cardsデータベース

### 3. Utilsファイル（Web版に変換）
- ✅ `utils/storage.ts` - AsyncStorage → localStorage
- ✅ `utils/nutrientCalculator.ts` - そのまま使用可能
- ✅ `utils/recoveryAlgorithm.ts` - そのまま使用可能
- ✅ `utils/vitaminDCalculator.ts` - そのまま使用可能
- ✅ `utils/tomorrowLog.ts` - そのまま使用可能
- ✅ `utils/defrostReminder.ts` - Expo Notifications → Browser Notification API

### 4. Context（状態管理）
- ✅ `context/AppContext.tsx` - React Native → Web版に変換完了

### 5. UIコンポーネント（Web版に変換）
- ✅ `components/NutrientGauge.tsx` - View/Text → div/span
- ✅ `components/ArgumentCard.tsx` - Modal → HTML overlay
- ✅ CSS Modules対応

### 6. 画面（Web版に変換）
- ✅ `screens/HomeScreen.tsx` - View/Text → div/span
- ✅ `screens/InputScreen.tsx` - TextInput/Slider → input/range
- ✅ `screens/RecoveryProtocolScreen.tsx` - View/Text → div/span
- ✅ `screens/ProfileScreen.tsx` - View/Text → div/span
- ✅ `screens/HistoryScreen.tsx` - FlatList → div with map
- ✅ CSS Modules対応

### 7. メインアプリ
- ✅ `App.tsx` - View/Text → div/span、StatusBar削除
- ✅ `main.tsx` - 確認済み
- ✅ `index.css` - スタイル調整

### 8. PWA対応（基本設定）
- ✅ `manifest.json` 作成
- ✅ iOS用メタタグ追加
- ⏳ Service Worker（後で追加可能）

---

## 🎯 次のステップ

### 1. 動作確認
```bash
cd primal-logic-web
npm install
npm run dev
```

### 2. CapacitorでiOSアプリ化
詳細は `CAPACITOR_SETUP.md` を参照

```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init "Primal Logic" "com.primallogic.app"
npx cap add ios
npm run build
npx cap sync
npx cap open ios
```

### 3. Service Worker追加（オプション）
- オフライン対応
- キャッシュ戦略

---

## 📝 変換ルール（完了）

| React Native | Web | 状態 |
|-------------|-----|------|
| `View` | `div` | ✅ |
| `Text` | `span` / `p` | ✅ |
| `TouchableOpacity` | `button` / `div` with onClick | ✅ |
| `ScrollView` | `div` with overflow | ✅ |
| `TextInput` | `input` | ✅ |
| `FlatList` | `div` with map | ✅ |
| `Slider` | `input[type="range"]` | ✅ |
| `Modal` | HTML overlay | ✅ |
| `StyleSheet.create` | CSS Modules | ✅ |
| `AsyncStorage` | `localStorage` | ✅ |
| `expo-notifications` | Browser Notification API | ✅ |

---

## ✨ 実装完了機能

- ✅ Status & Fuel入力
- ✅ Anxiety-Free Gauges
- ✅ Argument Cards（3-tier表示）
- ✅ Recovery Protocol（明日のログに追加）
- ✅ Defrost Reminder（通知システム）
- ✅ ユーザープロファイル設定
- ✅ 日次ログ履歴

---

## 🚀 起動方法

```bash
cd primal-logic-web
npm install
npm run dev
```

ブラウザで `http://localhost:5173` を開く

---

最終更新: 2025-12-18
