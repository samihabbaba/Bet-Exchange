import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpoDetailsComponent } from './expo-details.component';

describe('ExpoDetailsComponent', () => {
  let component: ExpoDetailsComponent;
  let fixture: ComponentFixture<ExpoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpoDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
