import { Component, OnInit, Input } from '@angular/core';
import { Provider, DailySummary} from '../../models';
@Component({
  selector: 'app-practice-detail-providers-list',
  templateUrl: './practice-detail-providers-list.component.html',
  styleUrls: ['./practice-detail-providers-list.component.css']
})
export class PracticeDetailProvidersListComponent implements OnInit {
	@Input() providers: Provider[];
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	
  constructor() { }

  ngOnInit() {
  }

}
