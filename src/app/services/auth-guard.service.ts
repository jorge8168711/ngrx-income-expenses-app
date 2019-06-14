import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { take, map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.isAuthenticated().pipe(
      take(1),
      map(auth => this.onGuard(auth))
    );
  }

  canLoad(): Observable<boolean> | Promise<boolean> | boolean {
    console.log('canLoad');
    return this.auth.isAuthenticated().pipe(
      take(1),
      map(auth => this.onGuard(auth))
    );
  }

  onGuard(auth: boolean) {
    if (auth) {
      return auth;
    } else {
      this.router.navigate(['/auth']);
      return auth;
    }
  }
}
