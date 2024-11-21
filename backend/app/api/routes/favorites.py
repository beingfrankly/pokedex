from backend.app.core.repositories.favorite_repository import FavoriteRepository
from backend.app.core.schemas.favorite import FavoriteInDb
from fastapi import APIRouter, Depends, HTTPException, status
from backend.app.core.db import get_db
from backend.app.core.models.favorite import Favorite, FavoriteCreate
from sqlalchemy.orm import Session
from backend.app.core.exceptions.favorite import FavoriteAlreadyExistsError, FavoriteNotFoundError

router = APIRouter()


@router.get("/", response_model=list[Favorite])
def get_favorites(db: Session = Depends(get_db)) -> list[FavoriteInDb]:
    favorite_repository = FavoriteRepository(db)
    return favorite_repository.get_favorites()


@router.post("/", response_model=Favorite)
async def add_favorite(
    favorite: FavoriteCreate, db: Session = Depends(get_db)
) -> Favorite:
    try:
        favorite_repository = FavoriteRepository(db)
        return favorite_repository.add_favorite(favorite.pokemon_id)
    except FavoriteAlreadyExistsError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))


@router.delete(
    "/{pokemon_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    response_model=None
)
async def delete_favorite(
    pokemon_id: int, 
    db: Session = Depends(get_db)
) -> None:
    try:
        favorite_repository = FavoriteRepository(db)
        favorite_repository.delete_favorite(pokemon_id)
        return None
    except FavoriteNotFoundError as e:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str(e)
        )
