# 自販機マップ (zihanki)

自動販売機の位置を地図上にピンで登録し、写真を表示する Web アプリです。
学生時代（2022年11月〜2023年2月）に Laravel の学習を兼ねて制作しました。

![画面イメージ](zihanki.png)

> このアプリを FastAPI + React + TypeScript で作り直した新しい版は、[zihanki_v2](https://github.com/youtatata/zihanki_v2) リポジトリで公開しています。

## 主な機能

| 画面 | URL | 内容 |
|---|---|---|
| ホーム | `/` | 登録済みのピンを地図に表示し、ピンを選ぶと写真を表示 |
| 追加 | `/create` | 地図中央の位置に、写真付きでピンを登録 |
| 編集 | `/editing` | 登録済みのピンを選んで削除 |

## 使用技術

- PHP 8 / Laravel 9（laravel/ui による Bootstrap）
- MySQL
- Google Maps JavaScript API

## セットアップ

```bash
composer install
npm install

cp .env.example .env
php artisan key:generate
```

`.env` に、データベースの接続情報と Google Maps の API キーを設定します。

```
DB_DATABASE=...
DB_USERNAME=...
DB_PASSWORD=...
GOOGLE_MAPS_API_KEY=...
```

API キーは Google Cloud Console で発行し、Maps JavaScript API を有効にしてください。キーはコードに直接書かず、`.env` から読み込みます（`config/services.php`）。

```bash
php artisan migrate
php artisan storage:link   # 登録した写真を表示するため
```

## 起動

```bash
npm run dev
php artisan serve
```

ブラウザで http://localhost:8000 を開きます。
