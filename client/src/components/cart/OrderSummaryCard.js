import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Divider,
} from '@mui/material';

/**
 * 注文合計カードコンポーネント
 * 合計金額とチェックアウトボタンを表示
 */
const OrderSummaryCard = ({ subtotal, onCheckout }) => {
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          注文合計
        </Typography>
        <Box sx={{ my: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>小計</Typography>
            <Typography>¥{subtotal.toLocaleString()}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography>消費税 (10%)</Typography>
            <Typography>¥{tax.toLocaleString()}</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
            <Typography variant="h6">合計</Typography>
            <Typography variant="h6" color="primary">
              ¥{total.toLocaleString()}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={onCheckout}
          >
            レジへ進む
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard; 