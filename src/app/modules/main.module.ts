import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import {
  SidenavComponent,
  DiscardDialogComponent,
  NewRecordDialogComponent } from '../components';
import {
  DashboardComponent,
  DashboardTableComponent,
  DonutChartComponent } from '../components/dashboard';
import { RouterModule } from '@angular/router';
import { FilterArrayPipe } from '../pipes';
import { ChartsModule } from 'ng2-charts';
import { mainRoutes } from '../routes';

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent,
    DiscardDialogComponent,
    NewRecordDialogComponent,
    DashboardTableComponent,
    FilterArrayPipe,
    DonutChartComponent
  ],
  imports: [
    SharedModule,
    ChartsModule,
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    DashboardTableComponent,
    DonutChartComponent
  ],
  entryComponents: [
    DiscardDialogComponent,
    NewRecordDialogComponent
  ]
})
export class MainModule {}
