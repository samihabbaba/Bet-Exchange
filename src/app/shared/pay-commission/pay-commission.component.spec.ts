import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayCommissionComponent } from './pay-commission.component';

describe('PayCommissionComponent', () => {
  let component: PayCommissionComponent;
  let fixture: ComponentFixture<PayCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PayCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PayCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
