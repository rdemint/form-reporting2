import { TestBed } from '@angular/core/testing';

import { ProvidersResolverService } from './providers-resolver.service';

describe('ProvidersResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProvidersResolverService = TestBed.get(ProvidersResolverService);
    expect(service).toBeTruthy();
  });
});
