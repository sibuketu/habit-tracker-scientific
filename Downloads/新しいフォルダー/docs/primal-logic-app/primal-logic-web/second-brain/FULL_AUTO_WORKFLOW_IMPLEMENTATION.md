# 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ螳溯｣・ぎ繧､繝・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: 4繧ｹ繝・ャ繝励〒螳悟・閾ｪ蜍募喧繧貞ｮ溽樟縺吶ｋ縺溘ａ縺ｮ螳溯｣・ぎ繧､繝・

---

## 識 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ・・繧ｹ繝・ャ繝暦ｼ・

### 繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ蝗ｳ

```mermaid
graph LR
    Step1[1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・] -->|Text| Step2[2. TTS逕滓・]
    Step2 -->|Audio MP3| Step3[3. 閾ｪ蜍募虚逕ｻ邱ｨ髮・
    Step3 -->|MP4 Video| Step4[4. 蜈ｨSNS謚慕ｨｿ]
    Step4 -->|6繝励Λ繝・ヨ繝輔か繝ｼ繝| Output[螳御ｺ・
```

**迚ｹ蠕ｴ**:
- 笨・**螳悟・閾ｪ蜍募喧**: 謇句虚謫堺ｽ應ｸ崎ｦ・
- 笨・**4繧ｹ繝・ャ繝・*: 繧ｷ繝ｳ繝励Ν縺ｧ遒ｺ螳・
- 笨・**繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ**: 蜷・せ繝・ャ繝励〒繧ｨ繝ｩ繝ｼ蜃ｦ逅・

---

## 噫 螳溯｣・憾豕・

### 笨・螳溯｣・ｸ医∩

1. **繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・**: `generateVideoScript` - 螳溯｣・ｸ医∩
2. **TTS逕滓・**: `generateSpeech` - 螳溯｣・ｸ医∩
3. **邨ｱ蜷医Ρ繝ｼ繧ｯ繝輔Ο繝ｼ**: `fullAutoVideoWorkflow` - 螳溯｣・ｸ医∩
4. **閾ｪ蜍募虚逕ｻ邱ｨ髮・*: `autoVideoEditor.ts` - 螳溯｣・ｸ医∩・・ython繧ｹ繧ｯ繝ｪ繝励ヨ・・

### 笞・・螳溯｣・′蠢・ｦ・

1. **Supabase Functions**: `create-video-with-auto-edit` - 螳溯｣・ｸｭ・・Fmpeg螳溯｡檎腸蠅・′蠢・ｦ・ｼ・
2. **FFmpeg螳溯｡檎腸蠅・*: Cloud Run縲´ambda縲√∪縺溘・螟夜Κ繧ｵ繝ｼ繝薙せ縺悟ｿ・ｦ・

---

## 統 菴ｿ逕ｨ譁ｹ豕・

### Step 1: 邨ｱ蜷医Ρ繝ｼ繧ｯ繝輔Ο繝ｼ繧貞他縺ｳ蜃ｺ縺・

```typescript
import { fullAutoVideoWorkflow } from './services/fullAutoVideoWorkflow';

const result = await fullAutoVideoWorkflow({
  topic: '驥手除縺ｯ豈抵ｼ√Ξ繧ｯ繝√Φ縺瑚・繧堤ｴ螢翫☆繧狗悄螳・,
  images: [
    {
      path: 'assets/images/government_guidelines_doc.jpg',
      start: 0,
      duration: 5,
    },
    {
      path: 'assets/images/anatomy_diagram.jpg',
      start: 5,
      duration: 8,
    },
  ],
  subtitles: [
    {
      text: 'The U.S. government just admitted it.',
      start: 0,
      duration: 3,
    },
  ],
  ttsProvider: 'google', // 螳悟・辟｡譁・
  width: 1080,
  height: 1920,
});

if (result.error) {
  console.error('笶・繧ｨ繝ｩ繝ｼ:', result.error);
} else {
  console.log('笨・螳御ｺ・', result.videoUrl);
}
```

---

## 肌 FFmpeg螳溯｡檎腸蠅・・讒狗ｯ・

### 繧ｪ繝励す繝ｧ繝ｳ1: Cloud Run縺ｧFFmpeg繧貞ｮ溯｡鯉ｼ域耳螂ｨ・・

**繝｡繝ｪ繝・ヨ**:
- 螳悟・閾ｪ蜍募喧
- 繧ｹ繧ｱ繝ｼ繝ｩ繝悶Ν
- 繧ｳ繧ｹ繝亥柑邇・′濶ｯ縺・

**螳溯｣・*:
1. Cloud Run縺ｫFFmpeg繧貞性繧Docker繧､繝｡繝ｼ繧ｸ繧剃ｽ懈・
2. Supabase Functions縺九ｉCloud Run繧貞他縺ｳ蜃ｺ縺・
3. 蜍慕判逕滓・螳御ｺ・ｾ後ヾupabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・

### 繧ｪ繝励す繝ｧ繝ｳ2: Lambda Layer縺ｧFFmpeg繧剃ｽｿ逕ｨ

**繝｡繝ｪ繝・ヨ**:
- AWS Lambda縺ｧ螳溯｡悟庄閭ｽ
- 繧ｵ繝ｼ繝舌・繝ｬ繧ｹ

**螳溯｣・*:
1. Lambda Layer縺ｫFFmpeg繧貞性繧√ｋ
2. Supabase Functions縺九ｉLambda繧貞他縺ｳ蜃ｺ縺・

### 繧ｪ繝励す繝ｧ繝ｳ3: 螟夜Κ繧ｵ繝ｼ繝薙せ繧剃ｽｿ逕ｨ

**蛟呵｣・*:
- **Mux**: 蜍慕判蜃ｦ逅・PI
- **Cloudinary**: 繝｡繝・ぅ繧｢邂｡逅・・繝ｩ繝・ヨ繝輔か繝ｼ繝
- **Bunny.net**: 蜍慕判蜃ｦ逅・し繝ｼ繝薙せ

**繝｡繝ｪ繝・ヨ**:
- 螳溯｣・′邁｡蜊・
- 繧ｹ繧ｱ繝ｼ繝ｩ繝悶Ν

**繝・Γ繝ｪ繝・ヨ**:
- 繧ｳ繧ｹ繝医′縺九°繧句庄閭ｽ諤ｧ

---

## 投 迴ｾ蝨ｨ縺ｮ螳溯｣・憾豕・

| 繧ｹ繝・ャ繝・| 螳溯｣・憾豕・| 蛯呵・|
|---------|---------|------|
| 1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・ | 笨・螳御ｺ・| `generateVideoScript` |
| 2. TTS逕滓・ | 笨・螳御ｺ・| `generateSpeech` |
| 3. 閾ｪ蜍募虚逕ｻ邱ｨ髮・| 笞・・驛ｨ蛻・ｮ溯｣・| FFmpeg螳溯｡檎腸蠅・′蠢・ｦ・|
| 4. 蜈ｨSNS謚慕ｨｿ | 笨・螳御ｺ・| `orchestrator` (Agent 2) |

---

## 識 谺｡縺ｮ繧ｹ繝・ャ繝・

1. **FFmpeg螳溯｡檎腸蠅・ｒ讒狗ｯ・*
   - Cloud Run縲´ambda縲√∪縺溘・螟夜Κ繧ｵ繝ｼ繝薙せ繧帝∈謚・
   - `create-video-with-auto-edit` Function繧貞ｮ梧・縺輔○繧・

2. **繝・せ繝亥ｮ溯｡・*
   - 繝ｭ繝ｼ繧ｫ繝ｫ迺ｰ蠅・〒繝・せ繝・
   - 譛ｬ逡ｪ迺ｰ蠅・〒繝・・繝ｭ繧､

3. **螳悟・閾ｪ蜍募喧縺ｮ遒ｺ隱・*
   - 4繧ｹ繝・ャ繝励☆縺ｹ縺ｦ縺瑚・蜍輔〒螳溯｡後＆繧後ｋ縺薙→繧堤｢ｺ隱・

---

## 庁 謗ｨ螂ｨ: Cloud Run縺ｧFFmpeg繧貞ｮ溯｡・

**逅・罰**:
1. **螳悟・閾ｪ蜍募喧**: 謇句虚謫堺ｽ應ｸ崎ｦ・
2. **繧ｹ繧ｱ繝ｼ繝ｩ繝悶Ν**: 繝医Λ繝輔ぅ繝・け縺ｫ蠢懊§縺ｦ閾ｪ蜍輔せ繧ｱ繝ｼ繝ｫ
3. **繧ｳ繧ｹ繝亥柑邇・*: 菴ｿ逕ｨ驥上↓蠢懊§縺溯ｪｲ驥・

**螳溯｣・焔鬆・*:
1. Dockerfile繧剃ｽ懈・・・Fmpeg繧貞性繧・・
2. Cloud Run縺ｫ繝・・繝ｭ繧､
3. Supabase Functions縺九ｉ蜻ｼ縺ｳ蜃ｺ縺・

---

**譛邨よ峩譁ｰ**: 2026-01-22

