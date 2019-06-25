import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, DailySummary, Practice, SummaryOverview } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { DashService } from '../../services/dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
	  @Input() source: Specialty | Provider | Practice;
	  @Input() summaryOverviews: SummaryOverview[];
    @Input() pySummaryOverviews: SummaryOverview[];
    @Input() sourceField: string;
    @Input() sourceFieldStr: string;
    @Input() sourceType: string;
	  @Input() dashView: string;
	  @Input() dateView: string;
     isLoading: boolean = true; 

  constructor(
  	private dailySummaryService: DailySummaryService, 
  	private dashService: DashService
  	) { }

  ngOnInit() {     
         }
}
