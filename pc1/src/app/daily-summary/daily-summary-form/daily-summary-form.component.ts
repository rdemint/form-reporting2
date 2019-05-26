import { Component, OnInit, Input, Output, ViewChild, ChangeDetectionStrategy, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty, Provider } from '../../models'
import { DailySummaryService} from '../daily-summary.service';

@Component({
  selector: 'app-daily-summary-form',
  templateUrl: './daily-summary-form.component.html',
  styleUrls: ['./daily-summary-form.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class DailySummaryFormComponent implements OnInit, OnChanges {
	@Input() provider: Provider;
  @Input() practice: Practice;
  @Input() specialty: string;
  @Input() selectedDate: Date;
  @Input() dailySummary: DailySummary;
  @Input() editing: boolean;
  @Output() addSummaryOutput = new EventEmitter<DailySummary>();
  @Output() putSummaryOutput = new EventEmitter<DailySummary>();
  @Output() editingOutput = new EventEmitter<boolean>();
  
  provider_id: string;
  specialty_id: string;
  summaryForm: FormGroup;
  dailySummaryExists: boolean = false;
  dailySummaryDisabled: boolean = false;

  constructor() { 
    }

  ngOnInit() {
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

   getSpecialtyID() {
     this.specialty_id = this.practice.specialties.find((specialty)=> specialty.name == this.specialty).id;
   }

  createForm() {
      this.editing = false;
      this.summaryIsDisabled();
      this.summaryForm = new FormGroup({
      'id': new FormControl(this.dailySummary.id),
      'practice': new FormControl(this.practice.id),
      'specialty': new FormControl(this.specialty_id),
      'date': new FormControl(this.formatDate(this.selectedDate)),
      'visits': new FormControl({value: this.dailySummary.visits, disabled: this.dailySummaryDisabled}),
      'workdays': new FormControl({value: this.dailySummary.workdays, disabled: this.dailySummaryDisabled}),
      'noshows': new FormControl({value: this.dailySummary.noshows, disabled: this.dailySummaryDisabled}),
      'provider': new FormControl({value: this.provider.id, disabled: this.dailySummaryDisabled}),
    }); 
  }

  _checkForSummary(){
    // Check against visits, so that a Summary will be found after a POST operation
    // without modifying the Summary id internally.
    if (this.dailySummary['visits'] == null) {
      this.dailySummaryExists = false;
    }

    else {this.dailySummaryExists = true}
  }

    summaryIsDisabled (): void {
      this._checkForSummary();
    if (this.dailySummaryExists == true && this.editing == true) {
      this.dailySummaryDisabled = false;
    }
    else if (this.dailySummaryExists == true && this.editing == false) {
      this.dailySummaryDisabled  = true;
    }
    else if (this.dailySummaryExists == false) {
      this.dailySummaryDisabled = false;
    }
  }

  enableEditing() {
    this.editing = true;
    this.summaryForm.enable();
  }

  cancelEdit() {
    this.createForm();
  }

  onSubmit() {
    // this.dailySummaryDisabled = true;
    // this.editing = false;
    this.addSummaryOutput.emit(this.summaryForm.value);
    this.createForm();
  }

  putSummary() {
    this.putSummaryOutput.emit(this.summaryForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if( changes['selectedDate'] || changes['dailySummary']){
      this.getSpecialtyID(); 
      this.createForm();
    }
  }
}
