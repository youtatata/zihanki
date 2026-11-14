import uuid

from app.config import settings


def save_image(data: bytes, extension: str) -> str:
    """画像を UPLOAD_DIR に一意な名前で保存し、そのファイル名を返す。"""
    settings.upload_dir.mkdir(parents=True, exist_ok=True)
    filename = f"{uuid.uuid4().hex}{extension}"
    (settings.upload_dir / filename).write_bytes(data)
    return filename


def delete_image(filename: str) -> None:
    (settings.upload_dir / filename).unlink(missing_ok=True)
