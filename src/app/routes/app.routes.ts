import { Routes } from '@angular/router';
export const appRputes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth.module').then(m => m.AuthModule)
  }
];
