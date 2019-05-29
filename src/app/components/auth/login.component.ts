import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  template: /*html*/`
    <mat-card class="flex-column">
      <mat-form-field>
        <input matInput placeholder="name" type="text">
      </mat-form-field>

      <mat-form-field>
        <input matInput placeholder="email" type="email">
      </mat-form-field>

    </mat-card>

    <a mat-button routerLink="register" color="primary">
      You dont have an account?
    </a>
  `
})
export class LoginComponent implements OnInit {
  constructor() {}

  ngOnInit(): void { }
}
