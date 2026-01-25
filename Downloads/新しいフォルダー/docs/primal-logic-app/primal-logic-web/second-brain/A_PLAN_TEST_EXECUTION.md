# A譯医ユ繧ｹ繝亥ｮ溯｡梧焔鬆・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: A譯茨ｼ・akefilm蜆ｪ蜈・+ 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ・峨・繝・せ繝亥ｮ溯｡・

---

## ｧｪ 繝・せ繝亥ｮ溯｡後・貅門ｙ

### 蜑肴署譚｡莉ｶ

1. **API繧ｭ繝ｼ縺ｮ蜿門ｾ・*:
   - 笨・ElevenLabs API繧ｭ繝ｼ・医∪縺溘・Google TTS API繧ｭ繝ｼ・・
   - 笨・Makefilm API繧ｭ繝ｼ

2. **迺ｰ蠅・､画焚縺ｮ險ｭ螳・*:
   ```env
   VITE_ELEVENLABS_API_KEY=your_key
   VITE_MAKEFILM_API_KEY=your_key
   ```

3. **繝・せ繝育畑繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ貅門ｙ**:
   - 遏ｭ縺・せ繧ｯ繝ｪ繝励ヨ・・0-60遘堤ｨ句ｺｦ・峨〒繝・せ繝・

---

## 噫 繝・せ繝亥ｮ溯｡梧焔鬆・

### Step 1: 髻ｳ螢ｰ逕滓・縺ｮ繝・せ繝・

```typescript
import { generateSpeech } from './services/textToSpeech';

// ElevenLabs縺ｧ繝・せ繝・
const audio = await generateSpeech({
  text: 'The U.S. government just admitted it. January 7th, 2025.',
  language: 'en',
  provider: 'elevenlabs',
});

console.log('髻ｳ螢ｰURL:', audio.audioUrl);
```

### Step 2: Makefilm縺ｮ繝・せ繝・

```typescript
import { generateVideoWithMakefilm } from './services/videoGenerationMakefilm';

const script = {
  title: 'Test Video',
  description: 'Test description',
  script: 'The U.S. government just admitted it.',
  hashtags: ['test'],
  duration: 30,
  language: 'en',
};

const videoUrl = await generateVideoWithMakefilm(script);
console.log('蜍慕判URL:', videoUrl);
```

### Step 3: A譯医・邨ｱ蜷医ユ繧ｹ繝・

```typescript
import { generateVideoWithTTS } from './services/videoGenerationWithTTS';

const result = await generateVideoWithTTS({
  platform: 'youtube',
  language: 'en',
  topic: '繧｢繝｡繝ｪ繧ｫ縺ｮ譬・､翫ぎ繧､繝峨Λ繧､繝ｳ螟画峩',
  ttsProvider: 'elevenlabs',
});

console.log('邨先棡:', result);
```

---

## 笨・譛溷ｾ・＆繧後ｋ邨先棡

1. **髻ｳ螢ｰ逕滓・**: MP3繝輔ぃ繧､繝ｫ縺檎函謌舌＆繧後ｋ
2. **蜍慕判逕滓・**: MP4繝輔ぃ繧､繝ｫ縺檎函謌舌＆繧後ｋ
3. **邨ｱ蜷・*: 髻ｳ螢ｰ縺ｨ蜍慕判縺梧ｭ｣縺励￥邨ｱ蜷医＆繧後ｋ

---

## 剥 繝√ぉ繝・け繝昴う繝ｳ繝・

- [ ] 髻ｳ螢ｰ逕滓・縺梧・蜉溘☆繧九°
- [ ] 蜍慕判逕滓・縺梧・蜉溘☆繧九°
- [ ] 髻ｳ螢ｰ縺ｨ蜍慕判縺梧ｭ｣縺励￥邨ｱ蜷医＆繧後ｋ縺・
- [ ] 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ縺梧ｭ｣縺励￥蜍穂ｽ懊☆繧九°
- [ ] 繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ讖溯・縺悟虚菴懊☆繧九°・・levenLabs螟ｱ謨玲凾 竊・Google TTS・・

---

**譛邨よ峩譁ｰ**: 2026-01-22

