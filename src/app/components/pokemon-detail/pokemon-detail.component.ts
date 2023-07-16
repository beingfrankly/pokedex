import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';
import { Pokemon } from '../../types/pokemon';
import { PokemonTypeIconComponent } from '../shared/pokemon-type-icon/pokemon-type-icon.component';

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
export class PokemonDetailComponent {
  @Input()
  pokemon?: Pokemon;
}
