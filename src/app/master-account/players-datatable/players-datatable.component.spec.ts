import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayersDatatableComponent } from './players-datatable.component';

describe('PlayersDatatableComponent', () => {
  let component: PlayersDatatableComponent;
  let fixture: ComponentFixture<PlayersDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayersDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayersDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
