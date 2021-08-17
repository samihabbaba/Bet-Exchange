import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolderMainDatatableComponent } from './holder-main-datatable.component';

describe('HolderMainDatatableComponent', () => {
  let component: HolderMainDatatableComponent;
  let fixture: ComponentFixture<HolderMainDatatableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HolderMainDatatableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HolderMainDatatableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
