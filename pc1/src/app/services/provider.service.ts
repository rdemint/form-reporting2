import { Injectable } from '@angular/core';
import { Provider } from '../models';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PracticeService} from '../services/practice.service';
@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http: HttpClient, private practiceService: PracticeService) { }

  getProvider(id) {
    return this.http.get<Provider>(environment['providers_url'] + id);
  }

  getProviders(practiceId) {
    let httpParams = new HttpParams().append('practice', this.practiceService.practice.id);
    return this.http.get<Provider[]>(environment['providers_url'], {params: httpParams})
  }

  getProviderList(paramObject) {    
    let httpParams = new HttpParams();
    let keys = Object.keys(paramObject);
    for (let i = 0; i < keys.length; i++) {
      httpParams = httpParams.append(keys[i], paramObject[keys[i]]);
    }    
    return this.http.get<Provider[]>(environment['providers_url'], {params: httpParams})

  }

  addProvider(provider) {
  	return this.http.post(environment['providers_url'], provider);
  }

  deleteProvider(providerId) {
  	return this.http.delete(environment['providers_url'] + providerId + '/');
  }

  putProvider(provider) {
  	return this.http.put(environment['providers_url'] + provider.id + '/', provider);
  }
}
