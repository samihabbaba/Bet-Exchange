import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetSettleModalComponent } from './bet-settle-modal.component';

describe('BetSettleModalComponent', () => {
  let component: BetSettleModalComponent;
  let fixture: ComponentFixture<BetSettleModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetSettleModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetSettleModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
