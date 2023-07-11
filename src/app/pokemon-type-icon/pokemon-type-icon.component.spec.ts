import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTypeIconComponent } from './pokemon-type-icon.component';

describe('PokemonTypeIconComponent', () => {
  let component: PokemonTypeIconComponent;
  let fixture: ComponentFixture<PokemonTypeIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PokemonTypeIconComponent]
    });
    fixture = TestBed.createComponent(PokemonTypeIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
