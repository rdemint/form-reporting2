import { Input, Component, Output, ViewChild, ChangeDetectionStrategy, ElementRef, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DailySummary, Practice, Provider } from '../../models';
import { FormControl } from '@angular/forms';
import { DailySummaryService } from '../../services/daily-summary.service';

@Component({
  selector: 'app-daily-summary',
  templateUrl: './daily-summary.component.html',
  styleUrls: ['./daily-summary.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DailySummaryComponent implements OnInit, OnChanges {
	@Input() practice: Practice;
	@Input() provider: Provider;
	@Input() selectedDate: Date;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>(); 
  nullDailySummary: DailySummary = {id: null, practice: null, provider: null, visits: null, noshows: null, workdays: null, date: null, specialty: null, visits_per_workdays: null};
  @Input() dailySummaries: DailySummary[];
  dailySummary: DailySummary;
 

  dailySummaryExists: boolean = false;
  editing: boolean = false;
  dailySummaryDisabled: boolean = false;

  // Refactor
  providerDailySummaries = {}; 
  providerSpecialtiesForm: FormControl;
// 
  constructor(private dailySummaryService: DailySummaryService) { }

  ngOnInit() {    
    // this.dailySummaryService.loadDailySummaries()
    //   .subscribe((summaries)=> {
    //     this.dailySummaries = summaries;
    //     console.log(summaries);
    //     this.findSummaries();
      // });
      this.findSummaries();
  }

 formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  findSummaries() {
    let date = this.formatDate(this.selectedDate);
    this.dailySummaryExists = false;
    let specialties = this.provider.specialties;

    let practice_specialties = this.practice.specialties.filter((specialty)=> specialties.includes(specialty['name']));

    for (let i = 0; i < practice_specialties.length; i++) {
      let summary = this.dailySummaries.filter((summary)=> {
           if (
             summary.practice == this.practice.id && 
             summary.provider == this.provider.id && 
             summary.date == date &&
             summary.specialty == practice_specialties[i]['id']
             ) 
               {return true }
            else 
              { return false}
            })[0];
      this.providerDailySummaries[practice_specialties[i].name] = this.summaryOrNull(summary);
    }
  }

  summaryOrNull(summary) {
    if (summary == undefined) {
      return this.nullDailySummary;
    }

    else {
      this.dailySummaryExists = true; 
      return summary }
  }

  addSummary(dailySummary) {
    this.dailySummaryExists = true;
    this.addSummaryOutput.emit(dailySummary)}

  putSummary(dailySummary) {
    this.editing = false;
    this.putSummaryOutput.emit(dailySummary);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate'] && changes['selectedDate'].firstChange == false) {
      this.findSummaries(); 
    }

    if (changes['dailySummaries'] && this.practice != undefined ||
      changes['practice'] && this.dailySummaries != undefined ) {
      this.findSummaries();
    }
  }




}
