import React from 'react';
import {
  Card,
  CardContent,
  Grid,
  Typography,
  Box,
  TextField,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useNavigate } from 'react-router-dom';

/**
 * カートアイテムカードコンポーネント
 * 個々の商品情報と操作を表示
 */
const CartItemCard = ({ item, onQuantityChange, onRemove }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigateToProduct = () => {
    navigate(`/products/${item.id}`);
  };

  return (
    <Card 
      sx={{ 
        mb: 2,
        cursor: 'pointer',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
      onClick={handleNavigateToProduct}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'cover',
                borderRadius: '4px',
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {item.name}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                  ¥{item.price.toLocaleString()}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                  <TextField
                    type="number"
                    value={item.quantity}
                    onChange={(e) => onQuantityChange(item.id, parseInt(e.target.value))}
                    size="small"
                    sx={{ width: 80, mr: 1 }}
                  />
                  <IconButton
                    color="error"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(item.id);
                    }}
                    size="small"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', ml: 2 }}>
                <Typography variant="h6" color="primary" gutterBottom>
                  ¥{(item.price * item.quantity).toLocaleString()}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<ShoppingCartIcon />}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/cart');
                  }}
                  sx={{
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light,
                    },
                  }}
                >
                  カートへ
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CartItemCard; 