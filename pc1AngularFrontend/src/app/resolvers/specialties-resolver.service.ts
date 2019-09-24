import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SpecialtyService } from '../services/specialty.service';
import { Observable } from 'rxjs';
import { Specialty } from '../models';


@Injectable({
  providedIn: 'root'
})
export class SpecialtiesResolverService {
	specialties: Specialty[];

  constructor(private specialtyService: SpecialtyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
  	return this.specialtyService.getSpecialties()
  }
}
