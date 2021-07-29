import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawMasterModalComponent } from './withdraw-master-modal.component';

describe('WithdrawMasterModalComponent', () => {
  let component: WithdrawMasterModalComponent;
  let fixture: ComponentFixture<WithdrawMasterModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawMasterModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawMasterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
