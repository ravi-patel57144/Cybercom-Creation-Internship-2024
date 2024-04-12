import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchUserComponent } from './components/fetch-user/fetch-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';

const routes: Routes = [
  {
    path: '',
    component: FetchUserComponent,
  },
  {
    path: 'add',
    component: AddUserComponent,
  },
  {
    path: 'update/:id',
    component: UpdateUserComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
