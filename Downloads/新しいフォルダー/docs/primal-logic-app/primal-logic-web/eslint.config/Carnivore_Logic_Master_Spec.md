# 🥩 Carnivore Logic: Master Specification

> **Mission:** Transform from "Tracker" to "Optimizer".

> **Persona:** "The Logic Seeker" (論理皁E��求老E

---

## 1. Core Concept & Differentiation

- **Logic over Calorie:** カロリー計算ではなく、�Eルモンと栁E��素のロジチE��で体をハックする、E

- **Dynamic Optimization:** 天気�E体調・活動量に応じて、その日の摂取目標！Earget�E�が自動変動する、E

- **Frictionless Input:** 「キーボ�Eド�E力」を排除。解剖図タチE�Eと履歴活用で3秒で完亁E��E

---

## 2. Features to "Steal" & "Crush"

| Feature | Source | Implementation Strategy |
| :--- | :--- | :--- |
| **P:F Ratio** | Vore | ホ�Eム画面の最上部にゲージとして常時表示、E|
| **History Copy** | Cronometer | 「いつも�E�E�Ey Foods�E�」タブを作�E。ワンタチE�E入力、E|
| **Micronutrients** | Cronometer | Mg, Zn, Vitamin Dなどを裏で計算し、不足時�Eみ警告、E|
| **Adaptation** | (None) | **独自機�E:** 移行期ユーザーに対し、塩刁E��量を�EチE��ュ通知、E|

---

## 3. UI/UX Specifications

### A. The Interactive Butcher (Input)

- **Visual:** 牛�E豚�E鶏�E解剖図�E�EVG�E�を使用、E

- **Unit:** グラム入力�E「微調整」�Eみ。基本は「スライダー」や「見た目プリセチE���E�スチE�Eキ1枚など�E�」、E

- **Range Display:** 栁E��素は、E00~130g」�Eような幁E��Eange�E�として保持するが、メイン画面では中央値のみシンプルに表示する、E

### B. Logic Matrix (Optimization Engine)

以下�Eトリガーにより、栁E��ターゲチE��を�E動補正する、E

| Trigger | Condition | Action (Target Adjustment) |
| :--- | :--- | :--- |
| **Environment** | 気温 < 10℁E| 脂質(Fuel) +15% (熱産生需要E |
| **Environment** | 日照不足 (天気API) | ビタミンD +目標墁E|
| **Activity** | 運動強度: High | 脂質(Fuel) +20%, Mg +50mg |
| **Physiology** | 生理 / 出血 | 鉁E�E(Fe) +目標墁E 脂質 +10% |
| **Diet** | カフェイン摂取 | Mg +20mg/杯 (排�E刁E��填) |

### C. AI Concierge (Interview)

- 写真アチE�E時、AIは単に記録するのではなく「不足惁E��」を聞き出す、E

- **Question:** 「塩は振りましたか？（デフォルチE ぬちまーす）」「脂身は残しましたか？、E

- **Loadout:** ユーザー設定で「いつも�E塩」を登録済みなら質問をスキチE�E、E

---

## 4. Tech Stack & Data

- **Frontend:** React, Vite, Tailwind CSS

- **Data:** Local Storage (Privacy First)

- **API:** OpenWeatherMap (Free Tier) for Environment Logic.

---

## 5. Implementation Steps

1. **Core UI:** 解剖図と履歴タブ�E実裁E��E
2. **Database:** "Fuzzy Data"�E�幁E�Eある栁E��データ�E��E構築、E
3. **Logic Engine:** 天気�E体調による係数計算ロジチE��の実裁E��E
4. **AI Integration:** 写真解析とインタビュープロンプトの実裁E��E

---

## 6. Data Structure (Fuzzy Data)

栁E��素チE�Eタは「幁E��Eange�E�」として保持する、E

```typescript
interface NutrientRange {
  min: number;
  max: number;
  typical: number; // 中央値�E�表示用�E�E
}

interface FoodData {
  // ... existing fields ...
  nutrientsRaw: {
    protein: NutrientRange; // 侁E { min: 20, max: 24, typical: 22 }
    fat: NutrientRange;
    // ...
  };
}
```

---

## 7. P:F Ratio (Protein:Fat Ratio)

ホ�Eム画面の最上部に常時表示、E

- **計算弁E** `P:F = タンパク質(g) / 脂質(g)`
- **推奨篁E��:** 1:1 ~ 1:2 (カーニ�Eア推奨)
- **表示:** ゲージ形式で視覚化

---

## 8. History Copy ("ぁE��も�E" タチE

- 過去に最も�E力回数が多い食品を「いつも�E」として表示
- ワンタチE�Eで入力完亁E��デフォルト量で自動追加�E�E

---

## 9. Dynamic Optimization Logic

### 環墁E��因

```typescript
function adjustTargetsByEnvironment(
  baseTargets: NutrientTargets,
  weather: WeatherData
): NutrientTargets {
  if (weather.temperature < 10) {
    return {
      ...baseTargets,
      fat: baseTargets.fat * 1.15, // +15%
    };
  }
  
  if (weather.sunHours < 2) {
    return {
      ...baseTargets,
      vitaminD: baseTargets.vitaminD * 1.2, // +20%
    };
  }
  
  return baseTargets;
}
```

### 活動要因

```typescript
function adjustTargetsByActivity(
  baseTargets: NutrientTargets,
  activityLevel: 'high' | 'moderate' | 'low'
): NutrientTargets {
  if (activityLevel === 'high') {
    return {
      ...baseTargets,
      fat: baseTargets.fat * 1.2, // +20%
      magnesium: baseTargets.magnesium + 50, // +50mg
    };
  }
  
  return baseTargets;
}
```

### 生理要因

```typescript
function adjustTargetsByPhysiology(
  baseTargets: NutrientTargets,
  userProfile: UserProfile
): NutrientTargets {
  if (userProfile.gender === 'female' && userProfile.menstrualCycle?.isActive) {
    return {
      ...baseTargets,
      iron: baseTargets.iron * 1.3, // +30%
      fat: baseTargets.fat * 1.1, // +10%
    };
  }
  
  return baseTargets;
}
```

---

## 10. AI Concierge Interview Flow

1. ユーザーが�E真をアチE�EローチE
2. AIが食品を識別
3. AIが不足惁E��を質啁E
   - 「塩は振りましたか？（デフォルチE ぬちまーす）、E
   - 「脂身は残しましたか？、E
   - 「調琁E��法�E�E�（生/焼ぁE煮る）、E
4. ユーザーが回答（また�EチE��ォルトを選択！E
5. 記録完亁E

---

## 11. Implementation Priority

### Phase 1: Core UI (現在進行中)
- ✁EInteractive Butcher (SVG解剖図)
- ✁EHistory Screen
- ⏳ P:F Ratio ゲージ
- ⏳ "ぁE��も�E" タチE

### Phase 2: Logic Engine
- ⏳ Dynamic Optimization (環墁E�E活動�E生理要因)
- ⏳ Fuzzy Data (栁E��素の幁E
- ⏳ Weather API 統吁E

### Phase 3: AI Integration
- ⏳ 写真解极E
- ⏳ Interview Flow
- ⏳ Loadout (ユーザー設宁E

---

## 12. OpenWeatherMap API Integration

### 環墁E��数

```env
VITE_WEATHER_API_KEY=your-api-key-here
```

### 使用侁E

```typescript
async function getWeatherData(lat: number, lon: number) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${VITE_WEATHER_API_KEY}&units=metric`
  );
  const data = await response.json();
  return {
    temperature: data.main.temp,
    sunHours: calculateSunHours(data), // 実裁E��E��E
  };
}
```

---

**こ�E仕様書は、Cursorが実裁E��る際の「言ぁE��できなぁE��」�E要件定義です、E*


