import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import {
  Pokemon_V2_Pokemon_Bool_Exp,
  Pokemon_V2_Type,
  Query_Root,
} from 'graphql/generated';
import { GET_ALL_POKEMON } from './queries/getAllPokemon';
import { GET_POKEMON_BY_ID } from './queries/getPokemonById';
import { GET_POKEMON_TYPES } from './queries/getPokemonTypes';
import { PokemonType } from './types/pokemon-type';
import { PokemonSearch } from './types/pokemon-search';
import { Pokemon, PokemonBase } from './types/pokemon';
import { mapToPokemon } from './mappers/pokemon.mapper';
import { mapToPokemonBase } from './mappers/pokemon-base.mapper';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _pokemonSearch: ReplaySubject<PokemonSearch> =
    new ReplaySubject<PokemonSearch>(1);

  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemons$: Observable<PokemonBase[]> = this.pokemonSearch$.pipe(
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    }),
  );

  constructor(private apollo: Apollo) {}

  updatePokemonSearch(nextPokemonSearch: PokemonSearch): void {
    this._pokemonSearch.next(nextPokemonSearch);
  }

  getPokemonTypes(): Observable<PokemonType[]> {
    return this.apollo
      .query<Query_Root>({
        query: GET_POKEMON_TYPES,
      })
      .pipe(
        map((value) => {
          const pokemonTypes: Pokemon_V2_Type[] = value?.data?.pokemon_v2_type;
          return pokemonTypes.map((pokemonType) => ({
            id: pokemonType.id,
            name: pokemonType.name,
          }));
        }),
      );
  }

  private getAllPokemon(
    pokemonSearch: PokemonSearch,
  ): Observable<PokemonBase[]> {
    return this.apollo
      .query<Query_Root>({
        query: GET_ALL_POKEMON,
        variables: {
          limit: pokemonSearch.limit,
          where: this.getWhereBy(pokemonSearch),
          offset: pokemonSearch.offset,
          order_by: [
            {
              [pokemonSearch.sortField]: pokemonSearch.sortOrder,
            },
          ],
        },
      })
      .pipe(
        map(
          (value) =>
            value?.data?.pokemon_v2_pokemon.map((pk) => mapToPokemonBase(pk)),
        ),
      );
  }

  getWhereBy(pokemonSearch: PokemonSearch) {
    const pokemonName: Pokemon_V2_Pokemon_Bool_Exp = {
      name: {
        _regex: pokemonSearch?.name ?? '',
      },
    };

    const pokemonTypeValue: number | undefined =
      pokemonSearch?.type && pokemonSearch?.type !== 0
        ? pokemonSearch?.type
        : undefined;

    const pokemonType: Pokemon_V2_Pokemon_Bool_Exp = {
      pokemon_v2_pokemontypes: {
        pokemon_v2_type: {
          id: {
            _eq: pokemonTypeValue,
          },
        },
      },
    };

    return {
      ...pokemonName,
      ...pokemonType,
    };
  }

  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.apollo
      .query<Query_Root>({
        query: GET_POKEMON_BY_ID,
        variables: {
          id: pokemonId,
        },
      })
      .pipe(
        map((value) => {
          return mapToPokemon(value.data.pokemon_v2_pokemon[0]);
        }),
      );
  }
}
