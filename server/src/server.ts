import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import productsRouter from './routes/products';
import Product from './models/Product';

dotenv.config();

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
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tea-shop')
.then(async () => {
  console.log('MongoDBに接続しました');
  // 接続成功後に商品データの件数を確認
  try {
    const count = await Product.countDocuments();
    console.log('商品データ件数:', count);
  } catch (err) {
    console.error('商品データ件数取得エラー:', err);
  }
})
.catch((error: Error) => {
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
app.use('/api/products', productsRouter);

// エラーハンドリング
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('サーバーエラー:', err.stack);
  res.status(500).json({ error: 'サーバーエラーが発生しました' });
});

const PORT = Number(process.env.PORT) || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`サーバーが起動しました: http://0.0.0.0:${PORT}`);
}); 