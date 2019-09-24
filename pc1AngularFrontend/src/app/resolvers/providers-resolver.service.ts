import { Injectable} from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProviderService } from '../services/provider.service';
import { PracticeService } from '../services/practice.service';
import { Observable } from 'rxjs';
import { Provider } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProvidersResolverService implements Resolve<Observable<Provider[]>> {
	provider: Provider;

  constructor(private practiceService: PracticeService, private providerService: ProviderService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {  	
		return this.providerService.getProviders(this.practiceService.practice.id);		
	}
}