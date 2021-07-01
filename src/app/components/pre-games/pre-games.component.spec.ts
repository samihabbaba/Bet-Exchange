import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreGamesComponent } from './pre-games.component';

describe('PreGamesComponent', () => {
  let component: PreGamesComponent;
  let fixture: ComponentFixture<PreGamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreGamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
