import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DailySummary, Practice, Provider, Specialty } from '../../models';
import * as CanvasJs from '../../../../node_modules/canvasjs-2.3.1/canvasjs.min.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	@Input() source: Practice | Provider | Specialty;
	@Input() sourceType: string;
	@Input() chartName: string;
	@Input() sourceField: string;

	current_year: string;
	previous_year: string;
	chart: any;
	chart_data: any;
	py_chart_data: any;
	canvasJsData = [];

	  constructor() { }

	  ngOnInit() {
	  	this.initChartData();
	   	this.createChartData();

	  }

	  	initChartData() {
	  		this.chart_data = {
	  			noshows: [],
			  workdays: [],
			  visits: [], 
			  visits_per_workdays: []
			};

			this.py_chart_data = {
			  noshows: [],
			  workdays: [],
			  visits: [], 
			  visits_per_workdays: []
			};

			
	  	}

	    createChartData() {
	    	this.canvasJsData = [];
	          if (this.dailySummaries != undefined && this.dailySummaries.length != 0) {
	            this.chart_data[this.sourceField] = this.dailySummaries.map((summary)=> ({label: summary.date.slice(5), y: summary[this.sourceField]}));
	            this.current_year = this.dailySummaries[0].date.slice(0,4);
	            this.canvasJsData.push({
	             type: "spline",
	             visible: true,
	             showInLegend: true,
	             name: this.current_year + ' ' + this.sourceField,
	             dataPoints: this.chart_data[this.sourceField]
	            });
	          }
	          if (this.pyDailySummaries != undefined && this.pyDailySummaries.length != 0) {
	            this.py_chart_data[this.sourceField] = this.pyDailySummaries.map((summary)=> ({label: summary.date.slice(5), y: summary[this.sourceField]}));
	            this.previous_year = this.pyDailySummaries[0].date.slice(0,4);      
	            this.canvasJsData.push({
	             type: "spline",
	             visible: true,
	             showInLegend: true,
	             name: this.previous_year + ' ' + this.sourceField,
	             dataPoints: this.py_chart_data[this.sourceField]
	            });
	          }
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
	         data: this.canvasJsData
	       });
	    }


	    ngAfterViewInit() {	    
	      this.createChart();
	      this.chart.render();
	    }

	    ngOnChanges(changes: SimpleChanges) {
	 	   		if (
	 	   			changes['dashView'] && changes['dashView'].firstChange == false ||
	 	   			changes['sourceField'] && changes['sourceField'].firstChange == false ||
	 	   			changes['dailySummaries'] && changes['dailySummaries'].firstChange == false ||
	 	   			changes['pyDailySummaries'] && changes ['pyDailySummaries'].firstChange == false
	 	   			)
	    		{
    			this.initChartData();
    			this.createChartData();
    			this.createChart();
    			this.chart.render();
	    		}	    		 
	    }

}
