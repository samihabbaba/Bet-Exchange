import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterModalComponent } from './add-master-modal.component';

describe('AddMasterModalComponent', () => {
  let component: AddMasterModalComponent;
  let fixture: ComponentFixture<AddMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
