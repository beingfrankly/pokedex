import { CommonModule } from '@angular/common';
import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { IconName } from 'src/app/types/icon-name';
import { SortablePokemonProps } from 'src/app/types/pokemon';
import { PokemonSearch } from 'src/app/types/pokemon-search';
import { SortOrder } from 'src/app/types/sort-order';
import { getSortOrder } from 'src/app/utils/sort-order';
import { SearchService } from '../../search.service';
import { PokemonSearchComponent } from '../pokemon-search/pokemon-search.component';
import { ButtonComponent } from '../shared/button/button.component';
import { IconComponent } from '../shared/icon/icon.component';
import { TableComponent } from '../shared/table/table.component';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';
import { PokemonTypesToStringPipe } from 'src/app/pipes/pokemon-types-to-string.pipe';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pokemon-overview',
  standalone: true,
  imports: [
    CommonModule,
    PokemonSearchComponent,
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
  private _INITIAL_NAME: string = '';

  sortablePokemonFields: (keyof SortablePokemonProps)[] = [
    'id',
    'name',
    'height',
  ];

  pokemonTypes$ = this.searchService.getPokemonTypes();
  pokemons$ = this.searchService.pokemons$;
  iconName = IconName;

  sortOrder: WritableSignal<SortOrder> = signal(SortOrder.ASC);
  sortField: WritableSignal<keyof SortablePokemonProps> = signal('id');
  offset: WritableSignal<number> = signal(this._INITIAL_OFFSET);
  name: WritableSignal<string> = signal(this._INITIAL_NAME);
  typeId: WritableSignal<number | undefined> = signal(undefined);
  limit: WritableSignal<number> = signal(this._RESULT_SIZE);

  pokemonSearch: Signal<PokemonSearch | undefined> = computed(() => ({
    sortOrder: this.sortOrder(),
    sortField: this.sortField(),
    offset: this.offset(),
    name: this.name(),
    limit: this.limit(),
    type: this.typeId(),
  }));

  constructor(private searchService: SearchService) {
    effect(() => {
      const nextPokemonSearch = this.pokemonSearch();

      if (nextPokemonSearch) {
        this.searchService.updatePokemonSearch(nextPokemonSearch);
      }
    });
  }

  setType(pokemonType: number): void {
    this.typeId.set(pokemonType);
  }

  setName(pokemonName: string): void {
    this.name.set(pokemonName);
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

  setSortOrder(sortOrder: SortOrder): void {
    this.sortOrder.set(sortOrder);
  }

  setSorting(nextSortField: any): void {
    const currentSortField = this.sortField();
    const currentSortOrder = this.sortOrder();

    this.offset.set(this._INITIAL_OFFSET);
    this.sortField.set(nextSortField as keyof SortablePokemonProps);

    this.sortOrder.set(
      getSortOrder(currentSortField, nextSortField, currentSortOrder)
    );
  }
}
