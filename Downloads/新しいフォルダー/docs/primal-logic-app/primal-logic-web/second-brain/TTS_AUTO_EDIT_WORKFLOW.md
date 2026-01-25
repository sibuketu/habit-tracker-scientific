# TTS + 閾ｪ蜍募虚逕ｻ邱ｨ髮・Ρ繝ｼ繧ｯ繝輔Ο繝ｼ・亥ｮ悟・閾ｪ蜍募喧・・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: TTS・磯浹螢ｰ逕滓・・・+ 閾ｪ蜍募虚逕ｻ邱ｨ髮・〒螳悟・閾ｪ蜍募喧繧貞ｮ溽樟

---

## 識 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ

### 繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ蝗ｳ

```mermaid
graph LR
    Step1[繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・] -->|Text| Step2[TTS逕滓・]
    Step2 -->|Audio MP3| Step3[髻ｳ螢ｰ繝輔ぃ繧､繝ｫ菫晏ｭ肋
    Step3 -->|Audio + Images| Step4[閾ｪ蜍募虚逕ｻ邱ｨ髮・
    Step4 -->|MP4 Video| Step5[蜈ｨSNS謚慕ｨｿ]
```

**迚ｹ蠕ｴ**:
- **螳悟・閾ｪ蜍募喧**: 謇句虚邱ｨ髮・ｸ崎ｦ・
- **螳滄圀縺ｮ譁・嶌逕ｻ蜒・*: 謾ｿ蠎懈枚譖ｸ縲∬ｧ｣蜑門峙縲∫皮ｩｶ繧ｰ繝ｩ繝輔ｒ閾ｪ蜍暮・鄂ｮ
- **蟄怜ｹ戊・蜍戊ｿｽ蜉**: 遐皮ｩｶ蠑慕畑繧ょｭ怜ｹ輔〒閾ｪ蜍戊｡ｨ遉ｺ

---

## 噫 螳溯｣・・螳ｹ

### 1. 閾ｪ蜍募虚逕ｻ邱ｨ髮・せ繧ｯ繝ｪ繝励ヨ・・ython + FFmpeg・・

**繝輔ぃ繧､繝ｫ**: `scripts/auto_video_editor.py`

**讖溯・**:
- 髻ｳ螢ｰ + 逕ｻ蜒上ｒ閾ｪ蜍募粋謌・
- 蟄怜ｹ輔ｒ閾ｪ蜍戊ｿｽ蜉
- 隗｣蜒丞ｺｦ繝ｻ繝輔Ξ繝ｼ繝繝ｬ繝ｼ繝医ｒ閾ｪ蜍戊ｪｿ謨ｴ

**菴ｿ縺・婿**:
```bash
python3 scripts/auto_video_editor.py \
  --audio audio.mp3 \
  --images images.json \
  --subtitles subtitles.json \
  --output output.mp4 \
  --width 1080 \
  --height 1920
```

### 2. TypeScript邨ｱ蜷・

**繝輔ぃ繧､繝ｫ**: `src/services/autoVideoEditor.ts`

**讖溯・**:
- Python繧ｹ繧ｯ繝ｪ繝励ヨ繧貞他縺ｳ蜃ｺ縺・
- 逕ｻ蜒乗ュ蝣ｱ繝ｻ蟄怜ｹ墓ュ蝣ｱ繧谷SON縺ｧ邂｡逅・
- 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ

---

## 統 菴ｿ逕ｨ萓・

### Step 1: 髻ｳ螢ｰ逕滓・

```typescript
import { generateSpeech } from './services/textToSpeech';

const audio = await generateSpeech({
  text: 'The U.S. government just admitted it...',
  language: 'en',
  provider: 'google', // 螳悟・辟｡譁・
});

// audio.audioUrl 繧偵ム繧ｦ繝ｳ繝ｭ繝ｼ繝峨＠縺ｦ audio.mp3 縺ｨ縺励※菫晏ｭ・
```

### Step 2: 逕ｻ蜒乗ュ蝣ｱ繧呈ｺ門ｙ

```json
{
  "images": [
    {
      "path": "assets/images/government_guidelines_doc.jpg",
      "start": 0,
      "duration": 5,
      "description": "繧｢繝｡繝ｪ繧ｫ謾ｿ蠎懊・譬・､翫ぎ繧､繝峨Λ繧､繝ｳ譁・嶌"
    },
    {
      "path": "assets/images/anatomy_diagram.jpg",
      "start": 5,
      "duration": 8,
      "description": "繝ｪ繧｢繝ｫ縺ｪ隗｣蜑門峙"
    }
  ]
}
```

### Step 3: 蟄怜ｹ墓ュ蝣ｱ繧呈ｺ門ｙ

```json
{
  "subtitles": [
    {
      "text": "The U.S. government just admitted it.",
      "start": 0,
      "duration": 3
    },
    {
      "text": "Source: USDA Dietary Guidelines 2025",
      "start": 3,
      "duration": 2
    }
  ]
}
```

### Step 4: 閾ｪ蜍募虚逕ｻ邱ｨ髮・ｒ螳溯｡・

```typescript
import { autoEditVideo } from './services/autoVideoEditor';

const result = await autoEditVideo({
  audioPath: 'audio.mp3',
  images: [
    { path: 'assets/images/government_guidelines_doc.jpg', start: 0, duration: 5 },
    { path: 'assets/images/anatomy_diagram.jpg', start: 5, duration: 8 },
  ],
  subtitles: [
    { text: 'The U.S. government just admitted it.', start: 0, duration: 3 },
    { text: 'Source: USDA Dietary Guidelines 2025', start: 3, duration: 2 },
  ],
  outputPath: 'output.mp4',
  width: 1080,
  height: 1920,
});

if (result.success) {
  console.log('笨・蜍慕判逕滓・螳御ｺ・', result.videoPath);
}
```

---

## 投 繝｡繝ｪ繝・ヨ

| 鬆・岼 | TTS + 閾ｪ蜍慕ｷｨ髮・| 謇句虚邱ｨ髮・| Makefilm API |
|------|---------------|---------|--------------|
| **閾ｪ蜍募喧** | 笨・螳悟・閾ｪ蜍・| 笶・謇句虚 | 笨・螳悟・閾ｪ蜍・|
| **繧ｳ繧ｹ繝・* | $0・・oogle TTS・・| $0 | 隕∫｢ｺ隱・|
| **譟碑ｻ滓ｧ** | 笨・鬮假ｼ亥ｮ滄圀縺ｮ譁・嶌逕ｻ蜒擾ｼ・| 笨・鬮・| 笞・・荳ｭ |
| **繝悶Λ繝ｳ繝牙刀雉ｪ** | 笨・鬮假ｼ亥ｮ滄圀縺ｮ譁・嶌・・| 笨・鬮・| 笞・・荳ｭ |

---

## 識 謗ｨ螂ｨ: TTS + 閾ｪ蜍募虚逕ｻ邱ｨ髮・

**逅・罰**:
1. **螳悟・閾ｪ蜍募喧**: 謇句虚邱ｨ髮・ｸ崎ｦ・
2. **繧ｳ繧ｹ繝亥炎貂・*: Google TTS縺ｯ螳悟・辟｡譁・
3. **繝悶Λ繝ｳ繝牙刀雉ｪ**: 螳滄圀縺ｮ譁・嶌逕ｻ蜒上ｒ閾ｪ逕ｱ縺ｫ菴ｿ逕ｨ蜿ｯ閭ｽ
4. **譟碑ｻ滓ｧ**: 逕ｻ蜒上・蟄怜ｹ輔ｒ閾ｪ逕ｱ縺ｫ繧ｫ繧ｹ繧ｿ繝槭う繧ｺ蜿ｯ閭ｽ

---

## 統 谺｡縺ｮ繧ｹ繝・ャ繝・

1. **FFmpeg縺ｮ繧､繝ｳ繧ｹ繝医・繝ｫ**: https://ffmpeg.org/download.html
2. **Python繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ繝・せ繝・*: `scripts/auto_video_editor.py` 繧貞ｮ溯｡・
3. **逕ｻ蜒上い繧ｻ繝・ヨ縺ｮ貅門ｙ**: 螳滄圀縺ｮ譁・嶌逕ｻ蜒上ｒ `assets/images/` 縺ｫ驟咲ｽｮ
4. **邨ｱ蜷医ユ繧ｹ繝・*: TypeScript縺九ｉPython繧ｹ繧ｯ繝ｪ繝励ヨ繧貞他縺ｳ蜃ｺ縺・

---

**譛邨よ峩譁ｰ**: 2026-01-22

