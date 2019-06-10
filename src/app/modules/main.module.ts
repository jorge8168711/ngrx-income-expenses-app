import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { SidenavComponent, DashboardComponent, IncomeExpensesComponent } from '../components';
import { RouterModule } from '@angular/router';
import { mainRoutes } from '../routes/main.routes';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent,
    IncomeExpensesComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule {}
