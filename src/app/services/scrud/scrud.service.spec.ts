import { TestBed, inject } from '@angular/core/testing';

import { ScrudService } from './scrud.service';

describe('ScrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScrudService]
    });
  });

  it('should be created', inject([ScrudService], (service: ScrudService) => {
    expect(service).toBeTruthy();
  }));
});
