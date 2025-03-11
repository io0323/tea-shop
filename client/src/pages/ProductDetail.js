import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  Rating,
  Divider,
  Paper,
  useTheme,
  useMediaQuery,
  Card,
  CardContent,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StarIcon from '@mui/icons-material/Star';
import axios from '../utils/axios';

const ProductDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [review, setReview] = useState({
    rating: 0,
    comment: '',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('商品データの取得に失敗しました');
        console.error('商品データ取得エラー:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handlePurchase = () => {
    // TODO: 購入処理を実装
    console.log('購入:', product);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // TODO: レビュー投稿処理を実装
    console.log('レビュー投稿:', review);
    setReview({ rating: 0, comment: '' });
  };

  const displayedReviews = showAllReviews
    ? product?.reviews
    : product?.reviews?.slice(0, 5);

  if (loading) {
    return (
      <Container>
        <Typography>読み込み中...</Typography>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container>
        <Typography>商品が見つかりませんでした。</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        {/* 商品画像 */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              bgcolor: 'background.paper',
              borderRadius: 2,
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={product.image || '/placeholder.jpg'}
              alt={product.name}
              style={{
                maxWidth: '100%',
                maxHeight: '500px',
                objectFit: 'contain',
              }}
            />
          </Paper>
        </Grid>

        {/* 商品情報 */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Rating value={product.rating || 0} precision={0.5} readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({product.reviews?.length || 0}件のレビュー)
              </Typography>
            </Box>

            <Typography variant="h5" color="primary" gutterBottom>
              ¥{product.price.toLocaleString()}
            </Typography>

            <Typography variant="body1" paragraph>
              {product.description}
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                商品の特徴
              </Typography>
              <ul>
                <li>100g</li>
                <li>高品質</li>
                <li>産地: 日本</li>
                <li>お茶としての深い味わい</li>
              </ul>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<ShoppingCartIcon />}
                onClick={handleAddToCart}
                sx={{ flex: 1 }}
              >
                カートに追加
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handlePurchase}
                sx={{ flex: 2 }}
              >
                今すぐ購入
              </Button>
            </Box>
          </Box>
        </Grid>

        {/* レビューセクション */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                レビュー
              </Typography>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  レビューを書く
                </Typography>
                <form onSubmit={handleReviewSubmit}>
                  <Box sx={{ mb: 2 }}>
                    <Rating
                      value={review.rating}
                      onChange={(event, newValue) => {
                        setReview({ ...review, rating: newValue });
                      }}
                      size="large"
                    />
                  </Box>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    value={review.comment}
                    onChange={(e) =>
                      setReview({ ...review, comment: e.target.value })
                    }
                    placeholder="レビューを入力してください"
                    sx={{ mb: 2 }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                  >
                    レビューを投稿
                  </Button>
                </form>
              </Box>
              <Divider sx={{ my: 3 }} />
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  レビュー一覧
                </Typography>
                {displayedReviews?.map((review, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <Rating value={review.rating} readOnly />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        {new Date(review.date).toLocaleDateString()}
                      </Typography>
                    </Box>
                    <Typography variant="body1">{review.comment}</Typography>
                    {index < displayedReviews.length - 1 && (
                      <Divider sx={{ my: 2 }} />
                    )}
                  </Box>
                ))}
                {product.reviews?.length > 5 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button
                      variant="outlined"
                      onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                      {showAllReviews ? 'レビューを閉じる' : 'すべてのレビューを表示'}
                    </Button>
                  </Box>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetail; 