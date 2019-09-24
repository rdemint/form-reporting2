import { HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse, HttpHandler, HttpEvent } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { finalize, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
	ok: string; 
	constructor(private router: Router) {};

	intercept(req: HttpRequest<any>, next: HttpHandler){
		return next.handle(req)
			.pipe(
				tap(
					event => this.ok = "success",
					error => {
						if (error.status == 401 || error.status == 403) {
							this.router.navigate(['/unauthorized']);
						};
						//console.log(error.error["non_field_errors"]);
						// could use the above to pass into the form
						// as the error message is from custom validator on backend
					}
					),
				finalize( ()=> {
					// you could pass something to some service here
					// finalize is always run when response is received
				}
				)
			)
	}
}