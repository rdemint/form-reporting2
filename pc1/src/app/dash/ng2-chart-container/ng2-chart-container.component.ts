import { Component, OnInit, Input } from '@angular/core';
import { SummaryOverview, Specialty, Provider, Practice, Collection } from 'src/app/models';
import { DateService } from 'src/app/services/date.service';
import { DashService } from 'src/app/services/dash.service';
import { ThemeService } from 'ng2-charts';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-ng2-chart-container',
  templateUrl: './ng2-chart-container.component.html',
  styleUrls: ['./ng2-chart-container.component.css']
})
export class Ng2ChartContainerComponent implements OnInit {
  @Input() source: Specialty | Provider | Practice;
  @Input() summaryOverviews: SummaryOverview[];
  @Input() pySummaryOverviews: SummaryOverview[];
  @Input() sourceField: string;
  @Input() sourceFieldStr: string;
  @Input() sourceType: string;
  @Input() dashView: string;
  @Input() dateView: string;
  @Input() collections: Collection[];
  @Input() pyCollections: Collection[];

  isLoading: boolean;
  chartData = [{data: [], label: ''}, {data: [], label: ''}];
  chartLabels: string[];
  chartType: string;
  chartLegend: boolean;
  chartOptions: any;
  chartTitle: string;
  chartColors: any;
  constructor(
    private dateService: DateService,
    private dashService: DashService,
    private themeService: ThemeService) { }

  ngOnInit() {
      this.chartType = 'line';
      this.chartLegend = true;
      this.chartOptions = {
        scalShowVerticalLines: false,
        responsive: true
      };
      this.chartTitle = this.dateService.currentYear + ' ' + this.dashService.source_fields_dict[this.sourceField],
      this.createChartData();
      this.chartColors = [
        {backgroundColor: "#303d8b"},
        {backgroundColor: "#20295f"}
      ]

  }

  createChartData() {
    this.chartData = [{data: [], label: ''}, {data: [], label: ''}];
    this.chartLabels = [];
    if (this.sourceField == 'collections')
    if (this.summaryOverviews != undefined && this.summaryOverviews.length != 0) {
      let cyData = this.summaryOverviews.map(
        (summary) => summary[this.sourceField]['average']
      );

      let pyData = this.pySummaryOverviews.map(
        (summary) => summary[this.sourceField]['average']
      );
      this.chartData = [
        {data: cyData, label: this.dateService.currentYear},
        {data: pyData, label: this.dateService.previousYear}
      ];
      this.chartLabels = this.summaryOverviews.map(
        (summary) => summary['date_filter_ref']
      );

    }

  }


}
