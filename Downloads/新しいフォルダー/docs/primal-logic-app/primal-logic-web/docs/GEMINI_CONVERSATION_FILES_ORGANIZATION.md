# Geminiとの会話ファイル整理方法

## 現在の状況

### Gemini関連ファイル一覧

**ルートディレクトリ**:
- [CARNIVOS_GEMINI_CONVERSATION_SUMMARY.md](CARNIVOS_GEMINI_CONVERSATION_SUMMARY.md) - 会話まとめ
- [GEMINI_API_SETUP.md](GEMINI_API_SETUP.md) - API設定
- [GEMINI_CAMERA_FEATURE_PROMPT.md](GEMINI_CAMERA_FEATURE_PROMPT.md) - カメラ機能プロンプト
- [GEMINI_CAMERA_FILES_TO_SEND.md](GEMINI_CAMERA_FILES_TO_SEND.md) - 送信ファイル一覧
- [GEMINI_CAMERA_PROMPT_COMPLETE.md](GEMINI_CAMERA_PROMPT_COMPLETE.md) - カメラプロンプト完成版
- [GEMINI_FEATURES_TO_IMPLEMENT.md](GEMINI_FEATURES_TO_IMPLEMENT.md) - 実装予定機能
- [GEMINI_UI_IMPLEMENTATION_PLAN.md](GEMINI_UI_IMPLEMENTATION_PLAN.md) - UI実装計画

**docsディレクトリ**: なし

**アーカイブ**:
- `_ARCHIVE_OLD_DOCS/GEMINI_CAMERA_PROMPT_COPY_PASTE_FINAL.md`
- `_ARCHIVE_OLD_DOCS/GEMINI_CAMERA_PROMPT_COPY_PASTE.md`

## 問題点

1. **原文がない**: 会話の原文が保存されていない
2. **まとめのみ**: `CARNIVOS_GEMINI_CONVERSATION_SUMMARY.md` はまとめのみ
3. **アイデアの欠落リスク**: まとめに含まれていないアイデアがある可能性

## 推奨される保存方法

### 方法1: 原文とまとめを分けて保存（推奨）

```
docs/gemini-conversations/
  ├── original/
  │   ├── 2026-01-XX-conversation-1.md (原文)
  │   ├── 2026-01-XX-conversation-2.md (原文)
  │   └── ...
  └── summaries/
      ├── CARNIVOS_GEMINI_CONVERSATION_SUMMARY.md (既存のまとめ)
      └── 2026-01-XX-summary.md (日付別まとめ)
```

### 方法2: 1ファイルに原文とまとめを両方保存

```
docs/gemini-conversations/
  ├── 2026-01-XX-conversation.md
  │   ├── # 原文
  │   │   (会話の全文)
  │   └── # まとめ
  │       (決定事項とアイデア)
```

## 不足食材の色分けアイデア

### 現在の実装状況

**栄養素の色分け**: 実装済み
- `getColorByPercent()`: 不足/適正/過剰で色を変更
- 赤: 不足（<70%）
- オレンジ: 警告（70-100%）
- 緑: 適正（100-120%）

**食品の色分け**: 未実装
- `NUTRIENT_GAUGE_REQUIREMENTS_HANDOFF.md` に記載あり
- 優先度: 低（今後のアプデで検討）

### 実装予定の機能

```typescript
// 不足栄養素に基づいて推奨食品をハイライト
const recommendedFoods = getRecommendedFoods(missingNutrients);
// ButcherSelectやInputScreenで色分け表示
```

## 次のステップ

1. **原文の保存**: 今後のGeminiとの会話は原文も保存
2. **既存会話の確認**: 既存の会話ログがあれば保存
3. **アイデアの再確認**: まとめに含まれていないアイデアがないか確認
