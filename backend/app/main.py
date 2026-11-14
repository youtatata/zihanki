from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from app.config import UPLOADS_URL_PREFIX, settings
from app.database import Base, engine
from app.migrations import add_missing_columns
from app.routers import vending_machines


@asynccontextmanager
async def lifespan(_app: FastAPI):
    # 小規模アプリのため、マイグレーションツールは使わず起動時にテーブルを作成する
    Base.metadata.create_all(engine)
    add_missing_columns(engine)
    yield


settings.upload_dir.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="zihanki API", lifespan=lifespan)
app.include_router(vending_machines.router)
app.mount(UPLOADS_URL_PREFIX, StaticFiles(directory=settings.upload_dir), name="uploads")
