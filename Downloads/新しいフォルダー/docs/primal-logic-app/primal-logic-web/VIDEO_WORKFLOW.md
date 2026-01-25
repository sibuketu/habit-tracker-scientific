# 完�E自動化ワークフロー (Video Automation Factory) - 決定版

## 戦略皁E��宁E(Strategic Decision)
**「HeyGen一択」で構築します、E*

*   **Q:** HeyGenだけで行けるか�E�E
*   **A:** **行けます、E* 音声(TTS)、アバター(Visual)、口パク(Lip-sync)、字幁ECaptions)めE*1回�EAPIコール**で完結できる唯一のプラチE��フォームだからです、E
*   **琁E��:** 他ツール�E�ElevenLabs + CapCut等）をパズルのように絁E��合わせると、エラー玁E��上がり、�E動化が「よく止まる機械」になってしまぁE��す。Optimizationの観点から**HeyGenへの一本匁E*が正解です、E

## 確定ワークフロー (The Flow)

最もシンプルで堁E��なルートです、E

```mermaid
graph LR
    Step1[Input: ネタ] -->|Raw Text| Step2(Gemini 2.0)
    Step2 -->|Script JSON| Step3[日本語添削]
    Step3 -->|OK| Step4(英語翻訳)
    Step4 -->|English Script| Step5(HeyGen API)
    Step5 -->|MP4 Video| Step6[全SNS投稿]
    Step6 -->|YouTube/IG/TikTok/X| Output[Shorts Feed]
```

## 吁E��チE��プ�E役割

### Step 1: Input (トリガー)
*   **Action**: あなたがチャチE��で「トピック�E�例：アメリカの栁E��ガイドライン変更�E�」を投げるだけ、E

### Step 2: Gemini 2.0 (脚本生�E)
*   **Action**: 
    1.  **タスクタイプ判断**: タスクタイプを判断�E�Eook生�E / スクリプト生�E / 字幕指宁E/ 画像選宁E/ 公開形式！E
    2.  **重要Rules抽出**: そ�Eタスクタイプに応じたルール群から「重要なも�E」上位N個を「忁E��ルール」として抽出
    3.  **アイチE��技況E6適用**: 忁E��アイチE��技況E6を適用し、技法名を�E訁E
    4.  `VIDEO_STRATEGY_FINAL.md` に基づく「NEO構�E」�E台本を書く（日本語）、E
    5.  固定コメント（テンプレート）を生�E、E
    6.  議論誘発コメント（動画ごと�E�を生�E、E
    7.  **重要RulesチェチE��**: 重要RulesをチェチE�� ↁE1つでも❌ ↁE修正提桁E+ 再チェチE�� ↁE全て✁E��で繰り返す

### Step 3: 日本語添削（ユーザーチェチE���E�E
*   **Action**:
    1.  ユーザーが日本語スクリプトをチェチE��、E
    2.  口調、ニュアンス、表現を修正、E
    3.  OKが�Eるまで繰り返し、E

### Step 4: 英語翻訳
*   **Action**: 
    1.  日本語版が確定したら、英語に翻訳、E
    2.  HeyGen用の英語スクリプト作�E、E
    3.  **現在�E�手動使用�E�E*: HeyGen UIに貼り付ける用のスクリプトは、読みめE��ぁE��式（改行あり）で作�Eすること、ESONには`script_en`�E�読みめE��ぁE��式、手動用�E�を保存すること、E
    4.  **封E���E�EPI使用�E�E*: HeyGen APIで使ぁE��クリプトは、改行！E\n`�E�を削除し、E��続したテキストとして作�Eすること、ESONには`script_en_heygen`�E�EeyGen API用、改行なし）も保存すること、E
    5.  英語版コメント（固宁E+ 議論誘発�E�作�E、E
    6.  **【忁E��】コピ�E用出劁E*: 英語スクリプトとHeyGen設定を**忁E��一緒に**コピ�E用として出力すること。以下�E形式で出力！E
        ```
        **スクリプト�E�EeyGen UIに貼り付け�E�E*:
        [英語スクリプト]

        **HeyGen設定（スクリプト以外�E持E���E容�E�E*:
        [設定�E容]

        **HeyGen実行前の確認事頁E��日本語！E*:
        [確認事頁E
        ```
    7.  **【忁E��】字幕重なり防止**: スクリプト生�E時に以下�Eルールを適用すること�E�E
        - 吁E��クション間に**0.5秒�Eポ�Eズ**を�Eれる�E�侁E `... (pause 0.5s) ...`�E�E
        - 長ぁE��リフ�E**8秒以冁E*で刁E��する
        - 研究引用の字幕�E、前の字幕が消えてから表示されるよぁE��する
        - スクリプト冁E��自然な区刁E���E�句読点、段落�E�を活用し、字幕�Eタイミングを調整する
    8.  **【忁E��】背景画像�E持E��E*: 解説系動画では、トピックに応じぁE*リアルな背景画僁E*を指定すること、EeyGen設定に以下を含める�E�E
        - **背景画像�E具体的な持E��E*: トピチE��に応じたリアルな画像（侁E レクチン→�Eのリアルな解剖図、シュウ酸→�E臓�Eリアルな解剖図�E�E
        - **優先頁E��E*: 最優允E リアルな人体解剖図・臓器の実�E、次点: 3DモチE��・VRモチE��、E��ける: 参老E��像的なも�E・簡略なイラスチE
        - **注意点**: リアルタイム解剖図は具体例�E1つであり、これに引っ張られすぎなぁE��想像しめE��くするため�E補助として使用、E

### Step 5: HeyGen (製造)
*   **現在�E�手動使用�E�E*: 
    1.  **完�E形持E��チE��プレート�E使用**: `second-brain/HEYGEN_COMPLETE_INSTRUCTIONS.md`を参照し、完�E形持E��を作�Eすること、E
    2.  **映像�E変化**: スクリプトと同じ冁E��で、動画のシーンに変化をたくさん�Eれること、E
    3.  **静止画は避ける**: カレンダーなどの静止画は惁E��量が増えなぁE��めE��ける。動く映像！Eooms, pans, animations�E�を使用すること、E
    4.  **惁E��量�E確俁E*: ただ動いてぁE��だけではダメ。映像から得られる惁E��が変化する忁E��がある。各シーンで新しい惁E��を提供すること。！E*⚠�E�E重要E*: これはユーザー個人の意見であり、データに基づくものではなぁE���E世界の総意ではなぁE��E
    5.  **B-roll持E��**: Stock media中忁E��ダイナミチE��変化多め�E�Euick cuts 1-3秒ごと、zooms/pans、E��繁なシーンチェンジ�E�、E
    6.  **Unlimitedプラン準拠**: Avatarなし！Eoiceover only�E�、Generic male voice、Stock mediaのみ�E�EI生�EメチE��アは使用不可�E�、E
    1.  **【忁E��】スクリプトとHeyGen設定を一緒にコピ�E**: Step 4で出力された「スクリプト�E�EeyGen UIに貼り付け�E�」と「HeyGen設定（スクリプト以外�E持E���E容�E�」を**忁E��一緒に**コピ�Eして使用すること、E
    2.  JSONの`script_en`をコピ�EしてHeyGen UIに貼り付ける、E
    3.  HeyGen設定に従って、アバター�E�なし）、E��声�E�英語）、背景�E�動画の冁E��に合わせて�E�、字幕（有効化）を設定する、E
    4.  **【忁E��】背景画像�E持E��E*: 解説系動画では、参老E��像的なも�Eではなく、E*リアルな画僁E*�E�人体解剖図、臓器、�E、�E臓など�E�を背景として持E��すること、EeyGen UIで背景画像を選択する際は、以下�E優先頁E��で選択！E
        - **最優允E*: リアルな人体解剖図、臓器の実�E、医学皁E��ラスト（リアル系�E�E
        - **次点**: 3DモチE��、VRモチE���E��E場感�Eあるも�E�E�E
        - **避ける**: 参老E��像的なも�E、簡略なイラスト、抽象皁E��画僁E
        - **具体侁E*: レクチンの話 ↁE腸のリアルな解剖図、シュウ酸の話 ↁE腎臓のリアルな解剖図、フィチン酸の話 ↁEミネラル吸収を示すリアルな図
    4.  **HeyGen実行前の確認事頁E��日本語！E*を確認してから、動画を生成する、E
    5.  **字幕重なり防止の確誁E*: HeyGen UIで字幕�Eタイミングを確認し、E��なってぁE��ぁE��チェチE��する。重なってぁE��場合�E、スクリプトにポ�Eズを追加する、E
    6.  完パケ動画�E�EP4�E�をダウンロードする、E
*   **封E���E�EPI使用�E�E*: 
    1.  JSONの`script_en_heygen`をHeyGen APIに送信、E
    2.  持E��されたアバターと音声で喋らせる、E
    3.  同時に「字幕」も焼き付ける、E
    4.  完パケ動画�E�EP4�E�を出力する、E

### Step 6: 全SNS投稿 (配信)
*   **Action**: 
    1.  完�Eした動画めE*自動投稿プラチE��フォーム**に同時投稿�E�EプラチE��フォーム: YouTube, Instagram, TikTok, Facebook, LinkedIn, Pinterest�E�、E
    2.  固定コメントをピン留め、E
    3.  議論誘発コメントを投稿、E
    4.  **X (Twitter)は手動投稿**�E�参照: `second-brain/SNS_手動投稿リスチEmd`�E�E

---

## 📱 投稿対象SNS�E�E026年牁E- 全プラチE��フォーム使用�E�E

### **全プラチE��フォーム�E�Eつすべて使用�E�E*

1.  **YouTube Shorts** ✁E
    - 最大60私E
    - 縦型動画�E�E:16�E�E
    - 検索エンジン連携で長期的発見性あり
    - API: YouTube Data API v3�E�無料枠あり�E�E

2.  **Instagram Reels** ✁E
    - 最大90私E
    - 縦型動画�E�E:16�E�E
    - 購買行動に繋がりやすい
    - API: Instagram Graph API�E�無料！E

3.  **TikTok** ✁E
    - 推奨15-60秒（最大3刁E��E
    - 縦型動画�E�E:16�E�E
    - 拡散性が最も高い
    - API: TikTok API�E�無料！E

4.  **X (Twitter)** ✁E**�E�手動投稿�E�E*
    - 動画投稿可能�E�最大2刁E0秒！E
    - チE��ストとの絁E��合わせで拡散
    - **自動化除夁E*: 手動で投稿�E�手動でもやる価値があるくらい重要E��E
    - 参�E: `second-brain/SNS_手動投稿リスチEmd`

5.  **Facebook Reels** ✁E
    - 最大90私E
    - 年齢層が高め�E�E0-50代�E�E
    - API: Meta Graph API�E�無料！E

6.  **LinkedIn** ✁E
    - ビジネス層向け
    - 健康・パフォーマンス系は相性良ぁE
    - API: LinkedIn API�E�無料！E

7.  **Pinterest** ✁E
    - 縦型動画対忁E
    - 女性ユーザー多め
    - API: Pinterest API�E�無料！E

---

## 忁E��なも�E (Requirements)
1.  **HeyGen API Key** (Enterprise/Pro) ※これさえあれば勝てます、E
2.  **Gemini API Key** (OK)
3.  **各SNSアカウンチE* (YouTube, Instagram, TikTok, X, Facebook, LinkedIn, Pinterest)
4.  **Supabase Functions** (自動投稿シスチE��構篁E
5.  **各SNS API Keys** (全て無料で取得可能)

---

## 次のスチE��チE
1.  **Agent 1**: 過激HookコンチE��チE��成！E/21、E/3、E日3本�E�E
2.  **Agent 2**: SNS自動投稿シスチE��構築！Eupabase Functions�E�E
3.  **統合テスチE*: Agent 1のコンチE��チEↁEAgent 2の自動投稿

## Agent刁E��

- **Agent 1**: 過激HookコンチE��チE��戁E
  - ニュース/トレンド収雁E
  - Hook生�E�E�「野菜�E毒！」系�E�E
  - 科学皁E��拠の絁E��込み
  
- **Agent 2**: SNS自動投稿シスチE��
  - Supabase Functions構篁E
  - 全7プラチE��フォームへの自動投稿
  - API統合�EチE�Eロイ

詳細は `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` を参照、E

