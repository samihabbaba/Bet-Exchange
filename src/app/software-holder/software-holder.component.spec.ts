import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareHolderComponent } from './software-holder.component';

describe('SoftwareHolderComponent', () => {
  let component: SoftwareHolderComponent;
  let fixture: ComponentFixture<SoftwareHolderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareHolderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareHolderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
