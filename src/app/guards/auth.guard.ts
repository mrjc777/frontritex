import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'app/services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor (private auth: AuthenticationService,
                 private route: Router) {}

    canActivate(): boolean {
        if ( this.auth.isAuthenticated() ) {
            return true;
        } else {
            this.route.navigateByUrl('/pages/login');
            return false;
        }
    }
}
