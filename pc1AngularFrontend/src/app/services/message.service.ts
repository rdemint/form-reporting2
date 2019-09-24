import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
message$ = new BehaviorSubject<any>(null);
dismisstext = " This box will close automatically."

  constructor(private snackBar: MatSnackBar) { }

  	throw(err) {
  		this.message$.next(err);
  		this.handle();
  	}

  	handle() {
      this.snackBar.open(this.message$.getValue(), "", {duration:5000})
  	}
}
