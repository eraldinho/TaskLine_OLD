import { TestBed } from '@angular/core/testing';

import { DatastobesavedFormService } from './datastobesaved-form.service';

describe('DatastobesavedFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatastobesavedFormService = TestBed.get(DatastobesavedFormService);
    expect(service).toBeTruthy();
  });
});
