import { Component, OnInit, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.css']
})
export class ChartJsComponent implements OnInit {
  chart: Chart;
  context: ElementRef;

  constructor() { }

  ngOnInit() {
    // context = document.get
    // chart = new Chart(context, {

    // })
  }

}
