import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  template: /*html*/ `
    <h1>page not found</h1>

    <a mat-button routerLink="/" color="primary">
      Back to home
    </a>
  `
})
export class NotFoundComponent implements OnInit {
  constructor() {}

  ngOnInit(): void { }
}
