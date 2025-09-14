import { loadStripe, Stripe } from '@stripe/stripe-js';
import { loadStripeOffline, createMockCheckoutSession, createMockPortalSession } from './stripe-offline';

// Stripeの公開キー（環境変数から取得）
const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '';

let stripePromise: Promise<Stripe | null>;

// オフライン検出
const isOnline = () => {
  return typeof navigator !== 'undefined' && navigator.onLine;
};

export const getStripe = async () => {
  if (!stripePromise) {
    if (isOnline()) {
      try {
        stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
      } catch (error) {
        console.warn('Failed to load Stripe, falling back to offline mode:', error);
        return loadStripeOffline(STRIPE_PUBLISHABLE_KEY);
      }
    } else {
      console.log('Offline mode: Using mock Stripe');
      return loadStripeOffline(STRIPE_PUBLISHABLE_KEY);
    }
  }
  return stripePromise;
};

// サブスクリプション価格ID（環境変数から取得）
export const SUBSCRIPTION_PRICES = {
  monthly: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_PRICE_ID || '',
  yearly: process.env.NEXT_PUBLIC_STRIPE_YEARLY_PRICE_ID || ''
};

// サブスクリプション作成
export async function createSubscription(priceId: string, customerEmail?: string) {
  const stripe = await getStripe();
  
  if (!stripe) {
    throw new Error('Stripe failed to initialize');
  }

  // オフライン時はモック処理
  if (!isOnline()) {
    console.log('Offline mode: Using mock subscription');
    await stripe.redirectToCheckout({
      sessionId: `mock_subscription_${Date.now()}`,
    });
    return;
  }

  try {
    const response = await fetch('/api/create-subscription', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        priceId,
        customerEmail,
      }),
    });

    const session = await response.json();

    if (session.error) {
      throw new Error(session.error.message);
    }

    // Stripe Checkoutにリダイレクト
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      throw new Error(result.error.message || 'Failed to redirect to checkout');
    }
  } catch (error) {
    console.warn('Online subscription failed, using mock:', error);
    // オフラインモードにフォールバック
    await stripe.redirectToCheckout({
      sessionId: `mock_subscription_${Date.now()}`,
    });
  }
}

// サブスクリプション管理
export async function redirectToCustomerPortal() {
  // オフライン時はモック処理
  if (!isOnline()) {
    console.log('Offline mode: Using mock customer portal');
    alert('サブスクリプション管理画面（モック）\n実際の環境ではStripe Customer Portalにリダイレクトされます。');
    return;
  }

  try {
    const response = await fetch('/api/create-portal-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const { url } = await response.json();
    window.location.href = url;
  } catch (error) {
    console.warn('Online portal failed, using mock:', error);
    alert('サブスクリプション管理画面（モック）\n実際の環境ではStripe Customer Portalにリダイレクトされます。');
  }
}
