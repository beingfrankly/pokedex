import { gql } from 'apollo-angular';

export const GET_POKEMON_TYPES = gql`
  query getPokemonTypes {
    pokemon_v2_type {
      name
      id
    }
  }
`;
