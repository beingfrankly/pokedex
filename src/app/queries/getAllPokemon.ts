import { gql } from 'apollo-angular';

export const GET_ALL_POKEMON = gql`
  query getAllPokemon(
    $limit: Int!
    $offset: Int
    $order_by: [pokemon_v2_pokemon_order_by!]
    $where: pokemon_v2_pokemon_bool_exp
  ) {
    pokemon_v2_pokemon(
      limit: $limit
      offset: $offset
      where: $where
      order_by: $order_by
    ) {
      name
      id
      height
      base_experience
      pokemon_species_id
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          id
          name
          pokemon_v2_abilityflavortexts(
            where: { language_id: { _eq: 9 } }
            distinct_on: ability_id
          ) {
            flavor_text
          }
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
          id
        }
        id
      }
      pokemon_v2_pokemonstats {
        pokemon_v2_stat {
          name
        }
        base_stat
      }
    }
  }
`;
