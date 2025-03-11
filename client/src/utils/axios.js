import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:5001',
  headers: {
    'Content-Type': 'application/json',
  },
});

// エラーハンドリング
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('APIエラー:', error);
    return Promise.reject(error);
  }
);

export default instance; 