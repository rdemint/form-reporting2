import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Location } from '@angular/common';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-form',
  templateUrl: './provider-form.component.html',
  styleUrls: ['./provider-form.component.css']
})
export class ProviderFormComponent implements OnInit {
	@Input() practice: Practice;
	@Input() provider: Provider;
  @Input() specialties: Specialty[];
  @Input() title: string;
	@Input() providerSpecialties: string[];
  @Input() specialtyList: string[];
  @Input() providerExists: boolean;
	@Output() addProviderOutput = new EventEmitter();
	@Output() putProviderOutput = new EventEmitter();
	providerForm: FormGroup;
	// providerExists: boolean;
 //  specialtyList: string[];

  constructor(private location: Location) { }

    ngOnInit() {
    	this.createForm();
  }

  compareSpecialties(specialtyListItem, providerSpecialtyItem) {
    return specialtyListItem == providerSpecialtyItem;
  }
  	  
  createForm() {
  	this.providerForm = new FormGroup({
  		'firstName': new FormControl({value: this.provider.first_name, disabled:this.providerExists}),
  		'lastName': new FormControl({value: this.provider.last_name, disabled:this.providerExists}),
  		'credentials': new FormControl({value: this.provider.credentials, disabled:this.providerExists}),
  		'specialties': new FormControl({value: this.specialtyList, disabled: this.providerExists}),
  	})
  }

  addProvider() {    
    this.addProviderOutput.emit(this.providerForm.value);
  }

  putProvider() {
  	this.putProviderOutput.emit(this.providerForm.value);
  }

  cancel() {
    this.location.back();
  }
}
