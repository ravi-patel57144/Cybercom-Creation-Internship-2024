import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FetchUserComponent } from './components/fetch-user/fetch-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';

@NgModule({
  declarations: [FetchUserComponent, UpdateUserComponent, AddUserComponent],
  imports: [CommonModule, UserRoutingModule, ReactiveFormsModule, FormsModule],
})
export class UserModule {}
