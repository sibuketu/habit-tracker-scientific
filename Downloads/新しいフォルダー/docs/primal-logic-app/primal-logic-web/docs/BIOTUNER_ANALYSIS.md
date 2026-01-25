# Bio-Tuner 実裁E��況�E析と対応方釁E

> 作�E日: 2026-01-20  
> 目皁E Bio-Tuner機�Eの現状確認とリリース剁E後判断

---

## 1. 実裁E��況確誁E

### ✁E保存動佁E
**状慁E*: 実裁E��み・動作中

**確認結果**:
- `DiaryScreen.tsx`の`handleSave`関数で`saveDailyLog`を呼び出してぁE��
- `storage.ts`でSupabase/localStorageに保存される
- 排況E��録�E�EbowelMovement`�E��E`DailyLog.status.bowelMovement`として保存される

**結諁E*: 保存�E正常に動作してぁE��

---

### ❁E記録冁E��の表示�E�EesultsScreen�E�E
**状慁E*: 未実裁E

**問題点**:
- `ResultsScreen.tsx`でBio-Tunerの記録が表示されてぁE��ぁE
- 排況E��録の履歴が見られなぁE

**影響**: ユーザーが過去の記録を確認できなぁE

---

### ❁E栁E��素の摂取基準への反映
**状慁E*: 未実裁E

**問題点**:
- `bioTuner.ts`で`getFatAdjustmentForToday()`が定義されてぁE��
- しかし、`HomeScreen.tsx`の`dynamicTargets`計算で使われてぁE��ぁE
- `getCarnivoreTargets()`にBio-Tunerの調整が反映されてぁE��ぁE

**影響**: 排況E��録に基づく脂質調整が栁E��素目標値に反映されなぁE

**実裁E��忁E��な箁E��**:
```typescript
// HomeScreen.tsx の dynamicTargets 計算時に
const fatAdjustment = await getFatAdjustmentForToday();
const adjustedFatTarget = fatAdjustment 
  ? fatAdjustment.recommendedFatTotal 
  : dynamicTargets.fat.target;
```

---

## 2. 根拠の評価

### Carnivoreの思想との整合性

**ユーザーの持E��**:
> 「Carnivoreの思想家�E�表現忘れた）なんか表現忘れたけど腹減ったら食う。だけど体感できなぁE��どの栁E��調整で使えそぁE��体調不良になってからでは遁E��し、微量�E変化は気づかなぁE��、E

**評価**: ✁E**根拠は妥彁E*

**琁E��**:
1. **Carnivoreの原則**: 「�E減ったら食う」�E正しい�E�Er. Ken Berry、Dr. Shawn Bakerの思想�E�E
2. **予防皁E��プローチE*: 体調不良になる前に微調整するのは琁E��かなってぁE��
3. **排況E�E早期指樁E*: 便私E下痢は脂質過夁E不足の早期サイン
4. **体感できなぁE��化**: 微量�E栁E��調整�E�±5-10%�E��E体感しにくいが、E��期的に重要E

**参老E*: 
- 排況E��態�E消化器系の健康持E��として重要E
- 脂質過多�E便秘、脂質不足→下痢の傾向がある
- Bio-Tunerは「体感できなぁE��化」を数値化するツールとして機�E

---

## 3. 実裁E��法とリリース剁E後判断

### 手動入力につぁE��

**現状**: 手動入力！EiaryScreenで選択！E

**ユーザーの懸念**: 「面倒だからリリース前ではなくリリース後でもいぁE��、E

**判断**: ✁E**リリース後で問題なぁE*

**琁E��**:
1. **メインはAndroidユーザー**: Androidでは自動連携�E�Eealth Connect等）が可能
2. **手動入力�E補完的**: 自動連携ができなぁE��合�Eフォールバック
3. **リリース後でも修正可能**: 機�E追加は後からでも問題なぁE
4. **優先度**: コア機�E�E�食事記録、栁E��素計算）�E方が重要E

**推奨**: リリース後、Android Health Connect連携を実裁E��てから手動入力�E改喁E��検訁E

---

### 「やってなぁE��どめE��なくてぁE��」機�E

**ユーザーの持E��**: 「やってなぁE��どめE��なくてぁE��らしぁE��これもリリース後で良ぁE���E�問題あるならあとで修正すればぁE��し触ってる感じ問題感じなぁE��E

**判断**: ✁E**リリース後で問題なぁE*

**琁E��**:
1. **動作確認済み**: ユーザーが「触ってる感じ問題感じなぁE��と確誁E
2. **後から修正可能**: 問題があればリリース後に修正できる
3. **リリース前�E優先度**: コア機�Eの安定化が最優允E

**推奨**: リリース後、ユーザーフィードバチE��を収雁E��てから改喁E

---

## 4. アクセシビリチE��につぁE��

### アクセシビリチE��とは

**定義**: 障害老E��高齢老E��ど、様、E��人が使ぁE��すいように設計すること

**実裁E��み頁E��**:
- ✁Eキーボ�Eドナビゲーション�E�Enter/Spaceキーで操作可能�E�E
- ✁EARIAラベル�E�スクリーンリーダー対応！E
- ✁E色のコントラスト！ECAG AA/AAA準拠�E�E
- ✁EタチE��ターゲチE���E�E4px以上！E

**めE��べきか�E�E*: ✁E**既に実裁E��み**

**琁E��**:
1. **法的要件**: アクセシビリチE��は法的要件�E�EDA、WCAG�E�に準拠する忁E��がある
2. **ユーザー体騁E*: 全てのユーザーが使ぁE��すいアプリは評価が高い
3. **既に実裁E��み**: 追加作業は不要E

**結諁E*: 既に実裁E��みなので、リリース前に追加作業は不要E

---

## 5. リリース前�E計画確誁E

### 現在の計画

**リリース前チェチE��リスチE* (`RELEASE_CHECKLIST.md`) に記載されてぁE��頁E��:
- ✁EチE��チE��モード�E動作確認（実裁E��み、動作確認が忁E��E��E
- ✁EアクセシビリチE���E�実裁E��み�E�E
- ✁Eパフォーマンス最適化（実裁E��み�E�E
- ✁EセキュリチE���E�実裁E��み�E�E
- ✁E法的要件�E�実裁E��み�E�E
- ⏳ ブラウザ互換性確認（手動確認が忁E��E��E
- ⏳ パフォーマンス確認（手動確認が忁E��E��E

### 計画の問題点

**問題なぁE*: ✁E**計画は妥彁E*

**琁E��**:
1. **実裁E��み頁E��**: 主要機�Eは実裁E��み
2. **手動確認頁E��**: ブラウザ互換性、パフォーマンスは手動確認が忁E��E���E動化できなぁE��E
3. **優先度**: コア機�Eの安定化が最優允E

**推奨**: リリース前に以下を確誁E
- [ ] ブラウザ互換性�E�Ehrome、Safari、Firefox、Edge�E�E
- [ ] パフォーマンス�E�読み込み速度、メモリ使用量！E
- [ ] チE��チE��モード�E動作確誁E

---

## 6. Bio-Tuner機�Eのリリース剁E後判断

### リリース前に対応すべき頁E��

**なぁE*: ✁E**リリース前�E対応�E不要E*

**琁E��**:
1. **保存動佁E*: 既に動作してぁE��
2. **コア機�E**: 食事記録、栁E��素計算が最優允E
3. **後から修正可能**: 表示めE��映はリリース後に実裁E��能

### リリース後に対応すべき頁E��

1. **ResultsScreenに表示**: 排況E��録の履歴を表示
2. **栁E��素目標値への反映**: `getFatAdjustmentForToday()`を`dynamicTargets`計算に絁E��込む
3. **Android Health Connect連携**: 自動�E力機�Eの実裁E

**優先度**: 中�E�コア機�Eの安定化後に実裁E��E

---

## 7. 結諁E

### リリース前�E対忁E

**不要E*: Bio-Tuner機�Eの追加実裁E�Eリリース前には不要E

**琁E��**:
- 保存�E動作してぁE��
- コア機�E�E�食事記録、栁E��素計算）�E安定化が最優允E
- 表示めE��映はリリース後に実裁E��能

### リリース後�E対忁E

1. **ResultsScreenに表示**: 排況E��録の履歴を表示
2. **栁E��素目標値への反映**: Bio-Tunerの調整を脂質目標値に反映
3. **Android Health Connect連携**: 自動�E力機�Eの実裁E

**タイミング**: リリース征E-2週間以冁E

---

## 8. アクセシビリチE��の説昁E

### アクセシビリチE��とは

**簡単に言ぁE��**: 「誰でも使ぁE��すいアプリ」を作ること

**具体侁E*:
- 視覚障害老E スクリーンリーダーで操作できる
- 運動障害老E キーボ�Eドだけで操作できる
- 色覚異常老E 色だけでなく形でも区別できる

**既に実裁E��み**:
- ✁Eキーボ�Eドナビゲーション
- ✁EARIAラベル
- ✁E色のコントラスチE
- ✁EタチE��ターゲチE��

**結諁E*: 既に実裁E��みなので、リリース前に追加作業は不要E

---

最終更新: 2026-01-20

