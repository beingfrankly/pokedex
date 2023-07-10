import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

function toImageSource(pokemonId: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonId}.svg`;
}

@Component({
  selector: 'app-pokemon-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-image.component.html',
  styleUrls: ['./pokemon-image.component.css']
})
export class PokemonImageComponent {
  @Input({ transform: toImageSource })
  pokemonId!: number 

  @Input()
  imageHeight: string = '48px';

  @Input()
  imageWidth: string = '48px';
}
