import { Maybe, Pokemon_V2_Pokemonspecies } from 'graphql/generated';
import { PokemonEvolution } from '../types/pokemon-evolution';
import { mapToPokemonEvolutions } from './pokemon-evolutions.mapper';

describe('mapToPokemonEvolutions', () => {
  it('should return pichu, pikachu and raichu', () => {
    const pokemonEvolutions = {
      pokemon_v2_evolutionchain: {
        pokemon_v2_pokemonspecies: [
          {
            name: 'pikachu',
            order: 26,
            id: 25,
            __typename: 'pokemon_v2_pokemonspecies',
          },
          {
            name: 'raichu',
            order: 27,
            id: 26,
            __typename: 'pokemon_v2_pokemonspecies',
          },
          {
            name: 'pichu',
            order: 25,
            id: 172,
            __typename: 'pokemon_v2_pokemonspecies',
          },
        ],
        __typename: 'pokemon_v2_evolutionchain',
      },
      __typename: 'pokemon_v2_pokemonspecies',
    } as Maybe<Pokemon_V2_Pokemonspecies> | undefined;

    const expectedEvolutions: PokemonEvolution[] = [
      {
        id: 172,
        name: 'pichu',
        order: 25,
      },
      {
        id: 25,
        name: 'pikachu',
        order: 26,
      },
      {
        id: 26,
        name: 'raichu',
        order: 27,
      },
    ];

    const result = mapToPokemonEvolutions(pokemonEvolutions);
    expect(result).toEqual(expectedEvolutions);
  });

  it('should return undefined if no evolutions are provided', () => {
    const pokemonEvolutions = undefined;

    const result = mapToPokemonEvolutions(pokemonEvolutions);
    expect(result).toBeUndefined();
  });

  it('should return undefined if evolution chain is missing', () => {
    const pokemonEvolutions = {
      __typename: 'pokemon_v2_pokemonspecies',
    } as Maybe<Pokemon_V2_Pokemonspecies> | undefined;

    const result = mapToPokemonEvolutions(pokemonEvolutions);
    expect(result).toBeUndefined();
  });
});
