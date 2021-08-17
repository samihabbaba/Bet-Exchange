import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAccountDetailsComponent } from './sub-account-details.component';

describe('SubAccountDetailsComponent', () => {
  let component: SubAccountDetailsComponent;
  let fixture: ComponentFixture<SubAccountDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubAccountDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
