import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { UiState } from '../store/reducers';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import { IncomeExpense } from '../models';
import { IncomeExpenseService } from '../services/income-expense.service';
import { MatSnackBar } from '@angular/material';
import { ActivateLoadingAction, InactivateLoadingAction } from '../store/actions';

@Component({
  selector: 'app-income-expenses',
  template: /*html*/`
    <h1 class="mat-h1">Add Income / Expense</h1>
    <mat-card>
      <form class="form flex-column" [formGroup]="form" (ngSubmit)="onSubmit()">
        <mat-form-field hintLabel="Max 100 characters">
          <mat-label>Description</mat-label>
          <input matInput
            autocomplete="off"
            type="text"
            #description
            maxlength="100"
            formControlName="description"
            required>

          <mat-hint align="end">{{description.value?.length || 0}}/100</mat-hint>
          <mat-error *ngIf="hasError('description', 'required')">The field is required</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Amount</mat-label>
          <span matPrefix>$&nbsp;</span>
          <span matSuffix>.00</span>
          <input matInput
            autocomplete="off"
            type="number"
            min="0"
            formControlName="amount"
            required
            pattern="^[1-9]+[0-9]*$">

          <mat-error *ngIf="hasError('amount', 'required')">The field is required</mat-error>
          <mat-error *ngIf="hasError('amount', 'min') && !hasError('amount', 'min')">Invalid value</mat-error>
          <mat-error *ngIf="hasError('amount', 'min')">Value must be greater or equal to 0</mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Type</mat-label>
          <mat-select formControlName="type" required>
            <mat-option value="income">Income</mat-option>
            <mat-option value="expense">Expense</mat-option>
          </mat-select>

          <mat-error *ngIf="hasError('type', 'required')">The field is required</mat-error>
        </mat-form-field>

        <footer>
          <button class="submit"
            mat-raised-button
            type="submit"
            color="primary"
            [disabled]="form.invalid || (loadingState | async).isLoadig">
            {{ (loadingState | async).isLoadig ? 'Saving...' : 'Save' }}
          </button>

          <button class="submit"
            mat-raised-button
            type="button"
            color="warn"
            (click)="resetForm()">
            Cancel
          </button>
        </footer>
      </form>
    </mat-card>
  `,
  styles: [ /*css*/`
    .form {
      max-width: 480px;
    }
  `]
})
export class IncomeExpensesComponent implements OnInit {
  public form: FormGroup;
  public loadingState: Observable<UiState>;

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private incomeExpense: IncomeExpenseService,
    private sbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      description: this.fb.control(null, Validators.required),
      amount: this.fb.control(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/), Validators.min(0)]),
      type: this.fb.control('income', Validators.required)
    });

    this.loadingState = this.store.select('ui');
  }

  public hasError(controlName: string, typeError: string): boolean {
    return this.form.get(controlName).hasError(typeError);
  }

  public onSubmit() {
    const newIncomeExpense = new IncomeExpense(
      this.form.value.description,
      this.form.value.amount,
      this.form.value.type
    );

    this.store.dispatch(new ActivateLoadingAction());
    this.incomeExpense.createIncomeExpense(newIncomeExpense).then(() => {
      this.resetForm();
      this.store.dispatch(new InactivateLoadingAction());
      this.sbar.open('Created successfully', 'close', { duration: 2000 });
    }).catch((err) => {
      console.error(err);
      this.store.dispatch(new InactivateLoadingAction());
    });
  }

  public resetForm() {
    this.form.patchValue({
      description: '',
      amount: '0',
      type: 'expense'
    });
  }
}
