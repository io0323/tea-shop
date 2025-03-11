import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Button,
  Paper,
  CheckCircleIcon,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <Container sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          textAlign: 'center',
          maxWidth: 600,
          mx: 'auto',
        }}
      >
        <CheckCircleOutlineIcon
          sx={{ fontSize: 80, color: 'success.main', mb: 2 }}
        />
        <Typography variant="h4" gutterBottom>
          ご注文ありがとうございます
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          注文の確認メールをお送りしました。
          メールに記載されている注文番号をお控えください。
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/products')}
            sx={{ mr: 2 }}
          >
            商品一覧へ
          </Button>
          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate('/orders')}
          >
            注文履歴へ
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderConfirmation; 