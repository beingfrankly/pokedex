from pydantic import BaseModel

class Favorite(BaseModel):
    id: int
    pokemon_id: int