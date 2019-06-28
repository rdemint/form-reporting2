import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Specialty } from '../models';
@Injectable({
  providedIn: 'root'
})
export class SpecialtyService {

  constructor(private http: HttpClient) { }

  getSpecialties() {
  	return this.http.get<Specialty[]>(environment['specialties_url'])
  }
}
