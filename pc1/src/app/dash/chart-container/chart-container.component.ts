import { Component, OnInit,Input } from '@angular/core';
import { DailySummary, Provider, Practice, Specialty } from '../../models';

@Component({
  selector: 'app-chart-container',
  templateUrl: './chart-container.component.html',
  styleUrls: ['./chart-container.component.css']
})
export class ChartContainerComponent implements OnInit {
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	@Input() source: Provider | Practice | Specialty;
	@Input() sourceType: string;
	@Input() sourceField: string;
	@Input() dashView: string;
	@Input() dateView: string;
	chartName: string;
  constructor() { }

  ngOnInit() {
  	  	 this.chartName = 'chart' + this.sourceType + this.source.id;
  }

}
