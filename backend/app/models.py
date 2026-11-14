import datetime as dt

from sqlalchemy import JSON, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.config import AREA_MAX_LENGTH, NAME_MAX_LENGTH
from app.database import Base


class VendingMachine(Base):
    __tablename__ = "vending_machines"

    id: Mapped[int] = mapped_column(primary_key=True)
    lat: Mapped[float]
    lng: Mapped[float]
    image_path: Mapped[str]  # UPLOAD_DIR 内のファイル名
    date: Mapped[dt.date]
    created_at: Mapped[dt.datetime] = mapped_column(server_default=func.now())

    # 詳細情報（任意）。既存データとの互換のため、未入力は空文字・空リストで持つ
    name: Mapped[str] = mapped_column(String(NAME_MAX_LENGTH), default="", server_default="")
    memo: Mapped[str] = mapped_column(Text, default="", server_default="")
    payment_methods: Mapped[list[str]] = mapped_column(JSON, default=list, server_default="[]")

    # 位置から調べた地域（一覧のまとめ表示用）。調べられなかった場合は空文字
    prefecture: Mapped[str] = mapped_column(String(AREA_MAX_LENGTH), default="", server_default="")
    city: Mapped[str] = mapped_column(String(AREA_MAX_LENGTH), default="", server_default="")
