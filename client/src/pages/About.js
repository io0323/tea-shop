import React from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
  Divider,
} from '@mui/material';

/**
 * Aboutページコンポーネント
 * 会社の理念、特徴、ビジョンを表示する
 */
const About = () => {
  const theme = useTheme();

  const features = [
    {
      title: '厳選された茶葉',
      description: '世界中から厳選された最高品質の茶葉を取り扱っています。産地直送で新鮮な味わいをお届けします。',
    },
    {
      title: '環境への配慮',
      description: '環境に優しい包装材を使用し、持続可能な農業を支援しています。地球にやさしいお茶をお届けします。',
    },
    {
      title: 'コミュニティ',
      description: 'お茶を通じて人々をつなぎ、豊かなコミュニティを育んでいます。定期的な茶会やワークショップも開催しています。',
    },
  ];

  return (
    <Box 
      component="main"
      sx={{ 
        py: 8,
        mt: { xs: 8, sm: 10 }, // ヘッダーの高さに応じてマージントップを追加
        minHeight: 'calc(100vh - 64px)' // フッターまでの最小高さを確保
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
            mb: 4,
          }}
        >
          私たちについて
        </Typography>

        {/* ミッションステートメント */}
        <Box sx={{ mb: 8 }}>
          <Typography
            variant="h5"
            align="center"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              color: theme.palette.text.secondary,
            }}
          >
            Tea Shopは、最高品質のお茶を通じて、
            人々の日常に特別なひとときをお届けすることを使命としています。
          </Typography>
        </Box>

        <Divider sx={{ mb: 8 }} />

        {/* 特徴セクション */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                <Typography
                  variant="h6"
                  component="h3"
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                    mb: 2
                  }}
                >
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* ビジョンセクション */}
        <Box
          sx={{
            bgcolor: theme.palette.background.paper,
            p: 6,
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ color: theme.palette.primary.main }}
          >
            私たちのビジョン
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
              color: theme.palette.text.secondary,
            }}
          >
            お茶を通じて、人々の生活に豊かさと潤いをもたらし、
            持続可能な社会の実現に貢献することを目指しています。
            伝統的な茶文化を大切にしながら、
            現代のライフスタイルに合わせた新しいお茶の楽しみ方を提案し続けます。
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default About; 