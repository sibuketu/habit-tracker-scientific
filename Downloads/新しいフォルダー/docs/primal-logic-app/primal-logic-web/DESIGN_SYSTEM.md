# Primal Logic デザインシステム

## デザインテーマの決め方

### コンセプト
**「Natural Premium（自然なプレミアム感）」**

カーニボアダイエットの本質:
- シンプルで純粋（動物性食品のみ）
- 自然で健康的
- 科学的根拠に基づく
- プレミアムな体験

### カラーパレット（新）

#### プライマリカラー
- **Accent Primary**: `#C41E3A`（深みのある赤、肉の色）
- **Accent Secondary**: `#8B4513`（サドルブラウン、温かみ）
- **Accent Tertiary**: `#D4AF37`（ゴールドアクセント）

#### ニュートラルカラー
- **Background**: `#FAFAF9`（ストーン50、柔らかい白）
- **Surface**: `#F5F5F4`（ストーン100、わずかに色のある白）
- **Elevated Surface**: `#FFFFFF`（純白）
- **Border**: `#E7E5E4`（ストーン200、柔らかいグレー）
- **Text Primary**: `#1C1917`（ストーン900、深いグレー）
- **Text Secondary**: `#78716C`（ストーン500、ミディアムグレー）
- **Text Tertiary**: `#A8A29E`（ストーン400、ライトグレー）

#### セマンティックカラー
- **Success**: `#10B981`（エメラルドグリーン、自然な緑）
- **Warning**: `#F59E0B`（アンバー、温かみのあるオレンジ）
- **Error**: `#EF4444`（ソフトレッド、注意を引くが上品）

#### グラデーション
- **Primary Gradient**: `linear-gradient(135deg, #C41E3A 0%, #8B4513 100%)`
- **Success Gradient**: `linear-gradient(135deg, #10B981 0%, #059669 100%)`
- **Elevation Shadow**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`

### タイポグラフィ

#### フォントファミリー
- **Primary**: `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`
- **Weight**: 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)

#### フォントサイズスケール
- **Display**: 32px (2rem) - 大きな見出し
- **H1**: 24px (1.5rem) - 画面タイトル
- **H2**: 20px (1.25rem) - セクションタイトル
- **H3**: 18px (1.125rem) - サブセクション
- **Body Large**: 16px (1rem) - 本文（強調）
- **Body**: 14px (0.875rem) - 本文（標準）
- **Body Small**: 12px (0.75rem) - 補足テキスト
- **Caption**: 11px (0.6875rem) - キャプション

### スペーシング

#### スペーススケール（4pxベース）
- **xs**: 4px (0.25rem)
- **sm**: 8px (0.5rem)
- **md**: 12px (0.75rem)
- **base**: 16px (1rem)
- **lg**: 24px (1.5rem)
- **xl**: 32px (2rem)
- **2xl**: 48px (3rem)

### コンポーネントスタイル

#### カード
```css
.card {
  background: #FFFFFF;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  border: 1px solid #E7E5E4;
}

.card-elevated {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
```

#### ボタン
```css
.btn-primary {
  background: linear-gradient(135deg, #C41E3A 0%, #8B4513 100%);
  color: #FFFFFF;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  box-shadow: 0 2px 4px rgba(196, 30, 58, 0.2);
  transition: all 0.2s ease;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(196, 30, 58, 0.3);
}

.btn-secondary {
  background: #FFFFFF;
  color: #1C1917;
  border: 1px solid #E7E5E4;
  border-radius: 12px;
  padding: 0.75rem 1.5rem;
  font-weight: 500;
}
```

#### 入力フィールド
```css
.input {
  background: #FFFFFF;
  border: 1.5px solid #E7E5E4;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  font-size: 16px;
  transition: all 0.2s ease;
}

.input:focus {
  border-color: #C41E3A;
  outline: none;
  box-shadow: 0 0 0 3px rgba(196, 30, 58, 0.1);
}
```

### アニメーション

#### トランジション
- **Fast**: 150ms
- **Base**: 200ms
- **Slow**: 300ms

#### イージング
- **Default**: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Ease-out**: `cubic-bezier(0, 0, 0.2, 1)`
- **Ease-in**: `cubic-bezier(0.4, 0, 1, 1)`

### エレベーション（シャドウ）

- **Level 0**: No shadow (flat)
- **Level 1**: `0 1px 3px rgba(0, 0, 0, 0.1)`
- **Level 2**: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`
- **Level 3**: `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
- **Level 4**: `0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)`

### 適用方針

1. **段階的適用**: 既存UIを壊さないよう、段階的に適用
2. **CSS変数化**: `index.css`のCSS変数を更新
3. **コンポーネント単位**: 各コンポーネントを順次更新
4. **後方互換性**: 既存のスタイルを保持しつつ、新スタイルを追加

