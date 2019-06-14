import { Routes } from '@angular/router';
import { AuthGuardService } from './services';
import { NotFoundComponent, LoginComponent, RegisterComponent, SidenavComponent } from './components';
import { AuthComponent } from './components/auth/auth.component';
import { DashboardComponent } from './components/dashboard';

export const authRoutes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
];

export const appRputes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth.module').then(m => m.AuthModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  {
    path: '',
    loadChildren: () => import('./modules/main.module').then(m => m.MainModule),
    canLoad: [ AuthGuardService ]
  },
  { path: '**', redirectTo: 'not-found' }
];

export const mainRoutes: Routes = [
  {
    path: '', component: SidenavComponent,
    children: [
      { path: '', component: DashboardComponent }
    ]
  }
];
