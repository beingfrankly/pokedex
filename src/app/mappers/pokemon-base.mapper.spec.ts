import { PokemonBase } from '../types/pokemon';
import { mapToPokemonBase } from './pokemon-base.mapper';
import { Pokemon_V2_Pokemon } from 'graphql/generated';

describe('mapToPokemonBase', () => {
  it('should return a PokemonBase object with Pikachu', () => {
    const pokemonResponse = {
      id: 25,
      name: 'pikachu',
      height: 4,
      base_experience: 112,
      pokemon_v2_pokemontypes: [
        {
          pokemon_v2_type: {
            name: 'electric',
            id: 13,
            __typename: 'pokemon_v2_type',
          },
          __typename: 'pokemon_v2_pokemontype',
        },
      ],
      pokemon_v2_pokemonstats: [
        {
          pokemon_v2_stat: {
            name: 'hp',
            __typename: 'pokemon_v2_stat',
          },
          base_stat: 35,
          __typename: 'pokemon_v2_pokemonstat',
        },
        // Add more sample stats as needed
      ],
    } as Pokemon_V2_Pokemon;

    const expectedBaseData: PokemonBase = {
      id: 25,
      name: 'pikachu',
      height: 4,
      baseExperience: 112,
      types: [
        {
          id: 13,
          name: 'electric',
        },
      ],
      stats: [
        {
          name: 'hp',
          baseStat: 35,
        },
        // Add more expected stats as needed
      ],
    };

    // Mock the helper functions
    jest.mock('./pokemon-stats.mapper', () => ({
      mapToPokemonStats: jest.fn(() => expectedBaseData.stats),
    }));

    jest.mock('./pokemon-types.mapper', () => ({
      mapToPokemonTypes: jest.fn(() => expectedBaseData.types),
    }));

    const result = mapToPokemonBase(pokemonResponse);
    expect(result).toEqual(expectedBaseData);
  });
});
