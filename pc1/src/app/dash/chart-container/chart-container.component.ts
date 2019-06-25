import { Component, OnInit,Input } from '@angular/core';
import { DailySummary, Provider, Practice, Specialty, SummaryOverview } from '../../models';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {
	@Input() summaryOverviews: SummaryOverview[];
	@Input() pySummaryOverviews: SummaryOverview[];
	@Input() source: Provider | Practice | Specialty;
	@Input() sourceType: string;
	@Input() sourceField: string;
	@Input() dashView: string;
	@Input() dateView: string;

	loading: boolean = true;
	chartName: string;
  

  constructor() { }

  ngOnInit() {
  	this.chartName = 'chart' + this.sourceType + this.source.id;    
  }

  _setLoading(bool: boolean) {
  	this.loading = bool;
  }



}
