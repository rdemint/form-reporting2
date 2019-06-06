import { Component, OnInit } from '@angular/core';
import { DashService } from '../../services/dash.service';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-dash-selector',
  templateUrl: './dash-selector.component.html',
  styleUrls: ['./dash-selector.component.css']
})
export class DashSelectorComponent implements OnInit {
	dashView: string;
	dateView: string;
	sourceField: string;
	
  constructor(
  	private dateService: DateService, 
  	private dashService: DashService
  	) { }

  ngOnInit() {
  	this.dashService.loadDashView().subscribe((dashview)=> this.dashView = dashview);
  	this.dashService.loadDateView().subscribe((dateview)=> this.dateView = dateview);
  	this.dashService.loadDailySummaryField().subscribe((field)=> this.sourceField = field);
  }

  selectDashView(view) {
    this.dashService.selectDashView(view);
  }

  selectDateView(view) {
    this.dashService.selectDateView(view);
  }

}
