import { TestBed } from '@angular/core/testing';

import { SoftwareHolderGuard } from './software-holder.guard';

describe('SoftwareHolderGuard', () => {
  let guard: SoftwareHolderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SoftwareHolderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
