import { Input, Component, OnInit } from '@angular/core';
import { Specialty, Provider, Practice, SummaryOverview, Collection } from '../../models';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
	  @Input() source: Specialty | Provider | Practice;
	  @Input() summaryOverviews: SummaryOverview[];
    @Input() pySummaryOverviews: SummaryOverview[];
    @Input() sourceField: string;
    @Input() sourceFieldStr: string;
    @Input() sourceType: string;
	  @Input() dashView: string;
    @Input() dateView: string;
    @Input() collections: Collection;
    @Input() pyCollections: Collection;
     isLoading: boolean = true;

  constructor(
  	) { }

  ngOnInit() {
         }
}
