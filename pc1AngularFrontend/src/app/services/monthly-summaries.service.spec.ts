import { TestBed } from '@angular/core/testing';

import { MonthlySummariesService } from './monthly-summaries.service';

describe('MonthlySummariesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonthlySummariesService = TestBed.get(MonthlySummariesService);
    expect(service).toBeTruthy();
  });
});
