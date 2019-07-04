import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../services/date.service';
import { PracticeService } from '../../services/practice.service';
import { MessageService } from '../../services/message.service';
import { ErrorService } from '../../services/error.service';
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
    nullSummaryText = 'Please fill out the visits and workdays before submitting.';
  constructor(    
  	private practiceService: PracticeService,
    private dashService: DashService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute,
    private message: MessageService,
    private error: ErrorService
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
                  this.practiceService.setPractice(practice);
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
    if (dailySummary.visits == null || dailySummary.workdays==null) {
      this.error.catch(this.nullSummaryText);
    }

    else {
      this.dailySummaryService.postSummary(dailySummary)
        .subscribe(
          (resp)=> {
            this.message.throw('Summary created');
          this.getDailySummaries('practice', this.practice.id, 'ytd');    
        },
        (err)=> {
          this.error.catch('Something went wrong...your summary was not saved.  Check your input values and try again, or check back later.')
        });
    }
    }

    putSummary(dailySummary) {
      // Sets the user ID to populate the submitted_by property field.  PUTS the summary to the backend
    if (dailySummary.visits == null || dailySummary.workdays==null) {
      this.error.catch(this.nullSummaryText);
    }

    else {
      let id = dailySummary['id'];
      dailySummary['submitted_by'] = this.user.id;
      this.dailySummaryService.putSummary(dailySummary, id)
        .subscribe((resp)=> {
          this.message.throw('Summary updated');
          this.getDailySummaries('practice', this.practice.id, 'ytd');    
        }, 
        (err)=> {
          this.error.catch('Something went wrong...your summary was not updated.  Check your input values and try again, or check back later.');
          console.log(err);
        });
      }
    }

}
