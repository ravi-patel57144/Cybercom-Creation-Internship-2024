import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../../core/services/user.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrl: './login-user.component.css',
})
export class LoginUserComponent {
  loginForm: FormGroup;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  durationInSeconds = 3;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      let email = this.loginForm.value.email;
      let password = this.loginForm.value.password;

      this.userService.fetchUser().subscribe({
        next: (res: any) => {
          let findRecord = res.find(
            (result: any) =>
              result.email === email && result.password === password
          );
          if (findRecord) {
            localStorage.setItem('id', JSON.stringify(findRecord.id));
            localStorage.setItem('role', JSON.stringify(findRecord.role));
            this._snackBar.open('Login Successfully', 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
            this.router.navigate(['/task']);
          } else {
            this._snackBar.open('Invalid username or password', 'Close', {
              horizontalPosition: this.horizontalPosition,
              verticalPosition: this.verticalPosition,
              duration: this.durationInSeconds * 1000,
            });
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
