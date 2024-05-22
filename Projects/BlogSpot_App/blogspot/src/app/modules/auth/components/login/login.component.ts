import { Component } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private authService: AuthService, private router: Router) { }

  submitted() {
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email?.trim();
    const password = this.loginForm.value.password;
    const userId = this.authService.userExist(email, password);

    if (!userId) {
      alert("User does not exist!");
      return;
    }

    localStorage.setItem("loggedInUserID", userId);
    this.router.navigate(['/home']);
  }
}
