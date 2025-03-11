import React from 'react';
import { Box, Container, Typography, Link, useTheme } from '@mui/material';

/**
 * フッターコンポーネント
 * アプリケーションの最下部に表示される共通フッター
 */
const Footer = () => {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" align="center">
          {'© '}
          <Link
            color="inherit"
            href="/"
            sx={{ textDecoration: 'none' }}
          >
            Tea Shop
          </Link>
          {' '}{currentYear}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 