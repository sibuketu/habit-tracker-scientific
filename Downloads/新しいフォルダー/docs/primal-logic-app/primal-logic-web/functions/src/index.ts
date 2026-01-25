import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Stripe from 'stripe';

// Firebase Admin蛻晄悄蛹・if (!admin.apps.length) {
  admin.initializeApp();
}

const db = admin.firestore();

// Helper to get Stripe instance (Lazy Initialization)
const getStripe = () => {
  // 1. Try process.env (Standard)
  let key = process.env.STRIPE_SECRET_KEY;

  // 2. Try Firebase Config (Legacy/CLI: firebase functions:config:set stripe.secret_key="...")
  if (!key) {
    try {
      key = functions.config().stripe?.secret_key;
    } catch (e) {
      // Ignore config error in local/test env
      console.log('No functions.config() available');
    }
  }

  if (!key) {
    console.warn('STRIPE_SECRET_KEY is not set');
    // Return a dummy instance for analysis/build time safety
    return new Stripe('dummy_key_for_analysis', { apiVersion: '2025-02-24.acacia' });
  }
  return new Stripe(key, {
    apiVersion: '2025-02-24.acacia',
  });
};

/**
 * 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ逕ｨCheckout Session菴懈・
 * PaywallScreen縺九ｉ蜻ｼ縺ｳ蜃ｺ縺輔ｌ繧・ */
export const createStripeCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // 隱崎ｨｼ繝√ぉ繝・け・亥諺蜷崎ｪ崎ｨｼ繧りｨｱ蜿ｯ・・    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { successUrl, cancelUrl, interval } = data;

    // 蠢・医ヱ繝ｩ繝｡繝ｼ繧ｿ繝√ぉ繝・け
    if (!successUrl || !cancelUrl || !interval) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required parameters: successUrl, cancelUrl, interval'
      );
    }

    // 萓｡譬ｼID蜿門ｾ・    const priceId =
      interval === 'month'
        ? process.env.STRIPE_PRICE_ID_MONTHLY
        : process.env.STRIPE_PRICE_ID_YEARLY;

    if (!priceId) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        `Stripe price ID not configured for ${interval} plan`
      );
    }

    const userId = context.auth.uid;

    try {
      // Stripe Checkout Session菴懈・
      const session = await getStripe().checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        subscription_data: {
          trial_period_days: 7,
          metadata: {
            userId,
          },
        },
        customer_email: context.auth.token.email || undefined,
        success_url: successUrl,
        cancel_url: cancelUrl,
        metadata: {
          userId,
          interval,
        },
      });

      return { url: session.url };
    } catch (error: any) {
      console.error('Stripe Checkout Session creation error:', error);
      throw new functions.https.HttpsError(
        'internal',
        `Failed to create checkout session: ${error.message}`
      );
    }
  }
);

/**
 * 繝ｯ繝ｳ繧ｿ繧､繝豎ｺ貂育畑Checkout Session菴懈・
 * ShopScreen / GiftScreen縺九ｉ蜻ｼ縺ｳ蜃ｺ縺輔ｌ繧・ */
export const createCheckoutSession = functions.https.onCall(
  async (data, context) => {
    // 隱崎ｨｼ繝√ぉ繝・け・亥諺蜷崎ｪ崎ｨｼ繧りｨｱ蜿ｯ・・    if (!context.auth) {
      throw new functions.https.HttpsError(
        'unauthenticated',
        'User must be authenticated'
      );
    }

    const { amount, currency, metadata, successUrl, cancelUrl } = data;

    // 蠢・医ヱ繝ｩ繝｡繝ｼ繧ｿ繝√ぉ繝・け
    if (!amount || !currency) {
      throw new functions.https.HttpsError(
        'invalid-argument',
        'Missing required parameters: amount, currency'
      );
    }

    const userId = context.auth.uid;

    try {
      // Stripe Checkout Session菴懈・・医Ρ繝ｳ繧ｿ繧､繝豎ｺ貂茨ｼ・      const session = await getStripe().checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: currency.toLowerCase(),
              product_data: {
                name: metadata?.itemName || 'CarnivOS Purchase',
              },
              unit_amount: amount,
            },
            quantity: 1,
          },
        ],
        customer_email: context.auth.token.email || undefined,
        success_url: successUrl || `${process.env.APP_URL || ''}/?payment_success=true`,
        cancel_url: cancelUrl || `${process.env.APP_URL || ''}/?payment_cancel=true`,
        metadata: {
          userId,
          ...metadata,
        },
      });

      return { sessionId: session.id, url: session.url };
    } catch (error: any) {
      console.error('Stripe Checkout Session creation error:', error);
      throw new functions.https.HttpsError(
        'internal',
        `Failed to create checkout session: ${error.message}`
      );
    }
  }
);

/**
 * Stripe Webhook蜃ｦ逅・ * 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ迥ｶ諷九・蜷梧悄
 */
export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];

  if (!sig) {
    res.status(400).send('Missing stripe-signature header');
    return;
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    res.status(500).send('Webhook secret not configured');
    return;
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(
      req.body,
      sig,
      webhookSecret
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    // 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ髢｢騾｣縺ｮ繧､繝吶Φ繝医ｒ蜃ｦ逅・    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.metadata?.userId;

      if (userId && session.mode === 'subscription') {
        const subscriptionId = session.subscription as string;

        // Firestore縺ｫ繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ諠・ｱ繧剃ｿ晏ｭ・        await db.collection('subscriptions').doc(userId).set(
          {
            subscriptionId,
            status: 'active',
            userId,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
    }

    // 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ譖ｴ譁ｰ繧､繝吶Φ繝・    if (event.type === 'customer.subscription.updated') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await db.collection('subscriptions').doc(userId).set(
          {
            subscriptionId: subscription.id,
            status: subscription.status,
            userId,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
    }

    // 繧ｵ繝悶せ繧ｯ繝ｪ繝励す繝ｧ繝ｳ蜑企勁繧､繝吶Φ繝・    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const userId = subscription.metadata?.userId;

      if (userId) {
        await db.collection('subscriptions').doc(userId).set(
          {
            subscriptionId: subscription.id,
            status: 'canceled',
            userId,
            updatedAt: admin.firestore.FieldValue.serverTimestamp(),
          },
          { merge: true }
        );
      }
    }

    res.json({ received: true });
  } catch (error: any) {
    console.error('Webhook processing error:', error);
    res.status(500).send(`Webhook processing error: ${error.message}`);
  }
});

