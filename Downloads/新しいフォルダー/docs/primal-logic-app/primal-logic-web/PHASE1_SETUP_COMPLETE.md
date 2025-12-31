# Phase 1 (MVP) - セットアップ完了

## ✅ 完了した作業

### 1. Tailwind CSS の設定
- ✅ Tailwind CSS、PostCSS、Autoprefixer をインストール
- ✅ `tailwind.config.js` を作成し、カーニボアらしい配色を定義:
  - **Stone系**: `carnivore-stone-50` ~ `carnivore-stone-900`
  - **Red系**: `carnivore-red-50` ~ `carnivore-red-900`
  - **Zinc系**: `carnivore-zinc-50` ~ `carnivore-zinc-900`
- ✅ `postcss.config.js` を作成
- ✅ `src/index.css` に Tailwind ディレクティブを追加

### 2. ディレクトリ構成の整理
- ✅ `src/logic/` ディレクトリを作成（Logic Engine用）
- ✅ `src/components/butcher/` ディレクトリを作成（Interactive Butcher用）
- ✅ 既存のディレクトリ構造を維持:
  - `src/data/` - データベース
  - `src/components/` - UIコンポーネント
  - `src/screens/` - 画面コンポーネント
  - `src/utils/` - ユーティリティ関数
  - `src/context/` - React Context
  - `src/hooks/` - カスタムフック
  - `src/types/` - TypeScript型定義

### 3. ナビゲーションの枠組み
- ✅ 既存のナビゲーションを確認:
  - **ホーム** (`home`)
  - **入力** (`input`)
  - **履歴** (`history`)
  - **知識** (`knowledge`)
  - **プロファイル** (`profile`)
- ✅ ボトムナビゲーションが正しく動作することを確認

### 4. エラー確認
- ✅ リンターエラー: `@tailwind` ディレクティブに関する警告のみ（動作には影響なし）
- ✅ 既存のコードが正常に動作することを確認
- ✅ Tailwind CSS のテストコンポーネント (`TailwindTest.tsx`) を作成

---

## 📁 ディレクトリ構成

```
primal-logic-web/
├── src/
│   ├── components/
│   │   ├── butcher/          # Interactive Butcher関連（新規）
│   │   ├── AIFloatButton.tsx
│   │   ├── ArgumentCard.tsx
│   │   ├── InteractiveButcher.tsx
│   │   ├── NutrientGauge.tsx
│   │   └── TailwindTest.tsx   # テスト用（新規）
│   ├── data/                  # データベース
│   ├── logic/                 # Logic Engine（新規）
│   ├── screens/               # 画面コンポーネント
│   ├── utils/                 # ユーティリティ関数
│   ├── context/               # React Context
│   ├── hooks/                 # カスタムフック
│   ├── types/                 # TypeScript型定義
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css              # Tailwind CSS ディレクティブ追加
├── tailwind.config.js         # Tailwind設定（新規）
├── postcss.config.js          # PostCSS設定（新規）
└── package.json               # Tailwind CSS依存関係追加
```

---

## 🎨 カスタムカラーパレット

### 使用例

```tsx
// Stone系
<div className="bg-carnivore-stone-100 text-carnivore-stone-800">
  Stone background
</div>

// Red系
<button className="bg-carnivore-red-600 hover:bg-carnivore-red-700">
  Red button
</button>

// Zinc系
<div className="border-carnivore-zinc-300 text-carnivore-zinc-700">
  Zinc border
</div>
```

---

## 🚀 次のステップ

### Phase 1 の残りのタスク:
1. ⏳ P:F Ratio ゲージの実装（ホーム画面の最上部に常時表示）
2. ⏳ "いつもの" タブの実装（History Copy機能）
3. ⏳ Fuzzy Data（栄養素の幅）の実装

### Phase 2 の準備:
- Logic Engine（Dynamic Optimization）の実装
- Weather API 統合

---

## 📝 注意事項

- 既存のCSS Modules（`.css`ファイル）はそのまま動作します
- Tailwind CSS と既存のCSSは併用可能です
- 段階的にTailwind CSSに移行することを推奨します

---

**セットアップ完了日**: 2024年（現在）

