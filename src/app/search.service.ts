import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable } from "rxjs";
import { filter, map, shareReplay, switchMap, take } from "rxjs/operators";

type PokemonSearch = {
  offset: number;
  limit: number;
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
  });
  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemons$ = this.pokemonSearch$.pipe(
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    }),
  );

  private _getAllPokemonQuery = `
query getAllPokemon($limit: Int!, $offset: Int) {
  pokemon_v2_pokemon_aggregate(limit: $limit, offset: $offset) {
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

  private getAllPokemon(pokemonSearch: PokemonSearch): Observable<any> {
    return this.http.post<any>(this._URL, {
      query: this._getAllPokemonQuery,
      variables: {
        offset: pokemonSearch?.offset
          ? pokemonSearch.offset
          : this._INITIAL_OFFSET,
        limit: this._LIMIT,
      },
    }).pipe(map((d) => d?.data?.pokemon_v2_pokemon_aggregate.nodes));
  }
}
