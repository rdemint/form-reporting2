import { TestBed } from '@angular/core/testing';

import { ProviderResolverService } from './provider-resolver.service';

describe('ProviderResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProviderResolverService = TestBed.get(ProviderResolverService);
    expect(service).toBeTruthy();
  });
});
