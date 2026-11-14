"""既存のデータベースに、後から追加した列を足す簡易マイグレーション。

create_all は既にあるテーブルを変更しないため、起動時に足りない列だけを ALTER TABLE で追加する。
"""

from sqlalchemy import Engine, inspect, text

from app.config import AREA_MAX_LENGTH, NAME_MAX_LENGTH
from app.models import VendingMachine

# 後から追加した列と、その定義（既存の行に入る既定値つき）
ADDED_COLUMNS = {
    "name": f"VARCHAR({NAME_MAX_LENGTH}) NOT NULL DEFAULT ''",
    "memo": "TEXT NOT NULL DEFAULT ''",
    "payment_methods": "JSON NOT NULL DEFAULT '[]'",
    "prefecture": f"VARCHAR({AREA_MAX_LENGTH}) NOT NULL DEFAULT ''",
    "city": f"VARCHAR({AREA_MAX_LENGTH}) NOT NULL DEFAULT ''",
}


def add_missing_columns(engine: Engine) -> None:
    table = VendingMachine.__tablename__
    existing = {column["name"] for column in inspect(engine).get_columns(table)}
    with engine.begin() as conn:
        for name, definition in ADDED_COLUMNS.items():
            if name not in existing:
                conn.execute(text(f"ALTER TABLE {table} ADD COLUMN {name} {definition}"))
