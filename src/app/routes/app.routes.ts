import { Routes } from '@angular/router';
import { NotFoundComponent } from '../components/not-found.component';
import { AuthGuardService } from '../services';

export const appRputes: Routes = [
  {
    path: '',
    loadChildren: () => import('../modules/main.module').then(m => m.MainModule),
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'auth',
    loadChildren: () => import('../modules/auth.module').then(m => m.AuthModule)
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];
