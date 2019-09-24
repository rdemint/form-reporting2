import { Component, Input, OnInit } from '@angular/core';
import { Org } from '../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-org-nav',
  templateUrl: './org-nav.component.html',
  styleUrls: ['./org-nav.component.css']
})
export class OrgNavComponent implements OnInit {
	@Input() org: Org;
  @Input() orgName$: Observable<string>;

  organization: string = "Best Health, Inc."
  
  constructor() { }

  ngOnInit() {  	
  }

}
