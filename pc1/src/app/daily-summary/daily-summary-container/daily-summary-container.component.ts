import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DailySummary, User, Practice } from '../../models';
import { DailySummaryService } from '../../services/daily-summary.service';
import { environment } from '../../../environments/environment';
import { UserService } from '../../user/user.service';
import { DateService } from '../../services/date.service';
import { PracticeService } from '../../practice/practice.service';
import { combineLatest, Observable } from 'rxjs';

@Component({
  selector: 'app-practice-container',
  templateUrl: './daily-summary-container.component.html',
  styleUrls: ['./daily-summary-container.component.css']
})
export class DailySummaryContainerComponent implements OnInit {
    user: User;
    practice: Practice;
    dailySummaries: DailySummary[];
    practice_slug: string;
    year: string;
    month: string;

  constructor(
    private practiceService: PracticeService,
    private dailySummaryService: DailySummaryService,
    private dateService: DateService,
    private userService: UserService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    // this container has the same functionality as practice-container
    // the two could be merged with a behaviorsubject service combination
    // (on the to-do list)
    this.userService.loadUser().subscribe((user)=> this.user = user);
    combineLatest(
      this.route.paramMap, 
      this.route.queryParamMap,
      )
      .subscribe(
          ([params, queryparams]) => {
            this.practiceService.getPractice(params.get('practice_slug'))
              .subscribe(
                (practice)=> {
                  this.practice = practice;
                  this.getDailySummaries('practice', this.practice.slug, 'ytd');
                }
              );
            
            
          }
        );
   }

  getDailySummaries(type, slug, view) {
    this.dailySummaryService.getDailySummaries(type, slug, view)
        .subscribe((dailySummaries)=> {
          // this.dailySummaryService.selectDailySummaries(dailySummaries);
          this.dailySummaries = dailySummaries;
        });
  } 

    addSummary(dailySummary) {
      this.dailySummaryService.postSummary(dailySummary)
        .subscribe((resp)=> {
          this.getDailySummaries('practice', this.practice.slug, 'ytd');    
        });
    }

    putSummary(dailySummary) {
      // Sets the user ID to populate the submitted_by property field.  PUTS the summary to the backend
      let id = dailySummary['id'];
      dailySummary['submitted_by'] = this.user.id;
      this.dailySummaryService.putSummary(dailySummary, id)
        .subscribe((resp)=> {
          this.getDailySummaries('practice', this.practice.slug, 'ytd');    
        });
    }

}
