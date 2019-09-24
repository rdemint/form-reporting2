import { Input, Output, EventEmitter, Component, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DailySummary, Practice, Collection } from '../../models';
import { DateService } from '../../services/date.service';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit, AfterViewInit {
  @Input() practice: Practice;
  @Input() collection: Collection;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>();
  @Output() selectedDateOutput = new EventEmitter<Date>();
  @Input() dailySummaries: DailySummary[];
  @ViewChild('listhelptext') listHelpText: ElementRef;
  selectedDateForm: FormControl;
  selectedDate: Date;
  today: Date;
  twoWeeks: Date;
  twoWeeksPrior: Date;


  constructor(private dateService: DateService, private renderer: Renderer2) { }

  ngOnInit() {
    this.today = new Date();
    this.twoWeeksPrior = this.setTwoWeeksPrior(this.today);
    this.selectedDate = this.setDate();
    this.selectedDateForm = new FormControl(this.today);
    this.selectedDateForm.valueChanges.subscribe(
      (date)=> {
        this.selectedDate = date;
        this.selectedDateOutput.emit(date);
      });
    }

  ngAfterViewInit() {
    // this.renderer.addClass(this.listHelpText.nativeElement, 'help-text');
    // this.renderer.addClass(this.listHelpText.nativeElement, 'testing');
  }

  setTwoWeeksPrior(date) {
    if (date.getDate() > 14) {
      let newNew = new Date(this.today.getFullYear(), this.today.getMonth(), this.today.getDate()-14)
      return newNew
    }

    else {
      let diff = Math.abs(date.getDate() - 14);
      let prevMonthDays = this.dateService.daysInMonth(date.getFullYear(), date.getMonth()-1);
      let newDate = new Date(this.today.getFullYear(), this.today.getMonth()-1, prevMonthDays-diff);
      return newDate
    }
  }

  dateFilter = (date: Date): boolean => {
  	let day = date.getDay();
    let year = date.getFullYear();
    return day !==0 && day !==6  && year == this.today.getFullYear() && date > this.twoWeeksPrior
  }

  setDate(){

    // This function ultimately determines the default date showed in the daily-summary-form
    //  It ensures that the default date is not Saturday or Sunday
    // If not either, it defaults the selectedDate to the current date.
    let today = new Date();
    let day = today.getDay();
    if ( day == 0) {
      // Today is sunday
         let friday = new Date(today.setDate(today.getDate()-2));
         return friday;
      }

    else if (day == 6) {
      // Today is saturday
      let friday = new Date(today.setDate(today.getDate()-1));
      return friday;
    }

    else {
       return today;
      }
  }

  addSummary(dailySummary) {this.addSummaryOutput.emit(dailySummary)}

  putSummary(dailySummary) {this.putSummaryOutput.emit(dailySummary)}







}
