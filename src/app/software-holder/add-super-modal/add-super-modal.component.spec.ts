import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSuperModalComponent } from './add-super-modal.component';

describe('AddSuperModalComponent', () => {
  let component: AddSuperModalComponent;
  let fixture: ComponentFixture<AddSuperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSuperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSuperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
