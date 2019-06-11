import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DashService } from '../services/dash.service';
import { DailySummary } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SummaryFilterService implements OnInit {
	filteredSummaries$ = new BehaviorSubject<DailySummary[]>(null);

  constructor() { 

  }

  ngOnInit() {
  	
  }


}
