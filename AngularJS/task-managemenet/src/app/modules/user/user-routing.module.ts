import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { FetchUserComponent } from './components/fetch-user/fetch-user.component';
import { authGuard } from '../../core/guard/auth.guard';
import { NoAuthGuard } from '../../core/guard/no-auth.guard';

const routes: Routes = [
  {
    path: 'users',
    component: FetchUserComponent,
    canActivate: [authGuard],
  },
  {
    path: '',
    component: LoginUserComponent,
    canActivate: [NoAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
