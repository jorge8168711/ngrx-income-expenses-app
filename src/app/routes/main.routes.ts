import { Routes } from '@angular/router';
import { SidenavComponent, DashboardComponent } from '../components';

export const mainRoutes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];
