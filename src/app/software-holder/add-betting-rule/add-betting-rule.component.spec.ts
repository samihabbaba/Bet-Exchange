import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBettingRuleComponent } from './add-betting-rule.component';

describe('AddBettingRuleComponent', () => {
  let component: AddBettingRuleComponent;
  let fixture: ComponentFixture<AddBettingRuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBettingRuleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBettingRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
