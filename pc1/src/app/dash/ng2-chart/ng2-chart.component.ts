import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ng2-chart',
  templateUrl: './ng2-chart.component.html',
  styleUrls: ['./ng2-chart.component.css']
})
export class Ng2ChartComponent implements OnInit {
  @Input() chartData: any[];
  @Input() chartLabels: string[];
  @Input() chartType: string;
  @Input() chartLegend: boolean;
  @Input() chartOptions: any;
  @Input() chartColors: any;

  constructor() { }

  ngOnInit() {
  }

}
