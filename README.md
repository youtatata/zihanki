# 自販機マップ (zihanki)

自動販売機の位置を地図上にピンで登録し、写真を表示する Web アプリです。

| 画面 | URL | 内容 |
|---|---|---|
| ホーム | `/` | 登録済みのピンを表示。ピンを選ぶと写真と日付を表示 |
| 追加 | `/create` | 地図中央の照準位置に、写真付きでピンを登録 |
| 編集 | `/edit` | ピンを選んで削除 |

## 構成

```
backend/   FastAPI + SQLAlchemy + SQLite（API と画像配信）
frontend/  React + TypeScript + Vite（画面）
```

開発時は Vite の開発サーバーが `/api` と `/uploads` へのリクエストをバックエンド (`127.0.0.1:8000`) に転送します。

### API

| メソッド | パス | 内容 |
|---|---|---|
| GET | `/api/vending-machines` | 一覧取得 |
| POST | `/api/vending-machines` | 登録（multipart: `lat`, `lng`, `date`, `image`。画像は JPEG/PNG/WebP・5MB 以下） |
| DELETE | `/api/vending-machines/{id}` | 削除（画像ファイルも削除） |

バックエンド起動中は http://127.0.0.1:8000/docs で API ドキュメントを確認できます。

## 必要なソフトウェア

- Python 3.12 以上
- Node.js 20 以上
- Google Maps JavaScript API のキー

## セットアップ

### バックエンド

```powershell
cd backend
py -3.12 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -r requirements.txt
copy .env.example .env   # 既定値のままで動作します
```

### フロントエンド

```powershell
cd frontend
npm install
copy .env.example .env   # VITE_GOOGLE_MAPS_API_KEY を設定
```

API キーは Google Cloud Console で発行し、HTTP リファラを `http://localhost:5173/*` に制限してください。

## 起動

ターミナルを 2 つ開いて、それぞれ実行します。

```powershell
# バックエンド
cd backend
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload --port 8000
```

```powershell
# フロントエンド
cd frontend
npm run dev
```

ブラウザで http://localhost:5173 を開きます。

データベース (`backend/zihanki.db`) と画像 (`backend/uploads/`) は初回起動時に自動で作成されます。

## テスト・チェック

```powershell
cd backend
.\.venv\Scripts\python.exe -m pytest

cd frontend
npm run build   # 型チェック + ビルド
npm run lint
```

## 旧実装について

移行前の Laravel 9 実装は Git の履歴（コミット `b44a581` 以前）で参照できます。
