import { TestBed } from '@angular/core/testing';

import { CanActiveGuardServiceService } from './can-active-guard-service.service';

describe('CanActiveGuardServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CanActiveGuardServiceService = TestBed.get(CanActiveGuardServiceService);
    expect(service).toBeTruthy();
  });
});
