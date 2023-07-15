import { Pipe, PipeTransform } from '@angular/core';
import { PokemonType } from '../types/pokemon-type';

@Pipe({
  name: 'pokemonTypesToString',
  standalone: true,
})
export class PokemonTypesToStringPipe implements PipeTransform {
  transform(value: PokemonType[]): string {
    return value.map((obj) => obj.name).join(', ');
  }
}
