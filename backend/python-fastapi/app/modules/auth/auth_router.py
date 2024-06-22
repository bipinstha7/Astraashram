import os
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends, Response


from app.config.db import get_db
from .auth_service import AuthService
from app.utils.helper import set_cookie
from .auth_dto import CreateUserDTO, AuthResponse, SigninUserDTO

router = APIRouter()


@router.post("/sign-up/v1")
async def sign_up(
    response: Response, signUpDto: CreateUserDTO, db: Session = Depends(get_db)
) -> AuthResponse:

    sign_up_result = await AuthService.sign_up(db, signUpDto)

    cookie = sign_up_result.pop("cookie")
    result = sign_up_result

    set_cookie(
        response=response, cookie=cookie, expireHour=os.getenv("COOKIE_EXPIRATION_TIME")
    )

    return result


@router.post("/sign-in/v1")
async def sign_in(
    response: Response, signinDto: SigninUserDTO, db: Session = Depends(get_db)
) -> AuthResponse:

    sign_in_result = await AuthService.sign_in(db, signinDto)

    cookie = sign_in_result.pop("cookie")
    result = sign_in_result

    set_cookie(
        response=response, cookie=cookie, expireHour=os.getenv("COOKIE_EXPIRATION_TIME")
    )

    return result
