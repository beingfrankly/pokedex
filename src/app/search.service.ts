import { Apollo } from "apollo-angular";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from "rxjs/operators";
import {
  Pokemon_V2_Pokemon,
} from "graphql/generated";
import { GET_ALL_POKEMON } from "./queries/getAllPokemon";
import { GET_POKEMON_BY_ID } from "./queries/getPokemonById";

export type Pokemon = {
  id: string;
  name: string;
};

export enum SortField {
  ID = "id",
  NAME = "name",
}

export enum SortOrder {
  ASC = "asc",
  DESC = "desc",
}

export type PokemonSearch = {
  offset: number;
  limit: number;
  sortField: SortField;
  sortOrder: SortOrder;
  name?: string;
};

@Injectable({
  providedIn: "root",
})
export class SearchService {
  private _LIMIT = 20;
  private _INITIAL_OFFSET = 0;
  private _OFFSET_STEP = 20;

  private _pokemonSearch: BehaviorSubject<PokemonSearch> = new BehaviorSubject<
    PokemonSearch
  >({
    offset: this._INITIAL_OFFSET,
    limit: this._LIMIT,
    sortField: SortField.ID,
    sortOrder: SortOrder.ASC,
  });

  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemons$ = this.pokemonSearch$.pipe(
    distinctUntilChanged((prev, curr) => this.isSameSearch(prev, curr)),
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    }),
  );

  isSameSearch(
    previousSearch: PokemonSearch,
    currentSearch: PokemonSearch,
  ): boolean {
    return previousSearch.name === currentSearch.name &&
      previousSearch.offset === currentSearch.offset &&
      previousSearch.sortField === currentSearch.sortField &&
      previousSearch.sortOrder === currentSearch.sortOrder;
  }

  constructor(private apollo: Apollo) {}

  searchPrevious(): void {
    this.pokemonSearch$.pipe(
      take(1),
      filter((pokemonSearch: PokemonSearch) =>
        pokemonSearch.offset >= this._OFFSET_STEP
      ),
    ).subscribe((pokemonSearch: PokemonSearch) => {
      const newPokemonSearch = {
        ...pokemonSearch,
        offset: pokemonSearch.offset - this._OFFSET_STEP,
      };
      this._pokemonSearch.next(newPokemonSearch);
    });
  }

  searchNext(): void {
    this.pokemonSearch$.pipe(take(1)).subscribe(
      (pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          offset: pokemonSearch.offset + this._OFFSET_STEP,
        };
        this._pokemonSearch.next(newPokemonSearch);
      },
    );
  }

  searchOnName(pokemonName: Pick<PokemonSearch, "name">): void {
    this.pokemonSearch$.pipe(take(1)).subscribe(
      (pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          name: pokemonName.name,
        };
        this._pokemonSearch.next(newPokemonSearch);
      },
    );
  }

  updateSorting(currentSortField: SortField): void {
    this.pokemonSearch$.pipe(take(1)).subscribe(
      (pokemonSearch: PokemonSearch) => {
        const newPokemonSearch = {
          ...pokemonSearch,
          offset: 0,
          sortField: currentSortField,
          sortOrder: this.getNextSortOrder(
            pokemonSearch.sortField,
            currentSortField,
            pokemonSearch.sortOrder,
          ),
        };
        this._pokemonSearch.next(newPokemonSearch);
      },
    );
  }

  getNextSortOrder(
    previousSortField: SortField,
    currentSortField: SortField,
    previousSortOrder: SortOrder,
  ): SortOrder {
    if (previousSortField !== currentSortField) {
      return SortOrder.ASC;
    } else if (
      previousSortField === currentSortField &&
      previousSortOrder === SortOrder.DESC
    ) {
      return SortOrder.ASC;
    } else {
      return SortOrder.DESC;
    }
  }

  private getAllPokemon(
    pokemonSearch: PokemonSearch,
  ): Observable<Pokemon_V2_Pokemon[]> {
    return this.apollo.query<any>({
      query: GET_ALL_POKEMON,
      variables: {
        limit: this._LIMIT,
        name: pokemonSearch?.name ?? "",
        order_by: [{
          [pokemonSearch.sortField]: pokemonSearch.sortOrder,
        }],
      },
    }).pipe(
      map((value) => value?.data?.pokemon_v2_pokemon_aggregate?.nodes),
    );
  }

  getPokemonById(pokemonId: number): Observable<any> {
    return this.apollo.query<any>({
      query: GET_POKEMON_BY_ID,
      variables: {
        id: pokemonId,
      },
    }).pipe(
      map((value) => {
        const pokemon: Pokemon_V2_Pokemon = value?.data
          ?.pokemon_v2_pokemon_aggregate?.nodes[0];

        return pokemon;
      }),
    );
  }
}
