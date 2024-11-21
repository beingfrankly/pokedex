from backend.app.core.db import get_db
from backend.app.core.repositories.favorite_repository import FavoriteRepository
from backend.app.core.schemas.favorite import FavoriteInDb
from fastapi import APIRouter, Request, Query, Depends, Response
from sqlalchemy.orm import Session
from typing import Annotated

from backend.app.core.models.pokemon import Pokemon, PokemonList


router = APIRouter()


@router.get("/", response_model=PokemonList)
async def get_pokemon(
    request: Request,
    db: Session = Depends(get_db),
    limit: Annotated[int, Query(ge=1, le=100)] = 10,
    offset: Annotated[int, Query(ge=0)] = 0,
) -> PokemonList:
    # Get Pokemon from API
    response = await request.state.client.get(
        "/", params={"limit": limit, "offset": offset}
    )
    pokemon_list = PokemonList.model_validate(response.json())

    # Get favorites from DB
    favorite_repository = FavoriteRepository(db)
    favorite_pokemon_ids = {f.pokemon_id for f in favorite_repository.get_favorites()}

    # Mark favorites
    for pokemon in pokemon_list.pokemon:
        pokemon.is_favorite = pokemon.id in favorite_pokemon_ids

    return pokemon_list


@router.get("/{pokemon_id}", response_model=Pokemon)
async def get_pokemon_by_id(
    pokemon_id: str, request: Request, db: Session = Depends(get_db)
) -> Pokemon:
    response = await request.state.client.get(pokemon_id)
    pokemon = Pokemon.model_validate(response.json())

    favorite_repository = FavoriteRepository(db)
    favorite_pokemon_ids = {f.pokemon_id for f in favorite_repository.get_favorites()}

    # Check if this pokemon is a favorite
    is_favorite = pokemon.id in favorite_pokemon_ids

    pokemon.is_favorite = is_favorite
    return pokemon
