import { Injectable, OnInit } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DateService implements OnInit {
   
  	MONTH_OPTIONS: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    MONTH_NAMES_SHORT: string[] = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];


    currentMonth = (new Date().getMonth()+1).toString();
   currentYear = (new Date().getFullYear()).toString();
   previousYear = (new Date().getFullYear()-1).toString();
   currentMonthShort = this.MONTH_NAMES_SHORT[new Date().getMonth()];


  constructor() { }

  ngOnInit() {  }

  	daysInMonth(year, month) {
  		return new Date(year, month, 0).getDate();
  	}

}