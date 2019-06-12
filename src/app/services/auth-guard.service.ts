import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService) {}
  canActivate(
    // tslint:disable-next-line: variable-name
    _route: ActivatedRouteSnapshot,
    // tslint:disable-next-line: variable-name
    _state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated();
  }
}
