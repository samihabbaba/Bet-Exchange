import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSuperModalComponent } from './edit-super-modal.component';

describe('EditSuperModalComponent', () => {
  let component: EditSuperModalComponent;
  let fixture: ComponentFixture<EditSuperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSuperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSuperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
