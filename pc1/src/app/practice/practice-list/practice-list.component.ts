import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Practice, DailySummary } from '../../models';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-practice-list',
  templateUrl: './practice-list.component.html',
  styleUrls: ['./practice-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PracticeListComponent implements OnInit {
	@Input() practices: Practice[];
	@Input() dailySummaries: DailySummary[];
	
  constructor(private router: Router) { }

  ngOnInit() {
  }

  navToPractice(practiceSlug) {
    this.router.navigate(['practices/', practiceSlug], {preserveQueryParams: true});
  }

}
