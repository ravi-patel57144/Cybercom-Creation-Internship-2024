import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import * as XLSX from 'xlsx';

interface User {
  id?: string;
  isNew: boolean;
  taskForm: FormGroup;
}

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrl: './fetch-user.component.css',
})
export class FetchUserComponent {
  users: MatTableDataSource<User>;
  displayedColumns: string[] = [
    'name',
    'email',
    'password',
    'role',
    'avatar',
    'actions',
  ];
  displayedRole = ['customer', 'admin'];

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 3;

  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {
    this.users = new MatTableDataSource<User>([]);
    this.loadFetchUsers();
  }

  loadFetchUsers() {
    this.isLoading = true;
    this.userService.fetchUser().subscribe({
      next: (res: any) => {
        this.users.data = res.map((user: any) => ({
          id: user.id,
          isNew: false,
          taskForm: this.fb.group({
            name: [user.name, [Validators.required]],
            email: [user.email, [Validators.required, Validators.email]],
            password: [
              user.password,
              [Validators.required, Validators.minLength(4)],
            ],
            role: [user.role, [Validators.required]],
            avatar: [user.avatar, [Validators.required]],
          }),
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.log(err);
        this.isLoading = false;
      },
    });
  }

  addUser() {
    const newUser: User = {
      isNew: true,
      taskForm: this.fb.group({
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(4)]],
        role: ['', [Validators.required]],
        avatar: ['', [Validators.required]],
      }),
    };
    this.users.data.push(newUser);
    this.users._updateChangeSubscription();
  }

  saveNewUser(index: number) {
    const user = this.users.data[index];
    const taskForm = user.taskForm;

    Object.keys(taskForm.controls).forEach((controlName) => {
      taskForm.get(controlName)?.markAsTouched();
    });

    if (user.taskForm.valid) {
      const { name, email, password, role, avatar } = user.taskForm.value;
      this.saveUserAPICall({ name, email, password, role, avatar }, user);
      user.isNew = false;
      this.users._updateChangeSubscription();
    }
  }

  exportToExcel() {
    const columnNames = {
      id: 'User ID',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      avatar: 'Avatar URL'
    };

    const users = this.users.data.map(user => {
      const taskFormValue = user.taskForm.value;
      return {
        [columnNames.id]: user.id,
        [columnNames.name]: taskFormValue.name,
        [columnNames.email]: taskFormValue.email,
        [columnNames.role]: taskFormValue.role,
        [columnNames.avatar]: taskFormValue.avatar
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(users);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Users');
    XLSX.writeFile(wb, 'Users.xlsx');
  }




  saveUserAPICall(data: any, user: User) {
    this.userService.createUser(data).subscribe({
      next: (res: any) => {
        user.id = res.id;
        this._snackBar.open('user created successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
      error: (err) => {
        this._snackBar.open('error for adding a new user', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
    });
  }

  cancelUser(index: number) {
    this.users.data.splice(index, 1);
    this.users._updateChangeSubscription();
  }

  saveUser(index: number) {
    const user = this.users.data[index];
    if (user.taskForm.valid) {
      const { id } = user;
      const { name, email, password, role, avatar } = user.taskForm.value;
      let object = {
        name: name,
        email: email,
        password: password,
        role: role,
        avatar: avatar,
      };

      this.userService.updateUser(id, object).subscribe({
        next: (res) => {
          this._snackBar.open('user updated successfully!', 'close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
          this.users._updateChangeSubscription();
        },
        error: (res) => {
          this._snackBar.open('error for updating a user', 'close', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
            duration: this.durationInSeconds * 1000,
          });
        },
      });
    }
  }

  deleteUser(index: number) {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        const task = this.users.data[index];
        this.userService.deleteUser(task.id).subscribe({
          next: (res) => {
            this._snackBar.open('user deleted successfully!', 'close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            this.loadFetchUsers();
          },
          error: (err) => {
            this._snackBar.open('error for deleting a user', 'close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
          },
        });
      }
    });
  }
}
