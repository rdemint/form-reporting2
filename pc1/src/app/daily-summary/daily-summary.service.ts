import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DateService } from '../date.service';
import { environment } from '../../environments/environment';
import { DailySummary } from '../models';
import { createHttpParams } from '../utils/http-params';

@Injectable({
  providedIn: 'root'
})
export class DailySummaryService {

  constructor(private http: HttpClient) { }

  getDailySummaries(params: any) {
  	let paramKeys = Object.keys(params);
  	let httpParams = new HttpParams();
  	paramKeys.forEach((key)=> {
  		httpParams = httpParams.append(key, params[key])
  	})
  	return this.http.get<DailySummary[]>(environment['daily_summary_url'], {params: httpParams});

  }

  getPYDailySummaries(params: any) {
    params['year'] = (+params['year']-1).toString();
    return this.getDailySummaries(params);
  }

  putSummary(summary: DailySummary, summaryId: string) {
    return this.http.put<DailySummary>(environment['daily_summary_url'] + summaryId + "/", summary);

  }

  postSummary(summary: DailySummary) {
     return this.http.post<DailySummary>(environment['daily_summary_url'], summary);

  }
}
