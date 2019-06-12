import { Routes } from '@angular/router';
import { SidenavComponent } from '../components';
import { DashboardComponent } from '../components/dashboard';

export const mainRoutes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];
