import { test, expect } from '@playwright/test';

test.describe('CarnivOS UI Tests', () => {
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
    await page.goto('/');
    await skipConsentAndOnboarding(page);
  });

  test('Zone 1縺ｨZone 2縺梧ｭ｣縺励￥陦ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    
    // 繧ｭ繝｣繝・メ繝輔Ξ繝ｼ繧ｺ繝舌リ繝ｼ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
    const catchphraseBanner = page.locator('.catchphrase-banner');
    await expect(catchphraseBanner).toHaveCount(0);
    
    // Zone 1縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ・one 1縺ｨ縺・≧繝・く繧ｹ繝医′縺ｪ縺・ｴ蜷医・縲∵・､顔ｴ繧ｲ繝ｼ繧ｸ縺ｧ遒ｺ隱搾ｼ・
    await expect(page.getByText('繝翫ヨ繝ｪ繧ｦ繝')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('繧ｫ繝ｪ繧ｦ繝')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('繝槭げ繝阪す繧ｦ繝')).toBeVisible({ timeout: 10000 });
    
    // Zone 2縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ・one 2縺ｨ縺・≧繝・く繧ｹ繝医′縺ｪ縺・ｴ蜷医・縲∵・､顔ｴ繧ｲ繝ｼ繧ｸ縺ｧ遒ｺ隱搾ｼ・
    await expect(page.getByText('繧ｿ繝ｳ繝代け雉ｪ', { exact: false }).first()).toBeVisible({ timeout: 10000 });
    // 縲瑚р雉ｪ縲阪・隍・焚邂・園縺ｫ縺ゅｋ縺溘ａ縲〇one 2蜀・・迚ｹ螳壹・隕∫ｴ繧堤｢ｺ隱・
    await expect(page.getByText('閼りｳｪ', { exact: true }).first()).toBeVisible({ timeout: 10000 });
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴繧・
    await page.screenshot({ path: 'tests/screenshots/zones.png', fullPage: true });
  });

  test('ButcherSelect縺ｮNutrients Breakdown縺ｫ繧ｰ繝ｪ繧ｷ繝ｳ縺ｪ縺ｩ縺瑚｡ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    // beforeEach縺ｧ譌｢縺ｫ繝壹・繧ｸ繧帝幕縺阪∝酔諢冗判髱｢繝ｻ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・貂医∩
    
    // 鬟溷刀霑ｽ蜉繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const addFoodButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    await expect(addFoodButton).toBeVisible({ timeout: 10000 });
    await addFoodButton.click();
    await page.waitForTimeout(2000);
    
    // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・亥虚迚ｩ繧ｿ繝役汾・ｒ謗｢縺呻ｼ・
    const beefTab = page.locator('button').filter({ hasText: /推|迚幄ｉ/ });
    await expect(beefTab.first()).toBeVisible({ timeout: 15000 });
    
    // 迚幄ｉ縺ｮRibeye繧帝∈謚・
    const ribeyeButton = page.getByText('Ribeye');
    await expect(ribeyeButton).toBeVisible({ timeout: 10000 });
    await ribeyeButton.click();
    
    // 謨ｰ驥丞・蜉帙′陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('text=QUANTITY', { timeout: 10000 });
    
    // Nutrients Breakdown縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('text=Nutrients Breakdown', { timeout: 10000 });
    
    // 繧ｰ繝ｪ繧ｷ繝ｳ縲√Γ繝√が繝九Φ縲√き繝ｫ繧ｷ繧ｦ繝縲√Μ繝ｳ縲√Κ繧ｦ邏縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・
    await expect(page.getByText('繧ｰ繝ｪ繧ｷ繝ｳ', { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('繝｡繝√が繝九Φ', { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('繧ｫ繝ｫ繧ｷ繧ｦ繝', { exact: true })).toBeVisible({ timeout: 10000 });
    // 縲後Μ繝ｳ縲阪・縲後さ繝ｪ繝ｳ縲阪→蛹ｺ蛻･縺吶ｋ縺溘ａ縲‘xact: true繧剃ｽｿ逕ｨ
    await expect(page.getByText('繝ｪ繝ｳ', { exact: true })).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('繝ｨ繧ｦ邏', { exact: true })).toBeVisible({ timeout: 10000 });
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴繧・
    await page.screenshot({ path: 'tests/screenshots/nutrients-breakdown.png', fullPage: true });
  });

  test('繧ｪ繝｡繧ｬ3/6豈皮紫縺梧ｭ｣縺励￥陦ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    await page.goto('/');
    // networkidle縺ｮ莉｣繧上ｊ縺ｫ縲√ｈ繧雁・菴鍋噪縺ｪ隕∫ｴ繧貞ｾ・▽
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
    
    // 鬟溷刀霑ｽ蜉繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const addFoodButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    await expect(addFoodButton).toBeVisible({ timeout: 10000 });
    await addFoodButton.click();
    await page.waitForTimeout(2000);
    
    // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・亥虚迚ｩ繧ｿ繝役汾・ｒ謗｢縺呻ｼ・
    const beefTab = page.locator('button').filter({ hasText: /推|迚幄ｉ/ });
    await expect(beefTab.first()).toBeVisible({ timeout: 15000 });
    
    // 迚幄ｉ縺ｮRibeye繧帝∈謚・
    const ribeyeButton = page.getByText('Ribeye');
    await expect(ribeyeButton).toBeVisible({ timeout: 10000 });
    await ribeyeButton.click();
    
    // 謨ｰ驥丞・蜉帙′陦ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('text=QUANTITY', { timeout: 10000 });
    
    // Nutrients Breakdown縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('text=Nutrients Breakdown', { timeout: 10000 });
    
    // 繧ｪ繝｡繧ｬ3/6豈皮紫縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・医ユ繧ｭ繧ｹ繝医′蜷ｫ縺ｾ繧後ｋ隕∫ｴ繧呈爾縺呻ｼ・
    // OmegaRatioDisplay繧ｳ繝ｳ繝昴・繝阪Φ繝医′陦ｨ遉ｺ縺吶ｋ繝・く繧ｹ繝医ｒ遒ｺ隱・
    const omegaRatioText = page.getByText(/繧ｪ繝｡繧ｬ|Omega|ﾎｩ/, { exact: false });
    await expect(omegaRatioText.first()).toBeVisible({ timeout: 10000 });
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴繧・
    await page.screenshot({ path: 'tests/screenshots/omega-ratio.png', fullPage: true });
  });
});


