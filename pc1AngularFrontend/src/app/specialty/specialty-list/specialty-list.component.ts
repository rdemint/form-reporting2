import { Input, Component, OnInit } from '@angular/core';
import { Entity, Practice, Specialty, DailySummary } from '../../models';


@Component({
  selector: 'app-specialty-list',
  templateUrl: './specialty-list.component.html',
  styleUrls: ['./specialty-list.component.css']
})
export class SpecialtyListComponent implements OnInit {
	@Input() specialties: Specialty[];
	@Input() org: Entity | Practice;
  constructor() { }

  ngOnInit() {
  }

}
