import { TestBed } from '@angular/core/testing';

import { DeviceFormService } from './device-form.service';

describe('DeviceFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeviceFormService = TestBed.get(DeviceFormService);
    expect(service).toBeTruthy();
  });
});
