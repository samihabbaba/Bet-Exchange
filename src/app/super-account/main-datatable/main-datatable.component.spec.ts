import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainDatatableComponent } from './main-datatable.component';

describe('MainDatatableComponent', () => {
  let component: MainDatatableComponent;
  let fixture: ComponentFixture<MainDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
