# CarnivOS: Project Structure Map

> **目皁E*: Claude Codeが�Eロジェクト�E体を即座に把握できるように、ファイル構造と重要な場所を�EチE�E化する、E
> **更新日**: 2026-01-11

---

## プロジェクト概要E

**プロジェクト名**: CarnivOS (Carnivore Compass)
**種顁E*: CarnivoreダイエチE��専門の栁E��管琁E�E最適化アプリ
**技術スタチE��**: React + Vite + TypeScript + Tailwind CSS + Supabase
**プラチE��フォーム**: Web (PWA), iOS (Capacitor), Android (Capacitor)

---

## チE��レクトリ構造

### ルートディレクトリ
```
primal-logic-app/
├── primal-logic-web/          # メインのWebアプリ�E�Eeact + Vite�E�E
├── android/                    # AndroidネイチE��ブコーチE
├── docs/                       # プロジェクトドキュメント�E参老E��E��
└── 設定ファイル�E�Eackage.json等！E
```

### メインアプリ (primal-logic-web/)
```
primal-logic-web/
├── src/                        # ソースコーチE
━E  ├── components/             # UIコンポ�Eネント！E0+ファイル�E�E
━E  ├── screens/                # 画面コンポ�Eネント！E0+ファイル�E�E
━E  ├── data/                   # チE�Eタベ�Eス�E�E1ファイル�E�E
━E  ├── context/                # 状態管琁E
━E  ├── hooks/                  # カスタムフック
━E  ├── constants/              # 定数
━E  └── lib/                    # ライブラリ
├── public/                     # 静的ファイル
├── docs/                       # ドキュメンチE
├── _ARCHIVE_OLD_DOCS/          # 古ぁE��キュメント（アーカイブ！E
├── .cursorrules                # Cursor用ルール
├── CLAUDE.md                   # Claude Code用ルール
├── package.json                # 依存関俁E
├── vite.config.ts              # Vite設宁E
└── playwright.config.ts        # チE��ト設宁E
```

---

## 重要ファイルの場所

### 📋 仕様�EドキュメンチE

#### マスター仕様書
- **場所**: `Carnivore_Logic_Master_Spec.md`
- **冁E��**: アプリの全体仕様、UI/UX、Logic Matrix、AI Concierge
- **更新**: 2025-12-18 ↁE**要更新**�E�実裁E��み機�Eを反映�E�E

#### 決定ログ
- **場所**: `DECISION_LOG.md`
- **冁E��**: 重要な決定事頁E��、その琁E���E�Ehy�E��E記録
- **更新**: 2026-01-11�E�最新�E�E
- **記録冁E��**: If-Then削除、Phase概念削除

#### 機�Eの意図
- **場所**: `FEATURE_INTENTS.md`
- **冁E��**: 吁E���Eの意図と目皁E��実裁E�E根拠

#### 実裁E��み機�EリスチE
- **場所**: `CURRENT_FEATURES_ACCURATE.md`
- **冁E��**: 実裁E��み機�Eの正確なリスト、未実裁E���Eの記録
- **更新**: 2026-01-03

#### 差別化�EインチE
- **場所**: `CORE_FEATURES_AND_WEAPONS.md`
- **冁E��**: 4つのコア機�E、E0個�E武器�E�差別化�Eイント！E
- **更新**: 2026-01-03

### ⚙︁E設定ファイル

#### Claude Code用ルール
- **場所**: `CLAUDE.md`
- **冁E��**: 19セクション、E60行�Eルール�E��Eロジェクト固有情報、ツール使用法、禁止事頁E��E
- **更新**: 2026-01-11�E�最新�E�E

#### Cursor用ルール
- **場所**: `.cursorrules`
- **冁E��**: 77行�Eルール�E�Eeep Thought Protocol、Neo Persona、AI Information Source Matrix�E�E

### 📊 チE�Eタファイル

#### 食品チE�Eタベ�Eス
- **場所**: `src/data/foodMaster.ts`
- **冁E��**: 食品カチE��リー、動物タイプ、E��位�E定義
- **サイズ**: 紁E00衁E

#### 栁E��素チE�Eタベ�Eス
- **場所**: `src/data/foodsDatabase.ts`
- **冁E��**: 12,000+食品の栁E��素チE�Eタ
- **サイズ**: 大規模

#### 推奨栁E��素目標値
- **場所**: `src/data/carnivoreTargets.ts`
- **冁E��**: カーニ�Eア推奨の栁E��素目標値、バイオアベイラビリチE��係数

#### 科学皁E��拠
- **場所**: `src/data/argumentCards.ts`
- **冁E��**: カーニ�EアダイエチE��の科学皁E��拠、論破カーチE

#### 移行ガイチE
- **場所**: `src/data/transitionGuide.ts`
- **冁E��**: カーニ�Eア移行期間�EガイチE

---

## コンポ�Eネント構�E

### 🖼�E�EUIコンポ�EネンチE(src/components/)

#### Butcher UI
- **ButcherSelect.tsx**: 動物タイプ�E部位選択UI
- **ButcherChart.tsx**: 解剖図表示
- **InteractiveButcher.tsx**: インタラクチE��ブな解剖図

#### ゲージ
- **NutrientGauge.tsx**: 4ゾーングラチE�Eションゲージ
- **PFRatioGauge.tsx**: P:F比率ゲージ
- **CalciumPhosphorusRatioGauge.tsx**: Ca:P比率ゲージ
- **GlycineMethionineRatioGauge.tsx**: Gly:Met比率ゲージ
- **OmegaRatioGauge.tsx**: Omega 3/6比率ゲージ

#### AI機�E
- **AISpeedDial.tsx**: AI機�EのクイチE��アクセス
- **PhotoAnalysisModal.tsx**: 写真解析UI
- **SymptomChecker.tsx**: 痁E��チェチE��ー

#### そ�E仁E
- **ArgumentCard.tsx**: 科学皁E��拠の表示
- **StreakCalendar.tsx**: 連続日数カレンダー
- **PrimalBonfire.tsx**: Bonfire効果�E可視化

### 📱 画面コンポ�EネンチE(src/screens/)

#### メイン画面
- **HomeScreen.tsx**: メインダチE��ュボ�Eド！E3,573バイト！E
- **InputScreen.tsx**: 食事�E力画面
- **HistoryScreen.tsx**: 履歴管琁E��E0,379バイト！E

#### 設定�Eプロファイル
- **ProfileScreen.tsx**: プロファイル設宁E
- **SettingsScreen.tsx**: 設定画面
- **NutrientTargetCustomizationScreen.tsx**: 栁E��素目標値カスタマイズ

#### そ�E仁E
- **DiaryScreen.tsx**: 日記�E記録
- **StatsScreen.tsx**: 統計�EグラチE
- **KnowledgeScreen.tsx**: 知識�Eース
- **GiftScreen.tsx**: ギフト機�E�E�E5,823バイト！E
- **LabsScreen.tsx**: 実験室機�E

---

## チE�Eタフロー

### 状態管琁E
- **AppContext.tsx**: グローバル状態（ユーザー設定、認証状態など�E�E
- **NutritionContext.tsx**: 栁E��素関連の状態（食事記録、目標値など�E�E

### カスタムフック
- **useNutrition.ts**: 栁E��素計算ロジチE��
- **useSettings.ts**: 設定管琁E
- **useUserConfig.ts**: ユーザー設定管琁E

---

## 技術スタチE��

### フロントエンチE
- **Framework**: React 19.2.0 + TypeScript 5.9.3
- **Build Tool**: Vite 7.2.4
- **Styling**: Tailwind CSS 4.1.18
- **Icons**: Lucide React
- **PWA**: vite-plugin-pwa 1.2.0

### 外部API統吁E
- **Google Gemini API**: AI機�E�E��E真解析、チャチE���E�E
- **Supabase**: バックアチE�E・クラウド同期（オプション�E�E
- **OpenWeatherMap**: 天気情報�E�オプション、未実裁E��E

### チE��ト�E品質管琁E
- **E2E Testing**: Playwright 1.57.0
- **Linting**: ESLint 9.39.1 + typescript-eslint

---

## ビルド�EチE�Eロイ

### 開発サーバ�E
```bash
npm run dev     # 開発サーバ�E起勁E
```

### ビルチE
```bash
npm run build   # プロダクションビルチE
npm run preview # ビルド結果のプレビュー
```

### チE��チE
```bash
npm run lint    # LintチェチE��
npm run test    # PlaywrightチE��チE
```

### チE�Eロイ
- **Web牁E*: Netlifyに自動デプロイ対忁E
- **iOS牁E*: Capacitor設定済み
- **Android牁E*: ネイチE��ブコード準備中

---

## 開発ワークフロー

### 1. 機�E実裁E��
1. `Carnivore_Logic_Master_Spec.md` を読む
2. `CURRENT_FEATURES_ACCURATE.md` で実裁E��況を確誁E
3. `FEATURE_INTENTS.md` で機�Eの意図を確誁E

### 2. 実裁E��
1. `CLAUDE.md` のルールに従う
2. 専用チE�Eル�E�Elob, Grep, Read, Edit, Write�E�を使用
3. 技術的な詳細は自律的に解決

### 3. 実裁E��E
1. `npm run lint` でチェチE��
2. `npm run build` でビルド確誁E
3. `DECISION_LOG.md` に決定事頁E��琁E��を記録
4. 実裁E��況を `CURRENT_FEATURES_ACCURATE.md` に反映

---

## アーカイチE

### 古ぁE��キュメンチE
- **場所**: `_ARCHIVE_OLD_DOCS/`
- **冁E��**: 重褁E��てぁE��年収予測、価格戦略、Geminiプロンプトの旧バ�Eジョン
- **琁E��**: 整琁E�Eため、削除ではなくアーカイチE

---

## 重要な注意事頁E

### ❁EめE��てはぁE��なぁE��と
1. **Phase概念の使用**: 「Phase 1」などの表現禁止
2. **If-Then機�Eの実裁E*: 習�E化アプリの機�Eは実裁E��なぁE
3. **習�E化アプリ混在**: Carnivoreアプリに関係なぁE��報を混ぜなぁE
4. **技術用語でユーザーに報呁E*: 非エンジニア向けの言葉で報呁E
5. **ドキュメント更新忘れ**: 決定事頁E�E忁E��記録

### ✁E忁E��めE��こと
1. **起動確誁E*: 実裁E���E忁E��動作確誁E
2. **決定�E記録**: `DECISION_LOG.md` に琁E��を含めて記録
3. **専用チE�Eル使用**: Bash ではなぁERead/Edit/Write/Glob/Grep を使用
4. **5つの関門通過**: UX, Carnivore, Security, Efficiency, Goal

---

最終更新: 2026-01-11

