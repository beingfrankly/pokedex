import { Maybe, Pokemon_V2_Pokemonspecies } from 'graphql/generated';
import { PokemonEvolution } from '../types/pokemon-evolution';

export function mapToPokemonEvolutions(
  pokemonEvolutions: Maybe<Pokemon_V2_Pokemonspecies> | undefined,
): PokemonEvolution[] | undefined {
  return pokemonEvolutions?.pokemon_v2_evolutionchain?.pokemon_v2_pokemonspecies
    .map(
      (species) =>
        ({
          id: species.id,
          name: species.name,
          order: species?.order ?? 0,
        }) as PokemonEvolution,
    )
    .sort((a, b) => a.order - b.order);
}
