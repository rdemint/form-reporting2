import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AuthGuard {
	constructor (private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, authService: AuthService) {
		if (this.authService.isAuthenticated) {
			return true;
		} else {
			console.log(this.authService.isAuthenticated);
			console.log('auth-guard says no');
			this.router.navigate(['/login/']);
		}

	}
}