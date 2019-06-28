import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Provider, Specialty } from '../../models';
import { NgForm, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-provider-detail',
  templateUrl: './provider-detail.component.html',
  styleUrls: ['./provider-detail.component.css']
})
export class ProviderDetailComponent implements OnInit {
	@Input() provider: Provider;
	@Input() specialties: Specialty[];
	@Output() putProviderOutput = new EventEmitter();
	@Input() editing: boolean;

	providerForm: FormGroup;
  constructor() { }

  ngOnInit() {

  }



}
