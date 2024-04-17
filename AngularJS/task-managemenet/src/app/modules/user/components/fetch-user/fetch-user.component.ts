import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-fetch-user',
  templateUrl: './fetch-user.component.html',
  styleUrl: './fetch-user.component.css',
})
export class FetchUserComponent implements OnInit {
  users: any;
  displayedColumns: string[] = [
    'name',
    'email',
    'password',
    'role',
    'avatar',
    'actions',
  ];
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;
  updateState: any;
  editState: any = {};

  newUser: any = {};
  showAddRow = false;

  roleOptions = ['customer', 'admin'];

  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    this.userService.fetchUser().subscribe({
      next: (res) => {
        this.users = res;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addUser() {
    this.showAddRow = true;
  }

  confirmAddUser() {
    const newUser = {
      name: this.newUser.name,
      email: this.newUser.email,
      password: this.newUser.password,
      role: 'customer',
      avatar: this.newUser.avatar,
    };

    this.userService.createUser(newUser).subscribe({
      next: (res) => {
        this.fetchUsers();
        this.showAddRow = false;
        this._snackBar.open('new user created successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancelAddUser() {
    this.showAddRow = false;
    this.newUser = {};
  }


  updateUser(id: any) {
    this.updateState = id;
    this.editState[id] = !this.editState[id];
  }

  updateUserDetails(id: any) {
    const updatedUser = this.users.find((user: any) => user.id === id);
    this.userService.updateUser(id, updatedUser).subscribe({
      next: (res) => {
        this.fetchUsers();
        this.editState[id] = false;

        this._snackBar.open('record updated successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  cancelUpdate(id: any) {
    this.editState[id] = false;
  }

  deleteUser(id: any) {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.confirmDelete(id);
      }
    });
  }

  confirmDelete(id: any) {
    if (!id) {
      this._snackBar.open('Please select a user to delete', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }

    this.userService.deleteUser(id).subscribe({
      next: (res) => {
        this.fetchUsers();
        this._snackBar.open('User deleted successfully!', 'close', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          duration: this.durationInSeconds * 1000,
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
