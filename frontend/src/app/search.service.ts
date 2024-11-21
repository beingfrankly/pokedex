import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, switchMap } from 'rxjs/operators';
import { PokemonType } from './types/pokemon-type';
import { PokemonSearch } from './types/pokemon-search';
import { Pokemon, PokemonBase, PokemonList } from './types/pokemon';
import { HttpClient, HttpParams } from '@angular/common/http';
import { buildParams } from './utils/http-params';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _pokemonSearch: ReplaySubject<PokemonSearch> =
    new ReplaySubject<PokemonSearch>(1);

  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemonList$: Observable<PokemonList> = this.pokemonSearch$.pipe(
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    }),
  );

  constructor(private http: HttpClient) { }

  updatePokemonSearch(nextPokemonSearch: PokemonSearch): void {
    this._pokemonSearch.next(nextPokemonSearch);
  }

  getPokemonTypes(): Observable<PokemonType[]> {
    return this.http.get<PokemonType[]>("localhost:8000").pipe(
    );
  }

  private getAllPokemon(
    pokemonSearch: PokemonSearch,
  ): Observable<PokemonList> {
    console.log({ pokemonSearch });
    const params: HttpParams = buildParams(pokemonSearch);
    const baseUrl = "http://localhost:8000/pokemon";
    const url = pokemonSearch.name?.trim()
      ? `${baseUrl}/${pokemonSearch.name.trim()}`
      : baseUrl;
    return this.http.get<PokemonList>(url, { params }).pipe();
  }

  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`http://localhost:8000/pokemon/${pokemonId}`).pipe();
  }
}
