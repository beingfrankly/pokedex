import { CommonModule } from '@angular/common';
import { Component, Input, numberAttribute } from '@angular/core';
import { toImageSource } from '../../../utils/pokemon-image-source';

@Component({
  selector: 'app-pokemon-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.css'],
})
export class PokemonImageComponent {
  @Input({ required: true, transform: toImageSource })
  pokemonId!: number;

  @Input({ required: true })
  imageDescription!: string;

  @Input({ transform: numberAttribute })
  width: number | undefined;

  @Input({ transform: numberAttribute })
  height: number | undefined;
}
