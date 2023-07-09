import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  shareReplay,
  switchMap,
  take,
} from "rxjs/operators";

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
  private _URL = "https://beta.pokeapi.co/graphql/v1beta";
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
      previousSearch.sortOrder === currentSearch.sortOrder
  }

  private _getAllPokemonQuery(
    sortField: SortField,
    sortOrder: SortOrder,
  ): string {
    return `
query getAllPokemon($limit: Int!, $offset: Int, $name: String) {
  pokemon_v2_pokemon_aggregate(limit: $limit, offset: $offset, where: {name: {_regex: $name}}, order_by: { ${sortField}: ${sortOrder} }) {
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
  }

  constructor(private http: HttpClient) {}

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

  private getAllPokemon(pokemonSearch: PokemonSearch): Observable<any> {
    const { sortField, sortOrder, offset, name } = pokemonSearch;

    return this.http.post<any>(this._URL, {
      query: this._getAllPokemonQuery(sortField, sortOrder),
      variables: {
        offset: offset ? offset : this._INITIAL_OFFSET,
        limit: this._LIMIT,
        name: name ?? "",
      },
    }).pipe(map((d) => d?.data?.pokemon_v2_pokemon_aggregate.nodes));
  }
}
