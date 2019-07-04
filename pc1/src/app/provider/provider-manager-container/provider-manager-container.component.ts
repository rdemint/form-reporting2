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
	title: string;

   constructor(
  	private practiceService: PracticeService, 
  	private providerService: ProviderService, 
  	private specialtyService: SpecialtyService,
  	private route: ActivatedRoute, 
    private router: Router)
   { 		}

  ngOnInit() {  	
  	this.data = this.route.parent.snapshot.data;
  	this.practice = this.practiceService.practice;
  }

  navToProvider(providerId) {    
    this.router.navigate(['../form'], {queryParams: {provider: providerId}, relativeTo: this.route})
  }
}
