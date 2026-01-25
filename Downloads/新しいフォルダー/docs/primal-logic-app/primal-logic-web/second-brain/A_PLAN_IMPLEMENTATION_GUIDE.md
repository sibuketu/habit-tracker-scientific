# A譯亥ｮ溯｣・ぎ繧､繝会ｼ・akefilm蜆ｪ蜈・+ 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ・・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: A譯茨ｼ・akefilm蜆ｪ蜈・+ 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ・峨・螳溯｣・→菴ｿ逕ｨ譁ｹ豕・

---

## 識 A譯医・讎りｦ・

**繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ**:
1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・・・emini・・
2. 髻ｳ螢ｰ逕滓・・・levenLabs/Google TTS・・
3. 蜍慕判逕滓・・・akefilm API・・
4. 蜈ｨSNS謚慕ｨｿ

**繝｡繝ｪ繝・ヨ**:
- HeyGen縺ｮ蛻ｶ髯舌ｒ蝗樣∩
- 繧ｳ繧ｹ繝亥炎貂幢ｼ・levenLabs辟｡譁呎棧 or Google TTS螳悟・辟｡譁呻ｼ・
- Makefilm縺ｯ譌｢縺ｫ螳溯｣・ｸ医∩

---

## 逃 螳溯｣・ｸ医∩繝輔ぃ繧､繝ｫ

1. **`src/services/textToSpeech.ts`**: 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ・・levenLabs/Google TTS・・
2. **`src/services/videoGenerationWithTTS.ts`**: A譯医・繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ螳溯｣・

---

## 肌 繧ｻ繝・ヨ繧｢繝・・謇矩・

### Step 1: API繧ｭ繝ｼ縺ｮ蜿門ｾ・

#### ElevenLabs・域耳螂ｨ・・
1. [ElevenLabs](https://elevenlabs.io/)縺ｫ繧｢繧ｫ繧ｦ繝ｳ繝井ｽ懈・
2. API繧ｭ繝ｼ繧貞叙蠕暦ｼ育┌譁呎棧: 譛・0,000譁・ｭ暦ｼ・
3. 迺ｰ蠅・､画焚縺ｫ險ｭ螳・ `VITE_ELEVENLABS_API_KEY=your_api_key`

#### Google TTS・亥ｮ悟・辟｡譁呻ｼ・
1. [Google Cloud Console](https://console.cloud.google.com/)縺ｧ繝励Ο繧ｸ繧ｧ繧ｯ繝井ｽ懈・
2. Text-to-Speech API繧呈怏蜉ｹ蛹・
3. API繧ｭ繝ｼ繧貞叙蠕・
4. 迺ｰ蠅・､画焚縺ｫ險ｭ螳・ `VITE_GOOGLE_TTS_API_KEY=your_api_key`

#### Makefilm
1. Makefilm縺ｮAPI繧ｭ繝ｼ繧貞叙蠕・
2. 迺ｰ蠅・､画焚縺ｫ險ｭ螳・ `VITE_MAKEFILM_API_KEY=your_api_key`

### Step 2: 迺ｰ蠅・､画焚縺ｮ險ｭ螳・

`.env`繝輔ぃ繧､繝ｫ縺ｫ莉･荳九ｒ霑ｽ蜉:

```env
# 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key
VITE_GOOGLE_TTS_API_KEY=your_google_tts_api_key

# 蜍慕判逕滓・繧ｵ繝ｼ繝薙せ
VITE_MAKEFILM_API_KEY=your_makefilm_api_key
```

---

## 噫 菴ｿ逕ｨ譁ｹ豕・

### 蝓ｺ譛ｬ逧・↑菴ｿ縺・婿

```typescript
import { generateVideoWithTTS } from './services/videoGenerationWithTTS';

const options = {
  platform: 'youtube',
  language: 'en',
  topic: '繧｢繝｡繝ｪ繧ｫ縺ｮ譬・､翫ぎ繧､繝峨Λ繧､繝ｳ螟画峩',
  ttsProvider: 'elevenlabs', // 縺ｾ縺溘・ 'google'
};

const result = await generateVideoWithTTS(options);

if (result.videoUrl) {
  console.log('蜍慕判逕滓・謌仙粥:', result.videoUrl);
  console.log('髻ｳ螢ｰURL:', result.audioUrl);
} else {
  console.error('繧ｨ繝ｩ繝ｼ:', result.error);
}
```

### 繧ｪ繝励す繝ｧ繝ｳ險ｭ螳・

```typescript
const options = {
  platform: 'youtube' | 'tiktok' | 'instagram',
  language: 'en' | 'ja',
  topic: '繝医ヴ繝・け',
  ttsProvider: 'elevenlabs' | 'google', // 繝・ヵ繧ｩ繝ｫ繝・ 'elevenlabs'
  ttsVoiceId: '21m00Tcm4TlvDq8ikWAM', // ElevenLabs逕ｨ・医が繝励す繝ｧ繝ｳ・・
  ttsVoiceName: 'en-US-Neural2-D', // Google TTS逕ｨ・医が繝励す繝ｧ繝ｳ・・
};
```

---

## 投 繧ｳ繧ｹ繝域ｯ碑ｼ・

| 繧ｵ繝ｼ繝薙せ | 譛磯｡阪さ繧ｹ繝・| 蛻ｶ髯・| 謗ｨ螂ｨ蠎ｦ |
|---------|-----------|------|--------|
| **ElevenLabs** | $0-5/譛・| 10,000-30,000譁・ｭ・| 笨・謗ｨ螂ｨ |
| **Google TTS** | $0 | 0-4逋ｾ荳・枚蟄・| 笨・螳悟・辟｡譁・|
| **Makefilm** | 隕∫｢ｺ隱・| 隕∫｢ｺ隱・| 笨・譌｢縺ｫ螳溯｣・ｸ医∩ |

---

## 剥 繝医Λ繝悶Ν繧ｷ繝･繝ｼ繝・ぅ繝ｳ繧ｰ

### 髻ｳ螢ｰ逕滓・縺ｫ螟ｱ謨励☆繧句ｴ蜷・

1. **API繧ｭ繝ｼ縺梧ｭ｣縺励￥險ｭ螳壹＆繧後※縺・ｋ縺狗｢ｺ隱・*
   - `.env`繝輔ぃ繧､繝ｫ縺ｫ豁｣縺励￥險ｭ螳壹＆繧後※縺・ｋ縺・
   - 迺ｰ蠅・､画焚縺瑚ｪｭ縺ｿ霎ｼ縺ｾ繧後※縺・ｋ縺・

2. **辟｡譁呎棧縺ｮ蛻ｶ髯舌ｒ遒ｺ隱・*
   - ElevenLabs: 譛・0,000譁・ｭ励∪縺ｧ
   - Google TTS: 譛・-4逋ｾ荳・枚蟄暦ｼ亥慍蝓溘↓繧医ｋ・・

3. **繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ讖溯・**
   - ElevenLabs縺悟､ｱ謨励＠縺溷ｴ蜷医∬・蜍慕噪縺ｫGoogle TTS縺ｫ蛻・ｊ譖ｿ繧上ｋ

### 蜍慕判逕滓・縺ｫ螟ｱ謨励☆繧句ｴ蜷・

1. **Makefilm縺ｮAPI繧ｭ繝ｼ繧堤｢ｺ隱・*
2. **Makefilm縺ｮAPI繧ｨ繝ｳ繝峨・繧､繝ｳ繝医ｒ遒ｺ隱・*
3. **繧ｹ繧ｯ繝ｪ繝励ヨ縺ｮ髟ｷ縺輔ｒ遒ｺ隱・*・・akefilm縺ｮ蛻ｶ髯仙・縺具ｼ・

---

## 統 谺｡縺ｮ繧ｹ繝・ャ繝・

1. **API繧ｭ繝ｼ繧貞叙蠕・*・・levenLabs/Google TTS/Makefilm・・
2. **迺ｰ蠅・､画焚繧定ｨｭ螳・*・・.env`繝輔ぃ繧､繝ｫ・・
3. **繝・せ繝亥ｮ溯｡・*・育洒縺・せ繧ｯ繝ｪ繝励ヨ縺ｧ隧ｦ縺呻ｼ・
4. **譛ｬ逡ｪ驕狗畑**・亥ｮ滄圀縺ｮ繧ｳ繝ｳ繝・Φ繝・函謌撰ｼ・

---

## 迫 髢｢騾｣繝輔ぃ繧､繝ｫ

- `src/services/textToSpeech.ts`: 髻ｳ螢ｰ逕滓・繧ｵ繝ｼ繝薙せ
- `src/services/videoGenerationWithTTS.ts`: A譯医・繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ
- `src/services/videoGenerationMakefilm.ts`: Makefilm API邨ｱ蜷・
- `second-brain/HEYGEN_ALTERNATIVE_SOLUTION.md`: 莉｣譖ｿ譯医・隧ｳ邏ｰ
- `second-brain/VIDEO_WORKFLOW_ALTERNATIVE.md`: 莉｣譖ｿ繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ

---

**譛邨よ峩譁ｰ**: 2026-01-22

