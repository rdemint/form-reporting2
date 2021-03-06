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
  isLoading: boolean;
  isLoadingPY: boolean;

  constructor(
  	private dateService: DateService, 
  	private dashService: DashService
  	) { }

  ngOnInit() {
  	this.dashService.loadDashView().subscribe((dashview)=> this.dashView = dashview);
  	this.dashService.loadDateView().subscribe((dateview)=> this.dateView = dateview);
  	this.dashService.loadSourceField().subscribe((field)=> this.sourceField = field);
    this.dashService.loadLoadingStatus().subscribe((bool)=> this.isLoading = bool);
    this.dashService.loadPYLoadingStatus().subscribe((pybool)=> this.isLoadingPY = pybool);
  }

  selectDashView(view) {
    this.dashService.selectDashView(view);
  }

  selectDateView(view) {
    this.dashService.selectDateView(view);
  }

  selectSourceField(field) {
    this.dashService.selectSourceField(field);
  }

}
