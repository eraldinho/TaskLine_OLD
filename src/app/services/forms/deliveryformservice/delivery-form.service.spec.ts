import { TestBed } from '@angular/core/testing';

import { DeliveryFormService } from './delivery-form.service';

describe('DeliveryFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeliveryFormService = TestBed.get(DeliveryFormService);
    expect(service).toBeTruthy();
  });
});
