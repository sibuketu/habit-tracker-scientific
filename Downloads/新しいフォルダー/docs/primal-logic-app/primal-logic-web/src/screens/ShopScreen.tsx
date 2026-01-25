/**
 * CarnivoreOS - Shop Screen
 *
 * 繧ｷ繝ｧ繝・・逕ｻ髱｢: 繝峨ャ繝育ｵｵUI繧・◎縺ｮ莉悶・繧ｫ繧ｹ繧ｿ繝槭う繧ｺ繧｢繧､繝・Β繧定ｳｼ蜈･
 */

import { useState, useEffect } from 'react';
import { useSettings } from '../hooks/useSettings';
import { useTranslation } from '../utils/i18n';
import { logError } from '../utils/errorHandler';
import { httpsCallable } from 'firebase/functions';
import { functions, auth } from '../lib/firebaseClient';
import { signInAnonymously } from 'firebase/auth';
import './ShopScreen.css';

interface ShopScreenProps {
  onBack: () => void;
}

interface ShopItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: string;
  category: 'ui' | 'theme' | 'other';
  isPurchased: boolean;
  isDebugFree: boolean; // 繝・ヰ繝・げ繝｢繝ｼ繝峨〒辟｡譁・}

export default function ShopScreen({ onBack }: ShopScreenProps) {
  const { t } = useTranslation();
  const { debugMode } = useSettings();
  const [shopItems, setShopItems] = useState<ShopItem[]>([
    {
      id: 'dot-ui',
      name: t('shop.pixelArtUI'),
      description: t('shop.pixelArtUIDescription'),
      price: 980,
      icon: '耳',
      category: 'ui',
      isPurchased: false,
      isDebugFree: true,
    },
    // 蟆・擂逧・↓莉悶・繧｢繧､繝・Β繧定ｿｽ蜉蜿ｯ閭ｽ
  ]);
  const [isDotUIEnabled, setIsDotUIEnabled] = useState(() => {
    return localStorage.getItem('primal_logic_dot_ui_enabled') === 'true';
  });

  // 雉ｼ蜈･迥ｶ諷九ｒ隱ｭ縺ｿ霎ｼ縺ｿ
  useEffect(() => {
    const purchasedItems = JSON.parse(localStorage.getItem('primal_logic_shop_purchased') || '[]');
    setShopItems((items) =>
      items.map((item) => ({
        ...item,
        isPurchased: purchasedItems.includes(item.id),
      }))
    );
  }, []);

  // 繝峨ャ繝育ｵｵUI螟画峩繧､繝吶Φ繝医ｒ繝ｪ繝・せ繝ｳ
  useEffect(() => {
    const handleDotUIChange = () => {
      const enabled = localStorage.getItem('primal_logic_dot_ui_enabled') === 'true';
      setIsDotUIEnabled(enabled);
    };
    window.addEventListener('dotUIChanged', handleDotUIChange);
    return () => {
      window.removeEventListener('dotUIChanged', handleDotUIChange);
    };
  }, []);

  const handlePurchase = async (item: ShopItem) => {
    // 繝・ヰ繝・げ繝｢繝ｼ繝峨〒辟｡譁吶い繧､繝・Β縺ｮ蝣ｴ蜷・    if (debugMode && item.isDebugFree) {
      const purchasedItems = JSON.parse(
        localStorage.getItem('primal_logic_shop_purchased') || '[]'
      );
      if (!purchasedItems.includes(item.id)) {
        purchasedItems.push(item.id);
        localStorage.setItem('primal_logic_shop_purchased', JSON.stringify(purchasedItems));
        setShopItems((items) =>
          items.map((i) => (i.id === item.id ? { ...i, isPurchased: true } : i))
        );
        alert(t('shop.purchaseSuccess', { name: item.name }));
      }
      return;
    }

    // Stripe豎ｺ貂亥・逅・ｼ育腸蠅・､画焚縺瑚ｨｭ螳壹＆繧後※縺・ｋ蝣ｴ蜷医・縺ｿ螳溯｡鯉ｼ・    const stripeKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (stripeKey && typeof window !== 'undefined' && (window as any).Stripe) {
      try {
        // Firebase Auth・亥諺蜷崎ｪ崎ｨｼ・・        if (auth && !auth.currentUser) {
          await signInAnonymously(auth);
        }

        // Firebase Functions邨檎罰縺ｧStripe Checkout Session繧剃ｽ懈・
        if (functions) {
          const currentUrl = window.location.origin;
          const successUrl = `${currentUrl}/?payment_success=true&itemId=${item.id}`;
          const cancelUrl = `${currentUrl}/?payment_cancel=true`;

          const createCheckoutSession = httpsCallable(functions, 'createCheckoutSession');
          const result = await createCheckoutSession({
            amount: item.price,
            currency: 'jpy',
            metadata: {
              itemId: item.id,
              itemName: item.name,
            },
            successUrl,
            cancelUrl,
          });

          const data = result.data as { sessionId?: string; url?: string };

          if (data.url) {
            // Stripe Checkout縺ｫ繝ｪ繝繧､繝ｬ繧ｯ繝・            window.location.href = data.url;
            return;
          } else if (data.sessionId) {
            // sessionId縺瑚ｿ斐＆繧後◆蝣ｴ蜷医・Stripe.js縺ｧ繝ｪ繝繧､繝ｬ繧ｯ繝・            const stripe = (window as any).Stripe(stripeKey);
            await stripe.redirectToCheckout({ sessionId: data.sessionId });
            return;
          }
        }
      } catch (error) {
        logError(error, { action: 'handlePurchase', itemId: item.id });
        // Stripe豎ｺ貂医↓螟ｱ謨励＠縺溷ｴ蜷医・縲√Δ繝・け蜃ｦ逅・↓繝輔か繝ｼ繝ｫ繝舌ャ繧ｯ
      }
    }

    // Stripe豎ｺ貂医′蛻ｩ逕ｨ縺ｧ縺阪↑縺・ｴ蜷医√∪縺溘・螟ｱ謨励＠縺溷ｴ蜷医・繝｢繝・け蜃ｦ逅・    if (import.meta.env.DEV) {
      // 繝・ヰ繝・げ繝｢繝ｼ繝峨〒縺ｯ辟｡譁吶〒雉ｼ蜈･蜿ｯ閭ｽ
      const purchasedItems = JSON.parse(
        localStorage.getItem('primal_logic_shop_purchased') || '[]'
      );
      if (!purchasedItems.includes(item.id)) {
        purchasedItems.push(item.id);
        localStorage.setItem('primal_logic_shop_purchased', JSON.stringify(purchasedItems));
      }
      setShopItems((items) =>
        items.map((i) => (i.id === item.id ? { ...i, isPurchased: true } : i))
      );
      alert(t('shop.purchaseSuccessDebug').replace('{name}', item.name));
    } else {
      alert(t('shop.paymentPending'));
    }
  };

  const handleUse = (item: ShopItem) => {
    if (item.id === 'dot-ui') {
      // 繝峨ャ繝育ｵｵUI繧呈怏蜉ｹ蛹・      localStorage.setItem('primal_logic_dot_ui_enabled', 'true');
      setIsDotUIEnabled(true);
      window.dispatchEvent(new CustomEvent('dotUIChanged'));
      alert(t('shop.enablePixelArtUISuccess'));
      window.location.reload();
    }
  };

  const handleDisable = (item: ShopItem) => {
    if (item.id === 'dot-ui') {
      // 繝峨ャ繝育ｵｵUI繧堤┌蜉ｹ蛹・      localStorage.removeItem('primal_logic_dot_ui_enabled');
      setIsDotUIEnabled(false);
      window.dispatchEvent(new CustomEvent('dotUIChanged'));
      alert(t('shop.disablePixelArtUISuccess'));
      window.location.reload();
    }
  };

  return (
    <div className="shop-screen-container">
      <div className="shop-screen-content">
        <div className="screen-header">
          <button className="back-button" onClick={onBack} aria-label={t('common.backAriaLabel')}>
            竊・          </button>
          <h1 className="screen-header-title">寫・・{t('shop.title')}</h1>
        </div>

        {debugMode && (
          <div className="shop-debug-notice">
            <p>笞・・{t('shop.debugMode')}</p>
          </div>
        )}

        <div className="shop-items-section">
          <h2 className="shop-section-title">{t('shop.uiCustomization')}</h2>
          <div className="shop-items-list">
            {shopItems
              .filter((item) => item.category === 'ui')
              .map((item) => (
                <div key={item.id} className="shop-item-card">
                  <div className="shop-item-header">
                    <span className="shop-item-icon">{item.icon}</span>
                    <div className="shop-item-info">
                      <h3 className="shop-item-name">{item.name}</h3>
                      <p className="shop-item-description">{item.description}</p>
                    </div>
                  </div>
                  <div className="shop-item-footer">
                    {item.isPurchased ? (
                      <div className="shop-item-actions">
                        {item.id === 'dot-ui' && (
                          <>
                            {isDotUIEnabled ? (
                              <button
                                className="shop-item-disable-button"
                                onClick={() => handleDisable(item)}
                              >
                                {t('shop.disablePixelArtUI')}
                              </button>
                            ) : (
                              <button
                                className="shop-item-use-button"
                                onClick={() => handleUse(item)}
                              >
                                {t('shop.enablePixelArtUI')}
                              </button>
                            )}
                          </>
                        )}
                        <span className="shop-item-purchased-badge">笨・{t('shop.purchased')}</span>
                      </div>
                    ) : (
                      <div className="shop-item-purchase">
                        <span className="shop-item-price">
                          {debugMode && item.isDebugFree ? (
                            <span className="shop-item-price-free">{t('shop.freeDebugMode')}</span>
                          ) : (
                            `${t('gift.currency')}${item.price.toLocaleString()}`
                          )}
                        </span>
                        <button
                          className="shop-item-purchase-button"
                          onClick={() => handlePurchase(item)}
                        >
                          {t('shop.purchase')}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

