import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Org } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrganizationTypeService {
  org$ = new BehaviorSubject<Org>(null)
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

  loadOrg() {
    return this.org$.asObservable();
  }

  selectOrg(id) {
    this.org$.next(id);
  }
}

