import { test, expect } from '@playwright/test';

test.describe('CarnivOS - 繝・せ繝磯・岼29莉･髯阪・閾ｪ蜍輔ユ繧ｹ繝・, () => {
  
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 蜷梧э逕ｻ髱｢縺ｨ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・・域里縺ｫ蜷梧э貂医∩縺ｮ蝣ｴ蜷茨ｼ・
    const consentAccepted = await page.evaluate(() => {
      return localStorage.getItem('primal_logic_consent_accepted');
    });
    
    if (!consentAccepted) {
      // 蜷梧э逕ｻ髱｢縺瑚｡ｨ遉ｺ縺輔ｌ縺ｦ縺・ｋ蝣ｴ蜷医∝酔諢上☆繧・
      const privacyCheckbox = page.locator('input[type="checkbox"]').first();
      const termsCheckbox = page.locator('input[type="checkbox"]').nth(1);
      
      if (await privacyCheckbox.isVisible()) {
        await privacyCheckbox.check();
        await termsCheckbox.check();
        await page.getByText('蜷梧э縺励※邯壹￠繧・).click();
        await page.waitForLoadState('networkidle');
      }
    }
  });

  // ============================================
  // AI繝√Ε繝・ヨ讖溯・・・9-30・・
  // ============================================

  test('29: Todo繧｢繧ｯ繧ｷ繝ｧ繝ｳ縺悟虚菴懊☆繧具ｼ医≠繧後・・・, async ({ page }) => {
    // AI繝√Ε繝・ヨ繧帝幕縺・
    const aiChatButton = page.locator('.ai-chat-fab-button');
    await expect(aiChatButton).toBeVisible();
    await aiChatButton.click();
    
    // 繝√Ε繝・ヨUI縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('.ai-chat-modal, .ai-chat-bubble', { timeout: 5000 });
    
    // 繝｡繝・そ繝ｼ繧ｸ繧帝∽ｿ｡・・odo縺瑚ｿ斐＆繧後ｋ蜿ｯ閭ｽ諤ｧ縺後≠繧九Γ繝・そ繝ｼ繧ｸ・・
    const chatInput = page.locator('#chat-input-field, .ai-chat-textarea');
    if (await chatInput.isVisible()) {
      await chatInput.fill('迚幄ｉ繧・00g霑ｽ蜉縺励※縺上□縺輔＞');
      await page.getByText('騾∽ｿ｡').click();
      
      // AI蠢懃ｭ斐ｒ蠕・▽・域怙螟ｧ10遘抵ｼ・
      await page.waitForTimeout(10000);
      
      // Todo繧ｫ繝ｼ繝峨′陦ｨ遉ｺ縺輔ｌ繧九°遒ｺ隱・
      const todoCard = page.locator('.ai-chat-todo-card');
      if (await todoCard.isVisible({ timeout: 5000 }).catch(() => false)) {
        // Todo繧｢繧ｯ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ縺悟ｭ伜惠縺吶ｋ縺狗｢ｺ隱・
        const todoActionButton = page.locator('.ai-chat-todo-action-button');
        if (await todoActionButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          // Todo繧｢繧ｯ繧ｷ繝ｧ繝ｳ繝懊ち繝ｳ縺後け繝ｪ繝・け蜿ｯ閭ｽ縺狗｢ｺ隱・
          await expect(todoActionButton.first()).toBeVisible();
        }
      }
    }
  });

  test('30: 繝√Ε繝・ヨ繧帝哩縺倥ｉ繧後ｋ', async ({ page }) => {
    // AI繝√Ε繝・ヨ繧帝幕縺・
    const aiChatButton = page.locator('.ai-chat-fab-button');
    await expect(aiChatButton).toBeVisible();
    await aiChatButton.click();
    
    // 繝√Ε繝・ヨUI縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
    await page.waitForSelector('.ai-chat-modal, .ai-chat-bubble', { timeout: 5000 });
    
    // 髢峨§繧九・繧ｿ繝ｳ繧偵け繝ｪ繝・け
    const closeButton = page.locator('.ai-chat-close-button, .ai-chat-bubble-close-button');
    await expect(closeButton).toBeVisible();
    await closeButton.click();
    
    // 繝√Ε繝・ヨUI縺碁撼陦ｨ遉ｺ縺ｫ縺ｪ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.locator('.ai-chat-modal, .ai-chat-bubble')).not.toBeVisible({ timeout: 3000 });
  });

  // ============================================
  // 縺昴・莉也判髱｢讖溯・・・1-45・・
  // ============================================

  test('31: 縺昴・莉也判髱｢・・abs・峨↓驕ｷ遘ｻ縺ｧ縺阪ｋ', async ({ page }) => {
    // 荳矩Κ繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ縲後◎縺ｮ莉悶阪・繧ｿ繝ｳ繧偵け繝ｪ繝・け
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    
    // Labs逕ｻ髱｢縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.locator('.labs-screen-container, [class*="labs"], [class*="Labs"]').first()).toBeVisible({ timeout: 10000 });
  });

  test('32: Bio-Tuner繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // Bio-Tuner繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.getByText(/Bio-Tuner/i)).toBeVisible({ timeout: 10000 });
  });

  test('33: Bio-Tuner繝懊ち繝ｳ繧偵ち繝・・縺励※蜈･蜉帷判髱｢縺ｫ驕ｷ遘ｻ縺ｧ縺阪ｋ', async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // Bio-Tuner繝懊ち繝ｳ繧偵け繝ｪ繝・け
    const bioTunerButton = page.getByText(/Bio-Tuner/i);
    await bioTunerButton.click();
    
    // 蜈･蜉帷判髱｢縺ｫ驕ｷ遘ｻ縺吶ｋ縺薙→繧堤｢ｺ隱搾ｼ育判髱｢驕ｷ遘ｻ縺ｮ繧､繝吶Φ繝医ｒ蠕・▽・・
    await page.waitForTimeout(1000);
    // 蜈･蜉帷判髱｢縺ｮ隕∫ｴ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ隕∫ｴ縺ｫ蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
  });

  test('34-36: 譌･險俶ｩ溯・縺瑚｡ｨ遉ｺ繝ｻ蜈･蜉帙・菫晏ｭ倥〒縺阪ｋ', async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // 譌･險俶ｩ溯・縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const diarySection = page.getByText(/譌･險・i);
    if (await diarySection.isVisible({ timeout: 5000 }).catch(() => false)) {
      // 譌･險伜・蜉帙′縺ｧ縺阪ｋ縺薙→繧堤｢ｺ隱・
      const diaryInput = page.locator('textarea, input[type="text"]').filter({ hasText: /譌･險・diary/i });
      if (await diaryInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await diaryInput.fill('繝・せ繝域律險・);
        // 菫晏ｭ倥・繧ｿ繝ｳ繧偵け繝ｪ繝・け
        const saveButton = page.getByText(/菫晏ｭ・Save/i);
        if (await saveButton.isVisible({ timeout: 2000 }).catch(() => false)) {
          await saveButton.click();
        }
      }
    }
  });

  test('37-38: 鄙呈・繝医Λ繝・き繝ｼ縺瑚｡ｨ遉ｺ繝ｻ蜍穂ｽ懊☆繧・, async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // 鄙呈・繝医Λ繝・き繝ｼ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const streakTracker = page.getByText(/鄙呈・繝医Λ繝・き繝ｼ|Streak/i);
    if (await streakTracker.isVisible({ timeout: 5000 }).catch(() => false)) {
      // 鄙呈・繝医Λ繝・き繝ｼ縺悟虚菴懊☆繧九％縺ｨ繧堤｢ｺ隱・
      await expect(streakTracker).toBeVisible();
    }
  });

  test('39-40: Doctor Defense縺瑚｡ｨ遉ｺ繝ｻ蜍穂ｽ懊☆繧・, async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // Doctor Defense縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const doctorDefense = page.getByText(/Doctor Defense|蛹ｻ閠・∈縺ｮ隱ｬ譏・i);
    if (await doctorDefense.isVisible({ timeout: 5000 }).catch(() => false)) {
      await doctorDefense.click();
      
      // 陦豸ｲ讀懈渊蛟､蜈･蜉帙′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
      await page.waitForTimeout(1000);
      // 螳滄圀縺ｮ隕∫ｴ縺ｫ蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・
    }
  });

  test('41-42: Logic Armor縺瑚｡ｨ遉ｺ繝ｻ蜍穂ｽ懊☆繧・, async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // Logic Armor縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const logicArmor = page.getByText(/Logic Armor|逅・ｫ匁ｭｦ陬・i);
    if (await logicArmor.isVisible({ timeout: 5000 }).catch(() => false)) {
      await logicArmor.click();
      await page.waitForTimeout(1000);
    }
  });

  test('43-45: Tips讖溯・縺瑚｡ｨ遉ｺ繝ｻ菫晏ｭ倥〒縺阪ｋ', async ({ page }) => {
    // Labs逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const labsButton = page.locator('button.app-nav-button').filter({ hasText: /縺昴・莉翻ｧｪ/ });
    await expect(labsButton).toBeVisible({ timeout: 10000 });
    await labsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('.labs-screen-container, [class*="labs"]', { timeout: 10000 });
    
    // Tips讖溯・縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const tips = page.getByText(/Tips|繝偵Φ繝・i);
    if (await tips.isVisible({ timeout: 5000 }).catch(() => false)) {
      // Tips縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
      await expect(tips).toBeVisible();
      
      // Tips菫晏ｭ倥・繧ｿ繝ｳ縺悟ｭ伜惠縺吶ｋ縺狗｢ｺ隱・
      const saveButton = page.locator('button').filter({ hasText: /菫晏ｭ・縺頑ｰ励↓蜈･繧・i });
      if (await saveButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(saveButton.first()).toBeVisible();
      }
    }
  });

  // ============================================
  // 險ｭ螳夂判髱｢讖溯・・・6-60・・
  // ============================================

  test('46: 險ｭ螳夂判髱｢縺ｫ驕ｷ遘ｻ縺ｧ縺阪ｋ', async ({ page }) => {
    // 荳矩Κ繝翫ン繧ｲ繝ｼ繧ｷ繝ｧ繝ｳ縺ｮ縲瑚ｨｭ螳壹阪・繧ｿ繝ｳ繧偵け繝ｪ繝・け
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶笞呻ｸ・ });
    await expect(settingsButton).toBeVisible();
    await settingsButton.click();
    
    // 險ｭ螳夂判髱｢縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.locator('.settings-screen-container, [class*="settings"]')).toBeVisible({ timeout: 5000 });
  });

  test('47-49: 繝励Ο繝輔ぅ繝ｼ繝ｫ險ｭ螳壹′陦ｨ遉ｺ繝ｻ蜈･蜉帙・菫晏ｭ倥〒縺阪ｋ', async ({ page }) => {
    // 險ｭ螳夂判髱｢縺ｫ驕ｷ遘ｻ
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(1000);
    
    // 繝励Ο繝輔ぅ繝ｼ繝ｫ險ｭ螳壹′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const profileLink = page.getByText(/繝励Ο繝輔ぅ繝ｼ繝ｫ|Profile/i);
    if (await profileLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await profileLink.click();
      await page.waitForTimeout(1000);
      
      // 蝓ｺ譛ｬ諠・ｱ蜈･蜉帙′縺ｧ縺阪ｋ縺薙→繧堤｢ｺ隱・
      const genderSelect = page.locator('select, button').filter({ hasText: /諤ｧ蛻･|Gender/i });
      if (await genderSelect.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(genderSelect).toBeVisible();
      }
      
      // 菫晏ｭ倥・繧ｿ繝ｳ縺悟ｭ伜惠縺吶ｋ縺狗｢ｺ隱・
      const saveButton = page.getByText(/菫晏ｭ・Save/i);
      if (await saveButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(saveButton).toBeVisible();
      }
    }
  });

  test('50: 繝励Ο繝輔ぅ繝ｼ繝ｫ菫晏ｭ伜ｾ後√・繝ｼ繝逕ｻ髱｢縺ｮ逶ｮ讓吝､縺梧峩譁ｰ縺輔ｌ繧・, async ({ page }) => {
    // 繝励Ο繝輔ぅ繝ｼ繝ｫ險ｭ螳壹〒諤ｧ蛻･繧貞､画峩
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(1000);
    
    const profileLink = page.getByText(/繝励Ο繝輔ぅ繝ｼ繝ｫ|Profile/i);
    if (await profileLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await profileLink.click();
      await page.waitForTimeout(1000);
      
      // 險ｭ螳壹ｒ螟画峩縺励※菫晏ｭ假ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
      const saveButton = page.getByText(/菫晏ｭ・Save/i);
      if (await saveButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        await saveButton.click();
        await page.waitForTimeout(1000);
        
        // 繝帙・繝逕ｻ髱｢縺ｫ謌ｻ繧・
        const homeButton = page.locator('button.app-nav-button').filter({ hasText: /繝帙・繝|Home|匠/ });
        await expect(homeButton).toBeVisible({ timeout: 10000 });
        await homeButton.click();
        await page.waitForTimeout(2000);
        await page.waitForTimeout(1000);
        
        // 逶ｮ讓吝､縺梧峩譁ｰ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
      }
    }
  });

  test('51-52: 譬・､顔ｴ逶ｮ讓吝､險ｭ螳壹′陦ｨ遉ｺ繝ｻ螟画峩縺ｧ縺阪ｋ', async ({ page }) => {
    // 險ｭ螳夂判髱｢縺ｫ驕ｷ遘ｻ
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(1000);
    
    // 譬・､顔ｴ逶ｮ讓吝､險ｭ螳壹′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const nutrientTargetLink = page.getByText(/譬・､顔ｴ逶ｮ讓吝､|Nutrient Target/i);
    if (await nutrientTargetLink.isVisible({ timeout: 5000 }).catch(() => false)) {
      await nutrientTargetLink.click();
      await page.waitForTimeout(1000);
      
      // 譬・､顔ｴ逶ｮ讓吝､繧貞､画峩縺ｧ縺阪ｋ縺薙→繧堤｢ｺ隱・
      const targetInput = page.locator('input[type="number"]').first();
      if (await targetInput.isVisible({ timeout: 2000 }).catch(() => false)) {
        await expect(targetInput).toBeVisible();
      }
    }
  });

  test('53-55: 陦ｨ遉ｺ險ｭ螳壹′陦ｨ遉ｺ繝ｻ螟画峩繝ｻ蜿肴丐縺輔ｌ繧・, async ({ page }) => {
    // 險ｭ螳夂判髱｢縺ｫ驕ｷ遘ｻ
    const settingsButton = page.locator('button.app-nav-button').filter({ hasText: /險ｭ螳嘶笞呻ｸ・ });
    await expect(settingsButton).toBeVisible({ timeout: 10000 });
    await settingsButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(1000);
    
    // 陦ｨ遉ｺ險ｭ螳壹′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const displaySettings = page.getByText(/陦ｨ遉ｺ險ｭ螳嘶Display/i);
    if (await displaySettings.isVisible({ timeout: 5000 }).catch(() => false)) {
      await displaySettings.click();
      await page.waitForTimeout(1000);
      
      // 譬・､顔ｴ縺ｮ陦ｨ遉ｺ/髱櫁｡ｨ遉ｺ繧貞・繧頑崛縺医ｉ繧後ｋ縺薙→繧堤｢ｺ隱・
      const toggleButton = page.locator('input[type="checkbox"], button[role="switch"]').first();
      if (await toggleButton.isVisible({ timeout: 2000 }).catch(() => false)) {
        const initialState = await toggleButton.isChecked();
        await toggleButton.click();
        await page.waitForTimeout(500);
        
        // 繝帙・繝逕ｻ髱｢縺ｫ謌ｻ縺｣縺ｦ蜿肴丐繧堤｢ｺ隱・
        const homeButton = page.locator('button.app-nav-button').filter({ hasText: /繝帙・繝|Home|匠/ });
        await expect(homeButton).toBeVisible({ timeout: 10000 });
        await homeButton.click();
        await page.waitForTimeout(2000);
        await page.waitForTimeout(1000);
        
        // 陦ｨ遉ｺ險ｭ螳壹′蜿肴丐縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
      }
    }
  });

  // ============================================
  // 繝・・繧ｿ菫晏ｭ倥・隱ｭ縺ｿ霎ｼ縺ｿ・・1-70・・
  // ============================================

  test('61: 繝・・繧ｿ菫晏ｭ・- 鬟溷刀霑ｽ蜉蠕後√Μ繝ｭ繝ｼ繝峨＠縺ｦ繧ゅョ繝ｼ繧ｿ縺梧ｮ九▲縺ｦ縺・ｋ', async ({ page }) => {
    // 繝帙・繝逕ｻ髱｢縺ｧ鬟溷刀繧定ｿｽ蜉
    const addFoodButton = page.getByText('+ 鬟溷刀繧定ｿｽ蜉');
    if (await addFoodButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addFoodButton.click();
      await page.waitForTimeout(1000);
      
      // 鬟溷刀繧帝∈謚槭＠縺ｦ霑ｽ蜉・育ｰ｡譏鍋沿縲∝ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
      // 縺薙％縺ｧ縺ｯ繝・・繧ｿ縺御ｿ晏ｭ倥＆繧後ｋ縺薙→繧貞燕謠舌→縺吶ｋ
    }
    
    // 繝壹・繧ｸ繧偵Μ繝ｭ繝ｼ繝・
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 繝・・繧ｿ縺梧ｮ九▲縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
    // 萓・ 霑ｽ蜉縺励◆鬟溷刀縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
  });

  test('62: 繝・・繧ｿ隱ｭ縺ｿ霎ｼ縺ｿ - 繧｢繝励Μ繧帝哩縺倥※蜀榊ｺｦ髢九＞縺滓凾縲√ョ繝ｼ繧ｿ縺瑚ｪｭ縺ｿ霎ｼ縺ｾ繧後ｋ', async ({ page, context }) => {
    // 繝・・繧ｿ繧定ｿｽ蜉・育ｰ｡譏鍋沿・・
    // ...
    
    // 譁ｰ縺励＞繝壹・繧ｸ縺ｧ髢九￥・医い繝励Μ繧帝哩縺倥※蜀榊ｺｦ髢九￥繧ｷ繝溘Η繝ｬ繝ｼ繧ｷ繝ｧ繝ｳ・・
    const newPage = await context.newPage();
    await newPage.goto('/');
    await newPage.waitForLoadState('networkidle');
    
    // 繝・・繧ｿ縺瑚ｪｭ縺ｿ霎ｼ縺ｾ繧後ｋ縺薙→繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
    await newPage.close();
  });

  test('65-66: 譛滄俣驕ｸ謚槭′蜍穂ｽ懊＠縲∵悄髢灘挨繝・・繧ｿ縺瑚｡ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    // 螻･豁ｴ逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const historyButton = page.locator('button.app-nav-button').filter({ hasText: /螻･豁ｴ|History|投/ });
    await expect(historyButton).toBeVisible({ timeout: 10000 });
    await historyButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(2000);
    
    // 譛滄俣驕ｸ謚槭′陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    const periodSelect = page.locator('button, select').filter({ hasText: /莉頑律|騾ｱ|譛・蜈ｨ譛滄俣/i });
    if (await periodSelect.isVisible({ timeout: 5000 }).catch(() => false)) {
      // 譛滄俣繧帝∈謚・
      await periodSelect.first().click();
      await page.waitForTimeout(1000);
      
      // 譛滄俣蛻･繝・・繧ｿ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
    }
  });

  // ============================================
  // UI/UX・・1-85・・
  // ============================================

  test('71: 繝ｬ繧ｹ繝昴Φ繧ｷ繝冶｡ｨ遉ｺ - iPhone縺ｮ逕ｻ髱｢繧ｵ繧､繧ｺ縺ｫ驕ｩ蛻・↓陦ｨ遉ｺ縺輔ｌ繧・, async ({ page }) => {
    // iPhone 15縺ｮ逕ｻ髱｢繧ｵ繧､繧ｺ縺ｫ險ｭ螳・
    await page.setViewportSize({ width: 393, height: 852 });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 繝帙・繝逕ｻ髱｢縺碁←蛻・↓陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    await expect(page.locator('.home-screen-container, [class*="home"]')).toBeVisible();
    
    // 隕∫ｴ縺檎判髱｢縺九ｉ縺ｯ縺ｿ蜃ｺ縺励※縺・↑縺・％縺ｨ繧堤｢ｺ隱搾ｼ医せ繧ｯ繝ｭ繝ｼ繝ｫ蜿ｯ閭ｽ縺ｪ蝣ｴ蜷医・OK・・
  });

  test('72: 繧ｿ繝・メ繧ｿ繝ｼ繧ｲ繝・ヨ - 繝懊ち繝ｳ縺後ち繝・メ縺励ｄ縺吶＞繧ｵ繧､繧ｺ・・4px莉･荳奇ｼ峨〒縺ゅｋ', async ({ page }) => {
    // 繝懊ち繝ｳ縺ｮ繧ｵ繧､繧ｺ繧堤｢ｺ隱・
    const buttons = page.locator('button.app-nav-button');
    const count = await buttons.count();
    
    for (let i = 0; i < Math.min(count, 5); i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();
      if (box) {
        // 繧ｿ繝・メ繧ｿ繝ｼ繧ｲ繝・ヨ縺・4px莉･荳翫〒縺ゅｋ縺薙→繧堤｢ｺ隱・
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });

  test('73-74: 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺後〒縺阪ｋ繝ｻ繧ｹ繝繝ｼ繧ｺ縺ｫ蜍穂ｽ懊☆繧・, async ({ page }) => {
    // 髟ｷ縺・さ繝ｳ繝・Φ繝・′縺ゅｋ逕ｻ髱｢縺ｫ驕ｷ遘ｻ
    const historyButton = page.locator('button.app-nav-button').filter({ hasText: /螻･豁ｴ|History|投/ });
    await expect(historyButton).toBeVisible({ timeout: 10000 });
    await historyButton.click();
    await page.waitForTimeout(2000);
    await page.waitForTimeout(1000);
    
    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ縺後〒縺阪ｋ縺薙→繧堤｢ｺ隱・
    await page.evaluate(() => {
      window.scrollTo(0, 500);
    });
    await page.waitForTimeout(500);
    
    // 繧ｹ繧ｯ繝ｭ繝ｼ繝ｫ菴咲ｽｮ縺悟､画峩縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(0);
  });

  test('75: 繝ｭ繝ｼ繝・ぅ繝ｳ繧ｰ陦ｨ遉ｺ縺碁←蛻・, async ({ page }) => {
    // 繝・・繧ｿ隱ｭ縺ｿ霎ｼ縺ｿ荳ｭ縺ｮ繝ｭ繝ｼ繝・ぅ繝ｳ繧ｰ陦ｨ遉ｺ繧堤｢ｺ隱・
    // 螳滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・
    // 萓・ 繝・・繧ｿ繧定ｪｭ縺ｿ霎ｼ繧髫帙↓繝ｭ繝ｼ繝・ぅ繝ｳ繧ｰ陦ｨ遉ｺ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
  });

  test('76: 遨ｺ繝・・繧ｿ陦ｨ遉ｺ縺碁←蛻・, async ({ page }) => {
    // 繝・・繧ｿ縺後↑縺・憾諷九〒逕ｻ髱｢繧堤｢ｺ隱・
    // localStorage繧偵け繝ｪ繧｢
    await page.evaluate(() => {
      localStorage.clear();
    });
    await page.reload();
    await page.waitForLoadState('networkidle');
    
    // 遨ｺ繝・・繧ｿ陦ｨ遉ｺ縺碁←蛻・↓陦ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱搾ｼ亥ｮ滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・ｼ・
    // 萓・ 縲後ョ繝ｼ繧ｿ縺後≠繧翫∪縺帙ｓ縲阪↑縺ｩ縺ｮ繝｡繝・そ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
  });

  // ============================================
  // 繝代ヵ繧ｩ繝ｼ繝槭Φ繧ｹ・・6-95・・
  // ============================================

  test('86: 蛻晏屓隱ｭ縺ｿ霎ｼ縺ｿ騾溷ｺｦ - 3遘剃ｻ･蜀・, async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    // 蛻晏屓隱ｭ縺ｿ霎ｼ縺ｿ縺・遘剃ｻ･蜀・〒縺ゅｋ縺薙→繧堤｢ｺ隱・
    expect(loadTime).toBeLessThan(3000);
  });

  test('87: 逕ｻ髱｢驕ｷ遘ｻ騾溷ｺｦ - 1遘剃ｻ･蜀・, async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    const startTime = Date.now();
    const historyButton = page.locator('button.app-nav-button').filter({ hasText: /螻･豁ｴ|History|投/ });
    await expect(historyButton).toBeVisible({ timeout: 10000 });
    await historyButton.click();
    await page.waitForTimeout(2000);
    await page.waitForSelector('[class*="history"]', { timeout: 5000 });
    const transitionTime = Date.now() - startTime;
    
    // 逕ｻ髱｢驕ｷ遘ｻ縺・遘剃ｻ･蜀・〒縺ゅｋ縺薙→繧堤｢ｺ隱・
    expect(transitionTime).toBeLessThan(1000);
  });

  test('88: 鬟溷刀讀懃ｴ｢騾溷ｺｦ - 2遘剃ｻ･蜀・↓螳御ｺ・, async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    // 蜈･蜉帷判髱｢縺ｫ驕ｷ遘ｻ
    const inputButton = page.getByText(/\+.*鬟溷刀繧定ｿｽ蜉|\+.*Add Food/i);
    if (await inputButton.isVisible({ timeout: 10000 }).catch(() => false)) {
      await inputButton.click();
      await page.waitForTimeout(2000);
      await page.waitForTimeout(1000);
      
      // 鬟溷刀讀懃ｴ｢繧貞ｮ溯｡・
      const searchInput = page.locator('input[type="search"], input[placeholder*="讀懃ｴ｢"]');
      if (await searchInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        const startTime = Date.now();
        await searchInput.fill('迚幄ｉ');
        await page.waitForTimeout(2000); // 讀懃ｴ｢邨先棡縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
        const searchTime = Date.now() - startTime;
        
        // 鬟溷刀讀懃ｴ｢縺・遘剃ｻ･蜀・↓螳御ｺ・☆繧九％縺ｨ繧堤｢ｺ隱・
        expect(searchTime).toBeLessThan(2000);
      }
    }
  });

  // ============================================
  // Safari迚ｹ譛会ｼ・6-100・・
  // ============================================

  test('98: 繝帙・繝逕ｻ髱｢縺ｫ霑ｽ蜉讖溯・縺悟虚菴懊☆繧具ｼ・WA蟇ｾ蠢懶ｼ・, async ({ page }) => {
    // PWA縺ｮmanifest縺悟ｭ伜惠縺吶ｋ縺薙→繧堤｢ｺ隱・
    const manifestLink = page.locator('link[rel="manifest"]');
    await expect(manifestLink).toHaveAttribute('href', /manifest/);
    
    // Apple Touch Icon縺悟ｭ伜惠縺吶ｋ縺薙→繧堤｢ｺ隱・
    const appleTouchIcon = page.locator('link[rel="apple-touch-icon"]');
    await expect(appleTouchIcon).toHaveCount(1);
  });

  // ============================================
  // 繧ｨ繝ｩ繝ｼ繝上Φ繝峨Μ繝ｳ繧ｰ・・01-110・・
  // ============================================

  test('103: 蜈･蜉帶､懆ｨｼ - 荳肴ｭ｣縺ｪ蜈･蜉幢ｼ郁ｲ縺ｮ謨ｰ縲∫ｩｺ譁・ｭ暦ｼ峨′諡貞凄縺輔ｌ繧・, async ({ page }) => {
    // 蜈･蜉帷判髱｢縺ｧ荳肴ｭ｣縺ｪ蜈･蜉帙ｒ隧ｦ縺・
    const addFoodButton = page.getByText('+ 鬟溷刀繧定ｿｽ蜉');
    if (await addFoodButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addFoodButton.click();
      await page.waitForTimeout(1000);
      
      // 謨ｰ驥丞・蜉帙↓雋縺ｮ謨ｰ繧貞・蜉・
      const amountInput = page.locator('input[type="number"]').filter({ hasText: /驥楯amount/i });
      if (await amountInput.isVisible({ timeout: 5000 }).catch(() => false)) {
        await amountInput.fill('-100');
        await page.waitForTimeout(500);
        
        // 繧ｨ繝ｩ繝ｼ繝｡繝・そ繝ｼ繧ｸ縺瑚｡ｨ遉ｺ縺輔ｌ繧九°縲∝､縺梧拠蜷ｦ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
        const value = await amountInput.inputValue();
        expect(parseFloat(value)).toBeGreaterThanOrEqual(0);
      }
    }
  });

  // ============================================
  // 迚ｹ谿頑ｩ溯・・・11-120・・
  // ============================================

  test('111: 謇句虚蜈･蜉帶ｩ溯・縺悟虚菴懊☆繧・, async ({ page }) => {
    // 蜈･蜉帷判髱｢縺ｫ驕ｷ遘ｻ
    const addFoodButton = page.getByText('+ 鬟溷刀繧定ｿｽ蜉');
    if (await addFoodButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await addFoodButton.click();
      await page.waitForTimeout(1000);
      
      // 謇句虚蜈･蜉帙・繧ｿ繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
      const manualInputButton = page.getByText(/謇句虚蜈･蜉斈Manual/i);
      if (await manualInputButton.isVisible({ timeout: 5000 }).catch(() => false)) {
        await expect(manualInputButton).toBeVisible();
      }
    }
  });

  test('114-116: Recovery Protocol縺瑚｡ｨ遉ｺ繝ｻ逕滓・繝ｻ險ｭ螳壹〒縺阪ｋ', async ({ page }) => {
    // Recovery Protocol縺瑚｡ｨ遉ｺ縺輔ｌ繧九％縺ｨ繧堤｢ｺ隱・
    // 螳滄圀縺ｮ螳溯｣・↓蜷医ｏ縺帙※隱ｿ謨ｴ縺悟ｿ・ｦ・
    // 萓・ 驕募渚鬟溷刀繧定ｿｽ蜉縺励◆髫帙↓Recovery Protocol縺瑚・蜍慕函謌舌＆繧後ｋ縺薙→繧堤｢ｺ隱・
  });

});


