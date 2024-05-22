import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './components/pagenotfound/pagenotfound.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./modules/auth/auth.module').then(mod => mod.AuthModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/read/read.module').then(mod => mod.ReadModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'write',
    loadChildren: () => import('./modules/write/write.module').then(mod => mod.WriteModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: PagenotfoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
