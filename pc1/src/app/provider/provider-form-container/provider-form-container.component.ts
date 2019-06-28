import { Component, OnInit, Input } from '@angular/core';
import { Practice, DailySummary, Specialty, Provider } from '../../models';
import { SpecialtyService } from '../../services/specialty.service';
import { PracticeService } from '../../services/practice.service';
import { ProviderService } from '../../services/provider.service';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-provider-form-container',
  templateUrl: './provider-form-container.component.html',
  styleUrls: ['./provider-form-container.component.css']
})
export class ProviderFormContainerComponent implements OnInit {
	@Input() practice: Practice;
	@Input() specialties: Specialty[];	

  constructor() {}

  ngOnInit() {
	}

}
