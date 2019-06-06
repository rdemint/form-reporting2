import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService} from '../../services/daily-summary.service';
import { DashService } from '../../services/dash.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../services/date.service';
import { PracticeService } from '../../practice/practice.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-practice-container',
  templateUrl: './practice-container.component.html',
  styleUrls: ['./practice-container.component.css']
})
export class PracticeContainerComponent implements OnInit {
  	user: User;
  	practice: Practice;
  	dailySummaries: DailySummary[];
    pyDailySummaries: DailySummary[];

  constructor(
    private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dashService: DashService,
    private userService: UserService,
    private route: ActivatedRoute,
  	) { }

  ngOnInit() {
  	    this.userService.loadUser().subscribe((user)=> this.user = user);
    combineLatest(
      this.route.paramMap, 
      this.route.queryParamMap,
      this.dashService.loadDateView())
      .subscribe(
          ([params, queryparams, view]) => {
            this.practiceService.getPractice(params.get('practice_slug'))
              .subscribe(
                (practice)=> this.practice = practice
              );
            this.getDailySummaries('practice', this.practice.slug, view);
            this.getPYDailySummaries('practice', this.practice.slug, view);
          }
        );
   }

  getDailySummaries(type, slug, view) {
    this.dailySummaryService.getDailySummaries(type, slug, view)
        .subscribe((dailySummaries)=> {
          this.dailySummaries = dailySummaries;
        });
  } 

  getPYDailySummaries(type, slug, view) {
    this.dailySummaryService.getPYDailySummaries(type, slug, view)
      .subscribe((pyDailySummaries)=> this.pyDailySummaries = pyDailySummaries)
  }

  setPreviousYear(yearString) {
    let previousYear = +yearString-1;
    return previousYear.toString();
  }

}
