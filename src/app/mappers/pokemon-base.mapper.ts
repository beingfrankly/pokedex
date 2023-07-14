import { Pokemon_V2_Pokemon } from 'graphql/generated';
import { mapToPokemonStats } from './pokemon-stats.mapper';
import { mapToPokemonTypes } from './pokemon-types.mapper';
import { PokemonBase } from '../types/pokemon';

export function mapToPokemonBase(
  pokemonResponse: Pokemon_V2_Pokemon,
): PokemonBase {
  const { pokemon_v2_pokemontypes, pokemon_v2_pokemonstats } = pokemonResponse;

  const types = mapToPokemonTypes(pokemon_v2_pokemontypes);
  const stats = mapToPokemonStats(pokemon_v2_pokemonstats);

  return {
    id: pokemonResponse.id,
    name: pokemonResponse.name,
    height: pokemonResponse?.height ?? 0,
    baseExperience: pokemonResponse?.base_experience ?? 0,
    types,
    stats,
  };
}
