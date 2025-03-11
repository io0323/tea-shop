const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // トークンの取得
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: '認証が必要です' });
    }

    // トークンの検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('認証エラー:', error);
    res.status(401).json({ message: '無効なトークンです' });
  }
}; 