import { Component, OnInit, Input, ChangeDetectionStrategy, OnChanges, SimpleChanges } from '@angular/core';
import { DailySummary, Provider, Practice, Specialty, SummaryOverview } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { DateService } from '../../services/date.service'; 
import { DashService } from '../../services/dash.service';

@Component({
  selector: 'app-table-container',
  templateUrl: './table-container.component.html',
  styleUrls: ['./table-container.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class TableContainerComponent implements OnInit {
  	@Input() summaryOverviews: SummaryOverview[];
    @Input() source: Specialty | Provider | Practice;
    @Input() pySummaryOverviews: SummaryOverview[];    
  	@Input() sourceField: string;
    @Input() sourceFieldStr: string;
    @Input() sourceType: string;
    @Input() dashView: string;
    @Input() dateView: string; 
	
	month: string;
	year: string;
	previousYear: string;
	tableOverviews: any;
  pyTableOverviews: any;
  dataExists: boolean; 
  indexRange: number;
  indexArray: any;
  tableDateHeader: string; 

  constructor(
  	private dateService: DateService,
  	private route: ActivatedRoute,
    private dashService: DashService
  ){}

  ngOnInit() {        
  	this.route.queryParams.subscribe((params)=> {
  		this.month = params['month'];
  		this.year = params['year'];
      this.tableDateHeader = this.setTableDateHeader();
  		this.setPreviousYear();      
      this.createTableData(this.dateView);                
  	});
  
  }

  setTableDateHeader() {
    if (this.dateView == 'mtd') {
      return "Day";
    }

    else {
      return "Month";
    }
  }

  createTableData(view) {
    this.dataExists = true;
    this.tableOverviews = [];
    if (view == 'mtd') {
      this.indexRange = this.summaryOverviews.length;
    }

    if (view == 'ytd') {
      this.indexRange = +this.month;
    }
    
    for (let i = 1; i < this.indexRange+1; i++) {
      let summaryField = this.dateFilterMatch(i, this.summaryOverviews);
      let pySummaryField = this.dateFilterMatch(i, this.pySummaryOverviews);

      let obj = {
        'date': summaryField.date_filter_ref,
        'currentYear': summaryField.match,
        'previousYear': pySummaryField.match
      }
      this.tableOverviews.push(obj);      
    }
    //indexArray is used to create the array used for tableOverview indexing in the table.component template
    this.indexArray = Array(this.tableOverviews.length).fill(0).map((x,i:number)=> i);      

  }

  dateFilterMatch(index, overviews) {
    let overview = overviews.find((overview)=> overview.date_filter== index);     
    if (overview[this.sourceField]['average'] == null ) {
      return {match:'-', date_filter_ref: overview.date_filter_ref}
    }

    else {
      this.dataExists = true;
      return {match: overview[this.sourceField]['average'], date_filter_ref: overview.date_filter_ref}
    }
  }

  setPreviousYear() {
    let currentYear = +this.year-1;
    this.previousYear = currentYear.toString();
  }

  ngOnChanges(changes: SimpleChanges) {
     if ( (changes['summaryOverviews'] && changes['summaryOverviews'].firstChange == false) || 
         (changes['pySummaryOverviews'] && changes['pySummaryOverviews'].firstChange == false) &&
         (this.summaryOverviews.length == this.pySummaryOverviews.length)
        ) 
     {  
        this.createTableData(this.dateView);
     }
  }



}

