import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let spectator: Spectator<SearchComponent>;
  const createComponent = createComponentFactory(SearchComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
