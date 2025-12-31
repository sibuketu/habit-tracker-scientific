# 動画生成戦略とテンプレート選択ロジック

## 基本方針

### 1. ロング動画とショート動画を分けて作る

- **ロング動画（YouTube用）**: 5-10分、テンプレート「Explainer Video」または「Learning & Development」
- **ショート動画（TikTok/Instagram用）**: 30-60秒、テンプレート「Social Media」
- **ショート動画の作り方**: ロング動画の切り抜きを使用（同じ内容を短く）

### 2. 言語選択

**推奨**: **英語で行くのがベスト**
- 理由:
  - グローバルに広がる（カーニボアは世界的なムーブメント）
  - 英語圏の専門家（Dr. Anthony Chaffee、Dr. Ken Berry等）が多い
  - YouTube、TikTok、Instagramで英語コンテンツの方がリーチが広い
  - 日本語字幕を後から追加可能

**代替案**: 多言語対応
- 英語版をメインに作成
- 日本語、フランス語、ドイツ語版も作成（同じスクリプトを翻訳）

### 3. テンプレート選択ロジック

#### ロング動画（YouTube用）

**推奨テンプレート**:
1. **「Explainer Video」**（最優先）
   - 理由: カーニボアダイエットの説明・教育コンテンツに最適
   - 特徴: プロフェッショナルな説明動画スタイル
   - 使用例: 「カーニボアダイエットとは？」「なぜカーニボアが健康に良いのか？」

2. **「Learning & Development」**（次点）
   - 理由: 教育・学習コンテンツ向け
   - 特徴: 講義スタイル、知識共有に適している
   - 使用例: 「カーニボアダイエットの栄養学」「カーニボアの科学的根拠」

3. **「Business」**（ビジネス向けの場合）
   - 理由: 専門家としての信頼性を高める
   - 特徴: プレゼンテーションスタイル
   - 使用例: 「カーニボアダイエットの効果」「カーニボアの実践方法」

#### ショート動画（TikTok/Instagram用）

**推奨テンプレート**:
1. **「Social Media」**（最優先）
   - 理由: SNS向けに最適化されている
   - 特徴: エンタメ性が高い、視覚的にインパクトがある
   - 使用例: 「カーニボアダイエットの3つのメリット」「カーニボアで痩せた話」

2. **「Advertisement」**（次点）
   - 理由: インパクトのある広告スタイル
   - 特徴: 短時間でメッセージを伝える
   - 使用例: 「カーニボアダイエットを始めよう」「カーニボアで健康になろう」

#### 反論動画（カウンター動画）

**推奨テンプレート**:
1. **「Breaking News」**（最優先）
   - 理由: ニューススタイルで「事実を伝える」印象を与える
   - 特徴: 緊迫感、信頼性
   - 使用例: 「カーニボア批判への反論」「植物性食品の真実」

2. **「Explainer Video」**（次点）
   - 理由: 論理的に説明するスタイル
   - 特徴: 科学的根拠を示すのに適している
   - 使用例: 「カーニボア批判の間違い」「研究データで見るカーニボア」

---

## テンプレート選択の自動化ロジック

### コンテンツタイプ別のテンプレート選択

```typescript
export type ContentType = 
  | 'explainer' // 説明動画
  | 'counter' // 反論動画
  | 'testimonial' // 体験談
  | 'educational' // 教育動画
  | 'entertainment'; // エンタメ動画

export type VideoType = 'long' | 'short';

export interface TemplateSelection {
  template: string;
  category: string;
  orientation: 'landscape' | 'portrait';
  style: string;
  reason: string;
}

export function selectTemplate(
  contentType: ContentType,
  videoType: VideoType,
  platform: 'youtube' | 'tiktok' | 'instagram'
): TemplateSelection {
  if (videoType === 'long') {
    // ロング動画（YouTube用）
    if (contentType === 'explainer' || contentType === 'educational') {
      return {
        template: 'Explainer Video',
        category: 'Explainer Video',
        orientation: 'landscape',
        style: 'professional',
        reason: 'カーニボアダイエットの説明・教育コンテンツに最適。プロフェッショナルな説明動画スタイル。'
      };
    }
    if (contentType === 'counter') {
      return {
        template: 'Breaking News',
        category: 'Advertisement',
        orientation: 'landscape',
        style: 'news',
        reason: 'ニューススタイルで「事実を伝える」印象を与える。カウンター動画に最適。'
      };
    }
    // デフォルト
    return {
      template: 'Explainer Video',
      category: 'Explainer Video',
      orientation: 'landscape',
      style: 'professional',
      reason: 'デフォルト: 説明動画スタイル'
    };
  } else {
    // ショート動画（TikTok/Instagram用）
    if (contentType === 'entertainment' || contentType === 'testimonial') {
      return {
        template: 'Social Template',
        category: 'Social Media',
        orientation: 'portrait',
        style: 'entertainment',
        reason: 'SNS向けに最適化されている。エンタメ性が高い。'
      };
    }
    if (contentType === 'counter') {
      return {
        template: 'Breaking News',
        category: 'Advertisement',
        orientation: 'portrait',
        style: 'news',
        reason: 'ニューススタイルでインパクトのある反論動画。'
      };
    }
    // デフォルト
    return {
      template: 'Social Template',
      category: 'Social Media',
      orientation: 'portrait',
      style: 'entertainment',
      reason: 'デフォルト: SNS向けエンタメスタイル'
    };
  }
}
```

---

## 動画生成のワークフロー

### 1. ロング動画を作成

1. **スクリプト生成**（5-10分用、英語）
2. **テンプレート選択**: 「Explainer Video」または「Learning & Development」
3. **動画生成**: HeyGenでロング動画を生成
4. **保存**: YouTube用として保存

### 2. ロング動画からショート動画を作成（切り抜き）

1. **ロング動画を分析**: 最もインパクトのある部分を特定
2. **ショート動画用スクリプト生成**: 30-60秒用に要約
3. **テンプレート選択**: 「Social Media」
4. **動画生成**: 同じ内容を短くしたバージョンを生成
5. **保存**: TikTok/Instagram用として保存

---

## 複数選択肢の提案

### 選択肢A: 英語メイン + 多言語対応（推奨）

**メリット**:
- グローバルに広がる
- 英語圏の専門家が多い
- リーチが広い

**デメリット**:
- 日本語ユーザーには字幕が必要

**実装**:
- 英語版をメインに作成
- 日本語、フランス語、ドイツ語版も作成（同じスクリプトを翻訳）

### 選択肢B: 日本語メイン + 英語版も作成

**メリット**:
- 日本語ユーザーに直接届く
- 日本のカーニボアコミュニティに響く

**デメリット**:
- グローバルリーチが限定的

**実装**:
- 日本語版をメインに作成
- 英語版も作成（同じスクリプトを翻訳）

### 選択肢C: 英語のみ（シンプル）

**メリット**:
- 実装が簡単
- グローバルに広がる

**デメリット**:
- 日本語ユーザーには字幕が必要

**実装**:
- 英語版のみ作成

---

## 推奨: 選択肢A（英語メイン + 多言語対応）

**理由**:
1. カーニボアは世界的なムーブメント
2. 英語圏の専門家が多い（Dr. Anthony Chaffee、Dr. Ken Berry等）
3. YouTube、TikTok、Instagramで英語コンテンツの方がリーチが広い
4. 日本語字幕を後から追加可能

**実装方針**:
- 英語版をメインに作成
- 同じスクリプトを日本語、フランス語、ドイツ語に翻訳して作成
- 各言語版を適切なプラットフォームに投稿

---

## テンプレート選択の実装

### コンテンツタイプの自動判定

```typescript
export function detectContentType(script: string, topic?: string): ContentType {
  const scriptLower = script.toLowerCase();
  
  // 反論動画のキーワード
  const counterKeywords = ['反論', '間違い', '批判', 'counter', 'myth', 'debunk', 'wrong'];
  if (counterKeywords.some(keyword => scriptLower.includes(keyword))) {
    return 'counter';
  }
  
  // 体験談のキーワード
  const testimonialKeywords = ['体験', '実践', '結果', 'testimonial', 'experience', 'result'];
  if (testimonialKeywords.some(keyword => scriptLower.includes(keyword))) {
    return 'testimonial';
  }
  
  // 教育動画のキーワード
  const educationalKeywords = ['学ぶ', '学習', '教育', 'learn', 'education', 'how to'];
  if (educationalKeywords.some(keyword => scriptLower.includes(keyword))) {
    return 'educational';
  }
  
  // エンタメ動画のキーワード
  const entertainmentKeywords = ['面白い', '驚き', 'fun', 'amazing', 'wow'];
  if (entertainmentKeywords.some(keyword => scriptLower.includes(keyword))) {
    return 'entertainment';
  }
  
  // デフォルト: 説明動画
  return 'explainer';
}
```

---

## 次のステップ

1. **テンプレート選択ロジックの実装**
   - `selectTemplate`関数を実装
   - `detectContentType`関数を実装

2. **動画生成UIの実装**
   - コンテンツタイプ選択
   - ロング/ショート選択
   - 言語選択（英語推奨）
   - テンプレート自動選択

3. **ロング動画からショート動画への切り抜き機能**
   - ロング動画の分析
   - ショート動画用スクリプト生成
   - テンプレート自動選択

