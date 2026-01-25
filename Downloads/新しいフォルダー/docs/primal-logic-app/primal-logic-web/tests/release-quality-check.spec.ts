/**
 * Release Quality Check - 繝ｪ繝ｪ繝ｼ繧ｹ蜩∬ｳｪ繝√ぉ繝・け
 * 
 * 譌｢蟄倥・繝・せ繝医〒繧ｫ繝舌・縺輔ｌ縺ｦ縺・↑縺・ｦｳ轤ｹ繧偵メ繧ｧ繝・け・・
 * 1. 險隱槭メ繧ｧ繝・け・郁恭隱樔ｸｻ霆ｸ縲∵律譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・°・・
 * 2. 譛ｪ螳溯｣・ｩ溯・縺ｮ髱櫁｡ｨ遉ｺ繝√ぉ繝・け・・eatureFlags縺ｧ蛻ｶ蠕｡縺輔ｌ縺ｦ縺・ｋ縺具ｼ・
 * 3. 縺ｯ繧翫⊂縺ｦ螳溯｣・・繝√ぉ繝・け・医・繧ｿ繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺悟虚菴懊＠縺ｪ縺・ｼ・
 */

import { test, expect } from '@playwright/test';

test.describe('Release Quality Check - 繝ｪ繝ｪ繝ｼ繧ｹ蜩∬ｳｪ繝√ぉ繝・け', () => {
  
  // 蜷梧э逕ｻ髱｢縺ｨ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・縺吶ｋ髢｢謨ｰ
  async function skipConsentAndOnboarding(page: any) {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const consentAccepted = await page.evaluate(() => {
      return localStorage.getItem('primal_logic_consent_accepted');
    });
    
    if (!consentAccepted) {
      const privacyCheckbox = page.locator('input[type="checkbox"]').first();
      const termsCheckbox = page.locator('input[type="checkbox"]').nth(1);
      
      if (await privacyCheckbox.isVisible({ timeout: 5000 }).catch(() => false)) {
        await privacyCheckbox.check();
        await termsCheckbox.check();
        await page.getByText(/蜷梧э縺励※邯壹￠繧弓Continue|Agree/i).click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
      }
    }
    
    const onboardingCompleted = await page.evaluate(() => {
      return localStorage.getItem('primal_logic_onboarding_completed');
    });
    
    if (!onboardingCompleted) {
      const skipButton = page.getByText(/繧ｹ繧ｭ繝・・|Skip/i);
      if (await skipButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await skipButton.click();
        await page.waitForLoadState('networkidle');
        await page.waitForTimeout(1000);
      }
    }
  }

  // ============================================
  // 1. 險隱槭メ繧ｧ繝・け・域律譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・°・・
  // ============================================

  test('Language Check: ResultsScreen - 譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Results逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻Other|ｧｪ/ });
    if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await labsButton.click();
      await page.waitForTimeout(2000);
      
      // Results繧ｫ繝ｼ繝峨ｒ繧ｯ繝ｪ繝・け
      const resultsCard = page.getByText(/Results|繝ｪ繧ｶ繝ｫ繝・i);
      if (await resultsCard.isVisible({ timeout: 5000 }).catch(() => false)) {
        await resultsCard.click();
        await page.waitForTimeout(2000);
        
        // 譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
        const japaneseTexts = [
          '莉企ｱ',
          '莉頑怦',
          '莉雁ｹｴ',
          '繝ｪ繧ｶ繝ｫ繝・,
          '險倬鹸繧貞・譛・,
          '繧ｷ繧ｧ繧｢蝗樊焚',
          '險倬鹸譌･謨ｰ',
          '蟷ｳ蝮・ち繝ｳ繝代け雉ｪ',
          '蟷ｳ蝮・р雉ｪ',
          '縺ｾ縺蜀咏悄縺瑚ｨ倬鹸縺輔ｌ縺ｦ縺・∪縺帙ｓ',
          '鬟滉ｺ九ｒ險倬鹸縺吶ｋ髫帙↓蜀咏悄繧定ｿｽ蜉縺励※縺ｿ縺ｾ縺励ｇ縺・,
        ];
        
        for (const text of japaneseTexts) {
          const element = page.getByText(text, { exact: false });
          const isVisible = await element.isVisible({ timeout: 1000 }).catch(() => false);
          if (isVisible) {
            throw new Error(`譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺・ "${text}"`);
          }
        }
        
        // 闍ｱ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・
        await expect(page.getByText(/Results|Share|Weekly|Monthly|Yearly|Days Recorded|Avg Protein|Avg Fat/i)).first()).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('Language Check: DiaryScreen - 繝・ヰ繧､繧ｹ騾｣謳ｺ繝懊ち繝ｳ縺碁撼陦ｨ遉ｺ・域悴螳溯｣・ｼ・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻Other|ｧｪ/ });
    if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await labsButton.click();
      await page.waitForTimeout(2000);
      
      // Diary繧ｫ繝ｼ繝峨ｒ繧ｯ繝ｪ繝・け
      const diaryCard = page.getByText(/Diary|譌･險・i);
      if (await diaryCard.isVisible({ timeout: 5000 }).catch(() => false)) {
        await diaryCard.click();
        await page.waitForTimeout(2000);
        
        // 繝・ヰ繧､繧ｹ騾｣謳ｺ繝懊ち繝ｳ・芋沐暦ｼ峨′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
        const connectButton = page.locator('button.connect-button');
        const isVisible = await connectButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (isVisible) {
          // 繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷医》itle螻樊ｧ繧堤｢ｺ隱・
          const title = await connectButton.getAttribute('title');
          if (title && title.includes('譛ｪ螳溯｣・)) {
            throw new Error('譛ｪ螳溯｣・ｩ溯・・医ョ繝舌う繧ｹ騾｣謳ｺ・峨′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺・);
          }
        }
      }
    }
  });

  test('Language Check: LabsScreen - 譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻Other|ｧｪ/ });
    if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await labsButton.click();
      await page.waitForTimeout(2000);
      
      // 譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
      const japaneseTexts = [
        '繝ｪ繧ｶ繝ｫ繝・,
        '譛滄俣縺ｮ縺ｾ縺ｨ繧√→繧ｷ繧ｧ繧｢讖溯・',
      ];
      
      for (const text of japaneseTexts) {
        const element = page.getByText(text, { exact: false });
        const isVisible = await element.isVisible({ timeout: 1000 }).catch(() => false);
        if (isVisible) {
          throw new Error(`譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺・ "${text}"`);
        }
      }
    }
  });

  // ============================================
  // 2. 譛ｪ螳溯｣・ｩ溯・縺ｮ髱櫁｡ｨ遉ｺ繝√ぉ繝・け
  // ============================================

  test('Feature Flags Check: healthDevice讖溯・縺碁撼陦ｨ遉ｺ', async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻Other|ｧｪ/ });
    if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await labsButton.click();
      await page.waitForTimeout(2000);
      
      // Diary逕ｻ髱｢縺ｫ驕ｷ遘ｻ
      const diaryCard = page.getByText(/Diary|譌･險・i);
      if (await diaryCard.isVisible({ timeout: 5000 }).catch(() => false)) {
        await diaryCard.click();
        await page.waitForTimeout(2000);
        
        // 繝・ヰ繧､繧ｹ騾｣謳ｺ繝懊ち繝ｳ・芋沐暦ｼ峨′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
        const connectButton = page.locator('button.connect-button');
        const isVisible = await connectButton.isVisible({ timeout: 2000 }).catch(() => false);
        
        if (isVisible) {
          throw new Error('healthDevice讖溯・・医ョ繝舌う繧ｹ騾｣謳ｺ繝懊ち繝ｳ・峨′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺吶ＧeatureFlags縺ｧ髱櫁｡ｨ遉ｺ縺ｫ縺吶ｋ蠢・ｦ√′縺ゅｊ縺ｾ縺吶・);
        }
      }
    }
  });

  test('Feature Flags Check: Phase 1縺ｧ髱櫁｡ｨ遉ｺ縺ｫ縺吶ｋ讖溯・縺碁撼陦ｨ遉ｺ', async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Phase 1縺ｧ髱櫁｡ｨ遉ｺ縺ｫ縺吶ｋ讖溯・縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
    const hiddenFeatures = [
      { text: /Community|繧ｳ繝溘Η繝九ユ繧｣/i, feature: 'community' },
      { text: /Shop|繧ｷ繝ｧ繝・・/i, feature: 'shop' },
      { text: /Gift|繧ｮ繝輔ヨ/i, feature: 'gift' },
    ];
    
    for (const feature of hiddenFeatures) {
      const element = page.getByText(feature.text);
      const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        // 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ縺ｨ縺励※陦ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷医・OK・育判髱｢驕ｷ遘ｻ縺ｧ縺阪↑縺・％縺ｨ繧堤｢ｺ隱搾ｼ・
        const navButton = page.locator('button.app-nav-button').filter({ hasText: feature.text });
        if (await navButton.isVisible({ timeout: 1000 }).catch(() => false)) {
          // 繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ縺後√け繝ｪ繝・け縺励※繧ら判髱｢縺ｫ驕ｷ遘ｻ縺励↑縺・％縺ｨ繧堤｢ｺ隱・
          await navButton.click();
          await page.waitForTimeout(1000);
          
          // 逕ｻ髱｢縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱搾ｼ・eatureFlags縺ｧ蛻ｶ蠕｡縺輔ｌ縺ｦ縺・ｋ縺ｯ縺夲ｼ・
          const screen = page.locator(`[class*="${feature.feature}"], [class*="Screen"]`);
          const screenVisible = await screen.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (screenVisible) {
            throw new Error(`${feature.feature}讖溯・縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺吶ＧeatureFlags縺ｧ髱櫁｡ｨ遉ｺ縺ｫ縺吶ｋ蠢・ｦ√′縺ゅｊ縺ｾ縺吶Ａ);
          }
        }
      }
    }
  });

  // ============================================
  // 3. 縺ｯ繧翫⊂縺ｦ螳溯｣・・繝√ぉ繝・け・亥虚菴懊＠縺ｪ縺・ｩ溯・・・
  // ============================================

  test('Stub Implementation Check: ResultsScreen蜈ｱ譛峨・繧ｿ繝ｳ縺悟虚菴懊☆繧・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // Results逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻Other|ｧｪ/ });
    if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await labsButton.click();
      await page.waitForTimeout(2000);
      
      const resultsCard = page.getByText(/Results|繝ｪ繧ｶ繝ｫ繝・i);
      if (await resultsCard.isVisible({ timeout: 5000 }).catch(() => false)) {
        await resultsCard.click();
        await page.waitForTimeout(2000);
        
        // 蜈ｱ譛峨・繧ｿ繝ｳ繧呈爾縺・
        const shareButton = page.getByText(/Share.*Record|險倬鹸繧貞・譛・i);
        if (await shareButton.isVisible({ timeout: 5000 }).catch(() => false)) {
          // 繝懊ち繝ｳ縺後け繝ｪ繝・け蜿ｯ閭ｽ縺ｧ縺ゅｋ縺薙→繧堤｢ｺ隱・
          await expect(shareButton).toBeEnabled();
          
          // 繧ｯ繝ｪ繝・け縺励※蜍穂ｽ懊☆繧九％縺ｨ繧堤｢ｺ隱搾ｼ医お繝ｩ繝ｼ縺檎匱逕溘＠縺ｪ縺・ｼ・
          await shareButton.click();
          await page.waitForTimeout(1000);
          
          // 繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
          const errorMessage = page.getByText(/Error|繧ｨ繝ｩ繝ｼ|Failed|螟ｱ謨・i);
          const hasError = await errorMessage.isVisible({ timeout: 2000 }).catch(() => false);
          
          if (hasError) {
            throw new Error('蜈ｱ譛峨・繧ｿ繝ｳ縺悟虚菴懊＠縺ｾ縺帙ｓ・医お繝ｩ繝ｼ縺檎匱逕溘＠縺ｦ縺・∪縺呻ｼ・);
          }
          
          // Web Share API縺ｾ縺溘・繧ｯ繝ｪ繝・・繝懊・繝峨∈縺ｮ繧ｳ繝斐・縺悟虚菴懊☆繧九％縺ｨ繧堤｢ｺ隱・
          // ・亥ｮ滄圀縺ｮ蜍穂ｽ懃｢ｺ隱阪・髮｣縺励＞縺溘ａ縲√お繝ｩ繝ｼ縺後↑縺・％縺ｨ繧堤｢ｺ隱阪☆繧具ｼ・
        }
      }
    }
  });

  test('Stub Implementation Check: 譛ｪ螳溯｣・ｩ溯・縺ｮ繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // 譛ｪ螳溯｣・ｩ溯・縺ｮ繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
    const stubButtons = [
      { selector: 'button.connect-button', description: '繝・ヰ繧､繧ｹ騾｣謳ｺ繝懊ち繝ｳ' },
    ];
    
    for (const button of stubButtons) {
      const element = page.locator(button.selector);
      const isVisible = await element.isVisible({ timeout: 2000 }).catch(() => false);
      
      if (isVisible) {
        // 繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷医》itle螻樊ｧ繧堤｢ｺ隱・
        const title = await element.getAttribute('title');
        if (title && (title.includes('譛ｪ螳溯｣・) || title.includes('Not implemented'))) {
          throw new Error(`${button.description}縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺呻ｼ域悴螳溯｣・・縺溘ａ髱櫁｡ｨ遉ｺ縺ｫ縺吶ｋ蠢・ｦ√′縺ゅｊ縺ｾ縺呻ｼ荏);
        }
      }
    }
  });

  // ============================================
  // 4. 蜈ｨ逕ｻ髱｢縺ｮ險隱槭メ繧ｧ繝・け・井ｸｻ隕√↑譌･譛ｬ隱槭ユ繧ｭ繧ｹ繝茨ｼ・
  // ============================================

  test('Language Check: 荳ｻ隕∫判髱｢縺ｧ譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・, async ({ page }) => {
    await skipConsentAndOnboarding(page);
    
    // 荳ｻ隕√↑譌･譛ｬ隱槭ユ繧ｭ繧ｹ繝医′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
    const japanesePatterns = [
      /莉企ｱ|莉頑怦|莉雁ｹｴ/,
      /繝ｪ繧ｶ繝ｫ繝・,
      /險倬鹸繧貞・譛・,
      /繧ｷ繧ｧ繧｢蝗樊焚/,
      /險倬鹸譌･謨ｰ/,
      /蟷ｳ蝮・ち繝ｳ繝代け雉ｪ|蟷ｳ蝮・р雉ｪ/,
      /繝・ヰ繧､繧ｹ騾｣謳ｺ.*譛ｪ螳溯｣・,
    ];
    
    // 蜷・判髱｢繧貞ｷ｡蝗槭＠縺ｦ繝√ぉ繝・け
    const screens = ['home', 'history', 'labs', 'settings'];
    
    for (const screen of screens) {
      // 逕ｻ髱｢縺ｫ驕ｷ遘ｻ
      if (screen === 'home') {
        await page.goto('/#home');
      } else if (screen === 'history') {
        const historyButton = page.locator('button.app-nav-button').filter({ hasText: /History|螻･豁ｴ/i });
        if (await historyButton.isVisible({ timeout: 5000 }).catch(() => false)) {
          await historyButton.click();
          await page.waitForTimeout(1000);
        }
      } else if (screen === 'labs') {
        const labsButton = page.locator('button.app-nav-button').filter({ hasText: /Other|縺昴・莉翻ｧｪ/ });
        if (await labsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
          await labsButton.click();
          await page.waitForTimeout(1000);
        }
      } else if (screen === 'settings') {
        const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /Settings|險ｭ螳・i });
        if (await settingsButton.isVisible({ timeout: 5000 }).catch(() => false)) {
          await settingsButton.click();
          await page.waitForTimeout(1000);
        }
      }
      
      await page.waitForTimeout(1000);
      
      // 譌･譛ｬ隱槭ヱ繧ｿ繝ｼ繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・％縺ｨ繧堤｢ｺ隱・
      for (const pattern of japanesePatterns) {
        const element = page.getByText(pattern);
        const isVisible = await element.isVisible({ timeout: 1000 }).catch(() => false);
        
        if (isVisible) {
          const text = await element.textContent();
          throw new Error(`${screen}逕ｻ髱｢縺ｧ譌･譛ｬ隱槭′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・∪縺・ "${text}"`);
        }
      }
    }
  });
});

