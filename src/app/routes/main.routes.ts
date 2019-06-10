import { Routes } from '@angular/router';
import { SidenavComponent, DashboardComponent, IncomeExpensesComponent } from '../components';

export const mainRoutes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: DashboardComponent },
      { path: 'income', component: IncomeExpensesComponent }
    ]
  }
];
