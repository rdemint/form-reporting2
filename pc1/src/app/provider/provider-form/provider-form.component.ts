import { Component, OnInit, Input, Output, OnChanges, SimpleChanges, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { Observable } from 'rxjs';
import { FormCheckService } from '../../services/form-check.service';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProviderFormComponent implements OnInit {	
	@Input() provider: Provider;
  @Input() specialties: Specialty[];
  @Input() title: string;  
	@Input() providerSpecialties: string[];
  @Input() specialtyList: string[];
  @Input() providerExists: boolean;
	@Output() addProviderOutput = new EventEmitter();
	@Output() putProviderOutput = new EventEmitter();  
	providerForm: FormGroup;	  
  selectedSpecialties: string[];
  specialtyControlNames: string[];    

 constructor(
   private location: Location, 
   private formCheck: FormCheckService,
   private errorService: ErrorService
   ) { }
    ngOnInit() {      
    	this.createForm();
  }
  	  
  createForm() {    
    this.providerForm = null;
    
  	this.providerForm = new FormGroup({
  		'firstName': new FormControl(this.provider.first_name, [Validators.required, Validators.min(2)]),
  		'lastName': new FormControl(this.provider.last_name, [Validators.required, Validators.min(2)]),
  		'credentials': new FormControl(this.provider.credentials, [Validators.required, Validators.min(2)]),
      'specialties': new FormControl([Validators.required])
  	})    

  }

  addProvider() {  
  if (this.formCheck.check(this.providerForm) == null) {  
    this.addProviderOutput.emit(this.providerForm.value);
  }
  else {
    this.errorService.catch(this.formCheck.defaultMessage);
  }
  }

  putProvider() {
  	this.putProviderOutput.emit(this.providerForm.value);
  }

  cancel() {
    this.location.back();
  }

}
