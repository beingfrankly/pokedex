from backend.app.core.schemas.favorite import Base
from sqlalchemy import create_engine, MetaData
from sqlalchemy.orm import sessionmaker


# SQLite-specific database URL
DATABASE_URL = "sqlite:///./pokedex.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def create_tables():
    Base.metadata.create_all(bind=engine)


