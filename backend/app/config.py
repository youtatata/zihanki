from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict

# アップロードを許可する画像形式（Content-Type → 保存時の拡張子）
ALLOWED_IMAGE_TYPES = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
}
MAX_IMAGE_BYTES = 5 * 1024 * 1024  # 5MB

# 画像を配信するURLのプレフィックス
UPLOADS_URL_PREFIX = "/uploads"


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    database_url: str = "sqlite:///./zihanki.db"
    upload_dir: Path = Path("uploads")


settings = Settings()
