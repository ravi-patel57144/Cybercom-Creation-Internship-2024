import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchTaskComponent } from './components/fetch-task/fetch-task.component';
import { authGuard } from '../../core/guard/auth.guard';
import { TaskBulkSaveComponent } from './components/bulk-task/bulk-task.component';

const routes: Routes = [
  {
    path: '',
    component: FetchTaskComponent,
    canActivate: [authGuard],
  },
  {
    path: 'bulk-tasks',
    component: TaskBulkSaveComponent,
    canActivate: [authGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskRoutingModule { }
