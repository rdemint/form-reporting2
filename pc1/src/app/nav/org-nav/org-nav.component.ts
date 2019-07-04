import { Component, Input, OnInit } from '@angular/core';
import { Org } from '../../models';

@Component({
  selector: 'app-org-nav',
  templateUrl: './org-nav.component.html',
  styleUrls: ['./org-nav.component.css']
})
export class OrgNavComponent implements OnInit {
	@Input() org: Org;

  constructor() { }

  ngOnInit() {  	
  }

}
