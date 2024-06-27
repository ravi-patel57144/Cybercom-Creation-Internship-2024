import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../core/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import * as XLSX from 'xlsx';

interface Task {
  id?: string;
  isNew: boolean;
  taskForm: FormGroup;
  title?: string;
  description?: string;
  dueDate?: string;
  priority?: string;
  assignedTo?: string;
}

@Component({
  selector: 'app-fetch-task',
  templateUrl: './fetch-task.component.html',
  styleUrls: ['./fetch-task.component.css'],
})
export class FetchTaskComponent implements OnInit {
  fetchTasks: MatTableDataSource<Task>;
  displayedColumns: string[] = [
    'title',
    'description',
    'dueDate',
    'priority',
    'assignedTo',
    'actions',
  ];
  displayedPriority: string[] = ['Low', 'Medium', 'High'];
  fetchUsers: any;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  isLoading: boolean = false;

  ExcelData: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.fetchTasks = new MatTableDataSource<Task>([]);
    this.loadTasksFromLocalStorage();
  }

  ngOnInit(): void {
    this.fetchUsersRecords();
  }

  fetchUsersRecords() {
    this.userService.fetchUser().subscribe({
      next: (res) => {
        this.fetchUsers = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  exportToExcel() {
    const columnNames = {
      id: 'Task ID',
      title: 'Title',
      description: 'Description',
      dueDate: 'Due Date',
      priority: 'Priority',
      assignedTo: 'Assigned To',
    };

    const tasks: Task[] = JSON.parse(localStorage.getItem('task') || '[]');

    const mappedTasks = tasks.map(task => ({
      [columnNames.id]: task.id,
      [columnNames.title]: task.title || '', // Handle undefined value
      [columnNames.description]: task.description || '', // Handle undefined value
      [columnNames.dueDate]: task.dueDate || '', // Handle undefined value
      [columnNames.priority]: task.priority || '', // Handle undefined value
      [columnNames.assignedTo]: task.assignedTo || '', // Handle undefined value
    }));

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(mappedTasks);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Tasks');
    XLSX.writeFile(wb, 'Tasks.xlsx');
  }

  ReadExcel(event: any) {
    let file = event.target.files[0];

    let fileReader = new FileReader();
    fileReader.readAsBinaryString(file);

    fileReader.onload = (e) => {
      var workBook = XLSX.read(fileReader.result, { type: 'binary' });
      var sheetNames = workBook.SheetNames;

      this.ExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[sheetNames[0]]);

      console.log(this.ExcelData);
    }
  }

  loadTasksFromLocalStorage() {
    this.isLoading = true;
    const tasks = JSON.parse(localStorage.getItem('task') || '[]') as Task[];
    this.fetchTasks.data = tasks.map((task: any) => ({
      id: task.id,
      isNew: false,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedTo: task.assignedTo,
      taskForm: this.fb.group({
        title: [task.title, Validators.required],
        description: [task.description, Validators.required],
        dueDate: [new Date(task.dueDate), Validators.required],
        priority: [task.priority, Validators.required],
        assignedTo: [task.assignedTo, Validators.required],
      }),
    }));
    this.isLoading = false;
  }

  addTask() {
    const newTask: Task = {
      isNew: true,
      taskForm: this.fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        dueDate: [new Date(), Validators.required],
        priority: ['', Validators.required],
        assignedTo: ['', Validators.required],
      }),
    };
    this.fetchTasks.data.push(newTask);
    this.fetchTasks._updateChangeSubscription();
  }

  saveNewTask(index: number) {
    const task = this.fetchTasks.data[index];
    const taskForm = task.taskForm;

    Object.keys(taskForm.controls).forEach((controlName) => {
      taskForm.get(controlName)?.markAsTouched();
    });

    if (task.taskForm.valid) {
      const { title, description, dueDate, priority, assignedTo } =
        task.taskForm.value;
      this.saveTasks({ title, description, dueDate, priority, assignedTo });
      task.isNew = false;
      this.fetchTasks._updateChangeSubscription();
    }
  }

  saveTasks(task: any) {
    const fetchTasks = JSON.parse(localStorage.getItem('task')!) || [];
    const lastId = fetchTasks.length > 0 ? parseInt(fetchTasks[fetchTasks.length - 1].id.split('_')[1]) : 0;
    const newId = `I_${lastId + 1}`;
    const object = {
      id: newId,
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
      priority: task.priority,
      assignedTo: task.assignedTo,
    };
    const mergeTasks = [...fetchTasks, object];
    localStorage.setItem('task', JSON.stringify(mergeTasks));
    this._snackBar.open('task created successfully!', 'close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: this.durationInSeconds * 1000,
    });
  }

  cancelTask(index: number) {
    this.fetchTasks.data.splice(index, 1);
    this.fetchTasks._updateChangeSubscription();
  }

  saveTask(index: number) {
    const task = this.fetchTasks.data[index];
    if (task.taskForm.valid) {
      const updatedTasks = this.fetchTasks.data.map((t) => ({
        id: t.id,
        title: t.taskForm.value.title,
        description: t.taskForm.value.description,
        dueDate: t.taskForm.value.dueDate,
        priority: t.taskForm.value.priority,
        assignedTo: t.taskForm.value.assignedTo,
      }));
      localStorage.setItem('task', JSON.stringify(updatedTasks));
      this._snackBar.open('task updated successfully!', 'close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }
  }

  deleteTask(index: number) {
    const dialogRef = this.dialog.open(TaskDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        const updatedTasks = this.fetchTasks.data.filter((_, i) => i !== index);
        localStorage.setItem(
          'task',
          JSON.stringify(
            updatedTasks.map((t) => ({
              id: t.id,
              title: t.taskForm.value.title,
              description: t.taskForm.value.description,
              dueDate: t.taskForm.value.dueDate,
              priority: t.taskForm.value.priority,
              assignedTo: t.taskForm.value.assignedTo,
            }))
          )
        );
        this.fetchTasks.data = updatedTasks;
        this._snackBar.open('task deleted successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      }
    });
  }
}
