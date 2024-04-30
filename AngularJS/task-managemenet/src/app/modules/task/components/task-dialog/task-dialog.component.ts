import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.css',
})
export class TaskDialogComponent {
  constructor(public dialogRef: MatDialogRef<TaskDialogComponent>) {}

  onYesClick(): void {
    this.dialogRef.close('yes');
  }

  onNoClick(): void {
    this.dialogRef.close('no');
  }
}
