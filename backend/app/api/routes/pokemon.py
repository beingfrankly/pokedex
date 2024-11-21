from backend.app.core.db import get_db
from backend.app.core.schemas.favorite import FavoriteSchema
from fastapi import APIRouter, Request, Query, Depends
from sqlalchemy.orm import Session

from backend.app.models.pokemon import Pokemon, PokemonList


router = APIRouter()


@router.get("/")
async def get_pokemon(
    request: Request,
    db: Session = Depends(get_db),
    limit: int = Query(10, ge=1, le=100),
    offset: int = Query(0, ge=0),
):

    # Get favorites from DB
    favorite_pokemon_ids = {f.pokemon_id for f in db.query(FavoriteSchema).all()}

    # Get Pokemon from API
    response = await request.state.client.get(
        "/", params={"limit": limit, "offset": offset}
    )
    pokemon_list = PokemonList.from_api_response(response.json())

    # Mark favorites
    for pokemon in pokemon_list.pokemon:
        pokemon.is_favorite = pokemon.id in favorite_pokemon_ids

    return pokemon_list


@router.get("/{pokemon_id}")
async def get_pokemon_by_id(
    pokemon_id: str, request: Request, db: Session = Depends(get_db)
):
    response = await request.state.client.get(pokemon_id)
    pokemon = Pokemon.from_api_response(response.json())

    # Check if this pokemon is a favorite
    is_favorite = (
        db.query(FavoriteSchema).filter(FavoriteSchema.pokemon_id == pokemon.id).first()
        is not None
    )

    pokemon.is_favorite = is_favorite
    return pokemon
