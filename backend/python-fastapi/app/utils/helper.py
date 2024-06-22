import os
import jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta, timezone


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def create_jwt_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            hours=int(os.getenv("JWT_EXPIRATION_TIME"))
        )

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, os.getenv("JWT_SECRET_KEY"), algorithm=os.getenv("JWT_ALGORITHM")
    )

    return encoded_jwt


def decode_jwt(token):
    jwt.decode(
        token, os.getenv("JWT_SECRET_KEY"), algorithms=[os.getenv("JWT_ALGORITHM")]
    )


def set_cookie(response, cookie, expireHour):
    response.set_cookie(
        key="access_token",
        value=cookie,
        secure=True,
        httponly=True,
        samesite="lax",
        expires=expireHour * 60 * 60,
    )
