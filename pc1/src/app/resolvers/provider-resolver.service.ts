import { Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProviderService } from '../services/provider.service';
import { Observable } from 'rxjs';
import { Provider } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProviderResolverService implements Resolve<Observable<Provider>> {
	provider: Provider;

  constructor(private providerService: ProviderService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
	let providerId = route.queryParams['provider'];
	if (providerId != null) {
		return this.providerService.getProvider(providerId);
	}

	else {
		return null
	}
}
}
