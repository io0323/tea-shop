const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./src/models/Product');

const app = express();
const PORT = process.env.PORT || 5001;

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// MongoDBへの接続
mongoose.connect('mongodb://localhost:27017/tea-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB接続成功'))
.catch((err) => console.error('MongoDB接続エラー:', err));

// 商品一覧を取得
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('商品データ取得エラー:', error);
    res.status(500).json({ message: '商品データの取得に失敗しました' });
  }
});

// 商品詳細を取得
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: '商品が見つかりません' });
    }
    res.json(product);
  } catch (error) {
    console.error('商品詳細取得エラー:', error);
    res.status(500).json({ message: '商品詳細の取得に失敗しました' });
  }
});

// サーバーの起動
app.listen(PORT, () => {
  console.log(`サーバーが起動しました: http://localhost:${PORT}`);
}); 