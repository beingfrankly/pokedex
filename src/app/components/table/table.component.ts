import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PokemonTypesToStringPipe } from 'src/app/pipes/pokemon-types-to-string.pipe';
import { IconName } from 'src/app/types/icon-name';
import { PokemonBase, SortablePokemonProps } from 'src/app/types/pokemon';
import { Column } from 'src/app/types/table-column';
import { IconComponent } from '../shared/icon/icon.component';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonImageComponent,
    PokemonTypesToStringPipe,
    IconComponent,
  ],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  iconName = IconName;

  @Input({ required: true })
  pokemons!: PokemonBase[] | null;

  @Output()
  handleSort: EventEmitter<keyof SortablePokemonProps> = new EventEmitter<
    keyof SortablePokemonProps
  >();

  sortableColumns: Column<SortablePokemonProps>[] = [
    { label: 'Id', value: 'id', sortable: true },
    { label: 'Pokemon name', value: 'name', sortable: true },
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

  onHandleSort(nextSortField: keyof SortablePokemonProps): void {
    this.handleSort.emit(nextSortField);
  }
}
