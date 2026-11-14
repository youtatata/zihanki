import datetime as dt
from typing import Annotated, Literal

from pydantic import BaseModel, Field, StringConstraints

from app.config import AREA_MAX_LENGTH, MEMO_MAX_LENGTH, NAME_MAX_LENGTH

# 支払い方法：現金／交通系IC・電子マネー／QRコード／クレジット
PaymentMethod = Literal["cash", "ic", "qr", "credit"]
AreaName = Annotated[str, StringConstraints(strip_whitespace=True, max_length=AREA_MAX_LENGTH)]


class VendingMachineFields(BaseModel):
    """登録・更新で受け取るフォームの項目（画像を除く）。"""

    lat: float = Field(ge=-90, le=90)
    lng: float = Field(ge=-180, le=180)
    date: dt.date
    name: Annotated[str, StringConstraints(strip_whitespace=True, max_length=NAME_MAX_LENGTH)] = ""
    memo: Annotated[str, StringConstraints(strip_whitespace=True, max_length=MEMO_MAX_LENGTH)] = ""
    payment_methods: list[PaymentMethod] = []
    # 地域は画面側で位置から調べて送る
    prefecture: AreaName = ""
    city: AreaName = ""


class VendingMachineOut(BaseModel):
    id: int
    lat: float
    lng: float
    image_url: str
    date: dt.date
    created_at: dt.datetime
    name: str
    memo: str
    payment_methods: list[PaymentMethod]
    prefecture: str
    city: str
