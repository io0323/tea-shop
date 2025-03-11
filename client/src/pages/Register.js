import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Paper,
  Alert,
  Grid,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: {
      street: '',
      city: '',
      postalCode: '',
      country: '',
    },
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      return setError('パスワードが一致しません');
    }

    try {
      setLoading(true);
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        address: formData.address,
      });
      navigate('/');
    } catch (error) {
      setError('アカウントの作成に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          新規登録
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            required
            fullWidth
            label="お名前"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            autoComplete="name"
          />

          <TextField
            required
            fullWidth
            label="メールアドレス"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            autoComplete="email"
          />

          <TextField
            required
            fullWidth
            label="パスワード"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            autoComplete="new-password"
          />

          <TextField
            required
            fullWidth
            label="パスワード（確認）"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            autoComplete="new-password"
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
            住所情報
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="住所"
                name="address.street"
                value={formData.address.street}
                onChange={handleChange}
                autoComplete="street-address"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="市区町村"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                autoComplete="address-level2"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="郵便番号"
                name="address.postalCode"
                value={formData.address.postalCode}
                onChange={handleChange}
                autoComplete="postal-code"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="国"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                autoComplete="country"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            disabled={loading}
            sx={{ mt: 3 }}
          >
            {loading ? '登録中...' : '登録する'}
          </Button>
        </Box>

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            すでにアカウントをお持ちの方は
            <Link
              component={RouterLink}
              to="/login"
              sx={{ ml: 1 }}
            >
              ログイン
            </Link>
            へ
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 