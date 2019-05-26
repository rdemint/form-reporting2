import { Component, OnInit, Input } from '@angular/core';
import { Specialty, DailySummary } from '../../models';

@Component({
  selector: 'app-practice-detail-specialty',
  templateUrl: './practice-detail-specialty.component.html',
  styleUrls: ['./practice-detail-specialty.component.css']
})
export class PracticeDetailSpecialtyComponent implements OnInit {
	@Input() specialty: Specialty;
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	
  constructor() { }

  ngOnInit() {

  }

}
