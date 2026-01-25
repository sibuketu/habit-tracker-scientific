# SNS自動化�E�次めE��ことガイチE

> **目皁E*: 次に何をめE��か迷った時に見るガイチE 
> **更新**: 進捗に応じて更新

---

## 🎯 現在地と次にめE��こと

### 現状�E�E026-01-20�E�E
- ✁EX (Twitter)自動化から除夁EↁE手動投稿リストに追加完亁E
- ✁EAgent 2への引き継ぎ賁E��更新完亁E
- ⏳ Agent 1: 過激HookコンチE��チE��成！E/21開始予定！E
- ⏳ Agent 2: SNS自動投稿シスチE��構築（未開始！E

---

## 📋 次にめE��こと�E�優先頁E��頁E��E

### 1. Agent 1を起動！E/21開始！E

**めE��こと**:
1. `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` で状態を「🔁E実行中」に更新
2. 過激HookコンチE��チE��成を開姁E
   - ニュース/トレンド収雁E
   - Hook生�E�E�「野菜�E毒！」系�E�E
   - 科学皁E��拠の絁E��込み
   - 1日3本のコンチE��チE��戁E
3. 1日目の3本を生成！E/21�E�E

**参�Eファイル**:
- `second-brain/SNS_めE��こと.md` - Obsidian管琁E�E「やること」リスチE
- `SNS_HOOK_CONTENT_PLAN.md` - コンチE��チE��成計画

---

### 2. Agent 2を起動！Egent 1と並行可�E�E

**めE��こと**:
1. `second-brain/AGENTS/AGENT_2_START_GUIDE.md` を読む
2. `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` を読む
3. Supabase Functions構築を開姁E
   - チE��レクトリ構造作�E
   - 共通型定義作�E
   - orchestrator Function実裁E
   - 各SNS投稿Function実裁E��EプラチE��フォーム�E�E

**参�Eファイル**:
- `second-brain/AGENTS/AGENT_2_START_GUIDE.md` - Agent 2起動手頁E
- `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` - 詳細な引き継ぎ賁E��

---

### 3. X (Twitter)手動投稿の準備

**めE��こと**:
1. `second-brain/SNS_手動投稿リスチEmd` を確誁E
2. Agent 2が生成する投稿URLリスト�E形式を確誁E
3. 手動投稿用のチE��プレートを準備�E�任意！E

**参�Eファイル**:
- `second-brain/SNS_手動投稿リスチEmd` - 手動投稿リスチE

---

## 🔄 作業フロー

```mermaid
graph TD
    A[1/21開始] --> B[Agent 1: コンチE��チE��成開始]
    A --> C[Agent 2: Supabase Functions構築開始]
    B --> D[1日3本のコンチE��チE��成]
    C --> E[6プラチE��フォーム自動投稿実裁E
    D --> F[Agent 2にコンチE��チE��渡す]
    E --> F
    F --> G[自動投稿実行]
    G --> H[X手動投稿]
```

---

## 📚 全体像

### Agent 1の役割
- 過激HookコンチE��チE��戁E
- ニュース/トレンドからHookを抽出
- 科学皁E��拠を絁E��込む
- 1日3本 ÁE14日閁E= 42本

### Agent 2の役割
- Supabase Functions構篁E
- 動画生�E�E�EeyGen API�E�E
- 6プラチE��フォーム自動投稿�E�EouTube, Instagram, TikTok, Facebook, LinkedIn, Pinterest�E�E
- X投稿用URLリスト生戁E

### 手動作業
- X (Twitter)への投稿�E�E日3本 ÁE14日閁E= 42本�E�E
- 参�E: `second-brain/SNS_手動投稿リスチEmd`

---

## ⚠�E�E注意事頁E

1. **Agent 1/2は並行実行可能**: どちらから始めても良ぁE
2. **X投稿は後からでOK**: 自動投稿が完亁E��てから手動で投稿
3. **進捗更新**: `MULTI_AGENT_RELEASE_WORK.md` で定期皁E��状態を更新

---

**作�E日**: 2026-01-20  
**更新日**: 2026-01-20

