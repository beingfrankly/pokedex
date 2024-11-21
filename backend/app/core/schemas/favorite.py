from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class FavoriteSchema(Base):
    __tablename__ = "favorites"

    id = Column(Integer, primary_key=True, index=True)
    pokemon_id = Column(Integer, nullable=False)