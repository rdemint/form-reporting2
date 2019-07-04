import { Output, EventEmitter, Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { Practice, Specialty, Provider } from '../../models';

@Component({
  selector: 'app-provider-manager',
  templateUrl: './provider-manager.component.html',
  styleUrls: ['./provider-manager.component.css']
})
export class ProviderManagerComponent implements OnInit {
	@Input() practice: Practice;
	@Input() providers: Provider[];
  @Output() providerIdOutput = new EventEmitter();	
  constructor() { }

  ngOnInit() {  	
  }

  emitProviderId(id) {
    this.providerIdOutput.emit(id);
  }

  
}
