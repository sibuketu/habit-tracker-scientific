# カルマカウンターと栁E��ゲージ実裁E��画

> **作�E日**: 2026-01-22  
> **拁E��E*: PM/アーキチE��ト（提案！E 
> **目皁E*: カルマカウンターの実裁E��栁E��ゲージの残タスク完亁E

---

## 1. カルマカウンター実裁E

### 1.1 実裁E�E容
- `AnimalCounter.tsx`を`KarmaCounter.tsx`にリネ�Eム
- UI表示名を「Karma Counter」に変更
- 本番リリースでは隠す設定！EeatureFlagsを使用�E�E

### 1.2 実裁E��ァイル
- `src/components/AnimalCounter.tsx` ↁE`src/components/KarmaCounter.tsx`�E�リネ�Eム�E�E
- `src/screens/StatsScreen.tsx`�E�Emportとコンポ�Eネント名を更新�E�E
- `src/utils/featureFlags.ts`�E�EkarmaCounter`フラグを追加�E�E
- `src/utils/i18n.ts`�E�翻訳キーを追加�E�E

### 1.3 本番リリース時�E設宁E
- `featureFlags.ts`で`karmaCounter: false`に設宁E
- `StatsScreen.tsx`で`isFeatureEnabled('karmaCounter')`で条件刁E��E
- 開発時�E`VITE_ENABLE_ALL_FEATURES=true`で表示可能

---

## 2. 栁E��ゲージの残タスク実裁E

### 2.1 RecipeScreen
- **問顁E*: 色は統一済み、targetのハ�Eドコードあり！EodiumのフォールバックぁE000�E�E
- **修正**: `dynamicTargets.sodium || 5000`を`dynamicTargets.sodium`に変更�E�EgetCarnivoreTargets()`の結果を優先！E
- **修正**: `nutrientDisplayMode`に基づく表示ルールを適用�E�可能な篁E��で�E�E

### 2.2 CustomFoodScreen
- **問顁E*: 色は統一済み、targetは100g固定（これ�E仕様としてOK�E�E
- **修正**: 色は既に統一済み、targetは100g固定�Eまま�E�仕様として問題なし！E
- **修正**: `nutrientDisplayMode`に基づく表示ルールを適用�E�可能な篁E��で�E�E

### 2.3 PhotoAnalysisModal
- **問顁E*: 色は統一済み、targetは`dynamicTargets`から取得済み
- **修正**: 色は既に統一済み、targetは既に動的取得済み
- **修正**: `nutrientDisplayMode`に基づく表示ルールを適用�E�可能な篁E��で�E�E

---

## 3. 本番リリース前タスクリストへの追加提桁E

### 3.1 RELEASE_REQUIREMENTS.mdへの追加提桁E

**追加場所**: 「推奨実裁E��E��」セクション

**追加冁E��**:
```markdown
### 5. カルマカウンター機�E�E�本番リリースでは隠す！E
- [ ] カルマカウンターの実裁E��亁E
- [ ] featureFlagsで本番リリース時に隠す設宁E
- [ ] 開発時�E表示可能な設宁E
- [ ] 封E��皁E��アチE�EチE�Eトで表示する準備
```

**琁E��**:
- 「最初�E健康ガチ勢だけをターゲチE��にし、まさかの環墁E��もいぁE��とぁE��発見を狙う
- 微量な興味のアイチE��だが、実裁E��て隠すことで封E��皁E��アチE�EチE�Eト�E準備ができる
- ネタ刁E��防止のため、後でアチE�EチE�Eトする機�Eとして準備

---

## 4. 実裁E��先頁E��E

1. **最優允E*: 栁E��ゲージの残タスク�E�EecipeScreen、CustomFoodScreen、PhotoAnalysisModal�E�E
2. **高優允E*: カルマカウンターの実裁E��リネ�Eム、UI表示名変更、featureFlags設定！E
3. **中優允E*: 本番リリース前タスクリストへの追加提桁E

---

## 5. 実裁E�E定義に基づく完亁E��件

### カルマカウンター
- [ ] `KarmaCounter.tsx`にリネ�Eム完亁E
- [ ] UI表示名が「Karma Counter」に変更完亁E
- [ ] featureFlagsで本番リリース時に隠す設定完亁E
- [ ] 開発時�E表示可能な設定完亁E
- [ ] 翻訳キーが追加完亁E
- [ ] StatsScreenで表示される！EeatureFlagsが有効な場合！E

### 栁E��ゲージ
- [ ] RecipeScreenのtargetハ�Eドコード削除完亁E
- [ ] CustomFoodScreenの色統一確認完亁E��既に統一済み�E�E
- [ ] PhotoAnalysisModalの色統一確認完亁E��既に統一済み�E�E
- [ ] 全ての画面で`nutrientDisplayMode`に基づく表示ルールが適用完亁E��可能な篁E��で�E�E

---

**最終更新**: 2026-01-22

