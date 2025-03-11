import React from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';

/**
 * 空のカート表示コンポーネント
 * カートが空の状態を表示
 */
const EmptyCart = ({ onNavigateToProducts }) => (
  <Box sx={{ textAlign: 'center', py: 8 }}>
    <Alert severity="info" sx={{ mb: 4 }}>
      カートは空です
    </Alert>
    <Button
      variant="contained"
      color="primary"
      onClick={onNavigateToProducts}
      sx={{ mt: 2 }}
    >
      商品一覧へ
    </Button>
  </Box>
);

export default EmptyCart; 