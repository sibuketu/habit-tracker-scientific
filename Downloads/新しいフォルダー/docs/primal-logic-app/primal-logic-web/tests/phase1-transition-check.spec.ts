/**
 * CarnivOS - Phase 1: 遘ｻ陦梧悄髢薙し繝昴・繝域ｩ溯・縺ｮ閾ｪ蜍輔メ繧ｧ繝・け
 * 
 * 縺薙・繝・せ繝医・縲∫ｧｻ陦梧悄髢薙ヰ繝翫・縲∝虚逧・・､顔ｴ隱ｿ謨ｴ縲√ぎ繧､繝臥判髱｢縺ｮ蜍穂ｽ懊ｒ遒ｺ隱阪＠縺ｾ縺吶・
 */

import { test, expect } from '@playwright/test';

test.describe('Phase 1: 遘ｻ陦梧悄髢薙し繝昴・繝域ｩ溯・', () => {
  // 蜷梧э繝ｻ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・縺吶ｋ繝倥Ν繝代・髢｢謨ｰ
  async function skipConsentAndOnboarding(page: any) {
    await page.evaluate(() => {
      localStorage.setItem('primal_logic_consent_accepted', 'true');
      localStorage.setItem('primal_logic_onboarding_completed', 'true');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
  }

  test.beforeEach(async ({ page }) => {
    // 繧｢繝励Μ繧帝幕縺擾ｼ・aseURL繧剃ｽｿ逕ｨ・・
    await page.goto('/');
    // 蜷梧э逕ｻ髱｢縺ｨ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・
    await skipConsentAndOnboarding(page);
  });

  test('遘ｻ陦梧悄髢薙ヰ繝翫・縺瑚｡ｨ遉ｺ縺輔ｌ繧具ｼ育ｧｻ陦梧悄髢謎ｸｭ縺ｮ蝣ｴ蜷茨ｼ・, async ({ page }) => {
    // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｫ遘ｻ陦梧悄髢謎ｸｭ縺ｮ繝・・繧ｿ繧定ｨｭ螳・
    await page.evaluate(() => {
      const userProfile = {
        gender: 'male',
        goal: 'healing',
        metabolicStatus: 'transitioning',
        daysOnCarnivore: 15, // 遘ｻ陦梧悄髢謎ｸｭ・・0譌･譛ｪ貅・・
        carnivoreStartDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      localStorage.setItem('primal_logic_user_profile', JSON.stringify(userProfile));
    });

    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    // 遘ｻ陦梧悄髢薙ヰ繝翫・縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const banner = page.getByText('遘ｻ陦梧悄髢・', { exact: false });
    await expect(banner).toBeVisible();
    
    // 騾ｲ謐苓｡ｨ遉ｺ繧堤｢ｺ隱・
    await expect(page.getByText('15/30譌･', { exact: false })).toBeVisible();
    await expect(page.getByText('驕ｩ蠢懊Δ繝ｼ繝・', { exact: false })).toBeVisible();
  });

  test('遘ｻ陦梧悄髢薙ヰ繝翫・縺瑚｡ｨ遉ｺ縺輔ｌ縺ｪ縺・ｼ育ｧｻ陦梧悄髢鍋ｵゆｺ・ｾ鯉ｼ・, async ({ page }) => {
    // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｫ遘ｻ陦梧悄髢鍋ｵゆｺ・ｾ後・繝・・繧ｿ繧定ｨｭ螳・
    await page.evaluate(() => {
      const userProfile = {
        gender: 'male',
        goal: 'healing',
        metabolicStatus: 'adapted',
        daysOnCarnivore: 35, // 遘ｻ陦梧悄髢鍋ｵゆｺ・ｾ鯉ｼ・0譌･莉･荳奇ｼ・
        carnivoreStartDate: new Date(Date.now() - 35 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      localStorage.setItem('primal_logic_user_profile', JSON.stringify(userProfile));
    });

    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    // 遘ｻ陦梧悄髢薙ヰ繝翫・縺瑚｡ｨ遉ｺ縺輔ｌ縺ｪ縺・％縺ｨ繧堤｢ｺ隱・
    const banner = page.getByText('遘ｻ陦梧悄髢・', { exact: false });
    await expect(banner).not.toBeVisible();
  });

  test('遘ｻ陦梧悄髢薙ぎ繧､繝臥判髱｢縺碁幕縺擾ｼ医ヰ繝翫・繧偵ち繝・・・・, async ({ page }) => {
    // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｫ遘ｻ陦梧悄髢謎ｸｭ縺ｮ繝・・繧ｿ繧定ｨｭ螳・
    await page.evaluate(() => {
      const userProfile = {
        gender: 'male',
        goal: 'healing',
        metabolicStatus: 'transitioning',
        daysOnCarnivore: 15,
        carnivoreStartDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      localStorage.setItem('primal_logic_user_profile', JSON.stringify(userProfile));
    });

    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    // 繝舌リ繝ｼ繧偵ち繝・・
    const banner = page.getByText('遘ｻ陦梧悄髢・', { exact: false });
    await banner.click();

    // 繧ｬ繧､繝臥判髱｢縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.getByText('遘ｻ陦梧悄髢薙ぎ繧､繝・, { exact: true })).toBeVisible();
    await expect(page.getByText('遘ｻ陦梧悄髢薙↓縺､縺・※', { exact: false })).toBeVisible();
    await expect(page.getByText('繧医￥縺ゅｋ逞・憾縺ｨ蟇ｾ蜃ｦ豕・, { exact: false })).toBeVisible();
    await expect(page.getByText('謗ｨ螂ｨ鬟溷刀', { exact: false })).toBeVisible();
  });

  test('逞・憾繧帝∈謚槭＠縺ｦ蟇ｾ蜃ｦ豕輔′陦ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｫ遘ｻ陦梧悄髢謎ｸｭ縺ｮ繝・・繧ｿ繧定ｨｭ螳・
    await page.evaluate(() => {
      const userProfile = {
        gender: 'male',
        goal: 'healing',
        metabolicStatus: 'transitioning',
        daysOnCarnivore: 15,
        carnivoreStartDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      localStorage.setItem('primal_logic_user_profile', JSON.stringify(userProfile));
    });

    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    // 繝舌リ繝ｼ繧偵ち繝・・縺励※繧ｬ繧､繝臥判髱｢繧帝幕縺・
    const banner = page.getByText('遘ｻ陦梧悄髢・', { exact: false });
    await banner.click();

    // 縲碁ｭ逞帙阪ｒ驕ｸ謚・
    const headacheButton = page.getByText('鬆ｭ逞・, { exact: true }).first();
    await headacheButton.click();

    // 蟇ｾ蜃ｦ豕輔′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.getByText('鬆ｭ逞帙・蟇ｾ蜃ｦ豕・, { exact: false })).toBeVisible();
    await expect(page.getByText('繝翫ヨ繝ｪ繧ｦ繝', { exact: false })).toBeVisible();
    await expect(page.getByText('+2000mg', { exact: false })).toBeVisible();
    await expect(page.getByText('謗ｨ螂ｨ鬟溷刀', { exact: false })).toBeVisible();
  });

  test('蜍慕噪譬・､顔ｴ隱ｿ謨ｴ縺碁←逕ｨ縺輔ｌ繧具ｼ育ｧｻ陦梧悄髢謎ｸｭ・・, async ({ page }) => {
    // 繝ｭ繝ｼ繧ｫ繝ｫ繧ｹ繝医Ξ繝ｼ繧ｸ縺ｫ遘ｻ陦梧悄髢謎ｸｭ縺ｮ繝・・繧ｿ繧定ｨｭ螳・
    await page.evaluate(() => {
      const userProfile = {
        gender: 'male',
        goal: 'healing',
        metabolicStatus: 'transitioning',
        daysOnCarnivore: 15,
        carnivoreStartDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      };
      localStorage.setItem('primal_logic_user_profile', JSON.stringify(userProfile));
    });

    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);

    // 繝翫ヨ繝ｪ繧ｦ繝繧ｲ繝ｼ繧ｸ縺檎ｧｻ陦梧悄髢謎ｸｭ縺ｮ逶ｮ讓吝､・・000mg・峨ｒ陦ｨ遉ｺ縺励※縺・ｋ縺薙→繧堤｢ｺ隱・
    // 豕ｨ: 螳滄圀縺ｮ繧ｲ繝ｼ繧ｸ陦ｨ遉ｺ繧堤｢ｺ隱阪☆繧句ｿ・ｦ√′縺ゅｋ縺溘ａ縲√そ繝ｬ繧ｯ繧ｿ繝ｼ縺ｯ隕∬ｪｿ謨ｴ
    const sodiumGauge = page.getByText('繝翫ヨ繝ｪ繧ｦ繝', { exact: false }).first();
    await expect(sodiumGauge).toBeVisible();
    
    // 7000mg縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ医ご繝ｼ繧ｸ縺ｮ讒矩縺ｫ萓晏ｭ假ｼ・
    // 豕ｨ: 螳滄圀縺ｮUI讒矩縺ｫ蜷医ｏ縺帙※繧ｻ繝ｬ繧ｯ繧ｿ繝ｼ繧定ｪｿ謨ｴ縺吶ｋ蠢・ｦ√′縺ゅｋ
  });
});


