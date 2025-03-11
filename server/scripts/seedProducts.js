const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const products = [
  {
    name: '上質な煎茶',
    description: '香り高く、まろやかな味わいの煎茶です。茶葉は厳選された新芽を使用し、丁寧に加工されています。',
    price: 1200,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 50,
    category: '緑茶',
    rating: 4.5,
    reviews: [],
  },
  {
    name: '有機栽培抹茶',
    description: '有機栽培された茶葉を使用した高級抹茶です。鮮やかな緑色と豊かな香りが特徴です。',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 30,
    category: '抹茶',
    rating: 4.8,
    reviews: [],
  },
  {
    name: '玄米茶',
    description: '玄米の香ばしさと緑茶の爽やかさが調和した玄米茶です。カフェインが少なく、お子様にも安心です。',
    price: 800,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 45,
    category: '緑茶',
    rating: 4.2,
    reviews: [],
  },
  {
    name: '紅茶 アールグレイ',
    description: 'ベルガモットの香りが特徴的なアールグレイティーです。優雅な香りと深い味わいをお楽しみください。',
    price: 1000,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 40,
    category: '紅茶',
    rating: 4.6,
    reviews: [],
  },
  {
    name: '烏龍茶 鉄観音',
    description: '中国福建省産の高級鉄観音です。芳醇な香りと深い味わいが特徴です。',
    price: 1300,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 35,
    category: '烏龍茶',
    rating: 4.7,
    reviews: [],
  },
  {
    name: 'ほうじ茶',
    description: '香ばしい香りが特徴的なほうじ茶です。カフェインが少なく、夜でも安心してお飲みいただけます。',
    price: 700,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 60,
    category: '緑茶',
    rating: 4.3,
    reviews: [],
  },
  {
    name: '紅茶 ダージリン',
    description: 'インド産の高級ダージリンティーです。マスカットのような香りと爽やかな味わいが特徴です。',
    price: 1400,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 25,
    category: '紅茶',
    rating: 4.9,
    reviews: [],
  },
  {
    name: '玉露',
    description: '最高級の茶葉を使用した玉露です。甘みが強く、まろやかな味わいが特徴です。',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    stock: 20,
    category: '緑茶',
    rating: 4.8,
    reviews: [],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // 既存の商品データを削除
    await Product.deleteMany({});
    console.log('既存の商品データを削除しました');

    // 新しい商品データを挿入
    const insertedProducts = await Product.insertMany(products);
    console.log(`${insertedProducts.length}件の商品データを追加しました`);

    await mongoose.connection.close();
    console.log('データベース接続を閉じました');
  } catch (error) {
    console.error('エラーが発生しました:', error);
    process.exit(1);
  }
};

seedProducts(); 