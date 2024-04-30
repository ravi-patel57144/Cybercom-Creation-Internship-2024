import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { FetchUserComponent } from './components/fetch-user/fetch-user.component';
import { authGuard } from '../../core/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginUserComponent,
  },
  {
    path: 'users',
    component: FetchUserComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule { }
