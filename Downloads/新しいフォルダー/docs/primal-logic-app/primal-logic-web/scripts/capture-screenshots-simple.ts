/**
 * CarnivOS - 蜈ｨ逕ｻ髱｢繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ蜿門ｾ励せ繧ｯ繝ｪ繝励ヨ・医す繝ｳ繝励Ν迚茨ｼ・
 *
 * 髢狗匱繧ｵ繝ｼ繝舌・縺瑚ｵｷ蜍輔＠縺ｦ縺・ｋ迥ｶ諷九〒螳溯｡後＠縺ｦ縺上□縺輔＞縲・
 * 菴ｿ逕ｨ譁ｹ豕・ npx tsx scripts/capture-screenshots-simple.ts
 */

import { chromium } from 'playwright';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots-for-gemini');
const BASE_URL = 'http://localhost:5174';

// 蜈ｨ逕ｻ髱｢縺ｮ繝ｪ繧ｹ繝・
const SCREENS = [
  { name: 'consent', description: '蜷梧э逕ｻ髱｢' },
  { name: 'onboarding', description: '繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ逕ｻ髱｢' },
  { name: 'home', description: '繝帙・繝逕ｻ髱｢・医Γ繧､繝ｳ繝繝・す繝･繝懊・繝会ｼ・ },
  { name: 'profile', description: '繝励Ο繝輔ぃ繧､繝ｫ險ｭ螳夂判髱｢' },
  { name: 'history', description: '螻･豁ｴ逕ｻ髱｢' },
  { name: 'labs', description: 'Labs逕ｻ髱｢・亥ｮ滄ｨ鍋噪讖溯・・・ },
  { name: 'settings', description: '險ｭ螳夂判髱｢' },
  { name: 'customFood', description: '繧ｫ繧ｹ繧ｿ繝鬟溷刀逋ｻ骭ｲ逕ｻ髱｢' },
  { name: 'input', description: '譌･谺｡蜈･蜉帷判髱｢' },
  { name: 'gift', description: 'Gift逕ｻ髱｢・医さ繝溘Η繝九ユ繧｣讖溯・・・ },
  { name: 'bioHack', description: 'Bio-Hack繝繝・す繝･繝懊・繝臥判髱｢' },
  { name: 'ifThenRules', description: 'If-Then繝ｫ繝ｼ繝ｫ逕ｻ髱｢' },
];

async function captureScreenshots() {
  // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繝・ぅ繝ｬ繧ｯ繝医Μ繧剃ｽ懈・
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 393, height: 852 }, // iPhone 15蟷・
  });
  const page = await context.newPage();

  console.log('萄 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ蜿門ｾ励ｒ髢句ｧ九＠縺ｾ縺・..\n');

  for (const screen of SCREENS) {
    try {
      console.log(`胴 ${screen.description} (${screen.name}) 繧貞叙蠕嶺ｸｭ...`);

      // localStorage繧定ｨｭ螳壹＠縺ｦ逕ｻ髱｢繧定｡ｨ遉ｺ
      if (screen.name === 'consent') {
        await page.evaluate(() => {
          localStorage.removeItem('primal_logic_consent_accepted');
          localStorage.removeItem('primal_logic_onboarding_completed');
        });
        await page.goto(BASE_URL);
      } else if (screen.name === 'onboarding') {
        await page.evaluate(() => {
          localStorage.setItem('primal_logic_consent_accepted', 'true');
          localStorage.removeItem('primal_logic_onboarding_completed');
        });
        await page.goto(BASE_URL);
      } else {
        await page.evaluate(() => {
          localStorage.setItem('primal_logic_consent_accepted', 'true');
          localStorage.setItem('primal_logic_onboarding_completed', 'true');
        });
        await page.goto(BASE_URL);
        // 逕ｻ髱｢驕ｷ遘ｻ・・ustomEvent繧剃ｽｿ逕ｨ・・
        await page.evaluate((screenName) => {
          const event = new CustomEvent('navigateToScreen', { detail: screenName });
          window.dispatchEvent(event);
        }, screen.name);
      }

      // 逕ｻ髱｢縺ｮ隱ｭ縺ｿ霎ｼ縺ｿ繧貞ｾ・ｩ・
      await page.waitForTimeout(2000);

      // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧貞叙蠕・
      const screenshotPath = path.join(SCREENSHOT_DIR, `${screen.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true,
      });

      console.log(`  笨・菫晏ｭ伜ｮ御ｺ・ ${screenshotPath}\n`);
    } catch (error) {
      console.error(`  笨・繧ｨ繝ｩ繝ｼ: ${screen.name}`, error);
    }
  }

  // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ繧堤函謌・
  const screenshotListPath = path.join(SCREENSHOT_DIR, 'SCREENSHOT_LIST.md');
  const markdown = `# 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ

莉･荳九・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧竪emini縺ｫ騾∽ｿ｡縺励※縺上□縺輔＞縲・

## 萄 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ

${SCREENS.map(
  (s, index) => `
### ${index + 1}. ${s.description} (${s.name})

- **繝輔ぃ繧､繝ｫ繝代せ**: \`C:\\Users\\susam\\Downloads\\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\\docs\\primal-logic-app\\primal-logic-web\\screenshots-for-gemini\\${s.name}.png\`
- **隱ｬ譏・*: ${s.description}
`
).join('\n')}

---

## 町 Gemini縺ｸ縺ｮ騾∽ｿ｡繝｡繝・そ繝ｼ繧ｸ萓・

\`\`\`
莉･荳九・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧帝∽ｿ｡縺励∪縺吶１rimal Logic繧｢繝励Μ縺ｮ蜈ｨ逕ｻ髱｢縺ｮ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ縺ｧ縺吶・

騾∽ｿ｡繝輔ぃ繧､繝ｫ・・
${SCREENS.map((s) => `- ${s.name}.png (${s.description})`).join('\n')}

縺薙ｌ繧峨・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧貞盾閠・↓縲√き繝｡繝ｩ讖溯・邨ｱ蜷医・隕∽ｻｶ螳夂ｾｩ繧偵♀鬘倥＞縺励∪縺吶・
\`\`\`
`;

  fs.writeFileSync(screenshotListPath, markdown);
  console.log(`笨・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ繧剃ｿ晏ｭ・ ${screenshotListPath}`);

  await browser.close();
  console.log('\n笨・蜈ｨ縺ｦ縺ｮ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ蜿門ｾ励′螳御ｺ・＠縺ｾ縺励◆・・);
}

// 螳溯｡・
captureScreenshots().catch(console.error);


