import { gql } from "apollo-angular";

export const GET_ALL_POKEMON = gql`
query getAllPokemon($limit: Int!, $offset: Int, $order_by: [pokemon_v2_pokemon_order_by!], $where: pokemon_v2_pokemon_bool_exp) {
  pokemon_v2_pokemon_aggregate(limit: $limit, offset: $offset, where: $where, order_by: $order_by) {
    nodes {
      name
      id
      pokemon_species_id
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
        id
      }
    }
  }
}`;
