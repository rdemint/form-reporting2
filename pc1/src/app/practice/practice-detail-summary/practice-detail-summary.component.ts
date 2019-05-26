import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary } from '../../models';

@Component({
  selector: 'app-practice-detail-summary',
  templateUrl: './practice-detail-summary.component.html',
  styleUrls: ['./practice-detail-summary.component.css']
})
export class PracticeDetailSummaryComponent implements OnInit {
	@Input() dailySummaries: DailySummary[];
	@Input() practice: Practice;

  constructor() { }

  ngOnInit() {
  }

}
