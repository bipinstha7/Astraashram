from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from ..users.user_service import UsersService
from .auth_dto import CreateUserDTO, SigninUserDTO
from app.utils.helper import hash_password, create_jwt_access_token, verify_password


class AuthService:

    async def sign_up(db: Session, payload: CreateUserDTO):
        query = {"email": payload.email}
        user = UsersService.find_user(db, query)

        if user:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Email already exists",
            )

        hashedPassword = hash_password(payload.password)
        payload.password = hashedPassword

        createdUser = UsersService.create_user(db, payload)

        result = {"name": createdUser.name, "email": createdUser.email}

        return {
            **result,
            "cookie": create_jwt_access_token(
                {
                    **result,
                    "id": createdUser.id,
                }
            ),
        }

    async def sign_in(db: Session, payload: SigninUserDTO):
        query = {"email": payload.email}
        user = UsersService.find_user(
            db, query, select=["id", "name", "email", "password"]
        )

        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )

        password_Match = verify_password(payload.password, user.password)

        if not password_Match:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password",
            )

        result = {"name": user.name, "email": user.email}

        return {
            **result,
            "cookie": create_jwt_access_token({**result, "id": user.id}),
        }
