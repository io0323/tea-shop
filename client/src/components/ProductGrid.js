import React, { useState } from 'react';
import { Grid, Box, Pagination, Container } from '@mui/material';
import ProductCard from './ProductCard';

const ProductGrid = ({ products }) => {
  const [page, setPage] = useState(1);
  const productsPerPage = 9; // 1ページあたり9商品（3列×3行）
  
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * productsPerPage;
  const displayedProducts = products.slice(startIndex, startIndex + productsPerPage);
  const pageCount = Math.ceil(products.length / productsPerPage);

  return (
    <Container maxWidth="lg">
      <Box sx={{ flexGrow: 1, py: 4 }}>
        <Grid container spacing={4}>
          {displayedProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
        {pageCount > 1 && (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 6,
            mb: 4,
            position: 'sticky',
            bottom: 20,
            zIndex: 1,
            backgroundColor: 'background.paper',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <Pagination
              count={pageCount}
              page={page}
              onChange={handlePageChange}
              color="primary"
              size="large"
              siblingCount={2}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default ProductGrid; 