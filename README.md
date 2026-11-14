# 自販機マップ (zihanki)

自動販売機の位置を地図上にピンで登録し、写真を表示する Web アプリです。

| 画面 | URL | 内容 |
|---|---|---|
| ホーム | `/` | 登録済みのピンを表示（密集時は件数の丸にまとめる）。ピンを選ぶと写真と詳細を表示 |
| 一覧 | `/list` | 登録内容を写真付きカードで一覧表示。選ぶとホームでその場所を表示 |
| 追加 | `/create` | 地図中央の照準位置に、写真と詳細情報付きでピンを登録 |
| 編集 | `/edit` | ピンを選んで編集・削除 |
| ピン編集 | `/edit/:id` | 位置・写真・詳細情報を修正 |

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
| POST | `/api/vending-machines` | 登録（multipart。下記の項目 + `image`） |
| PUT | `/api/vending-machines/{id}` | 更新（multipart。下記の項目。`image` は送ったときだけ差し替え、古い画像は削除） |
| DELETE | `/api/vending-machines/{id}` | 削除（画像ファイルも削除） |

登録・更新の項目: `lat`, `lng`, `date`（必須）、`name`（50文字以内）、`memo`（500文字以内）、`payment_methods`（`cash` / `ic` / `qr` / `credit` を複数指定可）。画像は JPEG/PNG/WebP・5MB 以下。

後から追加した列は、バックエンド起動時に既存のデータベースへ自動で追加されます（`app/migrations.py`）。

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
