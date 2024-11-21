from fastapi import APIRouter

from backend.app.api.routes import pokemon, favorites


api_router = APIRouter()
api_router.include_router(pokemon.router, prefix="/pokemon", tags=["pokemon"])
api_router.include_router(favorites.router, prefix="/favorites", tags=["favorites"])
