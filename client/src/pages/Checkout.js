import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from '../components/CheckoutForm';

// Stripeの初期化（チェックアウトページでのみ使用）
const stripePromise = loadStripe('pk_test_51O5YfYKS0EWL2bK8gNx1XyqK9mXO0paQpK8X6K0r7V7r7V7r7V7r7V7r7V7r');

const stripeOptions = {
  locale: 'ja',
  appearance: {
    theme: 'stripe',
  },
};

const steps = ['配送情報', '支払い情報', '注文確認'];

const Checkout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const { cartItems, getTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: user?.address?.street || '',
    city: user?.address?.city || '',
    postalCode: user?.address?.postalCode || '',
    country: user?.address?.country || '',
  });
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleShippingInfoChange = (event) => {
    const { name, value } = event.target;
    setShippingInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaymentInfoChange = (event) => {
    const { name, value } = event.target;
    setPaymentInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      // ここでStripeの支払い処理を実装
      const stripe = await stripePromise;
      // 支払い処理の実装...

      // 注文完了後、カートをクリアして注文完了ページへリダイレクト
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('支払い処理中にエラーが発生しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderShippingInfo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        配送情報
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="お名前"
            name="name"
            value={shippingInfo.name}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="メールアドレス"
            name="email"
            type="email"
            value={shippingInfo.email}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="住所"
            name="address"
            value={shippingInfo.address}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="市区町村"
            name="city"
            value={shippingInfo.city}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="郵便番号"
            name="postalCode"
            value={shippingInfo.postalCode}
            onChange={handleShippingInfoChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="国"
            name="country"
            value={shippingInfo.country}
            onChange={handleShippingInfoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderPaymentInfo = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        支払い情報
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="カード番号"
            name="cardNumber"
            value={paymentInfo.cardNumber}
            onChange={handlePaymentInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="有効期限"
            name="expiryDate"
            value={paymentInfo.expiryDate}
            onChange={handlePaymentInfoChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="CVV"
            name="cvv"
            value={paymentInfo.cvv}
            onChange={handlePaymentInfoChange}
          />
        </Grid>
      </Grid>
    </Box>
  );

  const renderOrderSummary = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        注文内容の確認
      </Typography>
      {cartItems.map((item) => (
        <Box key={item.productId} sx={{ mb: 2 }}>
          <Typography>
            {item.name} × {item.quantity}
          </Typography>
          <Typography color="primary">
            ¥{(item.price * item.quantity).toLocaleString()}
          </Typography>
        </Box>
      ))}
      <Divider sx={{ my: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>小計</Typography>
        <Typography>¥{getTotal().toLocaleString()}</Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography>送料</Typography>
        <Typography>¥500</Typography>
      </Box>
      <Divider sx={{ my: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6">合計</Typography>
        <Typography variant="h6" color="primary">
          ¥{(getTotal() + 500).toLocaleString()}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        お支払い
      </Typography>
      <Elements stripe={stripePromise} options={stripeOptions}>
        <CheckoutForm />
      </Elements>
    </Container>
  );
};

export default Checkout; 