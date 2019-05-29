import { NgModule } from '@angular/core';
import { LoginComponent, RegisterComponent } from '../components';
import { RouterModule } from '@angular/router';
import { authRoutes } from '../routes';
import { SharedModule } from '.';
import { AuthComponent } from '../components/auth/auth.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthModule {}
