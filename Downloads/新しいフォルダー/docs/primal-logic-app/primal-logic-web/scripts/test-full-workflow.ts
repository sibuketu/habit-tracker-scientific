/**
 * 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ縺ｮ邨ｱ蜷医ユ繧ｹ繝・
 */

import { fullAutoVideoWorkflow } from '../src/services/fullAutoVideoWorkflow';

async function testFullWorkflow() {
  console.log('ｧｪ 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ縺ｮ繝・せ繝磯幕蟋・..\n');

  try {
    // 繝・せ繝医ョ繝ｼ繧ｿ
    const result = await fullAutoVideoWorkflow({
      topic: '驥手除縺ｯ豈抵ｼ√Ξ繧ｯ繝√Φ縺瑚・繧堤ｴ螢翫☆繧狗悄螳・,
      title: '驥手除縺ｯ豈抵ｼ∫ｧ大ｭｦ逧・ｹ諡縺ｧ險ｼ譏弱☆繧・,
      script: 'The U.S. government just admitted it. January 7th, 2025. The official U.S. dietary guidelines underwent their biggest shift in 70 years.',
      hook: 'The U.S. government just admitted it.',
      scientificEvidence: 'USDA Dietary Guidelines 2025',
      hashtags: ['#carnivore', '#vegetabletoxins'],
      keywords: ['carnivore', 'lectin', 'vegetable toxins'],
      duration: 60,
      images: [
        {
          path: 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/images/government_guidelines_doc.jpg',
          start: 0,
          duration: 5,
          description: '繧｢繝｡繝ｪ繧ｫ謾ｿ蠎懊・譬・､翫ぎ繧､繝峨Λ繧､繝ｳ譁・嶌',
        },
        {
          path: 'https://YOUR_PROJECT.supabase.co/storage/v1/object/public/images/anatomy_diagram.jpg',
          start: 5,
          duration: 8,
          description: '繝ｪ繧｢繝ｫ縺ｪ隗｣蜑門峙',
        },
      ],
      subtitles: [
        {
          text: 'The U.S. government just admitted it.',
          start: 0,
          duration: 3,
        },
        {
          text: 'Source: USDA Dietary Guidelines 2025',
          start: 3,
          duration: 2,
        },
      ],
      ttsProvider: 'google',
      width: 1080,
      height: 1920,
    });

    if (result.error) {
      console.error('笶・繧ｨ繝ｩ繝ｼ:', result.error);
      process.exit(1);
    }

    console.log('笨・繝・せ繝亥ｮ御ｺ・);
    console.log('投 邨先棡:');
    console.log('  - 繧ｹ繧ｯ繝ｪ繝励ヨ:', result.script.title);
    console.log('  - 髻ｳ螢ｰURL:', result.audioUrl ? '笨・ : '笶・);
    console.log('  - 蜍慕判URL:', result.videoUrl ? '笨・ : '笶・);
    
    if (result.videoUrl) {
      console.log('\n脂 螳悟・閾ｪ蜍募喧繝ｯ繝ｼ繧ｯ繝輔Ο繝ｼ謌仙粥・・);
      console.log('道 蜍慕判URL:', result.videoUrl);
    }
  } catch (error) {
    console.error('笶・繝・せ繝亥､ｱ謨・', error);
    process.exit(1);
  }
}

testFullWorkflow();

