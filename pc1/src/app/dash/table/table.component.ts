import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary} from '../../models';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	@Input() tableDailySummaries: DailySummary[];
	@Input() previousYear: string;
	@Input() year: string;
	@Input() sourceField: string;
	displayedColumns = ["date", 'previousYear', 'year'];

  constructor() { }

  ngOnInit() {
  

  }

}
