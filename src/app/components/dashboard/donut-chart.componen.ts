import { Component, Input } from '@angular/core';
import { Label } from 'ng2-charts';
import { IncomeExpense } from 'src/app/models';

@Component({
  selector: 'app-donut-chart',
  template: /*html*/ `
  <mat-card>
    <canvas baseChart
      [data]="pieChartData"
      [labels]="pieChartLabels"
      chartType="pie">
    </canvas>
  </mat-card>
  `,
})
export class DonutChartComponent {
  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];

  @Input('data') set data(data: IncomeExpense[]) {
    if (data) {
      this.pieChartLabels = ['Income', 'Expense'];
      this.pieChartData = [
        data
          .filter(el => el.type === 'income')
          .reduce((acc, item) => acc += item.amount, 0),
        data
          .filter(item => item.type === 'expense')
          .reduce((acc, item) => acc += item.amount, 0)
      ];
    }
  }

  constructor() {}
}
