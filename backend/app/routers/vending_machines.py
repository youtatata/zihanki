from typing import Annotated

from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy import select
from sqlalchemy.orm import Session

from app import storage
from app.config import ALLOWED_IMAGE_TYPES, MAX_IMAGE_BYTES, UPLOADS_URL_PREFIX
from app.database import get_db
from app.models import VendingMachine
from app.schemas import VendingMachineFields, VendingMachineOut

router = APIRouter(prefix="/api/vending-machines", tags=["vending-machines"])

DbSession = Annotated[Session, Depends(get_db)]
FormFields = Annotated[VendingMachineFields, Form()]


def to_out(machine: VendingMachine) -> VendingMachineOut:
    return VendingMachineOut(
        id=machine.id,
        lat=machine.lat,
        lng=machine.lng,
        image_url=f"{UPLOADS_URL_PREFIX}/{machine.image_path}",
        date=machine.date,
        created_at=machine.created_at,
        name=machine.name,
        memo=machine.memo,
        payment_methods=machine.payment_methods,
        prefecture=machine.prefecture,
        city=machine.city,
    )


def get_or_404(db: Session, machine_id: int) -> VendingMachine:
    machine = db.get(VendingMachine, machine_id)
    if machine is None:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "指定の自販機が見つかりません")
    return machine


async def save_uploaded_image(image: UploadFile) -> str:
    """形式とサイズを確認して画像を保存し、保存したファイル名を返す。"""
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
    return storage.save_image(data, extension)


@router.get("", response_model=list[VendingMachineOut])
def list_vending_machines(db: DbSession) -> list[VendingMachineOut]:
    machines = db.scalars(select(VendingMachine).order_by(VendingMachine.id))
    return [to_out(m) for m in machines]


@router.post("", response_model=VendingMachineOut, status_code=status.HTTP_201_CREATED)
async def create_vending_machine(
    db: DbSession,
    fields: FormFields,
    image: Annotated[UploadFile, File()],
) -> VendingMachineOut:
    filename = await save_uploaded_image(image)
    machine = VendingMachine(**fields.model_dump(), image_path=filename)
    db.add(machine)
    db.commit()
    db.refresh(machine)
    return to_out(machine)


@router.put("/{machine_id}", response_model=VendingMachineOut)
async def update_vending_machine(
    machine_id: int,
    db: DbSession,
    fields: FormFields,
    image: Annotated[UploadFile | None, File()] = None,
) -> VendingMachineOut:
    """位置と詳細情報を更新する。画像は送られたときだけ差し替える。"""
    machine = get_or_404(db, machine_id)

    old_image_path = machine.image_path
    if image is not None:
        machine.image_path = await save_uploaded_image(image)
    for key, value in fields.model_dump().items():
        setattr(machine, key, value)
    db.commit()
    db.refresh(machine)

    # DB の更新が済んでから古い画像を消す（途中で失敗しても画像が欠けないように）
    if machine.image_path != old_image_path:
        storage.delete_image(old_image_path)
    return to_out(machine)


@router.delete("/{machine_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_vending_machine(machine_id: int, db: DbSession) -> None:
    machine = get_or_404(db, machine_id)
    db.delete(machine)
    db.commit()
    storage.delete_image(machine.image_path)
