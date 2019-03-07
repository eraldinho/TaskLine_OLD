import { TestBed } from '@angular/core/testing';

import { CustomerhardwareFormService } from './customerhardware-form.service';

describe('CustomerhardwareFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CustomerhardwareFormService = TestBed.get(CustomerhardwareFormService);
    expect(service).toBeTruthy();
  });
});
