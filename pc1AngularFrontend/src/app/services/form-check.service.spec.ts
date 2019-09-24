import { TestBed } from '@angular/core/testing';

import { FormCheckService } from './form-check.service';

describe('FormCheckService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormCheckService = TestBed.get(FormCheckService);
    expect(service).toBeTruthy();
  });
});
