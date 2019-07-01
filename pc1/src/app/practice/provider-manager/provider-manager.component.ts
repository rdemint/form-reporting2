import { Output, Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Practice, Specialty, Provider } from '../../models';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: ['./provider-manager.component.css']
})
export class ProviderManagerComponent implements OnInit {
	@Input() practice: Practice;
	@Input() providers: Provider[];
	@Input() specialties: Specialty[];
  constructor() { }

  ngOnInit() {  	
  }

  navToProvider(providerId) {
  	this.route.navigate('')
  }
}
