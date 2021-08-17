import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrawSuperModalComponent } from './withdraw-super-modal.component';

describe('WithdrawSuperModalComponent', () => {
  let component: WithdrawSuperModalComponent;
  let fixture: ComponentFixture<WithdrawSuperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithdrawSuperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrawSuperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
