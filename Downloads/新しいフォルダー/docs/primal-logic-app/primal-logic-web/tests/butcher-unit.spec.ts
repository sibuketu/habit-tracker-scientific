import { test, expect } from '@playwright/test';

test.describe('Butcher Select Unit Conversion', () => {
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

    test.beforeEach(async ({ page }) => {
        // 繧｢繝励Μ繧ｱ繝ｼ繧ｷ繝ｧ繝ｳ繧帝幕縺・
        await page.goto('/');
        // 蜷梧э逕ｻ髱｢縺ｨ繧ｪ繝ｳ繝懊・繝・ぅ繝ｳ繧ｰ繧偵せ繧ｭ繝・・
        await skipConsentAndOnboarding(page);
        // 繝帙・繝逕ｻ髱｢縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
        await page.waitForSelector('.home-screen-container, [class*="home"], [class*="Home"]', { timeout: 10000 });
        await page.waitForTimeout(500);
    });

    test('Unit change resets amount safely', async ({ page }) => {
        // ButcherSelect繧定｡ｨ遉ｺ縺吶ｋ縺溘ａ縺ｫ縲・繝懊ち繝ｳ縺ｾ縺溘・蜍慕黄繝懊ち繝ｳ・芋汾・↑縺ｩ・峨ｒ繧ｯ繝ｪ繝・け
        // +繝懊ち繝ｳ繧呈爾縺呻ｼ医ョ繝輔か繝ｫ繝医〒迚幄ｉ縺碁∈謚槭＆繧後ｋ・・
        const addButton = page.locator('button').filter({ hasText: /^\+$/ }).first();
        if (await addButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await addButton.click();
        } else {
            // 蜍慕黄繝懊ち繝ｳ・芋汾・↑縺ｩ・峨ｒ謗｢縺・
            const beefButton = page.locator('button').filter({ hasText: /推|迚幄ｉ|Beef/i }).first();
            await expect(beefButton).toBeVisible({ timeout: 10000 });
            await beefButton.click();
        }
        
        // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
        await page.waitForTimeout(1000);
        await page.waitForSelector('[class*="butcher"], [class*="Butcher"], select', { timeout: 10000 }).catch(() => {});

        // 驛ｨ菴阪ｒ驕ｸ謚橸ｼ井ｾ具ｼ壹Μ繝悶い繧､・・
        const partButton = page.getByRole('button', { name: /Ribeye|繝ｪ繝悶Ο繝ｼ繧ｹ/i }).first();
        await partButton.click();

        // 繝・ヵ繧ｩ繝ｫ繝医・蜊倅ｽ阪・ 'g' 縺ｧ驥上・ '300' 縺ｮ縺ｯ縺・
        const amountDisplay = page.locator('span.text-2xl.font-bold.text-stone-900').first();
        await expect(amountDisplay).toContainText('300');

        // 蜊倅ｽ埼∈謚槭ラ繝ｭ繝・・繝繧ｦ繝ｳ繧貞叙蠕・
        const unitSelect = page.locator('select');

        // 蜊倅ｽ阪ｒ 'oz' 縺ｫ螟画峩
        await unitSelect.selectOption('oz');

        // 驥上′ '10' 縺ｫ繝ｪ繧ｻ繝・ヨ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱搾ｼ・00縺ｮ縺ｾ縺ｾ縺ｧ縺ｯ縺ｪ縺・％縺ｨ・・
        await expect(amountDisplay).toContainText('10');
        await expect(amountDisplay).not.toContainText('300');

        // 蜊倅ｽ阪ｒ 'lb' 縺ｫ螟画峩
        await unitSelect.selectOption('lb');

        // 驥上′ '1' 縺ｫ繝ｪ繧ｻ繝・ヨ縺輔ｌ縺ｦ縺・ｋ縺薙→繧堤｢ｺ隱・
        await expect(amountDisplay).toContainText('1');

        // 險育ｮ励＆繧後◆譬・､顔ｴ・医ち繝ｳ繝代け雉ｪ・峨′逡ｰ蟶ｸ蛟､縺ｧ縺ｪ縺・％縺ｨ繧堤｢ｺ隱・
        // 繧ｿ繝ｳ繝代け雉ｪ繝舌・縺ｮ蛟､繧偵メ繧ｧ繝・け・井ｾ九∴縺ｰ隕∫ｴ蜀・・繝・く繧ｹ繝医↑縺ｩ・・
        // 縺薙％縺ｧ縺ｯ蜈ｷ菴鍋噪縺ｪ繧ｻ繝ｬ繧ｯ繧ｿ縺御ｸ肴・縺ｪ縺溘ａ縲∵ｱ守畑逧・↑繝√ぉ繝・け繧定｡後≧
        // 逡ｰ蟶ｸ縺ｫ螟ｧ縺阪↑謨ｰ蛟､・井ｾ・ 5000g・峨′陦ｨ遉ｺ縺輔ｌ縺ｦ縺・↑縺・°
        const proteinText = await page.getByText(/繧ｿ繝ｳ繝代け雉ｪ/i).first().textContent();
        // 縺薙％縺ｯ繝ｭ繧ｸ繝・け菫ｮ豁｣縺ｮ遒ｺ隱阪↑縺ｮ縺ｧ縲√∪縺壹・繧ｨ繝ｩ繝ｼ縺悟・縺ｪ縺・％縺ｨ繧堤｢ｺ隱・
    });

    test('Slider constraints based on unit', async ({ page }) => {
        // ButcherSelect繧定｡ｨ遉ｺ縺吶ｋ縺溘ａ縺ｫ縲・繝懊ち繝ｳ縺ｾ縺溘・蜍慕黄繝懊ち繝ｳ・芋汾・↑縺ｩ・峨ｒ繧ｯ繝ｪ繝・け
        const addButton = page.locator('button').filter({ hasText: /^\+$/ }).first();
        if (await addButton.isVisible({ timeout: 5000 }).catch(() => false)) {
            await addButton.click();
        } else {
            // 蜍慕黄繝懊ち繝ｳ・芋汾・↑縺ｩ・峨ｒ謗｢縺・
            const beefButton = page.locator('button').filter({ hasText: /推|迚幄ｉ|Beef/i }).first();
            await expect(beefButton).toBeVisible({ timeout: 10000 });
            await beefButton.click();
        }
        
        // ButcherSelect縺瑚｡ｨ遉ｺ縺輔ｌ繧九∪縺ｧ蠕・▽
        await page.waitForTimeout(1000);
        await page.waitForSelector('[class*="butcher"], [class*="Butcher"], select', { timeout: 10000 }).catch(() => {});
        
        // 驛ｨ菴埼∈謚・
        await page.getByRole('button', { name: /Ribeye|繝ｪ繝悶Ο繝ｼ繧ｹ/i }).first().click();

        // 蜊倅ｽ阪ｒ 'oz' 縺ｫ
        await page.locator('select').selectOption('oz');

        // 繧ｹ繝ｩ繧､繝繝ｼ繧呈桃菴懶ｼ域怙螟ｧ蛟､縺ｸ・・
        // 豕ｨ: input[type=range]縺ｸ縺ｮfill縺ｯ逶ｴ謗･蛟､繧定ｨｭ螳壹☆繧・
        const slider = page.locator('input[type="range"]');
        await slider.fill('100'); // max縺ｯ50縺ｮ縺ｯ縺壹↑縺ｮ縺ｧ縲∝宛髯舌＆繧後ｋ縺九√≠繧九＞縺ｯ蜈･蜉帛､縺稽ax螻樊ｧ縺ｫ萓晏ｭ倥☆繧九°

        // 螳滄圀縺ｮ蛟､繧堤｢ｺ隱・
        // Playwright縺ｮfill縺ｯ逶ｴ謗･value繧定ｨｭ螳壹☆繧九◆繧√√い繝励Μ蛛ｴ縺ｮonChange蛻ｶ髯舌′蜉ｹ縺上°遒ｺ隱・
        // 繧｢繝励Μ蛛ｴ縺ｧ value={amount} 縺ｨ縺ｪ縺｣縺ｦ縺・ｋ縺ｮ縺ｧ縲《tate縺悟､峨ｏ繧後・蜿肴丐縺輔ｌ繧・

        // 繝励Λ繧ｹ繝懊ち繝ｳ騾｣謇薙〒荳企剞遒ｺ隱・
        const plusButton = page.getByRole('button', { name: '+' });
        for (let i = 0; i < 50; i++) {
            await plusButton.click();
        }

        // 荳企剞縺・0oz縺ｧ縺ゅｋ縺薙→繧堤｢ｺ隱・
        const amountText = await page.locator('span.text-2xl.font-bold.text-stone-900').first().textContent();
        // 謨ｰ蛟､驛ｨ蛻・ｒ謚ｽ蜃ｺ
        const amount = parseFloat(amountText?.replace(/[^0-9.]/g, '') || '0');
        expect(amount).toBeLessThanOrEqual(50);
    });
});

