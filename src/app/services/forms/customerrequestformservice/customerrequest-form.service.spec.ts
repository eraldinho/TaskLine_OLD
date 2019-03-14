import { TestBed } from '@angular/core/testing';

import { CustomerrequestFormService } from './customerrequest-form.service';

describe('CustomerrequestFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerrequestFormService = TestBed.get(CustomerrequestFormService);
    expect(service).toBeTruthy();
  });
});
