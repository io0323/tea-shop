import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  useTheme,
  alpha,
  Pagination,
  IconButton,
  Stack,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useProducts } from '../hooks/useProducts';
import EmailIcon from '@mui/icons-material/Email';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import ProductGrid from '../components/ProductGrid';

const Home = () => {
  const theme = useTheme();
  const { products, loading, error } = useProducts();

  const news = [
    { date: '2024/03/20', content: '春の新商品が入荷しました。' },
    { date: '2024/03/15', content: '店舗限定の茶葉セットを販売開始。' },
    { date: '2024/03/10', content: 'オンラインティーセミナーの参加者募集中。' },
  ];

  return (
    <Box>
      {/* メインタイトル */}
      <Box
        sx={{
          position: 'relative',
          height: '60vh',
          width: '100%',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/tea-background.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)',
            zIndex: -1,
          },
        }}
      >
        <Container
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Typography 
            variant="h1" 
            component="h1"
            align="center"
            sx={{
              color: '#ffffff',
              fontWeight: 900,
              fontSize: { xs: '3rem', md: '5rem' },
              letterSpacing: '0.2em',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            }}
          >
            KNGW TEA SHOP
          </Typography>
        </Container>
      </Box>

      {/* ニュースセクション */}
      <Container sx={{ py: 6 }}>
        <Typography
          variant="h4"
          component="h2"
          sx={{
            mb: 4,
            fontWeight: 700,
            borderBottom: `3px solid ${theme.palette.primary.main}`,
            paddingBottom: 1,
          }}
        >
          NEWS
        </Typography>
        <Stack spacing={2}>
          {news.map((item, index) => (
            <Box key={index} sx={{ display: 'flex', gap: 4 }}>
              <Typography
                sx={{
                  fontFamily: 'monospace',
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                }}
              >
                {item.date}
              </Typography>
              <Typography>{item.content}</Typography>
            </Box>
          ))}
        </Stack>
      </Container>

      {/* 商品一覧セクション */}
      <Box id="products-section" sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 700,
              color: theme.palette.primary.main,
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

      {/* バナーセクション */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component={RouterLink}
              to="/campaign/spring"
              sx={{
                position: 'relative',
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                display: 'block',
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src="/images/banner1.jpg"
                alt="春のキャンペーン"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component={RouterLink}
              to="/campaign/gift"
              sx={{
                position: 'relative',
                height: 200,
                borderRadius: 2,
                overflow: 'hidden',
                display: 'block',
                '&:hover img': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <img
                src="/images/banner2.jpg"
                alt="ギフトセット"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.3s ease',
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* 動画セクション */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Typography
            variant="h4"
            component="h2"
            align="center"
            gutterBottom
            sx={{ mb: 6, fontWeight: 700 }}
          >
            お茶の楽しみ方
          </Typography>
          <Box
            sx={{
              position: 'relative',
              paddingTop: '56.25%', // 16:9 アスペクト比
              width: '100%',
              maxWidth: 800,
              margin: '0 auto',
            }}
          >
            <iframe
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                border: 'none',
                borderRadius: 8,
              }}
              src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
              title="お茶の楽しみ方"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Box>
        </Container>
      </Box>

      {/* コンタクトセクション */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center" justifyContent="center">
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h2"
              align="center"
              gutterBottom
              sx={{ mb: 6, fontWeight: 700 }}
            >
              CONTACT
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                メールでのお問い合わせ
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                info@kngw-tea.com
              </Typography>
              <IconButton
                href="mailto:info@kngw-tea.com"
                color="primary"
                sx={{ '&:hover': { transform: 'scale(1.1)' } }}
              >
                <EmailIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                SNS
              </Typography>
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                sx={{ mb: 2 }}
              >
                <IconButton
                  href="https://instagram.com/kngw_tea"
                  target="_blank"
                  color="primary"
                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                >
                  <InstagramIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://twitter.com/kngw_tea"
                  target="_blank"
                  color="primary"
                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                >
                  <TwitterIcon fontSize="large" />
                </IconButton>
                <IconButton
                  href="https://facebook.com/kngw.tea"
                  target="_blank"
                  color="primary"
                  sx={{ '&:hover': { transform: 'scale(1.1)' } }}
                >
                  <FacebookIcon fontSize="large" />
                </IconButton>
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 700 }}>
                営業時間
              </Typography>
              <Typography color="text.secondary">
                平日 10:00 - 19:00
                <br />
                土日祝 11:00 - 18:00
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home; 