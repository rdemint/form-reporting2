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
  	// trying this
  	this.dailySummaries = this.dailySummaries.filter((summary)=> summary.provider == this.provider.id);
    this.pyDailySummaries = this.pyDailySummaries.filter((summary)=> summary.provider == this.provider.id);
  	// 
  }

}
