import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
	error$ = new BehaviorSubject<any>(null);

  constructor(private snackBar: MatSnackBar) { }

  	catch(err) {
  		this.error$.next(err);
  		this.handle();
  	}

  	handle() {
      this.snackBar.open(this.error$.getValue(), "", {duration:5000})
  	}
}
