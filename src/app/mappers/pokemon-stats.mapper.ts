import { Pokemon_V2_Pokemonstat } from 'graphql/generated';
import { PokemonStat } from '../types/pokemon-stat';

export function mapToPokemonStats(
  pokemonStats: Pokemon_V2_Pokemonstat[],
): PokemonStat[] {
  return pokemonStats.map(
    (stat) =>
      ({
        name: stat.pokemon_v2_stat?.name,
        baseStat: stat.base_stat,
      }) as PokemonStat,
  );
}
