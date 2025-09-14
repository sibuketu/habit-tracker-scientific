import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { amount, message, paymentMethod, currency = 'jpy' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: 'Invalid amount' });
    }

    // 寄付用の顧客を作成（匿名）
    const customer = await stripe.customers.create({
      description: 'Gift Donation Customer',
      metadata: {
        type: 'donation',
        message: message || '',
      },
    });

    // Checkout セッションを作成
    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      payment_method_types: paymentMethod === 'apple_pay' ? ['card', 'apple_pay'] : ['card'],
      line_items: [
        {
          price_data: {
            currency: currency,
            product_data: {
              name: 'Gift Donation - 習慣チェーンアプリ開発支援',
              description: 'アプリの開発・改善を支援する寄付',
              images: [], // 必要に応じて画像を追加
            },
            unit_amount: amount, // 金額はセント単位（JPYの場合は円単位）
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.origin}/donation-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/donation-cancel`,
      metadata: {
        type: 'donation',
        amount: amount.toString(),
        message: message || '',
        payment_method: paymentMethod,
      },
      custom_fields: [
        {
          key: 'donation_message',
          label: {
            type: 'custom',
            custom: '応援メッセージ（任意）',
          },
          type: 'text',
          optional: true,
        },
      ],
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating donation session:', error);
    res.status(500).json({ error: 'Failed to create donation session' });
  }
}
