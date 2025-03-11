const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

/**
 * 商品一覧を取得する
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
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
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: '商品が見つかりません' });
    }
    res.json(product);
  } catch (error) {
    console.error('商品詳細取得エラー:', error);
    res.status(500).json({ error: '商品詳細の取得に失敗しました' });
  }
});

module.exports = router; 