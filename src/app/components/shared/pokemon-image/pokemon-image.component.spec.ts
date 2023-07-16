import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { PokemonImageComponent } from './pokemon-image.component';

describe('PokemonImageComponent', () => {
  let spectator: Spectator<PokemonImageComponent>;
  const createComponent = createComponentFactory(PokemonImageComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
