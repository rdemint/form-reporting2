import { Validators } from '@angular/forms';
import { Component, OnInit, Input, Output, ViewChild, ChangeDetectionStrategy, OnChanges, SimpleChanges, EventEmitter} from '@angular/core';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty, Provider } from '../../models'
import { DailySummaryService} from '../../services/daily-summary.service';
import { ErrorService } from '../../services/error.service';
import { FormCheckService } from '../../services/form-check.service';

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

  constructor(private formCheck: FormCheckService, private errorService: ErrorService) { 
    }

  ngOnInit() {
    this.getSpecialtyID();
    this.createForm();
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
      this._summaryIsDisabled();
      this.summaryForm = new FormGroup({
      'id': new FormControl(this.dailySummary.id),
      'practice': new FormControl(this.practice.id),
      'specialty': new FormControl(this.specialty_id),
      'date': new FormControl(this.formatDate(this.selectedDate)),
      'visits': new FormControl({value: this.dailySummary.visits, disabled: this.dailySummaryDisabled}, [Validators.max(30), Validators.min(1), Validators.required]),
      'workdays': new FormControl({value: this.dailySummary.workdays, disabled: this.dailySummaryDisabled}, [Validators.max(1.5), Validators.min(.25), Validators.required]),
      'noshows': new FormControl({value: this.dailySummary.noshows, disabled: this.dailySummaryDisabled}, Validators.max(15)),
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

    _summaryIsDisabled (): void {
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

  addSummary() {
    if (this.formCheck.check(this.summaryForm) == null) {
      this.addSummaryOutput.emit(this.summaryForm.value);
      this.createForm();
    }

    else {
      this.errorService.catch(this.formCheck.defaultMessage);
    }
  }

  putSummary() {
    this.putSummaryOutput.emit(this.summaryForm.value);
  }

  ngOnChanges(changes: SimpleChanges) {
    if(
      changes['selectedDate'] && changes['selectedDate'].firstChange ==false || 
      changes['dailySummary'] && changes['dailySummary'].firstChange ==false){
      this.getSpecialtyID(); 
      this.createForm();
    }
  }
}
