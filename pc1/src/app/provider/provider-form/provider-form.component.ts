import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
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
	@Input() specialties: string[];
  	@Output() addProviderOutput = new EventEmitter();
  	@Output() putProviderOutput = new EventEmitter();
  	nullProvider: Provider = {
  						id: null, 
  						practices: null, 
  						first_name: null, 
  						last_name: null, 
  						specialties: null, 
  						credentials: null};
  	providerForm: FormGroup;
  	providerExists: boolean;

  constructor() { }

    ngOnInit() {
    	this.checkForProvider();
    	this.createForm();
  }
  	
  checkForProvider() {
  	if (this.provider == null) {
  		this.provider = this.nullProvider;
  		this.providerExists == false;
  	}

  	else {
  		this.providerExists == true;
  	}
  }

  createForm() {
  	this.providerForm = new FormGroup({
  		'firstName': new FormControl({value: this.provider.first_name, disabled:this.providerExists}),
  		'lastName': new FormControl({value: this.provider.last_name, disabled:this.providerExists}),
  		'credentials': new FormControl({value: this.provider.credentials, disabled:this.providerExists}),
  		'specialties': new FormControl({value: this.provider.specialties, disabled: this.providerExists}),
  	})
  }

  addProvider() {
    this.addProviderOutput.emit(this.providerForm.value);
  }

  putProvider() {
  	this.putProviderOutput.emit(this.providerForm.value);
  }

}
