import { Component, OnInit, Input, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Practice, DailySummary} from '../../models';
import { EntityService } from '../../entity/entity.service';
import * as CanvasJs from '../../../../node_modules/canvasjs-2.3.1/canvasjs.min.js';

@Component({
  selector: 'app-py-chart',
  templateUrl: './py-chart.component.html',
  styleUrls: ['./py-chart.component.css']
})
export class PyChartComponent implements OnInit, AfterViewInit {
@Input() dailySummaries: DailySummary[];
@Input() pyDailySummaries: DailySummary[] = [];
@Input() chartName: string;
@Input() dailySummaryField: string;
@Input() dailySummaryFilterBy: string;
@Input() dailySummaryFilterValue: string;

current_year: string;
previous_year: string;
chart: any;
chart_data: any = {
  noshows: [],
  workdays: [],
  visits: [], 
  visits_per_workday: []
}

py_chart_data: any = {
  noshows: [],
  workdays: [],
  visits: [], 
  visits_per_workday: []
}
  constructor() { }

  ngOnInit() {
    this.current_year = this.dailySummaries[0].date.slice(0,4);
    this.previous_year = this.pyDailySummaries[0].date.slice(0,4); 
   	this.createChartData();
  }

    createChartData() {
          let summaries = this.dailySummaries.filter((summary)=> summary[this.dailySummaryFilterBy] == this.dailySummaryFilterValue);
          this.chart_data[this.dailySummaryField] = summaries.map((summary)=> ({label: summary.date, y: summary[this.dailySummaryField]}));
          let pySummaries = this.pyDailySummaries.filter((summary)=> summary[this.dailySummaryFilterBy] == this.dailySummaryFilterValue);
          this.py_chart_data[this.dailySummaryField] = pySummaries.map((summary)=> ({label: summary.date, y: summary[this.dailySummaryField]}));
        }

    createChart() {
         this.chart = new CanvasJs.Chart(this.chartName, {
         theme: "light2",
         animationEnabled: false,
         exportEnabled: true,
         axisX : {
           title: "Date",
           includeZero: false
         },
         axisY : {
           includeZero: false,
           title: "Count",
         },
         tooltip: {
           cursor: "pointer"
         },
         legend: {
           cursor: "pointer"
         },
         data: [
           {
             type: "spline",
             visible: true,
             showInLegend: true,
             name: this.current_year + ' ' + this.dailySummaryField,
             dataPoints: this.chart_data[this.dailySummaryField]
           },
           {
             type: "spline",
             visible: true,
             showInLegend: true,
             name: this.previous_year + ' ' + this.dailySummaryField,
             dataPoints: this.py_chart_data[this.dailySummaryField]
           },
         ]
       });
    }

    ngAfterViewInit() {
      this.createChart();
      this.chart.render();
    }

}
