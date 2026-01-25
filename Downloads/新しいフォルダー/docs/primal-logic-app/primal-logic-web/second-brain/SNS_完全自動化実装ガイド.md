# SNS螳悟・閾ｪ蜍募喧螳溯｣・ぎ繧､繝・

> **菴懈・譌･**: 2026-01-22  
> **逶ｮ逧・*: 4繧ｹ繝・ャ繝怜ｮ悟・閾ｪ蜍募喧繧貞ｮ溽樟縺吶ｋ縺溘ａ縺ｮ螳溯｣・ぎ繧､繝・

---

## 識 逶ｮ讓・

**4繧ｹ繝・ャ繝励〒螳悟・閾ｪ蜍募喧**:
1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・ 竊・笨・螳御ｺ・
2. TTS逕滓・ 竊・笨・螳御ｺ・
3. 閾ｪ蜍募虚逕ｻ邱ｨ髮・竊・笞・・**FFmpeg螳溯｡檎腸蠅・′蠢・ｦ・*
4. 蜈ｨSNS謚慕ｨｿ 竊・笨・orchestrator (Agent 2)

---

## 搭 繧・ｋ縺薙→繝ｪ繧ｹ繝・

### 笨・螳御ｺ・ｸ医∩

- [x] 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・ (`generateVideoScript`)
- [x] TTS逕滓・ (`generateSpeech` - Google TTS辟｡譁・
- [x] 閾ｪ蜍募虚逕ｻ邱ｨ髮・ython繧ｹ繧ｯ繝ｪ繝励ヨ (`scripts/auto_video_editor.py`)
- [x] TypeScript邨ｱ蜷・(`fullAutoVideoWorkflow.ts`)
- [x] Supabase Functions鬪ｨ譬ｼ (`create-video-with-auto-edit/index.ts`)

### 笞・・螳溯｣・′蠢・ｦ・ｼ亥━蜈磯・ｽ埼・ｼ・

#### 1. FFmpeg螳溯｡檎腸蠅・・讒狗ｯ会ｼ域怙蜆ｪ蜈茨ｼ・

**謗ｨ螂ｨ: Cloud Run**

**螳溯｣・焔鬆・*:
1. Dockerfile繧剃ｽ懈・・・Fmpeg繧貞性繧・・
2. Cloud Run縺ｫ繝・・繝ｭ繧､
3. Supabase Functions縺九ｉ蜻ｼ縺ｳ蜃ｺ縺・

**隧ｳ邏ｰ**: `NEXT_STEPS_GUIDE.md` 縺ｮ Step 1 繧貞盾辣ｧ

#### 2. Supabase Functions螳梧・

**螳溯｣・・螳ｹ**:
- Cloud Run繧貞他縺ｳ蜃ｺ縺励※FFmpeg繧貞ｮ溯｡・
- 蜍慕判逕滓・螳御ｺ・ｾ後ヾupabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・
- 蜍慕判URL繧定ｿ斐☆

**隧ｳ邏ｰ**: `NEXT_STEPS_GUIDE.md` 縺ｮ Step 2 繧貞盾辣ｧ

#### 3. 逕ｻ蜒上い繧ｻ繝・ヨ縺ｮ貅門ｙ

**螳溯｣・・螳ｹ**:
- 螳滄圀縺ｮ譁・嶌逕ｻ蜒上ｒ `assets/images/` 縺ｫ驟咲ｽｮ
- Supabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・

**隧ｳ邏ｰ**: `NEXT_STEPS_GUIDE.md` 縺ｮ Step 3 繧貞盾辣ｧ

#### 4. orchestrator螳梧・・・gent 2諡・ｽ難ｼ・

**螳溯｣・・螳ｹ**:
- 蜈ｨSNS謚慕ｨｿ縺ｮ邨ｱ蜷・
- 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ
- 繝ｪ繝医Λ繧､繝ｭ繧ｸ繝・け

**隧ｳ邏ｰ**: `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md` 繧貞盾辣ｧ

---

## 噫 莉翫☆縺舌ｄ繧九％縺ｨ

### Agent 1・医≠縺ｪ縺滂ｼ・

1. **FFmpeg螳溯｡檎腸蠅・・讒狗ｯ・*・域怙蜆ｪ蜈茨ｼ・
   - Cloud Run縺ｧFFmpeg繧貞ｮ溯｡後☆繧狗腸蠅・ｒ讒狗ｯ・
   - Dockerfile繧剃ｽ懈・
   - Cloud Run縺ｫ繝・・繝ｭ繧､

2. **Supabase Functions螳梧・**
   - `create-video-with-auto-edit` 繧貞ｮ梧・
   - Cloud Run縺ｨ騾｣謳ｺ

3. **逕ｻ蜒上い繧ｻ繝・ヨ縺ｮ貅門ｙ**
   - 螳滄圀縺ｮ譁・嶌逕ｻ蜒上ｒ貅門ｙ
   - Supabase Storage縺ｫ繧｢繝・・繝ｭ繝ｼ繝・

### Agent 2

- orchestrator螳梧・
- 蜈ｨSNS謚慕ｨｿ邨ｱ蜷・
- 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ繝ｻ繝ｪ繝医Λ繧､繝ｭ繧ｸ繝・け

---

## 投 螳溯｣・憾豕・

| 鬆・岼 | 螳溯｣・憾豕・| 諡・ｽ・|
|------|---------|------|
| 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・ | 笨・螳御ｺ・| Agent 1 |
| TTS逕滓・ | 笨・螳御ｺ・| Agent 1 |
| 閾ｪ蜍募虚逕ｻ邱ｨ髮・| 笞・・FFmpeg螳溯｡檎腸蠅・′蠢・ｦ・| Agent 1 |
| 蜈ｨSNS謚慕ｨｿ | 笨・orchestrator (Agent 2) | Agent 2 |

---

## 統 蜿り・ｳ・侭

- **螳溯｣・ぎ繧､繝・*: `NEXT_STEPS_GUIDE.md`
- **螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ**: `second-brain/FULL_AUTO_WORKFLOW_IMPLEMENTATION.md`
- **TTS + 閾ｪ蜍慕ｷｨ髮・*: `second-brain/TTS_AUTO_EDIT_WORKFLOW.md`
- **Agent 2蠑輔″邯吶℃**: `second-brain/AGENTS/AGENT_2_SNS_AUTOMATION_HANDOFF.md`

---

**譛邨よ峩譁ｰ**: 2026-01-22

