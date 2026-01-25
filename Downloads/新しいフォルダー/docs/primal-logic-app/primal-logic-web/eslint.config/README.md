# CarnivOS - Web App

> CarnivOS (Carnivore Compass) のWebアプリ牁E> カーニ�EアダイエチE��管琁E��プリ - 世界一のCarnivoreアプリを目持E��
> CapacitorでiOSアプリ化可能

---

## 🚀 クイチE��スターチE
```bash
# 依存関係�Eインスト�Eル
npm install

# 開発サーバ�Eの起勁Enpm run dev
```

ブラウザで `http://localhost:5173` を開ぁE��ください、E
---

## 📋 セチE��アチE�E手頁E
### 1. リポジトリのクローン�E��E回�Eみ�E�E
```bash
git clone <repository-url>
cd primal-logic-app/primal-logic-web
```

### 2. 依存関係�Eインスト�Eル

```bash
npm install
```

### 3. 環墁E��数の設宁E
`.env` ファイルめE`primal-logic-web` チE��レクトリに作�Eし、以下�EチE��プレートをコピ�Eしてください�E�E
```env
# ============================================
# CarnivOS - 環墁E��数設宁E# ============================================
# こ�Eファイルをコピ�Eして .env ファイルを作�Eし、E# 実際のAPIキーに置き換えてください
# ============================================

# ============================================
# 忁E��E Gemini API キー�E�EI機�Eを使用する場合！E# ============================================
# AI機�E�E�チャチE��、�E真解析等）を使用するには忁E��でぁE# 取得方況E https://aistudio.google.com/app/apikey
# 注愁E Viteでは `VITE_` プレフィチE��スが忁E��でぁEVITE_GEMINI_API_KEY=your_gemini_api_key_here

# ============================================
# オプション: OpenAI API キー
# ============================================
# 従来のAIチャチE��機�Eを使用する場合�Eみ忁E��E# VITE_OPENAI_API_KEY=sk-your-api-key-here

# ============================================
# オプション: Supabase連携
# ============================================
# クラウドバチE��アチE�Eを使用する場合�Eみ忁E��E# 設定されてぁE��ぁE��合、localStorageのみを使用します（�E動フォールバック�E�E# 
# セチE��アチE�E手頁E
# 1. https://supabase.com でプロジェクトを作�E
# 2. プロジェクチERLとAnon Keyを取征E# 3. 以下�E2行�Eコメントを外して値を設宁E# 4. supabase_schema.sql をSupabaseのSQL Editorで実衁E# VITE_SUPABASE_URL=your_supabase_project_url
# VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

# ============================================
# オプション: Replicate API ト�Eクン
# ============================================
# 画像生成�E完�E自動化を使用する場合�Eみ忁E��E��無料枠あり�E�E# アプリアイコン生�EやSNS自動化で使用
# 取得方況E https://replicate.com/account/api-tokens
# VITE_REPLICATE_API_TOKEN=r8_your_api_token_here

# ============================================
# オプション: OpenWeatherMap API キー
# ============================================
# 天気情報の自動取得を使用する場合�Eみ忁E��E# ビタミンD合�E計算に天気情報を�E動反映
# 取得方況E https://openweathermap.org/api
# VITE_OPENWEATHER_API_KEY=your_openweather_api_key_here

# ============================================
# オプション: Google Fit API キー
# ============================================
# Google Fit連携を使用する場合�Eみ忁E��E# 歩数、忁E��数、活動時間、消費カロリーの自動取征E# 注愁E OAuth 2.0認証が忁E��E��封E��皁E��実裁E��定！E# 取得方況E https://console.cloud.google.com/apis/credentials
# VITE_GOOGLE_FIT_API_KEY=your_google_fit_api_key_here

# ============================================
# オプション: Google Calendar API キー
# ============================================
# Google Calendar連携を使用する場合�Eみ忁E��E# 食事時間や運動時間の記録
# 注愁E OAuth 2.0認証が忁E��E��封E��皁E��実裁E��定！E# 取得方況E https://console.cloud.google.com/apis/credentials
# VITE_GOOGLE_CALENDAR_API_KEY=your_google_calendar_api_key_here

# ============================================
# オプション: Google Drive API キー
# ============================================
# Google Drive連携を使用する場合�Eみ忁E��E# チE�EタバックアチE�E
# 注愁E OAuth 2.0認証が忁E��E��封E��皁E��実裁E��定！E# 取得方況E https://console.cloud.google.com/apis/credentials
# VITE_GOOGLE_DRIVE_API_KEY=your_google_drive_api_key_here
```

### 4. 開発サーバ�Eの起勁E
```bash
npm run dev
```

ブラウザで `http://localhost:5173` を開ぁE��ください、E
---

## 🔑 APIキーの取得方況E
### Gemini API キー�E�忁E��E- AI機�Eを使用する場合！E
1. [Google AI Studio](https://aistudio.google.com/app/apikey) にアクセス
2. 「Create API Key」をクリチE��
3. 生�EされたAPIキーをコピ�E
4. `.env` ファイルの `VITE_GEMINI_API_KEY` に貼り付け

### Supabase�E�オプション - クラウドバチE��アチE�Eを使用する場合！E
1. [Supabase](https://supabase.com) でプロジェクトを作�E
2. Settings ↁEAPI から以下を取得！E   - Project URL ↁE`VITE_SUPABASE_URL`
   - anon public key ↁE`VITE_SUPABASE_ANON_KEY`
3. SQL Editorで `supabase_schema.sql` を実行してチE�Eブルを作�E

詳細な手頁E�E `API_KEY_SETUP.md` を参照してください、E
---

## 📱 iOSアプリ化！Eapacitor�E�E
詳細は `CAPACITOR_SETUP.md` を参照してください、E
### クイチE��スターチE
```bash
npm install @capacitor/core @capacitor/cli @capacitor/ios
npx cap init "CarnivOS" "com.primallogic.app"
npx cap add ios
npm run build
npx cap sync
npx cap open ios
```

---

## 🏗�E�Eプロジェクト構造

```
src/
├── constants/     # バイオアベイラビリチE��係数、動皁E��E��E��
├── types/         # TypeScript型定義
├── data/          # 食品チE�Eタベ�Eス、Argument Cards
├── utils/         # 計算エンジン、ストレージ、E��知
├── context/       # グローバル状態管琁E├── components/    # UIコンポ�EネンチE└── screens/       # 画面コンポ�EネンチE```

---

## 📚 技術スタチE��

- **フレームワーク**: React + Vite
- **言誁E*: TypeScript
- **状態管琁E*: React Context API
- **ストレージ**: localStorage
- **通知**: Browser Notification API
- **iOS匁E*: Capacitor

---

## 🎯 主要機�E

### 基本機�E
- ✁E**栁E��素追跡**: タンパク質、脂質、ビタミン、ミネラルなどの詳細な追跡
- ✁E**4ゾーングラチE�Eションゲージ**: 直感的な栁E��素可視化
- ✁E**動的目標値**: 100頁E��以上�Eプロファイル設定による個人最適匁E- ✁E**P:F比率表示**: タンパク質と脂質の比率を視覚化
- ✁E**カルシウム:リン比率**: 骨代謝に重要な比率を表示
- ✁E**グリシン:メチオニン比率**: 長寿の視点から重要な比率を表示�E��Eーンブロス提案機�E付き�E�、E026-01-03実裁E��亁E��E- ✁E**オメガ3/6比率**: 炎症管琁E��重要な比率を表示
- ✁E**Argument Cards**: 栁E��素に関する科学皁E��拠の表示

### AI機�E
- ✁E**AIチャチE��**: Carnivore専門家レベルのアドバイス
- ✁E**写真解极E*: 食べたものを�E真で記録
- ✁E**AI Concierge**: 詳細な栁E��素惁E��の自動補宁E
### そ�E他�E機�E
- ✁E**Recovery Protocol**: 違反検�E時�E自動リカバリープロトコル生�E
- ✁E**習�EトラチE��ー**: カーニ�EアダイエチE��の連続日数を記録
- ✁E**履歴管琁E*: 過去の食事記録の確認と刁E��
- ✁E**多言語対忁E*: 英語、フランス語、ドイチE��、日本語、中国誁E- ✁E**Gift機�E**: コミュニティによる新規ユーザー支援
- ✁E**ドット絵UI**: アプリ全体をドット絵スタイルに変更可能

---

## 🛠�E�E開発コマンチE
```bash
# 開発サーバ�Eの起勁Enpm run dev

# 本番ビルチEnpm run build

# ビルド結果のプレビュー
npm run preview

# リンターの実衁Enpm run lint

# チE��ト�E実衁Enpm run test

# チE��ト！EIモード！Enpm run test:ui
```

---

## 📦 ビルドとチE�Eロイ

### 本番ビルチE
```bash
npm run build
```

ビルド結果は `dist/` チE��レクトリに出力されます、E
### NetlifyへのチE�Eロイ

こ�Eプロジェクト�ENetlifyの自動デプロイに対応してぁE��す、E
1. GitHubリポジトリをNetlifyに接綁E2. ビルドコマンチE `npm run build`
3. 公開ディレクトリ: `dist`
4. 環墁E��数をNetlifyの設定で追加

詳細は `NETLIFY_DEPLOY.md` を参照してください、E
---

## 🐛 トラブルシューチE��ング

### 開発サーバ�Eが起動しなぁE
- Node.jsのバ�Eジョンを確認！E18以上推奨�E�E- `node_modules` を削除して `npm install` を�E実衁E
### AI機�Eが動作しなぁE
- `.env` ファイルが正しく作�EされてぁE��か確誁E- `VITE_GEMINI_API_KEY` が正しく設定されてぁE��か確誁E- ブラウザのコンソールでエラーメチE��ージを確誁E
### ビルドエラーが発生すめE
- TypeScriptの型エラーを確誁E `npm run lint`
- 依存関係を再インスト�Eル: `rm -rf node_modules && npm install`

---

## 🤁EAntiGravityでの開発

AntiGravityでこ�Eプロジェクトを開いて開発することも可能です、E
### クイチE��スターチE
1. AntiGravityで「Open Folder」をクリチE��
2. `primal-logic-web`フォルダを選抁E3. セキュリチE��警呁EↁE「Yes, I trust the authors」を選抁E4. `npm install` ↁE`npm run dev`

詳細は以下を参�E�E�E- [AntiGravity クイチE��スターチE(./ANTIGRAVITY_QUICK_START.md)
- [AntiGravity移行ガイド](./ANTIGRAVITY_SETUP.md)
- [IDE使ぁE�Eけガイド](./IDE_USAGE_GUIDE.md)

---

## 📚 関連ドキュメンチE
- [リリース前チェチE��リスチE(./RELEASE_CHECKLIST.md)
- [APIキー設定ガイド](./API_KEY_SETUP.md)
- [CapacitorセチE��アチE�E](./CAPACITOR_SETUP.md)
- [NetlifyチE�Eロイガイド](./NETLIFY_DEPLOY.md)
- [AntiGravity クイチE��スターチE(./ANTIGRAVITY_QUICK_START.md)
- [AntiGravity移行ガイド](./ANTIGRAVITY_SETUP.md)
- [IDE使ぁE�Eけガイド](./IDE_USAGE_GUIDE.md)

---

## 🔒 セキュリチE��

- APIキーは `.env` ファイルに保存し、GitにコミットしなぁE��ください
- `.env` ファイルは `.gitignore` に含まれてぁE��ぁE- 本番環墁E��は環墁E��数を適刁E��設定してください

---

## 📝 リリース前�E確認事頁E
リリース前に以下�EチェチE��リストを確認してください�E�E
- [ ] 環墁E��数が正しく設定されてぁE��ぁE- [ ] 全画面の動作確誁E- [ ] 翻訳漏れの確認！ERELEASE_CHECKLIST.md` 参�E�E�E- [ ] パフォーマンスチE��チE- [ ] セキュリチE��チェチE��

詳細は [RELEASE_CHECKLIST.md](./RELEASE_CHECKLIST.md) を参照してください、E
---

最終更新: 2026-01-03

