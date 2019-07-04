import { EventEmitter, Component, Input, Output, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { DailySummary, Practice, Provider, Specialty, SummaryOverview } from '../../models';
import { DateService } from '../../services/date.service';
import { DashService } from '../../services/dash.service';
import * as CanvasJs from '../../../../node_modules/canvasjs-2.3.1/canvasjs.min.js';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent implements OnInit, OnChanges {
	@Input() summaryOverviews: SummaryOverview[];
	@Input() source: Specialty | Provider | Practice;
	@Input() pySummaryOverviews: SummaryOverview[];	
	@Input() sourceType: string;
	@Input() chartName: string;
	@Input() sourceField: string;
	@Input() loading: boolean;
	@Input() chartDateHeader: string;
	@Output() setLoadingOutput = new EventEmitter();

	current_year: string;
	previous_year: string;
	dateRef: string;
	chart: any;
	chart_data: any;
	py_chart_data: any;
	canvasJsData = [];

	  constructor(private dateService: DateService, private dashService: DashService) { }

	  ngOnInit() {
	   	this.createChartData();

	  }

	  _setLoading(bool: boolean) {
	  	this.setLoadingOutput.emit(bool);
	  }

	  _initChartData() {
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

	    	this._initChartData();   
	    	this._setLoading(true);
	    	this.canvasJsData = [];
	          if (this.summaryOverviews != undefined && this.summaryOverviews.length != 0) {	          		            
	            this.chart_data[this.sourceField] = this.summaryOverviews.map((summary)=> ({label: summary['date_filter_ref'], y: summary[this.sourceField]['average']}));	           	            	         
	            this.canvasJsData.push({
	             type: "spline",
	             visible: true,
	             showInLegend: true,
	             name: this.dateService.currentYear + ' ' + this.dashService.source_fields_dict[this.sourceField],
	             dataPoints: this.chart_data[this.sourceField]
	            });
	          }
	          if (this.pySummaryOverviews != undefined && this.pySummaryOverviews.length != 0) {
	            	            this.chart_data[this.sourceField] = this.pySummaryOverviews.map((summary)=> ({label: summary['date_filter_ref'], y: summary[this.sourceField]['average']}));	           
	            this.canvasJsData.push({
	             type: "spline",
	             visible: true,
	             showInLegend: true,
	             name: this.dateService.previousYear + ' ' + this.dashService.source_fields_dict[this.sourceField],
	             dataPoints: this.py_chart_data[this.sourceField]
	            });
	          }
	     }

	    _setDateRef() {
	    	let overview_type = this.summaryOverviews[0]['overview_type'];
	    	if (overview_type == 'monthly') {
	    		this.dateRef = 'Month';
	    	}

	    	if (overview_type == 'daily') {
	    		this.dateRef = this.dateService.currentMonthShort;
	    	}
	    }


	    createChart() {
	    	this._setDateRef();
	        this.chart = new CanvasJs.Chart(this.chartName, {
	         theme: "light2",
	         animationEnabled: false,
	         exportEnabled: true,
	         axisX : {
	           title: this.dateRef,
	           includeZero: false
	         },
	         axisY : {
	           includeZero: true,
	           title: "Average",
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

	    updateChart() {
			this.createChartData();
			this.createChart();
			this.chart.render();    	
		
	    }

	    ngOnChanges(changes: SimpleChanges) {
	 	 //   		if (changes['dashView'] && changes['dashView'].firstChange == false) {
	 	 //   			this.updateChart();
	 	 //   		}

	 	 //   		if (changes['sourceField'] && changes['sourceField'].firstChange == false) {
				// 	this.updateChart();
				// }  

				if (changes['summaryOverviews'] && changes['summaryOverviews'].firstChange == false) {
					this.updateChart();
				}	    		

				if (changes['pySummaryOverviews'] && changes['pySummaryOverviews'].firstChange == false) {
					this.updateChart();
				}
	    }

}
