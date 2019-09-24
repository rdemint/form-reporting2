import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Practice} from '../models';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {
  practice: Practice;
	practice$ = new BehaviorSubject<Practice>(null);
  constructor(private http: HttpClient) { }

    getPractice(slug:string) {
    return this.http.get<Practice>(
        environment['practice_url'] + slug + '/')
  }

  selectPractice(practice) {
    this.practice$.next(practice);
  }

  setPractice(practice) {
    this.practice = practice;    
  }

  loadPractice(): Observable<Practice> {
  	return this.practice$.asObservable();
  }

}
