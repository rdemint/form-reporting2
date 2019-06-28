import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { SpecialtyService } from '../../services/specialty.service';
import { PracticeService } from '../../services/practice.service';
import { ProviderService } from '../../services/provider.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-provider-manager-container',
  templateUrl: './provider-manager-container.component.html',
  styleUrls: ['./provider-manager-container.component.css']
})
export class ProviderManagerContainerComponent implements OnInit {
	practice: Practice;
	specialties: Specialty[];
	provider: Provider;
	providers: Provider[];
	mode: string;

   constructor(
  	private practiceService: PracticeService, 
  	private providerService: ProviderService, 
  	private specialtyService: SpecialtyService,
  	private route: ActivatedRoute) { }

  ngOnInit() {
  	this.practiceService.loadPractice().subscribe((practice)=> {this.practice = practice;});
  	this.specialtyService.getSpecialties().pipe(first()).subscribe(
  		(specialties)=> {
  			this.specialties = specialties;  		
  	});
  	this.handleMode(this.route.snapshot.queryParams['mode']);
	}

	handleMode(mode: string) {
		this.mode = mode;
		if (this.mode == "form") {
			if (this.route.snapshot.queryParams['provider'] == null) {
				this.provider = null;
			}
			else {
			let providerId = this.route.snapshot.queryParams['provider']
			this.providerService.getProvider(providerId)
				.subscribe((provider)=>this.provider = provider);
			}
		}	

		else if (this.mode == "list") {
			this.providerService.getProviderList({practice: this.practice.id})
				.subscribe((providers)=> this.providers = providers);
		}
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

	putProvider(formValue) {
		let provider = {}
		provider['first_name']= formValue.firstName;
		provider['last_name']= formValue.lastName;
		provider['credentials'] = formValue.credentials;
		provider['specialties'] = formValue.specialties;
		provider['practices']= this.practice.id;
	}

}
