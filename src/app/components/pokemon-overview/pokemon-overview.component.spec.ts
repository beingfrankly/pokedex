import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { PokemonOverviewComponent } from './pokemon-overview.component';

describe('PokemonOverviewComponent', () => {
  let spectator: Spectator<PokemonOverviewComponent>;
  const createComponent = createComponentFactory(PokemonOverviewComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
