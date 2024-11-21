import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PokemonImageComponent } from '../shared/pokemon-image/pokemon-image.component';
import { Pokemon } from '../../types/pokemon';
import { PokemonTypeIconComponent } from '../shared/pokemon-type-icon/pokemon-type-icon.component';
import { IconName } from 'src/app/types/icon-name';
import { IconComponent } from '../shared/icon/icon.component';
import { TableComponent } from '../shared/table/table.component';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PokemonImageComponent,
    PokemonTypeIconComponent,
    IconComponent,
    TableComponent,
  ],
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.css'],
})
export class PokemonDetailComponent {
  @Input()
  pokemon?: Pokemon;

  iconName = IconName;
}
