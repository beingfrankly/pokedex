import { Spectator, createComponentFactory } from '@ngneat/spectator/jest';
import { TableComponent } from './table.component';

describe('TableComponent', () => {
  let spectator: Spectator<TableComponent>;
  const createComponent = createComponentFactory(TableComponent);

  beforeEach(() => {});

  it('should create', () => {
    spectator = createComponent();
    expect(spectator.component).toBeTruthy();
  });
});
