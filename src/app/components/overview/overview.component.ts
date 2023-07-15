import {
  Component,
  computed,
  effect,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';
import { SearchService } from '../../search.service';
import { SortOrder } from 'src/app/types/sort-order';
import { SortablePokemonProps } from 'src/app/types/pokemon';
import { PokemonSearch } from 'src/app/types/pokemon-search';
import { getSortOrder } from 'src/app/utils/sort-order';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, SearchComponent, TableComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent {
  private _INITIAL_LIMIT: number = 20;
  private _INITIAL_OFFSET: number = 0;
  private _INITIAL_NAME: string = '';
  private _OFFSET_STEP: number = 20;

  pokemonTypes$ = this.searchService.getPokemonTypes();
  pokemons$ = this.searchService.pokemons$;

  sortOrder: WritableSignal<SortOrder> = signal(SortOrder.ASC);
  sortField: WritableSignal<keyof SortablePokemonProps> = signal('id');
  offset: WritableSignal<number> = signal(this._INITIAL_OFFSET);
  name: WritableSignal<string> = signal(this._INITIAL_NAME);
  typeId: WritableSignal<number | undefined> = signal(undefined);
  limit: WritableSignal<number> = signal(this._INITIAL_LIMIT);

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
    this.offset.set(currentValue + this._OFFSET_STEP);
  }

  setPreviousOffset(): void {
    const currentValue = this.offset();
    if (currentValue >= this._OFFSET_STEP) {
      this.offset.set(currentValue - this._OFFSET_STEP);
    }
  }

  setSorting(nextSortField: any): void {
    this.offset.set(this._INITIAL_OFFSET);
    this.sortField.set(nextSortField as keyof SortablePokemonProps);

    const currentSortField = this.sortField();
    const currentSortOrder = this.sortOrder();

    this.sortOrder.set(
      getSortOrder(currentSortField, nextSortField, currentSortOrder),
    );
  }
}
