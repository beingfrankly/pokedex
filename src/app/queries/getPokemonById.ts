import { gql } from 'apollo-angular';

export const GET_POKEMON_BY_ID = gql`
  query GetSinglePokemon($id: Int!) {
    pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      name
      id
      height
      base_experience
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
`;
