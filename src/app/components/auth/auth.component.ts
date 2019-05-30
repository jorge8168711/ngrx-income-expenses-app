import { Component, OnInit } from '@angular/core';

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
  constructor() {}

  ngOnInit(): void {}
}
