# アプリアイコンデザインガイド

## 2025年版 アプリアイコンデザインのベストプラクティス

## 1. デザインの基本原則

### 1.1 シンプルさと識別性
- **シンプルなデザイン**: 小さなサイズでも認識できるよう、複雑な要素を避ける
- **識別性**: 他のアプリアイコンと差別化できる独自性
- **スケーラビリティ**: 様々なサイズ（16x16から1024x1024まで）で美しく見える

### 1.2 視覚的階層
- **メイン要素**: 最も重要な要素（CarnivoreGuidの場合は「肉」）を明確に
- **サブ要素**: 健康管理アプリらしい要素（グラフ、チェックマークなど）を補助的に
- **バランス**: 要素の配置とサイズのバランス

### 1.3 色彩とコントラスト
- **コントラスト**: 背景とのコントラストを確保（特にダークモード対応）
- **色彩の意味**: 肉の赤、健康の緑、データの青など、意味のある色を使用
- **アクセシビリティ**: 色覚多様性に対応したコントラスト比を確保

## 2. 技術的要件

### 2.1 サイズとフォーマット
- **iOS**: 
  - 1024x1024px（App Store用）
  - 各種サイズ（20pt, 29pt, 40pt, 60pt, 76pt, 83.5pt）
  - PNG形式、アルファチャンネル対応
- **Android**:
  - 512x512px（Google Play用）
  - 各種密度（mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi）
  - PNG形式、背景透過可能

### 2.2 安全領域
- **コーナーラウンド**: iOSとAndroidの角丸に対応
- **パディング**: 端から10-15%の安全領域を確保
- **重要な要素**: 中央に配置し、端に重要な要素を置かない

## 3. CarnivoreGuidアプリアイコンのデザイン方針

### 3.1 必須要素
- **肉の写真**: ステーキ、ハンバーグ、焼き肉など、必ず肉を含める
- **健康管理の要素**: グラフ、チェックマーク、ハートなど
- **シンプルさ**: 小さなサイズでも認識できるよう、要素を絞る

### 3.2 デザインパターン例

#### パターン1: メイン要素（肉）+ サブ要素（グラフ）
- 中央に肉の写真
- 下部または背景に健康管理のグラフやアイコン
- 例: 「Carnivore Health」スタイル

#### パターン2: シンボル化された肉 + 健康アイコン
- 肉をシンボル化（アイコン化）
- 健康管理のアイコン（ハート、チェックマークなど）を組み合わせ
- 例: 「Heart & Meat」スタイル

#### パターン3: カレンダー/トラッキング要素 + 肉
- カレンダーやトラッキングの要素を背景に
- 肉を前面に配置
- 例: 「Meat Daily」スタイル

### 3.3 色彩パレット
- **メインカラー**: 肉の赤（#8B0000, #DC143Cなど）
- **アクセントカラー**: 健康の緑（#228B22, #32CD32など）
- **背景**: 白、ダークグレー、または肉の色に合う色

## 4. 生成時のプロンプト改善

### 4.1 構造化プロンプト（XML形式）
```xml
<app_icon_generation>
  <requirements>
    <must_have>
      - Meat photograph (steak, hamburger, grilled meat, etc.)
      - Health management element (graph, checkmark, heart, etc.)
      - Simple design that is recognizable at small sizes
    </must_have>
    <design_principles>
      - Visual hierarchy: Main element (meat) clearly visible
      - Scalability: Beautiful at various sizes (16x16 to 1024x1024)
      - Contrast: High contrast for accessibility
    </design_principles>
  </requirements>
  
  <style>
    <pattern>Main element (meat) + Sub element (health icon)</pattern>
    <color_palette>
      - Main: Meat red (#8B0000, #DC143C)
      - Accent: Health green (#228B22, #32CD32)
      - Background: White, dark grey, or complementary color
    </color_palette>
    <safe_area>10-15% padding from edges</safe_area>
  </style>
  
  <technical_specs>
    <size>1024x1024px</size>
    <format>PNG with alpha channel</format>
    <corner_radius>iOS and Android compatible</corner_radius>
  </technical_specs>
</app_icon_generation>
```

### 4.2 改善されたプロンプト（自然言語版）
```
Carnivore専用健康管理アプリのアプリアイコンを生成してください。

【必須要件】
- 肉の写真を必ず含める（ステーキ、ハンバーグ、焼き肉など）
- 健康管理アプリらしい要素（グラフ、チェックマーク、ハートなど）を含める
- シンプルで識別性の高いデザイン
- 小さなサイズ（16x16px）でも認識できるよう、要素を絞る

【デザイン原則】
- 視覚的階層: メイン要素（肉）を明確に、サブ要素（健康管理）を補助的に
- スケーラビリティ: 様々なサイズで美しく見える
- コントラスト: 背景とのコントラストを確保（ダークモード対応）
- 安全領域: 端から10-15%のパディングを確保

【色彩】
- メインカラー: 肉の赤（#8B0000, #DC143Cなど）
- アクセントカラー: 健康の緑（#228B22, #32CD32など）
- 背景: 白、ダークグレー、または肉の色に合う色

【技術仕様】
- サイズ: 1024x1024px
- フォーマット: PNG（アルファチャンネル対応）
- 角丸: iOSとAndroidの角丸に対応

【バリエーション例】
- パターン1: 中央に肉の写真、下部に健康管理のグラフ
- パターン2: シンボル化された肉 + 健康アイコン（ハート、チェックマーク）
- パターン3: カレンダー/トラッキング要素 + 肉

大量に生成してください。
```

## 5. 生成ツールとワークフロー

### 5.1 推奨ツール
- **GeminiNanobanana**: Googleの画像生成モデル（複数の画像を融合、キャラクターの一貫性を保った編集が可能）
- **Canva**: デザインテンプレートと素材を使用
- **Adobe Illustrator**: ベクター形式での作成（スケーラビリティが高い）

### 5.2 ワークフロー
1. **プロンプトで大量生成**: GeminiNanobananaで複数のバリエーションを生成
2. **選別**: デザイン原則に基づいて選別
3. **調整**: CanvaやIllustratorで微調整
4. **サイズ最適化**: 各プラットフォーム用のサイズに最適化
5. **テスト**: 実際のデバイスで表示確認

## 6. 参考資料

- [Apple Human Interface Guidelines - App Icons](https://developer.apple.com/design/human-interface-guidelines/app-icons)
- [Material Design - App Icons](https://m3.material.io/styles/icons/app-icons)
- [App Icon Generator](https://www.appicongenerator.org/)

