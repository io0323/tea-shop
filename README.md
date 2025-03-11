# Tea Shop Application

オンラインお茶販売のフルスタックWebアプリケーション

## 機能

- 商品一覧表示
- 商品詳細表示
- カート機能
- ユーザー認証
- 注文管理
- レビュー機能

## 技術スタック

### フロントエンド
- React
- Material-UI
- React Router
- Axios

### バックエンド
- Node.js
- Express
- MongoDB
- Mongoose

## セットアップ手順

1. リポジトリのクローン
```bash
git clone https://github.com/YOUR_USERNAME/tea-shop.git
cd tea-shop
```

2. 依存関係のインストール
```bash
# バックエンド依存関係のインストール
npm install

# フロントエンド依存関係のインストール
cd client
npm install
```

3. 環境変数の設定
```bash
# .envファイルを作成
cp .env.example .env
```

4. MongoDBの起動
```bash
# MongoDBが起動していることを確認
```

5. アプリケーションの起動
```bash
# バックエンドサーバーの起動（ルートディレクトリで）
npm start

# 別のターミナルでフロントエンドサーバーの起動
cd client
npm start
```

## 開発環境

- Node.js v18以上
- MongoDB v6.0以上
- npm v9以上

## ライセンス

MIT License 