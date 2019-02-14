import { TestBed } from '@angular/core/testing';

import { AssemblyFormService } from './assembly-form.service';

describe('AssemblyFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssemblyFormService = TestBed.get(AssemblyFormService);
    expect(service).toBeTruthy();
  });
});
