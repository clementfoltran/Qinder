import { TestBed } from '@angular/core/testing';

import { DisplayGrowlService } from './display-growl.service';

describe('DisplayGrowlService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DisplayGrowlService = TestBed.get(DisplayGrowlService);
    expect(service).toBeTruthy();
  });
});
