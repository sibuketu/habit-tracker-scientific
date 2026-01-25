/**
 * 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ逕滓・繝ｦ繝ｼ繝・ぅ繝ｪ繝・ぅ
 *
 * 縺薙・繧ｹ繧ｯ繝ｪ繝励ヨ繧貞ｮ溯｡後＠縺ｦ縲・0蛟九・繧｢繝励Μ繧｢繧､繧ｳ繝ｳ蛟呵｣懊ｒ逕滓・縺励∪縺吶・ *
 * 菴ｿ逕ｨ譁ｹ豕・
 * 1. .env繝輔ぃ繧､繝ｫ縺ｫ VITE_OPENAI_API_KEY 繧定ｨｭ螳・ * 2. 縺薙・繝輔ぃ繧､繝ｫ繧貞ｮ溯｡鯉ｼ・ode.js迺ｰ蠅・〒・・ * 3. 逕滓・縺輔ｌ縺溽判蜒酋RL繧堤｢ｺ隱・ */

import { generateMultipleAppIcons } from '../services/imageGenerationService';
import { logError } from './errorHandler';

async function main() {
  console.log('噫 繧｢繝励Μ繧｢繧､繧ｳ繝ｳ縺ｮ荳諡ｬ逕滓・繧帝幕蟋九＠縺ｾ縺・..\n');

  try {
    const results = await generateMultipleAppIcons();

    console.log('\n笨・逕滓・螳御ｺ・ｼ―n');
    console.log('逕滓・縺輔ｌ縺溽判蜒・');
    console.log('='.repeat(60));

    results.forEach((result, index) => {
      console.log(`\n${index + 1}. 繧ｹ繧ｿ繧､繝ｫ${result.style} - 繝舌Μ繧ｨ繝ｼ繧ｷ繝ｧ繝ｳ${result.variation}`);
      console.log(`   URL: ${result.url}`);
    });

    console.log('\n' + '='.repeat(60));
    console.log(`\n蜷郁ｨ・${results.length}蛟九・逕ｻ蜒上ｒ逕滓・縺励∪縺励◆縲Ａ);
    console.log('蜷ФRL繧偵ヶ繝ｩ繧ｦ繧ｶ縺ｧ髢九＞縺ｦ縲∵怙驕ｩ縺ｪ繧ゅ・繧帝∈繧薙〒縺上□縺輔＞縲・n');
  } catch (error) {
    logError(error, { component: 'generateAppIcons', action: 'main' });
    process.exit(1);
  }
}

// Node.js迺ｰ蠅・〒螳溯｡後☆繧句ｴ蜷・if (typeof window === 'undefined') {
  main();
}

// 繝悶Λ繧ｦ繧ｶ迺ｰ蠅・°繧牙他縺ｳ蜃ｺ縺吝ｴ蜷医・繧ｨ繧ｯ繧ｹ繝昴・繝・export { generateMultipleAppIcons };

