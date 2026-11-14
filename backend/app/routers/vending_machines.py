import datetime as dt
from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import storage
from app.config import ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, UPLOADS_URL_PREFIX
from app.database import get_db
from app.models import VendingMachine
from app.schemas import VendingMachineOut

router = APIRouter(prefix="/api/vending-machines", tags=["vending-machines"])

DbSession = Annotated[Session, Depends(get_db)]


def to_out(machine: VendingMachine) -> VendingMachineOut:
    return VendingMachineOut(
        id=machine.id,
        lat=machine.lat,
        lng=machine.lng,
        image_url=f"{UPLOADS_URL_PREFIX}/{machine.image_path}",
        date=machine.date,
        created_at=machine.created_at,
    )


@router.get("", response_model=list[VendingMachineOut])
def list_vending_machines(db: DbSession) -> list[VendingMachineOut]:
    machines = db.scalars(select(VendingMachine).order_by(VendingMachine.id))
    return [to_out(m) for m in machines]


@router.post("", response_model=VendingMachineOut, status_code=status.HTTP_201_CREATED)
async def create_vending_machine(
    db: DbSession,
    lat: Annotated[float, Form(ge=-90, le=90)],
    lng: Annotated[float, Form(ge=-180, le=180)],
    date: Annotated[dt.date, Form()],
    image: Annotated[UploadFile, File()],
) -> VendingMachineOut:
    extension = ALLOWED_IMAGE_TYPES.get(image.content_type or "")
    if extension is None:
        raise HTTPException(
            status.HTTP_422_UNPROCESSABLE_CONTENT, "画像は JPEG / PNG / WebP のみ登録できます"
        )

    # 上限 +1 バイトまで読み、超えていればサイズオーバーと判定する
    data = await image.read(MAX_IMAGE_BYTES + 1)
    if len(data) > MAX_IMAGE_BYTES:
        raise HTTPException(
            status.HTTP_413_CONTENT_TOO_LARGE, "画像サイズは 5MB 以下にしてください"
        )

    filename = storage.save_image(data, extension)
    machine = VendingMachine(lat=lat, lng=lng, date=date, image_path=filename)
    db.add(machine)
    db.commit()
    db.refresh(machine)
    return to_out(machine)


@router.delete("/{machine_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vending_machine(machine_id: int, db: DbSession) -> None:
    machine = db.get(VendingMachine, machine_id)
    if machine is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "指定の自販機が見つかりません")

    db.delete(machine)
    db.commit()
    storage.delete_image(machine.image_path)
