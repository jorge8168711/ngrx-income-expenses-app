import { Component, ViewChild, Input } from '@angular/core';
import { IncomeExpense } from '../../models';
import { MatSort, MatSnackBar, MatDialog } from '@angular/material';
import { IncomeExpenseService } from '../../services/income-expense.service';
import { DiscardDialogComponent } from '..';

@Component({
  selector: 'app-dashboard-table',
  template: /*html*/ `
    <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z1">
      <ng-container matColumnDef="description">
        <th mat-header-cell *matHeaderCellDef>Description</th>
        <td mat-cell *matCellDef="let element">{{ element.description }}</td>
        <td mat-footer-cell *matFooterCellDef><strong>Total</strong></td>
      </ng-container>

      <ng-container matColumnDef="type">
        <th mat-header-cell *matHeaderCellDef>Type</th>
        <td mat-cell *matCellDef="let element">{{ element.type }}</td>
        <td mat-footer-cell *matFooterCellDef></td>
      </ng-container>

      <ng-container matColumnDef="amount">
        <th mat-header-cell *matHeaderCellDef>Amount</th>
        <td mat-cell *matCellDef="let element">{{element.amount | currency }}</td>
        <td mat-footer-cell *matFooterCellDef>
          <strong>
            {{ getTotalCost() | currency }}
          </strong>
        </td>
      </ng-container>

      <ng-container matColumnDef="actions">
        <th mat-header-cell *matHeaderCellDef></th>
        <td mat-cell *matCellDef="let element" justify="end">
          <button mat-icon-button (click)="delete(element.uid)">
            <mat-icon>delete</mat-icon>
          </button>
        </td>
        <td mat-footer-cell *matFooterCellDef (click)="delete()"></td>
      </ng-container>

      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      <tr mat-footer-row *matFooterRowDef="displayedColumns"></tr>
    </table>
  `,
  styles: [ /*css*/ `
    .mat-column-actions { width: 40px; }
  `]
})
export class DashboardTableComponent {
  public dataSource: IncomeExpense[] = [];
  public displayedColumns: string[] = ['description', 'type', 'amount', 'actions'];

  @Input('data') set data(d: IncomeExpense[]) {
    this.dataSource = d;
  }

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private incomeExpense: IncomeExpenseService,
    private sbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  public getTotalCost(): number {
    return this.dataSource.map(el => el.amount).reduce((acc, value) => acc + value, 0);
  }

  public delete(uid: string): void {
    const dialogRef = this.dialog.open(DiscardDialogComponent, {
      width: '300px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.incomeExpense.delete(uid).then(() => {
          this.sbar.open('Deleted successfully', 'close', { duration: 2000 });
        })
        .catch(err => console.error(err));
      }
    });
  }
}
