import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest} from 'rxjs';
import { EntityService } from '../../services/entity.service';
import { DashService } from '../../services/dash.service';
import { DailySummaryService } from '../../services/daily-summary.service';
import { Entity, DailySummary } from '../../models';

@Component({
  selector: 'app-entity-container',
  templateUrl: './entity-container.component.html',
  styleUrls: ['./entity-container.component.css']
})
export class EntityContainerComponent implements OnInit {
	entity: Entity;
  sourceList = [{type: 'practices', name: 'Practices'}, {type: 'providers', name: 'Providers'}, {type: 'specialties', name: 'Specialties'}]
  	
    constructor(
  		private route: ActivatedRoute,
  		private entityService: EntityService,
  		private dashService: DashService,
  		private dailySummaryService: DailySummaryService
  		) { }

  ngOnInit() {
      this.route.paramMap.subscribe(
  			(params) => 
  				this.entityService.getEntity(params.get('entity_slug'))
  					.subscribe((entity)=> this.entity = entity)
      );
  }
}
