import { Component, OnInit, Input } from '@angular/core';
import { Provider, DailySummary } from '../../models';

@Component({
  selector: 'app-practice-detail-provider',
  templateUrl: './practice-detail-provider.component.html',
  styleUrls: ['./practice-detail-provider.component.css']
})
export class PracticeDetailProviderComponent implements OnInit {
	@Input() provider: Provider;
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];

  constructor() { }

  ngOnInit() {
  }

}
