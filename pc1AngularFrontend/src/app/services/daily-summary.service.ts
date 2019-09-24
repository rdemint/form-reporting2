import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DateService } from '../services/date.service';
import { environment } from '../../environments/environment';
import { DailySummary } from '../models';
import { DashService } from '../services/dash.service';
import { BehaviorSubject } from 'rxjs';
// import { createHttpParams } from '../utils/http-params';

@Injectable({
  providedIn: 'root'
})
export class DailySummaryService implements OnInit {
  date_view: string;
  current_year: string;
  previous_year: string;
  current_month: string;
  dateParams: HttpParams;
  pyDateParams: HttpParams;
  source_type$ = new BehaviorSubject<string>(null);
  source_slug$ = new BehaviorSubject<string>(null);
  dailySummaries$ = new BehaviorSubject<DailySummary[]>(null);
  pyDailySummaries$ = new BehaviorSubject<DailySummary[]>(null);

  constructor(private http: HttpClient, private dashService: DashService, private dateService: DateService) { }

  ngOnInit() {
    }

  setSource(type, slug) {
    this.source_type$.next(type);
    this.source_slug$.next(slug);
  }

  setDateParams(view) {
    if (view=='ytd') {
      return new HttpParams()
        .append('year', this.dateService.currentYear);
    }

    else if (view=='mtd') {
      return new HttpParams()
        .append('year', this.dateService.currentYear)
        .append('month', this.dateService.currentMonth);
    }

  }

  setPYDateParams(view) {
    if (view=='ytd') {
      return new HttpParams()
        .append('year', this.dateService.previousYear);
    }

    else if (view=='mtd') {
      return new HttpParams()
        .append('year', this.dateService.previousYear)
        .append('month', this.dateService.currentMonth);
      }
  }


  getDailySummaries(orgType, orgSlug, view) {
    // Type is practice or entity
    let httpParams = this.setDateParams(view);
    httpParams = httpParams
      .append(orgType, orgSlug)
    return this.http.get<DailySummary[]>(environment['daily_summary_url'], {params: httpParams});
  }

  selectDailySummaries(summaries) {
    this.dailySummaries$.next(summaries);
  }

  loadDailySummaries() {
    return this.dailySummaries$.asObservable();

  }


  getPYDailySummaries(orgType, orgSlug, view) {
    let httpParams = this.setPYDateParams(view);
    httpParams = httpParams
      .append(orgType, orgSlug)
    return this.http.get<DailySummary[]>(environment['daily_summary_url'], {params: httpParams});
  }

  selectPYDailySummaries(summaries) {
    this.pyDailySummaries$.next(summaries);
  }

  loadPYDailySummaries() {
    return this.pyDailySummaries$.asObservable();
  }


  putSummary(summary: DailySummary, summaryId: string) {
    console.log('put summary: ' + summary);
    return this.http.put<DailySummary>(environment['daily_summary_url'] + summaryId + "/", summary);

  }

  postSummary(summary: DailySummary) {
    console.log('post summary: ' + summary);
     return this.http.post<DailySummary>(environment['daily_summary_url'], summary);

  }
}
