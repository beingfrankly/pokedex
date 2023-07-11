import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from '../search/search.component';
import { TableComponent } from '../table/table.component';
import { SearchService } from '../../search.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [CommonModule, SearchComponent, TableComponent],
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
})
export class OverviewComponent {
  pokemonTypes$ = this.searchService.pokemonTypes$;

  constructor(private searchService: SearchService) {}

  handleTypeChange(pokemonType: number): void {
    this.searchService.updatePokemonSearch({ type: pokemonType });
  }
}
