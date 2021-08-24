import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBettingRuleComponent } from './delete-betting-rule.component';

describe('DeleteBettingRuleComponent', () => {
  let component: DeleteBettingRuleComponent;
  let fixture: ComponentFixture<DeleteBettingRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteBettingRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBettingRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
