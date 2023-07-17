import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PokemonType } from '../../types/pokemon-type';
import { SortOrder } from 'src/app/types/sort-order';
import { SortablePokemonProps } from 'src/app/types/pokemon';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
})
export class PokemonSearchComponent {
  sortOrder = SortOrder;

  searchForm = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
    sortField: new FormControl(),
    sortOrder: new FormControl(),
  });

  @Input()
  pokemonTypes!: PokemonType[] | null;

  @Input()
  sortFields!: (keyof SortablePokemonProps)[] | null;

  @Output()
  typeChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  nameChange: EventEmitter<string> = new EventEmitter<string>();

  @Output()
  sortFieldChange: EventEmitter<keyof SortablePokemonProps> = new EventEmitter<
    keyof SortablePokemonProps
  >();

  @Output()
  sortOrderChange: EventEmitter<SortOrder> = new EventEmitter<SortOrder>();

  constructor() {}

  onTypeChange() {
    this.typeChange.emit(this.searchForm.get('type')?.value);
  }

  onSortFieldChange() {
    this.sortFieldChange.emit(this.searchForm.get('sortField')?.value);
  }

  onSortOrderChange() {
    this.sortOrderChange.emit(this.searchForm.get('sortOrder')?.value);
  }

  onSubmit() {
    this.nameChange.emit(this.searchForm.get('name')?.value ?? '');
  }
}
