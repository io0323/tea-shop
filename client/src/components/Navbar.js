import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem,
  Container,
} from '@mui/material';
import {
  ShoppingCart as CartIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { cart = [] } = useCart();
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AppBar position="sticky" elevation={0}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'primary.main',
              fontWeight: 'bold',
              letterSpacing: 1,
            }}
          >
            茶葉ショップ
          </Typography>

          {isMobile ? (
            <>
              <IconButton
                color="primary"
                component={RouterLink}
                to="/cart"
                sx={{ mr: 1 }}
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <CartIcon />
                </Badge>
              </IconButton>
              <IconButton
                color="primary"
                onClick={handleMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    borderRadius: 2,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  },
                }}
              >
                <MenuItem
                  component={RouterLink}
                  to="/products"
                  onClick={handleClose}
                  sx={{ py: 1.5 }}
                >
                  商品一覧
                </MenuItem>
                {user ? (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/profile"
                      onClick={handleClose}
                      sx={{ py: 1.5 }}
                    >
                      プロフィール
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        logout();
                        handleClose();
                      }}
                      sx={{ py: 1.5 }}
                    >
                      ログアウト
                    </MenuItem>
                  </>
                ) : (
                  <>
                    <MenuItem
                      component={RouterLink}
                      to="/login"
                      onClick={handleClose}
                      sx={{ py: 1.5 }}
                    >
                      ログイン
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/register"
                      onClick={handleClose}
                      sx={{ py: 1.5 }}
                    >
                      新規登録
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="primary"
                component={RouterLink}
                to="/products"
                sx={{ fontWeight: 600 }}
              >
                商品一覧
              </Button>
              <IconButton
                color="primary"
                component={RouterLink}
                to="/cart"
              >
                <Badge badgeContent={cartItemCount} color="error">
                  <CartIcon />
                </Badge>
              </IconButton>
              {user ? (
                <>
                  <IconButton
                    color="primary"
                    component={RouterLink}
                    to="/profile"
                  >
                    <PersonIcon />
                  </IconButton>
                  <Button
                    color="primary"
                    onClick={logout}
                    sx={{ fontWeight: 600 }}
                  >
                    ログアウト
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    color="primary"
                    component={RouterLink}
                    to="/login"
                    sx={{ fontWeight: 600 }}
                  >
                    ログイン
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    component={RouterLink}
                    to="/register"
                    sx={{ fontWeight: 600 }}
                  >
                    新規登録
                  </Button>
                </>
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 