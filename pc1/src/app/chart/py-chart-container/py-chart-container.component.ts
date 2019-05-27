import { Component, OnInit, Input } from '@angular/core';
import { DailySummary, Provider, Specialty } from '../../models';

@Component({
  selector: 'app-py-chart-container',
  templateUrl: './py-chart-container.component.html',
  styleUrls: ['./py-chart-container.component.css']
})
export class PyChartContainerComponent implements OnInit {
	// Intended to manage the drop downs and selections
  constructor() { }
  @Input() dailySummaries: DailySummary[];
  @Input() pyDailySummaries: DailySummary[];
  @Input() chartName: string;
  @Input() dailySummaryField: string;
  dashType: string = 'table';
  dateView: string= 'MTD';



  ngOnInit() {
  }

}
