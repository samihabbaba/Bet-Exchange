import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetMyCommissionComponent } from './set-my-commission.component';

describe('SetMyCommissionComponent', () => {
  let component: SetMyCommissionComponent;
  let fixture: ComponentFixture<SetMyCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetMyCommissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetMyCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
