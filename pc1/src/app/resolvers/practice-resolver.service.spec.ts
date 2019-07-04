import { TestBed } from '@angular/core/testing';

import { PracticeResolverService } from './practice-resolver.service';

describe('PracticeResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PracticeResolverService = TestBed.get(PracticeResolverService);
    expect(service).toBeTruthy();
  });
});
