import { Injectable, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService implements OnInit {
  currentMonth = (new Date().getMonth()+1).toString();
 	currentYear = new Date().getFullYear().toString();
  previousYear = (new Date().getFullYear()-1).toString();

  	YEAR_OPTIONS: string[] = ["2018", "2019"];
  	MONTH_OPTIONS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
  	// DAYS_IN_MONTH: any = [{1: 31}, {2: 28}, {3: 31}, {4: 30}, {5: 31}, {6: 30}, {7: 31}, {8: 31}, {9: 31}, {10: 31}, {11: 30}, {12: 31}]

  constructor() { }

  ngOnInit() { }

  	daysInMonth(year, month) {
  		return new Date(year, month, 0).getDate();
  	}
}