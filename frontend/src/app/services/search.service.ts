import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, switchMap } from 'rxjs/operators';
import { Pokemon, PokemonList } from '../types/pokemon';
import { PokemonSearch } from '../types/pokemon-search';
import { buildParams } from '../utils/http-params';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private BASE_URL = 'http://localhost:8000/pokemon';

  private _pokemonSearch: ReplaySubject<PokemonSearch> =
    new ReplaySubject<PokemonSearch>(1);

  pokemonSearch$ = this._pokemonSearch.asObservable().pipe(shareReplay(1));

  pokemonList$: Observable<PokemonList> = this.pokemonSearch$.pipe(
    switchMap((pokemonSearch: PokemonSearch) => {
      return this.getAllPokemon(pokemonSearch);
    })
  );

  constructor(private http: HttpClient) {}

  updatePokemonSearch(nextPokemonSearch: PokemonSearch): void {
    this._pokemonSearch.next(nextPokemonSearch);
  }

  private getAllPokemon(pokemonSearch: PokemonSearch): Observable<PokemonList> {
    const params: HttpParams = buildParams(pokemonSearch);

    return this.http.get<PokemonList>(this.BASE_URL, { params }).pipe();
  }

  getPokemonById(pokemonId: number): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.BASE_URL}/${pokemonId}`).pipe();
  }
}
