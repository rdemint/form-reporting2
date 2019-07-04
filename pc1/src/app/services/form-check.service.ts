import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class FormCheckService {
  defaultMessage:string = "Please correct the form and submit again.";

  constructor() { }

  check(form: FormGroup) {
  let formErrors = [];
  Object.keys(form.controls).forEach(key => {
  const controlErrors: ValidationErrors = form.get(key).errors;
  if (controlErrors != null) {
  		formErrors.push({key: controlErrors});
  }
  });

  if (formErrors.length == 0) {
  	return null
  }

  else {	
  	return formErrors
  }
  }


}
