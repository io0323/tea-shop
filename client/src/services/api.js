import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api',  // バックエンドのURLを5001ポートに変更
  withCredentials: true,  // Cookie認証のサポート
  headers: {
    'Content-Type': 'application/json',
  },
});

// 商品一覧の取得
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('商品一覧取得エラー:', error);
    throw error;
  }
};

// 商品詳細の取得
export const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('商品詳細取得エラー:', error);
    throw error;
  }
};

// 商品の作成
export const createProduct = async (productData) => {
  try {
    const response = await api.post('/products', productData);
    return response.data;
  } catch (error) {
    console.error('商品作成エラー:', error);
    throw error;
  }
};

// 商品の更新
export const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error('商品更新エラー:', error);
    throw error;
  }
};

// 商品の削除
export const deleteProduct = async (id) => {
  try {
    await api.delete(`/products/${id}`);
    return true;
  } catch (error) {
    console.error('商品削除エラー:', error);
    throw error;
  }
};

// レビューの追加
export const addReview = async (productId, reviewData) => {
  try {
    const response = await api.post(`/products/${productId}/reviews`, reviewData);
    return response.data;
  } catch (error) {
    console.error('レビュー追加エラー:', error);
    throw error;
  }
};

export default api; 