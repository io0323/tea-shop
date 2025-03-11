import express from 'express';
import Product from '../models/Product';

const router = express.Router();

/**
 * 商品一覧を取得する
 */
router.get('/', async (req, res) => {
  try {
    console.log('商品一覧取得リクエスト受信');
    const products = await Product.find();
    console.log('商品一覧取得成功:', products.length, '件');
    res.json(products);
  } catch (error) {
    console.error('商品一覧取得エラー:', error);
    res.status(500).json({ error: '商品一覧の取得に失敗しました' });
  }
});

/**
 * 商品詳細を取得する
 */
router.get('/:id', async (req, res) => {
  try {
    console.log('商品詳細取得リクエスト受信:', req.params.id);
    const product = await Product.findById(req.params.id);
    if (!product) {
      console.log('商品が見つかりません:', req.params.id);
      return res.status(404).json({ error: '商品が見つかりません' });
    }
    console.log('商品詳細取得成功:', product.name);
    res.json(product);
  } catch (error) {
    console.error('商品詳細取得エラー:', error);
    res.status(500).json({ error: '商品詳細の取得に失敗しました' });
  }
});

export default router; 