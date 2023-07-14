import { Pokemon_V2_Pokemon } from 'graphql/generated';
import { mapToPokemonAbilities } from './pokemon-abilities.mapper';
import { mapToPokemonEvolutions } from './pokemon-evolutions.mapper';
import { Pokemon } from '../types/pokemon';
import { mapToPokemonBase } from './pokemon-base.mapper';

export function mapToPokemon(pokemonResponse: Pokemon_V2_Pokemon): Pokemon {
  const {
    pokemon_v2_pokemonabilities,
    pokemon_v2_pokemonspecy,
  } = pokemonResponse;

  const pokemonBase = mapToPokemonBase(pokemonResponse);
  const abilities = mapToPokemonAbilities(pokemon_v2_pokemonabilities);
  const evolutions = mapToPokemonEvolutions(pokemon_v2_pokemonspecy);

  return {
    ...pokemonBase,
    abilities,
    evolutions,
  };
}
