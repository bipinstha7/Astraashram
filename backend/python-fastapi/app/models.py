from .config.db import engine
from app.modules.users.user_models import User

User.Base.metadata.create_all(bind=engine)
