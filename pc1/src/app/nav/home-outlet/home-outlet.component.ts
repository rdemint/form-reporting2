import { Component, OnInit } from '@angular/core';
import { Org } from '../../models';
import { OrganizationTypeService } from '../../services/organization-type.service';

@Component({
  selector: 'app-home-outlet',
  templateUrl: './home-outlet.component.html',
  styleUrls: ['./home-outlet.component.css']
})
export class HomeOutletComponent implements OnInit {
	org: Org;
  constructor(private otService: OrganizationTypeService) { }

  ngOnInit() {
  	
  }

}
