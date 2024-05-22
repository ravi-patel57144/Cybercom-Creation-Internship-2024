// auth-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AlreadyLoggedInGuard } from '../../core/guards/already-logged-in.guard';

const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [AlreadyLoggedInGuard] },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
