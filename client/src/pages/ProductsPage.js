import React from 'react';
import {
  Container,
  Typography,
  Box,
  useTheme,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import ProductGrid from '../components/ProductGrid';

const ProductsPage = () => {
  const theme = useTheme();
  const { products, loading, error } = useProducts();

  return (
    <Box 
      component="main"
      sx={{ 
        py: 8,
        mt: { xs: 8, sm: 10 },
        minHeight: 'calc(100vh - 64px)'
      }}
    >
      <Container>
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
          商品一覧
        </Typography>
        
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error}
          </Alert>
        ) : products.length === 0 ? (
          <Alert severity="info" sx={{ mb: 4 }}>
            商品が見つかりませんでした。
          </Alert>
        ) : (
          <ProductGrid products={products} />
        )}
      </Container>
    </Box>
  );
};

export default ProductsPage; 