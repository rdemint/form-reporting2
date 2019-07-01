import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Data } from '@angular/router';
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
	data: Data;
	practice: Practice;
	specialties: Specialty[];
	provider: Provider;
	providers: Provider[];
	mode: string;
	providerExists: boolean;
  	specialtyList: string[];
  	providerSpecialties: string[];
	nullProvider: Provider = {
						id: null, 
						practices: null, 
						first_name: null, 
						last_name: null, 
						specialties: null, 
						credentials: null
					};
	title: string;

   constructor(
  	private practiceService: PracticeService, 
  	private providerService: ProviderService, 
  	private specialtyService: SpecialtyService,
  	private route: ActivatedRoute) 
   { 

  		}

  ngOnInit() {
  	this.route.data.subscribe((data)=> {
  		this.data = data;  
  		console.log(data.providers);		  	
  	});  	
  	this.practice = this.practiceService.practice  	  		
  	this.handleMode(this.route.snapshot.queryParams['mode']);  	  	
  }

	handleMode(mode: string) {
		//prepares data and determines whether to show provider-list, or provider-form
		this.mode = mode;
		if (this.mode == "form") {
			if (this.route.snapshot.queryParams['provider'] == null) {
				this.provider = this.nullProvider;
				this.title = "New Provider"
				this.providerExists = false;
				this._handleSpecialties();
			}
			else {				
				this.provider = this.data.provider;
				this.providerExists = true;
				this.title = "Edit Provider";
				this._handleSpecialties();				
			}
		}	

		else if (this.mode == "list") {				
				this.providers = this.data.providers;
				this.provider = this.nullProvider;
				this.providerExists = false;
				this._handleSpecialties();				
		}		
	}


	_handleSpecialties() {
    //Get array of specialty string names from Specialty[]    
    let specialtyList = [];
	for (let i=0; i<this.data.specialties.length; i++) {
        specialtyList.push(this.data.specialties[i].name);        
      }

    if (this.providerExists == true) {
    	this.providerSpecialties = [];    
      	for(let i = 0; i<this.provider.specialties.length; i++) {
        	let specialty = this.data.specialties.find((specialty)=>specialty['id']==this.provider.specialties[i]);
        	this.providerSpecialties.push(specialty.name);
      }      
    }

    else if (this.providerExists == false) {
     	this.providerSpecialties = null;
    }
  }

	addProvider(formValue) {		
		let provider = {};
		provider['first_name']= formValue.firstName;
		provider['last_name']= formValue.lastName;
		provider['credentials'] = formValue.credentials;
		provider['specialties'] = formValue.specialties;
		provider['practices']= [this.practice.id];
		provider['entity']= null;
		this.providerService.addProvider(provider)
			.subscribe();
	}

	putProvider(formValue) {
		let provider = {}
		provider['first_name']= formValue.firstName;
		provider['last_name']= formValue.lastName;
		provider['credentials'] = formValue.credentials;
		provider['specialties'] = formValue.specialties;
		provider['practices']= [this.practice.id]
		provider['entity']= null;
		this.providerService.putProvider(provider)
			.subscribe();
	}

}
