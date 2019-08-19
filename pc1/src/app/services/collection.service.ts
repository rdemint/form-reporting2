import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Collection } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient) { }

  postCollection(collection: Collection) {
    return this.http.post(environment['collections_url'], collection);
  }

  putCollection(collection: Collection) {
    return this.http.put(environment['collections_url'] + collection.id + '/', collection);
  }

  getCollections(httpParams: HttpParams) {
    return this.http.get<Collection[]>(environment['collections_url'], {params: httpParams});
  }



}
