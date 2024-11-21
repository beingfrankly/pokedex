from pydantic import BaseModel, Field, field_validator
from typing import List, Optional


class PokemonListItem(BaseModel):
    name: str
    id: int = Field(validation_alias="url")
    is_favorite: bool = False

    @field_validator("id", mode="before")
    @classmethod
    def extract_id_from_url(cls, url: str) -> int:
        # Extract the ID from the URL (gets the last part after "pokemon/")
        return int(url.rstrip("/").split("/")[-1])

    model_config = {
        "populate_by_name": True
    }


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
    types: List[PokemonType] = Field(validation_alias="types")
    stats: List[PokemonStat] = Field(validation_alias="stats")
    height: int
    weight: int
    base_experience: int
    abilities: List[str] = Field(validation_alias="abilities")
    is_favorite: bool = False

    @field_validator("types", mode="before")
    @classmethod
    def transform_types(cls, value: List[dict]) -> List[PokemonType]:
        return [PokemonType(name=t["type"]["name"]) for t in value]

    @field_validator("stats", mode="before")
    @classmethod
    def transform_stats(cls, value: List[dict]) -> List[PokemonStat]:
        return [
            PokemonStat(name=s["stat"]["name"], value=s["base_stat"])
            for s in value
        ]

    @field_validator("abilities", mode="before")
    @classmethod
    def transform_abilities(cls, value: List[dict]) -> List[str]:
        return [ability["ability"]["name"] for ability in value]

    model_config = {
        "populate_by_name": True
    }


class PokemonList(BaseModel):
    count: int
    next: Optional[int] = Field(default=None, validation_alias="next")
    previous: Optional[int] = Field(default=None, validation_alias="previous")
    pokemon: List[PokemonListItem] = Field(validation_alias="results")

    @field_validator("next", "previous", mode="before")
    @classmethod
    def extract_offset_from_url(cls, url: Optional[str]) -> Optional[int]:
        if not url:
            return None
        from urllib.parse import urlparse, parse_qs
        query_params = parse_qs(urlparse(url).query)
        return int(query_params["offset"][0])

    @field_validator("pokemon", mode="before")
    @classmethod
    def transform_results(cls, results: List[dict]) -> List[PokemonListItem]:
        return [
            PokemonListItem.model_validate({"name": item["name"], "url": item["url"]})
            for item in results
        ]

    model_config = {
        "populate_by_name": True
    }
