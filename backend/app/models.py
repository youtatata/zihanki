import datetime as dt

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class VendingMachine(Base):
    __tablename__ = "vending_machines"

    id: Mapped[int] = mapped_column(primary_key=True)
    lat: Mapped[float]
    lng: Mapped[float]
    image_path: Mapped[str]  # UPLOAD_DIR 内のファイル名
    date: Mapped[dt.date]
    created_at: Mapped[dt.datetime] = mapped_column(server_default=func.now())
