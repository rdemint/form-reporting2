import { Component, OnInit, Input } from '@angular/core';
import { Entity } from '../../models';
import { DashService } from '../../services/dash.service';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent implements OnInit {
  	@Input() entity: Entity;
	@Input() sourceList: any;  
	tabIndex: number;
	tabIndices = [
		{index:0, sourceType:'practice'}, 
		{index:1, sourceType:'provider'}, 
		{index:2, sourceType:'specialty'}
		];
	selectedIndex: number;

  constructor(private dashService: DashService) { }

  ngOnInit() {
  	// Initializes the selected Tab, to the inital BehaviorSubject value in the service. 
  	this.dashService.loadSourceType().pipe(first()).subscribe((type)=> {
  		let position = this.tabIndices.findIndex((obj)=>obj.sourceType == type);
  		this.selectedIndex = this.tabIndices[position].index
  	})
  }

  filterByTab(index) {
  	this.selectedIndex = index;
  	let tabIndex = this.tabIndices[index];
  	this.dashService.selectSourceType(tabIndex.sourceType);
  }

}
