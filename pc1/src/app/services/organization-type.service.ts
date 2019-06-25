import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeService {
	organizationType$ = new BehaviorSubject<string>(null);
	organizationSlug$ = new BehaviorSubject<string>(null);
  organizationID$ = new BehaviorSubject<number>(null);
  constructor() { }

  selectOrgType(type) {
  	this.organizationType$.next(type);
  }

  loadOrgType() {
  	return this.organizationType$.asObservable();
  }

  selectOrgSlug(slug) {
  	this.organizationSlug$.next(slug);
  }

  loadOrgSlug() {
  	return this.organizationSlug$.asObservable();
  }

  selectOrgId(id) {
    this.organizationID$.next(id);
  }

  loadOrgId() {
    return this.organizationID$.asObservable();
  }
}
