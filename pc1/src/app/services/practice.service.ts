import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Practice} from '../models';

@Injectable({
  providedIn: 'root'
})
export class PracticeService {

  constructor(private http: HttpClient) { }

    getPractice(slug:string) {
    return this.http.get<Practice>(
        environment['practice_url'] + slug + '/')
  }

}
