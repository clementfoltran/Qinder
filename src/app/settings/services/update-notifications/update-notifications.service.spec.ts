import { TestBed } from '@angular/core/testing';

import { UpdateNotificationsService } from './update-notifications.service';

describe('UpdateNotificationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UpdateNotificationsService = TestBed.get(UpdateNotificationsService);
    expect(service).toBeTruthy();
  });
});
