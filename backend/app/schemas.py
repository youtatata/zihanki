import datetime as dt

from pydantic import BaseModel


class VendingMachineOut(BaseModel):
    id: int
    lat: float
    lng: float
    image_url: str
    date: dt.date
    created_at: dt.datetime
