import { PokemonDetailComponent } from './pokemon-detail.component';
import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';

describe('PokemonDetailComponent', () => {
  let spectator: Spectator<PokemonDetailComponent>;
  const createComponent = createComponentFactory(PokemonDetailComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
