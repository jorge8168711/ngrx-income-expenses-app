import { Routes } from '@angular/router';
import { LoginComponent, RegisterComponent } from '../components';
import { AuthComponent } from '../components/auth/auth.component';

export const authRoutes: Routes = [
  {
    path: '', component: AuthComponent,
    children: [
      { path: '', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ]
  },
];
