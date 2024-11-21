import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-search',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.css'],
})
export class PokemonSearchComponent {

  searchForm = new FormGroup({
    name: new FormControl(),
  });

  @Output()
  nameChange: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  onSubmit() {
    this.nameChange.emit(this.searchForm.get('name')?.value ?? '');
  }
}
