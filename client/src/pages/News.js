import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  useTheme,
  Divider,
} from '@mui/material';

/**
 * ニュースページコンポーネント
 * お知らせやブログ記事を表示する
 */
const News = () => {
  const theme = useTheme();

  // サンプルニュースデータ
  const newsItems = [
    {
      id: 1,
      title: '新商品「特選煎茶」発売開始',
      date: '2024年4月1日',
      category: '新商品',
      image: '/images/news/sencha.jpg',
      description: '静岡県の契約農家から直接仕入れた最高級煎茶の販売を開始いたしました。茶葉本来の旨味と香りをお楽しみください。',
    },
    {
      id: 2,
      title: '春の茶摘みイベント開催のお知らせ',
      date: '2024年3月15日',
      category: 'イベント',
      image: '/images/news/tea-picking.jpg',
      description: '今年も恒例の茶摘みイベントを開催いたします。茶畑での体験や茶葉の手揉み体験など、楽しいイベントを企画しております。',
    },
    {
      id: 3,
      title: '「お茶の淹れ方講座」参加者募集',
      date: '2024年3月1日',
      category: 'ワークショップ',
      image: '/images/news/workshop.jpg',
      description: 'プロの茶師から学ぶ、本格的な日本茶の淹れ方講座を開催します。初心者の方も安心してご参加いただけます。',
    },
    {
      id: 4,
      title: '環境に優しい新パッケージの導入',
      date: '2024年2月15日',
      category: 'お知らせ',
      image: '/images/news/eco-package.jpg',
      description: '環境負荷低減のため、全商品のパッケージを生分解性素材に切り替えることを決定いたしました。',
    },
  ];

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
        {/* ヘッダーセクション */}
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
          ニュース＆トピックス
        </Typography>

        {/* ニュース一覧 */}
        <Grid container spacing={4}>
          {newsItems.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <Card 
                elevation={2}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{
                    objectFit: 'cover',
                  }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Chip 
                      label={item.category}
                      size="small"
                      sx={{
                        bgcolor: theme.palette.primary.main,
                        color: 'white',
                      }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {item.date}
                    </Typography>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                      minHeight: '64px',
                    }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                    }}
                  >
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default News; 