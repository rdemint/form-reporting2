import { TestBed } from '@angular/core/testing';

import { DashLoadingService } from './dash-loading.service';

describe('DashLoadingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashLoadingService = TestBed.get(DashLoadingService);
    expect(service).toBeTruthy();
  });
});
