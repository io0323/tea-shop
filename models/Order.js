const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    price: {
      type: Number,
      required: true
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  shippingAddress: {
    street: String,
    city: String,
    postalCode: String,
    country: String
  },
  paymentStatus: {
    type: String,
    enum: ['未払い', '支払い済み', 'キャンセル'],
    default: '未払い'
  },
  paymentMethod: {
    type: String,
    required: true
  },
  stripePaymentId: String,
  orderStatus: {
    type: String,
    enum: ['処理中', '発送済み', '配送中', '完了', 'キャンセル'],
    default: '処理中'
  },
  trackingNumber: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema); 