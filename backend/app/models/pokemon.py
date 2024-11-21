from pydantic import BaseModel, Field
from typing import List, Optional


class PokemonListItem(BaseModel):
    name: str
    id: int
    is_favorite: bool = False

    @classmethod
    def from_api_response(cls, name: str, url: str) -> "PokemonListItem":
        # Extract the ID from the URL (gets the last part after "pokemon/")
        pokemon_id = int(url.rstrip("/").split("/")[-1])
        return cls(name=name, id=pokemon_id)


class PokemonType(BaseModel):
    name: str
    url: str


class PokemonType(BaseModel):
    name: str


class PokemonStat(BaseModel):
    name: str
    value: int


class Pokemon(BaseModel):
    id: int
    name: str
    types: List[PokemonType]
    stats: List[PokemonStat]
    height: int
    weight: int
    base_experience: int = Field(alias="base_experience")
    abilities: List[str]  # Just the ability names
    is_favorite: bool = False

    @classmethod
    def from_api_response(cls, data: dict) -> "Pokemon":
        return cls(
            id=data["id"],
            name=data["name"],
            types=[PokemonType(name=t["type"]["name"]) for t in data["types"]],
            stats=[
                PokemonStat(name=s["stat"]["name"], value=s["base_stat"])
                for s in data["stats"]
            ],
            height=data["height"],
            weight=data["weight"],
            base_experience=data["base_experience"],
            abilities=[ability["ability"]["name"] for ability in data["abilities"]],
        )


class PokemonList(BaseModel):
    count: int
    next: Optional[int] = None
    previous: Optional[int] = None
    pokemon: List[PokemonListItem]

    @classmethod
    def from_api_response(cls, data: dict) -> "PokemonList":
        # Extract offset from URLs or return None if URL is None
        def get_offset_from_url(url: Optional[str]) -> Optional[int]:
            if not url:
                return None
            from urllib.parse import urlparse, parse_qs

            query_params = parse_qs(urlparse(url).query)
            return int(query_params["offset"][0])

        transformed_results = [
            PokemonListItem.from_api_response(item["name"], item["url"])
            for item in data["results"]
        ]

        return cls(
            count=data["count"],
            next=get_offset_from_url(data["next"]),
            previous=get_offset_from_url(data["previous"]),
            pokemon=transformed_results,
        )
