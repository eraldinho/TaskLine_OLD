import { TestBed } from '@angular/core/testing';

import { AdditionalinformationsFormService } from './additionalinformations-form.service';

describe('AdditionalinformationsFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdditionalinformationsFormService = TestBed.get(AdditionalinformationsFormService);
    expect(service).toBeTruthy();
  });
});
