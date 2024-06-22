from sqlalchemy.orm import Session

from .user_models import User
from ..auth.auth_dto import CreateUserDTO


class UsersService:

    def find_user(db: Session, query, select=["id"]):
        select_data = [getattr(User, field) for field in select if hasattr(User, field)]

        return db.query(*select_data).filter_by(**query).first()

    def create_user(db: Session, payload: CreateUserDTO):
        new_user = User(**payload.model_dump())
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        return new_user

    def delete_all_users(db: Session):
        db.query(User).delete()
        return db.commit()
