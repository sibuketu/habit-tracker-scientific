import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests - UI縺ｮ隕九◆逶ｮ繧偵ユ繧ｹ繝・ * 
 * 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈ｯ碑ｼ・＠縺ｦ縲ゞI縺ｮ螟画峩繧呈､懷・縺励∪縺・ */

test.describe('Visual Regression Tests - UI隕九◆逶ｮ繝・せ繝・, () => {
  
  // 蜷梧э繝ｻ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・縺吶ｋ繝倥Ν繝代・髢｢謨ｰ
  async function skipConsentAndOnboarding(page: any) {
    await page.evaluate(() => {
      localStorage.setItem('primal_logic_consent_accepted', 'true');
      localStorage.setItem('primal_logic_onboarding_completed', 'true');
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    // networkidle縺ｮ莉｣繧上ｊ縺ｫ縲√ｈ繧雁・菴鍋噪縺ｪ隕∫ｴ繧貞ｾ・▽
    await page.waitForSelector('.app-navigation, [class*="home"], [class*="Home"]', { timeout: 10000 }).catch(() => {});
    await page.waitForTimeout(500);
  }

  test('繝帙・繝逕ｻ髱｢ - 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 繝帙・繝逕ｻ髱｢縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('.home-screen-container, [class*="home"]', { timeout: 10000 });
    await page.waitForTimeout(2000); // 繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ蠕・■
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴蠖ｱ・医ョ繧ｹ繧ｯ繝医ャ繝励し繧､繧ｺ・・    await expect(page).toHaveScreenshot('home-screen-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100, // 險ｱ螳ｹ縺吶ｋ蟾ｮ蛻・ヴ繧ｯ繧ｻ繝ｫ謨ｰ
    });
  });

  test('繝帙・繝逕ｻ髱｢ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ・・Phone 12・・, async ({ page }) => {
    // iPhone 12縺ｮ繝薙Η繝ｼ繝昴・繝医し繧､繧ｺ縺ｫ險ｭ螳・    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    await page.waitForSelector('.home-screen-container, [class*="home"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴蠖ｱ・医Δ繝舌う繝ｫ繧ｵ繧､繧ｺ・・    await expect(page).toHaveScreenshot('home-screen-mobile-iphone12.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('蜈･蜉帷判髱｢・・utcherSelect・・- 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 鬟溷刀霑ｽ蜉繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const addFoodButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    await expect(addFoodButton).toBeVisible({ timeout: 10000 });
    await addFoodButton.click();
    await page.waitForTimeout(2000);
    
    // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・亥虚迚ｩ繧ｿ繝役汾・ｒ謗｢縺呻ｼ・    const beefTab = page.locator('button').filter({ hasText: /推|迚幄ｉ/ });
    await expect(beefTab.first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
    
    // 繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ繧呈聴蠖ｱ
    await expect(page).toHaveScreenshot('butcher-select-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('蜈･蜉帷判髱｢・・utcherSelect・・- 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const addFoodButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    await expect(addFoodButton).toBeVisible({ timeout: 10000 });
    await addFoodButton.click();
    await page.waitForTimeout(2000);
    
    // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・亥虚迚ｩ繧ｿ繝役汾・ｒ謗｢縺呻ｼ・    const beefTab = page.locator('button').filter({ hasText: /推|迚幄ｉ/ });
    await expect(beefTab.first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('butcher-select-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('螻･豁ｴ逕ｻ髱｢ - 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 螻･豁ｴ繧ｿ繝悶ｒ繧ｯ繝ｪ繝・け
    const historyButton = page.locator('button.app-nav-button').filter({ hasText: /螻･豁ｴ|History|投/ });
    await expect(historyButton).toBeVisible({ timeout: 10000 });
    await historyButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('.history-screen-container, [class*="history"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('history-screen-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('螻･豁ｴ逕ｻ髱｢ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const historyButton = page.locator('button.app-nav-button').filter({ hasText: /螻･豁ｴ|History|投/ });
    await expect(historyButton).toBeVisible({ timeout: 10000 });
    await historyButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('.history-screen-container, [class*="history"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('history-screen-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Labs逕ｻ髱｢ - 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('.labs-screen-container, [class*="labs"], [class*="Labs"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('labs-screen-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Labs逕ｻ髱｢ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('.labs-screen-container, [class*="labs"], [class*="Labs"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('labs-screen-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('險ｭ螳夂判髱｢ - 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶Settings|笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('[class*="settings"], [class*="Settings"], [class*="profile"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('settings-screen-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('險ｭ螳夂判髱｢ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶Settings|笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    
    await page.waitForSelector('[class*="settings"], [class*="Settings"], [class*="profile"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('settings-screen-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('AI繝√Ε繝・ヨ繝｢繝ｼ繝繝ｫ - 繝・せ繧ｯ繝医ャ繝苓｡ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // AI繝√Ε繝・ヨ繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const aiChatButton = page.locator('.ai-chat-fab-button');
    await expect(aiChatButton).toBeVisible({ timeout: 10000 });
    await aiChatButton.click();
    await page.waitForTimeout(2000);
    
    // 繝√Ε繝・ヨUI縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('.ai-chat-modal, .ai-chat-bubble', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('ai-chat-modal-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('AI繝√Ε繝・ヨ繝｢繝ｼ繝繝ｫ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // AI繝√Ε繝・ヨ繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const aiChatButton = page.locator('.ai-chat-fab-button');
    await expect(aiChatButton).toBeVisible({ timeout: 10000 });
    await aiChatButton.click();
    await page.waitForTimeout(2000);
    
    // 繝√Ε繝・ヨUI縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('.ai-chat-modal, .ai-chat-bubble', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('ai-chat-modal-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('譬・､顔ｴ繧ｲ繝ｼ繧ｸ - 隧ｳ邏ｰ陦ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 譬・､顔ｴ繧ｲ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽・医リ繝医Μ繧ｦ繝縺ｮ繝ｩ繝吶Ν繧呈爾縺呻ｼ・    const sodiumLabel = page.getByText(/繝翫ヨ繝ｪ繧ｦ繝|Sodium/i).first();
    await expect(sodiumLabel).toBeVisible({ timeout: 10000 }).catch(async () => {
      // 繝翫ヨ繝ｪ繧ｦ繝縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷医・縲∽ｻ悶・譬・､顔ｴ繧ｲ繝ｼ繧ｸ繧呈爾縺・      const anyGauge = page.locator('[class*="gauge"], [class*="Gauge"]').first();
      await expect(anyGauge).toBeVisible({ timeout: 10000 });
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot('nutrient-gauge-section.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    });
    
    if (await sodiumLabel.isVisible().catch(() => false)) {
      await page.waitForTimeout(2000);
      
      // 譬・､顔ｴ繧ｲ繝ｼ繧ｸ驛ｨ蛻・・繧ｹ繧ｯ繝ｪ繝ｼ繝ｳ繧ｷ繝ｧ繝・ヨ・医リ繝医Μ繧ｦ繝繧ｲ繝ｼ繧ｸ繧貞性繧繧ｻ繧ｯ繧ｷ繝ｧ繝ｳ・・      const gaugeSection = sodiumLabel.locator('..').locator('..').first();
      await expect(gaugeSection).toHaveScreenshot('nutrient-gauge-section.png', {
        maxDiffPixels: 100,
      });
    }
  });

  test('P:F豈皮紫繧ｲ繝ｼ繧ｸ陦ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // P:F豈皮紫繧ｲ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    const pfGauge = page.locator('[class*="pf-ratio"], [class*="PFRatio"]').first();
    await expect(pfGauge).toBeVisible({ timeout: 10000 }).catch(() => {
      // P:F豈皮紫繧ｲ繝ｼ繧ｸ縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷医・縲√ユ繧ｭ繧ｹ繝医〒謗｢縺・      return page.getByText(/P:F|P\/F|繧ｿ繝ｳ繝代け雉ｪ.*閼りｳｪ/i).first();
    });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('pf-ratio-gauge.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('繧ｪ繝｡繧ｬ3/6豈皮紫繧ｲ繝ｼ繧ｸ陦ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 繧ｪ繝｡繧ｬ豈皮紫繧ｲ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    const omegaGauge = page.locator('[class*="omega"], [class*="Omega"]').first();
    await expect(omegaGauge).toBeVisible({ timeout: 10000 }).catch(() => {
      // 繧ｪ繝｡繧ｬ豈皮紫繧ｲ繝ｼ繧ｸ縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷医・縲√ユ繧ｭ繧ｹ繝医〒謗｢縺・      return page.getByText(/繧ｪ繝｡繧ｬ|Omega|ﾏ・.*ﾏ・/i).first();
    });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('omega-ratio-gauge.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Argument Card陦ｨ遉ｺ', async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 譬・､顔ｴ繧ｲ繝ｼ繧ｸ繧偵け繝ｪ繝・け縺励※Argument Card繧定｡ｨ遉ｺ
    // 縺ｾ縺壹∬｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ譬・､顔ｴ繧ｲ繝ｼ繧ｸ繧呈爾縺呻ｼ医リ繝医Μ繧ｦ繝縲∽ｺ憺央縲√・繧ｰ繝阪す繧ｦ繝縺ｪ縺ｩ・・    const nutrientLabels = [
      page.getByText(/繝翫ヨ繝ｪ繧ｦ繝|Sodium/i).first(),
      page.getByText(/莠憺央|Zinc/i).first(),
      page.getByText(/繝槭げ繝阪す繧ｦ繝|Magnesium/i).first(),
      page.getByText(/驩лIron/i).first(),
    ];
    
    let clicked = false;
    for (const label of nutrientLabels) {
      if (await label.isVisible().catch(() => false)) {
        const gaugeContainer = label.locator('..').or(label.locator('../..'));
        await gaugeContainer.first().click();
        await page.waitForTimeout(2000);
        clicked = true;
        break;
      }
    }
    
    if (!clicked) {
      // 譬・､顔ｴ繧ｲ繝ｼ繧ｸ縺瑚ｦ九▽縺九ｉ縺ｪ縺・ｴ蜷医・縲√ご繝ｼ繧ｸ繧ｳ繝ｳ繝・リ繧堤峩謗･謗｢縺・      const gaugeContainer = page.locator('[class*="gauge"], [class*="Gauge"]').first();
      await expect(gaugeContainer).toBeVisible({ timeout: 10000 });
      await gaugeContainer.click();
      await page.waitForTimeout(2000);
    }
    
    // Argument Card縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('[class*="argument-card"], [class*="ArgumentCard"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('argument-card-desktop.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('Argument Card陦ｨ遉ｺ - 繝｢繝舌う繝ｫ陦ｨ遉ｺ', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 譬・､顔ｴ繧ｲ繝ｼ繧ｸ繧偵け繝ｪ繝・け縺励※Argument Card繧定｡ｨ遉ｺ
    const nutrientLabels = [
      page.getByText(/繝翫ヨ繝ｪ繧ｦ繝|Sodium/i).first(),
      page.getByText(/莠憺央|Zinc/i).first(),
      page.getByText(/繝槭げ繝阪す繧ｦ繝|Magnesium/i).first(),
      page.getByText(/驩лIron/i).first(),
    ];
    
    let clicked = false;
    for (const label of nutrientLabels) {
      if (await label.isVisible().catch(() => false)) {
        const gaugeContainer = label.locator('..').or(label.locator('../..'));
        await gaugeContainer.first().click();
        await page.waitForTimeout(2000);
        clicked = true;
        break;
      }
    }
    
    if (!clicked) {
      const gaugeContainer = page.locator('[class*="gauge"], [class*="Gauge"]').first();
      await expect(gaugeContainer).toBeVisible({ timeout: 10000 });
      await gaugeContainer.click();
      await page.waitForTimeout(2000);
    }
    
    // Argument Card縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('[class*="argument-card"], [class*="ArgumentCard"]', { timeout: 10000 });
    await page.waitForTimeout(2000);
    
    await expect(page).toHaveScreenshot('argument-card-mobile.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });

  test('ButcherSelect - 驛ｨ菴埼∈謚樒憾諷・, async ({ page }) => {
    await page.goto('/');
    await skipConsentAndOnboarding(page);
    
    // 鬟溷刀霑ｽ蜉繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const addFoodButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    await expect(addFoodButton).toBeVisible({ timeout: 10000 });
    await addFoodButton.click();
    await page.waitForTimeout(2000);
    
    // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    const beefTab = page.locator('button').filter({ hasText: /推|迚幄ｉ/ });
    await expect(beefTab.first()).toBeVisible({ timeout: 15000 });
    await page.waitForTimeout(1000);
    
    // 驛ｨ菴阪・繧ｿ繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('button[class*="rounded-md"]', { timeout: 10000 });
    await page.waitForTimeout(1000);
    
    // 譛蛻昴・驛ｨ菴阪・繧ｿ繝ｳ繧呈爾縺呻ｼ郁､・焚縺ｮ繝代ち繝ｼ繝ｳ繧定ｩｦ縺呻ｼ・    const partPatterns = [
      /Ribeye|繝ｪ繝悶い繧､|繝ｭ繝ｼ繧ｹ/i,
      /Sirloin|繧ｵ繝ｼ繝ｭ繧､繝ｳ/i,
      /Ground|縺ｲ縺崎ｉ/i,
      /Brisket|繝悶Μ繧ｹ繧ｱ繝・ヨ/i,
      /Chuck|繝√Ε繝・け/i,
    ];
    
    let partSelected = false;
    for (const pattern of partPatterns) {
      const partButton = page.locator('button').filter({ hasText: pattern }).first();
      const isVisible = await partButton.isVisible().catch(() => false);
      if (isVisible) {
        await partButton.click();
        await page.waitForTimeout(2000);
        partSelected = true;
        break;
      }
    }
    
    // 驛ｨ菴阪′隕九▽縺九ｉ縺ｪ縺・ｴ蜷医・縲∵怙蛻昴・驛ｨ菴阪・繧ｿ繝ｳ繧偵け繝ｪ繝・け
    if (!partSelected) {
      const firstPartButton = page.locator('button[class*="rounded-md"]').first();
      const isVisible = await firstPartButton.isVisible().catch(() => false);
      if (isVisible) {
        await firstPartButton.click();
        await page.waitForTimeout(2000);
      }
    }
    
    await expect(page).toHaveScreenshot('butcher-select-part-selected.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

