import React from 'react';
import { Container, Typography, Box, Grid, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useCartCalculations } from '../hooks/useCartCalculations';
import CartItemCard from '../components/cart/CartItemCard';
import OrderSummaryCard from '../components/cart/OrderSummaryCard';
import EmptyCart from '../components/cart/EmptyCart';

/**
 * カートページメインコンポーネント
 */
const Cart = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const { subtotal } = useCartCalculations(cartItems);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <Box 
      component="main"
      sx={{ 
        py: 8,
        mt: { xs: 8, sm: 10 },
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 6,
          }}
        >
          ショッピングカート
        </Typography>

        {cartItems.length === 0 ? (
          <EmptyCart onNavigateToProducts={() => navigate('/products')} />
        ) : (
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onQuantityChange={handleQuantityChange}
                  onRemove={removeFromCart}
                />
              ))}
            </Grid>
            <Grid item xs={12} md={4}>
              <OrderSummaryCard
                subtotal={subtotal}
                onCheckout={handleCheckout}
              />
            </Grid>
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default Cart; 