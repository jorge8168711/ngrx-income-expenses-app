import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NewRecordDialogComponent } from '../new-record-dialog.component';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { IncomeExpenseState } from 'src/app/store/reducers';
import { Observable } from 'rxjs';
import { IncomeExpense } from 'src/app/models';

interface Income { total: number; qty: number; }
interface Expense { total: number; qty: number; }
export interface DashboardData {
  income: Income;
  expense: Expense;
  difference?: number;
}

@Component({
  selector: 'app-dashboard',
  template: /*html*/ `
    <h1 class="mat-h1">Dashboard</h1>
    <section class="dashboard">
      <app-dashboard-table [data]="(this.incomeExpenseState$ | async).items"></app-dashboard-table>

      <mat-card>
        <mat-icon>arrow_upward</mat-icon>
        <p>Income</p>
        <p>{{ dashboardData.income.qty || 0 }}</p>
        <p>{{ (dashboardData.income.total | currency) || 0 }}</p>
      </mat-card>

      <mat-card>
        <mat-icon>arrow_downward</mat-icon>
        <p>Expense</p>
        <p>{{ dashboardData.expense.qty || 0 }}</p>
        <p>{{ (dashboardData.expense.total | currency) || 0 }}</p>
      </mat-card>

      <mat-card>
        <mat-icon>timeline</mat-icon>
        <p>Difference</p>
        <p>{{ (dashboardData.difference | currency) || 0 }}</p>
      </mat-card>

      <app-donut-chart [data]="(this.incomeExpenseState$ | async).items"></app-donut-chart>
    </section>

    <button mat-fab color="accent" (click)="addNewRecord()">
      <mat-icon>add</mat-icon>
    </button>
  `,
  styles: [ /*css*/ `
    .dashboard {
      display: flex;
      flex-wrap: wrap;
    }

    .mat-fab {
      position: absolute;
      right: 50px;
      top: 32px;
    }
  `]
})
export class DashboardComponent implements OnInit {
  public incomeExpenseState$: Observable<IncomeExpenseState>;
  public dashboardData: DashboardData = {
    income: { total: 0, qty: 0 },
    expense: { total: 0, qty: 0 },
    difference: 0
  };

  constructor(
    private dialog: MatDialog,
    private incomeExpense: IncomeExpenseService,
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.incomeExpense.initIncomeExpenseListener();
    this.incomeExpenseState$ = this.store.select('incomeExpense');
    this.store.select('incomeExpense').subscribe((state: IncomeExpenseState) => {
      this.dashboardData.income.total = this.getTotalAmount(state.items, 'income');
      this.dashboardData.income.qty = this.getTotalItems(state.items, 'income');

      this.dashboardData.expense.total = this.getTotalAmount(state.items, 'expense');
      this.dashboardData.expense.qty = this.getTotalItems(state.items, 'expense');

      this.dashboardData.difference =
        this.dashboardData.income.total - this.dashboardData.expense.total;

      console.log(this.dashboardData);
    });
  }

  public addNewRecord() {
    this.dialog.open(NewRecordDialogComponent, { width: '480px' });
  }

  private getTotalAmount(arr: IncomeExpense[], filterBy: string): number {
    return arr.filter(el => el.type === filterBy)
      .reduce((acc, item) => acc += item.amount, 0);
  }

  private getTotalItems(arr: IncomeExpense[], filterBy: string): number {
    return arr.filter(el => el.type === filterBy).length;
  }
}
