import { TestBed } from '@angular/core/testing';

import { GetMatchIdService } from './get-match-id.service';

describe('GetMatchIdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GetMatchIdService = TestBed.get(GetMatchIdService);
    expect(service).toBeTruthy();
  });
});
