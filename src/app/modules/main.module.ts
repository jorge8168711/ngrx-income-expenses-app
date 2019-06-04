import { NgModule } from '@angular/core';
import { SharedModule } from './shared.module';
import { SidenavComponent, DashboardComponent } from '../components';
import { RouterModule } from '@angular/router';
import { mainRoutes } from '../routes/main.routes';

@NgModule({
  declarations: [
    SidenavComponent,
    DashboardComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(mainRoutes)
  ]
})
export class MainModule {}
