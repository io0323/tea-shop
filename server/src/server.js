const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ミドルウェアの設定
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3005'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

// データベース接続
console.log('MongoDB接続開始:', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDBに接続しました');
  // 接続成功後に商品データの件数を確認
  const Product = require('./models/Product');
  Product.countDocuments()
    .then(count => console.log('商品データ件数:', count))
    .catch(err => console.error('商品データ件数取得エラー:', err));
})
.catch((error) => {
  console.error('MongoDB接続エラー:', error);
  process.exit(1);
});

// ルートパスのハンドラー
app.get('/', (req, res) => {
  res.json({
    message: 'Tea Shop API',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      productsById: '/api/products/:id'
    }
  });
});

// ルートの設定
const productsRouter = require('./routes/products');
// const paymentRouter = require('./routes/payment'); // 一時的に無効化

app.use('/api/products', productsRouter);
// app.use('/api/payment', paymentRouter); // 一時的に無効化

// エラーハンドリング
app.use((err, req, res, next) => {
  console.error('サーバーエラー:', err.stack);
  res.status(500).json({ error: 'サーバーエラーが発生しました' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`サーバーが起動しました: http://0.0.0.0:${PORT}`);
}); 