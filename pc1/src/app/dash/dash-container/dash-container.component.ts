import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, DailySummary, Practice, SummaryOverview, Entity } from '../../models';
import { SummaryOverviewService } from '../../services/summary-overview.service';
import { DashService } from '../../services/dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dash-container',
  templateUrl: './dash-container.component.html',
  styleUrls: ['./dash-container.component.css']
})
export class DashContainerComponent implements OnInit {
    @Input() org: Practice | Entity;
	  @Input() source: Specialty | Provider | Practice;
    @Input() sourceType: string; 
    summaryOverviews: SummaryOverview[];
    pySummaryOverviews: SummaryOverview[];
    sourceField: string;
    sourceFieldStr: string;
    dashView: string;
    dateView: string;
    

  constructor(
  	private dashService: DashService, 
  	private summaryOverviewService: SummaryOverviewService,
  	) { }

  ngOnInit() {

  	combineLatest(
      this.dashService.loadDashView(),
  		this.dashService.loadDateView(),
  		this.dashService.loadSourceField(),
  		).subscribe(
  			([dashView, dateView, sourceField]) => {
          if (dateView && sourceField != null) {
            this.dashView = dashView;     
            this.dateView = dateView;            
            this.sourceField = sourceField;
            this.sourceFieldStr= this.dashService.source_fields_dict[sourceField];       
            this.summaryOverviewService.getSummaryOverviews(this.org.org_type, this.org.id, dateView, this.sourceType, this.source.id)
              .subscribe(
                (overviews)=> {
                  this.summaryOverviews = overviews;                 
                }
             );
             this.summaryOverviewService.getPYSummaryOverviews(this.org.org_type, this.org.id, dateView, this.sourceType, this.source.id)
               .subscribe(
                 (overviews)=> {
                   this.pySummaryOverviews = overviews;
                 }
               );
          }
  		  }
  		);
  }
}
