from backend.app.core.schemas.favorite import FavoriteSchema
from fastapi import APIRouter, Depends, HTTPException
from backend.app.core.db import get_db
from backend.app.models.favorite import Favorite
from sqlalchemy.orm import Session

router = APIRouter()



@router.get("/", response_model=list[Favorite])
def get_favorites(db: Session = Depends(get_db)):
    favorites = db.query(FavoriteSchema).all()
    return [{"id": f.id, "pokemon_id": f.pokemon_id} for f in favorites] or []


@router.post("/", response_model=dict)
def add_favorite(pokemon_id: int, db: Session = Depends(get_db)):
    # Check if the Pokémon is already in favorites
    if db.query(FavoriteSchema).filter(FavoriteSchema.pokemon_id == pokemon_id).first():
        raise HTTPException(status_code=400, detail="Pokemon already favorited")

    favorite = FavoriteSchema(pokemon_id=pokemon_id)
    db.add(favorite)
    db.commit()
    db.refresh(favorite)
    return {"id": favorite.id, "pokemon_id": favorite.pokemon_id}


@router.delete("/{pokemon_id}", response_model=dict)
def delete_favorite(pokemon_id: int, db: Session = Depends(get_db)):
    favorite = (
        db.query(FavoriteSchema).filter(FavoriteSchema.pokemon_id == pokemon_id).first()
    )
    if not favorite:
        raise HTTPException(status_code=404, detail="Pokemon not found in favorites")

    db.delete(favorite)
    db.commit()
    return {"message": "Favorite deleted"}
