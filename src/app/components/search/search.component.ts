import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PokemonType } from '../../types/pokemon-type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchForm = new FormGroup({
    name: new FormControl(),
    type: new FormControl(),
  });

  @Input()
  pokemonTypes!: PokemonType[] | null;

  @Output()
  typeChange: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  nameChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  onTypeChange() {
    this.typeChange.emit(this.searchForm.get('type')?.value);
  }

  onSubmit() {
    this.nameChange.emit(this.searchForm.get('name')?.value ?? '');
  }
}
