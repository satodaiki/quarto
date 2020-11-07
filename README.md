# QUARTO

## 起動方法

以下のコマンドを入力して下さい。

```
docker-compose up -d
```

expressサーバーは3000、フロントエンドのサーバーは3100で起動します。

## 開発者へ

本番用サーバーは一時的にherokuで構築しています。

フロントの動作検証の際は`yarn serve --mode production`で起動してください。

## 備忘録

Herokuへのデプロイの際は、ルートディレクトリから以下のコマンドでいけます。

```
git subtree push --prefix server heroku master
```