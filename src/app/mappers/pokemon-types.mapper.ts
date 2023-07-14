import { Pokemon_V2_Pokemontype } from 'graphql/generated';
import { PokemonType } from '../types/pokemon-type';

export function mapToPokemonTypes(
  pokemonTypes: Pokemon_V2_Pokemontype[],
): PokemonType[] {
  return pokemonTypes.map(
    (type) =>
      ({
        id: type.pokemon_v2_type?.id,
        name: type.pokemon_v2_type?.name,
      }) as PokemonType,
  );
}
