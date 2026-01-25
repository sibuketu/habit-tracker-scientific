# 栁E��ゲージ統一タスク - Agent開始ガイチE[GAUGE-001]

> **タスクID**: GAUGE-001  
> **拁E��E*: 実裁E��ンジニア  
> **優先度**: 髁E 
> **参�E**: `second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md` の「🤁E実裁E��ンジニア: 栁E��ゲージ問題修正 [GAUGE-001]」セクション

---

## 📋 タスク概要E

栁E��ゲージの一貫性問題を修正します。`docs/NUTRIENT_GAUGE_CONSISTENCY_REPORT.md`を参照してください、E

**主な問顁E*:
1. HistoryScreenが`nutrientDisplayMode`を老E�EしてぁE��ぁE
2. 色が統一されてぁE��ぁE��EomeScreen基準に統一が忁E��E��E
3. targetがハードコードされてぁE���E�EgetCarnivoreTargets()`から取得すべき！E

---

## 🎯 作業開始手頁E

### 1. 作業ロチE��取征E
`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`を開き、以下�Eように更新�E�E

```markdown
| **実裁E��ンジニア** | 栁E��ゲージ問題修正 | 🔄 実行中 | 0% | [現在時刻] | - | - |
```

### 2. 参�Eファイルの確誁E
以下�Eファイルを忁E��読んでから作業開始！E
- `docs/NUTRIENT_GAUGE_CONSISTENCY_REPORT.md` - 問題�E詳細
- `src/screens/HistoryScreen.tsx` - 修正対象
- `src/screens/HomeScreen.tsx` - 基準となる実裁E��E00-1100行目�E�E
- `src/utils/nutrientPriority.ts` - `isNutrientVisibleInMode()`関数
- `src/utils/gaugeUtils.ts` - `getNutrientColor()`関数�E�既に追加済み�E�E

### 3. 作業開姁E
こ�Eガイドに従って作業を開始してください、E

---

## ✁Eタスク1: HistoryScreenの修正�E�最優先！E

### 修正ファイル
- `src/screens/HistoryScreen.tsx`

### 修正冁E��

#### 1.1 `nutrientDisplayMode`を取征E
```typescript
import { useSettings } from '../hooks/useSettings';

// コンポ�Eネント�Eで
const { nutrientDisplayMode } = useSettings();
```

#### 1.2 Summaryタブ�E栁E��ゲージ表示を`nutrientDisplayMode`に基づぁE��制御

**現在の問顁E*:
- Protein, Fatのみ�E�Eつ固定）を表示
- `nutrientDisplayMode`を老E�EしてぁE��ぁE

**修正方釁E*:
- SimpleモーチE 電解質�E�Eodium, potassium, magnesium�E�E マクロ�E�Eat, protein�E��Eみ
- Standard/DetailedモーチE 上訁E+ Tier2栁E��素�E�Eron, zinc等）も表示

**実裁E��E*:
```typescript
import { isNutrientVisibleInMode } from '../utils/nutrientPriority';

// Summaryタブ�Eで
{isNutrientVisibleInMode('sodium', nutrientDisplayMode) && (
  <MiniNutrientGauge
    label="Sodium"
    currentDailyTotal={avgSodium}
    target={targets.sodium || 5000}
    color={getNutrientColor('sodium')}
    unit="mg"
    nutrientKey="sodium"
  />
)}
// 同様にpotassium, magnesium, fat, proteinも条件付きで表示
```

#### 1.3 Detail表示の栁E��ゲージも同様に制御

**現在の問顁E*:
- Protein, Fat, Sodium, Potassium, Magnesium, Zinc, Iron, Calcium, Phosphorus...�E�固定で多数表示�E�E
- `nutrientDisplayMode`を老E�EしてぁE��ぁE

**修正方釁E*:
- SimpleモーチE Tier1栁E��素のみ�E�電解質 + マクロ�E�E
- StandardモーチE Tier1 + Tier2�E�開閉式！E
- DetailedモーチE Tier1 + Tier2 + Tier3�E��Eて表示�E�E

**実裁E��E*:
```typescript
// Tier1: 常に表示
{isNutrientVisibleInMode('protein', nutrientDisplayMode) && (
  <MiniNutrientGauge ... />
)}

// Tier2: Standard/Detailedモードで表示�E�開閉式！E
{nutrientDisplayMode !== 'simple' && isNutrientVisibleInMode('iron', nutrientDisplayMode) && (
  <div>
    <button onClick={() => setShowTier2(!showTier2)}>
      📊 Other Nutrients ({NUTRIENT_TIERS.tier2.length})
    </button>
    {showTier2 && (
      <div>
        {/* Tier2栁E��素 */}
      </div>
    )}
  </div>
)}

// Tier3: Detailedモード�Eみ
{nutrientDisplayMode === 'detailed' && (
  <>
    {/* Tier3栁E��素 */}
  </>
)}
```

#### 1.4 日本語を英語化
- 「脂質」�E "Fat"
- 「詳細表示 →」�E "Show Details ↁE
- そ�E他�E日本語も全て英語化

**確認方況E*:
- `grep -r "脂質\|詳細表示" src/screens/HistoryScreen.tsx` で日本語が残ってぁE��ぁE��確誁E

---

## ✁Eタスク2: そ�E他画面の色とtargetを統一�E�中優先！E

### 修正ファイル
1. `src/screens/RecipeScreen.tsx`
2. `src/screens/CustomFoodScreen.tsx`
3. `src/components/PhotoAnalysisModal.tsx`�E�存在する場合！E

### 修正冁E��

#### 2.1 色をHomeScreen基準に統一

**基準色**�E�Esrc/utils/gaugeUtils.ts`の`getNutrientColor()`を使用�E�E
- protein/fat: `#3b82f6`
- zinc/magnesium/iron: `#06b6d4`
- sodium: `#10b981`
- そ�E仁E `#06b6d4`をデフォルチE

**実裁E��E*:
```typescript
import { getNutrientColor } from '../utils/gaugeUtils';

// ハ�Eドコードされた色を削除
<MiniNutrientGauge
  label="Protein"
  color={getNutrientColor('protein')} // ハ�Eドコードではなく関数を使用
  ...
/>
```

#### 2.2 targetを`getCarnivoreTargets()`から取征E

**現在の問顁E*:
- ハ�Eドコードされたtarget値�E�侁E `target={5000}`, `target={2.4}`�E�E

**修正方釁E*:
- `getCarnivoreTargets()`を使用して動的に取征E
- CustomFoodScreenの、E00gあたり」表示は固定target (100)でOK�E�EhideTarget={true}`はそ�Eまま維持E��E

**実裁E��E*:
```typescript
import { getCarnivoreTargets } from '../data/carnivoreTargets';
import { useApp } from '../context/AppContext';

// コンポ�Eネント�Eで
const { userProfile } = useApp();
const targets = getCarnivoreTargets(
  userProfile?.gender,
  userProfile?.age,
  userProfile?.activityLevel,
  // ... そ�E他�Eパラメータ
);

// 使用
<MiniNutrientGauge
  label="Sodium"
  target={targets.sodium || 5000} // ハ�Eドコードではなく動皁E��取征E
  ...
/>
```

#### 2.3 `nutrientDisplayMode`に基づく表示ルールを適用�E�可能な篁E��で�E�E

**注愁E*:
- RecipeScreen、CustomFoodScreen、PhotoAnalysisModalは用途が異なるため、完�Eな適用は不要E
- ただし、可能な篁E��で`nutrientDisplayMode`を老E�Eする

---

## 📝 完亁E��件チェチE��リスチE

### HistoryScreen
- [ ] `nutrientDisplayMode`を取得してぁE��
- [ ] Summaryタブが`nutrientDisplayMode`に基づぁE��表示を制御してぁE��
- [ ] Detail表示が`nutrientDisplayMode`に基づぁE��表示を制御してぁE��
- [ ] 日本語が英語化されてぁE��
- [ ] 色が`getNutrientColor()`を使用してぁE��
- [ ] targetが`getCarnivoreTargets()`から取得されてぁE��

### そ�E他画面�E�EecipeScreen, CustomFoodScreen, PhotoAnalysisModal�E�E
- [ ] 色が`getNutrientColor()`を使用してぁE��
- [ ] targetが`getCarnivoreTargets()`から取得されてぁE���E�EustomFoodScreen除く！E
- [ ] ハ�Eドコードされた色やtargetが削除されてぁE��

---

## 🔄 作業完亁E��の手頁E

### 1. 作業ロチE��解除
`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`を更新�E�E

```markdown
| **実裁E��ンジニア** | 栁E��ゲージ問題修正 | ✁E完亁E| 100% | [開始時刻] | [完亁E��刻] | - |
```

### 2. レポ�Eト作�E
`second-brain/AGENT_GAUGE_REPORT.md`を作�Eし、以下を記録�E�E
- 修正したファイル一覧
- 修正冁E��の詳細
- 完亁E��件のチェチE��結果
- 残タスクめE�E念事頁E

### 3. QA/レビューエージェントへの引き継ぎ
`second-brain/AGENTS/MULTI_AGENT_RELEASE_WORK.md`の「エージェント間会話ログ」に記録�E�E

```
[YYYY-MM-DD] 実裁E��ンジニア: GAUGE-001完亁E��EistoryScreen、RecipeScreen、CustomFoodScreenの栁E��ゲージ統一完亁E��QA/レビューエージェントに引き継ぎ、E
```

---

## ⚠�E�E注意事頁E

1. **HomeScreenを基準にする**: 全ての修正は`src/screens/HomeScreen.tsx`の実裁E��基準にしてください
2. **既存�E機�Eを壊さなぁE*: 修正時�E既存�E機�Eが正常に動作することを確認してください
3. **チE��ト実衁E*: 修正後�E忁E��動作確認を行ってください
4. **エラーハンドリング**: `getCarnivoreTargets()`の戻り値が`undefined`の場合�Eフォールバック処琁E��忘れずに

---

## 📚 参老E��E��

- `docs/NUTRIENT_GAUGE_CONSISTENCY_REPORT.md` - 問題�E詳細
- `src/screens/HomeScreen.tsx` - 基準となる実裁E
- `src/utils/nutrientPriority.ts` - `isNutrientVisibleInMode()`関数
- `src/utils/gaugeUtils.ts` - `getNutrientColor()`関数
- `src/data/carnivoreTargets.ts` - `getCarnivoreTargets()`関数

---

**作業開始時は、このファイルの冁E��を忁E��確認してください、E*

