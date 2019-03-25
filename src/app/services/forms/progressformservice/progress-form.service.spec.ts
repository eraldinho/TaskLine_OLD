import { TestBed } from '@angular/core/testing';

import { ProgressFormService } from './progress-form.service';

describe('ProgressFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProgressFormService = TestBed.get(ProgressFormService);
    expect(service).toBeTruthy();
  });
});
