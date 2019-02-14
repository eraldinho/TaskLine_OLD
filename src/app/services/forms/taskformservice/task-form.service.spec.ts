import { TestBed } from '@angular/core/testing';

import { TaskFormService } from './task-form.service';

describe('TaskFormService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaskFormService = TestBed.get(TaskFormService);
    expect(service).toBeTruthy();
  });
});
