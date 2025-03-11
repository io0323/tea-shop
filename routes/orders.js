const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const auth = require('../middleware/auth');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// 注文の作成
router.post('/', auth, async (req, res) => {
  try {
    const { items, shippingAddress } = req.body;

    // 商品の在庫チェックと合計金額の計算
    let totalAmount = 0;
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({
          message: `商品が見つかりません: ${item.name}`,
        });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `在庫が不足しています: ${item.name}`,
        });
      }
      totalAmount += product.price * item.quantity;
    }

    // Stripeの支払いインテントを作成
    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalAmount * 100, // 金額をセント単位に変換
      currency: 'jpy',
      metadata: {
        userId: req.user.userId,
      },
    });

    // 注文の作成
    const order = new Order({
      user: req.user.userId,
      items,
      totalAmount,
      shippingAddress,
      paymentStatus: '未払い',
      paymentMethod: 'stripe',
      stripePaymentId: paymentIntent.id,
    });

    await order.save();

    res.status(201).json({
      order,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error('注文作成エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// 注文の支払い完了処理
router.post('/:id/complete', auth, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: '注文が見つかりません' });
    }

    // 注文の支払い状態を更新
    order.paymentStatus = '支払い済み';
    order.orderStatus = '処理中';

    // 商品の在庫を更新
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    await order.save();
    res.json(order);
  } catch (error) {
    console.error('支払い完了処理エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// 注文一覧の取得
router.get('/', auth, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error('注文一覧取得エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// 注文詳細の取得
router.get('/:id', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!order) {
      return res.status(404).json({ message: '注文が見つかりません' });
    }
    res.json(order);
  } catch (error) {
    console.error('注文詳細取得エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// 注文のキャンセル
router.post('/:id/cancel', auth, async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user.userId,
    });
    if (!order) {
      return res.status(404).json({ message: '注文が見つかりません' });
    }

    if (order.orderStatus === '完了' || order.orderStatus === 'キャンセル') {
      return res.status(400).json({
        message: 'この注文はキャンセルできません',
      });
    }

    order.orderStatus = 'キャンセル';
    await order.save();

    res.json(order);
  } catch (error) {
    console.error('注文キャンセルエラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

// StripeのWebhook処理
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const order = await Order.findOne({
      stripePaymentId: paymentIntent.id,
    });

    if (order) {
      order.paymentStatus = '支払い済み';
      order.orderStatus = '処理中';
      await order.save();
    }
  }

  res.json({ received: true });
});

module.exports = router; 