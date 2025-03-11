import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Badge = ({ type }) => {
  const getBadgeConfig = (type) => {
    switch (type) {
      case 'NEW':
        return {
          backgroundColor: '#ff4081',
          text: 'NEW',
          fontSize: '14px'
        };
      case '限定':
        return {
          backgroundColor: '#f50057',
          text: '限定',
          fontSize: '14px'
        };
      case '人気':
        return {
          backgroundColor: '#2196f3',
          text: '人気',
          fontSize: '14px'
        };
      default:
        return {};
    }
  };

  const config = getBadgeConfig(type);

  return (
    <Box
      sx={{
        width: '60px',
        height: '24px',
        backgroundColor: config.backgroundColor,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: config.fontSize,
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        position: 'relative',
        overflow: 'hidden',
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(rgba(255,255,255,0.2), transparent)',
          pointerEvents: 'none',
        }
      }}
    >
      {config.text}
    </Box>
  );
};

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const getBadges = (product) => {
    const badges = [];
    
    if (product.isNew) {
      badges.push({ type: 'NEW' });
    }
    if (product.isLimited) {
      badges.push({ type: '限定' });
    }
    if (product.isBestSeller) {
      badges.push({ type: '人気' });
    }
    return badges;
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
          transition: 'all 0.3s ease-in-out',
        },
      }}
    >
      <Box 
        sx={{ 
          position: 'absolute', 
          top: 10, 
          right: 10, 
          zIndex: 1, 
          display: 'flex', 
          gap: 1,
          flexDirection: 'column'
        }}
      >
        {getBadges(product).map((badge, index) => (
          <Box
            key={index}
            sx={{
              transform: 'rotate(-5deg)',
              animation: 'float 3s ease-in-out infinite',
              '@keyframes float': {
                '0%, 100%': {
                  transform: 'rotate(-5deg) translateY(0)',
                },
                '50%': {
                  transform: 'rotate(-5deg) translateY(-5px)',
                },
              },
            }}
          >
            <Badge {...badge} />
          </Box>
        ))}
      </Box>
      <CardMedia
        component="img"
        height="200"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            fontSize: '1rem',
            fontWeight: 'bold',
            mb: 1,
            height: '2.4em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            mb: 2,
            height: '3em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" color="primary">
            ¥{product.price.toLocaleString()}
          </Typography>
          <Button 
            size="small" 
            variant="contained"
            onClick={() => navigate(`/products/${product._id}`)}
          >
            詳しく見る
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

 