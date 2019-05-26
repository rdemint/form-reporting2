import { Component, OnInit, Input } from '@angular/core';
import { Specialty, DailySummary } from '../../models';

@Component({
  selector: 'app-practice-detail-specialties-list',
  templateUrl: './practice-detail-specialties-list.component.html',
  styleUrls: ['./practice-detail-specialties-list.component.css']
})
export class PracticeDetailSpecialtiesListComponent implements OnInit {
	@Input() specialties: Specialty[];
	@Input() dailySummaries: DailySummary[];
	@Input() pyDailySummaries: DailySummary[];
	
  constructor() { }

  ngOnInit() {
  }

}
