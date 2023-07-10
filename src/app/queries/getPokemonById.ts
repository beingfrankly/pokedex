import { gql } from "apollo-angular";

export const GET_POKEMON_BY_ID = gql`
query GetSinglePokemon($id: Int!) {
  pokemon_v2_pokemon_aggregate(where: {id: {_eq: $id}}) {
    nodes {
      name
      id
      height
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
          pokemon_v2_moves(where: {generation_id: {_eq: 1}}) {
            name
            power
            generation_id
            accuracy
          }
        }
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            name
            order
            id
          }
        }
      }
    }
  }
}
`;
