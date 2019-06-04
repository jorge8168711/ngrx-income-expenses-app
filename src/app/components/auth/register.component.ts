import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-register.auth-form',
  template: /*html*/`
    <mat-card>
      <form class="flex-column"
        [formGroup]="form"
        (ngSubmit)="onSubmit()">
        <mat-form-field>
          <input matInput
            autocomplete="off"
            placeholder="Name"
            type="text"
            formControlName="name">

          <mat-error *ngIf="hasError('name', 'required')">The field is required</mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput
            placeholder="Email"
            type="email"
            formControlName="email">

          <mat-error *ngIf="hasError('email', 'required')">The field is required</mat-error>
          <mat-error *ngIf="hasError('email', 'email')">Invalid format</mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput
            autocomplete="off"
            placeholder="Password"
            type="password"
            formControlName="password">

          <mat-error *ngIf="hasError('password', 'required')">The field is required</mat-error>
        </mat-form-field>

        <mat-error *ngIf="formError && (form.dirty || form.touched)">
          {{ formError.message }}
        </mat-error>

        <button class="auth-form__submit"
          mat-raised-button
          type="submit"
          color="primary"
          [disabled]="form.invalid">
          Register
        </button>
      </form>
    </mat-card>

    <a mat-button routerLink="../" color="primary">
      You already have an account?
    </a>
  `,
  styleUrls: ['./auth.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RegisterComponent implements OnInit {
  public form: FormGroup;
  public formError = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });
  }

  public onSubmit() {
    this.auth.createUser(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password
    );
  }

  public hasError(controlName: string, typeError: string): boolean {
    return this.form.get(controlName).hasError(typeError);
  }
}