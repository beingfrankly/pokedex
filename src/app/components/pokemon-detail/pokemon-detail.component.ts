import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchService } from '../../search.service';
import { Observable } from 'rxjs';
import { RouterModule } from '@angular/router';
import { PokemonImageComponent } from '../pokemon-image/pokemon-image.component';
import { Pokemon } from '../../types/pokemon';
import { PokemonTypeIconComponent } from '../pokemon-type-icon/pokemon-type-icon.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonImageComponent,
    PokemonTypeIconComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent implements OnChanges {
  @Input()
  id!: string;

  pokemon$!: Observable<Pokemon>;

  constructor(private searchService: SearchService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes?.['id']) {
      this.pokemon$ = this.searchService.getPokemonById(
        parseInt(changes['id'].currentValue)
      );
    }
  }
}
