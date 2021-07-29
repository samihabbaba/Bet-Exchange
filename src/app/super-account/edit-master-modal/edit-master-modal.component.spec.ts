import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMasterModalComponent } from './edit-master-modal.component';

describe('EditMasterModalComponent', () => {
  let component: EditMasterModalComponent;
  let fixture: ComponentFixture<EditMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
