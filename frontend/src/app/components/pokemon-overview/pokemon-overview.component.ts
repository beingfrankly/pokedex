import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { map, take, catchError } from 'rxjs';
import { EMPTY } from 'rxjs';
import { PokemonTypesToStringPipe } from 'src/app/pipes/pokemon-types-to-string.pipe';
import { FavoritesService } from 'src/app/services/favorites.service';
import { IconName } from 'src/app/types/icon-name';
import { PokemonSearch } from 'src/app/types/pokemon-search';
import { SearchService } from '../../services/search.service';
import { ButtonComponent } from '../shared/button/button.component';
import { IconComponent } from '../shared/icon/icon.component';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';
import { TableComponent } from '../shared/table/table.component';
import { PokemonBase } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-overview',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    IconComponent,
    ButtonComponent,
    PokemonImageComponent,
    PokemonTypesToStringPipe,
    RouterModule,
  ],
  templateUrl: './pokemon-overview.component.html',
  styleUrls: ['./pokemon-overview.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonOverviewComponent {
  private _RESULT_SIZE: number = 10;
  private _INITIAL_OFFSET: number = 0;

  pokemonList$ = this.searchService.pokemonList$;
  private pokemonListSignal = signal<PokemonBase[]>([]);
  pokemons = computed(() => this.pokemonListSignal());
  iconName = IconName;

  offset: WritableSignal<number> = signal(this._INITIAL_OFFSET);
  limit: WritableSignal<number> = signal(this._RESULT_SIZE);

  pokemonSearch: Signal<PokemonSearch | undefined> = computed(() => ({
    offset: this.offset(),
    limit: this.limit(),
  }));

  constructor(
    private searchService: SearchService,
    private favoritesService: FavoritesService
  ) {
    effect(() => {
      const nextPokemonSearch = this.pokemonSearch();

      if (nextPokemonSearch) {
        this.searchService.updatePokemonSearch(nextPokemonSearch);
      }
    });

    this.pokemonList$
      .pipe(map((pokemonList) => pokemonList.pokemon))
      .subscribe((pokemons) => {
        this.pokemonListSignal.set(pokemons);
      });
  }

  toggleFavorite(pokemonId: number, isFavorite: boolean): void {
    this.pokemonListSignal.update((pokemons) =>
      pokemons.map((pokemon) =>
        pokemon.id === pokemonId
          ? { ...pokemon, is_favorite: !isFavorite }
          : pokemon
      )
    );

    this.favoritesService
      .toggleFavorite(pokemonId, isFavorite)
      .pipe(
        take(1),
        catchError(() => {
          this.pokemonListSignal.update((pokemons) =>
            pokemons.map((pokemon) =>
              pokemon.id === pokemonId
                ? { ...pokemon, is_favorite: isFavorite }
                : pokemon
            )
          );
          return EMPTY;
        })
      )
      .subscribe();
  }

  setNextOffset(): void {
    const currentValue = this.offset();
    this.offset.set(currentValue + this._RESULT_SIZE);
  }

  setPreviousOffset(): void {
    const currentValue = this.offset();
    if (currentValue >= this._RESULT_SIZE) {
      this.offset.set(currentValue - this._RESULT_SIZE);
    }
  }
}
