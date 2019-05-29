import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

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
  constructor(private router: Router) {}

  ngOnInit(): void {}
}
