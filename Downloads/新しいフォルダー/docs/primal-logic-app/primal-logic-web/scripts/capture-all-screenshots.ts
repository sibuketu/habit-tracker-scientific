/**
 * CarnivOS - 蜈ｨ逕ｻ髱｢繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ蜿門ｾ励せ繧ｯ繝ｪ繝励ヨ
 *
 * 繧｢繝励Μ縺ｮ蜈ｨ逕ｻ髱｢縺ｮ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧定・蜍募叙蠕励＠縲；emini縺ｫ蜈ｱ譛峨☆繧九◆繧√・逕ｻ蜒上ｒ逕滓・縺励∪縺吶・
 */

import { test, expect, Page } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const SCREENSHOT_DIR = path.join(__dirname, '../screenshots-for-gemini');
const BASE_URL = 'http://localhost:5173';

// 蜈ｨ逕ｻ髱｢縺ｮ繝ｪ繧ｹ繝・
const SCREENS: Array<{
  name: string;
  screen: string;
  description: string;
  requiresAuth?: boolean;
  requiresOnboarding?: boolean;
  setup?: (page: Page) => Promise<void>;
}> = [
  {
    name: 'consent',
    screen: 'consent',
    description: '蜷梧э逕ｻ髱｢',
    setup: async (page) => {
      // localStorage繧偵け繝ｪ繧｢縺励※蜷梧э逕ｻ髱｢繧定｡ｨ遉ｺ
      await page.evaluate(() => {
        localStorage.removeItem('primal_logic_consent_accepted');
        localStorage.removeItem('primal_logic_onboarding_completed');
      });
      await page.reload();
      await page.waitForTimeout(1000);
    },
  },
  {
    name: 'onboarding',
    screen: 'onboarding',
    description: '繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ逕ｻ髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.removeItem('primal_logic_onboarding_completed');
      });
      await page.reload();
      await page.waitForTimeout(1000);
    },
  },
  {
    name: 'home',
    screen: 'home',
    description: '繝帙・繝逕ｻ髱｢・医Γ繧､繝ｳ繝繝・す繝･繝懊・繝会ｼ・,
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.reload();
      await page.waitForTimeout(2000); // 繝・・繧ｿ隱ｭ縺ｿ霎ｼ縺ｿ蠕・ｩ・
    },
  },
  {
    name: 'profile',
    screen: 'profile',
    description: '繝励Ο繝輔ぃ繧､繝ｫ險ｭ螳夂判髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#profile`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'history',
    screen: 'history',
    description: '螻･豁ｴ逕ｻ髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#history`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'labs',
    screen: 'labs',
    description: 'Labs逕ｻ髱｢・亥ｮ滄ｨ鍋噪讖溯・・・,
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#labs`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'settings',
    screen: 'settings',
    description: '險ｭ螳夂判髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#settings`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'customFood',
    screen: 'customFood',
    description: '繧ｫ繧ｹ繧ｿ繝鬟溷刀逋ｻ骭ｲ逕ｻ髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#customFood`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'input',
    screen: 'input',
    description: '譌･谺｡蜈･蜉帷判髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#input`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'gift',
    screen: 'gift',
    description: 'Gift逕ｻ髱｢・医さ繝溘Η繝九ユ繧｣讖溯・・・,
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#gift`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'bioHack',
    screen: 'bioHack',
    description: 'Bio-Hack繝繝・す繝･繝懊・繝臥判髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#bioHack`);
      await page.waitForTimeout(2000);
    },
  },
  {
    name: 'ifThenRules',
    screen: 'ifThenRules',
    description: 'If-Then繝ｫ繝ｼ繝ｫ逕ｻ髱｢',
    setup: async (page) => {
      await page.evaluate(() => {
        localStorage.setItem('primal_logic_consent_accepted', 'true');
        localStorage.setItem('primal_logic_onboarding_completed', 'true');
      });
      await page.goto(`${BASE_URL}/#ifThenRules`);
      await page.waitForTimeout(2000);
    },
  },
];

// 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繝・ぅ繝ｬ繧ｯ繝医Μ繧剃ｽ懈・
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

test.describe('Capture All Screenshots', () => {
  test.beforeEach(async ({ page }) => {
    // 繝｢繝舌う繝ｫ繝薙Η繝ｼ繝昴・繝医↓險ｭ螳夲ｼ・Phone 15蟷・ｼ・
    await page.setViewportSize({ width: 393, height: 852 });
  });

  for (const screenConfig of SCREENS) {
    test(`Capture screenshot: ${screenConfig.name}`, async ({ page }) => {
      // 逕ｻ髱｢縺ｮ繧ｻ繝・ヨ繧｢繝・・
      if (screenConfig.setup) {
        await screenConfig.setup(page);
      } else {
        await page.goto(BASE_URL);
        await page.waitForTimeout(2000);
      }

      // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧貞叙蠕・
      const screenshotPath = path.join(SCREENSHOT_DIR, `${screenConfig.name}.png`);
      await page.screenshot({
        path: screenshotPath,
        fullPage: true, // 蜈ｨ繝壹・繧ｸ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ
      });

      console.log(`笨・Screenshot saved: ${screenshotPath}`);
    });
  }
});

// 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ繧堤函謌・
test.afterAll(async () => {
  const screenshotListPath = path.join(SCREENSHOT_DIR, 'SCREENSHOT_LIST.md');
  const screenshots = SCREENS.map((s) => ({
    name: s.name,
    description: s.description,
    path: `screenshots-for-gemini/${s.name}.png`,
  }));

  const markdown = `# 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ

莉･荳九・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧竪emini縺ｫ騾∽ｿ｡縺励※縺上□縺輔＞縲・

## 萄 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ荳隕ｧ

${screenshots
  .map(
    (s, index) => `
### ${index + 1}. ${s.description} (${s.name})

- **繝輔ぃ繧､繝ｫ繝代せ**: \`C:\\Users\\susam\\Downloads\\譁ｰ縺励＞繝輔か繝ｫ繝繝ｼ\\docs\\primal-logic-app\\primal-logic-web\\${s.path}\`
- **隱ｬ譏・*: ${s.description}
`
  )
  .join('\n')}

---

## 町 Gemini縺ｸ縺ｮ騾∽ｿ｡繝｡繝・そ繝ｼ繧ｸ萓・

\`\`\`
莉･荳九・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧帝∽ｿ｡縺励∪縺吶１rimal Logic繧｢繝励Μ縺ｮ蜈ｨ逕ｻ髱｢縺ｮ繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ縺ｧ縺吶・

騾∽ｿ｡繝輔ぃ繧､繝ｫ・・
${screenshots.map((s) => `- ${s.name}.png (${s.description})`).join('\n')}

縺薙ｌ繧峨・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧貞盾閠・↓縲√き繝｡繝ｩ讖溯・邨ｱ蜷医・隕∽ｻｶ螳夂ｾｩ繧偵♀鬘倥＞縺励∪縺吶・
\`\`\`
`;

  fs.writeFileSync(screenshotListPath, markdown);
  console.log(`笨・Screenshot list saved: ${screenshotListPath}`);
});


