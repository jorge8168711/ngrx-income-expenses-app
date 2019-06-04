import { Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found.component';

export const appRputes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/main.module').then(m => m.MainModule),
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth.module').then(m => m.AuthModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
