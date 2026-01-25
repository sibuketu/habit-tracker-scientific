# Japanese Localization Checklist

## Purpose
Comprehensive checklist to identify and translate all remaining Japanese text in the codebase to English.

## Files to Check

### High Priority (User-Facing UI)
- [ ] `src/components/butcher/ButcherSelect.tsx` - Food selection UI
- [ ] `src/screens/HomeScreen.tsx` - Main screen
- [ ] `src/screens/HistoryScreen.tsx` - History screen
- [ ] `src/screens/StatsScreen.tsx` - Statistics screen
- [ ] `src/screens/UserSettingsScreen.tsx` - Settings screen
- [ ] `src/screens/DiaryScreen.tsx` - Diary screen
- [ ] `src/screens/LabsScreen.tsx` - Labs screen
- [ ] `src/screens/ResultsScreen.tsx` - Results screen
- [ ] `src/components/MiniNutrientGauge.tsx` - Nutrient gauge
- [ ] `src/components/Achievements.tsx` - Achievements
- [ ] `src/components/common/FeedbackDialog.tsx` - Feedback dialog

### Medium Priority (Data/Content)
- [ ] `src/data/toxinDatabase.ts` - Toxin database
- [ ] `src/data/transitionGuide.ts` - Transition guide
- [ ] `src/utils/i18n.ts` - Translation keys
- [ ] `src/data/foodsDatabase.ts` - Food database

### Low Priority (Comments/Internal)
- [ ] All TypeScript/TSX files - Code comments
- [ ] All CSS files - CSS comments

## Search Patterns
- Japanese characters: `[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]`
- Common Japanese UI terms:
  - 価格 (price)
  - 計測時�E状慁E(condition at measurement)
  - 甁E(raw)
  - 焼 (cooked)
  - 優秀 (excellent)
  - 良好 (good)
  - 普送E(fair)
  - 割髁E(expensive)

## Notes
- Focus on user-facing text first
- Comments can be translated but are lower priority
- Database entries may need special handling

