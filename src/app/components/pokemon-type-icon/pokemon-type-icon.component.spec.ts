import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { PokemonTypeIconComponent } from './pokemon-type-icon.component';

describe('PokemonTypeIconComponent', () => {
  let spectator: Spectator<PokemonTypeIconComponent>;
  const createComponent = createComponentFactory(PokemonTypeIconComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
