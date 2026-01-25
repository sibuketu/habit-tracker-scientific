import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  /* Test directory - Playwright逕ｨ縺ｮE2E繝・せ繝医・縺ｿ */
  testDir: './tests',
  /* Test files pattern - Playwright逕ｨ縺ｮE2E繝・せ繝医・縺ｿ */
  testMatch: ['**/*.spec.ts'],
  /* Exclude Jest逕ｨ縺ｮ繝ｦ繝九ャ繝医ユ繧ｹ繝・*/
  testIgnore: ['**/src/__tests__/**', '**/node_modules/**'],
  /* Global timeout for each test */
  timeout: 120000,

  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : 2, // 繝ｭ繝ｼ繧ｫ繝ｫ縺ｧ繧・荳ｦ蛻励↓蛻ｶ髯舌＠縺ｦ雋闕ｷ霆ｽ貂・
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'http://localhost:5174', // vite.config.ts縺ｮ繝昴・繝育分蜿ｷ縺ｫ蜷医ｏ縺帙ｋ
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  /* Visual Regression Test逕ｨ縺ｮ險ｭ螳・*/
  expect: {
    /* 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ豈碑ｼ・・險ｱ螳ｹ隱､蟾ｮ */
    threshold: 0.2, // 20%縺ｮ蟾ｮ蛻・∪縺ｧ險ｱ螳ｹ
    timeout: 10000, // expect縺ｮ繧ｿ繧､繝繧｢繧ｦ繝医ｂ蟒ｶ髟ｷ
    /* 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ縺ｮ菫晏ｭ伜・ */
    toHaveScreenshot: {
      maxDiffPixels: 500, // 繝悶Λ繧ｦ繧ｶ髢薙・謠冗判縺ｮ驕輔＞繧定・・縺励※500繝斐け繧ｻ繝ｫ縺ｾ縺ｧ險ｱ螳ｹ
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5174', // vite.config.ts縺ｮ繝昴・繝育分蜿ｷ縺ｫ蜷医ｏ縺帙ｋ
    reuseExistingServer: !process.env.CI,
    timeout: 180000, // 繧ｵ繝ｼ繝舌・襍ｷ蜍募ｾ・■繧貞ｻｶ髟ｷ・・蛻・ｼ・
    stdout: 'pipe',
    stderr: 'pipe',
  },
});


