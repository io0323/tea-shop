import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  IconButton,
  Badge,
  useTheme,
  Divider,
  Paper,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

/**
 * 商品カードコンポーネント
 * 商品情報とカート追加機能を表示
 */
const ProductCard = ({ product }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { addToCart, cartItems } = useCart();

  // カート内の商品数を計算
  const cartItemCount = cartItems.reduce((total, item) => {
    return item.id === product.id ? total + item.quantity : total;
  }, 0);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // イベントの伝播を停止
    addToCart(product);
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
        },
      }}
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <CardMedia
        component="img"
        height="200"
        image={product.image}
        alt={product.name}
        sx={{
          objectFit: 'cover',
        }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {product.name}
          </Typography>
          <Badge
            badgeContent={cartItemCount}
            color="primary"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: theme.palette.primary.main,
              },
            }}
          >
            <IconButton
              color="primary"
              onClick={handleAddToCart}
              sx={{
                '&:hover': {
                  backgroundColor: theme.palette.primary.light,
                },
              }}
            >
              <ShoppingCartIcon />
            </IconButton>
          </Badge>
        </Box>
        <Typography color="text.secondary" sx={{ mb: 2, flexGrow: 1 }}>
          {product.description}
        </Typography>
        <Paper 
          elevation={2} 
          sx={{ 
            p: 2, 
            mt: 2, 
            backgroundColor: theme.palette.background.default,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Typography 
            variant="h5" 
            color="primary" 
            sx={{ 
              fontWeight: 'bold',
              flexGrow: 1
            }}
          >
            ¥{product.price.toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddToCart}
            startIcon={<ShoppingCartIcon />}
            size="large"
            sx={{
              minWidth: '140px',
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            カートに追加
          </Button>
        </Paper>
      </CardContent>
    </Card>
  );
};

export default ProductCard; 