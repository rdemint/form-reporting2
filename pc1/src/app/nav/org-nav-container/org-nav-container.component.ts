import { Component, OnInit } from '@angular/core';
import { Org } from '../../models';
import { OrganizationTypeService } from '../../services/organization-type.service';

@Component({
  selector: 'app-org-nav-container',
  templateUrl: './org-nav-container.component.html',
  styleUrls: ['./org-nav-container.component.css']
})
export class OrgNavContainerComponent implements OnInit {
	org: Org;
  constructor(private otService: OrganizationTypeService) { }

  ngOnInit() {
  	this.otService.loadOrg().subscribe((org)=>this.org = org);
  }

}
