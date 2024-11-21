import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { PokemonSearchComponent } from './pokemon-search.component';

describe('SearchComponent', () => {
  let spectator: Spectator<PokemonSearchComponent>;
  const createComponent = createComponentFactory(PokemonSearchComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
