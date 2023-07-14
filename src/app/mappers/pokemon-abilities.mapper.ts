import { Pokemon_V2_Pokemonability } from 'graphql/generated';
import { PokemonAbility } from '../types/pokemon-ability';

export function mapToPokemonAbilities(
  pokemonAbilities: Pokemon_V2_Pokemonability[],
): PokemonAbility[] {
  return pokemonAbilities.map(
    (ability) =>
      ({
        id: ability.id,
        name: ability.pokemon_v2_ability?.name,
        description:
          ability.pokemon_v2_ability?.pokemon_v2_abilityflavortexts[0]
            ?.flavor_text,
      }) as PokemonAbility,
  );
}
