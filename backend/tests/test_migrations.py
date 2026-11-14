from sqlalchemy import create_engine, inspect, text

from app.migrations import ADDED_COLUMNS, add_missing_columns

# 詳細情報の列を追加する前のテーブル定義
OLD_SCHEMA = """
CREATE TABLE vending_machines (
    id INTEGER PRIMARY KEY,
    lat FLOAT NOT NULL,
    lng FLOAT NOT NULL,
    image_path VARCHAR NOT NULL,
    date DATE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
)
"""


def test_adds_missing_columns_and_keeps_existing_rows(tmp_path):
    engine = create_engine(f"sqlite:///{tmp_path / 'old.db'}")
    with engine.begin() as conn:
        conn.execute(text(OLD_SCHEMA))
        conn.execute(
            text("INSERT INTO vending_machines (lat, lng, image_path, date) VALUES (1, 2, 'a.png', '2026-01-01')")
        )

    add_missing_columns(engine)
    add_missing_columns(engine)  # 2回目は何もしない

    columns = {c["name"] for c in inspect(engine).get_columns("vending_machines")}
    assert set(ADDED_COLUMNS) <= columns
    with engine.connect() as conn:
        row = conn.execute(text("SELECT image_path, name, memo, payment_methods FROM vending_machines")).one()
    assert tuple(row) == ("a.png", "", "", "[]")
