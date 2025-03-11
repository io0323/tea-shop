const mongoose = require('mongoose');
const Product = require('./models/Product');

mongoose.connect('mongodb://localhost:27017/tea-shop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB接続成功'))
.catch((err) => console.error('MongoDB接続エラー:', err));

const teaCategories = ['緑茶', '紅茶', '烏龍茶', '中国茶', 'ハーブティー', '和紅茶', '抹茶', 'ほうじ茶'];
const teaNames = {
  '緑茶': ['煎茶', '玉露', '深蒸し茶', '玉緑茶', '冠茶', '芽茶', '番茶'],
  '紅茶': ['アールグレイ', 'イングリッシュブレックファスト', 'ダージリン', 'アッサム', 'セイロン', 'キームン'],
  '烏龍茶': ['凍頂烏龍茶', '鉄観音', '東方美人', '水仙', '阿里山'],
  '中国茶': ['プーアル茶', '白茶', '黄茶', 'ジャスミン茶', '龍井茶'],
  'ハーブティー': ['カモミール', 'ペパーミント', 'ローズヒップ', 'ルイボス', 'レモングラス'],
  '和紅茶': ['べにふうき', 'べにほまれ', '山の紅茶', '和紅茶'],
  '抹茶': ['ceremonial grade', 'premium grade', 'culinary grade', '有機抹茶'],
  'ほうじ茶': ['特選ほうじ茶', '有機ほうじ茶', '玉ほうじ茶', '茎ほうじ茶']
};

const generateDescription = (name, category) => {
  const descriptions = [
    `最高級の${name}です。豊かな香りと深い味わいが特徴です。`,
    `厳選された${category}の中でも特に人気の高い${name}です。`,
    `伝統的な製法で作られた${name}。香り高く、まろやかな味わいです。`,
    `有機栽培の茶葉を使用した${name}。安心・安全な一品です。`,
    `贈り物にも最適な${name}。上品な香りと味わいが特徴です。`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

const generatePrice = (category) => {
  const basePrice = {
    '緑茶': 1000,
    '紅茶': 1200,
    '烏龍茶': 1500,
    '中国茶': 1800,
    'ハーブティー': 1000,
    '和紅茶': 1500,
    '抹茶': 2000,
    'ほうじ茶': 1000
  };
  const variance = 0.5; // 価格の変動幅（±50%）
  const base = basePrice[category] || 1000;
  return Math.round(base * (1 + (Math.random() * 2 - 1) * variance) / 100) * 100;
};

const generateProducts = (count) => {
  const products = [];
  for (let i = 0; i < count; i++) {
    const category = teaCategories[Math.floor(Math.random() * teaCategories.length)];
    const nameList = teaNames[category];
    const baseName = nameList[Math.floor(Math.random() * nameList.length)];
    const name = Math.random() < 0.3 ? `特選 ${baseName}` : baseName;
    
    products.push({
      name,
      description: generateDescription(name, category),
      price: generatePrice(category),
      imageUrl: `/images/${category.toLowerCase()}.jpg`,
      category,
      stock: Math.floor(Math.random() * 50) + 10,
      isNew: Math.random() < 0.1,
      isLimited: Math.random() < 0.15,
      isBestSeller: Math.random() < 0.2
    });
  }
  return products;
};

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log('既存の商品データを削除しました');

    const products = generateProducts(100);
    await Product.insertMany(products);
    console.log('100件の商品データを追加しました');

    mongoose.connection.close();
  } catch (error) {
    console.error('シードエラー:', error);
    mongoose.connection.close();
  }
};

seedProducts(); 