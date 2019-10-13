import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { SpecialtyService } from '../../services/specialty.service';
import { PracticeService } from '../../services/practice.service';
import { ProviderService } from '../../services/provider.service';
import { ErrorService } from '../../services/error.service';
import { MessageService } from '../../services/message.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-provider-form-container',
  templateUrl: './provider-form-container.component.html',
  styleUrls: ['./provider-form-container.component.css']
})
export class ProviderFormContainerComponent implements OnInit {
	parentData: Data;
	data: Data;
	providerExists: boolean;
	nullProvider: Provider = {
						id: null, 
						practices: null, 
						first_name: null, 
						last_name: null, 
						specialties: null, 
						credentials: null
					};
	title: string;
 	specialtyList: string[];
 	providerSpecialties: string[];
 	editing: boolean;

 	constructor(
 		private route: ActivatedRoute,
 		private router: Router,
 		private practiceService: PracticeService,
 		private providerService: ProviderService,
 		private errorService: ErrorService,
 		private messageService: MessageService) {
  }

 	ngOnInit() {	 	
	 	this.parentData = this.route.parent.snapshot.data; 	 	
	 	this.data = this.route.snapshot.data;		 	
	 	this.createSpecialtyList();
	 	this.initProvider();	 		 	
	 }

	 initProvider() {
	 	if (this.data.provider == null) {	 		
	 		this.data.provider = this.nullProvider;
	 		this.providerExists = false;	 			 		
	 		this.title = "New Provider";
	 	}

	 	else {	 			 		
	 		this.providerExists = true;	 		
	 		this.providerSpecialties = [];
	 		for(let i = 0; i< this.data.provider.specialties.length; i++) {
	        	let specialty = this.parentData.specialties.find((specialty)=>specialty['name'] == this.data.provider.specialties[i]);
	        	this.providerSpecialties.push(specialty.name);	        	
	      }
	      	this.title="Edit Provider"
	 	}	
	}	

	createSpecialtyList() {
	 	this.specialtyList = [];
		for (let i=0; i<this.parentData.specialties.length; i++) {
	        this.specialtyList.push(this.parentData.specialties[i].name);        
	    }
	 }

	addProvider(formValue) {		
			
			let provider = {};
			provider['first_name']= formValue.firstName;
			provider['last_name']= formValue.lastName;
			provider['credentials'] = formValue.credentials;
			provider['specialties'] = formValue.specialties;
			provider['practices']= [this.practiceService.practice.name];
			provider['entity']= null;				
			this.providerService.addProvider(provider)
				.subscribe((resp)=> {
					this.messageService.throw("Provider successly added");					
					this.router.navigate(["../list"], {relativeTo: this.route});
				},
					(err)=> this.errorService.catch(err)
				);
  }

  putProvider(formValue) {
    let provider = {};

  }

}
