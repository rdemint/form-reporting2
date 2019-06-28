import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { SpecialtyService } from '../../services/specialty.service';
import { PracticeService } from '../../services/practice.service';
import { ProviderService } from '../../services/provider.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-add-provider-container',
  templateUrl: './add-provider-container.component.html',
  styleUrls: ['./add-provider-container.component.css']
})
export class AddProviderContainerComponent implements OnInit {
	practice: Practice;
	specialties: Specialty[];
	practice$: Observable<Practice>;

  constructor(
  	private practiceService: PracticeService, 
  	private providerService: ProviderService, 
  	private specialtyService: SpecialtyService) { }

  ngOnInit() {
  	this.practice$ = this.practiceService.loadPractice().pipe(first())
  	this.practiceService.loadPractice().subscribe((practice)=> {this.practice = practice;});
  	this.specialtyService.getSpecialties().pipe(first()).subscribe(
  		(specialties)=> {
  			this.specialties = specialties;  		
  	});
	}

	addProvider(formValue) {
		let provider = {};
		provider['first_name']= formValue.firstName;
		provider['last_name']= formValue.lastName;
		provider['credentials'] = formValue.credentials;
		provider['specialties'] = formValue.specialties;
		provider['practices']= this.practice.id;
		this.providerService.addProvider(provider);
	}
}
