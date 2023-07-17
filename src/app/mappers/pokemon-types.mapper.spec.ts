import { Pokemon_V2_Pokemontype } from 'graphql/generated';
import { PokemonType } from '../types/pokemon-type';
import { mapToPokemonTypes } from './pokemon-types.mapper';

describe('mapToPokemonTypes', () => {
  it('should return electric', () => {
    const pokemonTypes = [
      {
        pokemon_v2_type: {
          name: 'electric',
          id: 13,
          __typename: 'pokemon_v2_type',
        },
        __typename: 'pokemon_v2_pokemontype',
      },
    ] as Pokemon_V2_Pokemontype[];

    const expectedTypes: PokemonType[] = [
      {
        id: 13,
        name: 'electric',
      },
    ];

    const result = mapToPokemonTypes(pokemonTypes);
    expect(result).toEqual(expectedTypes);
  });
});
