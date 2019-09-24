import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DailySummaryService } from '../services/daily-summary.service';
import { environment } from '../../environments/environment';
import { SummaryOverview } from '../models';
import { DashService } from '../services/dash.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SummaryOverviewService {

  constructor(
    private http: HttpClient, 
    private dailySummaryService: DailySummaryService, 
  ) { }

getSummaryOverviews(orgType, orgId, view, sourceType, source) {
    let httpParams = this.dailySummaryService.setDateParams(view);
    httpParams = this.setNonDateParams(httpParams, orgType, orgId, sourceType, source);
    return this.http.get<SummaryOverview[]>(environment['summary_overview_url'], {params: httpParams});

}

  getPYSummaryOverviews(orgType, orgId, view, sourceType, source) {
    let httpParams = this.dailySummaryService.setPYDateParams(view);
    httpParams = this.setNonDateParams(httpParams, orgType, orgId, sourceType, source);
    return this.http.get<SummaryOverview[]>(environment['summary_overview_url'], {params: httpParams});
}	

  setNonDateParams(params: HttpParams, orgType, orgId, sourceType, source) {
    if (sourceType == 'practice' && orgType == 'practice') {
      let httpParams = params  
                        .append(orgType, orgId);
      return httpParams;
    }

    else {
      let httpParams = params
                        .append(orgType, orgId)
                        .append(sourceType, source)
      return httpParams;
    }

  }



}
