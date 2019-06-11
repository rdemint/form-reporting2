import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, DailySummary, Practice } from '../../models';
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
	  // @Input() sourceType: string;
	  dailySummaries: DailySummary[];
  	pyDailySummaries: DailySummary[];
    sourceField: string;
    sourceType: string;
	  dashView: string;
	  dateView: string;

  constructor(
  	private dailySummaryService: DailySummaryService, 
  	private dashService: DashService
  	) { }

  ngOnInit() {

    combineLatest(
      this.dashService.loadDashView(),
      this.dashService.loadDateView(),
      this.dashService.loadSourceField(),
      this.dashService.loadSourceType(),
      this.dailySummaryService.loadDailySummaries(),
      this.dailySummaryService.loadPYDailySummaries()
      ).subscribe(
      ([dashView, dateView, sourceField, sourceType, dailySummaries, pyDailySummaries])=> {
        this.dashView = dashView;
        this.dateView = dateView;
        this.sourceField = sourceField;
        this.sourceType = sourceType;
        if (dailySummaries != null) {
          this.dailySummaries = dailySummaries.filter(
            (summary)=> summary[sourceType] == this.source.id
            );
        }
    
        if (pyDailySummaries != null) {
          this.pyDailySummaries = pyDailySummaries.filter(
            (summary)=> summary[sourceType] == this.source.id
          )
        }
      });


   //  this.dashService.loadDashView().subscribe((view)=> this.dashView = view);
   //  this.dashService.loadDateView().subscribe((view)=> this.dateView = view);
   //  this.dashService.loadSourceField().subscribe((field)=> this.sourceField = field);
   //  this.dashService.loadSourceType().subscribe((type)=> this.sourceType = type);
  	// this.dailySummaryService
  	// 	.loadDailySummaries().subscribe(
   //      (summaries)=> {
   //        if (summaries != null) {
   //        this.dailySummaries = summaries.filter(
   //        (summary)=> summary[this.sourceType] == this.source.id
   //        );
   //      }

   //    }
   //    );
   //  this.dailySummaryService
   //    .loadPYDailySummaries().subscribe(
   //       (summaries)=> {
   //        if (summaries != null) {
   //        this.pyDailySummaries = summaries.filter(
   //        (summary)=> summary[this.sourceType] == this.source.id
   //        );
   //      }
   //    }
   //    );

  }

}
