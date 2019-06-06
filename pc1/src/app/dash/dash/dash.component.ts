import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, DailySummary, Practice } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { DashService } from '../../services/dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
	  @Input() source: Specialty | Provider | Practice;
	  @Input() sourceType: string;
	  dailySummaries: DailySummary[];
  	pyDailySummaries: DailySummary[];
    sourceField: string;
	  dashView: string;
	  dateView: string;

  constructor(
  	private dailySummaryService: DailySummaryService, 
  	private dashService: DashService
  	) { }

  ngOnInit() {
    this.dashService.loadDashView().subscribe((view)=> this.dashView = view);
    this.dashService.loadDateView().subscribe((view)=> this.dateView = view);
    this.dashService.loadSourceField().subscribe((field)=> this.sourceField = field);
  	this.dailySummaryService
  		.loadDailySummaries().subscribe(
        (summaries)=> {
          if (summaries != null) {
          this.dailySummaries = summaries.filter(
          (summary)=> summary[this.sourceType] == this.source.id
          );
        }

      }
      );
    this.dailySummaryService
      .loadPYDailySummaries().subscribe(
         (summaries)=> {
          if (summaries != null) {
          this.pyDailySummaries = summaries.filter(
          (summary)=> summary[this.sourceType] == this.source.id
          );
        }
      }
      );
  	
  	// this.dashView$ = this.dashService.loadDashView();
   //  this.dateView$ = this.dashService.loadDateView();
   //  this.dailySummaryField$ = this.dashService.loadDailySummaryField();
  }

}
