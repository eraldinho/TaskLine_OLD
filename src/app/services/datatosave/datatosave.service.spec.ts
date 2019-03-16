import { TestBed } from '@angular/core/testing';

import { DatatosaveService } from './datatosave.service';

describe('DatatosaveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DatatosaveService = TestBed.get(DatatosaveService);
    expect(service).toBeTruthy();
  });
});
