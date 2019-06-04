import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';
import { Router } from '@angular/router';

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
export class AuthComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.isAuthenticated().subscribe(userAuth => {
      if (userAuth) {
        this.router.navigate(['/']);
      }
    });
  }
}
