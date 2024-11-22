import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  private BASE_URL = 'http://localhost:8000/favorites';

  constructor(private http: HttpClient) {}

  toggleFavorite(pokemonId: number, isFavorite: boolean): Observable<boolean> {
    return (
      isFavorite
        ? this.http.delete<void>(`${this.BASE_URL}/${pokemonId}`)
        : this.http.post<void>(this.BASE_URL, { pokemon_id: pokemonId })
    ).pipe(
      map(() => !isFavorite),
      catchError((error: Error) => {
        console.error('Error toggling favorite:', error);
        throw error;
      })
    );
  }
}
