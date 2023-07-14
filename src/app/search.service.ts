import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, take } from 'rxjs/operators';
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
import { SortField } from './types/sort-field';
import { SortOrder } from './types/sort-order';
import { Pokemon, PokemonBase } from './types/pokemon';
import { getSortOrder } from './utils/sort-order';
import { mapToPokemon } from './mappers/pokemon.mapper';
import { mapToPokemonBase } from './mappers/pokemon-base.mapper';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _LIMIT = 20;
  private _INITIAL_OFFSET = 0;
  private _OFFSET_STEP = 20;
  private _INITIAL_POKEMON_SEARCH: PokemonSearch = {
    offset: this._INITIAL_OFFSET,
    limit: this._LIMIT,
    sortField: SortField.ID,
    sortOrder: SortOrder.ASC,
    name: '',
  };

  private _pokemonSearch: BehaviorSubject<PokemonSearch> =
    new BehaviorSubject<PokemonSearch>(this._INITIAL_POKEMON_SEARCH);

  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemons$: Observable<PokemonBase[]> = this.pokemonSearch$.pipe(
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    }),
  );

  constructor(private apollo: Apollo) {}

  searchPrevious(): void {
    this.pokemonSearch$
      .pipe(
        take(1),
        filter(
          (pokemonSearch: PokemonSearch) =>
            pokemonSearch.offset >= this._OFFSET_STEP,
        ),
      )
      .subscribe((pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          offset: pokemonSearch.offset - this._OFFSET_STEP,
        };
        this._pokemonSearch.next(newPokemonSearch);
      });
  }

  searchNext(): void {
    this.pokemonSearch$
      .pipe(take(1))
      .subscribe((pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          offset: pokemonSearch.offset + this._OFFSET_STEP,
        };
        this._pokemonSearch.next(newPokemonSearch);
      });
  }

  updateSorting(currentSortField: SortField): void {
    this.pokemonSearch$
      .pipe(take(1))
      .subscribe((pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          offset: 0,
          sortField: currentSortField,
          sortOrder: getSortOrder(
            pokemonSearch.sortField,
            currentSortField,
            pokemonSearch.sortOrder,
          ),
        };
        this._pokemonSearch.next(newPokemonSearch);
      });
  }

  updatePokemonSearch(newPokemonSearch: Partial<PokemonSearch>): void {
    this.pokemonSearch$
      .pipe(take(1))
      .subscribe((pokemonSearch: PokemonSearch) => {
        this._pokemonSearch.next({
          ...pokemonSearch,
          ...newPokemonSearch,
        });
      });
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
          limit: this._LIMIT,
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
