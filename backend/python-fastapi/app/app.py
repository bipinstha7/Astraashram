from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .config.db import engine, Base
from app.routes.main import api_router


Base.metadata.create_all(bind=engine)


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_methods=["*"],
    allow_headers=["*"],
    allow_credentials=True,
    allow_origins=["http://localhost:3000"],
)

app.include_router(api_router, prefix="/api")
