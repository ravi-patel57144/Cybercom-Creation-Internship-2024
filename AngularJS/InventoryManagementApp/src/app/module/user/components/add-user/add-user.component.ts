import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: AuthService, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      avatar: ['', Validators.required],
    });
  }

  hasUnsavedChanges(): boolean {
    return this.userForm.dirty;
  }

  onSubmit() {
    if (this.userForm.valid) {
      let newUser = {
        name: this.userForm.value.name,
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        avatar: this.userForm.value.avatar,
      };

      this.userService.createUser(newUser).subscribe({
        next: (req) => {
          console.log(req);
          alert('User created successfully!');
          this.router.navigate(['/user/']);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }
}
