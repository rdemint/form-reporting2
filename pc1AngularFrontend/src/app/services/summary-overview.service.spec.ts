import { TestBed } from '@angular/core/testing';

import { SummaryOverviewService } from './summary-overview.service';

describe('SummaryOverviewService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SummaryOverviewService = TestBed.get(SummaryOverviewService);
    expect(service).toBeTruthy();
  });
});
