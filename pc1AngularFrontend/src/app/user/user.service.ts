import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	anonymousUser = {id: null, name: '', email: ''};
	user$ = new BehaviorSubject<User>(this.anonymousUser);
  user: User;
  constructor() { }

  ngOnInit() { }

  loadUser() {
  	return this.user$.asObservable();
  }

  selectUser(user) {
    // should revisit this and remove use of user$
    this.user = user;
  	this.user$.next(user);
  }
}
