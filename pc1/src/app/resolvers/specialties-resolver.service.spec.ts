import { TestBed } from '@angular/core/testing';

import { SpecialtiesResolverService } from './specialties-resolver.service';

describe('SpecialtiesResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialtiesResolverService = TestBed.get(SpecialtiesResolverService);
    expect(service).toBeTruthy();
  });
});
