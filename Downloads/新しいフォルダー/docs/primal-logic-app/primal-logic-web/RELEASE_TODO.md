# CarnivOS リリース TODO

## ストア登録�E�未完亁E��E

### iOS App Store
- [ ] Apple Developer Program登録 ($99/年)
- [ ] 証明書・Provisioning Profile作�E
- [ ] App Store Connect設宁E
- [ ] TestFlight ↁE審査提�E

### Google Play Store
- [ ] Google Play Developer登録 ($25 一囁E
- [ ] 署名キーストア作�E
- [ ] Play Console設宁E
- [ ] 冁E��チE��チEↁE審査提�E

---

## Deep Link対忁E

### 登録前にできること
- [x] URLハッシュルーチE��ング (`#paywall`, `#home` など)
- [x] Capacitor App URLスキーム設宁E(カスタムスキーム: `primallogic://`) ✁E`capacitor.config.ts`で実裁E��み

### 登録後に忁E��E
- [ ] iOS: Universal Links (Apple Developer忁E��E
- [ ] Android: App Links (Play Console推奨、なくても動ぁE

---

## 隠す戦略�E�段階的リリース�E�E

### Phase 1: コア機�Eのみ�E��E回リリース�E�E
表示する機�E:
- ホ�Eム画面
- 食事�E劁E
- 履歴

隠す機�E:
- Labs全佁E
- Community
- Shop
- Gift
- Recipe詳細
- AI機�E�E�EymptomChecker等！E

### Phase 2: 1-2週間後アチE�EチE�EチE
追加で表示:
- Stats
- Diary
- Recipe

#### RecipeScreenの栄養ゲージ統合（今後のアプデで検討）
- **現状**: `nutrientGauges`配列を使用した独自実装。Tier2まで対応。
- **課題**: HomeScreen方式（グループ化表示）を適用するか？
- **方針**: 
  - 案Bを実施: HomeScreen方式（グループ化表示）を適用する
  - その上で、レシピ特有の要件（レシピ作成時の栄養素プレビュー等）を検討
  - 参考: [docs/NUTRIENT_GAUGE_REQUIREMENTS_HANDOFF.md](docs/NUTRIENT_GAUGE_REQUIREMENTS_HANDOFF.md) の実装方針を参照

### Phase 3: 3-4週間征E
- Labs機�E
- AI機�E

### Phase 4:
- Community
- Shop
- Gift

---

## 実裁E��況E

`src/utils/featureFlags.ts` で機�Eフラグを管琁E
```typescript
export const FEATURE_FLAGS = {
  labs: false,
  community: false,
  shop: false,
  gift: false,
  recipe: false,
  aiFeatures: false,
  stats: false,
  diary: false,
};
```

---

*最終更新: 2026-01-19*

