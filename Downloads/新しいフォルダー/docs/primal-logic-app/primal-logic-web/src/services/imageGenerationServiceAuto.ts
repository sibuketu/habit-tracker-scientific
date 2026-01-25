/**
 * 逕ｻ蜒冗函謌舌し繝ｼ繝薙せ・郁・蜍募喧迚・- 辟｡譁僊PI菴ｿ逕ｨ・・ *
 * Replicate API・・table Diffusion・峨ｒ菴ｿ逕ｨ縺励※閾ｪ蜍慕函謌・ * 辟｡譁呎棧縺ゅｊ縲、PI邨檎罰縺ｧ螳悟・閾ｪ蜍募喧蜿ｯ閭ｽ
 */

import { logError } from '../utils/errorHandler';

const REPLICATE_API_TOKEN = import.meta.env.VITE_REPLICATE_API_TOKEN;

/**
 * Replicate API・・table Diffusion・峨〒逕ｻ蜒上ｒ閾ｪ蜍慕函謌・ *
 * @param prompt 逕ｻ蜒冗函謌舌・繝ｭ繝ｳ繝励ヨ
 * @returns 逕滓・縺輔ｌ縺溽判蜒上・URL
 */
export async function generateImageAuto(prompt: string): Promise<string> {
  if (!REPLICATE_API_TOKEN) {
    throw new Error(
      'Replicate API繝医・繧ｯ繝ｳ縺瑚ｨｭ螳壹＆繧後※縺・∪縺帙ｓ縲・n' +
        'VITE_REPLICATE_API_TOKEN 繧・.env 繝輔ぃ繧､繝ｫ縺ｫ險ｭ螳壹＠縺ｦ縺上□縺輔＞縲・n\n' +
        '蜿門ｾ玲婿豕・\n' +
        '1. https://replicate.com/ 縺ｧ繧｢繧ｫ繧ｦ繝ｳ繝井ｽ懈・・育┌譁呻ｼ噂n' +
        '2. https://replicate.com/account/api-tokens 縺ｧAPI繝医・繧ｯ繝ｳ繧貞叙蠕予n' +
        '3. .env繝輔ぃ繧､繝ｫ縺ｫ霑ｽ蜉: VITE_REPLICATE_API_TOKEN=r8_...'
    );
  }

  try {
    if (import.meta.env.DEV) {
      console.log('Generating image with Replicate API:', prompt);
    }

    // Replicate API縺ｧStable Diffusion繧貞ｮ溯｡・    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${REPLICATE_API_TOKEN}`,
      },
      body: JSON.stringify({
        version: 'db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf', // stable-diffusion-2.1
        input: {
          prompt: prompt,
          width: 1024,
          height: 1024,
          num_outputs: 1,
        },
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `逕ｻ蜒冗函謌舌↓螟ｱ謨励＠縺ｾ縺励◆: ${response.status} ${response.statusText}\n` +
          `${errorData.error || JSON.stringify(errorData)}`
      );
    }

    const prediction = await response.json();
    const predictionId = prediction.id;

    // 逕滓・縺悟ｮ御ｺ・☆繧九∪縺ｧ蠕・ｩ滂ｼ医・繝ｼ繝ｪ繝ｳ繧ｰ・・    let result = prediction;
    while (result.status === 'starting' || result.status === 'processing') {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // 1遘貞ｾ・ｩ・
      const statusResponse = await fetch(
        `https://api.replicate.com/v1/predictions/${predictionId}`,
        {
          headers: {
            Authorization: `Token ${REPLICATE_API_TOKEN}`,
          },
        }
      );

      result = await statusResponse.json();
    }

    if (result.status === 'succeeded' && result.output && result.output.length > 0) {
      const imageUrl = result.output[0];
      if (import.meta.env.DEV) {
        console.log('Image generated successfully:', imageUrl);
      }
      return imageUrl;
    } else {
      throw new Error(`逕ｻ蜒冗函謌舌↓螟ｱ謨励＠縺ｾ縺励◆: ${result.error || '荳肴・縺ｪ繧ｨ繝ｩ繝ｼ'}`);
    }
  } catch (error) {
    logError(error, { component: 'imageGenerationServiceAuto', action: 'generateImageAuto' });
    throw error;
  }
}

/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ繧定・蜍慕函謌撰ｼ・eplicate API菴ｿ逕ｨ・・ */
export async function generateAppIconAuto(
  style: 1 | 2 | 3,
  variation: 1 | 2 | 3 | 4 = 1
): Promise<string> {
  const prompt = getAppIconPrompt(style, variation);
  return generateImageAuto(prompt);
}

/**
 * 隍・焚縺ｮ繧｢繝励Μ繧｢繧､繧ｳ繝ｳ繧剃ｸ諡ｬ閾ｪ蜍慕函謌撰ｼ・0蛟具ｼ・ */
export async function generateMultipleAppIconsAuto(): Promise<
  Array<{ style: number; variation: number; url: string }>
> {
  const results: Array<{ style: number; variation: number; url: string }> = [];

  // 繧ｹ繧ｿ繧､繝ｫ1: 4繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 4; v++) {
    try {
      const url = await generateAppIconAuto(1, v as 1 | 2 | 3 | 4);
      results.push({ style: 1, variation: v, url });
      await new Promise((resolve) => setTimeout(resolve, 2000)); // API繝ｬ繝ｼ繝亥宛髯仙ｯｾ遲・    } catch (error) {
      logError(error, {
        component: 'imageGenerationServiceAuto',
        action: 'generateMultipleAppIconsAuto',
        style: 1,
        variation: v,
      });
    }
  }

  // 繧ｹ繧ｿ繧､繝ｫ2: 3繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 3; v++) {
    try {
      const url = await generateAppIconAuto(2, v as 1 | 2 | 3);
      results.push({ style: 2, variation: v, url });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      logError(error, {
        component: 'imageGenerationServiceAuto',
        action: 'generateMultipleAppIconsAuto',
        style: 2,
        variation: v,
      });
    }
  }

  // 繧ｹ繧ｿ繧､繝ｫ3: 3繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ
  for (let v = 1; v <= 3; v++) {
    try {
      const url = await generateAppIconAuto(3, v as 1 | 2 | 3);
      results.push({ style: 3, variation: v, url });
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      logError(error, {
        component: 'imageGenerationServiceAuto',
        action: 'generateMultipleAppIconsAuto',
        style: 3,
        variation: v,
      });
    }
  }

  return results;
}

/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ縺ｮ繝励Ο繝ｳ繝励ヨ繧貞叙蠕暦ｼ亥・騾夐未謨ｰ・・ */
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
      'Create a modern app icon combining "logic" and "meat" concepts for "CarnivoreGuid" app. Square format (1024x1024px), geometric brain and meat icon side by side, style: Modern geometric clean, colors: Cool blues (logic) + warm reds (meat), no text, recognizable at 16x1024px, rounded corners, app icon style.',
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

