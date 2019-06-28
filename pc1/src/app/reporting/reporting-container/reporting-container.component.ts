import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../services/date.service';
import { PracticeService } from '../../services/practice.service';
import { DashService } from '../../services/dash.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-reporting-container',
  templateUrl: './reporting-container.component.html',
  styleUrls: ['./reporting-container.component.css']
})
export class ReportingContainerComponent implements OnInit {
    user: User;
    practice: Practice;
    dailySummaries: DailySummary[];
    practice_slug: string;
    year: string;
    month: string;

  constructor(    
  	private practiceService: PracticeService,
    private dashService: DashService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
  	this.userService.loadUser().subscribe((user)=> this.user = user);
    
    combineLatest(
      this.route.parent.params,
      this.route.queryParamMap,
      )
      .subscribe(
          ([params, queryparams]) => {
            this.practiceService.getPractice(params['practice_slug'])
              .subscribe(
                (practice)=> {
                  this.practice = practice;
                  this.practiceService.selectPractice(practice);
                  this.getDailySummaries('practice', this.practice.id, 'ytd');
                }
              );
            
            
          }
          );
    
  }

    getDailySummaries(type, id, view) {
    this.dailySummaryService.getDailySummaries(type, id, view)
        .subscribe((dailySummaries)=> {
          // this.dailySummaryService.selectDailySummaries(dailySummaries);
          this.dailySummaries = dailySummaries;          
        });
  } 

    addSummary(dailySummary) {      
      this.dailySummaryService.postSummary(dailySummary)
        .subscribe((resp)=> {
          this.getDailySummaries('practice', this.practice.id, 'ytd');    
        });
    }

    putSummary(dailySummary) {
      // Sets the user ID to populate the submitted_by property field.  PUTS the summary to the backend
      let id = dailySummary['id'];
      dailySummary['submitted_by'] = this.user.id;
      this.dailySummaryService.putSummary(dailySummary, id)
        .subscribe((resp)=> {
          this.getDailySummaries('practice', this.practice.id, 'ytd');    
        });
    }

}
