import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user/user.service';
import { Practice } from '../../models';
import { first } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
	@Input() practice: Practice;
	user: any;
	user$: Observable<any>;
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  	this.userService.loadUser().pipe(first()).subscribe((user)=>this.user = user);
  	this.user$ = this.userService.loadUser();
  }

  logout() {
  	this.router.navigateByUrl('/logout');
  }

  addProvider() {
  	this.router.navigate(['../providers/form'], {relativeTo: this.route});
  }

  listProviders() {
    this.router.navigate(['../providers/list'], {relativeTo: this.route});
  }

}
