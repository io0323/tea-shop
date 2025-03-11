import React from 'react';
import {
  Container,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

/**
 * FAQページコンポーネント
 * よくある質問と回答をアコーディオン形式で表示
 */
const FAQ = () => {
  const theme = useTheme();

  const faqItems = [
    {
      question: 'お茶の保存方法について教えてください。',
      answer: 'お茶は直射日光を避け、涼しく乾燥した場所で保存してください。密閉容器に入れて、湿気や香りの強いものから離して保管することをお勧めします。開封後は1ヶ月以内に飲み切ることをお勧めします。',
    },
    {
      question: 'お茶の淹れ方の基本を教えてください。',
      answer: '基本的な手順は以下の通りです：\n1. 沸騰したお湯を適温（煎茶：80℃、抹茶：70℃）まで冷ます\n2. 茶葉を急須に入れる（1人分：約3g）\n3. お湯を注ぎ、30秒〜1分程度蒸らす\n4. 少しずつ均等に注ぎ分ける\n※茶葉の種類によって温度や時間が異なります。',
    },
    {
      question: '配送について教えてください。',
      answer: '全国配送に対応しています。通常配送は3-5営業日、お急ぎ便は1-2営業日でお届けします。配送料は全国一律500円（税込）です。5,000円以上のご購入で送料無料となります。',
    },
    {
      question: '返品・交換について教えてください。',
      answer: '商品到着後7日以内であれば、未開封の商品に限り返品・交換が可能です。返品の場合は、商品と一緒に同封されている返品用の用紙に必要事項を記入の上、ご返送ください。返品の送料はお客様負担となります。',
    },
    {
      question: 'ギフト対応はしていますか？',
      answer: 'はい、ギフト対応を承っております。商品にギフトメッセージカードを同封することができます。また、ギフト用の特別なパッケージングもご用意しています。ご注文時にギフト対応をご指定ください。',
    },
    {
      question: 'お茶のカフェイン含有量について教えてください。',
      answer: '茶葉の種類によってカフェイン含有量は異なります。一般的に、煎茶は100mlあたり約20mg、抹茶は約30mgのカフェインを含みます。カフェインを控えたい場合は、ほうじ茶や麦茶などのカフェインレス商品をお勧めします。',
    },
    {
      question: '定期購入はできますか？',
      answer: 'はい、定期購入に対応しています。1ヶ月、2ヶ月、3ヶ月の間隔からお選びいただけます。定期購入の場合は、通常価格から5%割引となります。また、いつでも解約可能です。',
    },
    {
      question: 'お支払い方法について教えてください。',
      answer: '以下の支払い方法に対応しています：\n- クレジットカード（VISA、Mastercard、JCB、American Express）\n- 銀行振込\n- 代金引換\n※代金引換の場合は、別途手数料が発生します。',
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
      <Container maxWidth="md">
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
          よくある質問
        </Typography>

        <Typography
          variant="body1"
          align="center"
          sx={{
            color: theme.palette.text.secondary,
            mb: 6,
          }}
        >
          お客様からよくいただくご質問と回答をご紹介しています。
          お探しの情報が見つからない場合は、お気軽にお問い合わせください。
        </Typography>

        <Box sx={{ mt: 4 }}>
          {faqItems.map((item, index) => (
            <Accordion
              key={index}
              sx={{
                mb: 1,
                '&:before': {
                  display: 'none',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  backgroundColor: theme.palette.background.paper,
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 600,
                    color: theme.palette.primary.main,
                  }}
                >
                  {item.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  variant="body1"
                  sx={{
                    whiteSpace: 'pre-line',
                    color: theme.palette.text.secondary,
                  }}
                >
                  {item.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ; 