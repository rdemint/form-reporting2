import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Validators } from '@angular/forms';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-add-provider',
  templateUrl: './add-provider.component.html',
  styleUrls: ['./add-provider.component.css']
})
export class AddProviderComponent implements OnInit {
	@Input() practice: Practice;
	@Input() practice$: Observable<Practice>;
	@Input() specialties: string[];
  @Output() addProviderOutput = new EventEmitter();
	providerForm: FormGroup;


  constructor() { }

  ngOnInit() {
  		this.createForm();  		
  }
  	

  createForm() {
  	this.providerForm = new FormGroup({
  		'firstName': new FormControl(),
  		'lastName': new FormControl(),
  		'credentials': new FormControl(),
  		'specialties': new FormControl(),
  	})
  }

  addProvider() {
    this.addProviderOutput.emit(this.providerForm.value);
  }

}
