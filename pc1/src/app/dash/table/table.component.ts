import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary, SummaryOverview} from '../../models';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
	@Input() tableOverviews: SummaryOverview[];
  @Input() pyTableOverviews: SummaryOverview[];
	@Input() previousYear: string;
	@Input() year: string;
	@Input() sourceField: string;
  @Input() sourceFieldStr: string;
  @Input() dataExists: boolean;
  @Input() indexArray: any;
  @Input() tableDateHeader: string;
  
	displayedColumns = ["date", 'previousYear', 'year'];
  columnslength = [1,2,3];

  constructor() { }

  ngOnInit() {                       
     }

}
