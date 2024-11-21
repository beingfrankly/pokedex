class FavoriteAlreadyExistsError(Exception):
    """Raised when attempting to favorite a Pokemon that is already favorited."""
    def __init__(self, pokemon_id: int):
        self.pokemon_id = pokemon_id
        self.message = f"Pokemon with id {pokemon_id} is already favorited"
        super().__init__(self.message)

class FavoriteNotFoundError(Exception):
    """Raised when attempting to delete a Pokemon that is not favorited."""
    def __init__(self, pokemon_id: int):
        self.pokemon_id = pokemon_id
        self.message = f"Pokemon with id {pokemon_id} not found in favorites"
        super().__init__(self.message)