import { createPipeFactory, SpectatorPipe } from '@ngneat/spectator/jest';
import { PokemonTypesToStringPipe } from './pokemon-types-to-string.pipe';
import { PokemonType } from '../types/pokemon-type';

describe('PokemonTypesToStringPipe', () => {
  let spectator: SpectatorPipe<PokemonTypesToStringPipe>;
  const createPipe = createPipeFactory(PokemonTypesToStringPipe);

  it('should return "water, poison"', () => {
    const value: PokemonType[] = [
      { name: 'fighting', id: 1 },
      { name: 'poison', id: 2 },
    ];
    spectator = createPipe(`{{ prop | pokemonTypesToString }}`, {
      hostProps: {
        prop: value,
      },
    });
    expect(spectator.element).toHaveText('fighting, poison');
  });
});
