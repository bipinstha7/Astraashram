from fastapi import APIRouter

from app.modules.auth import auth_router
from app.modules.users import user_router

api_router = APIRouter()


@api_router.get("/")
async def root():
    return {"message": "All is well"}


api_router.include_router(auth_router.router, prefix="/auth", tags=["auth"])
api_router.include_router(user_router.router, prefix="/users", tags=["users"])
# api_router.include_router(utils.router, prefix="/utils", tags=["utils"])
# api_router.include_router(items.router, prefix="/items", tags=["items"])
