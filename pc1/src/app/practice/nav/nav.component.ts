import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Practice } from '../../models';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ViewChildren, QueryList} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  @Input() practice: Practice;
  @ViewChild('reportingEl') reportingElRef: ElementRef;
  @ViewChild('providersEl') providersElRef: ElementRef;  
  urlTree: any;
	user: any;
  user$: Observable<any>;
  practice_slug: string;

  constructor(
    private userService: UserService, 
    private router: Router, 
    private route: ActivatedRoute,
    private renderer: Renderer2) { }

  ngOnInit() {
  	this.userService.loadUser().pipe(first()).subscribe((user)=>this.user = user);
    this.user$ = this.userService.loadUser();
  }

  logout() {
  	this.router.navigateByUrl('/logout');
  }

  isActive(instruction: any[]) {
    this.router.isActive(this.router.createUrlTree(instruction), false);
  }

  addProvider() {
  	this.router.navigate(['../providers/form'], {relativeTo: this.route});
  }

  listProviders() {
    this.router.navigate(['../providers/list'], {relativeTo: this.route});
  }

  reporting() {
    this.router.navigate(['../../reporting'], {relativeTo: this.route});
  }

}
