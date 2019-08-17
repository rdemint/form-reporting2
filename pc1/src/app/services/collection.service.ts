import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Collection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(private http: HttpClient) { }

  postCollection(collection: Collection) {
    return this.http.post(environment['collections_url'], collection);
  }

  putCollection(collection: Collection) {
    return this.http.put(environment['collections_url'] + collection.id + '/', collection);
  }

  getCollections(date:Date, practiceId) {
    let year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    let httpParams = new HttpParams()
      .append('year', year.toString())
      .append('month', month.toString())
      .append('day', day.toString())
      .append('practice', practiceId);
    return this.http.get<Collection[]>(environment['collections_url'], {params: httpParams});
  }

}
