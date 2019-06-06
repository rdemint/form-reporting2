import { Component, OnInit, Input } from '@angular/core';
import { DailySummary, Provider, Practice, Specialty } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../services/date.service'; 

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css']
})
export class TableContainerComponent implements OnInit {
  	@Input() source: string;
  	@Input() sourceField: string;
    @Input() sourceType: string;
	  @Input() dailySummaries: DailySummary[];
  	@Input() pyDailySummaries: DailySummary[];
    @Input() dashView: string;
    @Input() dateView: string; 
	
	month: string;
	year: string;
	previousYear: string;
	tableDailySummaries: any;

  constructor(
  	private dateService: DateService,
  	private route: ActivatedRoute,
  ){}

  ngOnInit() {
  	this.route.queryParams.subscribe((params)=> {
  		this.month = params['month'];
  		this.year = params['year'];
  		this.setPreviousYear();
  	});
  	this.createTableData();
  }

  createTableData() {
  	this.tableDailySummaries = [];
  	let daysInMonth = this.dateService.daysInMonth(this.year, this.month);
  	for (let i = 0; i < daysInMonth; i++) {
  		let summaryField = this.dateMatchSummary(i, this.dailySummaries, this.formatDate(i));
  		let pySummaryField = this.dateMatchSummary(i, this.pyDailySummaries, this.pyFormatDate(i));

  		let obj = {
  			'date': this.prettyDate(i),
  			'currentYear': summaryField,
  			'previousYear': pySummaryField
  		}
  		this.tableDailySummaries.push(obj);
  	}
  }

  prettyDate(i) {
  	return new Date(+this.year, +this.month-1, i+1).toString().slice(4,10);
  }


  dateMatchSummary(index, summaries, dateStub) {
  	let match = summaries.find((summary)=> dateStub == summary.date);

  	if (match == undefined ) {
  		return '-'
  	}

  	else {
  		return match[this.sourceField]
  	}
  }

  formatDate(i) {
  	// returns YYYY-MM-DD
    var d = new Date(+this.year, +this.month-1, i+1),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

    pyFormatDate(i) {
    	// returns YYYY-MM-DD
    var d = new Date(+this.year-1, +this.month-1, i+1),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  setPreviousYear() {
  	let currentYear = +this.year-1;
  	this.previousYear = currentYear.toString();
  }


}

