import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService} from '../../services/daily-summary.service';
import { DashService } from '../../services/dash.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../services/date.service';
import { PracticeService } from '../../services/practice.service';
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
      this.dashService.loadDateView())
      .subscribe(
          ([params, view]) => {
            this.practiceService.getPractice(params.get('practice_slug'))
              .subscribe(
                (practice)=> {
                  this.practice = practice;
                }
              );
          }
        );
   }

}
