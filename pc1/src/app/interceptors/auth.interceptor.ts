import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private authService: AuthService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// const requestCopy = req.clone({headers: localStorage['token']})
		console.log(this.authService.authHeader);
		let httpHeader = new HttpHeaders().set("Authorization", "Token " + localStorage.getItem('token'));
		console.log(httpHeader);
		const requestCopy = req.clone({headers: httpHeader});
		return next.handle(requestCopy);
	}
}