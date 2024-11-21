from backend.app.core.exceptions.favorite import FavoriteAlreadyExistsError, FavoriteNotFoundError
from backend.app.core.schemas.favorite import FavoriteInDb
from sqlalchemy.orm import Session

# With more time I would have used an abstract class to define the repository
class FavoriteRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_favorites(self) -> list[FavoriteInDb]:
        """Get all favorites."""
        return self.db.query(FavoriteInDb).all()

    def add_favorite(self, pokemon_id: int) -> FavoriteInDb:
        """Add a pokemon to favorites if not already favorited."""
        if self.db.query(FavoriteInDb).filter(FavoriteInDb.pokemon_id == pokemon_id).first():
            raise FavoriteAlreadyExistsError(pokemon_id)
        
        favorite = FavoriteInDb(pokemon_id=pokemon_id)
        self.db.add(favorite)
        self.db.commit()
        self.db.refresh(favorite)
        return favorite

    def delete_favorite(self, pokemon_id: int) -> None:
        """Delete a pokemon from favorites if it exists."""
        favorite = (
            self.db.query(FavoriteInDb)
            .filter(FavoriteInDb.pokemon_id == pokemon_id)
            .first()
        )
        if not favorite:
            raise FavoriteNotFoundError(pokemon_id)
            
        self.db.delete(favorite)
        self.db.commit()