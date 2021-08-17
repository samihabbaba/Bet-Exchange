import { TestBed } from '@angular/core/testing';

import { SignalRNotificationsService } from './signal-r-notifications.service';

describe('SignalRNotificationsService', () => {
  let service: SignalRNotificationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalRNotificationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
