import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, DailySummary, Practice } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { DashService } from '../../services/dash.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';

@Component({
  selector: 'app-dash-container',
  templateUrl: './dash-container.component.html',
  styleUrls: ['./dash-container.component.css']
})
export class DashContainerComponent implements OnInit {
	dailySummaries: DailySummary[];
  	pyDailySummaries: DailySummary[];

  constructor(
  	private dashService: DashService, 
  	private dailySummaryService: DailySummaryService
  	) { }

  ngOnInit() {
  	combineLatest(
  		this.dashService.loadDateView(),
  		this.dashService.loadSourceField(),
  		this.dashService.loadSourceType(),
  		this.dailySummaryService.loadDailySummaries(),
  		this.dailySummaryService.loadPYDailySummaries(),
  		).subscribe(
  			([dateView, sourceField, sourceType, dailySummaries, pyDailySummaries]) => {
  				
  		}

  		);

  }

}
