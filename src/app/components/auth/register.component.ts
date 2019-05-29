import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  template: /*html*/`
    <mat-card class="flex-column">
      <mat-form-field>
        <input matInput placeholder="name" type="text">
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="email" type="email">
      </mat-form-field>
    </mat-card>

    <a mat-button routerLink="/" color="primary">
      You already have an account?
    </a>
  `
})
export class RegisterComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}
