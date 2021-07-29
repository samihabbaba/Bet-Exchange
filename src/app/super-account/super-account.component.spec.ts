import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAccountComponent } from './super-account.component';

describe('SuperAccountComponent', () => {
  let component: SuperAccountComponent;
  let fixture: ComponentFixture<SuperAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAccountComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
