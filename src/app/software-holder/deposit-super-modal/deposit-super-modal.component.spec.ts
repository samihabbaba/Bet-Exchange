import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositSuperModalComponent } from './deposit-super-modal.component';

describe('DepositSuperModalComponent', () => {
  let component: DepositSuperModalComponent;
  let fixture: ComponentFixture<DepositSuperModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DepositSuperModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositSuperModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
