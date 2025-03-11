const express = require('express');
const router = express.Router();
const stripe = require('../config/stripe');
const auth = require('../middleware/auth');

/**
 * 支払いインテントを作成する
 */
router.post('/create-payment-intent', auth, async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // 金額をセント単位に変換
      currency: 'jpy',
      metadata: {
        userId: req.user.id,
      },
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('支払いインテント作成エラー:', error);
    res.status(500).json({ error: '支払い処理に失敗しました' });
  }
});

/**
 * StripeのWebhookを処理する
 */
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook署名検証エラー:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // イベントの種類に応じて処理を分岐
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // ここで注文のステータスを更新する処理を実装
      console.log('支払い成功:', paymentIntent.id);
      break;
    case 'payment_intent.payment_failed':
      console.log('支払い失敗:', event.data.object.id);
      break;
    default:
      console.log(`未処理のイベントタイプ: ${event.type}`);
  }

  res.json({ received: true });
});

module.exports = router; 