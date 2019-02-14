import { TestBed } from '@angular/core/testing';

import { FailureFormService } from './failure-form.service';

describe('FailureFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FailureFormService = TestBed.get(FailureFormService);
    expect(service).toBeTruthy();
  });
});
