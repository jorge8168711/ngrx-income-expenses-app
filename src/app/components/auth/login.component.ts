import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { Observable } from 'rxjs';
import { UiState } from 'src/app/store/reducers';

@Component({
  selector: 'app-login.auth-form',
  template: /*html*/`
    <mat-progress-bar mode="query" *ngIf="(loadingState | async).isLoadig"></mat-progress-bar>
    <mat-card class="flex-column" [formGroup]="form">
      <form class="flex-column"
        [formGroup]="form"
        (ngSubmit)="onSubmit()">


        <mat-form-field>
          <input matInput
            placeholder="email"
            type="email"
            formControlName="email">

          <mat-error *ngIf="hasError('email', 'required')">The field is required</mat-error>
          <mat-error *ngIf="hasError('email', 'email')">Invalid format</mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput
            placeholder="password"
            type="password"
            formControlName="password"
            autocomplete="off">

          <mat-error *ngIf="hasError('email', 'required')">The field is required</mat-error>
        </mat-form-field>

        <mat-error *ngIf="formError && (form.dirty || form.touched)">
          {{ formError.message }}
        </mat-error>

        <button class="auth-form__submit"
          mat-raised-button
          type="submit"
          color="primary"
          [disabled]="form.invalid || (loadingState | async).isLoadig">
          Login
        </button>
      </form>
    </mat-card>

    <a mat-button routerLink="register" color="primary">
      You dont have an account?
    </a>
  `,
  styleUrls: ['./auth.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public formError = null;
  public loadingState: Observable<UiState>;

  constructor(private auth: AuthService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl('jorge.barron@amplemind.com', [Validators.email, Validators.required]),
      password: new FormControl('password', Validators.required)
    });

    this.loadingState = this.store.select('ui');
  }

  public onSubmit(): void {
    this.auth.signIn(this.form.value.email, this.form.value.password);
  }

  public hasError(controlName: string, typeError: string): boolean {
    return this.form.get(controlName).hasError(typeError);
  }
}
