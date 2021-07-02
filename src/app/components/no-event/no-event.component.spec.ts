import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoEventComponent } from './no-event.component';

describe('NoEventComponent', () => {
  let component: NoEventComponent;
  let fixture: ComponentFixture<NoEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NoEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
