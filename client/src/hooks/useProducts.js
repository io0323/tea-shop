import { useState, useEffect } from 'react';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  addReview,
} from '../services/api';

export const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('商品データの取得に失敗しました。');
      console.error('商品データ取得エラー:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProductById = async (id) => {
    try {
      setLoading(true);
      const data = await getProductById(id);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || '商品データの取得に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async (productData) => {
    try {
      setLoading(true);
      const data = await createProduct(productData);
      setProducts((prev) => [...prev, data]);
      return data;
    } catch (err) {
      setError(err.response?.data?.message || '商品の作成に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const data = await updateProduct(id, productData);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === id ? data : product
        )
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || '商品の更新に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      setLoading(true);
      await deleteProduct(id);
      setProducts((prev) => prev.filter((product) => product._id !== id));
      return true;
    } catch (err) {
      setError(err.response?.data?.message || '商品の削除に失敗しました');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleAddReview = async (productId, reviewData) => {
    try {
      setLoading(true);
      const data = await addReview(productId, reviewData);
      setProducts((prev) =>
        prev.map((product) =>
          product._id === productId ? data : product
        )
      );
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'レビューの追加に失敗しました');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    fetchProducts,
    fetchProductById,
    createProduct: handleCreateProduct,
    updateProduct: handleUpdateProduct,
    deleteProduct: handleDeleteProduct,
    addReview: handleAddReview,
  };
}; 