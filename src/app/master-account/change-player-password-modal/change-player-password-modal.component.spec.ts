import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePlayerPasswordModalComponent } from './change-player-password-modal.component';

describe('ChangePlayerPasswordModalComponent', () => {
  let component: ChangePlayerPasswordModalComponent;
  let fixture: ComponentFixture<ChangePlayerPasswordModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangePlayerPasswordModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePlayerPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
