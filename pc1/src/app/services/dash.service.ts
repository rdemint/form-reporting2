import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashService {
	sourceField$ = new BehaviorSubject<string>('visits');
	dashView$ = new BehaviorSubject<string>('chart');
	dateView$ = new BehaviorSubject<string>('ytd');

	source_fields = ['visits', 'visits_per_workdays', 'workdays', 'noshows'];
	dash_views = ['chart', 'table'];
	date_views = ['mtd', 'ytd'];

  constructor() { }

  selectSourceField(field) {
  	if (this.source_fields.includes(field)) {
  		this.sourceField$.next(field);
  	}

  	else {
  		console.log('that field is not valid');
  	}
  }

  loadSourceField() {
  	return this.sourceField$.asObservable();
  }

  selectDashView(view) {
  	if (this.dash_views.includes(view)) {
  		this.dashView$.next(view);
  	}
  	else {
  		console.log('that view is not valid');
  	}
  }

   loadDashView() {
  	return this.dashView$.asObservable();
  }

  selectDateView(view) {
  	if (this.date_views.includes(view)) {
  		this.dateView$.next(view);
  	}
   	else {
  		console.log('that view is not valid');
  	}
  }

  loadDateView() {
  	return this.dateView$.asObservable();
  }

  // loadDateParams() {
  // 	combineLatest(
  // 		this.
  // 		)
  // }

}
