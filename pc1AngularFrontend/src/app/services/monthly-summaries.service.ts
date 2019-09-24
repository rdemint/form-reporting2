import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MonthlySummary } from '../models';

@Injectable({
  providedIn: 'root'
})
export class MonthlySummariesService {

	monthly_summaries = new BehaviorSubject<MonthlySummary[]>(null);

  constructor() { }

  createMonthlySummaries(summaries, source, sourceType) {
  	for (let i = 1; i < 13; i ++ ) {
  		summaries.filter()
  	}
  }

  _filterByMonth(summaries, i) {
  	summaries.filter()
  }

  _setMonth() {

  }
}
