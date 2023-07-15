import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';
import { Column } from 'src/app/types/table-column';
import { PokemonBase, SortablePokemonProps } from 'src/app/types/pokemon';
import { PokemonTypesToStringPipe } from 'src/app/pipes/pokemon-types-to-string.pipe';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonImageComponent,
    PokemonTypesToStringPipe,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  @Input({ required: true })
  pokemons!: PokemonBase[] | null;

  @Output()
  handlePrevious: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  handleNext: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  handleSort: EventEmitter<keyof SortablePokemonProps> = new EventEmitter<
    keyof SortablePokemonProps
  >();

  sortableColumns: Column<SortablePokemonProps>[] = [
    { label: '#', value: 'id', sortable: true },
    { label: 'Pokemon', value: 'name', sortable: true },
    { label: 'Height', value: 'height', sortable: true },
  ];

  columns: Column<PokemonBase>[] = [
    { label: 'Base experience', value: 'baseExperience', sortable: false },
    { label: 'Types', value: 'types', sortable: false },
  ];

  constructor() {}

  pokemonById(_index: number, pokemon: PokemonBase) {
    return pokemon.id;
  }

  onHandlePrevious(): void {
    this.handlePrevious.emit(true);
  }

  onHandleNext(): void {
    this.handleNext.emit(true);
  }

  onHandleSort(nextSortField: keyof SortablePokemonProps): void {
    this.handleSort.emit(nextSortField);
  }
}
