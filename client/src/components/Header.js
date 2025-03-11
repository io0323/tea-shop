import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
  useTheme,
  alpha,
  Menu,
  MenuItem,
  Fade,
  TextField,
  InputAdornment,
  Collapse,
  ClickAwayListener,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const theme = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // カテゴリリスト
  const categories = [
    { id: 'sencha', name: '煎茶' },
    { id: 'gyokuro', name: '玉露' },
    { id: 'hojicha', name: 'ほうじ茶' },
    { id: 'matcha', name: '抹茶' },
    { id: 'genmaicha', name: '玄米茶' },
    { id: 'other', name: 'その他' },
  ];

  // スクロール位置を監視（影の表示のみに使用）
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // カートの合計アイテム数を計算
  const totalItems = cartItems?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // カテゴリメニューの開閉処理
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
    handleMenuClose();
  };

  // ナビゲーションリンク
  const navLinks = [
    { text: 'HOME', path: '/' },
    { text: 'ABOUT', path: '/about' },
    { text: 'NEWS', path: '/news' },
    { text: 'ITEM', path: '/products' },
  ];

  // 共通のボタンスタイル
  const buttonStyle = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '4px',
    padding: '6px 16px',
    minWidth: 'auto',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    '&:hover': {
      backgroundColor: alpha('#000000', 0.8),
    },
  };

  const iconButtonStyle = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '4px',
    padding: '6px',
    minWidth: '35px',
    height: '35px',
    '&:hover': {
      backgroundColor: alpha('#000000', 0.8),
    },
    '& .MuiSvgIcon-root': {
      fontSize: '1.2rem',
    },
  };

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery('');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      handleSearchClose();
    }
  };

  return (
    <AppBar
      position="fixed"
      elevation={scrolled ? 2 : 0}
      sx={{
        background: alpha('#ffffff', 0.8),
        backdropFilter: 'blur(8px)',
        transition: theme.transitions.create(['box-shadow'], {
          duration: theme.transitions.duration.standard,
        }),
      }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{
            justifyContent: 'space-between',
            py: 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            {navLinks.map((link) => (
              <Button
                key={link.text}
                component={Link}
                to={link.path}
                sx={{
                  color: theme.palette.text.primary,
                  textDecoration: 'none',
                  fontWeight: 500,
                  letterSpacing: 1,
                  fontSize: '0.9rem',
                  '&:hover': {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                  },
                }}
              >
                {link.text}
              </Button>
            ))}
            <Button
              aria-controls="category-menu"
              aria-haspopup="true"
              onClick={handleMenuOpen}
              onMouseEnter={handleMenuOpen}
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: 1,
                fontSize: '0.9rem',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                },
              }}
            >
              CATEGORY
            </Button>
            <Menu
              id="category-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 400 }}
              MenuListProps={{
                onMouseLeave: handleMenuClose
              }}
              sx={{
                '& .MuiPaper-root': {
                  backgroundColor: alpha('#ffffff', 0.95),
                  backdropFilter: 'blur(8px)',
                  borderRadius: '8px',
                  marginTop: '8px',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                  transform: 'translateY(10px)',
                  transition: theme.transitions.create(
                    ['transform', 'opacity'],
                    {
                      duration: theme.transitions.duration.standard,
                      easing: theme.transitions.easing.easeOutQuart,
                    }
                  ),
                  '&.MuiMenu-paper': {
                    opacity: 1,
                    transform: 'translateY(0)',
                  },
                },
                '& .MuiMenu-list': {
                  padding: '8px 0',
                },
              }}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  sx={{
                    fontSize: '0.9rem',
                    py: 1,
                    px: 2,
                    minWidth: '160px',
                    '&:hover': {
                      backgroundColor: alpha(theme.palette.primary.main, 0.1),
                    },
                  }}
                >
                  {category.name}
                </MenuItem>
              ))}
            </Menu>
            <Button
              component={Link}
              to="/faq"
              sx={{
                color: theme.palette.text.primary,
                textDecoration: 'none',
                fontWeight: 500,
                letterSpacing: 1,
                fontSize: '0.9rem',
                '&:hover': {
                  color: theme.palette.primary.main,
                  backgroundColor: 'transparent',
                },
              }}
            >
              FAQ
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ClickAwayListener onClickAway={handleSearchClose}>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Collapse 
                  in={isSearchOpen} 
                  orientation="horizontal"
                  sx={{
                    position: 'absolute',
                    right: '100%',
                    mr: 1,
                  }}
                >
                  <form onSubmit={handleSearchSubmit}>
                    <TextField
                      autoFocus
                      placeholder="商品を検索..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      variant="outlined"
                      size="small"
                      sx={{
                        width: '300px',
                        backgroundColor: alpha(theme.palette.background.paper, 0.9),
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: 'transparent',
                          },
                          '&:hover fieldset': {
                            borderColor: 'transparent',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                          },
                        },
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              size="small"
                              onClick={handleSearchClose}
                              sx={{ color: theme.palette.text.secondary }}
                            >
                              <CloseIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </form>
                </Collapse>
                <IconButton
                  onClick={isSearchOpen ? handleSearchSubmit : handleSearchOpen}
                  sx={iconButtonStyle}
                  disableRipple
                >
                  <SearchIcon />
                </IconButton>
              </Box>
            </ClickAwayListener>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              disableElevation
              sx={buttonStyle}
            >
              LOGIN
            </Button>
            <IconButton
              onClick={() => navigate('/cart')}
              sx={iconButtonStyle}
              disableRipple
            >
              <Badge 
                badgeContent={totalItems} 
                color="primary"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: theme.palette.primary.main,
                    color: 'white',
                    right: -3,
                    top: 3,
                  },
                }}
              >
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header; 