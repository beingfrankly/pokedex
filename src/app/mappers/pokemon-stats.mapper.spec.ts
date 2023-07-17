import { Pokemon_V2_Pokemonstat } from 'graphql/generated';
import { PokemonStat } from '../types/pokemon-stat';
import { mapToPokemonStats } from './pokemon-stats.mapper';

describe('mapToPokemonStats', () => {
  it('should return an array of stats', () => {
    const pokemonStats = [
      {
        pokemon_v2_stat: {
          name: 'hp',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 35,
        __typename: 'pokemon_v2_pokemonstat',
      },
      {
        pokemon_v2_stat: {
          name: 'attack',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 55,
        __typename: 'pokemon_v2_pokemonstat',
      },
      {
        pokemon_v2_stat: {
          name: 'defense',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 40,
        __typename: 'pokemon_v2_pokemonstat',
      },
      {
        pokemon_v2_stat: {
          name: 'special-attack',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 50,
        __typename: 'pokemon_v2_pokemonstat',
      },
      {
        pokemon_v2_stat: {
          name: 'special-defense',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 50,
        __typename: 'pokemon_v2_pokemonstat',
      },
      {
        pokemon_v2_stat: {
          name: 'speed',
          __typename: 'pokemon_v2_stat',
        },
        base_stat: 90,
        __typename: 'pokemon_v2_pokemonstat',
      },
    ] as Pokemon_V2_Pokemonstat[];

    const expectedStats: PokemonStat[] = [
      {
        name: 'hp',
        baseStat: 35,
      },
      {
        name: 'attack',
        baseStat: 55,
      },
      {
        name: 'defense',
        baseStat: 40,
      },
      {
        name: 'special-attack',
        baseStat: 50,
      },
      {
        name: 'special-defense',
        baseStat: 50,
      },
      {
        name: 'speed',
        baseStat: 90,
      },
    ];

    const result = mapToPokemonStats(pokemonStats);
    expect(result).toEqual(expectedStats);
  });
});
