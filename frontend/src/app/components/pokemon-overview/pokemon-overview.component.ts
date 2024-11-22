import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { map } from 'rxjs';
import { PokemonTypesToStringPipe } from 'src/app/pipes/pokemon-types-to-string.pipe';
import { IconName } from 'src/app/types/icon-name';
import { PokemonSearch } from 'src/app/types/pokemon-search';
import { SearchService } from '../../search.service';
import { ButtonComponent } from '../shared/button/button.component';
import { IconComponent } from '../shared/icon/icon.component';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';
import { TableComponent } from '../shared/table/table.component';

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
})
export class PokemonOverviewComponent {
  private _RESULT_SIZE: number = 10;
  private _INITIAL_OFFSET: number = 0;

  pokemonList$ = this.searchService.pokemonList$;
  pokemons$ = this.pokemonList$.pipe(map((pokemonList) => pokemonList.pokemon));
  iconName = IconName;

  offset: WritableSignal<number> = signal(this._INITIAL_OFFSET);
  limit: WritableSignal<number> = signal(this._RESULT_SIZE);

  pokemonSearch: Signal<PokemonSearch | undefined> = computed(() => ({
    offset: this.offset(),
    limit: this.limit(),
  }));

  constructor(private searchService: SearchService) {
    effect(() => {
      const nextPokemonSearch = this.pokemonSearch();

      if (nextPokemonSearch) {
        this.searchService.updatePokemonSearch(nextPokemonSearch);
      }
    });
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
