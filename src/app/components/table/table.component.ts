import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../search.service';
import { RouterModule } from '@angular/router';
import { SortField } from '../../types/sort-field';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, RouterModule, PokemonImageComponent],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  pokemons$ = this.searchService.pokemons$;

  constructor(private searchService: SearchService) {}

  handlePrevious(): void {
    this.searchService.searchPrevious();
  }

  handleNext(): void {
    this.searchService.searchNext();
  }

  handleSorting(column: string): void {
    const sortField: SortField =
      SortField[column.toString().toUpperCase() as keyof typeof SortField];
    this.searchService.updateSorting(sortField);
  }
}
