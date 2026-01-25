# Future Features - Post Initial Release

> **Label/Tag**: `#future-features` `#post-release` `#recommended-menu` `#transition-features`
> **Purpose**: Features to implement after initial release
> **Last Updated**: 2026-01-20

## 🎯 初期リリース後に追加する機�E

### 1. 推奨メニュー機�E (Recommended Menu Feature)
**Status**: ⏳ 未実裁E���E期リリース後に追加�E�E

**目皁E*: 
- 移行中の人向けに、栁E��素目標値を満たすための推奨メニューを提桁E
- 他�Eアプリ�E�EyFitnessPal等）にある機�Eを参老E��実裁E

**実裁E�E容**:
- 不足してぁE��栁E��素に基づぁE��、推奨食品を提桁E
- 移行期間中は特に電解質�E�ナトリウム、カリウム、�Eグネシウム�E��E推奨メニューを優先表示
- AIチャチE��との連携で、ユーザーの状態に応じた推奨メニューを生戁E

**参老E*: 他�Eアプリで推奨メニュー機�Eがあるが、このアプリでは初期リリースでは妥協し、後で追加する方釁E

---

### 2. 移行機�Eの詳細実裁E(Transition Features - Detailed Implementation)
**Status**: ⏳ 基本実裁E�Eみ�E�詳細機�Eは初期リリース後に追加�E�E

**現状**:
- ✁E基本実裁E��み: `TransitionBanner`, `TransitionGuideModal`
- ❁E未実裁E 痁E��の自動検�E、日次チェチE��イン、症状の記録・追跡

**初期リリース後に追加する機�E**:

#### 2.1 痁E��の自動検�E・提案機�E�E�最優先！E
- AIチャチE��に「今日頭痛がする」「こむら返りが起きた」と話しかける
- AIが症状を検�Eし、対応する栁E��素調整を�E動提桁E
- 栁E��素目標値の自動調整�E�例：頭痛�Eナトリウム+2000mg�E�E

#### 2.2 日次チェチE��イン機�E�E�高優先度�E�E
- 移行期間中、毎日自動でチェチE��インを俁E��通知
- 簡単な質問（「今日の調子�E�E�」「症状はある�E�」！E
- AIが回答を解析し、忁E��に応じて栁E��素調整を提桁E

#### 2.3 痁E��の記録・追跡機�E�E�中優先度�E�E
- 痁E��の記録画面�E�簡単な選択式！E
- 痁E��の履歴表示�E�グラフ化�E�E
- 痁E��パターンの刁E���E�EIが�E動�E析！E

#### 2.4 より詳細な痁E��チE�Eタ�E�中優先度�E�E
- 痁E��チE�Eタの拡允E��現状5種類�Eみ�E�E
- 吁E��状に対する詳細な対処況E
- 痁E��の絁E��合わせへの対忁E

**参老E��キュメンチE*:
- `TRANSITION_FEATURE_REQUIREMENTS.md`
- `TRANSITION_FEATURE_RECOMMENDATIONS.md`
- `TRANSITION_FEATURE_DETAILED.md`

---

## 📝 メモ

- 初期リリースでは妥協し、後で追加する方釁E
- ラベル�E�E#future-features` `#post-release` `#recommended-menu` `#transition-features`�E�で検索可能
- こ�Eファイルを更新する際�E、忁E��ラベルを維持すること

