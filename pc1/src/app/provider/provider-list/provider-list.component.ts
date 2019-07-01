import { Component, OnInit, Input } from '@angular/core';
import { Provider, Entity, Practice } from '../../models';

@Component({
  selector: 'app-provider-list',
  templateUrl: './provider-list.component.html',
  styleUrls: ['./provider-list.component.css']
})
export class ProviderListComponent implements OnInit {
	@Input() providers: Provider[];
	@Input() practice: Practice;
	@Input() org: Entity | Practice;
	
  constructor() { }

  ngOnInit() {
  }

}
