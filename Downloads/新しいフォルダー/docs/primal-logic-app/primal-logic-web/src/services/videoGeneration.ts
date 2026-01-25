/**
 * CarnivoreOS - Video Generation Service
 *
 * 蜍慕判逕滓・讖溯・: Makefilm/HeyGen/Runway API繧剃ｽｿ逕ｨ縺励※繝ｭ繝ｳ繧ｰ蜍慕判繧定・蜍慕函謌・ */

import { logError } from '../utils/errorHandler';
import { geminiGenerate } from './geminiProxy';

export interface VideoScript {
  title: string;
  description: string;
  script: string; // 蜍慕判縺ｮ蜿ｰ譛ｬ
  hashtags: string[];
  duration: number; // 遘・  contentType?: ContentType; // 繧ｳ繝ｳ繝・Φ繝・ち繧､繝・  templateSelection?: TemplateSelection; // 驕ｸ謚槭＆繧後◆繝・Φ繝励Ξ繝ｼ繝・  language?: 'ja' | 'en' | 'fr' | 'de'; // 險隱橸ｼ医ョ繝輔か繝ｫ繝・ 'ja'・・  platform?: 'youtube' | 'tiktok' | 'instagram'; // 繝励Λ繝・ヨ繝輔か繝ｼ繝・医い繧ｹ繝壹け繝域ｯ斐・豎ｺ螳壹↓菴ｿ逕ｨ・・}

export type ContentType =
  | 'explainer' // 隱ｬ譏主虚逕ｻ
  | 'counter' // 蜿崎ｫ門虚逕ｻ
  | 'testimonial' // 菴馴ｨ楢ｫ・  | 'educational' // 謨呵ご蜍慕判
  | 'entertainment'; // 繧ｨ繝ｳ繧ｿ繝｡蜍慕判

export type VideoType = 'long' | 'short';

export interface TemplateSelection {
  template: string;
  category: string;
  orientation: 'landscape' | 'portrait';
  style: string;
  reason: string;
}

export interface VideoGenerationOptions {
  platform: 'youtube' | 'tiktok' | 'instagram';
  language: 'ja' | 'en' | 'fr' | 'de';
  topic?: string; // 繝医ヴ繝・け・域欠螳壹′縺ｪ縺・ｴ蜷医・繝ｩ繝ｳ繝繝・・  contentType?: ContentType; // 繧ｳ繝ｳ繝・Φ繝・ち繧､繝暦ｼ郁・蜍募愛螳壹ｂ蜿ｯ閭ｽ・・  videoType?: VideoType; // 繝ｭ繝ｳ繧ｰ or 繧ｷ繝ｧ繝ｼ繝茨ｼ・latform縺九ｉ閾ｪ蜍募愛螳壹ｂ蜿ｯ閭ｽ・・  useFreePlan?: boolean; // Free繝励Λ繝ｳ繧剃ｽｿ逕ｨ縺吶ｋ蝣ｴ蜷・rue・・蛻・・720p繝ｻ譛・譛ｬ縺ｾ縺ｧ・・  apiKeys?: {
    heyGen?: string;
    makefilm?: string;
    runway?: string;
  };
}

/**
 * 繧ｳ繝ｳ繝・Φ繝・ち繧､繝励ｒ閾ｪ蜍募愛螳・ */
export function detectContentType(script: string): ContentType {
  const scriptLower = script.toLowerCase();

  // 蜿崎ｫ門虚逕ｻ縺ｮ繧ｭ繝ｼ繝ｯ繝ｼ繝・  const counterKeywords = [
    '蜿崎ｫ・,
    '髢馴＆縺・,
    '謇ｹ蛻､',
    'counter',
    'myth',
    'debunk',
    'wrong',
    'misconception',
  ];
  if (counterKeywords.some((keyword) => scriptLower.includes(keyword))) {
    return 'counter';
  }

  // 菴馴ｨ楢ｫ・・繧ｭ繝ｼ繝ｯ繝ｼ繝・  const testimonialKeywords = [
    '菴馴ｨ・,
    '螳溯ｷｵ',
    '邨先棡',
    'testimonial',
    'experience',
    'result',
    'story',
  ];
  if (testimonialKeywords.some((keyword) => scriptLower.includes(keyword))) {
    return 'testimonial';
  }

  // 謨呵ご蜍慕判縺ｮ繧ｭ繝ｼ繝ｯ繝ｼ繝・  const educationalKeywords = ['蟄ｦ縺ｶ', '蟄ｦ鄙・, '謨呵ご', 'learn', 'education', 'how to', 'guide'];
  if (educationalKeywords.some((keyword) => scriptLower.includes(keyword))) {
    return 'educational';
  }

  // 繧ｨ繝ｳ繧ｿ繝｡蜍慕判縺ｮ繧ｭ繝ｼ繝ｯ繝ｼ繝・  const entertainmentKeywords = ['髱｢逋ｽ縺・, '鬩壹″', 'fun', 'amazing', 'wow', 'shocking'];
  if (entertainmentKeywords.some((keyword) => scriptLower.includes(keyword))) {
    return 'entertainment';
  }

  // 繝・ヵ繧ｩ繝ｫ繝・ 隱ｬ譏主虚逕ｻ
  return 'explainer';
}

/**
 * 繝・Φ繝励Ξ繝ｼ繝医ｒ閾ｪ蜍暮∈謚・ */
export function selectTemplate(contentType: ContentType, videoType: VideoType): TemplateSelection {
  if (videoType === 'long') {
    // 繝ｭ繝ｳ繧ｰ蜍慕判・・ouTube逕ｨ・・    if (contentType === 'explainer' || contentType === 'educational') {
      return {
        template: 'Explainer Video',
        category: 'Explainer Video',
        orientation: 'landscape',
        style: 'professional',
        reason:
          '繧ｫ繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｮ隱ｬ譏弱・謨呵ご繧ｳ繝ｳ繝・Φ繝・↓譛驕ｩ縲ゅ・繝ｭ繝輔ぉ繝・す繝ｧ繝翫Ν縺ｪ隱ｬ譏主虚逕ｻ繧ｹ繧ｿ繧､繝ｫ縲・,
      };
    }
    if (contentType === 'counter') {
      return {
        template: 'Breaking News',
        category: 'Advertisement',
        orientation: 'landscape',
        style: 'news',
        reason: '繝九Η繝ｼ繧ｹ繧ｹ繧ｿ繧､繝ｫ縺ｧ縲御ｺ句ｮ溘ｒ莨昴∴繧九榊魂雎｡繧剃ｸ弱∴繧九ゅき繧ｦ繝ｳ繧ｿ繝ｼ蜍慕判縺ｫ譛驕ｩ縲・,
      };
    }
    if (contentType === 'testimonial') {
      return {
        template: 'Explainer Video',
        category: 'Explainer Video',
        orientation: 'landscape',
        style: 'professional',
        reason: '菴馴ｨ楢ｫ・ｂ隗｣隱ｬ蜍慕判繧ｹ繧ｿ繧､繝ｫ縺ｧ邨ｱ荳縲ゅ・繝ｭ繝輔ぉ繝・す繝ｧ繝翫Ν縺ｪ蜊ｰ雎｡繧剃ｸ弱∴繧九・,
      };
    }
    // 繝・ヵ繧ｩ繝ｫ繝・    return {
      template: 'Explainer Video',
      category: 'Explainer Video',
      orientation: 'landscape',
      style: 'professional',
      reason: '繝・ヵ繧ｩ繝ｫ繝・ 隱ｬ譏主虚逕ｻ繧ｹ繧ｿ繧､繝ｫ',
    };
  } else {
    // 繧ｷ繝ｧ繝ｼ繝亥虚逕ｻ・・ikTok/Instagram逕ｨ・・    if (contentType === 'entertainment' || contentType === 'testimonial') {
      return {
        template: 'Social Template',
        category: 'Social Media',
        orientation: 'portrait',
        style: 'entertainment',
        reason: 'SNS蜷代￠縺ｫ譛驕ｩ蛹悶＆繧後※縺・ｋ縲ゅお繝ｳ繧ｿ繝｡諤ｧ縺碁ｫ倥＞縲・,
      };
    }
    if (contentType === 'counter') {
      return {
        template: 'Breaking News',
        category: 'Advertisement',
        orientation: 'portrait',
        style: 'news',
        reason: '繝九Η繝ｼ繧ｹ繧ｹ繧ｿ繧､繝ｫ縺ｧ繧､繝ｳ繝代け繝医・縺ゅｋ蜿崎ｫ門虚逕ｻ縲・,
      };
    }
    // 繝・ヵ繧ｩ繝ｫ繝・    return {
      template: 'Social Template',
      category: 'Social Media',
      orientation: 'portrait',
      style: 'entertainment',
      reason: '繝・ヵ繧ｩ繝ｫ繝・ SNS蜷代￠繧ｨ繝ｳ繧ｿ繝｡繧ｹ繧ｿ繧､繝ｫ',
    };
  }
}

/**
 * Gemini API繧剃ｽｿ逕ｨ縺励※蜍慕判繧ｹ繧ｯ繝ｪ繝励ヨ繧堤函謌・ */
export async function generateVideoScript(options: VideoGenerationOptions): Promise<VideoScript> {
  // Client-side Gemini calls must go through server endpoint (/api/gemini).
  const modelName = 'gemini-2.5-flash';

  // 蜍慕判繧ｿ繧､繝励ｒ閾ｪ蜍募愛螳夲ｼ・latform縺九ｉ・・  const videoType: VideoType =
    options.videoType || (options.platform === 'youtube' ? 'long' : 'short');

  // 繧ｳ繝ｳ繝・Φ繝・ち繧､繝励ｒ閾ｪ蜍募愛螳夲ｼ・opic縺九ｉ謗ｨ貂ｬ縲√∪縺溘・謖・ｮ壹＆繧後◆蛟､繧剃ｽｿ逕ｨ・・  // 謌ｦ逡･: 譛蛻昴・隗｣隱ｬ蜍慕判縺ｫ髮・ｸｭ縲ゅョ繝輔か繝ｫ繝医・隱ｬ譏主虚逕ｻ・・xplainer・・  const contentType: ContentType = options.contentType || 'explainer'; // 繝・ヵ繧ｩ繝ｫ繝医・隱ｬ譏主虚逕ｻ

  // 繝・Φ繝励Ξ繝ｼ繝医ｒ閾ｪ蜍暮∈謚・  const templateSelection = selectTemplate(contentType, videoType);

  // Free繝励Λ繝ｳ縺ｮ蝣ｴ蜷医√せ繧ｯ繝ｪ繝励ヨ縺ｯ3蛻・ｻ･蜀・ｼ育ｴ・50-500譁・ｭ暦ｼ峨↓蛻ｶ髯・  const maxDuration = options.useFreePlan ? 180 : videoType === 'long' ? 600 : 45; // 遘・  const maxScriptLength = options.useFreePlan ? 500 : videoType === 'long' ? 5000 : 500; // 譁・ｭ玲焚

  // 繧ｳ繝ｳ繝・Φ繝・ち繧､繝励↓蠢懊§縺溘・繝ｭ繝ｳ繝励ヨ隱ｿ謨ｴ
  const contentTypePrompt = {
    explainer: '隱ｬ譏主虚逕ｻ繧ｹ繧ｿ繧､繝ｫ縺ｧ縲√き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｫ縺､縺・※蛻・°繧翫ｄ縺吶￥隱ｬ譏弱＠縺ｦ縺上□縺輔＞縲・,
    counter:
      '蜿崎ｫ門虚逕ｻ繧ｹ繧ｿ繧､繝ｫ縺ｧ縲√き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｸ縺ｮ謇ｹ蛻､繧・ｪ､隗｣縺ｫ蟇ｾ縺励※縲∫ｧ大ｭｦ逧・ｹ諡縺ｫ蝓ｺ縺･縺・※蜿崎ｫ悶＠縺ｦ縺上□縺輔＞縲ゅル繝･繝ｼ繧ｹ繧ｹ繧ｿ繧､繝ｫ縺ｧ縲御ｺ句ｮ溘ｒ莨昴∴繧九榊魂雎｡繧剃ｸ弱∴縺ｦ縺上□縺輔＞縲・,
    testimonial: '菴馴ｨ楢ｫ・せ繧ｿ繧､繝ｫ縺ｧ縲√き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｮ螳溯ｷｵ菴馴ｨ薙ｄ邨先棡繧定ｪ槭ｋ蠖｢蠑上↓縺励※縺上□縺輔＞縲・,
    educational: '謨呵ご蜍慕判繧ｹ繧ｿ繧､繝ｫ縺ｧ縲√き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｫ縺､縺・※蟄ｦ縺ｹ繧句・螳ｹ縺ｫ縺励※縺上□縺輔＞縲・,
    entertainment: '繧ｨ繝ｳ繧ｿ繝｡蜍慕判繧ｹ繧ｿ繧､繝ｫ縺ｧ縲∬ｦ冶・閠・′讌ｽ縺励ａ繧九√す繧ｧ繧｢縺励◆縺上↑繧句・螳ｹ縺ｫ縺励※縺上□縺輔＞縲・,
  };

  const prompt = `
縺ゅ↑縺溘・繧ｫ繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｮ蟆る摩螳ｶ縺ｧ縺吶・{options.platform === 'youtube' ? 'YouTube' : options.platform === 'tiktok' ? 'TikTok' : 'Instagram'}逕ｨ縺ｮ${options.language === 'ja' ? '譌･譛ｬ隱・ : options.language === 'en' ? '闍ｱ隱・ : options.language === 'fr' ? '繝輔Λ繝ｳ繧ｹ隱・ : '繝峨う繝・ｪ・}縺ｮ蜍慕判繧ｹ繧ｯ繝ｪ繝励ヨ繧堤函謌舌＠縺ｦ縺上□縺輔＞縲・
${options.topic ? `繝医ヴ繝・け: ${options.topic}` : '繝医ヴ繝・け縺ｯ繝ｩ繝ｳ繝繝縺ｫ驕ｸ繧薙〒縺上□縺輔＞・医き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｫ髢｢騾｣縺吶ｋ蜀・ｮｹ・・}

繧ｳ繝ｳ繝・Φ繝・ち繧､繝・ ${contentType}
${contentTypePrompt[contentType]}

繝・Φ繝励Ξ繝ｼ繝・ ${templateSelection.template} (${templateSelection.category})
${templateSelection.reason}

隕∽ｻｶ:
- 繧ｨ繝ｳ繧ｿ繝｡諤ｧ繧帝㍾隕悶＠縺溷・螳ｹ
- 遘大ｭｦ逧・ｹ諡縺ｫ蝓ｺ縺･縺・◆諠・ｱ
- ${options.useFreePlan ? '3蛻・ｻ･蜀・ｼ育ｴ・50-500譁・ｭ暦ｼ・ : videoType === 'long' ? '5-10蛻・ : '30-60遘・}縺ｮ蜍慕判縺ｫ驕ｩ縺励◆髟ｷ縺・- 隕冶・閠・′闊亥袖繧呈戟縺｡縲√す繧ｧ繧｢縺励◆縺上↑繧句・螳ｹ
${options.useFreePlan ? '- **驥崎ｦ・*: 繧ｹ繧ｯ繝ｪ繝励ヨ縺ｯ蠢・★450-500譁・ｭ嶺ｻ･蜀・↓蜿弱ａ縺ｦ縺上□縺輔＞縲・蛻・ｒ雜・∴繧九→繧ｨ繝ｩ繝ｼ縺ｫ縺ｪ繧翫∪縺吶・ : ''}
${options.language === 'en' ? '- **驥崎ｦ・*: 闍ｱ隱槭〒菴懈・縺励※縺上□縺輔＞縲ゅげ繝ｭ繝ｼ繝舌Ν縺ｫ蠎・′繧九き繝ｼ繝九・繧｢繝繧､繧ｨ繝・ヨ縺ｮ蜍慕判縺ｨ縺励※縲∬恭隱槭′譛驕ｩ縺ｧ縺吶・ : ''}

莉･荳九・JSON蠖｢蠑上〒霑斐＠縺ｦ縺上□縺輔＞:
{
  "title": "蜍慕判縺ｮ繧ｿ繧､繝医Ν",
  "description": "蜍慕判縺ｮ隱ｬ譏取枚・・{options.platform === 'youtube' ? '200譁・ｭ嶺ｻ･荳・ : '100譁・ｭ礼ｨ句ｺｦ'}・・,
  "script": "蜍慕判縺ｮ蜿ｰ譛ｬ・郁ｩｱ縺吝・螳ｹ繧偵◎縺ｮ縺ｾ縺ｾ譖ｸ縺・※縺上□縺輔＞縲・{options.useFreePlan ? '蠢・★450-500譁・ｭ嶺ｻ･蜀・↓蜿弱ａ縺ｦ縺上□縺輔＞縲・ : ''}・・,
  "hashtags": ["繝上ャ繧ｷ繝･繧ｿ繧ｰ1", "繝上ャ繧ｷ繝･繧ｿ繧ｰ2", ...],
  "duration": ${maxDuration}
}
`;

  try {
    const { text } = await geminiGenerate({ model: modelName, prompt });

    // JSON繧呈歓蜃ｺ・・``json 縺ｧ蝗ｲ縺ｾ繧後※縺・ｋ蝣ｴ蜷医′縺ゅｋ・・    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/) || text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Failed to parse JSON from response');
    }

    const script = JSON.parse(jsonMatch[1] || jsonMatch[0]) as VideoScript;

    // Free繝励Λ繝ｳ縺ｮ蝣ｴ蜷医√せ繧ｯ繝ｪ繝励ヨ髟ｷ縺輔ｒ繝√ぉ繝・け
    if (options.useFreePlan && script.script.length > maxScriptLength) {
      // 繧ｹ繧ｯ繝ｪ繝励ヨ縺碁聞縺吶℃繧句ｴ蜷医・縲∵枚縺ｮ蛹ｺ蛻・ｊ縺ｧ蛻・ｊ隧ｰ繧√ｋ
      let truncatedScript = script.script.substring(0, maxScriptLength - 3);
      // 譛蠕後・譁・・蛹ｺ蛻・ｊ・医ゅ・ｼ√・ｼ滂ｼ峨ｒ謗｢縺励※縲√◎縺ｮ菴咲ｽｮ縺ｧ蛻・ｊ隧ｰ繧√ｋ
      const lastSentenceEnd = Math.max(
        truncatedScript.lastIndexOf('縲・),
        truncatedScript.lastIndexOf('・・),
        truncatedScript.lastIndexOf('・・),
        truncatedScript.lastIndexOf('.'),
        truncatedScript.lastIndexOf('!'),
        truncatedScript.lastIndexOf('?')
      );
      if (lastSentenceEnd > maxScriptLength * 0.7) {
        // 70%莉･荳翫′譁・・蛹ｺ蛻・ｊ縺ｧ邨ゅｏ縺｣縺ｦ縺・ｋ蝣ｴ蜷医・縺ｿ縲√◎縺ｮ菴咲ｽｮ縺ｧ蛻・ｊ隧ｰ繧√ｋ
        truncatedScript = truncatedScript.substring(0, lastSentenceEnd + 1);
      }
      script.script = truncatedScript + '...';
      if (import.meta.env.DEV) {
        console.warn(
          `Free繝励Λ繝ｳ縺ｮ蛻ｶ髯舌↓繧医ｊ縲√せ繧ｯ繝ｪ繝励ヨ繧・{truncatedScript.length}譁・ｭ励↓蛻・ｊ隧ｰ繧√∪縺励◆・亥・縺ｮ髟ｷ縺・ ${script.script.length}譁・ｭ暦ｼ荏
        );
      }
    }

    return script;
  } catch (error) {
    logError(error, { component: 'videoGeneration', action: 'generateVideoScript' });
    throw error;
  }
}

import { generateVideoWithMakefilm } from './videoGenerationMakefilm';
import { generateVideoWithHeyGen } from './videoGenerationHeyGen';
import { generateVideoWithRunway } from './videoGenerationRunway';

// Re-export for convenience
export { generateVideoWithMakefilm, generateVideoWithHeyGen, generateVideoWithRunway };

/**
 * 蜍慕判逕滓・縺ｮ繝｡繧､繝ｳ髢｢謨ｰ
 */
export async function generateVideo(options: VideoGenerationOptions): Promise<{
  script: VideoScript;
  videoUrl?: string;
}> {
  // 1. 繧ｹ繧ｯ繝ｪ繝励ヨ逕滓・
  const script = await generateVideoScript(options);

  // 2. 蜍慕判逕滓・・亥━蜈磯・ｽ・ Makefilm > HeyGen > Runway・・  // Free繝励Λ繝ｳ縺ｮ蝣ｴ蜷医・HeyGen縺ｮ縺ｿ繧剃ｽｿ逕ｨ・亥宛髯舌′縺ゅｋ縺溘ａ・・  let videoUrl: string | undefined;

  if (options.useFreePlan) {
    // Free繝励Λ繝ｳ縺ｮ蝣ｴ蜷医？eyGen縺ｮ縺ｿ菴ｿ逕ｨ
    try {
      videoUrl = await generateVideoWithHeyGen(script, true, options.apiKeys?.heyGen);
    } catch (error) {
      logError(error, {
        component: 'videoGeneration',
        action: 'generateVideo',
        step: 'heyGenFreePlan',
      });
    }
  } else {
    // 譛画侭繝励Λ繝ｳ縺ｮ蝣ｴ蜷医∝━蜈磯・ｽ阪〒隧ｦ陦・    try {
      // Future feature: Makefilm縺ｫ繧・PI繧ｭ繝ｼ繧呈ｸ｡縺・      videoUrl = await generateVideoWithMakefilm(script);
    } catch (error) {
      console.warn('Makefilm failed, trying HeyGen:', error);
      try {
        videoUrl = await generateVideoWithHeyGen(script, false, options.apiKeys?.heyGen);
      } catch (error2) {
        if (import.meta.env.DEV) {
          console.warn('HeyGen failed, trying Runway:', error2);
        }
        try {
          videoUrl = await generateVideoWithRunway(script);
        } catch (error3) {
          logError(error3, {
            component: 'videoGeneration',
            action: 'generateVideo',
            step: 'allServicesFailed',
          });
        }
      }
    }
  }

  return {
    script,
    videoUrl,
  };
}

