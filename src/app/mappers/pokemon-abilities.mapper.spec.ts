import { Pokemon_V2_Pokemonability } from 'graphql/generated';
import { PokemonAbility } from '../types/pokemon-ability';
import { mapToPokemonAbilities } from './pokemon-abilities.mapper';

describe('mapToPokemonAbilities', () => {
  it('should return static & lightning-rod abilities', () => {
    const pokemonAbilities = [
      {
        id: 9,
        pokemon_v2_ability: {
          name: 'static',
          pokemon_v2_abilityflavortexts: [
            {
              flavor_text: 'Paralyzes on contact.',
              __typename: 'pokemon_v2_abilityflavortext',
            },
          ],
          __typename: 'pokemon_v2_ability',
        },
        __typename: 'pokemon_v2_pokemonability',
      },
      {
        id: 31,
        pokemon_v2_ability: {
          name: 'lightning-rod',
          pokemon_v2_abilityflavortexts: [
            {
              flavor_text: 'Draws electrical moves.',
              __typename: 'pokemon_v2_abilityflavortext',
            },
          ],
          __typename: 'pokemon_v2_ability',
        },
        __typename: 'pokemon_v2_pokemonability',
      },
    ] as Pokemon_V2_Pokemonability[];

    const expectedAbilities: PokemonAbility[] = [
      {
        id: 9,
        name: 'static',
        description: 'Paralyzes on contact.',
      },
      {
        id: 31,
        name: 'lightning-rod',
        description: 'Draws electrical moves.',
      },
    ];

    const result = mapToPokemonAbilities(pokemonAbilities);
    expect(result).toEqual(expectedAbilities);
  });
});
