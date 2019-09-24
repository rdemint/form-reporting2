import { Component, OnInit } from '@angular/core';
import { Org } from '../../models';
import { OrganizationTypeService } from '../../services/organization-type.service';
import { Observer, Observable } from 'rxjs';

@Component({
  selector: 'app-org-nav-container',
  templateUrl: './org-nav-container.component.html',
  styleUrls: ['./org-nav-container.component.css']
})
export class OrgNavContainerComponent implements OnInit {
  org: Org;
  orgName$: Observable<string>;

  constructor(private otService: OrganizationTypeService) { }

  ngOnInit() {
    this.otService.loadOrg().subscribe((org)=>this.org = org);
    this.otService.loadOrgName().pipe((orgName)=> this.orgName$ = orgName).subscribe();
  }

}
