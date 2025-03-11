import mongoose from 'mongoose';
import Product from './models/Product';
import dotenv from 'dotenv';

dotenv.config();

const categories = ['緑茶', '紅茶', '烏龍茶', '抹茶', 'その他'];
const teaNames = [
  '玉露', '煎茶', 'ほうじ茶', '玄米茶', '抹茶', '紅茶', '烏龍茶',
  'プーアル茶', 'ジャスミン茶', 'ルイボスティー', 'ハーブティー',
  '玄米茶', '番茶', '深蒸し茶', 'かぶせ茶', '玉露', '抹茶',
  'アールグレイ', 'ダージリン', 'アッサム', 'セイロン', 'キーマン',
  '鉄観音', '東方美人', '水仙', '鳳凰単叢', 'プーアル茶',
  'ジャスミン茶', 'ローズティー', 'カモミール', 'ペパーミント',
  'レモングラス', 'ハイビスカス', 'ルイボス', 'マテ茶', '緑茶',
  '紅茶', '烏龍茶', '抹茶', 'その他'
];

const generateProducts = () => {
  const products = [];
  for (let i = 0; i < 100; i++) {
    const category = categories[Math.floor(Math.random() * categories.length)];
    const name = teaNames[Math.floor(Math.random() * teaNames.length)];
    const price = Math.floor(Math.random() * 5000) + 500;
    const rating = (Math.random() * 2 + 3).toFixed(1);
    const reviews = [];
    const reviewCount = Math.floor(Math.random() * 50);

    for (let j = 0; j < reviewCount; j++) {
      reviews.push({
        user: `ユーザー${j + 1}`,
        rating: Math.floor(Math.random() * 2 + 4),
        comment: 'とても美味しいお茶でした。',
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      });
    }

    products.push({
      name: `${name} ${i + 1}`,
      description: `${category}の${name}です。高品質な茶葉を使用し、丁寧に製造しています。`,
      price: price,
      category: category,
      image: `/images/tea${Math.floor(Math.random() * 5) + 1}.jpg`,
      stock: Math.floor(Math.random() * 100) + 1,
      rating: parseFloat(rating),
      reviews: reviews,
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000),
    });
  }
  return products;
};

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tea-shop');
    console.log('MongoDBに接続しました');

    // 既存のデータを削除
    await Product.deleteMany({});
    console.log('既存のデータを削除しました');

    // 新しいデータを挿入
    const products = generateProducts();
    await Product.insertMany(products);
    console.log(`${products.length}件の商品データを挿入しました`);

    // データベース接続を閉じる
    await mongoose.connection.close();
    console.log('データベース接続を閉じました');
  } catch (error) {
    console.error('シードエラー:', error);
    process.exit(1);
  }
};

seedDatabase(); 