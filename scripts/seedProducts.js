require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/Product');

const categories = ['緑茶', '紅茶', '烏龍茶', '抹茶', '日本茶', 'その他'];
const teaNames = [
  '玉露', '煎茶', 'ほうじ茶', '玄米茶', 'アールグレイ',
  'ダージリン', 'アッサム', 'ウーロン茶', '鉄観音', 'プーアル茶',
  'カモミール', 'ペパーミント', 'ルイボス', 'ローズヒップ', 'レモングラス'
];

const generateProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDBに接続しました');
    
    // 既存の商品を削除
    await Product.deleteMany({});
    console.log('既存の商品データを削除しました');

    const products = [];
    for (let i = 0; i < 100; i++) {
      const category = categories[Math.floor(Math.random() * categories.length)];
      const baseName = teaNames[Math.floor(Math.random() * teaNames.length)];
      const product = {
        name: `${baseName} ${i + 1}`,
        description: `${category}の${baseName}です。高品質な茶葉を使用し、丁寧に製造されています。`,
        price: Math.floor(Math.random() * 5000) + 1000,
        category: category,
        image: `/images/tea-${Math.floor(Math.random() * 5) + 1}.jpg`,
        stock: Math.floor(Math.random() * 100) + 10,
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviews: []
      };
      products.push(product);
    }

    await Product.insertMany(products);
    console.log('100件の商品データを生成しました');

    await mongoose.disconnect();
    console.log('MongoDBとの接続を切断しました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
  }
};

generateProducts(); 