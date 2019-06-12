import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';
import { Observable } from 'rxjs';
import { UiState } from 'src/app/store/reducers';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';

@Component({
  selector: 'app-register.auth-form',
  template: /*html*/`
    <mat-progress-bar mode="query" *ngIf="(loadingState$ | async).isLoadig"></mat-progress-bar>
    <mat-card>
      <form class="flex-column"
        [formGroup]="form"
        (ngSubmit)="onSubmit()">
        <mat-form-field>
          <mat-label>Name</mat-label>
          <mat-icon matPrefix class="icon-prefix">person</mat-icon>
          <input matInput
            autocomplete="off"
            type="text"
            formControlName="name">

          <mat-error *ngIf="hasError('name', 'required')">The field is required</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Email</mat-label>
          <mat-icon matPrefix class="icon-prefix">email</mat-icon>
          <input matInput
            type="email"
            formControlName="email">

          <mat-error *ngIf="hasError('email', 'required')">The field is required</mat-error>
          <mat-error *ngIf="hasError('email', 'email')">Invalid format</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Password</mat-label>
          <button class="icon-prefix"
            mat-icon-button
            matPrefix
            (click)="togglePassword()"
            type="button">
            <mat-icon>{{ passwordVisibility ? 'visibility_off' : 'visibility' }} </mat-icon>
          </button>
          <input matInput
            autocomplete="off"
            [type]="passwordVisibility ? 'text' : 'password'"
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
          [disabled]="form.invalid || (loadingState$ | async).isLoadig">
          {{ (loadingState$ | async).isLoadig ? 'Creating user...' : 'Register' }}
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
  public loadingState$: Observable<UiState>;
  public passwordVisibility = false;

  constructor(private auth: AuthService, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      password: new FormControl('', Validators.required)
    });

    this.loadingState$ = this.store.select('ui');
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

  public togglePassword() {
    this.passwordVisibility = !this.passwordVisibility;
  }
}
