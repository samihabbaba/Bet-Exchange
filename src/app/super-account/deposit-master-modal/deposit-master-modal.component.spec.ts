import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositMasterModalComponent } from './deposit-master-modal.component';

describe('DepositMasterModalComponent', () => {
  let component: DepositMasterModalComponent;
  let fixture: ComponentFixture<DepositMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
