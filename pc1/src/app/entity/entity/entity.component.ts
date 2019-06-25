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

  constructor(private dashService: DashService) { }

  ngOnInit() {  }

}
