/**
 * 逕ｻ蜒冗函謌舌し繝ｼ繝薙せ・育┌譁咏沿 - 繝励Ο繝ｳ繝励ヨ逕滓・縺ｮ縺ｿ・・ *
 * 螳滄圀縺ｮ逕ｻ蜒冗函謌舌・螟夜Κ繧ｵ繝ｼ繝薙せ縺ｧ謇句虚螳溯｡・ * 蟆・擂逧・↓辟｡譁僊PI・・eplicate遲会ｼ峨ｒ邨ｱ蜷亥庄閭ｽ
 */

import { logError } from '../utils/errorHandler';

// 豕ｨ諢・ DALLﾂｷE 3縺ｯ譛画侭縺ｮ縺溘ａ縲∫樟蝨ｨ縺ｯ繝励Ο繝ｳ繝励ヨ逕滓・縺ｮ縺ｿ
// 螳滄圀縺ｮ逕ｻ蜒冗函謌舌・謇句虚縺ｧ陦後≧縺九∫┌譁僊PI繧剃ｽｿ逕ｨ

/**
 * 逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ繧堤函謌撰ｼ育┌譁咏沿・・ *
 * 螳滄圀縺ｮ逕ｻ蜒冗函謌舌・謇句虚縺ｧ陦後≧縺九∫┌譁僊PI繧ｵ繝ｼ繝薙せ繧剃ｽｿ逕ｨ縺励※縺上□縺輔＞
 *
 * @param prompt 逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ
 * @param size 逕ｻ蜒上し繧､繧ｺ・医ョ繝輔か繝ｫ繝・ "1024x1024"・・ * @returns 繝励Ο繝ｳ繝励ヨ譁・ｭ怜・・育判蜒酋RL縺ｧ縺ｯ縺ｪ縺・ｼ・ */
export async function generateImage(
  prompt: string,
  size: '1024x1024' | '1792x1024' | '1024x1792' = '1024x1024'
): Promise<string> {
  // 辟｡譁咏沿: 繝励Ο繝ｳ繝励ヨ繧定ｿ斐☆縺縺・  // 螳滄圀縺ｮ逕ｻ蜒冗函謌舌・莉･荳九・繧ｵ繝ｼ繝薙せ縺ｧ謇句虚螳溯｡・
  // - https://replicate.com/ (Stable Diffusion - 辟｡譁呎棧縺ゅｊ)
  // - https://huggingface.co/spaces/stabilityai/stable-diffusion (螳悟・辟｡譁・
  // - https://www.craiyon.com/ (辟｡譁・

  if (import.meta.env.DEV) {
    console.log('逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ:', prompt);
    console.log('繧ｵ繧､繧ｺ:', size);
    console.log('\n縺薙・繝励Ο繝ｳ繝励ヨ繧剃ｻ･荳九・辟｡譁吶し繝ｼ繝薙せ縺ｧ菴ｿ逕ｨ縺励※縺上□縺輔＞:');
    console.log('- Replicate: https://replicate.com/');
    console.log('- Hugging Face: https://huggingface.co/spaces/stabilityai/stable-diffusion');
    console.log('- Craiyon: https://www.craiyon.com/');
  }

  // 繝励Ο繝ｳ繝励ヨ繧偵け繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・縺吶ｋ讖溯・繧呈署萓・  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(prompt);
      if (import.meta.env.DEV) {
        console.log('繝励Ο繝ｳ繝励ヨ繧偵け繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・縺励∪縺励◆');
      }
    } catch (err) {
      logError(err, {
        component: 'imageGenerationService',
        action: 'generateImage',
        step: 'copyToClipboard',
      });
    }
  }

  // 繧ｨ繝ｩ繝ｼ繧偵せ繝ｭ繝ｼ縺励※縲ゞI蛛ｴ縺ｧ謇句虚逕滓・繧呈｡亥・
  throw new Error(
    `腸 逕ｻ蜒冗函謌舌・譛画侭API縺ｮ縺溘ａ縲∫樟蝨ｨ縺ｯ閾ｪ蜍慕函謌舌〒縺阪∪縺帙ｓ縲・n\n` +
      `搭 逕滓・縺輔ｌ縺溘・繝ｭ繝ｳ繝励ヨ: ${prompt}\n\n` +
      `笨・莉･荳九・辟｡譁吶し繝ｼ繝薙せ縺ｧ謇句虚逕滓・縺励※縺上□縺輔＞:\n` +
      `- Replicate (Stable Diffusion): https://replicate.com/\n` +
      `- Hugging Face: https://huggingface.co/spaces/stabilityai/stable-diffusion\n` +
      `- Craiyon: https://www.craiyon.com/\n\n` +
      `・医・繝ｭ繝ｳ繝励ヨ縺ｯ繧ｯ繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・縺輔ｌ縺ｦ縺・∪縺呻ｼ荏
  );
}

/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ繧堤函謌・ *
 * @param style 繧｢繧､繧ｳ繝ｳ縺ｮ繧ｹ繧ｿ繧､繝ｫ・・: 繝溘・繝医い繧､繧ｳ繝ｳ縲・: 隲也炊+閧峨・: C譁・ｭ・閧会ｼ・ * @param variation 繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ逡ｪ蜿ｷ・・-4・・ * @returns 逕滓・縺輔ｌ縺溽判蜒上・URL
 */
export async function generateAppIcon(
  style: 1 | 2 | 3,
  variation: 1 | 2 | 3 | 4 = 1
): Promise<string> {
  const prompt = getAppIconPrompt(style, variation);
  return generateImage(prompt, '1024x1024');
}

/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ縺ｮ繝励Ο繝ｳ繝励ヨ繧貞叙蠕暦ｼ亥・驛ｨ髢｢謨ｰ・・ */
function getAppIconPrompt(style: 1 | 2 | 3, variation: 1 | 2 | 3 | 4): string {
  const prompts = {
    1: [
      'Create a simple, modern app icon for a carnivore diet app called "CarnivoreGuid". Square format (1024x1024px), geometric abstract meat shape, style: Modern clean minimalist, colors: Warm reds and browns, no text, bold clear silhouette recognizable at 16x16px, rounded corners, app icon style.',
      'Create a simple, modern app icon for a carnivore diet app called "CarnivoreGuid". Square format (1024x1024px), realistic but simplified steak silhouette, style: Modern clean minimalist, colors: Warm reds and browns, no text, bold clear silhouette recognizable at 16x16px, rounded corners, app icon style.',
      'Create a simple, modern app icon for a carnivore diet app called "CarnivoreGuid". Square format (1024x1024px), minimalist meat cut outline, style: Modern clean minimalist, colors: Warm reds and browns, no text, bold clear silhouette recognizable at 16x16px, rounded corners, app icon style.',
      'Create a simple, modern app icon for a carnivore diet app called "CarnivoreGuid". Square format (1024x1024px), bold flat design meat icon, style: Modern clean minimalist, colors: Warm reds and browns, no text, bold clear silhouette recognizable at 16x16px, rounded corners, app icon style.',
    ],
    2: [
      'Create a modern app icon combining "logic" and "meat" concepts for "CarnivoreGuid" app. Square format (1024x1024px), brain icon with meat texture inside, style: Modern geometric clean, colors: Cool blues (logic) + warm reds (meat), no text, recognizable at 16x16px, rounded corners, app icon style.',
      'Create a modern app icon combining "logic" and "meat" concepts for "CarnivoreGuid" app. Square format (1024x1024px), meat cut with logic/circuit pattern overlay, style: Modern geometric clean, colors: Cool blues (logic) + warm reds (meat), no text, recognizable at 16x16px, rounded corners, app icon style.',
      'Create a modern app icon combining "logic" and "meat" concepts for "CarnivoreGuid" app. Square format (1024x1024px), geometric brain and meat icon side by side, style: Modern geometric clean, colors: Cool blues (logic) + warm reds (meat), no text, recognizable at 16x16px, rounded corners, app icon style.',
    ],
    3: [
      'Create a modern app icon featuring the letter "C" (for Carnivore) combined with a meat element for "CarnivoreGuid" app. Square format (1024x1024px), bold sans-serif "C" with meat icon inside, style: Modern bold typography + icon, colors: Strong vibrant colors (reds, oranges), "C" prominent and readable at small sizes, rounded corners, app icon style.',
      'Create a modern app icon featuring the letter "C" (for Carnivore) combined with a meat element for "CarnivoreGuid" app. Square format (1024x1024px), "C" made of meat texture/pattern, style: Modern bold typography + icon, colors: Strong vibrant colors (reds, oranges), "C" prominent and readable at small sizes, rounded corners, app icon style.',
      'Create a modern app icon featuring the letter "C" (for Carnivore) combined with a meat element for "CarnivoreGuid" app. Square format (1024x1024px), meat icon replacing part of the "C" letter, style: Modern bold typography + icon, colors: Strong vibrant colors (reds, oranges), "C" prominent and readable at small sizes, rounded corners, app icon style.',
    ],
  };

  const stylePrompts = prompts[style];
  const index = Math.min(variation - 1, stylePrompts.length - 1);
  return stylePrompts[index];
}

/**
 * 隍・焚縺ｮ繧｢繝励Μ繧｢繧､繧ｳ繝ｳ繝励Ο繝ｳ繝励ヨ繧剃ｸ諡ｬ逕滓・・・0蛟狗ｨ句ｺｦ・・ *
 * 辟｡譁咏沿: 繝励Ο繝ｳ繝励ヨ繧堤函謌舌☆繧九□縺代ょｮ滄圀縺ｮ逕ｻ蜒冗函謌舌・謇句虚縺ｧ陦後≧
 *
 * @returns 繝励Ο繝ｳ繝励ヨ縺ｮ驟榊・・医お繝ｩ繝ｼ繧偵せ繝ｭ繝ｼ縺励※繝励Ο繝ｳ繝励ヨ繧定｡ｨ遉ｺ・・ */
export async function generateMultipleAppIcons(): Promise<
  Array<{ style: number; variation: number; url: string }>
> {
  // 辟｡譁咏沿: 縺吶∋縺ｦ縺ｮ繝励Ο繝ｳ繝励ヨ繧偵∪縺ｨ繧√※陦ｨ遉ｺ
  const allPrompts: Array<{ style: number; variation: number; prompt: string }> = [];

  // 繧ｹ繧ｿ繧､繝ｫ1: 4繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 4; v++) {
    const prompt = getAppIconPrompt(1, v as 1 | 2 | 3 | 4);
    allPrompts.push({ style: 1, variation: v, prompt });
  }

  // 繧ｹ繧ｿ繧､繝ｫ2: 3繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 3; v++) {
    const prompt = getAppIconPrompt(2, v as 1 | 2 | 3);
    allPrompts.push({ style: 2, variation: v, prompt });
  }

  // 繧ｹ繧ｿ繧､繝ｫ3: 3繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 3; v++) {
    const prompt = getAppIconPrompt(3, v as 1 | 2 | 3);
    allPrompts.push({ style: 3, variation: v, prompt });
  }

  // 縺吶∋縺ｦ縺ｮ繝励Ο繝ｳ繝励ヨ繧偵け繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・
  const promptsText = allPrompts
    .map(
      (p, idx) => `${idx + 1}. 繧ｹ繧ｿ繧､繝ｫ${p.style} - 繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ${p.variation}:\n${p.prompt}\n`
    )
    .join('\n');

  if (navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(promptsText);
    } catch (err) {
      logError(err, {
        component: 'imageGenerationService',
        action: 'generateMultipleAppIcons',
        step: 'copyToClipboard',
      });
    }
  }

  // 繧ｨ繝ｩ繝ｼ縺ｨ縺励※繝励Ο繝ｳ繝励ヨ繧定ｿ斐☆・・I蛛ｴ縺ｧ陦ｨ遉ｺ・・  throw new Error(
    `腸 逕ｻ蜒冗函謌舌・譛画侭API縺ｮ縺溘ａ縲∫樟蝨ｨ縺ｯ閾ｪ蜍慕函謌舌〒縺阪∪縺帙ｓ縲・n\n` +
      `搭 莉･荳九・10蛟九・繝励Ο繝ｳ繝励ヨ縺後け繝ｪ繝・・繝懊・繝峨↓繧ｳ繝斐・縺輔ｌ縺ｾ縺励◆:\n\n` +
      promptsText +
      `\n笨・辟｡譁吶〒逕ｻ蜒冗函謌舌☆繧区婿豕・\n` +
      `1. Replicate (Stable Diffusion): https://replicate.com/\n` +
      `   - 辟｡譁呎棧縺ゅｊ縲・ｫ伜刀雉ｪ\n` +
      `2. Hugging Face: https://huggingface.co/spaces/stabilityai/stable-diffusion\n` +
      `   - 螳悟・辟｡譁兔n` +
      `3. Craiyon: https://www.craiyon.com/\n` +
      `   - 螳悟・辟｡譁兔n\n` +
      `荳願ｨ倥・繧ｵ繝ｼ繝薙せ縺ｫ繝励Ο繝ｳ繝励ヨ繧定ｲｼ繧贋ｻ倥￠縺ｦ縲・0蛟九・逕ｻ蜒上ｒ逕滓・縺励※縺上□縺輔＞縲Ａ
  );
}

/**
 * SNS謚慕ｨｿ逕ｨ縺ｮ逕ｻ蜒上ｒ逕滓・
 *
 * @param prompt 逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ
 * @returns 逕滓・縺輔ｌ縺溽判蜒上・URL
 */
export async function generateSNSImage(prompt: string): Promise<string> {
  const enhancedPrompt = `Create a social media post image for a carnivore diet app. ${prompt} Style: Modern, engaging, Instagram/Twitter optimized, 1024x1024px, high quality, vibrant colors.`;
  return generateImage(enhancedPrompt, '1024x1024');
}

