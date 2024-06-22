import re
from typing import Annotated
from pydantic import BaseModel, EmailStr, StringConstraints, field_validator, Field


class CreateUserDTO(BaseModel):
    name: Annotated[
        str, StringConstraints(strip_whitespace=True, min_length=5, max_length=50)
    ]
    email: Annotated[
        EmailStr, StringConstraints(strip_whitespace=True, min_length=8, to_lower=True)
    ]
    password: str

    @field_validator("password")
    def password_complexity(cls, v):
        pattern = re.compile(
            r"^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[.@$!%*#?&])[A-Za-z\d.@$!%*#?&]{8,}$"
        )
        if not pattern.match(v):
            raise ValueError(
                "Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, one number, and one special character"
            )
        return v


class AuthResponse(BaseModel):
    name: str
    email: EmailStr


class SigninUserDTO(BaseModel):
    email: Annotated[EmailStr, StringConstraints(strip_whitespace=True, to_lower=True)]
    password: str
