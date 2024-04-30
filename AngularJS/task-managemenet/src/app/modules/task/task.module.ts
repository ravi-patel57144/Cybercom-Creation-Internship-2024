import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskRoutingModule } from './task-routing.module';
import { FetchTaskComponent } from './components/fetch-task/fetch-task.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

import { MatIconModule } from '@angular/material/icon';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TaskBulkSaveComponent } from './components/bulk-task/bulk-task.component';
import { ExporttoexcelComponent } from './components/exporttoexcel/exporttoexcel.component';

@NgModule({
  declarations: [FetchTaskComponent, TaskDialogComponent, TaskBulkSaveComponent, ExporttoexcelComponent],
  imports: [
    CommonModule,
    TaskRoutingModule,
    FormsModule,
    MatTableModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  providers: [provideNativeDateAdapter()],
})
export class TaskModule { }
