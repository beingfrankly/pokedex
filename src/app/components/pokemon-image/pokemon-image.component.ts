import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { toImageSource } from '../../utils/pokemon-image-source';

@Component({
  selector: 'app-pokemon-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.css'],
})
export class PokemonImageComponent {
  @Input({ transform: toImageSource })
  pokemonId!: number;

  @Input()
  imageHeight: string = '48px';

  @Input()
  imageWidth: string = '48px';
}
