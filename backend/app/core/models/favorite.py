from pydantic import BaseModel

class Favorite(BaseModel):
    id: int
    pokemon_id: int

# When the app would have users this model would also have the user_id
class FavoriteCreate(BaseModel):
    pokemon_id: int
