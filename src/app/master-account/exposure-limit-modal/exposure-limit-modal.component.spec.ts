import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposureLimitModalComponent } from './exposure-limit-modal.component';

describe('ExposureLimitModalComponent', () => {
  let component: ExposureLimitModalComponent;
  let fixture: ComponentFixture<ExposureLimitModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExposureLimitModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposureLimitModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
