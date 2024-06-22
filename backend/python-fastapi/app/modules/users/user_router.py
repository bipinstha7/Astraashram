from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends


from app.config.db import get_db
from .user_service import UsersService

router = APIRouter()


@router.get("/delete-all/v1")
async def sign_up(db: Session = Depends(get_db)):
    delete_all = UsersService.delete_all_users(db)
    return delete_all
