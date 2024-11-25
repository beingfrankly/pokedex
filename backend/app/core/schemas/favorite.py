from sqlalchemy import Column, Integer
from backend.app.core.db import Base


class FavoriteInDb(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    pokemon_id = Column(Integer, nullable=False)

    # Could be expanded with a user_id
