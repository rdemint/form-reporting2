import { TestBed } from '@angular/core/testing';

import { SummaryFilterService } from './summary-filter.service';

describe('SummaryFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryFilterService = TestBed.get(SummaryFilterService);
    expect(service).toBeTruthy();
  });
});
