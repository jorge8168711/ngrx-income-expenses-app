import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-auth',
  template: /*html*/`
    <h1 class="mat-h1">TURTLE INC</h1>
    <router-outlet></router-outlet>
  `,
  styles: [ /*css*/ `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
  `
  ]
})
export class AuthComponent implements OnInit, OnDestroy {
  private subs = new SubSink();

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.subs.sink = this.auth.isAuthenticated().subscribe(userAuth => {
      if (userAuth) {
        this.router.navigate(['/']);
      }
    },
    err => console.log(err));
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
