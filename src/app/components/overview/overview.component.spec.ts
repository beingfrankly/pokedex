import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let spectator: Spectator<OverviewComponent>;
  const createComponent = createComponentFactory(OverviewComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
